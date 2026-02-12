import { FaDownload } from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi2';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-kmf-bg">
      <div className="container mx-auto px-4 text-center">
        <div className="mb-8">
          <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-r from-kmf-accent to-kmf-accent-bright flex items-center justify-center text-5xl font-bold text-white">
            KMF
          </div>
        </div>
        <h1 className="text-6xl font-bold mb-6">
          <span className="gradient-text">K.M.F.</span>
          <br />
          <span className="text-kmf-text-primary">Trading Journal</span>
        </h1>
        <div className="text-3xl font-semibold text-kmf-text-secondary mb-4">
          KEEP MOVING FORWARD
        </div>
        <p className="text-xl text-kmf-text-tertiary max-w-3xl mx-auto mb-12">
          Professional trading journal for serious traders. Track your trades and improve your strategy.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a href="#download" className="px-8 py-4 bg-kmf-accent-bright text-white text-lg font-semibold rounded-lg flex items-center gap-3">
            <FaDownload />
            Download App
          </a>
          <a href="#features" className="px-8 py-4 bg-transparent text-kmf-accent text-lg font-semibold rounded-lg border-2 border-kmf-accent flex items-center gap-3">
            <HiSparkles />
            Explore Features
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
