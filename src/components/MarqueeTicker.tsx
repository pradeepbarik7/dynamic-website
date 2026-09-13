import { motion } from 'motion/react';

export default function MarqueeTicker() {
  const items = [
    '3D CGI & CHARACTER ANIMATION',
    'BRAND ARCHITECTURE',
    'SPATIAL COMPUTING',
    'GENERATIVE MEDIA LABS',
    'CULTURAL CAMPAIGNS',
    'REAL-TIME WEBGL SHADERS',
    'TOKYO ⇄ LONDON ⇄ NEW YORK',
    'HARDWARE & SENSORY DESIGN',
  ];

  return (
    <div
      id="marquee-ticker"
      className="w-full bg-neutral-950 border-y border-neutral-900 py-3.5 sm:py-4 overflow-hidden select-none"
    >
      <div className="flex w-max">
        <motion.div
          animate={{ x: ['0%', '-50%'] }}
          transition={{
            repeat: Infinity,
            ease: 'linear',
            duration: 28,
          }}
          className="flex items-center whitespace-nowrap text-xs sm:text-sm font-mono tracking-widest text-neutral-400 uppercase"
        >
          {[...items, ...items].map((item, idx) => (
            <span key={idx} className="inline-flex items-center gap-6 sm:gap-8 mx-3 sm:mx-4">
              <span className="hover:text-white transition-colors">{item}</span>
              <span className="text-white text-base leading-none">&#10033;</span>
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
