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
import { PixelCanvas } from './components/ui/pixel-canvas';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import './App.css';

function AppContent() {
  const { isDark } = useTheme();

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] relative overflow-x-hidden transition-colors duration-200">
      {/* Global Interactive Pixel Canvas Background (styled per theme) */}
      <div className={`fixed inset-0 z-0 pointer-events-none transition-opacity duration-300 ${isDark ? 'opacity-40' : 'opacity-20'}`}>
        <PixelCanvas
          gap={14}
          speed={0.025}
          colors={isDark ? ["#10B981", "#84CC16", "#059669", "#34D399", "#A7F3D0"] : ["#059669", "#65A30D", "#10B981", "#34D399"]}
          variant="glow"
          globalTracking={true}
        />
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
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
        </div>
        <Toaster position="top-center" theme={isDark ? "dark" : "light"} />
      </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <Router>
        <AppContent />
      </Router>
    </ThemeProvider>
  );
}

export default App;

