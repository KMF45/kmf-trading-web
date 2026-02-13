import { FaDownload } from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi2';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-kmf-bg pt-20" aria-label="K.M.F. Trading Journal introduction">
      <div className="container mx-auto px-4 text-center">
        <div className="mb-8">
          {/* LCP image: WebP with PNG fallback, fetchpriority=high, explicit dimensions */}
          <picture>
            <source srcSet="/logo-320.webp" type="image/webp" />
            <img
              src="/logo-320.png"
              alt="K.M.F. Trading Journal logo - Professional trading journal for forex, stocks and crypto traders"
              className="w-40 h-40 mx-auto drop-shadow-[0_0_15px_rgba(79,195,247,0.5)]"
              width="160"
              height="160"
              fetchpriority="high"
            />
          </picture>
        </div>
        <h1 className="text-6xl font-bold mb-6">
          <span className="logo-text">K.M.F.</span>
          <br />
          <span className="text-kmf-text-primary">Trading Journal</span>
        </h1>
        <p className="text-3xl font-semibold text-kmf-text-secondary mb-4">
          KEEP MOVING FORWARD
        </p>
        <p className="text-xl text-kmf-text-tertiary max-w-3xl mx-auto mb-12">
          Professional trading journal for forex, stocks and crypto traders. Track your trades, analyze performance, and improve your strategy.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href="#download"
            className="px-8 py-4 bg-kmf-accent-bright text-white text-lg font-semibold rounded-lg flex items-center gap-3 hover:shadow-glow transition-all duration-300 hover:scale-105"
            aria-label="Download K.M.F. Trading Journal for Android"
          >
            <FaDownload aria-hidden="true" />
            Download App
          </a>
          <a
            href="#features"
            className="px-8 py-4 bg-transparent text-kmf-accent text-lg font-semibold rounded-lg border-2 border-kmf-accent flex items-center gap-3 hover:bg-kmf-accent/10 transition-all duration-300"
            aria-label="Explore K.M.F. Trading Journal features"
          >
            <HiSparkles aria-hidden="true" />
            Explore Features
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
