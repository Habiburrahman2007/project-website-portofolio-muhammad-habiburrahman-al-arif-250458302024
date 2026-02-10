'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useLenis } from 'lenis/react';
import { motion, MotionConfig } from 'framer-motion';
import MobileMenu from './MobileMenu';

export default function Header() {
  const navLinks = ['Home', 'About', 'Projects', 'Contact'];
  const [activeSection, setActiveSection] = useState('Home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const lenis = useLenis();

  useEffect(() => {
    const handleScroll = () => {
      const sections = navLinks.map(link => {
          const id = link.toLowerCase();
          return document.getElementById(id);
      });

      const scrollPosition = window.scrollY + 100; // Offset for header

      for (const section of sections) {
        if (section) {
          const { offsetTop, offsetHeight } = section;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section.id.charAt(0).toUpperCase() + section.id.slice(1));
            break;
          }
        }
      }
      
      // if (window.scrollY < 50) setActiveSection(''); // Removed to keep Home active
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    if (lenis) {
        lenis.scrollTo(targetId, { duration: 1.5, easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    } else {
        const element = document.querySelector(targetId);
        element?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
    <header className="fixed top-0 left-0 w-full z-50 px-6 md:px-12 py-6 flex justify-between items-center backdrop-blur-md bg-transparent/5 border-b border-white/5 transition-all duration-300">
      <div 
        className="text-xl font-bold tracking-tighter uppercase relative group cursor-pointer z-[110]" // Higher Z to stay above menu
        onClick={() => lenis?.scrollTo(0)}
      >
        V I B E D E V
        <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-blue-500 transition-all group-hover:w-full" />
      </div>
      
      {/* Desktop Nav */}
      <nav className="hidden md:block">
        <ul className="flex space-x-8">
          {navLinks.map((link) => {
            const isActive = activeSection === link;
            const targetId = `#${link.toLowerCase()}`;
            return (
              <li key={link} className="relative group overflow-hidden">
                <Link 
                    href={targetId}
                    onClick={(e) => handleNavClick(e, targetId)}
                    className={`text-sm font-medium transition-colors duration-300 ${isActive ? 'text-white' : 'text-white/60 hover:text-white'}`}
                >
                  {link}
                </Link>
                <span className={`absolute left-1/2 bottom-0 w-1 h-1 bg-blue-500 rounded-full transform -translate-x-1/2 transition-all duration-300 ${isActive ? 'opacity-100 mb-[-4px]' : 'opacity-0 translate-y-2'}`} />
                <span className={`absolute left-0 bottom-0 w-full h-[1px] bg-white transform -translate-x-full transition-transform duration-300 ease-out ${isActive ? 'translate-x-0 bg-blue-500' : 'group-hover:translate-x-0'}`} />
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Mobile Hamburger Button */}
      <MotionConfig transition={{ duration: 0.5, ease: "easeInOut" }}>
        <motion.button 
            initial={false}
            animate={isMobileMenuOpen ? "open" : "closed"}
            onClick={() => setIsMobileMenuOpen(pv => !pv)}
            className="relative h-10 w-10 rounded-full bg-white/10 hover:bg-white/20 transition-colors md:hidden z-[110] flex items-center justify-center p-2" // High Z
        >
            <motion.span 
                variants={{
                    open: { rotate: 45, y: 5 },
                    closed: { rotate: 0, y: 0 }
                }}
                className="absolute w-5 h-0.5 bg-white top-[35%]"
            />
            <motion.span 
                variants={{
                    open: { opacity: 0 },
                    closed: { opacity: 1 }
                }}
                className="absolute w-5 h-0.5 bg-white top-[50%]"
            />
            <motion.span 
                variants={{
                    open: { rotate: -45, y: -5 },
                    closed: { rotate: 0, y: 0 }
                }}
                className="absolute w-5 h-0.5 bg-white top-[65%]"
            />
        </motion.button>
      </MotionConfig>

    </header>

    {/* Mobile Menu Overlay */}
    <MobileMenu 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)} 
        links={navLinks} 
    />
    </>
  );
}
