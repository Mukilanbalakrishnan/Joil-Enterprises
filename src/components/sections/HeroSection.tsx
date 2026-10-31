import React, { useState, useEffect } from 'react';
import { ArrowRight, Package, FileSpreadsheet, TrendingUp } from 'lucide-react';
import { HERO_WHOLESALE_VARIANTS } from '../../data/mockData';

interface HeroSectionProps {
  onExploreClick: () => void;
  onEnquireClick: (subject?: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreClick,
  onEnquireClick,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const activeVariant = HERO_WHOLESALE_VARIANTS[activeIndex];

  // Automatic slide rotation every 4.5 seconds
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % HERO_WHOLESALE_VARIANTS.length);
    }, 4500);

    return () => clearInterval(timer);
  }, [isPaused]);

  return (
    <section
      id="hero"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative min-h-[96vh] flex items-center bg-[#FAF5EE] overflow-hidden pt-24 pb-16 lg:pt-28 lg:pb-16"
    >
      {/* Broad organic fluid wave SVG extending generously to the right on desktop */}
      <div className="absolute inset-0 pointer-events-none hidden lg:block overflow-hidden">
        <svg
          className="absolute inset-y-0 left-0 h-full w-[72%] max-w-[1180px]"
          viewBox="0 0 850 800"
          preserveAspectRatio="none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Extended organic wave matching the user's marked area */}
          <path
            d="M0,0 L680,0 C770,70 820,220 720,380 C640,490 630,550 700,660 C760,750 710,800 600,800 L0,800 Z"
            fill={activeVariant.color}
            className="transition-colors duration-700 ease-in-out"
          />
          {/* Subtle secondary ambient inner contour for tactile depth */}
          <path
            d="M0,0 L640,0 C730,80 770,230 680,390 C600,500 590,560 660,670 C710,750 670,800 560,800 L0,800 Z"
            fill="black"
            fillOpacity="0.04"
          />
        </svg>
      </div>

      {/* Warm ambient depth glow on the right side */}
      <div className="absolute -bottom-24 -right-24 w-[460px] h-[460px] rounded-full bg-[#FCE8D2]/80 blur-3xl pointer-events-none" />
      <div className="absolute top-16 right-[12%] w-72 h-72 rounded-full bg-[#FFF0DB]/70 blur-2xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* LEFT COLUMN: Clean, Elegant & Uncluttered Typography (7 cols) */}
          <div className="lg:col-span-7 xl:col-span-7 z-10">
            <div
              className="p-6 sm:p-10 lg:p-0 rounded-3xl lg:rounded-none lg:!bg-transparent shadow-xl lg:shadow-none transition-colors duration-500"
              style={{
                backgroundColor: activeVariant.color,
              }}
            >
              <div className="space-y-6 sm:space-y-7 text-white max-w-lg xl:max-w-xl">
                
                {/* Wholesale Trust Eyebrow & Slide Indicators */}
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-xs text-white text-xs font-bold tracking-wider uppercase shadow-xs">
                      <Package className="w-3.5 h-3.5 text-amber-300" />
                      <span>Direct China Import</span>
                    </div>
                    <span className="inline-flex items-center gap-1 text-[11px] uppercase font-extrabold tracking-wider px-2.5 py-1 rounded-full bg-neutral-950/40 text-amber-200">
                      <TrendingUp className="w-3 h-3" /> {activeVariant.retailerMargin}
                    </span>
                  </div>

                  {/* Auto-Slide Carousel Indicator Dots */}
                  <div className="flex items-center gap-1.5 bg-black/25 backdrop-blur-xs px-2.5 py-1 rounded-full">
                    {HERO_WHOLESALE_VARIANTS.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveIndex(idx)}
                        className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                          idx === activeIndex
                            ? 'w-6 bg-white'
                            : 'w-1.5 bg-white/40 hover:bg-white/70'
                        }`}
                        aria-label={`Jump to slide ${idx + 1}`}
                      />
                    ))}
                  </div>
                </div>

                {/* Master Headline: Easy-to-read, clean, and attractive typography */}
                <div key={activeVariant.id} className="space-y-1.5 animate-fade-in">
                  <span className="text-xs uppercase font-extrabold tracking-[0.24em] text-white/80 block">
                    Wholesale Bulk Supply • Master Cartons
                  </span>
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black tracking-tight text-white leading-[1.08] drop-shadow-xs">
                    {activeVariant.subname}
                  </h1>
                </div>

                {/* Short Clean Wholesale Description */}
                <p key={`desc-${activeVariant.id}`} className="text-sm sm:text-base text-white/95 leading-relaxed font-normal animate-fade-in max-w-lg">
                  {activeVariant.description}
                </p>

                {/* Call-to-action B2B Buttons */}
                <div className="pt-2 flex flex-wrap items-center gap-3.5">
                  <button
                    onClick={() => onEnquireClick(`Wholesale Price List: ${activeVariant.subname}`)}
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-neutral-950 text-white font-bold text-xs uppercase tracking-wider hover:bg-neutral-800 transition-all shadow-md hover:scale-105 active:scale-95 cursor-pointer"
                  >
                    <FileSpreadsheet className="w-4 h-4 text-amber-400" />
                    <span>Get Wholesale Price List</span>
                  </button>

                  <button
                    onClick={onExploreClick}
                    className="inline-flex items-center gap-1.5 px-5 py-3.5 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-xs text-white font-bold text-xs uppercase tracking-wider transition-all border border-white/40 cursor-pointer"
                  >
                    <span>Browse Catalogue</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Circular Showcase Podium & 3D Floating Products (5 cols) */}
          <div className="lg:col-span-5 xl:col-span-5 relative flex items-center justify-center py-6 lg:py-0">
            
            {/* Centerpiece Container with Floating Elements */}
            <div className="relative w-full max-w-[500px] aspect-square flex items-center justify-center">
              
              {/* Overhead Circular Product Showcase with Realistic Rim & Deep Shadow */}
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-[420px] lg:h-[420px] rounded-full overflow-hidden border-8 sm:border-12 border-white/95 shadow-[0_28px_55px_-10px_rgba(0,0,0,0.24)] ring-1 ring-neutral-200 z-10 transition-transform duration-500 hover:scale-[1.02]">
                <img
                  src={activeVariant.mainImage}
                  alt={`${activeVariant.subname} wholesale showcase`}
                  className="w-full h-full object-cover object-center animate-fade-in"
                  key={activeVariant.id}
                />
                <div className="absolute inset-0 rounded-full shadow-[inset_0_12px_24px_rgba(0,0,0,0.14)] pointer-events-none" />
              </div>

              {/* Realistic 3D Floating Elements with gentle physics animations */}
              
              {/* Floating Element 1: Top Right */}
              {activeVariant.floatingElements[0] && (
                <div
                  key={`elem0-${activeVariant.id}`}
                  className={`absolute ${activeVariant.floatingElements[0].className} z-20 pointer-events-none animate-float-slow animate-fade-in`}
                  style={{ filter: activeVariant.floatingElements[0].shadowStyle }}
                >
                  <img
                    src={activeVariant.floatingElements[0].image}
                    alt={activeVariant.floatingElements[0].name}
                    className="w-full h-full object-cover rounded-2xl border-2 border-white/80"
                  />
                </div>
              )}

              {/* Floating Element 2: Mid-Left */}
              {activeVariant.floatingElements[1] && (
                <div
                  key={`elem1-${activeVariant.id}`}
                  className={`absolute ${activeVariant.floatingElements[1].className} z-20 pointer-events-none animate-float-reverse animate-fade-in`}
                  style={{ filter: activeVariant.floatingElements[1].shadowStyle }}
                >
                  <img
                    src={activeVariant.floatingElements[1].image}
                    alt={activeVariant.floatingElements[1].name}
                    className="w-full h-full object-cover rounded-full border-2 border-white/80"
                  />
                </div>
              )}

              {/* Floating Element 3: Bottom Left (if present) */}
              {activeVariant.floatingElements[2] && (
                <div
                  key={`elem2-${activeVariant.id}`}
                  className={`absolute ${activeVariant.floatingElements[2].className} z-20 pointer-events-none animate-float-slight animate-fade-in`}
                  style={{ filter: activeVariant.floatingElements[2].shadowStyle }}
                >
                  <img
                    src={activeVariant.floatingElements[2].image}
                    alt={activeVariant.floatingElements[2].name}
                    className="w-full h-full object-cover rounded-2xl border-2 border-white/70"
                  />
                </div>
              )}

              {/* Floating B2B Assurance Pill */}
              <div className="absolute bottom-2 right-4 sm:right-6 z-30 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-full border border-neutral-200 shadow-lg text-xs font-bold text-neutral-900 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>GST Invoicing • Ready Stock in Godown</span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
