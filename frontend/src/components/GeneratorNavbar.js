import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from './ui/button';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

// Custom Precision Geometric 1.5px Stroke Icons
const NavHomeIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z" />
    <path d="M9 21V12h6v9" />
  </svg>
);

const NavGeneratorIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const NavLayersIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2L2 7l10 5 10-5-10-5z" />
    <path d="M2 17l10 5 10-5" />
    <path d="M2 12l10 5 10-5" />
  </svg>
);

const NavToolsIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="14" width="7" height="7" rx="1" />
    <rect x="3" y="14" width="7" height="7" rx="1" />
    <path d="M10 6.5h4M6.5 10v4M14 17.5h-4M17.5 10v4" />
  </svg>
);

const NavDocsIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    <line x1="9" y1="7" x2="15" y2="7" />
    <line x1="9" y1="11" x2="13" y2="11" />
  </svg>
);

const NavBriefcaseIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="14" rx="1" />
    <path d="M16 7V4a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3" />
    <line x1="12" y1="12" x2="12" y2="12.01" />
  </svg>
);

const NavMailIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="1" />
    <path d="M22 6l-10 7L2 6" />
  </svg>
);

const GeneratorNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const { theme, toggleTheme, isDark } = useTheme();
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  
  // Handle outside click for dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowProfileDropdown(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        const hamburgerButton = document.getElementById('hamburger-button');
        if (hamburgerButton && !hamburgerButton.contains(event.target)) {
          setShowMobileMenu(false);
        }
      }
    };
    
    if (showProfileDropdown || showMobileMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showProfileDropdown, showMobileMenu]);
  
  const scrollToContact = () => {
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
  
  const handleNavClick = (path) => {
    if (path === 'contact') {
      scrollToContact();
    } else {
      navigate(path);
    }
    setShowMobileMenu(false);
  };

  const navToolbarItems = [
    {
      id: 'home',
      label: 'Overview',
      icon: <NavHomeIcon />,
      onClick: () => navigate('/'),
      isActive: location.pathname === '/',
      badge: null,
    },
    {
      id: 'replyai',
      label: 'Generator',
      icon: <NavGeneratorIcon />,
      onClick: () => navigate('/generator'),
      isActive: location.pathname === '/generator',
      badge: '6 modes',
    },
    {
      id: 'how-it-works',
      label: 'How it works',
      icon: <NavLayersIcon />,
      onClick: () => navigate('/how-it-works'),
      isActive: location.pathname === '/how-it-works',
      badge: null,
    },
    {
      id: 'get-extension',
      label: 'Extension',
      icon: <NavToolsIcon />,
      onClick: () => navigate('/get-extension'),
      isActive: location.pathname === '/get-extension',
      badge: 'v1.2',
    },
    {
      id: 'blog',
      label: 'Docs & Blog',
      icon: <NavDocsIcon />,
      onClick: () => navigate('/blog'),
      isActive: location.pathname === '/blog',
      badge: null,
    },
    {
      id: 'career',
      label: 'Careers',
      icon: <NavBriefcaseIcon />,
      onClick: () => navigate('/career'),
      isActive: location.pathname === '/career',
      badge: null,
    },
    {
      id: 'contact',
      label: 'Contact',
      icon: <NavMailIcon />,
      onClick: scrollToContact,
      isActive: false,
      badge: null,
    },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[var(--bg)] border-b border-[var(--border)] transition-colors duration-200">
      {/* Top Header Row */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 h-14 flex items-center justify-between border-b border-[var(--border-subtle)]">
        {/* Left: Brand */}
        <div className="flex items-center gap-3">
          <button
            id="hamburger-button"
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="p-1.5 rounded-[4px] border border-[var(--border)] bg-[var(--surface)] text-[var(--text-2)] hover:text-[var(--text)] hover:border-[var(--primary)] transition-colors md:hidden"
            data-testid="mobile-menu-button"
          >
            {showMobileMenu ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>

          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2.5 text-[var(--text)] hover:text-[var(--primary)] transition-colors font-mono select-none"
            data-testid="logo-home-button"
          >
            <div className="w-7 h-7 rounded-[4px] bg-[var(--primary)] text-[var(--primary-contrast)] flex items-center justify-center font-bold text-xs">
              &gt;_
            </div>
            <span className="text-sm font-bold tracking-tight text-[var(--text)]">replyai</span>
          </button>
        </div>

        {/* Right: Quick Actions & Profile */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Theme Switcher Button */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle Black/Light Theme"
            title={isDark ? "Switch to Light Theme" : "Switch to Dark Theme"}
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-[4px] bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--primary)] text-[var(--text-2)] hover:text-[var(--primary)] font-mono text-xs transition-all select-none shadow-sm"
            data-testid="theme-toggle-button"
          >
            {isDark ? (
              <>
                <Sun className="w-3.5 h-3.5 text-[#84CC16]" />
                <span className="hidden md:inline text-[11px]">[ LIGHT ]</span>
              </>
            ) : (
              <>
                <Moon className="w-3.5 h-3.5 text-[var(--primary)]" />
                <span className="hidden md:inline text-[11px]">[ DARK ]</span>
              </>
            )}
          </button>

          <button
            onClick={() => navigate('/generator')}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-[var(--primary-contrast)] text-xs font-mono font-semibold rounded-[4px] transition-all shadow-sm"
          >
            <span>[ RUN_APP ]</span>
          </button>

          {/* Profile Menu */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setShowProfileDropdown(!showProfileDropdown)}
              className="w-8 h-8 rounded-full bg-[var(--surface-2)] border border-[var(--border)] hover:border-[var(--primary)] flex items-center justify-center text-[var(--text)] font-mono text-xs font-bold transition-colors"
              data-testid="profile-button"
            >
              R
            </button>
            {showProfileDropdown && (
              <div
                className="absolute right-0 mt-2 w-56 bg-[var(--surface)] border border-[var(--border)] rounded-[4px] shadow-2xl overflow-hidden font-mono text-xs z-50"
                data-testid="profile-dropdown"
              >
                <div className="p-3 border-b border-[var(--border)] bg-[var(--bg)]">
                  <div className="flex items-center gap-2.5">
                    <div className="w-2 h-2 rounded-full bg-[var(--primary)]" />
                    <div>
                      <div className="font-semibold text-[var(--text)]">replyai</div>
                      <div className="text-[10px] text-[var(--text-3)]">engine v1.2</div>
                    </div>
                  </div>
                </div>
                <div className="p-3">
                  <p className="text-[11px] text-[var(--text-3)]">
                    Signed in as guest session.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* GitHub-style Horizontal Tab Row with Underline Indicator */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
        <nav
          className="flex items-center gap-1 sm:gap-2 overflow-x-auto no-scrollbar pt-1 font-sans text-xs"
          aria-label="Repository Navigation Tabs"
        >
          {navToolbarItems.map((item) => (
            <button
              key={item.id}
              onClick={item.onClick}
              className={`relative inline-flex items-center gap-2 px-3 py-2.5 border-b-2 transition-colors whitespace-nowrap cursor-pointer select-none ${
                item.isActive
                  ? 'border-[var(--primary)] text-[var(--text)] font-semibold'
                  : 'border-transparent text-[var(--text-2)] hover:text-[var(--text)] hover:border-[var(--border)]'
              }`}
            >
              <span className={item.isActive ? 'text-[var(--primary)]' : 'text-[var(--text-3)]'}>
                {item.icon}
              </span>
              <span>{item.label}</span>

              {item.badge && (
                <span
                  className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono leading-tight ${
                    item.isActive
                      ? 'bg-[var(--primary)]/15 text-[var(--primary)] border border-[var(--primary)]/30'
                      : 'bg-[var(--surface-2)] text-[var(--text-2)] border border-[var(--border)]'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </nav>
      </div>

      {/* Mobile Menu Dropdown */}
      {showMobileMenu && (
        <div
          ref={mobileMenuRef}
          className="md:hidden absolute top-full left-0 right-0 bg-[var(--surface)] border-b border-[var(--border)] shadow-2xl z-40 font-mono text-xs"
          data-testid="mobile-menu"
        >
          <div className="px-4 py-3 space-y-1">
            {navToolbarItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  item.onClick();
                  setShowMobileMenu(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-[4px] border transition-colors ${
                  item.isActive
                    ? 'bg-[var(--primary)]/15 text-[var(--text)] border-[var(--primary)]/30 font-semibold'
                    : 'text-[var(--text-2)] border-transparent hover:bg-[var(--surface-2)] hover:text-[var(--text)]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className={item.isActive ? 'text-[var(--primary)]' : 'text-[var(--text-3)]'}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-[var(--surface-2)] text-[var(--text-2)] border border-[var(--border)]">
                    {item.badge}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default GeneratorNavbar;
