import { useState } from 'react';
import Section from '../components/Section';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // No contact endpoint exists on the backend yet — this confirms locally for now.
    setSent(true);
  };

  return (
    <Section eyebrow="Contact" title="Get in Touch" intro="Questions about visiting, group tours, or wholesale coffee orders? Send us a message.">
      <div className="grid grid--2">
        <form onSubmit={handleSubmit} className="card">
          <div className="card__body flex flex-col gap-2">
            <label className="flex flex-col gap-1">
              <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>Name</span>
              <input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                style={{ padding: '0.6rem', borderRadius: 6, border: '1px solid var(--color-platinum)' }} />
            </label>
            <label className="flex flex-col gap-1">
              <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>Email</span>
              <input required type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                style={{ padding: '0.6rem', borderRadius: 6, border: '1px solid var(--color-platinum)' }} />
            </label>
            <label className="flex flex-col gap-1">
              <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>Subject</span>
              <input required value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })}
                style={{ padding: '0.6rem', borderRadius: 6, border: '1px solid var(--color-platinum)' }} />
            </label>
            <label className="flex flex-col gap-1">
              <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>Message</span>
              <textarea required rows={4} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
                style={{ padding: '0.6rem', borderRadius: 6, border: '1px solid var(--color-platinum)', fontFamily: 'inherit' }} />
            </label>
            <button className="btn" type="submit">Send Message</button>
            {sent && <p style={{ color: 'var(--color-green)', fontWeight: 600 }}>Thanks &mdash; we'll be in touch soon.</p>}
          </div>
        </form>

        <div className="card">
          <div className="card__body">
            <h3>Museum Details</h3>
            <p className="muted">Nyanza, Southern Province, Rwanda</p>
            <p className="muted">Open Daily: 8:00 AM &ndash; 6:00 PM</p>
            <p className="muted">info@coffeemuseum.rw</p>
          </div>
        </div>
      </div>
    </Section>
  );
}
