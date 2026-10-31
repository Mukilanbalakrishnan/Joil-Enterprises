import React, { useState } from 'react';
import { X, ArrowRight } from 'lucide-react';
import type { Product } from '../../types';

interface ProductQuickViewModalProps {
  product: Product | null;
  onClose: () => void;
  onEnquire: (productName: string) => void;
}

export const ProductQuickViewModal: React.FC<ProductQuickViewModalProps> = ({
  product,
  onClose,
  onEnquire,
}) => {
  const [selectedImgIndex, setSelectedImgIndex] = useState(0);

  if (!product) return null;

  const images = product.images && product.images.length > 0
    ? product.images
    : ['https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80'];

  const mainImage = images[selectedImgIndex] || images[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-neutral-950/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative bg-[#FAF5EE] border border-neutral-200/90 rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl z-10 max-h-[90vh] overflow-y-auto animate-fade-in">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-neutral-400 hover:text-neutral-900 p-2 rounded-full bg-white hover:bg-neutral-100 transition-colors cursor-pointer border border-neutral-200/80 shadow-2xs"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Images (6 cols) */}
          <div className="md:col-span-6 space-y-3">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-white border border-neutral-200 shadow-xs">
              <img
                src={mainImage}
                alt={product.name}
                className="w-full h-full object-cover transition-all duration-300"
              />
            </div>

            {images.length > 1 && (
              <div className="flex gap-2">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImgIndex(idx)}
                    className={`w-16 h-12 rounded-xl overflow-hidden border-2 cursor-pointer transition-all ${
                      selectedImgIndex === idx ? 'border-amber-500 scale-105' : 'border-neutral-200 opacity-60'
                    }`}
                  >
                    <img src={img} alt="Thumb" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details (6 cols) */}
          <div className="md:col-span-6 space-y-4">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="bg-white border border-neutral-200 text-neutral-900 text-xs font-bold px-3 py-1 rounded-full shadow-2xs">
                  {product.category}
                </span>
                {product.sku && (
                  <span className="text-[10px] font-mono text-neutral-500 uppercase bg-neutral-100 px-2.5 py-0.5 rounded-full font-bold">
                    {product.sku}
                  </span>
                )}
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-neutral-950 font-['Outfit'] leading-tight">
                {product.name}
              </h3>
              <p className="text-xs text-neutral-500 leading-relaxed pt-1">
                {product.shortDescription}
              </p>
            </div>

            {/* Specifications */}
            {product.specifications && product.specifications.length > 0 && (
              <div className="border border-neutral-200/80 rounded-2xl divide-y divide-neutral-100 text-xs bg-white overflow-hidden shadow-2xs">
                {product.specifications.slice(0, 4).map((s, i) => (
                  <div key={i} className="grid grid-cols-12 px-4 py-2.5">
                    <span className="col-span-5 text-neutral-500 font-medium">{s.label}</span>
                    <span className="col-span-7 text-neutral-900 font-bold">{s.value}</span>
                  </div>
                ))}
              </div>
            )}

            <div className="pt-2">
              <button
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-neutral-950 hover:bg-neutral-800 text-white text-xs font-extrabold uppercase tracking-wider py-3.5 px-6 transition-all hover:scale-[1.02] active:scale-95 shadow-md cursor-pointer"
                onClick={() => {
                  onClose();
                  onEnquire(`Wholesale Carton: ${product.name} (SKU: ${product.sku})`);
                }}
              >
                <span>Inquire Master Carton Lot</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
