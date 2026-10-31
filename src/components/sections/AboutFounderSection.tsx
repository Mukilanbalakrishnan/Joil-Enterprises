import React from 'react';
import { Sparkles, Globe, Factory, ShieldCheck, Quote } from 'lucide-react';
import { FOUNDER_INFO } from '../../data/mockData';

export const AboutFounderSection: React.FC = () => {
  return (
    <section id="founder" className="py-24 sm:py-32 relative overflow-hidden bg-white">
      {/* Asymmetric Organic Wave on the Right - Echoes the Hero Wave with high-end editorial rhythm */}
      <div className="absolute top-0 right-0 w-full lg:w-[58%] h-full bg-[#FAF5EE] rounded-none lg:rounded-l-[140px] pointer-events-none -z-0" />
      
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-amber-200/25 rounded-full blur-3xl pointer-events-none -z-0" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl pointer-events-none -z-0" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* LEFT SIDE: CIRCULAR PORTAL WITH OVERLAPPING FLOATING CHIPS (5 cols) */}
          <div className="lg:col-span-5 flex justify-center relative">
            <div className="relative">
              
              {/* Outer Decorative Concentric Rings */}
              <div className="absolute inset-0 -m-4 sm:-m-6 rounded-full border-2 border-dashed border-amber-300/60 animate-spin-slow pointer-events-none" />
              <div className="absolute inset-0 -m-8 sm:-m-12 rounded-full border border-amber-200/40 pointer-events-none" />

              {/* Main Circular Portrait Portal (Matching Hero's circular portal aesthetic!) */}
              <div className="relative w-72 h-72 sm:w-84 sm:h-84 md:w-96 md:h-96 rounded-full overflow-hidden border-8 border-white shadow-[0_25px_60px_rgba(0,0,0,0.14)] bg-neutral-100 group">
                <img
                  src={FOUNDER_INFO.image}
                  alt={FOUNDER_INFO.name}
                  className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/60 via-transparent to-transparent" />
              </div>

              {/* Floating Pill Chip: Top Left */}
              <div className="absolute -top-3 -left-4 sm:-left-8 bg-white/95 backdrop-blur-md border border-neutral-200/90 rounded-full px-4 py-2 shadow-[0_10px_25px_rgba(0,0,0,0.1)] flex items-center gap-2 text-xs font-black text-neutral-900 animate-float">
                <Globe className="w-4 h-4 text-amber-600" />
                <span>Yiwu & Shenzhen Sourcing</span>
              </div>

              {/* Floating Pill Chip: Top Right */}
              <div className="absolute top-8 -right-4 sm:-right-8 bg-white/95 backdrop-blur-md border border-neutral-200/90 rounded-full px-4 py-2 shadow-[0_10px_25px_rgba(0,0,0,0.1)] flex items-center gap-2 text-xs font-black text-neutral-900 animate-float-delayed">
                <Factory className="w-4 h-4 text-emerald-600" />
                <span>OEM Factory Contracts</span>
              </div>

              {/* Overlapping Glass Badge at Bottom Center */}
              <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 w-[90%] sm:w-auto min-w-[280px] bg-white/95 backdrop-blur-xl border border-neutral-200/90 rounded-2xl p-3.5 shadow-[0_12px_30px_rgba(0,0,0,0.12)] flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-600 to-amber-400 text-white flex items-center justify-center font-black text-sm shadow-xs shrink-0 font-['Outfit']">
                    MJ
                  </div>
                  <div>
                    <h4 className="font-black text-sm text-neutral-950 leading-tight font-['Outfit']">
                      {FOUNDER_INFO.name}
                    </h4>
                    <span className="text-[11px] text-amber-700 font-bold block">
                      Direct Sourcing Director
                    </span>
                  </div>
                </div>

                <div className="text-right border-l border-neutral-100 pl-3">
                  <span className="text-[10px] uppercase font-bold text-neutral-400 block tracking-wider">
                    Experience
                  </span>
                  <span className="text-xs font-black text-neutral-950 font-mono">
                    10+ Years
                  </span>
                </div>
              </div>

            </div>
          </div>

          {/* RIGHT SIDE: EDITORIAL SOURCING VISION & SIGNATURE (7 cols) */}
          <div className="lg:col-span-7 space-y-6 pt-6 lg:pt-0">
            
            {/* Eyebrow Pill */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-neutral-200/90 shadow-2xs text-xs font-black uppercase tracking-wider text-amber-800 font-['Outfit']">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Sourcing Leadership Vision</span>
            </div>

            {/* Giant Stylized Quotation */}
            <div className="space-y-3 relative">
              <Quote className="w-12 h-12 text-amber-500/25 -mb-4 -ml-2" />
              <blockquote className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-neutral-950 font-['Outfit'] leading-[1.2]">
                “We eliminate 4 layers of domestic brokers so neighborhood shopkeepers can source at China’s <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-amber-500">genuine factory floor prices.</span>”
              </blockquote>
            </div>

            {/* Short 2-Line Note - Clean and to the point */}
            <p className="text-sm sm:text-base text-neutral-600 leading-relaxed font-normal max-w-xl">
              Connecting Indian stationery stores, gift boutiques, and retail counters directly with inspected OEM lines in Yiwu and Shenzhen. Zero broker commissions, guaranteed carton quality, and 24-hour road transport dispatch from Chennai.
            </p>

            {/* Modern Milestone Stat Pills Bar */}
            <div className="pt-2 grid grid-cols-3 gap-3 max-w-lg">
              <div className="bg-white border border-neutral-200/80 rounded-2xl p-3.5 shadow-2xs text-center">
                <span className="text-xl sm:text-2xl font-black text-neutral-950 font-mono block">
                  10+ Yrs
                </span>
                <span className="text-[11px] text-neutral-500 font-semibold block mt-0.5">
                  Import Experience
                </span>
              </div>

              <div className="bg-white border border-neutral-200/80 rounded-2xl p-3.5 shadow-2xs text-center">
                <span className="text-xl sm:text-2xl font-black text-amber-600 font-mono block">
                  1,200+
                </span>
                <span className="text-[11px] text-neutral-500 font-semibold block mt-0.5">
                  Retail Shops Supplied
                </span>
              </div>

              <div className="bg-white border border-neutral-200/80 rounded-2xl p-3.5 shadow-2xs text-center">
                <span className="text-xl sm:text-2xl font-black text-emerald-600 font-mono block">
                  24h
                </span>
                <span className="text-[11px] text-neutral-500 font-semibold block mt-0.5">
                  Godown Dispatch
                </span>
              </div>
            </div>

            {/* Founder Verification Signature Strip */}
            <div className="pt-4 border-t border-neutral-200/80 flex items-center justify-between gap-4 max-w-lg">
              <div className="flex items-center gap-2 text-xs text-neutral-500 font-medium">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Direct Container Port Clearance • Pan-India Logistics</span>
              </div>

              {/* Stylized Digital Signature */}
              <div className="text-right">
                <span className="font-serif italic font-black text-xl text-neutral-900 tracking-wide select-none">
                  M. Joli
                </span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
