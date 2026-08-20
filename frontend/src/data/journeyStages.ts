export type JourneyStage = {
  n: number;
  title: string;
  description: string;
  bannerSubtext: string;
};

export const journeyStages: JourneyStage[] = [
  {
    n: 1,
    title: 'Coffee cultivation',
    description:
      'Coffee is grown in most provinces in the country at an altitude less than 1,900 m. The total area in coffee is currently 42,000 hectares, and 400,000 smallholder farm families produce it and depend on it for their livelihoods.',
    bannerSubtext: 'See the terrain models and living plant specimens that explain why altitude and soil matter.',
  },
  {
    n: 2,
    title: 'Coffee varieties',
    description:
      'Bourbon Arabica and its selections dominate Rwandan hillsides, prized on international markets for bright acidity and pronounced fruit character that command premium specialty-grade prices.',
    bannerSubtext: "Compare Rwanda's coffee varieties side by side on your visit.",
  },
  {
    n: 3,
    title: 'Harvesting',
    description:
      'Cherries are hand-picked in successive passes across the season, with pickers trained to take only fully ripe, red cherries — the single biggest factor in final cup quality.',
    bannerSubtext: 'Handle real cherries at each ripeness stage during a guided tour.',
  },
  {
    n: 4,
    title: 'Processing',
    description:
      'Cherries are delivered the same day to a Coffee Washing Station, where they are pulped to separate skin and fruit from the bean before fermentation begins.',
    bannerSubtext: 'Walk a scale-model washing station during a guided tour.',
  },
  {
    n: 5,
    title: 'Washing',
    description:
      'Fermented beans move through clean water channels and are graded by density as they float or sink, separating the highest-quality beans from the rest of the lot.',
    bannerSubtext: 'See how density grading works, hands-on, during a guided tour.',
  },
  {
    n: 6,
    title: 'Drying',
    description:
      'Parchment coffee dries slowly on raised African beds, turned by hand to dry evenly over one to three weeks before it moves on for milling.',
    bannerSubtext: 'View raised drying beds up close during a guided tour.',
  },
  {
    n: 7,
    title: 'Roasting',
    description:
      'Dry-milled green beans are roasted in small batches to develop the aromatic, sensory profiles that Rwandan specialty coffee is known for on the world stage.',
    bannerSubtext: 'Learn how roast profiles shape flavor during a guided tour.',
  },
  {
    n: 8,
    title: 'Quality grading',
    description:
      'Beans are sorted by size, density, and defect count under strict national and export quality standards before they are approved for sale.',
    bannerSubtext: 'See the grading standards applied in practice during a guided tour.',
  },
  {
    n: 9,
    title: 'Coffee cupping',
    description:
      'Q-graders evaluate aroma, acidity, body, and finish in the museum\'s own cupping lab — the same process professional buyers use worldwide to score a lot.',
    bannerSubtext: 'Coffee tasting experiences take place in the cupping lab.',
  },
  {
    n: 10,
    title: 'Packaging',
    description:
      'Graded lots are packed in labeled jute bags, traceable back to the washing station and cooperative of origin before they enter the export chain.',
    bannerSubtext: 'Trace a bag of coffee back to its cooperative of origin during a guided tour.',
  },
  {
    n: 11,
    title: 'Export',
    description:
      "Coffee moves through Rwanda's NAEB-regulated export chain to roasters and cafés on every continent, closing the loop from hillside to cup.",
    bannerSubtext: "See where Rwanda's coffee travels after export during a guided tour.",
  },
];
