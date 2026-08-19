type LogoProps = {
  variant?: 'color' | 'light';
  showWordmark?: boolean;
  size?: number;
};

// Rounded leaf/drop mark: solid green body with a coral diagonal accent band,
// matching the real museum signage (leaf outline with a bean-crease accent).
const LEAF_PATH =
  'M60 3C36 1 18 21 20 46C22 70 40 89 61 94C56 84 57 72 66 63C58 59 55 50 59 41C68 45 75 37 74 26C73 15 69 5 60 3Z';

export default function Logo({ variant = 'color', showWordmark = true, size = 36 }: LogoProps) {
  const wordmarkColor = variant === 'light' ? '#FFFFFF' : 'var(--color-obsidian)';

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
      <svg width={size} height={size} viewBox="0 0 94 98" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <clipPath id="leaf-clip">
          <path d={LEAF_PATH} />
        </clipPath>
        <g clipPath="url(#leaf-clip)">
          {variant === 'light' ? (
            <rect x="0" y="0" width="94" height="98" fill="#FFFFFF" />
          ) : (
            <>
              <rect x="0" y="0" width="94" height="98" fill="var(--color-green)" />
              <polygon points="94,0 44,98 68,98 94,30" fill="var(--color-crimson)" />
            </>
          )}
        </g>
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
