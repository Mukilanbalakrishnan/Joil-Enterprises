import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import {
  Star,
  ChevronLeft,
  ChevronRight,
  MapPin,
  CheckCircle,
  ShieldCheck,
  TrendingUp,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { TESTIMONIALS_LIST } from '../../data/mockData';

export const TestimonialSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  // Available filter categories
  const filterOptions = [
    { id: 'all', label: 'All Reviews' },
    { id: 'Thermal Drinkware', label: 'Thermal Drinkware' },
    { id: 'Aesthetic Stationery', label: 'Stationery' },
    { id: 'Novelty & Gifts', label: 'Novelty & Gifts' },
    { id: 'Smart Gadgets', label: 'Smart Gadgets' },
  ];

  // Filtered testimonials
  const filteredTestimonials = useMemo(() => {
    if (activeCategory === 'all') return TESTIMONIALS_LIST;
    return TESTIMONIALS_LIST.filter(
      (t) =>
        t.category?.toLowerCase() === activeCategory.toLowerCase() ||
        (activeCategory === 'Aesthetic Stationery' &&
          (t.category?.includes('Stationery') || t.category?.includes('Bookstore'))) ||
        (activeCategory === 'Novelty & Gifts' &&
          (t.category?.includes('Novelty') || t.category?.includes('Gift') || t.category?.includes('Toy')))
    );
  }, [activeCategory]);

  // Update scroll arrow states and active dot index
  const updateScrollState = useCallback(() => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);

    // Calculate approximate active index
    const cardWidth = 320; // approximate card width + gap
    const index = Math.round(scrollLeft / cardWidth);
    setActiveIndex(Math.min(index, filteredTestimonials.length - 1));
  }, [filteredTestimonials.length]);

  useEffect(() => {
    updateScrollState();
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', updateScrollState, { passive: true });
      window.addEventListener('resize', updateScrollState);
      return () => {
        container.removeEventListener('scroll', updateScrollState);
        window.removeEventListener('resize', updateScrollState);
      };
    }
  }, [updateScrollState]);

  const handleScroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;
    const scrollAmount = 330;
    scrollContainerRef.current.scrollBy({
      left: direction === 'right' ? scrollAmount : -scrollAmount,
      behavior: 'smooth',
    });
  };

  const scrollToCard = (index: number) => {
    if (!scrollContainerRef.current) return;
    const scrollAmount = 330 * index;
    scrollContainerRef.current.scrollTo({
      left: scrollAmount,
      behavior: 'smooth',
    });
  };

  return (
    <section id="reviews" className="py-20 bg-[#FAF5EE] relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-amber-200/25 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header Block */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-4">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-amber-300/80 shadow-2xs text-xs font-black uppercase tracking-wider text-amber-800">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Verified Retail Merchant Feedback</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-neutral-950 font-['Outfit'] leading-tight">
              Real Shopkeepers.{' '}
              <span className="text-amber-600">Real Margins.</span>
            </h2>
            <p className="text-sm sm:text-base text-neutral-600 max-w-xl font-normal leading-relaxed">
              Authentic feedback from stationery stores, gift boutiques, and novelty marts who restock fast-selling master cartons directly from our Chennai godown.
            </p>
          </div>

          {/* Right Header Controls: Rating Pill & Navigation Arrows */}
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-3">
            <div className="flex items-center gap-2 bg-white border border-neutral-200/90 rounded-full px-4 py-2 shadow-2xs">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                ))}
              </div>
              <span className="text-xs font-black text-neutral-900 font-['Outfit']">
                4.9 / 5.0
              </span>
              <span className="text-[11px] text-neutral-400 font-medium border-l border-neutral-200 pl-2">
                1,200+ Stores
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleScroll('left')}
                disabled={!canScrollLeft}
                aria-label="Previous review"
                className="w-10 h-10 rounded-full bg-white border border-neutral-200/90 flex items-center justify-center text-neutral-800 hover:bg-neutral-950 hover:text-white hover:border-neutral-950 transition-all duration-200 shadow-2xs disabled:opacity-30 disabled:pointer-events-none hover:scale-105 active:scale-95"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={() => handleScroll('right')}
                disabled={!canScrollRight}
                aria-label="Next review"
                className="w-10 h-10 rounded-full bg-white border border-neutral-200/90 flex items-center justify-center text-neutral-800 hover:bg-neutral-950 hover:text-white hover:border-neutral-950 transition-all duration-200 shadow-2xs disabled:opacity-30 disabled:pointer-events-none hover:scale-105 active:scale-95"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {filterOptions.map((opt) => {
            const isActive = activeCategory === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => {
                  setActiveCategory(opt.id);
                  if (scrollContainerRef.current) {
                    scrollContainerRef.current.scrollTo({ left: 0, behavior: 'smooth' });
                  }
                }}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-200 whitespace-nowrap ${
                  isActive
                    ? 'bg-neutral-950 text-white shadow-xs'
                    : 'bg-white text-neutral-600 border border-neutral-200/80 hover:border-neutral-400 hover:text-neutral-900'
                }`}
              >
                {opt.label}
              </button>
            );
          })}
        </div>

        {/* Small Cards Slider Track */}
        <div
          ref={scrollContainerRef}
          className="flex gap-4 sm:gap-5 overflow-x-auto scrollbar-none snap-x snap-mandatory py-2 -mx-4 px-4 sm:mx-0 sm:px-0"
          style={{ scrollBehavior: 'smooth' }}
        >
          {filteredTestimonials.map((t) => (
            <div
              key={t.id}
              className="w-[280px] sm:w-[310px] lg:w-[298px] xl:w-[305px] shrink-0 snap-start bg-white rounded-2xl p-5 border border-neutral-200/90 shadow-2xs hover:shadow-lg hover:-translate-y-1 hover:border-amber-400 transition-all duration-300 flex flex-col justify-between group"
            >
              {/* Top Row: 5 Stars + Location Pill */}
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1 bg-amber-50 border border-amber-200/60 px-2.5 py-0.5 rounded-full">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-amber-500 text-amber-500" />
                    ))}
                    <span className="text-[11px] font-black text-amber-900 ml-0.5">5.0</span>
                  </div>
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-neutral-500 bg-neutral-100/80 px-2 py-0.5 rounded-full truncate max-w-[130px]">
                    <MapPin className="w-3 h-3 text-neutral-400 shrink-0" />
                    <span className="truncate">{t.location.split(',')[0]}</span>
                  </span>
                </div>

                {/* Concise Review Quote */}
                <p className="text-[13px] text-neutral-700 leading-relaxed font-normal italic line-clamp-3">
                  "{t.quote}"
                </p>
              </div>

              {/* Bottom Row: Author Avatar + Store Details + Margin Badge */}
              <div className="pt-4 mt-3 border-t border-neutral-100 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="relative shrink-0">
                    <img
                      src={t.avatar}
                      alt={t.author}
                      className="w-9 h-9 rounded-full object-cover border border-amber-300 shadow-2xs"
                    />
                    <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-500 text-white flex items-center justify-center border border-white">
                      <CheckCircle className="w-2.5 h-2.5" />
                    </div>
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-bold text-xs sm:text-[13px] text-neutral-950 font-['Outfit'] truncate leading-tight">
                      {t.author}
                    </h4>
                    <p className="text-[11px] text-neutral-500 truncate mt-0.5">
                      {t.project}
                    </p>
                  </div>
                </div>

                {/* Profit Margin Pill */}
                {t.margin && (
                  <span className="shrink-0 inline-flex items-center gap-1 text-[10px] font-black text-amber-900 bg-amber-50 border border-amber-200/70 px-2 py-0.5 rounded-full">
                    <TrendingUp className="w-2.5 h-2.5 text-amber-600" />
                    {t.margin}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Carousel Pagination Dots */}
        <div className="flex items-center justify-center gap-1.5 pt-2">
          {filteredTestimonials.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => scrollToCard(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                activeIndex === i ? 'w-6 bg-amber-600' : 'w-2 bg-neutral-300 hover:bg-neutral-400'
              }`}
            />
          ))}
        </div>

        {/* Elegant Bottom Trust Banner Pill */}
        <div className="bg-white border border-neutral-200/90 rounded-full px-5 py-3 sm:py-3.5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-2xs text-center sm:text-left">
          <div className="flex items-center gap-3 px-1">
            <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-200/60">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div className="text-left">
              <span className="text-xs sm:text-sm font-bold text-neutral-950 font-['Outfit'] inline-flex items-center gap-1.5">
                Direct China Factory Importer Assurance
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500" />
              </span>
              <p className="text-[11px] text-neutral-500 font-normal">
                Lowest 1-carton MOQ • Inspected master cartons • 24-Hour road dispatch from Chennai godown
              </p>
            </div>
          </div>

          <a
            href="#contact"
            className="rounded-full bg-neutral-950 text-white text-xs font-bold px-5 py-2 hover:bg-neutral-800 transition-all shrink-0 inline-flex items-center gap-1.5 hover:scale-105 active:scale-95 shadow-2xs"
          >
            <span>Partner With Us</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
};
