import { Link, useLocation } from 'react-router-dom';

export default function OrderConfirmation() {
  const location = useLocation();
  const orderRef = (location.state as { orderRef?: string } | null)?.orderRef ?? 'CM-00000000';

  return (
    <div className="section container text-center">
      <span className="eyebrow">Thank You</span>
      <h1>Your Order Is Confirmed</h1>
      <p className="section-intro mx-auto" style={{ textAlign: 'center' }}>
        Order reference <strong>{orderRef}</strong>. We've sent a confirmation to your email and will follow up
        with shipping details shortly.
      </p>
      <Link to="/marketplace" className="btn" style={{ marginTop: '1rem' }}>Continue Shopping</Link>
    </div>
  );
}
