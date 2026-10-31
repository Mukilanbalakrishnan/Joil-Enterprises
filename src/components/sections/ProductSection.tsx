import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Package, ChevronLeft, ChevronRight, ArrowRight, Sparkles } from 'lucide-react';
import { useStore } from '../../context/useStore';
import { ProductCard } from '../products/ProductCard';

interface ProductSectionProps {
  onEnquireClick?: (productName: string) => void;
  // Props kept optional for backward compatibility
  selectedCategory?: string;
  onSelectCategory?: (cat: string) => void;
}

export const ProductSection: React.FC<ProductSectionProps> = () => {
  const { products } = useStore();
  const [currentPage, setCurrentPage] = useState(0);

  // Filter only published products
  const publishedProducts = products.filter((p) => p.status === 'published');

  // 8 products per slide: 2 rows x 4 columns
  const ITEMS_PER_SLIDE = 8;
  const totalPages = Math.ceil(publishedProducts.length / ITEMS_PER_SLIDE);

  const prevPage = () => {
    setCurrentPage((prev) => (prev === 0 ? totalPages - 1 : prev - 1));
  };

  const nextPage = () => {
    setCurrentPage((prev) => (prev === totalPages - 1 ? 0 : prev + 1));
  };

  // Current slice of 8 products (2 rows x 4 columns)
  const currentProducts = publishedProducts.slice(
    currentPage * ITEMS_PER_SLIDE,
    (currentPage + 1) * ITEMS_PER_SLIDE
  );

  return (
    <section id="products" className="py-24 bg-white relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-amber-100/35 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-100/30 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Section Header with Slider Arrows */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-neutral-200">
          <div className="space-y-2.5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-xs font-extrabold uppercase tracking-wider text-amber-800">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Direct China Factory Imports</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-neutral-950 font-['Outfit'] leading-[1.1]">
              Wholesale Master <br />
              <span className="text-amber-600">Inventory & Listings</span>
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <p className="text-xs sm:text-sm text-neutral-600 max-w-xs leading-relaxed font-normal">
              Direct container stock at our Chennai central godown. Sliding catalogue of fast-moving items ready for immediate lorry booking.
            </p>

            {/* Slider Navigation Arrows (Previous / Next) */}
            {totalPages > 1 && (
              <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
                <button
                  onClick={prevPage}
                  className="w-11 h-11 rounded-full bg-neutral-100 hover:bg-neutral-950 hover:text-white text-neutral-800 flex items-center justify-center transition-all cursor-pointer shadow-2xs hover:scale-105 active:scale-95"
                  aria-label="Previous product page"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={nextPage}
                  className="w-11 h-11 rounded-full bg-neutral-100 hover:bg-neutral-950 hover:text-white text-neutral-800 flex items-center justify-center transition-all cursor-pointer shadow-2xs hover:scale-105 active:scale-95"
                  aria-label="Next product page"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* TWO-ROW 4x4 SLIDING CARDS GRID (8 Cards Per Page: 2 Rows x 4 Cols) */}
        <div className="relative min-h-[600px] transition-opacity duration-300">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
            {currentProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>

        {/* Bottom Pagination Dots */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 pt-2">
            {[...Array(totalPages)].map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentPage(idx)}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  currentPage === idx
                    ? 'w-8 h-2.5 bg-neutral-950 shadow-xs'
                    : 'w-2.5 h-2.5 bg-neutral-300 hover:bg-neutral-400'
                }`}
                aria-label={`Go to product slide page ${idx + 1}`}
              />
            ))}
          </div>
        )}

        {/* "VIEW ALL PRODUCTS" ACTION BUTTON (Leading to full search & category filter catalogue) */}
        <div className="pt-6 flex flex-col items-center justify-center space-y-3 text-center border-t border-neutral-100">
          <Link
            to="/products"
            className="inline-flex items-center gap-3 rounded-full bg-neutral-950 hover:bg-neutral-800 text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider px-10 py-4 shadow-xl hover:scale-105 active:scale-95 transition-all cursor-pointer group"
          >
            <span>View All Products</span>
            <ArrowRight className="w-4 h-4 text-amber-400 group-hover:translate-x-1.5 transition-transform" />
          </Link>
          
          <div className="flex items-center gap-2 text-xs text-neutral-500 font-medium">
            <Package className="w-3.5 h-3.5 text-amber-600" />
            <span>Search by SKU, keyword & filter by category in our complete B2B master catalogue</span>
          </div>
        </div>

      </div>
    </section>
  );
};
