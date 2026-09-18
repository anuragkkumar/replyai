import React from 'react';
import { useNavigate } from 'react-router-dom';
import Hero from '../components/Hero';
import PlatformMarquee from '../components/sections/PlatformMarquee';
import Features from '../components/Features';
import Testimonials from '../components/Testimonials';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';
import ScrollProgressBar from '../components/ui/ScrollProgressBar';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleTryNow = () => {
    navigate('/generator');
  };

  return (
    <div className="relative overflow-hidden">
      {/* Top progress tracker */}
      <ScrollProgressBar />

      {/* Hero Section */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
        <Hero onTryNow={handleTryNow} />
      </div>

      {/* Infinite Platform Marquee */}
      <PlatformMarquee />

      {/* Features Bento Grid & Performance Stats */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
        <Features />
        <Testimonials />
      </div>

      {/* Contact Section */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
        <ContactSection />
      </div>

      <Footer />
    </div>
  );
};

export default LandingPage;

