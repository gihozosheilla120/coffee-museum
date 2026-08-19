import { ReactNode } from 'react';

type SectionProps = {
  eyebrow?: string;
  title: string;
  intro?: string;
  dark?: boolean;
  alt?: boolean;
  tight?: boolean;
  children?: ReactNode;
  id?: string;
};

export default function Section({ eyebrow, title, intro, dark, alt, tight, children, id }: SectionProps) {
  const classes = ['section', dark && 'section--dark', alt && 'section--alt', tight && 'section--tight']
    .filter(Boolean)
    .join(' ');

  return (
    <section className={classes} id={id}>
      <div className="container">
        <div className="section-head">
          {eyebrow && <span className="eyebrow">{eyebrow}</span>}
          <h2>{title}</h2>
          {intro && <p className="section-intro">{intro}</p>}
        </div>
        {children}
      </div>
    </section>
  );
}
