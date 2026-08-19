import Section from '../components/Section';
import ImagePlaceholder from '../components/ImagePlaceholder';

export default function Community() {
  return (
    <div>
      <section className="section--tight">
        <div className="container">
          <span className="eyebrow">Community</span>
          <h1>Built With, and For, Rwanda's Coffee Communities</h1>
          <p className="section-intro">
            The museum exists because of the more than 400,000 smallholder families who grow Rwanda's coffee. This
            is their story too.
          </p>
        </div>
      </section>

      <Section
        eyebrow="Smallholder Cooperatives"
        title="Grown by Families, Processed by Cooperatives"
        intro="Nearly every bean on this site's shelves passed through a farmer-owned washing station cooperative — the backbone of Rwanda's coffee economy."
      >
        <div className="grid grid--2" style={{ alignItems: 'center' }}>
          <ImagePlaceholder label="farmer portrait photograph to be supplied" height={300} />
          <div>
            <p className="muted">
              Cooperatives give smallholders shared access to processing infrastructure, quality training, and fair
              pricing — turning small individual plots into export-grade specialty lots.
            </p>
            <p className="muted">
              The museum partners directly with cooperatives in Nyanza and Huye, featuring their coffee in our
              marketplace and their stories in our galleries.
            </p>
          </div>
        </div>
      </Section>

      <Section eyebrow="Capacity Building" title="Investing in the Next Generation" alt>
        <div className="divider-row grid grid--3">
          <div className="divider-col">
            <h3 style={{ fontSize: '1.05rem' }}>Barista Training</h3>
            <p className="muted" style={{ fontSize: '0.92rem' }}>Hands-on brewing and hospitality training for youth entering the specialty coffee trade.</p>
          </div>
          <div className="divider-col">
            <h3 style={{ fontSize: '1.05rem' }}>Women in Coffee</h3>
            <p className="muted" style={{ fontSize: '0.92rem' }}>Programs supporting women-led cooperatives and farm ownership.</p>
          </div>
          <div className="divider-col">
            <h3 style={{ fontSize: '1.05rem' }}>ICS Manager Training</h3>
            <p className="muted" style={{ fontSize: '0.92rem' }}>Building internal control system expertise for cooperative quality management.</p>
          </div>
        </div>
      </Section>

      <Section
        eyebrow="Innovation & Research"
        title="Supporting Research That Serves Farmers"
        intro="The museum works alongside agronomy researchers and NAEB to bring better varieties, climate resilience, and processing techniques back to the communities that need them most."
      />
    </div>
  );
}
