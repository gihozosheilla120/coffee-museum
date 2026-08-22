import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// The original specialty-bean catalog (p1-p4). Superseded by the drinks menu
// below, but kept and soft-deactivated rather than deleted — earlier orders
// still reference these ids as a foreign key.
const LEGACY_PRODUCT_IDS = ['p1', 'p2', 'p3', 'p4'];

const DRINKS = [
  {
    slug: 'cappuccino',
    title: 'Cappuccino',
    description: 'Espresso with steamed milk and a deep layer of foam.',
    priceRWF: 2500,
    stockCount: 100,
    imageUrl: '/uploads/products/cappuccino.jpg',
  },
  {
    slug: 'latte',
    title: 'Latte',
    description: 'Espresso with steamed milk and a light layer of foam.',
    priceRWF: 2800,
    stockCount: 100,
    imageUrl: '/uploads/products/latte.jpg',
  },
  {
    slug: 'americano',
    title: 'Americano',
    description: 'Espresso lengthened with hot water for a lighter, black-coffee cup.',
    priceRWF: 2000,
    stockCount: 100,
    imageUrl: '/uploads/products/americano.jpg',
  },
  {
    slug: 'espresso',
    title: 'Espresso',
    description: 'A concentrated shot pulled from freshly roasted museum beans.',
    priceRWF: 1800,
    stockCount: 100,
    imageUrl: '/uploads/products/espresso.jpg',
  },
];

async function main() {
  await prisma.product.updateMany({
    where: { id: { in: LEGACY_PRODUCT_IDS } },
    data: { isActive: false },
  });

  for (const { slug, ...drink } of DRINKS) {
    const existing = await prisma.product.findFirst({ where: { title: drink.title } });
    if (existing) {
      await prisma.product.update({ where: { id: existing.id }, data: drink });
    } else {
      await prisma.product.create({ data: drink });
    }
  }

  console.log(`Deactivated ${LEGACY_PRODUCT_IDS.length} legacy products, upserted ${DRINKS.length} drinks.`);
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
