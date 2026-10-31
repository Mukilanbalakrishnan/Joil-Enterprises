import React, { useState } from 'react';
import { ArrowRight, Check, Sparkles, TrendingUp, ShieldCheck } from 'lucide-react';
import { OWN_PRODUCT } from '../../data/mockData';

interface OurOwnProductSectionProps {
  onEnquireClick: (productName: string) => void;
}

export const OurOwnProductSection: React.FC<OurOwnProductSectionProps> = ({ onEnquireClick }) => {
  const [activeTab, setActiveTab] = useState<'specs' | 'highlights'>('specs');

  return (
    <section id="own-product" className="py-24 bg-[#FAF5EE] relative overflow-hidden">
      {/* Ambient background depth glow */}
      <div className="absolute -bottom-24 -left-24 w-[460px] h-[460px] rounded-full bg-amber-200/35 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        {/* Flagship Eyebrow Banner */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-neutral-200/80">
          <div className="inline-flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-full bg-amber-500 text-white flex items-center justify-center shadow-xs">
              <Sparkles className="w-4 h-4 fill-white" />
            </span>
            <span className="text-xs uppercase font-extrabold tracking-[0.2em] text-amber-800">
              #1 Fast-Moving Wholesale Bestseller
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3.5 py-1.5 rounded-full bg-amber-500 text-white text-xs font-black uppercase tracking-wider flex items-center gap-1 shadow-xs">
              <TrendingUp className="w-3.5 h-3.5" /> 65% Retailer Margin
            </span>
            <span className="px-3.5 py-1.5 rounded-full bg-white border border-neutral-200 text-neutral-800 text-xs font-bold uppercase tracking-wider shadow-2xs">
              MOQ: 1 Carton (36 Pcs)
            </span>
          </div>
        </div>

        {/* Feature Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Visual Showcase (7 cols) with rounded-3xl container */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative aspect-[16/10] bg-neutral-100 border border-neutral-200/90 rounded-3xl overflow-hidden shadow-xl group">
              <img
                src={OWN_PRODUCT.images[0]}
                alt={OWN_PRODUCT.name}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              />
              <div className="absolute top-4 left-4 bg-neutral-950/85 backdrop-blur-md text-white text-xs font-mono px-3.5 py-1 rounded-full uppercase tracking-widest font-bold shadow-md">
                SKU: {OWN_PRODUCT.sku}
              </div>

              {/* Thermal Insulation Seal */}
              <div className="absolute bottom-5 right-5 bg-white/95 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-neutral-200/90 shadow-xl text-right">
                <div className="text-[10px] uppercase font-bold tracking-wider text-neutral-400">
                  Thermal Retention Test
                </div>
                <div className="text-3xl font-black text-neutral-950">24h Cold</div>
                <div className="text-xs text-emerald-700 font-extrabold">12h Hot • Zero Condensation</div>
              </div>
            </div>

            {/* In-Stock Dispatch Statement */}
            <div className="p-4 bg-white border border-neutral-200/80 rounded-2xl text-xs text-neutral-700 flex items-center justify-between shadow-xs">
              <span className="flex items-center gap-2 font-medium">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                Individually boxed in retail display cartons. Ready stock in Chennai warehouse.
              </span>
              <span className="font-extrabold text-neutral-950 hidden sm:inline text-xs">24h Road Transport</span>
            </div>
          </div>

          {/* Core Product Information (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-extrabold uppercase tracking-[0.22em] text-amber-700">
                Direct China Wholesale Import
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-neutral-950 leading-[1.1]">
                {OWN_PRODUCT.name}
              </h2>
              <p className="text-sm sm:text-base text-neutral-600 leading-relaxed font-normal pt-1">
                {OWN_PRODUCT.fullDescription}
              </p>
            </div>

            {/* Toggle Tabs (Carton Specs / Retailer Margins) - Rounded Pills */}
            <div className="flex bg-neutral-200/60 p-1.5 rounded-full text-xs font-bold uppercase tracking-wider max-w-sm">
              <button
                onClick={() => setActiveTab('specs')}
                className={`flex-1 py-2 px-3 rounded-full transition-all cursor-pointer text-center ${
                  activeTab === 'specs'
                    ? 'bg-neutral-950 text-white shadow-xs'
                    : 'text-neutral-600 hover:text-neutral-950'
                }`}
              >
                Carton Specs
              </button>
              <button
                onClick={() => setActiveTab('highlights')}
                className={`flex-1 py-2 px-3 rounded-full transition-all cursor-pointer text-center ${
                  activeTab === 'highlights'
                    ? 'bg-neutral-950 text-white shadow-xs'
                    : 'text-neutral-600 hover:text-neutral-950'
                }`}
              >
                Profit Benefits
              </button>
            </div>

            {/* Tab 1: Specs Table */}
            {activeTab === 'specs' && (
              <div className="space-y-2 pt-1 animate-fade-in">
                {OWN_PRODUCT.specifications.map((spec, idx) => (
                  <div
                    key={idx}
                    className="flex items-baseline justify-between py-2 border-b border-neutral-200/80 text-xs"
                  >
                    <span className="text-neutral-500 font-semibold">{spec.label}</span>
                    <span className="text-neutral-950 font-bold text-right max-w-[62%]">
                      {spec.value}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Tab 2: Retailer Profit Highlights */}
            {activeTab === 'highlights' && (
              <div className="space-y-3 pt-1 animate-fade-in text-xs text-neutral-700">
                <div className="flex items-start gap-2.5 p-2 rounded-xl bg-white/80">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </span>
                  <span>
                    <strong>65% Gross Profit Margin:</strong> Purchase at factory rates and sell at competitive market retail MRP to double your capital.
                  </span>
                </div>
                <div className="flex items-start gap-2.5 p-2 rounded-xl bg-white/80">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </span>
                  <span>
                    <strong>Zero Breakage or Leakage:</strong> Double-wall food-grade AISI 304 steel with precision silicone vacuum seal and rugged matte finish.
                  </span>
                </div>
                <div className="flex items-start gap-2.5 p-2 rounded-xl bg-white/80">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </span>
                  <span>
                    <strong>Assorted Color Mix:</strong> Every 36-piece carton contains an attractive mix of 6 colors (Matte Black, Pearl White, Pastel Mint, Lavender, Peach, Navy).
                  </span>
                </div>
                <div className="flex items-start gap-2.5 p-2 rounded-xl bg-white/80">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </span>
                  <span>
                    <strong>Full GST Input Credit:</strong> Tax invoice issued with every shipment, allowing seamless 18% GST input credit claim.
                  </span>
                </div>
              </div>
            )}

            {/* Action Bar */}
            <div className="pt-4">
              <button
                onClick={() => onEnquireClick(`Carton Order: ${OWN_PRODUCT.name}`)}
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-neutral-950 hover:bg-neutral-800 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-lg hover:scale-105 active:scale-95 cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Inquire Master Carton Lot</span>
                <ArrowRight className="w-4 h-4 text-amber-400" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
