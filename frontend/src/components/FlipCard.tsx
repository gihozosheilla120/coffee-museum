type FlipCardProps = {
  image: string;
  title: string;
  description: string;
  height?: number;
};

export default function FlipCard({ image, title, description, height = 300 }: FlipCardProps) {
  return (
    <div className="flip-card" style={{ height }}>
      <div className="flip-card__inner">
        <div className="flip-card__face flip-card__face--front" style={{ backgroundImage: `url(${image})` }} />
        <div className="flip-card__face flip-card__face--back">
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
}
