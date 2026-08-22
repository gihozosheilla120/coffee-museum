import { Router, Request, Response } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { Role } from '@prisma/client';
import prisma from '../lib/prisma';
import { requireRole } from '../middleware/auth.middleware';

const router = Router();
const CATALOG_ROLES: Role[] = [Role.SYSTEM_ADMIN, Role.MARKETPLACE_ADMIN];

function parseNumber(value: unknown): number | undefined {
  if (value === undefined || value === '') return undefined;
  const n = Number(value);
  return Number.isFinite(n) ? n : undefined;
}

// --- Public storefront ---

router.get('/', async (_req, res) => {
  const products = await prisma.product.findMany({
    where: { isActive: true },
    orderBy: { createdAt: 'desc' },
  });
  res.status(200).json(products);
});

router.get('/:id', async (req, res) => {
  const product = await prisma.product.findFirst({ where: { id: req.params.id, isActive: true } });
  if (!product) {
    return res.status(404).json({ message: 'Product not found.' });
  }
  res.status(200).json(product);
});

// --- Catalog management ---

router.get('/admin/all', requireRole(...CATALOG_ROLES), async (_req: Request, res: Response) => {
  const products = await prisma.product.findMany({ orderBy: { createdAt: 'desc' } });
  res.status(200).json(products);
});

const PRODUCT_IMAGE_DIR = path.join(__dirname, '..', '..', 'uploads', 'products');
fs.mkdirSync(PRODUCT_IMAGE_DIR, { recursive: true });

const upload = multer({
  storage: multer.diskStorage({
    destination: PRODUCT_IMAGE_DIR,
    filename: (_req, file, cb) => {
      const ext = path.extname(file.originalname).toLowerCase() || '.jpg';
      cb(null, `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (!file.mimetype.startsWith('image/')) {
      return cb(new Error('Only image files are allowed.'));
    }
    cb(null, true);
  },
});

function withImageUpload(req: Request, res: Response, next: (err?: unknown) => void) {
  upload.single('image')(req, res, (err: unknown) => {
    if (err) {
      const message = err instanceof Error ? err.message : 'Could not upload the image.';
      return res.status(400).json({ message });
    }
    next();
  });
}

router.post('/', ...requireRole(...CATALOG_ROLES), withImageUpload, async (req, res) => {
  const { title, description, originInfo, producerName, processType } = req.body ?? {};
  const altitude = parseNumber(req.body?.altitude);
  const priceRWF = parseNumber(req.body?.priceRWF);
  const stockCount = parseNumber(req.body?.stockCount);

  if (typeof title !== 'string' || title.trim().length < 2) {
    return res.status(400).json({ message: 'Please provide a product title.' });
  }
  if (priceRWF === undefined || priceRWF < 0) {
    return res.status(400).json({ message: 'Please provide a valid price.' });
  }
  if (stockCount === undefined || stockCount < 0) {
    return res.status(400).json({ message: 'Please provide a valid stock count.' });
  }

  const product = await prisma.product.create({
    data: {
      title: title.trim(),
      description: description?.trim() || '',
      originInfo: originInfo?.trim() || '',
      producerName: producerName?.trim() || '',
      altitude: altitude ?? 0,
      processType: processType?.trim() || '',
      priceRWF,
      stockCount,
      imageUrl: req.file ? `/uploads/products/${req.file.filename}` : '',
    },
  });

  res.status(201).json(product);
});

router.patch('/:id', ...requireRole(...CATALOG_ROLES), withImageUpload, async (req, res) => {
  const existing = await prisma.product.findUnique({ where: { id: req.params.id } });
  if (!existing) {
    return res.status(404).json({ message: 'Product not found.' });
  }

  const { title, description, originInfo, producerName, processType, isActive } = req.body ?? {};
  const altitude = parseNumber(req.body?.altitude);
  const priceRWF = parseNumber(req.body?.priceRWF);
  const stockCount = parseNumber(req.body?.stockCount);

  const product = await prisma.product.update({
    where: { id: req.params.id },
    data: {
      ...(title !== undefined && { title: title.trim() }),
      ...(description !== undefined && { description: description.trim() }),
      ...(originInfo !== undefined && { originInfo: originInfo.trim() }),
      ...(producerName !== undefined && { producerName: producerName.trim() }),
      ...(processType !== undefined && { processType: processType.trim() }),
      ...(altitude !== undefined && { altitude }),
      ...(priceRWF !== undefined && { priceRWF }),
      ...(stockCount !== undefined && { stockCount }),
      ...(isActive !== undefined && { isActive: isActive === 'true' || isActive === true }),
      ...(req.file && { imageUrl: `/uploads/products/${req.file.filename}` }),
    },
  });

  res.status(200).json(product);
});

// Soft delete only — a hard delete would break historical order line items
// that reference this product as a foreign key.
router.delete('/:id', ...requireRole(...CATALOG_ROLES), async (req, res) => {
  const existing = await prisma.product.findUnique({ where: { id: req.params.id } });
  if (!existing) {
    return res.status(404).json({ message: 'Product not found.' });
  }
  const product = await prisma.product.update({ where: { id: req.params.id }, data: { isActive: false } });
  res.status(200).json(product);
});

export default router;
