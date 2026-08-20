import { useEffect, useState } from 'react';

type HeroSlideshowProps = {
  images: string[];
  intervalMs?: number;
};

export default function HeroSlideshow({ images, intervalMs = 4500 }: HeroSlideshowProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (images.length < 2) return;
    const id = setInterval(() => {
      setIndex(i => (i + 1) % images.length);
    }, intervalMs);
    return () => clearInterval(id);
  }, [images.length, intervalMs]);

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      {images.map((src, i) => (
        <img
          key={src}
          src={src}
          alt=""
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: i === index ? 1 : 0,
            transition: 'opacity 1.2s ease',
          }}
        />
      ))}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(rgba(0,39,61,0.72), rgba(0,39,61,0.6))',
        }}
      />
      {images.length > 1 && (
        <div
          style={{
            position: 'absolute',
            bottom: '1.5rem',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: '0.5rem',
          }}
        >
          {images.map((src, i) => (
            <span
              key={src}
              style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: i === index ? '#FFFFFF' : 'rgba(255,255,255,0.4)',
                transition: 'background 0.3s ease',
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
