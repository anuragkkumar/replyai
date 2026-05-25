import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import HowItWorks from './pages/HowItWorks';
import GetExtension from './pages/GetExtension';
import './App.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/get-extension" element={<GetExtension />} />
          </Routes>
        </main>
        <Toaster position="top-center" theme="dark" />
      </div>
    </Router>
  );
}

export default App;
