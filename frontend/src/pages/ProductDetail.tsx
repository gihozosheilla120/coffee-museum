import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import ImagePlaceholder from '../components/ImagePlaceholder';

export default function ProductDetail() {
  const { id } = useParams();
  const product = products.find(p => p.id === id);
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <div className="section container">
        <h2>Product not found</h2>
        <Link to="/marketplace" className="btn btn--outline">Back to Marketplace</Link>
      </div>
    );
  }

  return (
    <div className="section">
      <div className="container">
        <Link to="/marketplace" className="muted" style={{ fontSize: '0.85rem' }}>&larr; Back to Marketplace</Link>
        <div className="grid grid--2" style={{ marginTop: '1.5rem', alignItems: 'start' }}>
          <ImagePlaceholder label="product image to be supplied" height={420} />
          <div>
            <h1 style={{ fontSize: '2rem' }}>{product.title}</h1>
            <p className="muted">{product.description}</p>
            <div className="grid grid--2" style={{ gap: '0.75rem', margin: '1.5rem 0' }}>
              <div><span className="tag">Origin</span><p style={{ margin: 0 }}>{product.originInfo}</p></div>
              <div><span className="tag">Producer</span><p style={{ margin: 0 }}>{product.producerName}</p></div>
              <div><span className="tag">Altitude</span><p style={{ margin: 0 }}>{product.altitude}m</p></div>
              <div><span className="tag">Process</span><p style={{ margin: 0 }}>{product.processType}</p></div>
            </div>
            <div style={{ fontWeight: 800, fontSize: '1.5rem', color: 'var(--color-terracotta)', marginBottom: '1rem' }}>
              {product.priceRWF.toLocaleString()} RWF
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min={1}
                value={qty}
                onChange={e => setQty(Math.max(1, Number(e.target.value)))}
                style={{ width: 70, padding: '0.6rem', borderRadius: 6, border: '1px solid var(--color-platinum)' }}
              />
              <button
                className="btn"
                onClick={() => {
                  addItem(product, qty);
                  setAdded(true);
                }}
              >
                Add to Cart
              </button>
            </div>
            {added && (
              <p style={{ color: 'var(--color-green)', fontWeight: 600, marginTop: '0.75rem' }}>
                Added to cart. <Link to="/cart">View cart &rarr;</Link>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
