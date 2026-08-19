import { siteImages } from './siteImages';

export type Product = {
  id: string;
  title: string;
  description: string;
  originInfo: string;
  producerName: string;
  altitude: number;
  processType: string;
  priceRWF: number;
  stockCount: number;
  imageUrl: string;
};

export const products: Product[] = [
  {
    id: 'p1',
    title: 'Nyanza Specialty Bourbon',
    description: 'Exceptional specialty Arabica cultivated on the hills near the Nyanza King\'s Palace, with notes of red berry and brown sugar.',
    originInfo: 'Nyanza District, Southern Province',
    producerName: 'Nyanza Growers Cooperative',
    altitude: 1750,
    processType: 'Fully Washed',
    priceRWF: 12000,
    stockCount: 42,
    imageUrl: siteImages.cherries,
  },
  {
    id: 'p2',
    title: 'Huye Hills Natural',
    description: 'Naturally processed lot with pronounced fruit sweetness — dried jasmine and stone fruit on the finish.',
    originInfo: 'Huye District, Southern Province',
    producerName: 'Huye Smallholder Union',
    altitude: 1820,
    processType: 'Natural / Dry Process',
    priceRWF: 13500,
    stockCount: 27,
    imageUrl: siteImages.drying,
  },
  {
    id: 'p3',
    title: "Lake Kivu Washed Reserve",
    description: 'Bright, clean cup from lakeside micro-lots — citrus acidity balanced with a honeyed body.',
    originInfo: 'Western Province, Lake Kivu basin',
    producerName: 'Kivu Belt Cooperative',
    altitude: 1900,
    processType: 'Fully Washed',
    priceRWF: 14000,
    stockCount: 18,
    imageUrl: siteImages.roasting,
  },
  {
    id: 'p4',
    title: 'Museum Cupping Set',
    description: 'A curated 3-origin tasting flight for at-home cupping, paired with our tasting notes card.',
    originInfo: 'Multi-origin, Southern Province',
    producerName: 'Coffee Museum i Nyanza',
    altitude: 1780,
    processType: 'Mixed',
    priceRWF: 21000,
    stockCount: 35,
    imageUrl: siteImages.cupOfCoffee,
  },
];
