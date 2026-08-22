import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../../context/AuthContext';

type OrderSummary = {
  totalOrders: number;
  totalRevenueRWF: number;
  ordersByStatus: Record<string, number>;
};

type OrderRow = {
  id: string;
  customerName: string;
  customerEmail: string;
  totalAmount: number;
  status: string;
  createdAt: string;
  items: { id: string; quantity: number; product: { title: string } }[];
};

const STATUSES = ['PENDING', 'PAID', 'SHIPPED', 'DELIVERED'];

export default function SalesDashboard() {
  const [summary, setSummary] = useState<OrderSummary | null>(null);
  const [orders, setOrders] = useState<OrderRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [updating, setUpdating] = useState<string | null>(null);

  const load = () => {
    setLoading(true);
    setError('');
    Promise.all([
      axios.get(`${API_URL}/orders/summary`),
      axios.get(`${API_URL}/orders`),
    ])
      .then(([summaryRes, ordersRes]) => {
        setSummary(summaryRes.data);
        setOrders(ordersRes.data.orders);
      })
      .catch(() => setError("Couldn't load sales data right now."))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const handleStatusChange = async (orderId: string, status: string) => {
    setUpdating(orderId);
    try {
      await axios.patch(`${API_URL}/orders/${orderId}/status`, { status });
      setOrders(prev => prev.map(o => (o.id === orderId ? { ...o, status } : o)));
    } catch {
      setError('Could not update that order. Please try again.');
    } finally {
      setUpdating(null);
    }
  };

  if (loading) {
    return <div className="section container"><p className="muted">Loading sales data...</p></div>;
  }

  return (
    <div className="section">
      <div className="container">
        <span className="eyebrow">Sales Portal</span>
        <h1>Orders &amp; Payments</h1>
        <p className="section-intro">Every order placed through the marketplace, with live payment status.</p>

        {error && <p style={{ color: 'var(--color-crimson)', fontWeight: 600 }}>{error}</p>}

        {summary && (
          <div className="divider-row grid grid--3" style={{ marginTop: '2rem', marginBottom: '2.5rem' }}>
            <div className="divider-col">
              <div className="stat-number">{summary.totalOrders}</div>
              <div className="stat-label">Total Orders</div>
            </div>
            <div className="divider-col">
              <div className="stat-number">{summary.totalRevenueRWF.toLocaleString()} RWF</div>
              <div className="stat-label">Revenue (Paid &amp; Beyond)</div>
            </div>
            <div className="divider-col">
              <div className="flex gap-2" style={{ flexWrap: 'wrap' }}>
                {STATUSES.map(s => (
                  <span key={s} className="badge">{s}: {summary.ordersByStatus[s] ?? 0}</span>
                ))}
              </div>
              <div className="stat-label" style={{ marginTop: '0.5rem' }}>By Status</div>
            </div>
          </div>
        )}

        {orders.length === 0 ? (
          <p className="muted">No orders have been placed yet.</p>
        ) : (
          <div className="flex flex-col gap-2">
            {orders.map(order => (
              <div key={order.id} className="card">
                <div className="card__body flex items-center justify-between" style={{ gap: '1rem', flexWrap: 'wrap' }}>
                  <div>
                    <Link to={`/sales/orders/${order.id}`} style={{ fontWeight: 700, color: 'var(--color-navy)' }}>
                      {order.customerName}
                    </Link>
                    <div className="muted" style={{ fontSize: '0.82rem' }}>{order.customerEmail}</div>
                    <div className="muted" style={{ fontSize: '0.78rem', marginTop: '0.2rem' }}>
                      {order.items.map(i => `${i.product.title} ×${i.quantity}`).join(', ')}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span style={{ fontWeight: 800, color: 'var(--color-terracotta)' }}>
                      {order.totalAmount.toLocaleString()} RWF
                    </span>
                    <select
                      value={order.status}
                      disabled={updating === order.id}
                      onChange={e => handleStatusChange(order.id, e.target.value)}
                      style={{ padding: '0.4rem 0.6rem', borderRadius: 6, border: '1px solid var(--color-platinum)' }}
                    >
                      {STATUSES.map(s => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                    <span className="muted" style={{ fontSize: '0.78rem' }}>
                      {new Date(order.createdAt).toLocaleDateString()}
                    </span>
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
