import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
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
          {/* Landing Page */}
          <Route path="/" element={
            <>
              <GeneratorNavbar />
              <main>
                <LandingPage />
              </main>
            </>
          } />
          
          {/* Generator Page */}
          <Route path="/generator" element={<GeneratorPage />} />
          
          {/* All Other Pages with Shared Navbar */}
          <Route path="/how-it-works" element={
            <>
              <GeneratorNavbar />
              <main>
                <HowItWorks />
              </main>
            </>
          } />
          <Route path="/get-extension" element={
            <>
              <GeneratorNavbar />
              <main>
                <GetExtension />
              </main>
            </>
          } />
          <Route path="/blog" element={
            <>
              <GeneratorNavbar />
              <main>
                <BlogPage />
              </main>
            </>
          } />
          <Route path="/career" element={
            <>
              <GeneratorNavbar />
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
