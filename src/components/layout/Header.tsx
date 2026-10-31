import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Package, ShoppingBag } from 'lucide-react';
import { useStore } from '../../context/useStore';

export const Header: React.FC = () => {
  const { cartItemCount, openCart } = useStore();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sectionIds = [
        'hero',
        'about',
        'founder',
        'categories',
        'products',
        'testimonials',
        'contact',
      ];

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 160 && rect.bottom >= 160) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => setIsMobileMenuOpen(false);

  const scrollToSection = (id: string) => {
    closeMenu();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Exactly the 7 navigation links requested by the user
  const navLinks = [
    { label: 'Home', id: 'hero' },
    { label: 'About', id: 'about' },
    { label: 'Founder', id: 'founder' },
    { label: 'Category', id: 'categories' },
    { label: 'Products', id: 'products' },
    { label: 'Reviews', id: 'testimonials' },
    { label: 'Contact', id: 'contact' },
  ];

  return (
    <header className="fixed top-3 sm:top-5 left-0 right-0 z-50 flex justify-center px-3 sm:px-6 pointer-events-none transition-all duration-300">
      {/* Floating Pill Container */}
      <div
        className={`pointer-events-auto max-w-5xl w-full rounded-full transition-all duration-300 flex items-center justify-between px-3.5 sm:px-5 py-2 sm:py-2.5 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-xl border border-neutral-200/90 shadow-[0_12px_35px_rgba(0,0,0,0.12)]'
            : 'bg-white/90 backdrop-blur-md border border-neutral-200/80 shadow-[0_8px_30px_rgba(0,0,0,0.07)]'
        }`}
      >
        {/* Brand Logo & Wordmark Pill */}
        <button
          onClick={() => scrollToSection('hero')}
          className="group flex items-center gap-2 sm:gap-2.5 focus:outline-hidden text-left cursor-pointer shrink-0"
          aria-label="Joli Enterprises Home"
        >
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-tr from-amber-600 to-amber-400 flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform">
            <Package className="w-4 h-4 text-white" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1 leading-none">
              <span className="font-extrabold tracking-wider text-sm sm:text-base text-neutral-950 uppercase">
                Joli
              </span>
              <span className="font-bold tracking-wider text-[11px] sm:text-xs text-amber-600 uppercase">
                Enterprises
              </span>
            </div>
            <span className="text-[8px] sm:text-[9px] tracking-widest text-neutral-400 uppercase font-bold mt-0.5 hidden xs:inline-block">
              B2B Wholesale
            </span>
          </div>
        </button>

        {/* Center Pill Navigation Links (Desktop) */}
        <nav
          className="hidden lg:flex items-center gap-1 bg-neutral-100/80 p-1 rounded-full border border-neutral-200/50"
          aria-label="Main Navigation"
        >
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-neutral-950 text-white shadow-xs font-bold'
                    : 'text-neutral-600 hover:text-neutral-950 hover:bg-white/70'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Right Side: Cart Pill, Enquiry Pill Button & Mobile Toggle */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Cart Trigger Pill */}
          <button
            onClick={openCart}
            className="relative px-3 py-2 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-900 transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs group"
            aria-label={`Wholesale cart with ${cartItemCount} items`}
          >
            <ShoppingBag className="w-4 h-4 text-neutral-800 group-hover:scale-105 transition-transform" />
            <span className="text-xs font-bold font-mono">
              {cartItemCount}
            </span>
          </button>

          {/* Enquiry Button CTA */}
          <button
            onClick={() => scrollToSection('contact')}
            className="px-4 sm:px-5 py-2 rounded-full bg-neutral-950 hover:bg-neutral-800 text-white text-xs font-bold uppercase tracking-wider transition-all shadow-xs hover:shadow-md hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-1.5"
          >
            <span>Enquiry</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-amber-400" />
          </button>

          {/* Mobile Menu Hamburger Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-neutral-700 hover:text-neutral-950 hover:bg-neutral-100 rounded-full transition-colors cursor-pointer lg:hidden"
            aria-label={isMobileMenuOpen ? 'Close navigation' : 'Open navigation'}
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Floating Dropdown Menu */}
      {isMobileMenuOpen && (
        <div className="pointer-events-auto absolute top-full left-3 right-3 sm:left-6 sm:right-6 mt-2 max-w-md mx-auto bg-white/95 backdrop-blur-xl border border-neutral-200 rounded-3xl p-3 shadow-2xl animate-fade-in lg:hidden">
          <div className="p-2.5 bg-amber-50 rounded-2xl mb-2 flex items-center justify-between">
            <span className="text-xs font-bold text-amber-900 uppercase tracking-wider">
              Wholesale Navigation
            </span>
            <span className="text-[10px] bg-amber-200/60 text-amber-900 font-bold px-2 py-0.5 rounded-full">
              B2B
            </span>
          </div>

          <nav className="flex flex-col space-y-1" aria-label="Mobile Navigation">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className={`text-left text-xs font-bold tracking-wider uppercase py-2.5 px-3.5 rounded-xl transition-all cursor-pointer ${
                  activeSection === link.id
                    ? 'bg-neutral-950 text-white'
                    : 'text-neutral-700 hover:bg-neutral-100 hover:text-neutral-950'
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          <div className="pt-2 mt-2 border-t border-neutral-100 space-y-2">
            <button
              onClick={() => {
                closeMenu();
                openCart();
              }}
              className="w-full py-2.5 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-900 text-xs font-bold uppercase tracking-wider text-center transition-all flex items-center justify-center gap-2"
            >
              <ShoppingBag className="w-4 h-4 text-amber-600" />
              <span>Wholesale Cart ({cartItemCount})</span>
            </button>

            <button
              onClick={() => scrollToSection('contact')}
              className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold uppercase tracking-wider text-center transition-all shadow-xs"
            >
              Send Enquiry Now
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
