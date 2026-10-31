import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Package, TrendingUp } from 'lucide-react';
import type { Product } from '../../types';

export interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const mainImage = product.images?.[0] || 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80';

  return (
    <article className="group bg-white border border-neutral-200/90 rounded-3xl p-3 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:border-amber-400 hover:shadow-xl shadow-xs">
      {/* Product Image Container */}
      <div>
        <Link
          to={`/products/${product.id}`}
          className="relative block aspect-[4/3] bg-neutral-100 overflow-hidden rounded-2xl cursor-pointer focus:outline-hidden"
          aria-label={`View wholesale details for ${product.name}`}
        >
          <img
            src={mainImage}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.05]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/60 via-transparent to-transparent" />

          {/* Top Badges */}
          <div className="absolute top-3.5 left-3.5 flex flex-wrap gap-1.5">
            <span className="bg-white/95 backdrop-blur-md text-neutral-900 text-[11px] font-bold px-3 py-1 rounded-full shadow-md">
              {product.category}
            </span>
            {product.isFeatured && (
              <span className="bg-amber-500 text-white text-[11px] font-black px-3 py-1 rounded-full shadow-md flex items-center gap-1">
                <TrendingUp className="w-3 h-3" /> Bestseller
              </span>
            )}
          </div>

          {product.sku && (
            <div className="absolute bottom-3.5 right-3.5 bg-neutral-950/85 backdrop-blur-md text-white text-[10px] tracking-widest uppercase font-mono px-3 py-0.5 rounded-full shadow-sm font-bold">
              {product.sku}
            </div>
          )}
        </Link>

        {/* Content */}
        <div className="p-4 sm:p-5 space-y-3">
          <div className="space-y-1.5">
            <h3 className="font-extrabold text-neutral-950 text-base leading-snug group-hover:text-amber-700 transition-colors">
              <Link to={`/products/${product.id}`}>
                {product.name}
              </Link>
            </h3>

            <p className="text-xs text-neutral-500 leading-relaxed font-normal line-clamp-2">
              {product.shortDescription}
            </p>
          </div>

          {/* Quick Wholesale Specification Preview */}
          {product.specifications && product.specifications.length > 0 && (
            <div className="pt-2.5 border-t border-neutral-100 flex items-center justify-between text-[11px] text-neutral-600">
              <span className="font-bold text-amber-700 flex items-center gap-1">
                <Package className="w-3.5 h-3.5 text-amber-600" /> {product.specifications[0].label}:
              </span>
              <span className="font-bold text-neutral-950">{product.specifications[0].value}</span>
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="p-4 sm:p-5 pt-0 border-t border-neutral-100 flex items-center justify-between gap-2.5 mt-2">
        <Link
          to={`/products/${product.id}`}
          className="text-xs font-bold uppercase tracking-wider text-neutral-900 hover:text-amber-700 inline-flex items-center gap-1 transition-colors py-2"
        >
          <span>Carton Specs</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>

        <a
          href={`#contact`}
          onClick={(e) => {
            e.preventDefault();
            const el = document.getElementById('contact');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          className="text-[11px] font-extrabold uppercase tracking-wider text-neutral-950 hover:text-white px-4 py-2 rounded-full bg-amber-50 hover:bg-neutral-950 border border-amber-200/90 hover:border-neutral-950 transition-all cursor-pointer shadow-2xs hover:scale-105 active:scale-95"
        >
          Inquire Lot
        </a>
      </div>
    </article>
  );
};
