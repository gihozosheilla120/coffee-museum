import { Router, Request, Response } from 'express';
import { OrderStatus, Role } from '@prisma/client';
import prisma from '../lib/prisma';
import { requireAuth, requireRole, AuthedRequest } from '../middleware/auth.middleware';

const router = Router();
const SALES_ROLES: Role[] = [Role.SALES_MANAGER, Role.SYSTEM_ADMIN];

// Place an order — prices are always taken from the database, never trusted
// from the client, so a tampered request body can't under-charge an order.
router.post('/', requireAuth, async (req: AuthedRequest, res) => {
  const { shippingAddress, items } = req.body ?? {};

  if (typeof shippingAddress !== 'string' || shippingAddress.trim().length < 5) {
    return res.status(400).json({ message: 'Please provide a shipping address.' });
  }
  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ message: 'Your cart is empty.' });
  }
  for (const item of items) {
    if (typeof item?.productId !== 'string' || typeof item?.quantity !== 'number' || item.quantity < 1) {
      return res.status(400).json({ message: 'Invalid cart item.' });
    }
  }

  const user = await prisma.user.findUnique({ where: { id: req.userId } });
  if (!user) {
    return res.status(401).json({ message: 'Account no longer exists.' });
  }

  const productIds = items.map((i: { productId: string }) => i.productId);
  const products = await prisma.product.findMany({ where: { id: { in: productIds } } });
  const productMap = new Map(products.map(p => [p.id, p]));

  for (const item of items) {
    const product = productMap.get(item.productId);
    if (!product || !product.isActive) {
      return res.status(400).json({ message: 'One or more items are no longer available.' });
    }
    if (product.stockCount < item.quantity) {
      return res.status(400).json({ message: `Not enough stock for "${product.title}".` });
    }
  }

  const totalAmount = items.reduce((sum: number, item: { productId: string; quantity: number }) => {
    const product = productMap.get(item.productId)!;
    return sum + product.priceRWF * item.quantity;
  }, 0);

  const order = await prisma.order.create({
    data: {
      userId: user.id,
      customerName: user.name,
      customerEmail: user.email,
      shippingAddress: shippingAddress.trim(),
      totalAmount,
      status: OrderStatus.PENDING,
      items: {
        create: items.map((item: { productId: string; quantity: number }) => ({
          productId: item.productId,
          quantity: item.quantity,
          pricePaid: productMap.get(item.productId)!.priceRWF,
        })),
      },
    },
    include: { items: { include: { product: true } } },
  });

  await Promise.all(
    items.map((item: { productId: string; quantity: number }) =>
      prisma.product.update({
        where: { id: item.productId },
        data: { stockCount: { decrement: item.quantity } },
      })
    )
  );

  res.status(201).json({ order });
});

// --- Sales manager views below ---

router.get('/summary', requireRole(...SALES_ROLES), async (_req: Request, res: Response) => {
  const [totalOrders, revenueResult, byStatus] = await Promise.all([
    prisma.order.count(),
    prisma.order.aggregate({
      _sum: { totalAmount: true },
      where: { status: { in: [OrderStatus.PAID, OrderStatus.SHIPPED, OrderStatus.DELIVERED] } },
    }),
    prisma.order.groupBy({ by: ['status'], _count: { _all: true } }),
  ]);

  res.status(200).json({
    totalOrders,
    totalRevenueRWF: revenueResult._sum.totalAmount ?? 0,
    ordersByStatus: Object.fromEntries(byStatus.map(s => [s.status, s._count._all])),
  });
});

router.get('/', requireRole(...SALES_ROLES), async (req: Request, res: Response) => {
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: 'desc' },
    take: 200,
    include: { items: { include: { product: true } } },
  });
  res.status(200).json({ orders });
});

router.get('/:id', requireRole(...SALES_ROLES), async (req: Request, res: Response) => {
  const order = await prisma.order.findUnique({
    where: { id: req.params.id },
    include: { items: { include: { product: true } }, user: true },
  });
  if (!order) {
    return res.status(404).json({ message: 'Order not found.' });
  }
  res.status(200).json({ order });
});

router.patch('/:id/status', requireRole(...SALES_ROLES), async (req: Request, res: Response) => {
  const { status } = req.body ?? {};
  if (!Object.values(OrderStatus).includes(status)) {
    return res.status(400).json({ message: 'Invalid status.' });
  }

  const order = await prisma.order.update({
    where: { id: req.params.id },
    data: { status },
    include: { items: { include: { product: true } } },
  });
  res.status(200).json({ order });
});

export default router;
