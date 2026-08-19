import { Link } from 'react-router-dom';
import Section from '../components/Section';
import ImagePlaceholder from '../components/ImagePlaceholder';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';

export default function Marketplace() {
  const { addItem } = useCart();

  return (
    <Section
      eyebrow="Marketplace"
      title="Online Coffee Marketplace"
      intro="Curated direct-trade single-origins sourced from Rwandan smallholder cooperatives, roasted and shipped from the museum."
    >
      <div className="grid grid--3">
        {products.map(product => (
          <div key={product.id}>
            <Link to={`/marketplace/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <ImagePlaceholder label="product image to be supplied" height={220} />
            </Link>
            <div style={{ paddingTop: '1rem' }}>
              <Link to={`/marketplace/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <h3 style={{ margin: '0 0 0.4rem', fontSize: '1.05rem' }}>{product.title}</h3>
              </Link>
              <p className="muted" style={{ fontSize: '0.88rem' }}>{product.description}</p>
              <div className="flex items-center justify-between" style={{ marginTop: '1rem' }}>
                <span style={{ fontWeight: 800, color: 'var(--color-terracotta)' }}>
                  {product.priceRWF.toLocaleString()} RWF
                </span>
                <button className="btn btn--sm" onClick={() => addItem(product)}>Add to Cart</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
