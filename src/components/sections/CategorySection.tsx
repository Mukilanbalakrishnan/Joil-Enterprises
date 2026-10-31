import React, { useRef, useState, useEffect } from 'react';
import { ArrowUpRight, Sparkles, ChevronLeft, ChevronRight, Package } from 'lucide-react';
import { useStore } from '../../context/useStore';

interface CategorySectionProps {
  onCategorySelect: (categoryName: string) => void;
}

export const CategorySection: React.FC<CategorySectionProps> = ({ onCategorySelect }) => {
  const { categories, products } = useStore();
  const sliderRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  // Strictly ensure the 4 core wholesale categories
  const displayCategories = categories.slice(0, 4);

  const scrollToIndex = (index: number) => {
    if (!sliderRef.current) return;
    const cards = sliderRef.current.children;
    if (cards[index]) {
      (cards[index] as HTMLElement).scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'start',
      });
      setActiveIdx(index);
    }
  };

  const handlePrev = () => {
    const newIdx = activeIdx === 0 ? displayCategories.length - 1 : activeIdx - 1;
    scrollToIndex(newIdx);
  };

  const handleNext = () => {
    const newIdx = activeIdx === displayCategories.length - 1 ? 0 : activeIdx + 1;
    scrollToIndex(newIdx);
  };

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const handleScroll = () => {
      const scrollLeft = slider.scrollLeft;
      const card = slider.firstElementChild as HTMLElement;
      if (!card) return;
      const cardWidth = card.offsetWidth + 24; // width + gap
      const newIdx = Math.round(scrollLeft / cardWidth);
      if (newIdx !== activeIdx && newIdx >= 0 && newIdx < displayCategories.length) {
        setActiveIdx(newIdx);
      }
    };

    slider.addEventListener('scroll', handleScroll, { passive: true });
    return () => slider.removeEventListener('scroll', handleScroll);
  }, [activeIdx, displayCategories.length]);

  return (
    <section id="categories" className="py-20 sm:py-28 bg-white relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 right-10 -translate-y-1/2 w-96 h-96 bg-amber-100/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-purple-100/30 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Section Header with Slider Navigation Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-neutral-200">
          <div className="space-y-2.5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-xs font-extrabold uppercase tracking-wider text-amber-800">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Direct China Factory Lines</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-neutral-950 font-['Outfit'] leading-[1.1]">
              Explore Wholesale <br />
              <span className="text-amber-600">Product Categories</span>
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <p className="text-xs sm:text-sm text-neutral-600 max-w-xs leading-relaxed font-normal">
              Direct factory imports in stock at our Chennai godown. Slide or click any card to filter products below.
            </p>

            {/* Previous / Next Arrow Slider Controls */}
            <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
              <button
                onClick={handlePrev}
                className="w-11 h-11 rounded-full bg-neutral-100 hover:bg-neutral-950 hover:text-white text-neutral-800 flex items-center justify-center transition-all cursor-pointer shadow-2xs hover:scale-105 active:scale-95"
                aria-label="Previous category slide"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                className="w-11 h-11 rounded-full bg-neutral-100 hover:bg-neutral-950 hover:text-white text-neutral-800 flex items-center justify-center transition-all cursor-pointer shadow-2xs hover:scale-105 active:scale-95"
                aria-label="Next category slide"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* 4-CARD SLIDER (Responsive Scroll-Snap Carousel) */}
        <div
          ref={sliderRef}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 pt-1 px-1 -mx-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        >
          {displayCategories.map((cat, idx) => {
            const count = products.filter((p) => p.category === cat.name).length;

            return (
              <div
                key={cat.id}
                onClick={() => onCategorySelect(cat.name)}
                className="shrink-0 w-[85%] sm:w-[48%] lg:w-[calc(25%-18px)] snap-start group relative overflow-hidden bg-white border border-neutral-200/90 rounded-3xl p-4 shadow-xs hover:shadow-xl hover:border-amber-400 transition-all duration-300 cursor-pointer flex flex-col justify-between"
              >
                <div>
                  {/* Card Image Container */}
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-neutral-100 shadow-inner">
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-neutral-950/20 to-transparent" />

                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                      <span className="bg-white/95 backdrop-blur-md text-neutral-900 text-[10px] font-black tracking-widest uppercase px-3 py-1 rounded-full shadow-xs font-mono">
                        CATEGORY 0{idx + 1}
                      </span>
                      <span className="bg-neutral-950/80 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-xs">
                        {count || 8}+ Lots
                      </span>
                    </div>

                    {/* Bottom Factory Direct Tag */}
                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <span className="text-[10px] uppercase font-bold tracking-widest text-amber-300 block">
                        Direct Factory Consignment
                      </span>
                    </div>
                  </div>

                  {/* Card Content - Prominently Mentions the Category */}
                  <div className="p-2 sm:p-3 pt-4 space-y-2">
                    <div className="text-[11px] font-extrabold text-amber-700 uppercase tracking-wider font-mono">
                      Category {idx + 1}
                    </div>

                    {/* The Category Name prominently displayed */}
                    <h3 className="text-lg sm:text-xl font-black text-neutral-950 leading-snug font-['Outfit'] group-hover:text-amber-700 transition-colors">
                      {cat.name}
                    </h3>

                    <p className="text-xs text-neutral-500 leading-relaxed font-normal line-clamp-2">
                      {cat.tagline || cat.description}
                    </p>
                  </div>
                </div>

                {/* Card Footer Action */}
                <div className="p-2 sm:p-3 pt-3 border-t border-neutral-100 flex items-center justify-between mt-2">
                  <span className="text-[11px] text-neutral-500 font-semibold flex items-center gap-1.5">
                    <Package className="w-3.5 h-3.5 text-amber-600" />
                    <span>MOQ: 1 Carton</span>
                  </span>

                  <span className="inline-flex items-center gap-1 text-[11px] font-extrabold uppercase tracking-wider text-neutral-950 bg-amber-50 group-hover:bg-neutral-950 group-hover:text-white px-3.5 py-1.5 rounded-full border border-amber-200/80 group-hover:border-neutral-950 transition-all shadow-2xs">
                    <span>Browse</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Slider Indicator Dots */}
        <div className="flex items-center justify-center gap-2 pt-2">
          {displayCategories.map((cat, idx) => (
            <button
              key={cat.id}
              onClick={() => scrollToIndex(idx)}
              className={`transition-all duration-300 rounded-full cursor-pointer ${
                activeIdx === idx
                  ? 'w-8 h-2.5 bg-neutral-950 shadow-xs'
                  : 'w-2.5 h-2.5 bg-neutral-300 hover:bg-neutral-400'
              }`}
              aria-label={`Go to category slide ${idx + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
};
