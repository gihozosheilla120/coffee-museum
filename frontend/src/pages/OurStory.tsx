import homeImage from '../assets/home.jpg';

const OBJECTIVES = [
  'Preserve and celebrate coffee history and cultural identity.',
  'Showcase the coffee value chain from farm to cup, innovations including AI, research and value addition.',
  'Promote environment-friendly technologies and climate-change resilient practices.',
  'Promote Rwandan culture and support tourism diversification through eco-cultural tourism.',
  "Promote Rwanda's specialty coffee globally by creating business linkage opportunities between producers and buyers.",
  'Strengthen the capacities of youth and women for the jobs the coffee sector requires — baristas, ICS managers and beyond.',
];

export default function OurStory() {
  return (
    <div>
      <section className="section--tight">
        <div className="container">
          <span className="eyebrow">Our Story</span>
          <h1 style={{ maxWidth: '22ch' }}>Rwanda's coffee heritage, and why the museum exists</h1>
          <p className="section-intro">
            Coffee was introduced by Germans in early 1900s. Despite its importance, Rwanda lacks a public
            institution or private organization dedicated to preserving, showcasing, and educating the public
            about its coffee heritage, value chain, and innovation ecosystem.
          </p>
        </div>
      </section>

      <div className="container">
        <img src={homeImage} alt="Coffee Museum i Nyanza entrance" style={{ width: '100%', height: 420, objectFit: 'cover', borderRadius:'25px' }} />
      </div>

      <section className="section">
        <div className="container">
          <div className="grid" style={{ gridTemplateColumns: '200px 1fr', gap: '2rem' }}>
            <div className="eyebrow" style={{ color: 'var(--color-green)' }}>The Sub-Sector Today</div>
            <div className="flex flex-col gap-2">
              <p className="muted" style={{ margin: 0 }}>
                Rwanda is globally recognized for its high-quality Arabica coffee, particularly its specialty-grade
                beans that command premium prices in international markets. Coffee plays a major role in the
                economy of the country, contributing significantly to foreign exchange earnings and to the
                monetization of the rural economy.
              </p>
              <p className="muted" style={{ margin: 0 }}>
                Production ranges from 267,000 to 420,000 bags per year (16,000 MT to 21,000 MT). The total area in
                coffee is currently 42,000 hectares, grown in most provinces in the country at an altitude less
                than 1,900 m. The sub-sector is coordinated under the National Agricultural Export Development
                Board, which supports production and processing, promotes and markets Rwandan coffee, and
                participates in developing the policies governing the sector.
              </p>
              <div style={{ borderTop: '1px solid var(--color-platinum)', margin: '0.75rem 0' }} />
              <p className="muted" style={{ margin: 0 }}>
                The Coffee Museum will serve as a cultural, educational, and commercial hub — bridging history,
                tourism, and economic development.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--dark">
        <div className="container">
          <h2 style={{ fontSize: '1.4rem' }}>What the museum sets out to do</h2>
          <div className="grid grid--2" style={{ marginTop: '1.5rem', rowGap: 0, columnGap: '3rem' }}>
            {OBJECTIVES.map((text, idx) => (
              <div
                key={text}
                style={{
                  padding: '1.1rem 0',
                  borderTop: idx < 2 ? 'none' : '1px solid rgba(209,217,224,0.2)',
                  borderLeft: idx % 2 === 1 ? '1px solid rgba(209,217,224,0.2)' : 'none',
                  paddingLeft: idx % 2 === 1 ? '2rem' : 0,
                }}
              >
                <span style={{ color: 'var(--color-green)', fontWeight: 800, fontSize: '0.72rem' }}>
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <p style={{ margin: '0.4rem 0 0', color: 'white', fontSize: '0.85rem' }}>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
