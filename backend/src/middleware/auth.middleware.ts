import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { Role } from '@prisma/client';
import prisma from '../lib/prisma';

export type AuthedRequest = Request & { userId?: string };

export function requireAuth(req: AuthedRequest, res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  const token = header?.startsWith('Bearer ') ? header.slice(7) : null;

  if (!token) {
    return res.status(401).json({ message: 'Missing authorization token' });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET as string) as { sub: string };
    req.userId = payload.sub;
    next();
  } catch {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
}

export function requireRole(...allowed: Role[]) {
  return [
    requireAuth,
    async (req: AuthedRequest, res: Response, next: NextFunction) => {
      const user = await prisma.user.findUnique({ where: { id: req.userId } });
      if (!user || !allowed.includes(user.role)) {
        return res.status(403).json({ message: 'You do not have access to this resource.' });
      }
      next();
    },
  ];
}
