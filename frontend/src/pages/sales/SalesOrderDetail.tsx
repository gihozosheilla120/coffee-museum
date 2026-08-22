import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../../context/AuthContext';

type OrderDetail = {
  id: string;
  customerName: string;
  customerEmail: string;
  shippingAddress: string;
  totalAmount: number;
  status: string;
  paymentRef: string | null;
  createdAt: string;
  items: { id: string; quantity: number; pricePaid: number; product: { title: string } }[];
};

export default function SalesOrderDetail() {
  const { id } = useParams();
  const [order, setOrder] = useState<OrderDetail | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    axios
      .get(`${API_URL}/orders/${id}`)
      .then(res => setOrder(res.data.order))
      .catch(() => setError("Couldn't load this order."));
  }, [id]);

  if (error) {
    return (
      <div className="section container">
        <p style={{ color: 'var(--color-crimson)' }}>{error}</p>
        <Link to="/sales" className="btn btn--outline">Back to Sales Portal</Link>
      </div>
    );
  }

  if (!order) {
    return <div className="section container"><p className="muted">Loading order...</p></div>;
  }

  return (
    <div className="section container" style={{ maxWidth: 720 }}>
      <Link to="/sales" className="muted" style={{ fontSize: '0.85rem' }}>&larr; Back to Sales Portal</Link>
      <span className="eyebrow" style={{ marginTop: '1rem' }}>Order</span>
      <h1 style={{ fontSize: '1.6rem' }}>{order.id}</h1>

      <div className="grid grid--2" style={{ gap: '1.5rem', marginBottom: '2rem' }}>
        <div>
          <div className="stat-label">Customer</div>
          <div style={{ marginTop: '0.3rem', fontWeight: 600 }}>{order.customerName}</div>
          <div className="muted" style={{ fontSize: '0.88rem' }}>{order.customerEmail}</div>
        </div>
        <div>
          <div className="stat-label">Shipping Address</div>
          <div style={{ marginTop: '0.3rem', fontWeight: 600 }}>{order.shippingAddress}</div>
        </div>
        <div>
          <div className="stat-label">Status</div>
          <div style={{ marginTop: '0.3rem', fontWeight: 600 }}>{order.status}</div>
        </div>
        <div>
          <div className="stat-label">Payment Reference</div>
          <div style={{ marginTop: '0.3rem', fontWeight: 600 }}>{order.paymentRef || 'Not recorded'}</div>
        </div>
        <div>
          <div className="stat-label">Placed On</div>
          <div style={{ marginTop: '0.3rem', fontWeight: 600 }}>{new Date(order.createdAt).toLocaleString()}</div>
        </div>
      </div>

      <div style={{ borderTop: '1px solid var(--color-platinum)', paddingTop: '1.5rem' }}>
        <h3>Items</h3>
        {order.items.map(item => (
          <div key={item.id} className="flex justify-between" style={{ padding: '0.6rem 0', borderBottom: '1px solid var(--color-platinum)' }}>
            <span>{item.product.title} &times; {item.quantity}</span>
            <span>{(item.pricePaid * item.quantity).toLocaleString()} RWF</span>
          </div>
        ))}
        <div className="flex justify-between" style={{ paddingTop: '1rem', fontWeight: 800 }}>
          <span>Total</span>
          <span style={{ color: 'var(--color-terracotta)' }}>{order.totalAmount.toLocaleString()} RWF</span>
        </div>
      </div>
    </div>
  );
}
