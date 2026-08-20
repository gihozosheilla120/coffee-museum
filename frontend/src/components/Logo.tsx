import logoSrc from '../assets/logo.png';

type LogoProps = {
  variant?: 'color' | 'light';
  size?: number;
};

const ASPECT_RATIO = 177 / 61;

export default function Logo({ variant = 'color', size = 36 }: LogoProps) {
  return (
    <img
      src={logoSrc}
      alt="Coffee Museum"
      height={size}
      width={Math.round(size * ASPECT_RATIO)}
      style={{
        display: 'block',
        height: size,
        width: 'auto',
        // The source file is the full-color lockup; on dark surfaces (the
        // footer) it's forced to a flat white silhouette via filter, since
        // we only have the one color export.
        filter: variant === 'light' ? 'brightness(0) invert(1)' : 'none',
      }}
    />
  );
}
