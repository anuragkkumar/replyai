import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import GeneratorPage from './pages/GeneratorPage';
import HowItWorks from './pages/HowItWorks';
import GetExtension from './pages/GetExtension';
import './App.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
        <Routes>
          {/* Landing Page - No Navbar */}
          <Route path="/" element={
            <>
              <Navbar />
              <main>
                <LandingPage />
              </main>
            </>
          } />
          
          {/* Generator Page - No Navbar (has its own header) */}
          <Route path="/generator" element={<GeneratorPage />} />
          
          {/* Other Pages with Navbar */}
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
        </Routes>
        <Toaster position="top-center" theme="dark" />
      </div>
    </Router>
  );
}

export default App;
