import React from 'react';
import { Package, ShieldCheck, Truck, TrendingUp, Sparkles, Factory } from 'lucide-react';
import { COMPANY_INFO } from '../../data/companyData';

export const AboutCompanySection: React.FC = () => {
  return (
    <section id="about" className="py-24 sm:py-32 bg-white relative overflow-hidden">
      {/* Background ambient lighting - no outer card container */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 -translate-x-1/2 w-[550px] h-[550px] bg-gradient-to-tr from-amber-100/60 to-purple-100/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-amber-50/80 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* LEFT SIDE: ULTRA-MODERN ICONIC LOGO SHOWCASE (5 cols) */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center text-center relative">
            
            {/* Ambient circular glow behind logo */}
            <div className="absolute w-72 h-72 rounded-full bg-gradient-to-tr from-amber-400/20 via-purple-400/10 to-amber-200/30 blur-2xl pointer-events-none animate-pulse" />

            {/* Main Emblem Display */}
            <div className="relative group">
              {/* Outer decorative ring */}
              <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-full p-2.5 bg-gradient-to-br from-amber-400/40 via-white to-amber-500/30 shadow-[0_20px_50px_rgba(217,119,6,0.15)] flex items-center justify-center transition-all duration-500 group-hover:scale-105">
                
                {/* Inner Medallion */}
                <div className="w-full h-full rounded-full bg-gradient-to-br from-amber-500 via-amber-600 to-amber-700 flex flex-col items-center justify-center text-white shadow-inner relative overflow-hidden">
                  
                  {/* Subtle reflex shine */}
                  <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/20 rounded-full blur-xl pointer-events-none" />
                  
                  {/* Big 3D Package Logo Icon */}
                  <Package className="w-20 h-20 sm:w-24 sm:h-24 text-white stroke-[1.8] drop-shadow-[0_8px_16px_rgba(0,0,0,0.25)] transition-transform duration-500 group-hover:scale-110" />
                  
                  <span className="text-[10px] tracking-[0.25em] font-black uppercase text-amber-200 mt-1 drop-shadow-xs">
                    DIRECT IMPORT
                  </span>
                </div>
              </div>

              {/* Floating Pill Chip 1: Top Right */}
              <div className="absolute -top-2 -right-4 sm:-right-6 bg-white/95 backdrop-blur-md border border-neutral-200/90 rounded-full px-3.5 py-1.5 shadow-[0_8px_20px_rgba(0,0,0,0.08)] flex items-center gap-1.5 text-[11px] font-extrabold text-neutral-900 animate-float">
                <Factory className="w-3.5 h-3.5 text-amber-600" />
                <span>Yiwu & Ningbo OEM</span>
              </div>

              {/* Floating Pill Chip 2: Bottom Left */}
              <div className="absolute -bottom-2 -left-4 sm:-left-6 bg-white/95 backdrop-blur-md border border-neutral-200/90 rounded-full px-3.5 py-1.5 shadow-[0_8px_20px_rgba(0,0,0,0.08)] flex items-center gap-1.5 text-[11px] font-extrabold text-neutral-900 animate-float-delayed">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                <span>Chennai Godown</span>
              </div>
            </div>

            {/* Typography Wordmark below Logo */}
            <div className="mt-8 space-y-1.5">
              <div className="flex items-center justify-center gap-2 leading-none">
                <span className="font-black tracking-wider text-3xl sm:text-4xl text-neutral-950 uppercase font-['Outfit']">
                  Joli
                </span>
                <span className="font-extrabold tracking-wider text-2xl sm:text-3xl text-amber-600 uppercase font-['Outfit']">
                  Enterprises
                </span>
              </div>
              <p className="text-xs uppercase tracking-[0.28em] text-neutral-400 font-extrabold">
                Direct China Wholesale Importers
              </p>

              <div className="pt-2 flex items-center justify-center gap-2 text-xs text-neutral-500 font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-300"></span>
                <span>Est. {COMPANY_INFO.establishedYear}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-300"></span>
                <span>Chennai, India</span>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: ABOUT THE COMPANY (7 cols) - CLEAN, UNCLUTTERED, 4-5 LINES */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Eyebrow Pill */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-50 border border-amber-200/80 shadow-2xs text-xs font-black uppercase tracking-wider text-amber-800 font-['Outfit']">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>About Joli Enterprises</span>
            </div>

            {/* High-Impact Headline */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-neutral-950 font-['Outfit'] leading-[1.12]">
              Connecting local Indian retail shops <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600">
                with China’s factory floor.
              </span>
            </h2>

            {/* Exactly 4 to 5 lines of focused copy */}
            <p className="text-base sm:text-lg text-neutral-600 leading-relaxed font-normal max-w-2xl">
              Direct B2B wholesale importer and nationwide bulk distributor of trending lifestyle goods, stainless steel insulated bottles, aesthetic stationery, and viral novelty items. We bridge the gap between overseas manufacturing lines in Yiwu and Shenzhen and neighborhood retail counters across India, managing full container customs clearance and palletized warehouse storage in Chennai for fast, reliable 24-hour dispatch to your town.
            </p>

            {/* Modern Floating Trust Pills */}
            <div className="pt-2 flex flex-wrap gap-2.5 sm:gap-3">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FAF5EE] border border-neutral-200/80 text-xs font-bold text-neutral-800 shadow-2xs hover:border-amber-300 transition-colors">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Zero Middleman Markup</span>
              </div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FAF5EE] border border-neutral-200/80 text-xs font-bold text-neutral-800 shadow-2xs hover:border-amber-300 transition-colors">
                <TrendingUp className="w-4 h-4 text-amber-600" />
                <span>Lowest 1-Carton MOQ</span>
              </div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FAF5EE] border border-neutral-200/80 text-xs font-bold text-neutral-800 shadow-2xs hover:border-amber-300 transition-colors">
                <Truck className="w-4 h-4 text-purple-600" />
                <span>24h Pan-India Transport</span>
              </div>
            </div>

            {/* Clean Floating Metrics Row */}
            <div className="pt-4 border-t border-neutral-100 grid grid-cols-3 gap-4 max-w-lg">
              <div>
                <span className="text-2xl sm:text-3xl font-black text-neutral-950 font-mono block">
                  10+ Yrs
                </span>
                <span className="text-xs text-neutral-500 font-medium block mt-0.5">
                  Direct Import Roots
                </span>
              </div>
              <div>
                <span className="text-2xl sm:text-3xl font-black text-amber-600 font-mono block">
                  1,200+
                </span>
                <span className="text-xs text-neutral-500 font-medium block mt-0.5">
                  Active Retail Stores
                </span>
              </div>
              <div>
                <span className="text-2xl sm:text-3xl font-black text-emerald-600 font-mono block">
                  200k+
                </span>
                <span className="text-xs text-neutral-500 font-medium block mt-0.5">
                  Ready Godown Stock
                </span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
