'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;
    
    if (!cursor || !follower) return;

    const moveCursor = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
      });
      gsap.to(follower, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.3, 
      });
    };

    const handleHoverStart = () => setIsHovering(true);
    const handleHoverEnd = () => setIsHovering(false);

    window.addEventListener('mousemove', moveCursor);

    // Add listeners to interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .cursor-hover');
    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', handleHoverStart);
      el.addEventListener('mouseleave', handleHoverEnd);
    });

    // Observer for dynamic elements (like those added by React)
    const observer = new MutationObserver(() => {
        const newElements = document.querySelectorAll('a, button, .cursor-hover');
        newElements.forEach((el) => {
            el.removeEventListener('mouseenter', handleHoverStart);
            el.removeEventListener('mouseleave', handleHoverEnd);
            el.addEventListener('mouseenter', handleHoverStart);
            el.addEventListener('mouseleave', handleHoverEnd);
        });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      observer.disconnect();
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleHoverStart);
        el.removeEventListener('mouseleave', handleHoverEnd);
      });
    };
  }, []);

  return (
    <>
      {/* Main Dot Cursor */}
      <div 
        ref={cursorRef} 
        className={`fixed top-0 left-0 w-3 h-3 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference transform -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300 ${isHovering ? 'opacity-0' : 'opacity-100'}`}
      />
      
      {/* Larger Follower / Hover State */}
      <div 
        ref={followerRef}
        className={`fixed top-0 left-0 rounded-full pointer-events-none z-[9998] transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ease-out border border-white/50 mix-blend-difference
          ${isHovering ? 'w-16 h-16 bg-white/20 border-transparent backdrop-blur-sm' : 'w-8 h-8 bg-transparent'}
        `}
      />
    </>
  );
}
