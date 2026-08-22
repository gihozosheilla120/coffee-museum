import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth, API_URL } from '../context/AuthContext';

export default function Checkout() {
  const { items, subtotalRWF, clear } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [address, setAddress] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'error'>('idle');
  const [error, setError] = useState('');

  if (items.length === 0) {
    return (
      <div className="section container text-center">
        <h1>Nothing to Check Out</h1>
        <Link to="/marketplace" className="btn">Shop the Marketplace</Link>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setError('');
    try {
      const res = await axios.post(`${API_URL}/orders`, {
        shippingAddress: address,
        items: items.map(({ product, quantity }) => ({ productId: product.id, quantity })),
      });
      clear();
      navigate('/order-confirmation', { state: { orderRef: res.data.order.id } });
    } catch (err) {
      setStatus('error');
      if (axios.isAxiosError(err) && err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Couldn't place your order right now. Please try again shortly.");
      }
    }
  };

  return (
    <div className="section">
      <div className="container">
        <h1>Checkout</h1>
        <div className="grid grid--2" style={{ alignItems: 'start' }}>
          <form onSubmit={handleSubmit} className="card">
            <div className="card__body flex flex-col gap-2">
              <p className="muted" style={{ fontSize: '0.88rem', margin: 0 }}>
                Placing this order as <strong>{user?.name}</strong> ({user?.email}).
              </p>
              <label className="flex flex-col gap-1">
                <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>Shipping Address</span>
                <textarea
                  required
                  value={address}
                  onChange={e => setAddress(e.target.value)}
                  rows={3}
                  style={{ padding: '0.6rem', borderRadius: 6, border: '1px solid var(--color-platinum)', fontFamily: 'inherit' }}
                />
              </label>
              <button className="btn" type="submit" disabled={status === 'submitting'} style={{ marginTop: '0.5rem' }}>
                {status === 'submitting' ? 'Placing Order...' : 'Place Order'}
              </button>
              <p className="muted" style={{ fontSize: '0.78rem' }}>
                No payment gateway is connected yet &mdash; the order is recorded as pending payment for now.
              </p>
              {status === 'error' && <p style={{ color: 'var(--color-crimson)', fontWeight: 600 }}>{error}</p>}
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
