export type JourneyStage = {
  n: number;
  title: string;
  description: string;
  gallery: string;
  bannerSubtext: string;
};

export const journeyStages: JourneyStage[] = [
  {
    n: 1,
    title: 'Coffee cultivation',
    description:
      'Coffee is grown in most provinces in the country at an altitude less than 1,900 m. The total area in coffee is currently 42,000 hectares, and 400,000 smallholder farm families produce it and depend on it for their livelihoods.',
    gallery: 'Agronomy Zone',
    bannerSubtext: 'See the terrain models and living plant specimens that explain why altitude and soil matter in the Agronomy Zone.',
  },
  {
    n: 2,
    title: 'Coffee varieties',
    description:
      'Bourbon Arabica and its selections dominate Rwandan hillsides, prized on international markets for bright acidity and pronounced fruit character that command premium specialty-grade prices.',
    gallery: 'Agronomy Zone',
    bannerSubtext: 'Compare Rwanda\'s coffee varieties side by side in the Agronomy Zone.',
  },
  {
    n: 3,
    title: 'Harvesting',
    description:
      'Cherries are hand-picked in successive passes across the season, with pickers trained to take only fully ripe, red cherries — the single biggest factor in final cup quality.',
    gallery: 'Farming & Processing Experience',
    bannerSubtext: 'Handle real cherries at each ripeness stage in the Farming & Processing Experience.',
  },
  {
    n: 4,
    title: 'Processing',
    description:
      'Cherries are delivered the same day to a Coffee Washing Station, where they are pulped to separate skin and fruit from the bean before fermentation begins.',
    gallery: 'Farming & Processing Experience',
    bannerSubtext: 'Walk a scale-model washing station in the Farming & Processing Experience.',
  },
  {
    n: 5,
    title: 'Washing',
    description:
      'Fermented beans move through clean water channels and are graded by density as they float or sink, separating the highest-quality beans from the rest of the lot.',
    gallery: 'Farming & Processing Experience',
    bannerSubtext: 'See how density grading works, hands-on, in the Farming & Processing Experience.',
  },
  {
    n: 6,
    title: 'Drying',
    description:
      'Parchment coffee dries slowly on raised African beds, turned by hand to dry evenly over one to three weeks before it moves on for milling.',
    gallery: 'Farming & Processing Experience',
    bannerSubtext: 'View raised drying beds up close in the Farming & Processing Experience.',
  },
  {
    n: 7,
    title: 'Roasting',
    description:
      'Dry-milled green beans are roasted in small batches to develop the aromatic, sensory profiles that Rwandan specialty coffee is known for on the world stage.',
    gallery: 'Quality & Cupping Lab',
    bannerSubtext: 'Learn how roast profiles shape flavor in the Quality & Cupping Lab.',
  },
  {
    n: 8,
    title: 'Quality grading',
    description:
      'Beans are sorted by size, density, and defect count under strict national and export quality standards before they are approved for sale.',
    gallery: 'Quality & Cupping Lab',
    bannerSubtext: 'See the grading standards applied in practice in the Quality & Cupping Lab.',
  },
  {
    n: 9,
    title: 'Coffee cupping',
    description:
      'Q-graders evaluate aroma, acidity, body, and finish in the museum\'s own cupping lab — the same process professional buyers use worldwide to score a lot.',
    gallery: 'Quality & Cupping Lab',
    bannerSubtext: 'Coffee tasting experiences take place in the Quality and Cupping Lab.',
  },
  {
    n: 10,
    title: 'Packaging',
    description:
      'Graded lots are packed in labeled jute bags, traceable back to the washing station and cooperative of origin before they enter the export chain.',
    gallery: 'Global Market Room',
    bannerSubtext: 'Trace a bag of coffee back to its cooperative of origin in the Global Market Room.',
  },
  {
    n: 11,
    title: 'Export',
    description:
      "Coffee moves through Rwanda's NAEB-regulated export chain to roasters and cafés on every continent, closing the loop from hillside to cup.",
    gallery: 'Global Market Room',
    bannerSubtext: "See where Rwanda's coffee travels after export in the Global Market Room.",
  },
];
