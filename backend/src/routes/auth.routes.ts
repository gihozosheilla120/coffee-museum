import { Router } from 'express';

const router = Router();

router.post('/register', (req, res) => {
  res.status(201).json({ message: 'User registration endpoint stub' });
});

router.post('/login', (req, res) => {
  res.status(200).json({ token: 'mock_jwt_token', user: { name: 'Visitor' } });
});

export default router;
