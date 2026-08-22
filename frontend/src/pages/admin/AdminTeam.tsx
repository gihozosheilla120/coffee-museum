import { useEffect, useState } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { API_URL, resolveAssetUrl, useAuth } from '../../context/AuthContext';
import ConfirmDialog from '../../components/ConfirmDialog';

type TeamUser = {
  id: string;
  name: string;
  email: string;
  role: string;
  avatarUrl: string | null;
  createdAt: string;
};

const ROLES = ['VISITOR', 'CUSTOMER', 'CONTENT_ADMIN', 'MARKETPLACE_ADMIN', 'SALES_MANAGER', 'SYSTEM_ADMIN'];

function errorMessage(err: unknown, fallback: string) {
  if (axios.isAxiosError(err) && err.response?.data?.message) return err.response.data.message;
  return fallback;
}

export default function AdminTeam() {
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState<TeamUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [pending, setPending] = useState<{ id: string; role: string } | null>(null);
  const [savingId, setSavingId] = useState<string | null>(null);

  const load = () => {
    setLoading(true);
    axios
      .get(`${API_URL}/users`)
      .then(res => setUsers(res.data))
      .catch(() => setError("Couldn't load the team list."))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const confirmRoleChange = async () => {
    if (!pending) return;
    setSavingId(pending.id);
    try {
      await axios.patch(`${API_URL}/users/${pending.id}/role`, { role: pending.role });
      setUsers(prev => prev.map(u => (u.id === pending.id ? { ...u, role: pending.role } : u)));
    } catch (err) {
      setError(errorMessage(err, 'Could not update that person\'s role.'));
    } finally {
      setSavingId(null);
      setPending(null);
    }
  };

  return (
    <div className="section">
      <div className="container">
        <span className="eyebrow">Admin</span>
        <h1>Team</h1>
        <p className="section-intro">Promote staff to Sales Manager, Marketplace Admin, or System Admin.</p>

        <nav className="flex gap-2" style={{ marginBottom: '2rem' }}>
          <NavLink to="/admin/products" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>Products</NavLink>
          <NavLink to="/admin/team" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>Team</NavLink>
        </nav>

        {error && <p style={{ color: 'var(--color-crimson)', fontWeight: 600 }}>{error}</p>}

        {loading ? (
          <p className="muted">Loading team...</p>
        ) : (
          <div className="flex flex-col gap-2">
            {users.map(u => (
              <div key={u.id} className="card">
                <div className="card__body flex items-center justify-between" style={{ gap: '1rem', flexWrap: 'wrap' }}>
                  <div className="flex items-center gap-2">
                    <div
                      style={{
                        width: 40, height: 40, borderRadius: '50%', overflow: 'hidden', flexShrink: 0,
                        background: 'var(--color-navy)', color: 'white', display: 'flex',
                        alignItems: 'center', justifyContent: 'center', fontWeight: 800,
                      }}
                    >
                      {resolveAssetUrl(u.avatarUrl) ? (
                        <img src={resolveAssetUrl(u.avatarUrl)!} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      ) : (
                        u.name.charAt(0).toUpperCase()
                      )}
                    </div>
                    <div>
                      <h3 style={{ margin: 0, fontSize: '1rem' }}>
                        {u.name} {u.email === currentUser?.email && <span className="muted" style={{ fontWeight: 400, fontSize: '0.85rem' }}>(you)</span>}
                      </h3>
                      <span className="muted" style={{ fontSize: '0.82rem' }}>{u.email}</span>
                    </div>
                  </div>
                  <select
                    value={u.role}
                    disabled={savingId === u.id}
                    onChange={e => setPending({ id: u.id, role: e.target.value })}
                    style={{ padding: '0.5rem 0.7rem', borderRadius: 6, border: '1px solid var(--color-platinum)' }}
                  >
                    {ROLES.map(r => (
                      <option key={r} value={r}>{r}</option>
                    ))}
                  </select>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <ConfirmDialog
        open={!!pending}
        title="Change role?"
        message={pending ? `This will change this person's role to ${pending.role}.` : ''}
        confirmLabel="Change Role"
        onConfirm={confirmRoleChange}
        onCancel={() => setPending(null)}
      />
    </div>
  );
}
