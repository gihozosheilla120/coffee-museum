import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Section from '../components/Section';
import ImagePlaceholder from '../components/ImagePlaceholder';
import { useCart } from '../context/CartContext';
import { useAuth, API_URL, resolveAssetUrl } from '../context/AuthContext';
import { Product } from '../types';

export default function Marketplace() {
  const { addItem } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${API_URL}/products`)
      .then(res => setProducts(res.data))
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, []);

  const handleAddToCart = (product: Product) => {
    if (!isAuthenticated) {
      navigate('/sign-in', { state: { from: '/marketplace' } });
      return;
    }
    addItem(product);
  };

  return (
    <Section
      eyebrow="Marketplace"
      title="Online Coffee Marketplace"
      intro="Curated direct-trade single-origins sourced from Rwandan smallholder cooperatives, roasted and shipped from the museum."
    >
      {loading ? (
        <p className="muted">Loading products...</p>
      ) : products.length === 0 ? (
        <p className="muted">No products are available right now.</p>
      ) : (
        <div className="grid grid--3">
          {products.map(product => (
            <div key={product.id}>
              <Link to={`/marketplace/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                {product.imageUrl ? (
                  <img
                    src={resolveAssetUrl(product.imageUrl)!}
                    alt={product.title}
                    style={{ width: '100%', height: 220, objectFit: 'cover' }}
                  />
                ) : (
                  <ImagePlaceholder label="product image to be supplied" height={220} />
                )}
              </Link>
              <div style={{ paddingTop: '1rem' }}>
                <Link to={`/marketplace/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <h3 style={{ margin: '0 0 0.4rem', fontSize: '1.05rem' }}>{product.title}</h3>
                </Link>
                {product.description && (
                  <p className="muted" style={{ fontSize: '0.88rem' }}>{product.description}</p>
                )}
                <div className="flex items-center justify-between" style={{ marginTop: '1rem' }}>
                  <span style={{ fontWeight: 800, color: 'var(--color-terracotta)' }}>
                    {product.priceRWF.toLocaleString()} RWF
                  </span>
                  <button className="btn btn--sm" onClick={() => handleAddToCart(product)}>
                    {isAuthenticated ? 'Add to Cart' : 'Sign In to Buy'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </Section>
  );
}
