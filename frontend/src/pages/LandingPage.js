import React from 'react';
import { useNavigate } from 'react-router-dom';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Testimonials from '../components/Testimonials';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleTryNow = () => {
    navigate('/generator');
  };

  return (
    <div>
      {/* Landing Page Sections */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <Hero onTryNow={handleTryNow} />
        <Features />
        <Testimonials />
      </div>

      {/* Contact Section */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <ContactSection />
      </div>

      <Footer />
    </div>
  );
};

export default LandingPage;
