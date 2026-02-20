import { FaRocket, FaEnvelope, FaInfinity, FaBell } from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi2';

const BETA_EMAIL = 'contact@kmfjournal.com';
const MAILTO = `mailto:${BETA_EMAIL}?subject=Beta%20Tester%20Application%20%E2%80%94%20K.M.F.%20Trading%20Journal&body=Hi%2C%0A%0AI'm%20interested%20in%20becoming%20a%20beta%20tester%20for%20K.M.F.%20Trading%20Journal.%0A%0AAbout%20me%3A%0A-%20Trading%20experience%3A%20%0A-%20Instruments%20I%20trade%3A%20%0A-%20Device%3A%20Android%20%0A%0ALooking%20forward%20to%20hearing%20from%20you!`;

const perks = [
  { icon: FaInfinity,  text: 'Free lifetime access to Premium' },
  { icon: FaBell,      text: 'First to try every new feature' },
  { icon: FaEnvelope,  text: 'Direct line to the dev team' },
];

const BetaBanner = () => (
  <section
    id="beta"
    className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
    aria-label="Beta tester program"
  >
    {/* Background glow */}
    <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 700, height: 400, borderRadius: '50%',
        background: 'radial-gradient(ellipse, rgba(255,179,0,0.06) 0%, transparent 70%)',
      }} />
    </div>

    <div className="container mx-auto relative z-10">
      <div
        className="rounded-3xl p-8 sm:p-12 relative overflow-hidden animate-fadeIn"
        style={{
          background: 'rgba(26,22,14,0.95)',
          border: '1px solid rgba(255,179,0,0.22)',
          boxShadow: '0 0 0 1px rgba(255,179,0,0.06), 0 8px 50px rgba(0,0,0,0.40), 0 0 60px rgba(255,179,0,0.05)',
        }}
      >
        {/* Corner glow */}
        <div aria-hidden="true" style={{ position: 'absolute', top: -80, right: -80, width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,179,0,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div aria-hidden="true" style={{ position: 'absolute', bottom: -60, left: -60, width: 220, height: 220, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,179,0,0.05) 0%, transparent 70%)', pointerEvents: 'none' }} />

        <div className="relative z-10 flex flex-col lg:flex-row items-center gap-10">

          {/* Left: Text */}
          <div className="flex-1 text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full"
              style={{ background: 'rgba(255,179,0,0.12)', border: '1px solid rgba(255,179,0,0.28)', color: '#FFB300' }}>
              <FaRocket style={{ fontSize: 11 }} />
              <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                Limited Spots Available
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ letterSpacing: '-0.02em', lineHeight: 1.2 }}>
              <span style={{ color: '#FFB300' }}>Become a Beta Tester.</span>
              <br />
              <span className="text-kmf-text-primary">Get Premium. Forever. Free.</span>
            </h2>

            <p className="text-kmf-text-secondary leading-relaxed mb-8 max-w-lg mx-auto lg:mx-0">
              We're looking for serious traders to test K.M.F. Trading Journal before the public launch.
              Shape the product with your feedback — and in return, get <strong style={{ color: '#FFB300' }}>free lifetime access to all Premium features</strong>, forever.
            </p>

            {/* Perks */}
            <ul className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center lg:justify-start mb-8">
              {perks.map((p) => {
                const Icon = p.icon;
                return (
                  <li key={p.text} className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: 'rgba(255,179,0,0.14)', border: '1px solid rgba(255,179,0,0.25)' }}>
                      <Icon style={{ fontSize: 12, color: '#FFB300' }} />
                    </div>
                    <span className="text-sm font-medium" style={{ color: '#C8B090' }}>{p.text}</span>
                  </li>
                );
              })}
            </ul>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <a
                href={MAILTO}
                className="inline-flex items-center justify-center gap-3 px-7 py-3.5 rounded-xl font-bold text-base transition-all duration-200 hover:scale-105"
                style={{
                  background: 'linear-gradient(135deg, #FFB300, #FF8F00)',
                  color: '#1A1200',
                  boxShadow: '0 4px 20px rgba(255,179,0,0.30)',
                }}
              >
                <FaEnvelope style={{ fontSize: 15 }} />
                Apply to Beta Program
              </a>
              <a
                href={`mailto:${BETA_EMAIL}`}
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl text-sm font-semibold transition-all duration-200 hover:scale-105"
                style={{
                  background: 'rgba(255,179,0,0.08)',
                  border: '1px solid rgba(255,179,0,0.22)',
                  color: '#FFB300',
                }}
              >
                <HiSparkles style={{ fontSize: 14 }} />
                {BETA_EMAIL}
              </a>
            </div>
          </div>

          {/* Right: Visual stat block */}
          <div
            className="hidden lg:flex flex-col gap-4 flex-shrink-0"
            style={{ width: 220 }}
          >
            {[
              { label: 'Lifetime Access', value: 'FREE', sub: 'all premium features' },
              { label: 'Early Access', value: '100%', sub: 'every new release' },
              { label: 'Spots Available', value: '50', sub: 'limited beta access' },
            ].map((s) => (
              <div
                key={s.label}
                className="rounded-2xl p-5 text-center"
                style={{
                  background: 'rgba(255,179,0,0.06)',
                  border: '1px solid rgba(255,179,0,0.14)',
                }}
              >
                <p className="text-2xl font-extrabold mb-1" style={{ color: '#FFB300', letterSpacing: '-0.02em' }}>{s.value}</p>
                <p className="text-xs font-semibold" style={{ color: '#C8B090' }}>{s.label}</p>
                <p className="text-[10px] mt-0.5" style={{ color: '#7A6040' }}>{s.sub}</p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  </section>
);

export default BetaBanner;
