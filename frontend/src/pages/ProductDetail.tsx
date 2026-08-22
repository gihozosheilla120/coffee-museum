import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth, API_URL, resolveAssetUrl } from '../context/AuthContext';
import ImagePlaceholder from '../components/ImagePlaceholder';
import { Product } from '../types';

export default function ProductDetail() {
  const { id } = useParams();
  const { addItem } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${API_URL}/products/${id}`)
      .then(res => setProduct(res.data))
      .catch(() => setProduct(null))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <div className="section container"><p className="muted">Loading product...</p></div>;
  }

  if (!product) {
    return (
      <div className="section container">
        <h2>Product not found</h2>
        <Link to="/marketplace" className="btn btn--outline">Back to Marketplace</Link>
      </div>
    );
  }

  const details = [
    { label: 'Origin', value: product.originInfo },
    { label: 'Producer', value: product.producerName },
    { label: 'Altitude', value: product.altitude ? `${product.altitude}m` : null },
    { label: 'Process', value: product.processType },
  ].filter(d => d.value);

  return (
    <div className="section">
      <div className="container">
        <Link to="/marketplace" className="muted" style={{ fontSize: '0.85rem' }}>&larr; Back to Marketplace</Link>
        <div className="grid grid--2" style={{ marginTop: '1.5rem', alignItems: 'start' }}>
          {product.imageUrl ? (
            <img
              src={resolveAssetUrl(product.imageUrl)!}
              alt={product.title}
              style={{ width: '100%', height: 420, objectFit: 'cover' }}
            />
          ) : (
            <ImagePlaceholder label="product image to be supplied" height={420} />
          )}
          <div>
            <h1 style={{ fontSize: '2rem' }}>{product.title}</h1>
            {product.description && <p className="muted">{product.description}</p>}
            {details.length > 0 && (
              <div className="grid grid--2" style={{ gap: '0.75rem', margin: '1.5rem 0' }}>
                {details.map(d => (
                  <div key={d.label}>
                    <span className="tag">{d.label}</span>
                    <p style={{ margin: 0 }}>{d.value}</p>
                  </div>
                ))}
              </div>
            )}
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
                  if (!isAuthenticated) {
                    navigate('/sign-in', { state: { from: `/marketplace/${product.id}` } });
                    return;
                  }
                  addItem(product, qty);
                  setAdded(true);
                }}
              >
                {isAuthenticated ? 'Add to Cart' : 'Sign In to Buy'}
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
