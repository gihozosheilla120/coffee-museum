import { useEffect, useState } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { API_URL, resolveAssetUrl } from '../../context/AuthContext';
import { Product } from '../../types';

const emptyForm = {
  title: '',
  description: '',
  priceRWF: '',
  stockCount: '',
  originInfo: '',
  producerName: '',
  altitude: '',
  processType: '',
};

function errorMessage(err: unknown, fallback: string) {
  if (axios.isAxiosError(err) && err.response?.data?.message) return err.response.data.message;
  return fallback;
}

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(emptyForm);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState('');
  const [savingId, setSavingId] = useState<string | null>(null);

  const load = () => {
    setLoading(true);
    axios
      .get(`${API_URL}/products/admin/all`)
      .then(res => setProducts(res.data))
      .catch(() => setError("Couldn't load products."))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreating(true);
    setError('');
    try {
      const body = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        if (value) body.append(key, value);
      });
      if (imageFile) body.append('image', imageFile);

      await axios.post(`${API_URL}/products`, body, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setForm(emptyForm);
      setImageFile(null);
      load();
    } catch (err) {
      setError(errorMessage(err, 'Could not create that product.'));
    } finally {
      setCreating(false);
    }
  };

  const handleFieldUpdate = async (product: Product, field: 'priceRWF' | 'stockCount', value: string) => {
    const num = Number(value);
    if (Number.isNaN(num)) return;
    setSavingId(product.id);
    try {
      const body = new FormData();
      body.append(field, String(num));
      await axios.patch(`${API_URL}/products/${product.id}`, body, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setProducts(prev => prev.map(p => (p.id === product.id ? { ...p, [field]: num } : p)));
    } catch (err) {
      setError(errorMessage(err, 'Could not update that product.'));
    } finally {
      setSavingId(null);
    }
  };

  const handleToggleActive = async (product: Product) => {
    setSavingId(product.id);
    try {
      if (product.isActive) {
        await axios.delete(`${API_URL}/products/${product.id}`);
      } else {
        const body = new FormData();
        body.append('isActive', 'true');
        await axios.patch(`${API_URL}/products/${product.id}`, body, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      }
      setProducts(prev => prev.map(p => (p.id === product.id ? { ...p, isActive: !p.isActive } : p)));
    } catch (err) {
      setError(errorMessage(err, 'Could not update that product.'));
    } finally {
      setSavingId(null);
    }
  };

  return (
    <div className="section">
      <div className="container">
        <span className="eyebrow">Admin</span>
        <h1>Products</h1>

        <nav className="flex gap-2" style={{ marginBottom: '2rem' }}>
          <NavLink to="/admin/products" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>Products</NavLink>
          <NavLink to="/admin/team" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>Team</NavLink>
        </nav>

        {error && <p style={{ color: 'var(--color-crimson)', fontWeight: 600 }}>{error}</p>}

        <form onSubmit={handleCreate} className="card" style={{ marginBottom: '2.5rem' }}>
          <div className="card__body">
            <h3 style={{ marginBottom: '1rem' }}>Add a Product</h3>
            <div className="grid grid--2" style={{ gap: '1rem' }}>
              <label className="flex flex-col gap-1">
                <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>Title *</span>
                <input required value={form.title} onChange={e => setForm({ ...form, title: e.target.value })}
                  style={{ padding: '0.6rem', borderRadius: 6, border: '1px solid var(--color-platinum)' }} />
              </label>
              <label className="flex flex-col gap-1">
                <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>Price (RWF) *</span>
                <input required type="number" min={0} value={form.priceRWF} onChange={e => setForm({ ...form, priceRWF: e.target.value })}
                  style={{ padding: '0.6rem', borderRadius: 6, border: '1px solid var(--color-platinum)' }} />
              </label>
              <label className="flex flex-col gap-1">
                <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>Stock Count *</span>
                <input required type="number" min={0} value={form.stockCount} onChange={e => setForm({ ...form, stockCount: e.target.value })}
                  style={{ padding: '0.6rem', borderRadius: 6, border: '1px solid var(--color-platinum)' }} />
              </label>
              <label className="flex flex-col gap-1">
                <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>Photo</span>
                <input type="file" accept="image/*" onChange={e => setImageFile(e.target.files?.[0] ?? null)} />
              </label>
              <label className="flex flex-col gap-1" style={{ gridColumn: '1 / -1' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>Description</span>
                <textarea rows={2} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })}
                  style={{ padding: '0.6rem', borderRadius: 6, border: '1px solid var(--color-platinum)', fontFamily: 'inherit' }} />
              </label>
              <label className="flex flex-col gap-1">
                <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>Origin</span>
                <input value={form.originInfo} onChange={e => setForm({ ...form, originInfo: e.target.value })}
                  style={{ padding: '0.6rem', borderRadius: 6, border: '1px solid var(--color-platinum)' }} />
              </label>
              <label className="flex flex-col gap-1">
                <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>Producer</span>
                <input value={form.producerName} onChange={e => setForm({ ...form, producerName: e.target.value })}
                  style={{ padding: '0.6rem', borderRadius: 6, border: '1px solid var(--color-platinum)' }} />
              </label>
              <label className="flex flex-col gap-1">
                <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>Altitude (m)</span>
                <input type="number" value={form.altitude} onChange={e => setForm({ ...form, altitude: e.target.value })}
                  style={{ padding: '0.6rem', borderRadius: 6, border: '1px solid var(--color-platinum)' }} />
              </label>
              <label className="flex flex-col gap-1">
                <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>Process Type</span>
                <input value={form.processType} onChange={e => setForm({ ...form, processType: e.target.value })}
                  style={{ padding: '0.6rem', borderRadius: 6, border: '1px solid var(--color-platinum)' }} />
              </label>
            </div>
            <button className="btn" type="submit" disabled={creating} style={{ marginTop: '1.25rem' }}>
              {creating ? 'Adding...' : 'Add Product'}
            </button>
          </div>
        </form>

        {loading ? (
          <p className="muted">Loading products...</p>
        ) : (
          <div className="flex flex-col gap-2">
            {products.map(product => (
              <div key={product.id} className="card" style={{ opacity: product.isActive ? 1 : 0.55 }}>
                <div className="card__body flex items-center justify-between" style={{ gap: '1rem', flexWrap: 'wrap' }}>
                  <div className="flex items-center gap-2">
                    {product.imageUrl && (
                      <img
                        src={resolveAssetUrl(product.imageUrl)!}
                        alt={product.title}
                        style={{ width: 56, height: 56, objectFit: 'cover', borderRadius: 6 }}
                      />
                    )}
                    <div>
                      <h3 style={{ margin: 0, fontSize: '1rem' }}>{product.title}</h3>
                      <span className="muted" style={{ fontSize: '0.78rem' }}>
                        {product.isActive ? 'Active' : 'Deactivated'}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <label className="flex items-center gap-1" style={{ fontSize: '0.8rem' }}>
                      Price
                      <input
                        type="number"
                        defaultValue={product.priceRWF}
                        disabled={savingId === product.id}
                        onBlur={e => handleFieldUpdate(product, 'priceRWF', e.target.value)}
                        style={{ width: 90, padding: '0.4rem', borderRadius: 6, border: '1px solid var(--color-platinum)' }}
                      />
                    </label>
                    <label className="flex items-center gap-1" style={{ fontSize: '0.8rem' }}>
                      Stock
                      <input
                        type="number"
                        defaultValue={product.stockCount}
                        disabled={savingId === product.id}
                        onBlur={e => handleFieldUpdate(product, 'stockCount', e.target.value)}
                        style={{ width: 70, padding: '0.4rem', borderRadius: 6, border: '1px solid var(--color-platinum)' }}
                      />
                    </label>
                    <button
                      className="btn btn--outline btn--sm"
                      type="button"
                      disabled={savingId === product.id}
                      onClick={() => handleToggleActive(product)}
                    >
                      {product.isActive ? 'Deactivate' : 'Reactivate'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
