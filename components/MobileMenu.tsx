'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Instagram, Linkedin, Phone } from 'lucide-react';
import { useLenis } from '@studio-freight/react-lenis';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  links: string[];
}

const menuVariants = {
  closed: {
    opacity: 0,
    y: "-100%",
    transition: {
      duration: 0.5,
      ease: [0.76, 0, 0.24, 1] as [number, number, number, number],
      when: "afterChildren",
      staggerChildren: 0.1,
      staggerDirection: -1
    }
  },
  open: {
    opacity: 1,
    y: "0%",
    transition: {
      duration: 0.5,
      ease: [0.76, 0, 0.24, 1] as [number, number, number, number],
      when: "beforeChildren",
      staggerChildren: 0.1
    }
  }
};

const linkVariants = {
  closed: {
    y: 80,
    opacity: 0,
    transition: {
        duration: 0.5,
        ease: [0.76, 0, 0.24, 1] as [number, number, number, number]
    }
  },
  open: {
    y: 0,
    opacity: 1,
    transition: {
        duration: 0.5,
        ease: [0.76, 0, 0.24, 1] as [number, number, number, number]
    }
  }
};

const footerVariants = {
    closed: { y: 20, opacity: 0 },
    open: { y: 0, opacity: 1, transition: { delay: 0.6 } }
};

export default function MobileMenu({ isOpen, onClose, links }: MobileMenuProps) {
  const lenis = useLenis();

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      lenis?.stop();
    } else {
      document.body.style.overflow = '';
      lenis?.start();
    }
    return () => {
        document.body.style.overflow = '';
        lenis?.start();
    };
  }, [isOpen, lenis]);

  const handleLinkClick = (targetId: string) => {
    onClose();
    // Allow menu to close before scrolling
    setTimeout(() => {
        if (lenis) {
            lenis.scrollTo(targetId, { duration: 1.5 });
        } else {
            document.querySelector(targetId)?.scrollIntoView({ behavior: 'smooth' });
        }
    }, 500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial="closed"
          animate="open"
          exit="closed"
          variants={menuVariants}
          className="fixed inset-0 z-[100] w-full h-screen bg-black/90 backdrop-blur-[15px] flex flex-col justify-center px-8"
        >
          {/* Menu Items */}
          <div className="flex flex-col gap-6">
            {links.map((link, index) => (
              <motion.div key={link} variants={linkVariants} className="overflow-hidden">
                <a
                  href={`#${link.toLowerCase()}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(`#${link.toLowerCase()}`);
                  }}
                  className="group relative flex items-baseline gap-4 text-white"
                >
                    <span className="text-sm font-mono text-blue-500 font-bold">
                        0{index + 1}
                    </span>
                    <span className="text-5xl md:text-6xl font-bold tracking-tight group-active:text-blue-500 transition-colors">
                        {link}
                    </span>
                </a>
              </motion.div>
            ))}
          </div>

          {/* Footer Socials */}
          <motion.div 
            variants={footerVariants}
            className="absolute bottom-12 left-0 w-full px-8 flex justify-between items-center border-t border-white/10 pt-6"
          >
            <span className="text-xs text-gray-500 uppercase tracking-widest">Connect with me</span>
            <div className="flex gap-6">
                 <a href="https://www.instagram.com/habib.site?igsh=MTZjejRodzUxNXgzeg==" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors"><Instagram size={20} /></a>
                 <a href="https://www.linkedin.com/in/muhammad-habiburrahman-6aa02033a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors"><Linkedin size={20} /></a>
                 <a href="https://wa.link/zjo1b2" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors"><Phone size={20} /></a>
            </div>
          </motion.div>

        </motion.div>
      )}
    </AnimatePresence>
  );
}
