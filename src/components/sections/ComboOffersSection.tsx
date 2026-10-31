import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, TrendingUp, Percent, ShoppingBag } from 'lucide-react';
import { COMBO_OFFERS } from '../../data/mockData';
import { useStore } from '../../context/useStore';

interface ComboOffersSectionProps {
  onSelectOffer?: (offerTitle: string) => void;
}

export const ComboOffersSection: React.FC<ComboOffersSectionProps> = () => {
  const { addToCart, openCart } = useStore();

  const handleQuickAdd = (e: React.MouseEvent, offer: typeof COMBO_OFFERS[0]) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      type: 'combo',
      referenceId: offer.id,
      name: offer.title,
      price: offer.comboPrice,
      quantity: 1,
      image: offer.image,
      badge: offer.badge,
      totalPieces: offer.totalPieces,
    });
    openCart();
  };

  return (
    <section id="offers" className="py-20 bg-[#FAF5EE] relative overflow-hidden">
      {/* Ambient background depth blobs */}
      <div className="absolute top-0 right-0 w-[420px] h-[420px] rounded-full bg-amber-200/25 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[360px] h-[360px] rounded-full bg-purple-200/20 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-neutral-200/80">
          <div className="space-y-2.5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-xs font-extrabold uppercase tracking-wider text-amber-800">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Tested Retail Bestseller Packs</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-neutral-950 font-['Outfit'] leading-[1.1]">
              Wholesale Carton <br />
              <span className="text-amber-600">Starter Bundles</span>
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-neutral-600 max-w-md leading-relaxed font-normal">
            Low-risk starter cartons combining trending vacuum bottles, aesthetic stationery, and viral lifestyle impulse items. Click any pack to view included products, discounts, and order options.
          </p>
        </div>

        {/* Small Modern Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {COMBO_OFFERS.map((offer) => {
            const isPopular = offer.popular;
            return (
              <Link
                key={offer.id}
                to={`/combos/${offer.id}`}
                className={`group relative bg-white rounded-3xl p-4 border transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 hover:shadow-xl cursor-pointer ${
                  isPopular
                    ? 'border-amber-400 ring-2 ring-amber-400/25 shadow-md'
                    : 'border-neutral-200/80 hover:border-amber-300 shadow-xs'
                }`}
              >
                {/* Popular Badge */}
                {isPopular && (
                  <div className="absolute -top-3 left-6 z-20">
                    <span className="px-3 py-1 rounded-full bg-neutral-950 text-white text-[10px] font-black uppercase tracking-wider shadow-md flex items-center gap-1">
                      <TrendingUp className="w-3 h-3 text-amber-400" />
                      <span>Retailer #1 Choice</span>
                    </span>
                  </div>
                )}

                <div>
                  {/* Compact Image Container */}
                  <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-neutral-100 shadow-inner">
                    <img
                      src={offer.image}
                      alt={offer.title}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/70 via-neutral-950/20 to-transparent" />
                    
                    {/* Top Right Discount Badge */}
                    <div className="absolute top-3 right-3">
                      <span className="bg-emerald-600 text-white text-[10px] font-black tracking-wider uppercase px-2.5 py-1 rounded-full font-mono shadow-xs flex items-center gap-1">
                        <Percent className="w-3 h-3" /> Save {offer.discountPercentage}%
                      </span>
                    </div>

                    {/* Bottom Info on Image */}
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
                      <span className="text-[10px] uppercase font-bold tracking-widest text-amber-300">
                        {offer.badge}
                      </span>
                      <span className="text-[11px] font-extrabold bg-black/60 backdrop-blur-md px-2.5 py-0.5 rounded-full">
                        {offer.totalPieces} Pcs
                      </span>
                    </div>
                  </div>

                  {/* Content Area */}
                  <div className="p-2 sm:p-3 pt-4 space-y-3">
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-[11px] text-neutral-400 font-mono">
                        <span>{offer.tier}</span>
                        <span className="text-amber-700 font-bold font-sans">{offer.includedProducts.length} Products</span>
                      </div>
                      <h3 className="text-base font-extrabold text-neutral-950 leading-snug group-hover:text-amber-700 transition-colors font-['Outfit']">
                        {offer.title}
                      </h3>
                      <p className="text-xs text-neutral-500 leading-relaxed font-normal line-clamp-2">
                        {offer.tagline}
                      </p>
                    </div>

                    {/* Compact Included Items Preview Pills */}
                    <div className="pt-2 border-t border-neutral-100 flex flex-wrap gap-1.5">
                      {offer.includedProducts.slice(0, 3).map((prod, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] bg-[#FAF5EE] text-neutral-700 font-medium px-2.5 py-1 rounded-full border border-neutral-200/60 truncate max-w-[200px]"
                        >
                          {prod.quantity}x {prod.name.split(' ')[0]}
                        </span>
                      ))}
                      {offer.includedProducts.length > 3 && (
                        <span className="text-[10px] bg-neutral-100 text-neutral-500 font-bold px-2 py-1 rounded-full">
                          +{offer.includedProducts.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Footer with Price & Actions */}
                <div className="p-2 sm:p-3 pt-2 mt-2 border-t border-neutral-100 flex items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-base sm:text-lg font-black text-neutral-950 font-mono">
                        ₹{offer.comboPrice.toLocaleString('en-IN')}
                      </span>
                      <span className="text-[11px] text-neutral-400 line-through font-mono">
                        ₹{offer.originalPrice.toLocaleString('en-IN')}
                      </span>
                    </div>
                    <span className="text-[10px] text-emerald-700 font-bold block">
                      Save ₹{offer.savingsAmount.toLocaleString('en-IN')} ({offer.discountPercentage}%)
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={(e) => handleQuickAdd(e, offer)}
                      title="Quick Add to Cart"
                      className="w-9 h-9 rounded-full bg-neutral-100 hover:bg-neutral-950 hover:text-white text-neutral-800 flex items-center justify-center transition-colors cursor-pointer"
                    >
                      <ShoppingBag className="w-4 h-4" />
                    </button>
                    
                    <span className="inline-flex items-center gap-1 text-[11px] font-extrabold uppercase tracking-wider text-neutral-950 bg-amber-50 group-hover:bg-neutral-950 group-hover:text-white px-3.5 py-2 rounded-full border border-amber-200/80 group-hover:border-neutral-950 transition-all shadow-2xs">
                      <span>Details</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};
