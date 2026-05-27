import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from './ui/button';
import { Sparkles } from 'lucide-react';

const GeneratorNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef(null);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  
  // Handle outside click for dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowProfileDropdown(false);
      }
    };
    
    if (showProfileDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showProfileDropdown]);
  
  const scrollToContact = (e) => {
    e.preventDefault();
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const contactSection = document.getElementById('contact-section');
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const contactSection = document.getElementById('contact-section');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };
  
  return (
    <header className="sticky top-0 z-50 bg-[var(--bg)] border-b border-[var(--border)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Left: Logo */}
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-2 text-[var(--text)] hover:text-[var(--primary)] transition-colors"
          data-testid="logo-home-button"
        >
          <Sparkles className="h-6 w-6 text-[var(--primary)]" />
          <span className="text-xl font-bold">ReplyAI</span>
        </button>
        
        {/* Middle: Navigation Links */}
        <div className="hidden md:flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/')}
            className={location.pathname === '/' ? 'text-[var(--text)]' : 'text-[var(--text-2)]'}
            data-testid="nav-home"
          >
            Home
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/generator')}
            className={location.pathname === '/generator' ? 'text-[var(--text)]' : 'text-[var(--text-2)]'}
            data-testid="nav-replyai"
          >
            ReplyAI
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/how-it-works')}
            className={location.pathname === '/how-it-works' ? 'text-[var(--text)]' : 'text-[var(--text-2)]'}
            data-testid="nav-how-it-works"
          >
            How it works
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/get-extension')}
            className={location.pathname === '/get-extension' ? 'text-[var(--text)]' : 'text-[var(--text-2)]'}
            data-testid="nav-get-extension"
          >
            Get Extension
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/blog')}
            className={location.pathname === '/blog' ? 'text-[var(--text)]' : 'text-[var(--text-2)]'}
            data-testid="nav-blog"
          >
            Blog
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/career')}
            className={location.pathname === '/career' ? 'text-[var(--text)]' : 'text-[var(--text-2)]'}
            data-testid="nav-career"
          >
            Career
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={scrollToContact}
            className="text-[var(--text-2)]"
            data-testid="nav-contact"
          >
            Contact
          </Button>
        </div>
        
        {/* Right: Profile Button with Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setShowProfileDropdown(!showProfileDropdown)}
            className="w-10 h-10 rounded-full bg-[#2a2a3a] flex items-center justify-center hover:bg-[#353549] transition-colors"
            data-testid="profile-button"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="8" r="4" />
              <path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" />
            </svg>
          </button>
          
          {/* Dropdown Menu */}
          {showProfileDropdown && (
            <div
              className="absolute right-0 mt-2 w-56 bg-[var(--surface)] border border-[var(--border)] rounded-[12px] shadow-[var(--shadow-2)] overflow-hidden"
              data-testid="profile-dropdown"
            >
              <div className="p-4 border-b border-[var(--border)]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#2a2a3a] flex items-center justify-center flex-shrink-0">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="8" r="4" />
                      <path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-semibold text-[var(--text)]">Guest</div>
                    <div className="text-xs text-[var(--text-3)]">Guest Mode</div>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <p className="text-sm text-[var(--text-3)] text-center">
                  Login coming soon...
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default GeneratorNavbar;
