import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.status(200).json([
    {
      id: 'p1',
      title: 'Nyanza Specialty Bourbon',
      description: "Exceptional specialty Arabica cultivated high near the King's Palace hills.",
      priceRWF: 12000,
      stockCount: 50,
      imageUrl: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=600'
    }
  ]);
});

export default router;
