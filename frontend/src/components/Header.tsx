import { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import Logo from './Logo';
import ConfirmDialog from './ConfirmDialog';
import { useCart } from '../context/CartContext';
import { useAuth, resolveAssetUrl } from '../context/AuthContext';

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/our-story', label: 'Our Story' },
  { to: '/explore', label: 'Explore' },
  { to: '/coffee-journey', label: 'Coffee Journey' },
  { to: '/visit', label: 'Visit' },
  { to: '/marketplace', label: 'Marketplace' },
  { to: '/contact', label: 'Contact' },
];

function AvatarBadge({ name, avatarUrl, size = 26 }: { name?: string; avatarUrl?: string | null; size?: number }) {
  const resolved = resolveAssetUrl(avatarUrl);
  if (resolved) {
    return (
      <img
        src={resolved}
        alt=""
        style={{ width: size, height: size, borderRadius: '50%', objectFit: 'cover' }}
      />
    );
  }
  return (
    <span
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        background: 'var(--color-navy)',
        color: 'white',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: size * 0.42,
        fontWeight: 800,
        flexShrink: 0,
      }}
    >
      {name?.charAt(0).toUpperCase()}
    </span>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const [confirmingSignOut, setConfirmingSignOut] = useState(false);
  const { itemCount } = useCart();
  const { isAuthenticated, user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut();
    setConfirmingSignOut(false);
    setOpen(false);
    navigate('/');
  };

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
          {isAuthenticated ? (
            <>
              {(user?.role === 'SALES_MANAGER' || user?.role === 'SYSTEM_ADMIN') && (
                <Link to="/sales" className="nav-link">Sales Portal</Link>
              )}
              <Link to="/profile" aria-label="Your profile" style={{ display: 'inline-flex' }}>
                <AvatarBadge name={user?.name} avatarUrl={user?.avatarUrl} />
              </Link>
              <Link to="/cart" className="cart-pill">
                Cart
                <span className="cart-pill__badge">{itemCount}</span>
              </Link>
              <button className="btn btn--outline btn--sm" type="button" onClick={() => setConfirmingSignOut(true)}>
                Sign Out
              </button>
            </>
          ) : (
            <Link to="/sign-in" className="btn btn--outline btn--sm">Sign In</Link>
          )}
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
            {isAuthenticated ? (
              <>
                {(user?.role === 'SALES_MANAGER' || user?.role === 'SYSTEM_ADMIN') && (
                  <Link to="/sales" className="nav-link" onClick={() => setOpen(false)}>Sales Portal</Link>
                )}
                <Link
                  to="/profile"
                  className="nav-link"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
                  onClick={() => setOpen(false)}
                >
                  <AvatarBadge name={user?.name} avatarUrl={user?.avatarUrl} size={22} />
                  Profile
                </Link>
                <Link to="/cart" className="btn btn--sm" style={{ alignSelf: 'flex-start', marginTop: '0.5rem' }} onClick={() => setOpen(false)}>
                  Cart{itemCount > 0 ? ` (${itemCount})` : ''}
                </Link>
                <button className="btn btn--outline btn--sm" type="button" style={{ alignSelf: 'flex-start' }} onClick={() => setConfirmingSignOut(true)}>
                  Sign Out
                </button>
              </>
            ) : (
              <Link to="/sign-in" className="btn btn--sm" style={{ alignSelf: 'flex-start', marginTop: '0.5rem' }} onClick={() => setOpen(false)}>
                Sign In
              </Link>
            )}
          </div>
        </div>
      )}

      <ConfirmDialog
        open={confirmingSignOut}
        title="Sign out?"
        message="You'll need to sign in again to access your cart and profile."
        confirmLabel="Sign Out"
        onConfirm={handleSignOut}
        onCancel={() => setConfirmingSignOut(false)}
      />

      <style>{`
        @media (min-width: 980px) {
          .desktop-nav { display: flex !important; }
          .mobile-toggle { display: none !important; }
        }
      `}</style>
    </header>
  );
}
