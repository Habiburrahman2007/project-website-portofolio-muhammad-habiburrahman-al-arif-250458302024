'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Linkedin, Instagram, Phone, Send } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Background color transition
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top center',
        end: 'bottom center',
        onEnter: () => gsap.to('body', { backgroundColor: '#1a1a1a', duration: 1 }),
        onLeaveBack: () => gsap.to('body', { backgroundColor: '#0D0D0D', duration: 1 }), // Back to deep dark
      });

      // Title Animation
      gsap.fromTo(titleRef.current,
        { scale: 0.9, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 80%',
          }
        }
      );

      // Form Animation
      gsap.fromTo(formRef.current,
        { x: 50, opacity: 0 },
        {
            x: 0,
            opacity: 1,
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: formRef.current,
                start: 'top 80%'
            }
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Message sent! (Simulation)");
  };

  return (
    <section ref={sectionRef} id="contact" className="min-h-screen w-full flex flex-col items-center justify-center relative py-24 px-6 md:px-12">
      
      <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        
        {/* Left Col: Text & Socials */}
        <div className="flex flex-col items-start text-left space-y-12">
            <h2 
                ref={titleRef}
                className="text-5xl md:text-7xl font-bold tracking-tight bg-gradient-to-r from-gray-100 via-white to-gray-400 bg-[length:200%_auto] text-transparent bg-clip-text animate-gradient leading-[1.1]"
            >
                Let’s create something <br/> extraordinary.
            </h2>
            
            <div className="space-y-6">
                <p className="text-gray-400 text-lg max-w-md">
                    Ready to take your digital presence to the next level? Drop me a line and let's discuss your next big idea.
                </p>
                <div className="flex gap-6">
                    <a href="https://wa.link/zjo1b2" className="group p-3 border border-white/10 rounded-full hover:bg-white/5 hover:border-white/30 transition-all">
                        <Phone className="w-6 h-6 text-gray-400 group-hover:text-green-400" />
                    </a>
                    <a href="https://www.instagram.com/habib.site?igsh=MTZjejRodzUxNXgzeg==" target="_blank" rel="noopener noreferrer" className="group p-3 border border-white/10 rounded-full hover:bg-white/5 hover:border-white/30 transition-all">
                        <Instagram className="w-6 h-6 text-gray-400 group-hover:text-pink-400" />
                    </a>
                    <a href="https://www.linkedin.com/in/muhammad-habiburrahman-6aa02033a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" className="group p-3 border border-white/10 rounded-full hover:bg-white/5 hover:border-white/30 transition-all">
                        <Linkedin className="w-6 h-6 text-gray-400 group-hover:text-blue-400" />
                    </a>
                </div>
            </div>
        </div>

        {/* Right Col: Contact Form */}
        <form 
            ref={formRef} 
            onSubmit={handleSubmit}
            className="w-full bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl space-y-6 shadow-2xl"
        >
            <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400 ml-1">Name</label>
                <input 
                    type="text" 
                    placeholder="Your Name" 
                    className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-4 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500/50 focus:bg-black/40 transition-all"
                />
            </div>
            
            <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400 ml-1">Email</label>
                <input 
                    type="email" 
                    placeholder="name@example.com" 
                    className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-4 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500/50 focus:bg-black/40 transition-all"
                />
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400 ml-1">Message</label>
                <textarea 
                    rows={4}
                    placeholder="Tell me about your project..." 
                    className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-4 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500/50 focus:bg-black/40 transition-all resize-none"
                />
            </div>

            <button type="submit" className="w-full group">
                <div className="relative w-full bg-white text-black font-bold py-4 rounded-xl overflow-hidden transition-transform active:scale-95">
                    <span className="relative z-10 flex items-center justify-center gap-2 group-hover:gap-4 transition-all">
                        Send Message <Send size={18} />
                    </span>
                    <div className="absolute inset-0 bg-blue-500 transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-out" />
                    <div className="absolute inset-0 bg-blue-500 transform scale-x-0 origin-right group-hover:scale-x-0 transition-transform duration-500 ease-out z-0" />
                    <span className="absolute inset-0 flex items-center justify-center gap-4 text-white opacity-0 group-hover:opacity-100 z-20 transition-opacity delay-100">
                         Send Message <Send size={18} />
                    </span>
                </div>
            </button>
        </form>

      </div>

      <footer className="w-full text-center py-6 border-t border-white/5 mt-auto absolute bottom-0">
        <p className="text-xs md:text-sm text-gray-500 tracking-wider">
          © {new Date().getFullYear()} VIBEDEV. ALL RIGHTS RESERVED.
        </p>
      </footer>
    </section>
  );
}
