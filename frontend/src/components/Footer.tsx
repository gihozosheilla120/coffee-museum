import { Link } from 'react-router-dom';
import Logo from './Logo';

const columns = [
  {
    heading: 'Visit',
    links: [
      { to: '/visit', label: 'Opening Hours' },
      { to: '/visit#tours', label: 'Guided Tours' },
      { to: '/visit#tasting', label: 'Coffee Tastings' },
      { to: '/visit#tours', label: 'School Visits' },
    ],
  },
  {
    heading: 'Learn',
    links: [
      { to: '/our-story', label: 'Our Story' },
      { to: '/explore', label: 'Galleries' },
      { to: '/coffee-journey', label: 'Coffee Journey' },
      { to: '/marketplace', label: 'Marketplace' },
    ],
  },
  {
    heading: 'Contact',
    links: [
      { to: '/contact', label: 'Nyanza, Rwanda' },
      { to: '/contact', label: 'Telephone to be supplied' },
      { to: '/contact', label: 'Send an Enquiry' },
    ],
  },
];

export default function Footer() {
  return (
    <footer style={{ backgroundColor: 'var(--color-navy)', color: 'var(--color-platinum)', marginTop: 'auto' }}>
      <div className="container" style={{ padding: '3.5rem 1.5rem 2.5rem' }}>
        <div className="grid grid--4" style={{ gap: '2.5rem' }}>
          <div>
            <Logo variant="light" size={32} />
            <p style={{ color: 'rgba(209,217,224,0.72)', marginTop: '1.1rem', fontSize: '0.88rem' }}>
              A centre for preserving Rwanda's coffee history, educating visitors about the coffee value chain,
              promoting tourism, and supporting the coffee industry.
            </p>
          </div>
          {columns.map(col => (
            <div key={col.heading}>
              <h3 style={{ color: 'white', fontSize: '0.78rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1.1rem' }}>
                {col.heading}
              </h3>
              <div className="flex flex-col gap-1">
                {col.links.map(link => (
                  <Link
                    key={link.label}
                    to={link.to}
                    style={{ color: 'rgba(209,217,224,0.82)', textDecoration: 'none', fontSize: '0.9rem' }}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ borderTop: '1px solid rgba(209,217,224,0.15)' }}>
        <div
          className="container flex items-center justify-between"
          style={{ padding: '1.25rem 1.5rem', fontSize: '0.82rem', color: 'rgba(209,217,224,0.6)', flexWrap: 'wrap', gap: '0.5rem' }}
        >
          <span>&copy; {new Date().getFullYear()} Coffee Museum. Coffee sub-sector coordinated under NAEB.</span>
          <span style={{ color: 'rgba(209,217,224,0.45)' }}>Administration</span>
        </div>
      </div>
    </footer>
  );
}
