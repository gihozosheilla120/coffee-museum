import { Router } from 'express';

const router = Router();

router.post('/', (req, res) => {
  res.status(201).json({ message: 'Booking received successfully' });
});

export default router;
