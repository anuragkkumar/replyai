import React from 'react';

const Footer = () => {
  return (
    <footer className="border-t border-[#1C2E22] bg-[#08120D] py-10 font-mono text-xs text-[#6B7D73]">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-[#10B981]" />
          <span className="text-[#F0FDF4] font-semibold">reply.ai</span>
          <span className="text-[#1C2E22]">|</span>
          <span>RAM-ONLY ZERO RETENTION ARCHITECTURE</span>
        </div>
        
        <div className="flex items-center gap-6">
          <span>DEVELOPED BY <a href="https://www.linkedin.com/in/anuragkumarse" target="_blank" rel="noopener noreferrer" className="text-[#A7B5AD] hover:text-[#10B981] underline underline-offset-4">ANURAG KUMAR</a></span>
          <span>© 2026</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

