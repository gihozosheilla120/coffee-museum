import { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

type Mode = 'signin' | 'signup';
type Status = 'idle' | 'submitting' | 'error';

export default function SignIn() {
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = (location.state as { from?: string } | null)?.from || '/marketplace';

  const [mode, setMode] = useState<Mode>('signin');
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');
  const [signupDone, setSignupDone] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setError('');
    try {
      if (mode === 'signin') {
        await signIn(form.email, form.password);
        navigate(redirectTo, { replace: true });
      } else {
        await signUp(form.name, form.email, form.password);
        setSignupDone(true);
        setMode('signin');
        setForm(f => ({ ...f, password: '' }));
      }
      setStatus('idle');
    } catch {
      setStatus('error');
      setError("Couldn't reach the account service right now. Please try again shortly.");
    }
  };

  return (
    <div className="section container" style={{ maxWidth: 460 }}>
      <span className="eyebrow">{mode === 'signin' ? 'Sign In' : 'Create Account'}</span>
      <h1>{mode === 'signin' ? 'Welcome back' : 'Create your account'}</h1>
      <p className="muted">
        {mode === 'signin'
          ? "Sign in to shop the Coffee Museum marketplace."
          : 'Create an account to start shopping direct-trade coffee.'}
      </p>

      {signupDone && mode === 'signin' && (
        <p style={{ color: 'var(--color-green)', fontWeight: 600 }}>
          Account created — sign in below to continue.
        </p>
      )}

      <form onSubmit={handleSubmit} className="card" style={{ marginTop: '1.5rem' }}>
        <div className="card__body flex flex-col gap-2">
          {mode === 'signup' && (
            <label className="flex flex-col gap-1">
              <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>Full Name</span>
              <input
                required
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                style={{ padding: '0.6rem', borderRadius: 6, border: '1px solid var(--color-platinum)' }}
              />
            </label>
          )}
          <label className="flex flex-col gap-1">
            <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>Email</span>
            <input
              required
              type="email"
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
              style={{ padding: '0.6rem', borderRadius: 6, border: '1px solid var(--color-platinum)' }}
            />
          </label>
          <label className="flex flex-col gap-1">
            <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>Password</span>
            <input
              required
              type="password"
              minLength={6}
              value={form.password}
              onChange={e => setForm({ ...form, password: e.target.value })}
              style={{ padding: '0.6rem', borderRadius: 6, border: '1px solid var(--color-platinum)' }}
            />
          </label>

          <button className="btn" type="submit" disabled={status === 'submitting'} style={{ marginTop: '0.5rem' }}>
            {status === 'submitting' ? 'Please wait...' : mode === 'signin' ? 'Sign In' : 'Create Account'}
          </button>

          {status === 'error' && <p style={{ color: 'var(--color-crimson)', fontWeight: 600 }}>{error}</p>}
        </div>
      </form>

      <p className="muted" style={{ marginTop: '1.5rem', fontSize: '0.9rem' }}>
        {mode === 'signin' ? (
          <>
            New here?{' '}
            <button
              type="button"
              onClick={() => { setMode('signup'); setError(''); }}
              style={{ background: 'none', border: 'none', padding: 0, color: 'var(--color-terracotta)', fontWeight: 700, cursor: 'pointer' }}
            >
              Create an account
            </button>
          </>
        ) : (
          <>
            Already have an account?{' '}
            <button
              type="button"
              onClick={() => { setMode('signin'); setError(''); }}
              style={{ background: 'none', border: 'none', padding: 0, color: 'var(--color-terracotta)', fontWeight: 700, cursor: 'pointer' }}
            >
              Sign in
            </button>
          </>
        )}
      </p>
      <Link to="/" className="muted" style={{ fontSize: '0.85rem' }}>&larr; Back to home</Link>
    </div>
  );
}
