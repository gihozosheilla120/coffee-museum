type ImagePlaceholderProps = {
  label: string;
  height?: number | string;
  watermark?: boolean;
};

export default function ImagePlaceholder({ label, height = 260, watermark }: ImagePlaceholderProps) {
  return (
    <div
      className="chevron-pattern--light"
      style={{
        position: 'relative',
        width: '100%',
        height,
        overflow: 'hidden',
      }}
    >
      {watermark && (
        <svg
          width="70%"
          height="70%"
          viewBox="0 0 94 98"
          style={{ position: 'absolute', right: '-8%', bottom: '-10%', opacity: 0.35 }}
        >
          <path
            d="M63 4C41 4 21 23 21 49C21 72 39 90 59 94C56 83 58 71 67 63C60 58 57 50 60 42C68 46 73 39 73 29C73 17 70 7 63 4Z"
            fill="var(--color-green)"
            opacity="0.5"
          />
          <path
            d="M63 4C41 4 21 23 21 49C21 72 39 90 59 94C56 83 58 71 67 63C60 58 57 50 60 42C68 46 73 39 73 29C73 17 70 7 63 4Z"
            fill="var(--color-crimson)"
            opacity="0.25"
            transform="translate(18 6)"
          />
        </svg>
      )}
      <span
        style={{
          position: 'absolute',
          left: '0.9rem',
          bottom: '0.75rem',
          fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
          fontSize: '0.72rem',
          color: '#8a95a1',
        }}
      >
        {label}
      </span>
    </div>
  );
}
