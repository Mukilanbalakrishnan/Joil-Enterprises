import React, { useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, X, RotateCcw, Package, Sparkles, ArrowLeft } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { Breadcrumb } from '../../components/ui/Breadcrumb';
import { ProductCard } from '../../components/products/ProductCard';

export const ProductsPage: React.FC = () => {
  const { products, categories } = useStore();
  const [searchParams, setSearchParams] = useSearchParams();

  // Search & Filter state derived directly from URL parameters
  const selectedCategory = searchParams.get('category') || 'All';
  const searchQuery = searchParams.get('search') || '';
  const sortBy = (searchParams.get('sort') || 'featured') as 'featured' | 'name-asc' | 'name-desc' | 'newest';

  const handleCategorySelect = (categoryName: string) => {
    const next = new URLSearchParams(searchParams);
    if (categoryName === 'All') {
      next.delete('category');
    } else {
      next.set('category', categoryName);
    }
    setSearchParams(next);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const next = new URLSearchParams(searchParams);
    const query = e.target.value;
    if (query.trim()) {
      next.set('search', query);
    } else {
      next.delete('search');
    }
    setSearchParams(next);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const next = new URLSearchParams(searchParams);
    next.set('sort', e.target.value);
    setSearchParams(next);
  };

  const handleClearFilters = () => {
    setSearchParams({});
  };

  // Filtered and sorted products
  const filteredProducts = useMemo(() => {
    return products.filter((prod) => {
      if (prod.status !== 'published') return false;

      // Category filter
      if (selectedCategory !== 'All' && prod.category !== selectedCategory) {
        return false;
      }

      // Search filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = prod.name.toLowerCase().includes(q);
        const matchDesc = prod.shortDescription.toLowerCase().includes(q);
        const matchSku = prod.sku?.toLowerCase().includes(q);
        const matchCat = prod.category.toLowerCase().includes(q);
        const matchSubcat = prod.subcategory?.toLowerCase().includes(q);
        return matchName || matchDesc || matchSku || matchCat || matchSubcat;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'featured') {
        if (a.isFeatured && !b.isFeatured) return -1;
        if (!a.isFeatured && b.isFeatured) return 1;
        return 0;
      }
      if (sortBy === 'name-asc') {
        return a.name.localeCompare(b.name);
      }
      if (sortBy === 'name-desc') {
        return b.name.localeCompare(a.name);
      }
      if (sortBy === 'newest') {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
      return 0;
    });
  }, [products, selectedCategory, searchQuery, sortBy]);

  const totalPublished = products.filter((p) => p.status === 'published').length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-24 space-y-10">
      {/* Top Breadcrumb Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-200/80 pb-4">
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Full B2B Product Catalogue' }]} />

        <Link
          to="/"
          className="text-xs uppercase tracking-wider text-neutral-500 hover:text-neutral-950 inline-flex items-center gap-1.5 font-bold transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
        </Link>
      </div>

      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-neutral-200">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-xs font-extrabold uppercase tracking-wider text-amber-800">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Complete Wholesale Catalogue</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-neutral-950 font-['Outfit'] leading-[1.1]">
            Direct China Wholesale <br />
            <span className="text-amber-600">Master Product Inventory</span>
          </h1>
        </div>
        <p className="text-sm text-neutral-600 max-w-md leading-relaxed font-normal">
          Search products by title, SKU, or category filter. All master carton specifications are calibrated for retail shopkeepers.
        </p>
      </div>

      {/* SEARCH, CATEGORY FILTER & SORT CONTROLS BAR */}
      <div className="bg-[#FAF5EE] border border-neutral-200/90 rounded-3xl p-6 sm:p-7 space-y-5 shadow-xs">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Search Input Pill */}
          <div className="relative flex-grow max-w-lg">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <input
              type="text"
              placeholder="Search products by title, SKU, or keyword..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full pl-11 pr-10 py-3 bg-white border border-neutral-200 rounded-full text-xs sm:text-sm text-neutral-900 focus:outline-hidden focus:border-neutral-900 focus:ring-2 focus:ring-neutral-950/5 shadow-2xs font-medium"
            />
            {searchQuery && (
              <button
                onClick={() => {
                  const next = new URLSearchParams(searchParams);
                  next.delete('search');
                  setSearchParams(next);
                }}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700 p-1 cursor-pointer"
                aria-label="Clear search query"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Sort Selector Pill */}
          <div className="flex items-center gap-3 self-end md:self-auto shrink-0">
            <span className="text-xs uppercase tracking-wider text-neutral-500 font-bold">
              Sort:
            </span>
            <select
              value={sortBy}
              onChange={handleSortChange}
              className="bg-white border border-neutral-200 rounded-full text-xs font-bold uppercase tracking-wider px-4 py-2.5 text-neutral-900 focus:outline-hidden focus:border-neutral-900 shadow-2xs cursor-pointer"
            >
              <option value="featured">Featured First</option>
              <option value="name-asc">Alphabetical (A – Z)</option>
              <option value="name-desc">Alphabetical (Z – A)</option>
              <option value="newest">Recently Added</option>
            </select>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-2 border-t border-neutral-200/80 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          <button
            onClick={() => handleCategorySelect('All')}
            className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
              selectedCategory === 'All'
                ? 'bg-neutral-950 text-white shadow-md'
                : 'bg-white border border-neutral-200/80 text-neutral-700 hover:text-neutral-950 hover:border-neutral-400'
            }`}
          >
            All Categories ({totalPublished})
          </button>

          {categories.map((c) => {
            const isSelected = selectedCategory === c.name;
            const count = products.filter((p) => p.category === c.name && p.status === 'published').length;
            return (
              <button
                key={c.id}
                onClick={() => handleCategorySelect(c.name)}
                className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-amber-500 text-white shadow-md'
                    : 'bg-white border border-neutral-200/80 text-neutral-700 hover:text-neutral-950 hover:border-neutral-400'
                }`}
              >
                {c.name} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Filter Indicators & Result Count */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-neutral-500 px-1">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-bold text-neutral-900">
            Showing {filteredProducts.length} of {totalPublished} wholesale items
          </span>

          {(selectedCategory !== 'All' || searchQuery) && (
            <div className="flex items-center gap-2 ml-2">
              <span className="text-neutral-300">•</span>
              <button
                onClick={handleClearFilters}
                className="text-amber-700 hover:text-amber-800 font-bold flex items-center gap-1 cursor-pointer hover:underline"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Clear all filters
              </button>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 text-neutral-500 font-medium">
          <Package className="w-3.5 h-3.5 text-amber-600" />
          <span>Chennai Central Godown • Immediate 24h Transport Dispatch</span>
        </div>
      </div>

      {/* Products Grid (3 columns on desktop, responsive) */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-20 bg-[#FAF5EE] border border-neutral-200 rounded-3xl space-y-4">
          <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center mx-auto">
            <Package className="w-8 h-8 text-amber-600" />
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-neutral-950">No wholesale products found</h3>
            <p className="text-xs text-neutral-500 max-w-sm mx-auto">
              No items matched "{searchQuery || selectedCategory}". Try adjusting your search query or selecting another category.
            </p>
          </div>
          <button
            onClick={handleClearFilters}
            className="px-6 py-2.5 rounded-full bg-neutral-950 text-white text-xs font-bold uppercase tracking-wider hover:bg-neutral-800 transition-colors cursor-pointer shadow-xs"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
};
