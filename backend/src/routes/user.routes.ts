import { Router, Request, Response } from 'express';
import { Role } from '@prisma/client';
import prisma from '../lib/prisma';
import { requireRole, AuthedRequest } from '../middleware/auth.middleware';

const router = Router();
const ADMIN_ROLES: Role[] = [Role.SYSTEM_ADMIN];

router.get('/', ...requireRole(...ADMIN_ROLES), async (_req: Request, res: Response) => {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: 'desc' },
    select: { id: true, name: true, email: true, role: true, avatarUrl: true, createdAt: true },
  });
  res.status(200).json(users);
});

router.patch('/:id/role', ...requireRole(...ADMIN_ROLES), async (req: AuthedRequest, res: Response) => {
  const { role } = req.body ?? {};

  if (!Object.values(Role).includes(role)) {
    return res.status(400).json({ message: `Invalid role. Valid roles: ${Object.values(Role).join(', ')}` });
  }
  if (req.params.id === req.userId && role !== Role.SYSTEM_ADMIN) {
    return res.status(400).json({ message: 'You cannot remove your own admin access.' });
  }

  const target = await prisma.user.findUnique({ where: { id: req.params.id } });
  if (!target) {
    return res.status(404).json({ message: 'User not found.' });
  }

  const user = await prisma.user.update({
    where: { id: req.params.id },
    data: { role },
    select: { id: true, name: true, email: true, role: true, avatarUrl: true, createdAt: true },
  });
  res.status(200).json(user);
});

export default router;
