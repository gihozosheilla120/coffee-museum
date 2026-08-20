import { useState } from 'react';
import axios from 'axios';
import Section from '../components/Section';
import { attractions } from '../data/attractions';
import { visitFaqs } from '../data/faqs';
import samplesImage from '../assets/samples.jpg';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';

type BookingState = 'idle' | 'submitting' | 'success' | 'error';

export default function Visit() {
  const [form, setForm] = useState({
    guestName: '',
    guestEmail: '',
    sessionType: 'Guided Tour',
    bookingDate: '',
    partySize: 1,
  });
  const [status, setStatus] = useState<BookingState>('idle');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    try {
      await axios.post(`${API_URL}/bookings`, form);
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  return (
    <div>
      <section className="section--tight">
        <div className="container">
          <span className="eyebrow">Visit</span>
          <h1>Plan Your Visit to Nyanza</h1>
          <p className="section-intro">
            Combine your visit with nearby historic hubs like the Nyanza King's Palace and the Huye Ethnographic
            Museum for a full day of Rwandan heritage.
          </p>
        </div>
      </section>

      <Section eyebrow="Hours & Location" title="Opening Hours & Directions" tight>
        <div className="divider-row grid grid--2">
          <div className="divider-col">
            <h3>Opening Hours</h3>
            <p className="muted">Open Daily: 8:00 AM &ndash; 6:00 PM<br />Last entry: 5:00 PM</p>
          </div>
          <div className="divider-col">
            <h3>Location</h3>
            <p className="muted">Nyanza, Southern Province, Rwanda &mdash; a short drive from the Nyanza King's Palace.</p>
          </div>
        </div>
      </Section>

      <div id="tours" />
      <Section eyebrow="Guided Tours" title="Book a Guided Tour" alt intro="Group, school, and private tours are available daily. Submit your details and our team will confirm availability.">
        <form onSubmit={handleSubmit} className="card" style={{ maxWidth: 560 }}>
          <div className="card__body flex flex-col gap-2">
            <label className="flex flex-col gap-1">
              <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>Full Name</span>
              <input required value={form.guestName} onChange={e => setForm({ ...form, guestName: e.target.value })}
                style={{ padding: '0.6rem', borderRadius: 6, border: '1px solid var(--color-platinum)' }} />
            </label>
            <label className="flex flex-col gap-1">
              <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>Email</span>
              <input required type="email" value={form.guestEmail} onChange={e => setForm({ ...form, guestEmail: e.target.value })}
                style={{ padding: '0.6rem', borderRadius: 6, border: '1px solid var(--color-platinum)' }} />
            </label>
            <label className="flex flex-col gap-1">
              <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>Session Type</span>
              <select value={form.sessionType} onChange={e => setForm({ ...form, sessionType: e.target.value })}
                style={{ padding: '0.6rem', borderRadius: 6, border: '1px solid var(--color-platinum)' }}>
                <option>Guided Tour</option>
                <option>Coffee Tasting Experience</option>
                <option>School Group Visit</option>
                <option>Private Group Tour</option>
              </select>
            </label>
            <div className="grid grid--2" style={{ gap: '1rem' }}>
              <label className="flex flex-col gap-1">
                <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>Date</span>
                <input required type="date" value={form.bookingDate} onChange={e => setForm({ ...form, bookingDate: e.target.value })}
                  style={{ padding: '0.6rem', borderRadius: 6, border: '1px solid var(--color-platinum)' }} />
              </label>
              <label className="flex flex-col gap-1">
                <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>Party Size</span>
                <input required type="number" min={1} value={form.partySize}
                  onChange={e => setForm({ ...form, partySize: Number(e.target.value) })}
                  style={{ padding: '0.6rem', borderRadius: 6, border: '1px solid var(--color-platinum)' }} />
              </label>
            </div>
            <button className="btn" type="submit" disabled={status === 'submitting'} style={{ marginTop: '0.5rem' }}>
              {status === 'submitting' ? 'Submitting...' : 'Request Booking'}
            </button>
            {status === 'success' && <p style={{ color: 'var(--color-green)', fontWeight: 600 }}>Booking request received &mdash; we'll confirm by email.</p>}
            {status === 'error' && <p style={{ color: 'var(--color-crimson)', fontWeight: 600 }}>Couldn't reach the booking service right now. Please try again shortly or contact us directly.</p>}
          </div>
        </form>
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
