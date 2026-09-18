import React, { useRef, useState } from 'react';
import { motion, useSpring } from 'framer-motion';
import { cn } from '@/lib/utils';

export default function MagneticButton({
  children,
  className = '',
  onClick,
  strength = 30,
  variant = 'primary',
  ...props
}) {
  const ref = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
  const x = useSpring(0, springConfig);
  const y = useSpring(0, springConfig);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const distanceX = (e.clientX - centerX) / (width / 2);
    const distanceY = (e.clientY - centerY) / (height / 2);

    x.set(distanceX * strength);
    y.set(distanceY * strength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  const variants = {
    primary:
      'bg-gradient-to-r from-[var(--primary)] to-[#7c3aed] text-white shadow-[0_0_25px_rgba(99,102,241,0.35)] hover:shadow-[0_0_35px_rgba(99,102,241,0.55)] border border-white/10',
    secondary:
      'bg-neutral-900/80 text-neutral-100 hover:bg-neutral-800/90 border border-neutral-700/60 hover:border-neutral-500/80',
    ghost:
      'bg-transparent text-neutral-300 hover:text-white border border-neutral-800 hover:border-neutral-600',
    outline:
      'bg-transparent text-white border border-[var(--primary)]/60 hover:bg-[var(--primary)]/10',
  };

  return (
    <motion.button
      ref={ref}
      style={{ x, y }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      whileTap={{ scale: 0.96 }}
      className={cn(
        'relative inline-flex items-center justify-center font-medium transition-colors rounded-xl px-6 py-3 cursor-pointer overflow-hidden group select-none',
        variants[variant] || variants.primary,
        className
      )}
      {...props}
    >
      {/* Subtle shine on hover */}
      <motion.div
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background:
            'radial-gradient(circle at 50% 0%, rgba(255,255,255,0.2) 0%, transparent 70%)',
        }}
      />
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </motion.button>
  );
}
