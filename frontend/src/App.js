import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import Navbar from './components/Navbar';
import GeneratorNavbar from './components/GeneratorNavbar';
import LandingPage from './pages/LandingPage';
import GeneratorPage from './pages/GeneratorPage';
import HowItWorks from './pages/HowItWorks';
import GetExtension from './pages/GetExtension';
import BlogPage from './pages/BlogPage';
import CareerPage from './pages/CareerPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
        <Routes>
          {/* Landing Page - Use GeneratorNavbar */}
          <Route path="/" element={
            <>
              <GeneratorNavbar />
              <main>
                <LandingPage />
              </main>
            </>
          } />
          
          {/* Generator Page - No Navbar (has its own integrated navbar) */}
          <Route path="/generator" element={<GeneratorPage />} />
          
          {/* Other Pages with Old Navbar */}
          <Route path="/how-it-works" element={
            <>
              <Navbar />
              <main>
                <HowItWorks />
              </main>
            </>
          } />
          <Route path="/get-extension" element={
            <>
              <Navbar />
              <main>
                <GetExtension />
              </main>
            </>
          } />
          <Route path="/blog" element={
            <>
              <Navbar />
              <main>
                <BlogPage />
              </main>
            </>
          } />
          <Route path="/career" element={
            <>
              <Navbar />
              <main>
                <CareerPage />
              </main>
            </>
          } />
        </Routes>
        <Toaster position="top-center" theme="dark" />
      </div>
    </Router>
  );
}

export default App;
