import Navbar from '../components/landing/Navbar';
import Hero from '../components/Hero';
import BetaBanner from '../components/BetaBanner';
import WhyKMF from '../components/WhyKMF';
import Features from '../components/Features';
import HowItWorks from '../components/HowItWorks';
import Testimonials from '../components/Testimonials';
import Pricing from '../components/Pricing';
import Download from '../components/Download';
import FAQ from '../components/FAQ';
import Footer from '../components/Footer';

const LandingPage = () => {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <Hero />
        <BetaBanner />
        <WhyKMF />
        <Features />
        <HowItWorks />
        <Testimonials />
        <Pricing />
        <Download />
        <FAQ />
      </main>
      <Footer />
    </>
  );
};

export default LandingPage;
