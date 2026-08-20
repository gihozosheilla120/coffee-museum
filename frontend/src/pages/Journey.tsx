import { useState } from 'react';
import { Link } from 'react-router-dom';
import ImagePlaceholder from '../components/ImagePlaceholder';
import { journeyStages } from '../data/journeyStages';

export default function Journey() {
  const [index, setIndex] = useState(0);
  const stage = journeyStages[index];

  return (
    <div>
      <section className="section--tight">
        <div className="container">
          <span className="eyebrow">Coffee Journey</span>
          <h1>From cultivation to export</h1>
          <p className="section-intro">Every stage of production, from cultivation to export. Select a stage to read it.</p>
        </div>
      </section>

      <div className="container">
        <nav className="stage-tabs">
          {journeyStages.map((s, i) => (
            <button
              key={s.n}
              className={`stage-tab${i === index ? ' stage-tab--active' : ''}`}
              onClick={() => setIndex(i)}
            >
              <span className="stage-tab__num">{String(s.n).padStart(2, '0')}</span>
              <span className="stage-tab__title">{s.title}</span>
            </button>
          ))}
        </nav>
      </div>

      <section className="section">
        <div className="container">
          <div className="grid grid--2" style={{ gap: '3rem', alignItems: 'start' }}>
            <div>
              <span className="eyebrow">Stage {String(stage.n).padStart(2, '0')} / {journeyStages.length}</span>
              <h2>{stage.title}</h2>
              <p className="muted">{stage.description}</p>

              <div style={{ borderTop: '1px solid var(--color-platinum)', margin: '1.5rem 0' }} />

              <div style={{ marginBottom: '2rem' }}>
                <div className="stat-label">Sitemap Section</div>
                <div style={{ marginTop: '0.3rem', fontWeight: 600 }}>Coffee Journey</div>
              </div>

              <div className="flex gap-2">
                <button
                  className="btn btn--outline btn--pill"
                  onClick={() => setIndex(i => Math.max(0, i - 1))}
                  disabled={index === 0}
                >
                  Previous
                </button>
                <button
                  className="btn btn--pill"
                  onClick={() => setIndex(i => Math.min(journeyStages.length - 1, i + 1))}
                  disabled={index === journeyStages.length - 1}
                >
                  Next Stage
                </button>
              </div>
            </div>
            <ImagePlaceholder label="photograph to be supplied" height={340} />
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
              <h3 style={{ color: 'white', marginBottom: '0.4rem' }}>See this stage in the museum</h3>
              <p style={{ margin: 0, color: 'var(--color-platinum)' }}>{stage.bannerSubtext}</p>
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
