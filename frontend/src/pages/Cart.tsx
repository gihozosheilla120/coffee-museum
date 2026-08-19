import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import ImagePlaceholder from '../components/ImagePlaceholder';

export default function Cart() {
  const { items, updateQuantity, removeItem, subtotalRWF } = useCart();

  if (items.length === 0) {
    return (
      <div className="section container text-center">
        <h1>Your Cart Is Empty</h1>
        <p className="muted">Browse the marketplace to add some Rwandan specialty coffee.</p>
        <Link to="/marketplace" className="btn">Shop the Marketplace</Link>
      </div>
    );
  }

  return (
    <div className="section">
      <div className="container">
        <h1>Your Cart</h1>
        <div className="flex flex-col gap-2">
          {items.map(({ product, quantity }) => (
            <div key={product.id} className="card">
              <div className="card__body flex items-center justify-between" style={{ gap: '1rem', flexWrap: 'wrap' }}>
                <div className="flex items-center gap-2">
                  <div style={{ width: 72, height: 72, borderRadius: 6, overflow: 'hidden' }}>
                    <ImagePlaceholder label="" height={72} />
                  </div>
                  <div>
                    <h3 style={{ margin: 0, fontSize: '1rem' }}>{product.title}</h3>
                    <span className="muted" style={{ fontSize: '0.85rem' }}>{product.priceRWF.toLocaleString()} RWF each</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min={1}
                    value={quantity}
                    onChange={e => updateQuantity(product.id, Number(e.target.value))}
                    style={{ width: 64, padding: '0.5rem', borderRadius: 6, border: '1px solid var(--color-platinum)' }}
                  />
                  <span style={{ fontWeight: 700, minWidth: 100, textAlign: 'right' }}>
                    {(product.priceRWF * quantity).toLocaleString()} RWF
                  </span>
                  <button className="btn btn--outline btn--sm" onClick={() => removeItem(product.id)}>Remove</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center" style={{ marginTop: '2rem', maxWidth: 420, marginLeft: 'auto' }}>
          <span style={{ fontWeight: 700 }}>Subtotal</span>
          <span style={{ fontWeight: 800, fontSize: '1.2rem', color: 'var(--color-terracotta)' }}>
            {subtotalRWF.toLocaleString()} RWF
          </span>
        </div>
        <div className="flex justify-between" style={{ marginTop: '1.5rem', maxWidth: 420, marginLeft: 'auto' }}>
          <Link to="/marketplace" className="btn btn--outline">Continue Shopping</Link>
          <Link to="/checkout" className="btn">Checkout</Link>
        </div>
      </div>
    </div>
  );
}
