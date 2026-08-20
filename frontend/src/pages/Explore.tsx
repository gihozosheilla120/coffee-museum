import Section from '../components/Section';
import { galleries } from '../data/galleries';

export default function Explore() {
  return (
    <Section
      eyebrow="Explore the Museum"
      title="Four Spaces, One Coffee Story"
      intro="From baking and pottery to dairy and the arts, each space reflects a different side of Rwandan coffee culture."
    >
      <div className="grid grid--2">
        {galleries.map((gallery, idx) => (
          <div key={gallery.id}>
            <img src={gallery.image} alt={gallery.name} style={{ width: '100%', height: 220, objectFit: 'cover' }} />
            <div style={{ paddingTop: '1rem' }}>
              <span style={{ color: 'var(--color-green)', fontWeight: 800, fontSize: '0.85rem' }}>
                {String(idx + 1).padStart(2, '0')}
              </span>
              <h3 style={{ margin: '0.4rem 0 0.3rem' }}>{gallery.name}</h3>
              <p style={{ fontWeight: 600, color: 'var(--color-terracotta)', fontSize: '0.85rem', marginBottom: '0.6rem' }}>
                {gallery.tagline}
              </p>
              <p className="muted" style={{ fontSize: '0.92rem' }}>{gallery.description}</p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
