import { useRef, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth, resolveAssetUrl } from '../context/AuthContext';
import ConfirmDialog from '../components/ConfirmDialog';

const LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'fr', label: 'Français' },
  { code: 'rw', label: 'Ikinyarwanda' },
];

function errorMessage(err: unknown, fallback: string) {
  if (axios.isAxiosError(err) && err.response?.data?.message) return err.response.data.message;
  return fallback;
}

export default function Profile() {
  const { user, signOut, updateProfile, changePassword, uploadAvatar } = useAuth();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [name, setName] = useState(user?.name ?? '');
  const [email, setEmail] = useState(user?.email ?? '');
  const [language, setLanguage] = useState(user?.language ?? 'en');
  const [passwords, setPasswords] = useState({ current: '', next: '', confirm: '' });

  const [nameStatus, setNameStatus] = useState<{ state: 'idle' | 'saving' | 'error' | 'saved'; message?: string }>({ state: 'idle' });
  const [emailStatus, setEmailStatus] = useState<{ state: 'idle' | 'saving' | 'error' | 'saved'; message?: string }>({ state: 'idle' });
  const [langStatus, setLangStatus] = useState<{ state: 'idle' | 'saving' | 'error' | 'saved'; message?: string }>({ state: 'idle' });
  const [pwStatus, setPwStatus] = useState<{ state: 'idle' | 'saving' | 'error' | 'saved'; message?: string }>({ state: 'idle' });
  const [avatarStatus, setAvatarStatus] = useState<{ state: 'idle' | 'saving' | 'error'; message?: string }>({ state: 'idle' });
  const [confirmingSignOut, setConfirmingSignOut] = useState(false);

  const handleSignOut = () => {
    signOut();
    navigate('/');
  };

  const handleSaveName = async () => {
    setNameStatus({ state: 'saving' });
    try {
      await updateProfile({ name });
      setNameStatus({ state: 'saved' });
    } catch (err) {
      setNameStatus({ state: 'error', message: errorMessage(err, 'Could not update your name right now.') });
    }
  };

  const handleSaveEmail = async () => {
    setEmailStatus({ state: 'saving' });
    try {
      await updateProfile({ email });
      setEmailStatus({ state: 'saved' });
    } catch (err) {
      setEmailStatus({ state: 'error', message: errorMessage(err, 'Could not update your email right now.') });
    }
  };

  const handleSaveLanguage = async (code: string) => {
    setLanguage(code);
    setLangStatus({ state: 'saving' });
    try {
      await updateProfile({ language: code });
      setLangStatus({ state: 'saved' });
    } catch (err) {
      setLangStatus({ state: 'error', message: errorMessage(err, 'Could not update your language right now.') });
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passwords.next !== passwords.confirm) {
      setPwStatus({ state: 'error', message: 'New password and confirmation do not match.' });
      return;
    }
    setPwStatus({ state: 'saving' });
    try {
      await changePassword(passwords.current, passwords.next);
      setPwStatus({ state: 'saved' });
      setPasswords({ current: '', next: '', confirm: '' });
    } catch (err) {
      setPwStatus({ state: 'error', message: errorMessage(err, 'Could not change your password right now.') });
    }
  };

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setAvatarStatus({ state: 'saving' });
    try {
      await uploadAvatar(file);
      setAvatarStatus({ state: 'idle' });
    } catch (err) {
      setAvatarStatus({ state: 'error', message: errorMessage(err, 'Could not upload that image.') });
    }
  };

  const avatarUrl = resolveAssetUrl(user?.avatarUrl);

  return (
    <div className="section container" style={{ maxWidth: 560 }}>
      <span className="eyebrow">Your Account</span>
      <h1>{user?.name}</h1>

      {/* Avatar */}
      <div className="card" style={{ marginTop: '1.5rem' }}>
        <div className="card__body flex items-center gap-3">
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: '50%',
              overflow: 'hidden',
              flexShrink: 0,
              background: 'var(--color-navy)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: 800,
              fontSize: '1.4rem',
            }}
          >
            {avatarUrl ? (
              <img src={avatarUrl} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              user?.name?.charAt(0).toUpperCase()
            )}
          </div>
          <div>
            <button className="btn btn--outline btn--sm" type="button" onClick={() => fileInputRef.current?.click()}>
              {avatarStatus.state === 'saving' ? 'Uploading...' : 'Change photo'}
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              style={{ display: 'none' }}
            />
            {avatarStatus.state === 'error' && (
              <p style={{ color: 'var(--color-crimson)', fontSize: '0.82rem', marginTop: '0.4rem' }}>{avatarStatus.message}</p>
            )}
          </div>
        </div>
      </div>

      {/* Name */}
      <div className="card" style={{ marginTop: '1.25rem' }}>
        <div className="card__body">
          <div className="stat-label">Name</div>
          <div className="flex gap-2" style={{ marginTop: '0.5rem' }}>
            <input
              value={name}
              onChange={e => { setName(e.target.value); setNameStatus({ state: 'idle' }); }}
              style={{ flex: 1, padding: '0.6rem', borderRadius: 6, border: '1px solid var(--color-platinum)' }}
            />
            <button className="btn btn--sm" type="button" onClick={handleSaveName} disabled={nameStatus.state === 'saving'}>
              Save
            </button>
          </div>
          {nameStatus.state === 'saved' && <p style={{ color: 'var(--color-green)', fontSize: '0.82rem', marginTop: '0.4rem' }}>Saved.</p>}
          {nameStatus.state === 'error' && <p style={{ color: 'var(--color-crimson)', fontSize: '0.82rem', marginTop: '0.4rem' }}>{nameStatus.message}</p>}
        </div>
      </div>

      {/* Email */}
      <div className="card" style={{ marginTop: '1.25rem' }}>
        <div className="card__body">
          <div className="stat-label">Email</div>
          <div className="flex gap-2" style={{ marginTop: '0.5rem' }}>
            <input
              type="email"
              value={email}
              onChange={e => { setEmail(e.target.value); setEmailStatus({ state: 'idle' }); }}
              style={{ flex: 1, padding: '0.6rem', borderRadius: 6, border: '1px solid var(--color-platinum)' }}
            />
            <button className="btn btn--sm" type="button" onClick={handleSaveEmail} disabled={emailStatus.state === 'saving'}>
              Save
            </button>
          </div>
          {emailStatus.state === 'saved' && <p style={{ color: 'var(--color-green)', fontSize: '0.82rem', marginTop: '0.4rem' }}>Saved.</p>}
          {emailStatus.state === 'error' && <p style={{ color: 'var(--color-crimson)', fontSize: '0.82rem', marginTop: '0.4rem' }}>{emailStatus.message}</p>}
        </div>
      </div>

      {/* Language */}
      <div className="card" style={{ marginTop: '1.25rem' }}>
        <div className="card__body">
          <div className="stat-label">Language</div>
          <div className="flex gap-2" style={{ marginTop: '0.5rem' }}>
            {LANGUAGES.map(lang => (
              <button
                key={lang.code}
                type="button"
                onClick={() => handleSaveLanguage(lang.code)}
                className={language === lang.code ? 'btn btn--sm' : 'btn btn--outline btn--sm'}
              >
                {lang.label}
              </button>
            ))}
          </div>
          <p className="muted" style={{ fontSize: '0.8rem', marginTop: '0.5rem' }}>
            This saves your preference to your account. Full site translation isn't available yet — pages still display in English.
          </p>
          {langStatus.state === 'error' && <p style={{ color: 'var(--color-crimson)', fontSize: '0.82rem' }}>{langStatus.message}</p>}
        </div>
      </div>

      {/* Password */}
      <form onSubmit={handleChangePassword} className="card" style={{ marginTop: '1.25rem' }}>
        <div className="card__body flex flex-col gap-2">
          <div className="stat-label">Change Password</div>
          <input
            type="password"
            placeholder="Current password"
            required
            value={passwords.current}
            onChange={e => setPasswords({ ...passwords, current: e.target.value })}
            style={{ padding: '0.6rem', borderRadius: 6, border: '1px solid var(--color-platinum)' }}
          />
          <input
            type="password"
            placeholder="New password"
            required
            minLength={6}
            value={passwords.next}
            onChange={e => setPasswords({ ...passwords, next: e.target.value })}
            style={{ padding: '0.6rem', borderRadius: 6, border: '1px solid var(--color-platinum)' }}
          />
          <input
            type="password"
            placeholder="Confirm new password"
            required
            minLength={6}
            value={passwords.confirm}
            onChange={e => setPasswords({ ...passwords, confirm: e.target.value })}
            style={{ padding: '0.6rem', borderRadius: 6, border: '1px solid var(--color-platinum)' }}
          />
          <button className="btn btn--outline btn--sm" type="submit" style={{ alignSelf: 'flex-start' }} disabled={pwStatus.state === 'saving'}>
            {pwStatus.state === 'saving' ? 'Updating...' : 'Update Password'}
          </button>
          {pwStatus.state === 'saved' && <p style={{ color: 'var(--color-green)', fontSize: '0.82rem' }}>Password updated.</p>}
          {pwStatus.state === 'error' && <p style={{ color: 'var(--color-crimson)', fontSize: '0.82rem' }}>{pwStatus.message}</p>}
        </div>
      </form>

      <div className="flex gap-2" style={{ marginTop: '1.5rem' }}>
        <button className="btn btn--outline" type="button" onClick={() => setConfirmingSignOut(true)}>Sign Out</button>
      </div>

      <ConfirmDialog
        open={confirmingSignOut}
        title="Sign out?"
        message="You'll need to sign in again to access your cart and profile."
        confirmLabel="Sign Out"
        onConfirm={handleSignOut}
        onCancel={() => setConfirmingSignOut(false)}
      />
    </div>
  );
}
