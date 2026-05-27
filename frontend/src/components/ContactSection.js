import React, { useState, useRef, useEffect } from 'react';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { User, Mail, MessageSquare, Loader2, Check } from 'lucide-react';

const ContactSection = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('idle'); // idle, loading, sent
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    
    // Simulate sending
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setStatus('sent');
    setTimeout(() => {
      setName('');
      setEmail('');
      setMessage('');
      setStatus('idle');
    }, 3000);
  };

  return (
    <div 
      id="contact-section"
      ref={sectionRef}
      className={`py-20 transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="max-w-2xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-3 relative inline-block w-full">
          <span className="relative">
            Get in Touch
            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-[var(--primary)] rounded-full animate-pulse"></span>
          </span>
        </h2>
        <p className="text-center text-[var(--text-2)] mb-12">Have questions? We'd love to hear from you</p>
        
        <Card className="bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-lg)] p-8 shadow-[var(--shadow-2)]">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name field */}
            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                <User className="h-5 w-5 text-[var(--text-3)]" />
              </div>
              <Input
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="pl-12 h-12 bg-[var(--bg-2)] border-[var(--border)] focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20 transition-all"
              />
            </div>

            {/* Email field */}
            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                <Mail className="h-5 w-5 text-[var(--text-3)]" />
              </div>
              <Input
                type="email"
                placeholder="Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="pl-12 h-12 bg-[var(--bg-2)] border-[var(--border)] focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20 transition-all"
              />
            </div>

            {/* Message field */}
            <div className="relative">
              <div className="absolute left-3 top-4">
                <MessageSquare className="h-5 w-5 text-[var(--text-3)]" />
              </div>
              <Textarea
                placeholder="Your Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                rows={4}
                className="pl-12 bg-[var(--bg-2)] border-[var(--border)] focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20 transition-all resize-none"
              />
            </div>

            {/* Submit button */}
            <Button
              type="submit"
              disabled={status !== 'idle'}
              className={`w-full h-12 font-semibold rounded-[12px] transition-all duration-300 ${
                status === 'sent'
                  ? 'bg-[var(--success)] hover:bg-[var(--success)]'
                  : 'bg-gradient-to-r from-[var(--primary)] to-[var(--primary-hover)] hover:shadow-lg hover:shadow-[var(--primary)]/50'
              }`}
            >
              {status === 'loading' && (
                <>
                  <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                  Sending...
                </>
              )}
              {status === 'sent' && (
                <>
                  <Check className="h-5 w-5 mr-2 animate-bounce" />
                  Message Sent! ✓
                </>
              )}
              {status === 'idle' && 'Send Message'}
            </Button>
          </form>

          {/* LinkedIn link */}
          <div className="flex items-center justify-center mt-8 pt-6 border-t border-[var(--border)]">
            <a
              href="https://www.linkedin.com/in/anuragkumarse"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[var(--text-2)] hover:text-[var(--primary)] transition-colors"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              <span className="text-sm">Connect on LinkedIn</span>
            </a>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ContactSection;
