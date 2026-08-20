import breadImage from '../assets/bread.jpg';
import potteryImage from '../assets/pottery.jpg';
import milkImage from '../assets/milk.jpg';
import creativeImage from '../assets/creative.jpg';

export type Gallery = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  image: string;
};

export const galleries: Gallery[] = [
  {
    id: 'bakery',
    name: 'Museum Bakery',
    tagline: 'Fresh baked pairings for your cup',
    description: 'Sample coffee-paired baked goods made on site, where the museum\'s café culture comes to life.',
    image: breadImage,
  },
  {
    id: 'pottery',
    name: 'Museum Pottery',
    tagline: 'Handcrafted ceramics, made on site',
    description: 'Watch artisans shape the cups, mugs and serving pieces used throughout the museum, blending craft with coffee culture.',
    image: potteryImage,
  },
  {
    id: 'milk',
    name: 'Museum Milk',
    tagline: "Rwanda's dairy tradition, alongside coffee",
    description: "Explore Rwanda's milk and dairy heritage, presented alongside the country's coffee story.",
    image: milkImage,
  },
  {
    id: 'creative',
    name: 'Museum Creative',
    tagline: 'Rwandan art and creative expression',
    description: 'A dedicated space for Rwandan visual art and creative workshops, rotating with local artists.',
    image: creativeImage,
  },
];
