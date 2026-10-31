import type { Product } from '../../types';
import { ProductCard } from './ProductCard';
import { Button } from '../ui/Button';
import { PackageOpen } from 'lucide-react';

export interface ProductGridProps {
  products: Product[];
  emptyMessage?: string;
  onResetFilters?: () => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  emptyMessage = 'No matching products found in the current specification parameters.',
  onResetFilters,
}) => {
  if (products.length === 0) {
    return (
      <div className="py-20 px-6 text-center border border-dashed border-neutral-300 rounded-sm bg-[#FAFAFA] max-w-xl mx-auto my-8 space-y-4">
        <div className="w-12 h-12 rounded-full bg-neutral-100 flex items-center justify-center mx-auto text-neutral-500">
          <PackageOpen className="w-6 h-6 stroke-[1.5]" />
        </div>
        <div className="space-y-1">
          <h3 className="text-base font-semibold text-neutral-900">Zero Results</h3>
          <p className="text-sm text-neutral-500">{emptyMessage}</p>
        </div>
        {onResetFilters && (
          <div className="pt-2">
            <Button variant="secondary" size="sm" onClick={onResetFilters}>
              Reset Filters
            </Button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
