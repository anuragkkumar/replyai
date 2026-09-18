import React, { useState, useRef, useEffect } from 'react';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Loader2, Check, Send, Sparkles, Terminal, Activity, ShieldCheck } from 'lucide-react';

const ContactSection = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('idle'); // idle, transmitting, sent
  const [focusedField, setFocusedField] = useState(null);
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

  const [errorMessage, setErrorMessage] = useState('');
  const WEB3FORMS_KEY = process.env.REACT_APP_WEB3FORMS_KEY || '8f8de715-0f59-4d1a-a12a-6606d43d16b5';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setStatus('transmitting');
    
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          name: name.trim(),
          email: email.trim(),
          message: message.trim(),
          from_name: 'ReplyAI Web Transmission',
          subject: `[ReplyAI Contact] Message from ${name.trim() || 'Visitor'}`,
        }),
      });

      const result = await response.json();
      if (result.success) {
        setStatus('sent');
        setTimeout(() => {
          setName('');
          setEmail('');
          setMessage('');
          setStatus('idle');
        }, 4000);
      } else {
        setStatus('idle');
        setErrorMessage(result.message || 'Transmission failed. Please try again.');
      }
    } catch (err) {
      console.error('Submission error:', err);
      setStatus('idle');
      setErrorMessage('Network error during dispatch. Please try again.');
    }
  };

  return (
    <div 
      id="contact-section"
      ref={sectionRef}
      className={`py-20 relative transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      {/* Full section background dot matrix */}
      <div className="absolute inset-0 bg-dot-matrix pointer-events-none opacity-40 -z-10" />

      <div className="max-w-xl mx-auto px-4 relative">
        {/* Header Section with live blinking cursor & scanline accent */}
        <div className="text-center mb-10 relative">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#0F1F16] border border-[#1C2E22] rounded-full text-xs font-mono text-[#10B981] mb-3 shadow-[0_0_15px_rgba(16,185,129,0.08)]">
            <span>[ TRANSMISSION_DISPATCH ]</span>
            <span className="inline-block w-1.5 h-3 bg-[#10B981] animate-pulse" />
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-[#F0FDF4] tracking-tight">
            Reach the developers.
          </h2>
          <p className="text-sm text-[#A7B5AD] mt-2 font-sans max-w-md mx-auto">
            Inquiries, custom enterprise integrations, or direct feedback with the core team.
          </p>

          {/* Live system status ticker */}
          <div className="flex items-center justify-center gap-4 mt-4 font-mono text-[11px] text-[#6B7D73]">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-ping" />
              <span className="text-[#A7B5AD]">AVG RESPONSE: &lt; 4H</span>
            </span>
            <span className="text-[#1C2E22]">//</span>
            <span className="text-[#84CC16]">DISPATCH QUEUE: READY</span>
          </div>
        </div>
        
        {/* Form Card with Glowing Gradient Border & Terminal Window Bar */}
        <div className="relative rounded-md p-[1px] bg-gradient-to-b from-[#10B981]/35 via-[#1C2E22] to-[#1C2E22] shadow-[0_0_35px_rgba(16,185,129,0.07)]">
          <div className="bg-[#0F1F16] rounded-md overflow-hidden relative">
            {/* Grain Noise Overlay */}
            <div className="absolute inset-0 bg-scanline pointer-events-none opacity-10" />

            {/* Terminal Window Top Bar (Traffic Light Dots + Mode) */}
            <div className="px-4 py-3 bg-[#08120D] border-b border-[#1C2E22] flex items-center justify-between font-mono text-xs select-none">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#EF4444]/80 border border-[#EF4444]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]/80 border border-[#F59E0B]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] border border-[#10B981]" />
                <span className="text-[#A7B5AD] ml-2 font-medium">DISPATCH_CONSOLE.SH</span>
              </div>
              <div className="flex items-center gap-2 text-[10px] text-[#84CC16]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#10B981]" />
                <span>TLS_1.3 ENCRYPTED</span>
              </div>
            </div>

            <div className="p-6 sm:p-8">
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name field */}
                <div className="relative">
                  <label className="flex items-center justify-between text-xs font-mono text-[#A7B5AD] mb-1.5">
                    <span>NAME // SENDER</span>
                    {focusedField === 'name' && (
                      <span className="text-[10px] text-[#10B981] animate-pulse">&gt; READY</span>
                    )}
                  </label>
                  <div className="relative flex items-center">
                    {/* Left-side prompt accent bar */}
                    <div
                      className={`absolute left-0 top-0 bottom-0 w-[3px] rounded-l-[4px] transition-all duration-200 ${
                        focusedField === 'name' ? 'bg-[#10B981] shadow-[0_0_8px_#10B981]' : 'bg-transparent'
                      }`}
                    />
                    <Input
                      type="text"
                      placeholder="e.g. Alex Morgan"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      onFocus={() => setFocusedField('name')}
                      onBlur={() => setFocusedField(null)}
                      required
                      className={`h-11 pl-4 bg-[#0A1710] border text-[#F0FDF4] placeholder-[#6B7D73] rounded-[4px] font-mono text-xs transition-all duration-200 ${
                        focusedField === 'name'
                          ? 'border-[#10B981] shadow-[0_0_12px_rgba(16,185,129,0.2)]'
                          : 'border-[#1C2E22] hover:border-[#2B4533]'
                      }`}
                    />
                  </div>
                </div>

                {/* Email field */}
                <div className="relative">
                  <label className="flex items-center justify-between text-xs font-mono text-[#A7B5AD] mb-1.5">
                    <span>EMAIL // RETURN_ADDRESS</span>
                    {focusedField === 'email' && (
                      <span className="text-[10px] text-[#10B981] animate-pulse">&gt; VERIFIED_SOCKET</span>
                    )}
                  </label>
                  <div className="relative flex items-center">
                    {/* Left-side prompt accent bar */}
                    <div
                      className={`absolute left-0 top-0 bottom-0 w-[3px] rounded-l-[4px] transition-all duration-200 ${
                        focusedField === 'email' ? 'bg-[#10B981] shadow-[0_0_8px_#10B981]' : 'bg-transparent'
                      }`}
                    />
                    <Input
                      type="email"
                      placeholder="alex@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField(null)}
                      required
                      className={`h-11 pl-4 bg-[#0A1710] border text-[#F0FDF4] placeholder-[#6B7D73] rounded-[4px] font-mono text-xs transition-all duration-200 ${
                        focusedField === 'email'
                          ? 'border-[#10B981] shadow-[0_0_12px_rgba(16,185,129,0.2)]'
                          : 'border-[#1C2E22] hover:border-[#2B4533]'
                      }`}
                    />
                  </div>
                </div>

                {/* Message field */}
                <div className="relative">
                  <label className="flex items-center justify-between text-xs font-mono text-[#A7B5AD] mb-1.5">
                    <span>PAYLOAD // MESSAGE_BODY</span>
                    {focusedField === 'message' && (
                      <span className="text-[10px] text-[#10B981] animate-pulse">&gt; BUFFER_OPEN</span>
                    )}
                  </label>
                  <div className="relative flex items-start">
                    {/* Left-side prompt accent bar */}
                    <div
                      className={`absolute left-0 top-0 bottom-0 w-[3px] rounded-l-[4px] transition-all duration-200 ${
                        focusedField === 'message' ? 'bg-[#10B981] shadow-[0_0_8px_#10B981]' : 'bg-transparent'
                      }`}
                    />
                    <Textarea
                      placeholder="Specify requirements, feedback, or integration scope..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onFocus={() => setFocusedField('message')}
                      onBlur={() => setFocusedField(null)}
                      required
                      rows={4}
                      className={`pl-4 bg-[#0A1710] border text-[#F0FDF4] placeholder-[#6B7D73] rounded-[4px] font-mono text-xs resize-none transition-all duration-200 ${
                        focusedField === 'message'
                          ? 'border-[#10B981] shadow-[0_0_12px_rgba(16,185,129,0.2)]'
                          : 'border-[#1C2E22] hover:border-[#2B4533]'
                      }`}
                    />
                  </div>
                </div>

                {errorMessage && (
                  <div className="p-3 bg-[#2A0E0E] border border-[#EF4444]/40 rounded-[4px] font-mono text-xs text-[#FCA5A5] flex items-center gap-2">
                    <span className="text-[#EF4444] font-bold">⚠</span>
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* Submit button with shimmer effect and state-driven micro-animation */}
                <button
                  type="submit"
                  disabled={status !== 'idle'}
                  className={`w-full h-11 font-mono text-xs font-bold rounded-[4px] transition-all duration-300 flex items-center justify-center gap-2 select-none shadow-[0_4px_20px_rgba(16,185,129,0.25)] ${
                    status === 'sent'
                      ? 'bg-[#10B981] text-[#04140B]'
                      : status === 'transmitting'
                      ? 'bg-[#059669] text-[#F0FDF4]'
                      : 'btn-shimmer text-[#04140B] hover:shadow-[0_4px_25px_rgba(16,185,129,0.4)] active:translate-y-0.5'
                  }`}
                >
                  {status === 'transmitting' && (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin text-[#F0FDF4]" />
                      <span>TRANSMITTING PAYLOAD...</span>
                    </>
                  )}
                  {status === 'sent' && (
                    <>
                      <Check className="h-4 w-4 text-[#04140B]" />
                      <span>TRANSMISSION CONFIRMED ✓</span>
                    </>
                  )}
                  {status === 'idle' && (
                    <>
                      <span>[ EXECUTE DISPATCH ]</span>
                      <Send className="w-3.5 h-3.5 ml-1" />
                    </>
                  )}
                </button>
              </form>

              {/* Direct developer link styled like an interactive command */}
              <div className="flex items-center justify-center mt-6 pt-4 border-t border-[#1C2E22]">
                <a
                  href="https://www.linkedin.com/in/anuragkumarse"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 font-mono text-xs text-[#A7B5AD] hover:text-[#84CC16] transition-all px-3 py-1.5 rounded-[4px] hover:bg-[#14281D] border border-transparent hover:border-[#84CC16]/40"
                >
                  <svg className="h-4 w-4 fill-current group-hover:text-[#84CC16] group-hover:drop-shadow-[0_0_6px_#84CC16] transition-all" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  <span className="group-hover:underline underline-offset-4">&gt; CONNECT WITH CORE MAINTAINER</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;


