import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from './ui/button';
import { Sparkles } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();
  
  return (
    <nav className="sticky top-0 z-50 bg-[var(--bg)] border-b border-[var(--border)] h-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2" data-testid="navbar-logo">
          <Sparkles className="h-6 w-6 text-[var(--primary)]" />
          <span className="text-xl font-semibold">ReplyAI</span>
        </Link>
        
        <div className="flex items-center gap-4">
          <Link to="/how-it-works">
            <Button 
              variant="ghost" 
              size="sm"
              data-testid="navbar-how-it-works-link"
              className={location.pathname === '/how-it-works' ? 'text-[var(--text)]' : 'text-[var(--text-2)]'}
            >
              How it works
            </Button>
          </Link>
          <Link to="/get-extension">
            <Button 
              variant="ghost" 
              size="sm"
              data-testid="navbar-get-extension-link"
              className={location.pathname === '/get-extension' ? 'text-[var(--text)]' : 'text-[var(--text-2)]'}
            >
              Get Extension
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
