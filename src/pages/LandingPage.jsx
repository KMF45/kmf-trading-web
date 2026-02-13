import Navbar from '../components/landing/Navbar';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Download from '../components/Download';
import FAQ from '../components/FAQ';
import Footer from '../components/Footer';

const LandingPage = () => {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Download />
        <FAQ />
      </main>
      <Footer />
    </>
  );
};

export default LandingPage;
