export type Product = {
  id: string;
  title: string;
  description?: string | null;
  originInfo?: string | null;
  producerName?: string | null;
  altitude?: number | null;
  processType?: string | null;
  priceRWF: number;
  stockCount: number;
  imageUrl?: string | null;
  isActive?: boolean;
};
