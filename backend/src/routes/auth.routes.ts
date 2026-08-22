import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import prisma from '../lib/prisma';
import { requireAuth, AuthedRequest } from '../middleware/auth.middleware';

const router = Router();
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const SUPPORTED_LANGUAGES = ['en', 'fr', 'rw'];

function signToken(userId: string) {
  return jwt.sign({ sub: userId }, process.env.JWT_SECRET as string, { expiresIn: '30d' });
}

function toPublicUser(user: { name: string; email: string; avatarUrl: string | null; language: string; role: string }) {
  return { name: user.name, email: user.email, avatarUrl: user.avatarUrl, language: user.language, role: user.role };
}

router.post('/register', async (req, res) => {
  const { name, email, password } = req.body ?? {};

  if (typeof name !== 'string' || name.trim().length < 2) {
    return res.status(400).json({ message: 'Please provide your full name.' });
  }
  if (typeof email !== 'string' || !EMAIL_RE.test(email)) {
    return res.status(400).json({ message: 'Please provide a valid email address.' });
  }
  if (typeof password !== 'string' || password.length < 6) {
    return res.status(400).json({ message: 'Password must be at least 6 characters.' });
  }

  const normalizedEmail = email.trim().toLowerCase();

  const existing = await prisma.user.findUnique({ where: { email: normalizedEmail } });
  if (existing) {
    return res.status(409).json({ message: 'An account with that email already exists.' });
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: { name: name.trim(), email: normalizedEmail, password: passwordHash },
  });

  const token = signToken(user.id);
  res.status(201).json({ token, user: toPublicUser(user) });
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body ?? {};

  if (typeof email !== 'string' || typeof password !== 'string') {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  const normalizedEmail = email.trim().toLowerCase();
  const user = await prisma.user.findUnique({ where: { email: normalizedEmail } });
  if (!user) {
    return res.status(401).json({ message: 'Invalid email or password.' });
  }

  const matches = await bcrypt.compare(password, user.password);
  if (!matches) {
    return res.status(401).json({ message: 'Invalid email or password.' });
  }

  const token = signToken(user.id);
  res.status(200).json({ token, user: toPublicUser(user) });
});

router.get('/me', requireAuth, async (req: AuthedRequest, res) => {
  const user = await prisma.user.findUnique({ where: { id: req.userId } });
  if (!user) {
    return res.status(401).json({ message: 'Account no longer exists.' });
  }
  res.status(200).json({ user: toPublicUser(user) });
});

router.patch('/me', requireAuth, async (req: AuthedRequest, res) => {
  const { name, email, language } = req.body ?? {};
  const data: { name?: string; email?: string; language?: string } = {};

  if (name !== undefined) {
    if (typeof name !== 'string' || name.trim().length < 2) {
      return res.status(400).json({ message: 'Please provide your full name.' });
    }
    data.name = name.trim();
  }

  if (email !== undefined) {
    if (typeof email !== 'string' || !EMAIL_RE.test(email)) {
      return res.status(400).json({ message: 'Please provide a valid email address.' });
    }
    const normalizedEmail = email.trim().toLowerCase();
    const existing = await prisma.user.findUnique({ where: { email: normalizedEmail } });
    if (existing && existing.id !== req.userId) {
      return res.status(409).json({ message: 'That email is already in use by another account.' });
    }
    data.email = normalizedEmail;
  }

  if (language !== undefined) {
    if (typeof language !== 'string' || !SUPPORTED_LANGUAGES.includes(language)) {
      return res.status(400).json({ message: 'Unsupported language.' });
    }
    data.language = language;
  }

  const user = await prisma.user.update({ where: { id: req.userId }, data });
  res.status(200).json({ user: toPublicUser(user) });
});

router.patch('/me/password', requireAuth, async (req: AuthedRequest, res) => {
  const { currentPassword, newPassword } = req.body ?? {};

  if (typeof currentPassword !== 'string' || typeof newPassword !== 'string') {
    return res.status(400).json({ message: 'Current and new password are required.' });
  }
  if (newPassword.length < 6) {
    return res.status(400).json({ message: 'New password must be at least 6 characters.' });
  }

  const user = await prisma.user.findUnique({ where: { id: req.userId } });
  if (!user) {
    return res.status(401).json({ message: 'Account no longer exists.' });
  }

  const matches = await bcrypt.compare(currentPassword, user.password);
  if (!matches) {
    return res.status(401).json({ message: 'Current password is incorrect.' });
  }

  const passwordHash = await bcrypt.hash(newPassword, 10);
  await prisma.user.update({ where: { id: user.id }, data: { password: passwordHash } });
  res.status(200).json({ message: 'Password updated.' });
});

const AVATAR_DIR = path.join(__dirname, '..', '..', 'uploads', 'avatars');
fs.mkdirSync(AVATAR_DIR, { recursive: true });

const upload = multer({
  storage: multer.diskStorage({
    destination: AVATAR_DIR,
    filename: (req: AuthedRequest, file, cb) => {
      const ext = path.extname(file.originalname).toLowerCase() || '.jpg';
      cb(null, `${req.userId}-${Date.now()}${ext}`);
    },
  }),
  limits: { fileSize: 3 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith('image/')) {
      return cb(new Error('Only image files are allowed.'));
    }
    cb(null, true);
  },
});

router.post('/me/avatar', requireAuth, (req: AuthedRequest, res) => {
  upload.single('avatar')(req, res, async (err: unknown) => {
    if (err) {
      const message = err instanceof Error ? err.message : 'Could not upload the image.';
      return res.status(400).json({ message });
    }
    if (!req.file) {
      return res.status(400).json({ message: 'No image file was provided.' });
    }

    const avatarUrl = `/uploads/avatars/${req.file.filename}`;
    const user = await prisma.user.update({ where: { id: req.userId }, data: { avatarUrl } });
    res.status(200).json({ user: toPublicUser(user) });
  });
});

export default router;
