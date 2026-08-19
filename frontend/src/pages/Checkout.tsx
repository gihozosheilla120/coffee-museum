import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Checkout() {
  const { items, subtotalRWF, clear } = useCart();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', address: '' });

  if (items.length === 0) {
    return (
      <div className="section container text-center">
        <h1>Nothing to Check Out</h1>
        <Link to="/marketplace" className="btn">Shop the Marketplace</Link>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // No payment gateway is configured yet — this simulates order placement client-side.
    const orderRef = `CM-${Date.now().toString().slice(-8)}`;
    clear();
    navigate('/order-confirmation', { state: { orderRef } });
  };

  return (
    <div className="section">
      <div className="container">
        <h1>Checkout</h1>
        <div className="grid grid--2" style={{ alignItems: 'start' }}>
          <form onSubmit={handleSubmit} className="card">
            <div className="card__body flex flex-col gap-2">
              <label className="flex flex-col gap-1">
                <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>Full Name</span>
                <input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                  style={{ padding: '0.6rem', borderRadius: 6, border: '1px solid var(--color-platinum)' }} />
              </label>
              <label className="flex flex-col gap-1">
                <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>Email</span>
                <input required type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                  style={{ padding: '0.6rem', borderRadius: 6, border: '1px solid var(--color-platinum)' }} />
              </label>
              <label className="flex flex-col gap-1">
                <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>Shipping Address</span>
                <textarea required value={form.address} onChange={e => setForm({ ...form, address: e.target.value })}
                  rows={3} style={{ padding: '0.6rem', borderRadius: 6, border: '1px solid var(--color-platinum)', fontFamily: 'inherit' }} />
              </label>
              <button className="btn" type="submit" style={{ marginTop: '0.5rem' }}>Place Order</button>
              <p className="muted" style={{ fontSize: '0.78rem' }}>
                No payment gateway is connected yet &mdash; this places a demo order for now.
              </p>
            </div>
          </form>

          <div className="card">
            <div className="card__body">
              <h3>Order Summary</h3>
              {items.map(({ product, quantity }) => (
                <div key={product.id} className="flex justify-between" style={{ fontSize: '0.9rem', margin: '0.5rem 0' }}>
                  <span>{product.title} &times; {quantity}</span>
                  <span>{(product.priceRWF * quantity).toLocaleString()} RWF</span>
                </div>
              ))}
              <div className="flex justify-between" style={{ borderTop: '1px solid var(--color-platinum)', marginTop: '1rem', paddingTop: '1rem', fontWeight: 800 }}>
                <span>Total</span>
                <span style={{ color: 'var(--color-terracotta)' }}>{subtotalRWF.toLocaleString()} RWF</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
