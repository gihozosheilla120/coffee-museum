import { siteImages } from './siteImages';

export type Gallery = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  image: string;
};

export const galleries: Gallery[] = [
  {
    id: 'historical',
    name: 'Historical Gallery',
    tagline: "From colonial-era planting to a national industry",
    description: "Trace coffee's arrival in Rwanda in the early 1900s through to today's 400,000 smallholder families, told through archival photography, artifacts, and first-person farmer accounts.",
    image: siteImages.interiorGallery,
  },
  {
    id: 'agronomy',
    name: 'Agronomy Zone',
    tagline: 'The science behind every cherry',
    description: 'Explore soil, altitude, and the Bourbon Arabica varieties that make Rwandan coffee distinctive, with living plant specimens and interactive terrain models.',
    image: siteImages.landscapeHills,
  },
  {
    id: 'processing',
    name: 'Farming & Processing Experience',
    tagline: 'Hands-on, from cherry to parchment',
    description: 'Walk a scale-model washing station, handle real cherries at each processing stage, and see raised drying beds up close.',
    image: siteImages.drying,
  },
  {
    id: 'cupping-lab',
    name: 'Quality & Cupping Lab',
    tagline: 'Taste like a professional buyer',
    description: 'A working cupping lab where visitors learn grading standards and join guided tastings led by certified Q-graders.',
    image: siteImages.cupping,
  },
  {
    id: 'global-market',
    name: 'Global Market Room',
    tagline: "Rwanda's coffee on the world stage",
    description: "See where Rwandan beans travel after export, understand pricing and trade, and meet the cooperatives behind the country's specialty lots.",
    image: siteImages.marketplaceBags,
  },
];
