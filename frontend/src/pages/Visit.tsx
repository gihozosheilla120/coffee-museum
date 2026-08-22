import { useState } from 'react';
import { Link } from 'react-router-dom';
import Section from '../components/Section';
import { attractions } from '../data/attractions';
import { visitFaqs } from '../data/faqs';
import samplesImage from '../assets/samples.jpg';
import homeImage from '../assets/visit.jpg'

export default function Visit() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div>
      <section className="section--tight">
        <div className="container">
          <div className="grid grid--2" style={{ gap: '3rem', alignItems: 'start' }}>
            <div>
              <span className="eyebrow">Visit</span>
              <h1>Plan Your Visit to Coffee Museum</h1>
              <p className="section-intro">
                Combine your visit with nearby historic hubs like the Nyanza King's Palace and the Huye Ethnographic
                Museum for a full day of Rwandan heritage.
              </p>

              <div className="flat-tile" style={{ marginTop: '2.5rem' }}>
                <h3>Opening Hours</h3>
                <p className="muted">Open Daily: 8:00 AM &ndash; 6:00 PM<br />Last entry: 5:00 PM</p>
              </div>
              <div className="flat-tile" style={{ marginTop: '1.5rem' }}>
                <h3>Location</h3>
                <p className="muted">Nyanza, Southern Province, Rwanda &mdash; a short drive from the Nyanza King's Palace.</p>
              </div>
            </div>
            <img
              src={homeImage}
              alt="Coffee Museum i Nyanza entrance"
              style={{ borderRadius: '30px', width: '100%', height: '40%', minHeight: 480, objectFit: 'cover' }}
            />
          </div>
        </div>
      </section>

      <div id="tours" />
      <Section eyebrow="Guided Tours" title="Book a Tour" alt intro="Group, school, and private tours are available daily. Reach out and our team will confirm availability.">
        <Link to="/contact" className="btn">Book a Tour</Link>
      </Section>

      <div id="tasting" />
      <Section eyebrow="Tasting" title="Coffee Tasting Experience" intro="Join a guided cupping session in our on-site lab, led by certified Q-graders, and taste your way through multiple Rwandan micro-lots.">
        <div className="grid grid--2" style={{ alignItems: 'center' }}>
          <img src={samplesImage} alt="Aroma cupping and tasting kit" style={{ width: '100%', height: 280, objectFit: 'cover' }} />
          <ul style={{ paddingLeft: '1.2rem', lineHeight: 1.9 }} className="muted">
            <li>Guided cupping of 3&ndash;5 origins</li>
            <li>Learn professional grading vocabulary</li>
            <li>Take home tasting notes</li>
            <li>Available daily, booking recommended</li>
          </ul>
        </div>
      </Section>

      <Section eyebrow="FAQ" title="Frequently Asked Questions" alt>
        <div className="flex flex-col gap-2" style={{ maxWidth: 720 }}>
          {visitFaqs.map((faq, idx) => (
            <div key={faq.q} className="card">
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                style={{
                  width: '100%',
                  textAlign: 'left',
                  background: 'none',
                  border: 'none',
                  padding: '1rem 1.4rem',
                  cursor: 'pointer',
                  fontWeight: 700,
                  fontSize: '0.95rem',
                  color: 'var(--color-navy)',
                }}
              >
                {faq.q}
              </button>
              {openFaq === idx && (
                <p className="muted" style={{ padding: '0 1.4rem 1.2rem', margin: 0, fontSize: '0.92rem' }}>{faq.a}</p>
              )}
            </div>
          ))}
        </div>
      </Section>

      <div id="nyanza" />
      <Section eyebrow="Nearby" title="What Else to Do in Nyanza" intro="Make the most of your trip by pairing the Coffee Museum with these nearby cultural landmarks.">
        <div className="grid grid--2">
          {attractions.map(a => (
            <div key={a.name}>
              <img src={a.image} alt={a.name} style={{ width: '100%', height: 200, objectFit: 'cover' }} />
              <div style={{ paddingTop: '1rem' }}>
                <span className="tag">{a.distance}</span>
                <h3 style={{ margin: '0.4rem 0 0.5rem' }}>{a.name}</h3>
                <p className="muted" style={{ fontSize: '0.92rem' }}>{a.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}
