import React from 'react';

export default function Journey() {
  const stages = [
    "High Altitude Cultivation", "Hand-picking Harvest", "Wet Mill Washing",
    "Sun Drying on Raised Beds", "Dry Milling & Hulling", "Strict Quality Grading",
    "Expert Cupping Lab Analysis", "Artisanal Roasting Profiles", "Global Export Packing"
  ];

  return (
    <div>
      <h2 style={{ color: '#00273D' }}>The 9-Stage Coffee Journey</h2>
      <p>Follow the meticulous step-by-step evolution of specialty coffee beans from Rwandan soil straight into your cup.</p>
      <ol style={{ paddingLeft: '1.5rem', lineHeight: '2' }}>
        {stages.map((stage, idx) => (
          <li key={idx}><strong>{stage}</strong></li>
        ))}
      </ol>
    </div>
  );
}
