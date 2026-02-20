import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../landing/Navbar';
import Footer from '../Footer';

export default function BlogArticleLayout({ title, metaTitle, metaDescription, date, dateISO, readTime, category, categoryColor = '#4FC3F7', children }) {
  useEffect(() => {
    document.title = metaTitle || `${title} | K.M.F. Trading Journal`;
    const desc = document.querySelector('meta[name="description"]');
    if (desc && metaDescription) desc.setAttribute('content', metaDescription);
    return () => {
      document.title = 'K.M.F. Trading Journal – Track Trades, Analyze Performance & Improve Your Strategy';
      if (desc) desc.setAttribute('content', 'K.M.F. Trading Journal is a professional trading journal app for forex, stocks & crypto traders.');
    };
  }, [title, metaTitle, metaDescription]);

  return (
    <>
      <Navbar />
      <main className="bg-kmf-bg min-h-screen pt-24 pb-20 px-4 sm:px-6">
        <article className="max-w-2xl mx-auto" itemScope itemType="https://schema.org/Article">
          <nav className="mb-8 text-sm text-kmf-text-tertiary" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-kmf-accent transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <Link to="/blog" className="hover:text-kmf-accent transition-colors">Blog</Link>
            <span className="mx-2">/</span>
            <span className="text-kmf-text-secondary">{title}</span>
          </nav>
          <div className="flex items-center gap-3 mb-6 flex-wrap">
            <span className="text-xs font-semibold px-3 py-1 rounded-full" style={{ background: `${categoryColor}18`, color: categoryColor, border: `1px solid ${categoryColor}28` }}>{category}</span>
            <time className="text-xs text-kmf-text-tertiary" dateTime={dateISO}>{date}</time>
            <span className="text-xs text-kmf-text-tertiary">· {readTime}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-kmf-text-primary mb-8 leading-tight" style={{ letterSpacing: '-0.02em' }} itemProp="headline">{title}</h1>
          {children}
        </article>
        <div className="max-w-2xl mx-auto mt-12">
          <Link to="/blog" className="text-sm text-kmf-accent hover:text-kmf-accent-bright transition-colors">← Back to Blog</Link>
        </div>
      </main>
      <Footer />
    </>
  );
}

// Reusable content components — export these so articles can use them
export const Intro = ({ children }) => (
  <p className="text-lg text-kmf-text-secondary leading-relaxed mb-10" style={{ borderLeft: '3px solid rgba(79,195,247,0.35)', paddingLeft: '1.25rem' }}>{children}</p>
);
export const H2 = ({ children }) => (
  <h2 className="text-2xl font-bold text-kmf-text-primary mt-10 mb-4" style={{ letterSpacing: '-0.01em' }}>{children}</h2>
);
export const H3 = ({ children }) => (
  <h3 className="text-lg font-bold text-kmf-text-primary mt-6 mb-3">{children}</h3>
);
export const P = ({ children }) => (
  <p className="text-kmf-text-secondary leading-relaxed mb-4">{children}</p>
);
export const Divider = () => (
  <div style={{ height: 1, background: 'rgba(255,255,255,0.06)', margin: '2.5rem 0' }} />
);
export const Ul = ({ items }) => (
  <ul className="space-y-2 mb-6">
    {items.map((item, i) => (
      <li key={i} className="flex gap-3 text-kmf-text-secondary text-sm leading-relaxed">
        <span style={{ color: '#4FC3F7', flexShrink: 0, marginTop: 2 }}>→</span>
        <span>{item}</span>
      </li>
    ))}
  </ul>
);
export const Callout = ({ title, children, color = '#4FC3F7' }) => (
  <div className="rounded-xl p-5 my-6" style={{ background: `${color}0D`, border: `1px solid ${color}22` }}>
    {title && <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color }}>{title}</p>}
    <div className="text-sm text-kmf-text-secondary leading-relaxed">{children}</div>
  </div>
);
export const Takeaways = ({ items }) => (
  <div className="rounded-xl p-6 mt-10 mb-4" style={{ background: 'rgba(79,195,247,0.06)', border: '1px solid rgba(79,195,247,0.18)' }}>
    <p className="text-xs font-bold text-kmf-accent uppercase tracking-widest mb-3">Key Takeaways</p>
    <ul className="space-y-2">
      {items.map((item, i) => (
        <li key={i} className="flex gap-2 text-sm text-kmf-text-secondary">
          <span style={{ color: '#4FC3F7', flexShrink: 0 }}>✓</span>{item}
        </li>
      ))}
    </ul>
  </div>
);
export const Table = ({ headers, rows }) => (
  <div className="overflow-x-auto rounded-xl my-6" style={{ border: '1px solid rgba(255,255,255,0.07)' }}>
    <table className="w-full text-sm">
      <thead>
        <tr style={{ background: 'rgba(79,195,247,0.06)', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
          {headers.map(h => <th key={h} className="px-4 py-3 text-left font-semibold text-kmf-text-primary">{h}</th>)}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
            {row.map((cell, j) => <td key={j} className="px-4 py-3 text-kmf-text-secondary">{cell}</td>)}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
