import React from 'react';

export default function Home() {
  return (
    <div>
      <h1 style={{ color: '#00273D', fontSize: '2.5rem' }}>Preserving Rwanda's Coffee Heritage</h1>
      <p style={{ fontSize: '1.2rem', lineHeight: '1.6' }}>
        Welcome to the digital portal of the Rwanda Coffee Museum. Nestled in Nyanza, we connect history, sensory heritage, and sustainable smallholder legacy.
      </p>
      <div style={{ marginTop: '2rem' }}>
        <button className="btn-primary">Explore Virtual Museum</button>
      </div>
    </div>
  );
}
