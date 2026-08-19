import Section from '../components/Section';
import ImagePlaceholder from '../components/ImagePlaceholder';
import { galleries } from '../data/galleries';

export default function Explore() {
  return (
    <Section
      eyebrow="Explore the Museum"
      title="Five Galleries, One Coffee Story"
      intro="Each gallery builds on the last — start with history, move through the science and craft of coffee, and finish where every bean ends up: the global market."
    >
      <div className="grid grid--2">
        {galleries.map((gallery, idx) => (
          <div key={gallery.id}>
            <ImagePlaceholder label="gallery photograph to be supplied" height={220} />
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
