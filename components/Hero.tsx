'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Link from 'next/link';
import MagneticButton from './MagneticButton';
import dynamic from 'next/dynamic';

const Scene = dynamic(() => import('./Scene'), { ssr: false });

const SplitText = ({ text, className }: { text: string; className?: string }) => {
  return (
    <span className={`inline-block overflow-hidden ${className}`}>
      {text.split('').map((char, i) => (
        <span key={i} className="char inline-block opacity-0 transform translate-y-full origin-bottom">
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </span>
  );
};

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate text
      // Animate text
      // Set initial state immediately to avoid FOUC
      gsap.set('.char', { y: '100%', opacity: 0 });
      gsap.set('.fade-in', { y: 20, opacity: 0 });

      gsap.to('.char', {
        y: 0,
        opacity: 1,
        stagger: 0.03, // Faster stagger
        duration: 1.0, // Faster duration
        ease: 'power4.out',
        delay: 0.2, // Reduced delay
      });

      // Animate fade-in elements
      gsap.to('.fade-in', 
        { opacity: 1, y: 0, duration: 0.8, delay: 0.8, stagger: 0.1 }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="home" ref={containerRef} className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-[#0a0a0a]">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <Scene />
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 w-full max-w-7xl px-6 flex flex-col items-center justify-center text-center pointer-events-none">
        
        <div className="overflow-hidden mb-4">
           <p className="fade-in text-sm md:text-base font-medium tracking-[0.2em] text-gray-400 uppercase">
             Crafting Digital Experiences
           </p>
        </div>

        <h1 className="text-5xl md:text-7xl lg:text-9xl font-bold tracking-tight text-white mb-8 leading-[0.9]">
          <SplitText text="HABIBURRAHMAN" className="block" />
        </h1>

        <div className="fade-in pointer-events-auto mt-8">
          <MagneticButton className="text-lg font-semibold text-white bg-white/5 border-white/10 backdrop-blur-md">
            WEB DEVELOPER
          </MagneticButton>
        </div>
        
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 fade-in flex flex-col items-center gap-2">
        <span className="text-[10px] uppercase tracking-widest text-gray-500">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-gray-500 to-transparent opacity-50" />
      </div>
    </section>
  );
}
