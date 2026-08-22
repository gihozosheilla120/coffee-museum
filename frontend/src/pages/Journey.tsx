import { Link } from 'react-router-dom';
import FlipCard from '../components/FlipCard';
import harvestImage from '../assets/harvest.jpg';
import collectionImage from '../assets/collection.jpg';
import coffeeImage from '../assets/coffee.jpg';
import packagesImage from '../assets/packages.png';

const JOURNEY_GROUPS = [
  {
    title: 'Cultivation & Harvesting',
    description: 'Growing coffee, varieties, and harvesting ripe cherries.',
    image: harvestImage,
  },
  {
    title: 'Processing & Drying',
    description: 'Washing, processing, and drying the coffee beans.',
    image: collectionImage,
  },
  {
    title: 'Roasting & Quality',
    description: 'Roasting, quality grading, and coffee cupping.',
    image: coffeeImage,
  },
  {
    title: 'Packaging & Export',
    description: 'Packaging the finished coffee and preparing it for export.',
    image: packagesImage,
  },
];

export default function Journey() {
  return (
    <div>
      <section className="section--tight">
        <div className="container">
          <span className="eyebrow">Coffee Journey</span>
          <h1>From cultivation to export</h1>
          <p className="section-intro">Hover a card to read what happens at each stage of production.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="grid grid--4">
            {JOURNEY_GROUPS.map(group => (
              <FlipCard key={group.title} image={group.image} title={group.title} description={group.description} />
            ))}
          </div>
        </div>
      </section>

      <section className="section--tight">
        <div className="container">
          <div
            className="section--dark"
            style={{
              position: 'relative',
              overflow: 'hidden',
              borderRadius: 'var(--radius-lg)',
              padding: '2.25rem 2rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '1.5rem',
            }}
          >
            <div className="chevron-pattern" style={{ position: 'absolute', inset: 0, opacity: 0.5, pointerEvents: 'none' }} />
            <div style={{ position: 'relative', maxWidth: '55ch' }}>
              <h3 style={{ color: 'white', marginBottom: '0.4rem' }}>See the full journey in the museum</h3>
              <p style={{ margin: 0, color: 'var(--color-platinum)' }}>
                Experience each stage firsthand, from cherry to cup, on a guided visit to the Coffee Museum.
              </p>
            </div>
            <Link to="/visit" className="btn btn--green btn--pill" style={{ position: 'relative' }}>
              Plan Your Visit
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
