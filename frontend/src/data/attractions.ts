import { siteImages } from './siteImages';

export type Attraction = {
  name: string;
  distance: string;
  description: string;
  image: string;
};

export const attractions: Attraction[] = [
  {
    name: "Nyanza King's Palace Museum",
    distance: '~5 min drive',
    description: 'The reconstructed royal residence of the Rwandan monarchy, including the famous long-horned Inyambo cattle.',
    image: siteImages.kingsPalace,
  },
  {
    name: 'Huye Ethnographic Museum',
    distance: '~30 min drive',
    description: "One of the region's finest ethnographic collections, covering Rwandan history, art, and material culture.",
    image: siteImages.cowMuseum,
  },
];
