import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import type { Category } from '../../types';

export interface CategoryCardProps {
  category: Category;
  count?: number;
  featuredLayout?: boolean;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({
  category,
  count,
  featuredLayout = false,
}) => {
  return (
    <Link
      to={`/products?category=${encodeURIComponent(category.name)}`}
      className={`group relative overflow-hidden bg-white border border-neutral-200/90 rounded-sm flex flex-col transition-all duration-300 hover:border-neutral-400 hover:shadow-xs focus:outline-hidden ${
        featuredLayout ? 'md:col-span-2' : ''
      }`}
    >
      {/* Category Image */}
      <div
        className={`relative w-full overflow-hidden bg-neutral-100 ${
          featuredLayout ? 'aspect-[16/9] md:aspect-[21/9]' : 'aspect-[16/10]'
        }`}
      >
        <img
          src={category.image}
          alt={category.name}
          loading="lazy"
          className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/70 via-neutral-950/20 to-transparent" />

        {/* Count pill if available */}
        {typeof count === 'number' && (
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-xs text-neutral-900 text-[11px] font-semibold tracking-wider uppercase px-2.5 py-0.5 rounded-sm shadow-xs">
            {count} {count === 1 ? 'Product' : 'Products'}
          </div>
        )}

        {/* Content Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white flex items-end justify-between">
          <div className="space-y-1.5 max-w-lg">
            <span className="text-[10px] uppercase tracking-[0.25em] text-neutral-300 font-semibold block">
              Catalogue Series
            </span>
            <h3 className="text-xl md:text-2xl font-bold tracking-tight text-white group-hover:text-[#F3D5B5] transition-colors">
              {category.name}
            </h3>
            <p className="text-xs text-neutral-200/90 leading-relaxed line-clamp-2 max-w-md">
              {category.tagline || category.description}
            </p>
          </div>

          <div className="hidden sm:flex items-center justify-center w-9 h-9 rounded-full bg-white/20 backdrop-blur-xs text-white group-hover:bg-white group-hover:text-neutral-950 transition-all shrink-0 ml-4">
            <ArrowUpRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </Link>
  );
};
