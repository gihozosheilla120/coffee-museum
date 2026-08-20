type LogoProps = {
  variant?: 'color' | 'light';
  showWordmark?: boolean;
  size?: number;
};

// Matches the brand manual's symbol: a leaf (with an inner vein) on the left,
// and three nested chevron strokes fanning out to the right — crimson at the
// outer tip, fading to terracotta near the leaf.
const LEAF_PATH =
  'M50 6C28 6 12 24 12 48C12 70 26 88 46 94C44 82 46 70 54 62C46 58 44 50 47 43C54 47 60 41 59 32C58 20 55 9 50 6Z';
const VEIN_PATH = 'M32 86C40 70 40 50 46 16';
const CHEVRONS: Array<{ points: string; toneStop: 0 | 1 }> = [
  { points: '56,8 104,30 56,52', toneStop: 0 },
  { points: '52,32 92,50 52,68', toneStop: 1 },
  { points: '48,54 80,68 48,82', toneStop: 1 },
];
const VIEW_W = 110;
const VIEW_H = 100;

export default function Logo({ variant = 'color', showWordmark = true, size = 36 }: LogoProps) {
  const wordmarkColor = variant === 'light' ? '#FFFFFF' : 'var(--color-obsidian)';
  const isLight = variant === 'light';
  const monoColor = isLight ? '#FFFFFF' : 'var(--color-obsidian)';
  const veinColor = isLight ? 'var(--color-obsidian)' : 'var(--color-alabaster)';
  const chevronColors = ['var(--color-crimson)', 'var(--color-terracotta)'];

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.6rem',
        fontFamily: 'var(--font-sans)',
        lineHeight: 1,
      }}
    >
      <svg
        width={Math.round((size * VIEW_W) / VIEW_H)}
        height={size}
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path d={LEAF_PATH} fill={isLight ? '#FFFFFF' : 'var(--color-green)'} />
        <path d={VEIN_PATH} stroke={veinColor} strokeWidth="2.5" strokeLinecap="round" fill="none" />
        {CHEVRONS.map((chevron, idx) => (
          <polyline
            key={idx}
            points={chevron.points}
            fill="none"
            stroke={isLight ? monoColor : chevronColors[chevron.toneStop]}
            strokeWidth={10 - idx}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ))}
      </svg>
      {showWordmark && (
        <span style={{ display: 'flex', flexDirection: 'column', fontWeight: 800, fontSize: '1.05rem', color: wordmarkColor }}>
          <span>Coffee</span>
          <span>Museum</span>
        </span>
      )}
    </span>
  );
}
