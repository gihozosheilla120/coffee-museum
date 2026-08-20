import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import Logo from './Logo';
import { useCart } from '../context/CartContext';

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/our-story', label: 'Our Story' },
  { to: '/explore', label: 'Explore' },
  { to: '/coffee-journey', label: 'Coffee Journey' },
  { to: '/visit', label: 'Visit' },
  { to: '/marketplace', label: 'Marketplace' },
  { to: '/contact', label: 'Contact' },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const { itemCount } = useCart();

  return (
    <header
      style={{
        backgroundColor: 'var(--color-alabaster)',
        borderBottom: '1px solid var(--color-platinum)',
        boxShadow: '0 2px 12px rgba(17, 25, 34, 0.04)',
        position: 'sticky',
        top: 0,
        zIndex: 50,
      }}
    >
      <div
        className="container"
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem 1.5rem' }}
      >
        <Link to="/" onClick={() => setOpen(false)} style={{ textDecoration: 'none' }}>
          <Logo size={34} />
        </Link>

        <nav className="desktop-nav" style={{ display: 'none', alignItems: 'center', gap: '1.75rem' }}>
          {NAV_LINKS.map(link => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="desktop-nav" style={{ display: 'none', alignItems: 'center', gap: '0.75rem' }}>
          <div className="lang-switch">
            <span className="lang-switch__pill lang-switch__pill--active">EN</span>
            <span className="lang-switch__pill">FR</span>
            <span className="lang-switch__pill">RW</span>
          </div>
          <button className="btn btn--outline btn--sm" type="button">Sign In</button>
          <Link to="/cart" className="cart-pill">
            Cart
            <span className="cart-pill__badge">{itemCount}</span>
          </Link>
        </div>

        <button
          className="mobile-toggle"
          onClick={() => setOpen(o => !o)}
          aria-label="Toggle navigation"
          style={{
            display: 'inline-flex',
            background: 'transparent',
            border: '1px solid var(--color-platinum)',
            borderRadius: 6,
            color: 'var(--color-navy)',
            padding: '0.5rem 0.75rem',
            cursor: 'pointer',
            fontWeight: 700,
          }}
        >
          {open ? 'Close' : 'Menu'}
        </button>
      </div>

      {open && (
        <div style={{ borderTop: '1px solid var(--color-platinum)', padding: '1rem 1.5rem 1.5rem' }}>
          <div className="flex flex-col gap-2">
            {NAV_LINKS.map(link => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </NavLink>
            ))}
            <Link to="/cart" className="btn btn--sm" style={{ alignSelf: 'flex-start', marginTop: '0.5rem' }} onClick={() => setOpen(false)}>
              Cart{itemCount > 0 ? ` (${itemCount})` : ''}
            </Link>
          </div>
        </div>
      )}

      <style>{`
        @media (min-width: 980px) {
          .desktop-nav { display: flex !important; }
          .mobile-toggle { display: none !important; }
        }
      `}</style>
    </header>
  );
}
