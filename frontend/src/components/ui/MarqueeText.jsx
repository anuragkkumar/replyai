import React from 'react';
import { motion } from 'framer-motion';

export default function MarqueeText({
  items = [],
  speed = 25,
  reverse = false,
  className = '',
}) {
  const repeated = [...items, ...items, ...items, ...items];

  return (
    <div className={`overflow-hidden whitespace-nowrap flex select-none ${className}`}>
      <motion.div
        className="flex items-center gap-8 py-3"
        animate={{
          x: reverse ? ['0%', '-50%'] : ['-50%', '0%'],
        }}
        transition={{
          repeat: Infinity,
          ease: 'linear',
          duration: speed,
        }}
      >
        {repeated.map((item, idx) => (
          <div key={idx} className="inline-flex items-center gap-3">
            {typeof item === 'string' ? (
              <span className="text-sm md:text-base text-neutral-400 font-medium tracking-wide">
                {item}
              </span>
            ) : (
              item
            )}
            <span className="text-neutral-700 text-xs">◆</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
