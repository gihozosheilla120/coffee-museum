import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Marketplace() {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    // Fallback if backend is not running locally during development
    setProducts([
      {
        id: 'p1',
        title: 'Nyanza Specialty Bourbon',
        description: "Exceptional specialty Arabica cultivated high near the King's Palace hills.",
        priceRWF: 12000,
        imageUrl: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=600'
      }
    ]);
  }, []);

  return (
    <div>
      <h2 style={{ color: '#00273D' }}>Online Marketplace</h2>
      <p>Purchase curated direct-trade single-origins sourced directly from local Rwandan smallholders.</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem', marginTop: '1.5rem' }}>
        {products.map(product => (
          <div key={product.id} style={{ background: 'white', padding: '1rem', borderRadius: '4px', border: '1px solid #D1D9E0' }}>
            <img src={product.imageUrl} alt={product.title} style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '2px' }} />
            <h3 style={{ margin: '0.5rem 0' }}>{product.title}</h3>
            <p style={{ fontSize: '0.9rem', color: '#666' }}>{product.description}</p>
            <div style={{ display: 'flex', justifyContent: 'between', alignItems: 'center', marginTop: '1rem' }}>
              <span style={{ fontWeight: 'bold', color: '#9F5135' }}>{product.priceRWF} RWF</span>
              <button className="btn-primary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.9rem' }}>Add to Cart</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
