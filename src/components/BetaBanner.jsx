import { useState } from 'react';
import { FaRocket, FaEnvelope, FaInfinity, FaBell, FaCheckCircle } from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi2';
import { db } from '../config/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const perks = [
  { icon: FaInfinity,  text: 'Free lifetime access to Premium' },
  { icon: FaBell,      text: 'First to try every new feature' },
  { icon: FaEnvelope,  text: 'Direct line to the dev team' },
];

const BetaBanner = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle | sending | success | error

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus('sending');
    try {
      await addDoc(collection(db, 'betaSignups'), {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        source: 'landing-beta',
        createdAt: serverTimestamp(),
      });
      setStatus('success');
      setName('');
      setEmail('');
    } catch {
      setStatus('error');
    }
  };

  return (
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
                <FaRocket style={{ fontSize: 11 }} aria-hidden="true" />
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
                        <Icon style={{ fontSize: 12, color: '#FFB300' }} aria-hidden="true" />
                      </div>
                      <span className="text-sm font-medium" style={{ color: '#C8B090' }}>{p.text}</span>
                    </li>
                  );
                })}
              </ul>

              {/* Inline Form */}
              {status === 'success' ? (
                <div className="flex items-center gap-3 p-4 rounded-xl max-w-lg mx-auto lg:mx-0"
                  style={{ background: 'rgba(0,200,83,0.10)', border: '1px solid rgba(0,200,83,0.25)' }}>
                  <FaCheckCircle style={{ color: '#00C853', fontSize: 20, flexShrink: 0 }} />
                  <div>
                    <p className="text-sm font-semibold text-kmf-text-primary">Application received!</p>
                    <p className="text-xs text-kmf-text-tertiary">We'll reach out with next steps within 24 hours.</p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto lg:mx-0">
                  <input
                    type="text"
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="flex-1 px-4 py-3 rounded-xl text-sm text-kmf-text-primary placeholder-kmf-text-tertiary outline-none focus:ring-2 focus:ring-[#FFB300]/40 transition-all"
                    style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,179,0,0.18)' }}
                  />
                  <input
                    type="email"
                    placeholder="Email address"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 px-4 py-3 rounded-xl text-sm text-kmf-text-primary placeholder-kmf-text-tertiary outline-none focus:ring-2 focus:ring-[#FFB300]/40 transition-all"
                    style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,179,0,0.18)' }}
                  />
                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all duration-200 hover:scale-105 disabled:opacity-60 disabled:hover:scale-100 flex-shrink-0"
                    style={{
                      background: 'linear-gradient(135deg, #FFB300, #FF8F00)',
                      color: '#1A1200',
                      boxShadow: '0 4px 20px rgba(255,179,0,0.30)',
                    }}
                  >
                    <HiSparkles style={{ fontSize: 14 }} aria-hidden="true" />
                    {status === 'sending' ? 'Sending...' : 'Apply Now'}
                  </button>
                </form>
              )}
              {status === 'error' && (
                <p className="text-xs mt-2 text-center lg:text-left" style={{ color: '#FF5252' }}>
                  Something went wrong. Please try again or email us at contact@kmfjournal.com
                </p>
              )}
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
};

export default BetaBanner;
