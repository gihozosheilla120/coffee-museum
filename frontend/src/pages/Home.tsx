import { Link } from 'react-router-dom';
import { galleries } from '../data/galleries';
import { products } from '../data/products';
import { journeyStages } from '../data/journeyStages';
import ImagePlaceholder from '../components/ImagePlaceholder';
import HeroSlideshow from '../components/HeroSlideshow';
import heroImage from '../assets/hero.jpg';
import restImage from '../assets/rest.jpg';
import seatsImage from '../assets/seats.jpg';
import homeImage from '../assets/home.jpg';
import samplesImage from '../assets/samples.jpg';
import coffeemachineImage from '../assets/coffeemachine.jpg';

const HERO_IMAGES = [heroImage, restImage, seatsImage, homeImage, samplesImage, coffeemachineImage];

export default function Home() {
  return (
    <div>
      <section style={{ position: 'relative', overflow: 'hidden', minHeight: 560 }}>
        <HeroSlideshow images={HERO_IMAGES} />
        <div className="container" style={{ position: 'relative', padding: '6rem 1.5rem' }}>
          <span className="eyebrow" style={{ color: 'var(--color-green)' }}>The Coffee Museum &middot; Nyanza, Rwanda</span>
          <h1 style={{ color: 'white', maxWidth: '20ch' }}>Rwanda's coffee heritage, preserved and shared</h1>
          <p className="section-intro" style={{ color: 'var(--color-platinum)' }}>
            A centre for preserving Rwanda's coffee history, educating visitors about the coffee value chain,
            promoting tourism, supporting the coffee industry, and showcasing the country's achievements in
            coffee production and innovation.
          </p>
          <div className="flex gap-2" style={{ marginTop: '1.75rem', flexWrap: 'wrap' }}>
            <Link
              to="/visit"
              className="btn"
              style={{ backgroundColor: 'var(--color-terracotta)', borderColor: 'var(--color-terracotta)' }}
            >
              Plan Your Visit
            </Link>
            <Link
              to="/coffee-journey"
              className="btn btn--outline"
              style={{ backgroundColor: 'transparent', borderColor: 'var(--color-terracotta)', color: 'white' }}
            >
              The Coffee Journey
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="flex justify-between items-center section-head" style={{ marginBottom: '2rem' }}>
            <div>
              <span className="eyebrow">Inside the Museum</span>
              <h2 style={{ margin: 0 }}>Four spaces, one continuous story</h2>
            </div>
            <Link to="/explore" className="section-link">Explore all galleries &rarr;</Link>
          </div>
          <div className="grid grid--4">
            {galleries.map((gallery, idx) => (
              <div key={gallery.id} className="tile">
                <img src={gallery.image} alt={gallery.name} className="tile__image" style={{ width: '100%', height: 180, objectFit: 'cover', borderRadius: '10px' }} />
                <div style={{ paddingTop: '1rem' }}>
                  <span style={{ color: 'var(--color-green)', fontWeight: 800, fontSize: '0.85rem' }}>
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <h3 style={{ margin: '0.4rem 0 0.4rem', fontSize: '1.05rem' }}>{gallery.name}</h3>
                  <p className="muted" style={{ fontSize: '0.88rem', margin: 0 }}>{gallery.tagline}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--dark" style={{ position: 'relative', overflow: 'hidden' }}>
        <div
          className="chevron-pattern"
          style={{ position: 'absolute', inset: 0, opacity: 0.5, pointerEvents: 'none' }}
        />
        <div className="container" style={{ position: 'relative' }}>
          <div className="grid grid--2" style={{ gap: '3rem' }}>
            <div>
              <span className="eyebrow">Coffee Journey</span>
              <h2>From cultivation to the final cup</h2>
              <p className="section-intro">
                An educational experience explaining how coffee moves from cultivation to the final cup, presented
                through storytelling, photography, illustrations and interactive visual elements.
              </p>
              <Link to="/coffee-journey" className="btn btn--green btn--pill" style={{ marginTop: '1rem' }}>
                Follow the Journey
              </Link>
            </div>
            <div className="grid grid--4" style={{ gap: '0' }}>
              {journeyStages.map(stage => (
                <div key={stage.n} className="flat-tile" style={{ borderColor: 'rgba(209,217,224,0.2)', padding: '1.1rem 1rem 1.1rem 0' }}>
                  <span style={{ color: 'var(--color-green)', fontWeight: 800, fontSize: '0.78rem' }}>
                    {String(stage.n).padStart(2, '0')}
                  </span>
                  <div style={{ fontWeight: 600, fontSize: '0.92rem', marginTop: '0.3rem' }}>{stage.title}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="flex justify-between items-center section-head" style={{ marginBottom: '2rem' }}>
            <h2 style={{ margin: 0 }}>From the museum shop</h2>
            <Link to="/marketplace" className="section-link">All products &rarr;</Link>
          </div>
          <div className="grid grid--3">
            {products.slice(0, 3).map((product, idx) => (
              <div key={product.id}>
                <Link to={`/marketplace/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <ImagePlaceholder label="product image to be supplied" height={220} />
                </Link>
                <div className="flex justify-between items-center" style={{ paddingTop: '1rem' }}>
                  <Link to={`/marketplace/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <h3 style={{ margin: 0, fontSize: '1.02rem' }}>{product.title || `Coffee product 0${idx + 1}`}</h3>
                  </Link>
                  <span style={{ fontWeight: 800, color: 'var(--color-terracotta)', fontSize: '0.95rem' }}>
                    {product.priceRWF.toLocaleString()} RWF
                  </span>
                </div>
                <p className="muted" style={{ fontSize: '0.85rem', margin: '0.3rem 0 0' }}>{product.originInfo}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
