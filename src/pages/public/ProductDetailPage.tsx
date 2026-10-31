import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Package,
  ShieldCheck,
  TrendingUp,
  FileSpreadsheet,
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { Breadcrumb } from '../../components/ui/Breadcrumb';
import { ProductCard } from '../../components/products/ProductCard';

const ProductDetailContent: React.FC<{ id?: string }> = ({ id }) => {
  const { getProductById, products } = useStore();
  const product = id ? getProductById(id) : undefined;
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 text-center space-y-4">
        <h2 className="text-3xl font-black text-neutral-950 font-['Outfit']">Product Not Located</h2>
        <p className="text-neutral-500 text-sm max-w-md mx-auto">
          The requested wholesale specification could not be located in the current catalogue. It may have been unlisted or restocked under a new SKU.
        </p>
        <div className="pt-4">
          <Link
            to="/#products"
            className="inline-flex items-center gap-2 rounded-full bg-neutral-950 text-white px-7 py-3 text-xs font-extrabold uppercase tracking-wider hover:bg-neutral-800 transition-all shadow-md"
          >
            Return to B2B Catalogue
          </Link>
        </div>
      </div>
    );
  }

  const galleryImages =
    product.images && product.images.length > 0
      ? product.images
      : ['https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80'];

  const currentMainImage = galleryImages[selectedImageIndex] || galleryImages[0];

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id && p.status === 'published')
    .slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-24 space-y-12">
      {/* Top Breadcrumb Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-200/80 pb-4">
        <Breadcrumb
          items={[
            { label: 'B2B Wholesale', href: '/#products' },
            {
              label: product.category,
              href: `/#products`,
            },
            { label: product.name },
          ]}
        />

        <Link
          to="/#products"
          className="text-xs uppercase tracking-wider text-neutral-500 hover:text-neutral-950 inline-flex items-center gap-1.5 font-bold transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Catalogue
        </Link>
      </div>

      {/* Main Product Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Visual Gallery (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Main Large Image Container */}
          <div className="relative aspect-[4/3] bg-neutral-100 border border-neutral-200/90 rounded-3xl overflow-hidden shadow-sm">
            <img
              src={currentMainImage}
              alt={`${product.name} view ${selectedImageIndex + 1}`}
              className="w-full h-full object-cover object-center transition-all duration-500"
            />

            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-wrap gap-2">
              <span className="bg-white/95 backdrop-blur-md text-neutral-900 text-xs font-bold px-3.5 py-1 rounded-full shadow-md">
                {product.category}
              </span>
              {product.isFeatured && (
                <span className="bg-amber-500 text-white text-xs font-black px-3.5 py-1 rounded-full shadow-md flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5" /> Bestseller Lot
                </span>
              )}
            </div>

            {product.sku && (
              <div className="absolute bottom-4 right-4 bg-neutral-950/85 backdrop-blur-md text-white text-xs tracking-widest uppercase font-mono px-3.5 py-1 rounded-full shadow-sm font-bold">
                SKU: {product.sku}
              </div>
            )}
          </div>

          {/* Thumbnail Gallery */}
          {galleryImages.length > 1 && (
            <div className="grid grid-cols-4 sm:grid-cols-5 gap-3">
              {galleryImages.map((imgUrl, idx) => {
                const isSelected = idx === selectedImageIndex;
                return (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`relative aspect-[4/3] rounded-2xl overflow-hidden border-2 transition-all cursor-pointer ${
                      isSelected
                        ? 'border-neutral-950 ring-2 ring-neutral-950/20 shadow-xs scale-102'
                        : 'border-neutral-200 opacity-60 hover:opacity-100 hover:border-neutral-400'
                    }`}
                    aria-label={`View image ${idx + 1}`}
                  >
                    <img
                      src={imgUrl}
                      alt={`Thumbnail ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Right Column: Wholesale Specifications & Order Actions (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#FAF5EE] border border-neutral-200/90 rounded-3xl p-7 sm:p-8 space-y-5 shadow-xs">
            <div className="space-y-2 border-b border-neutral-200/80 pb-5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-neutral-200/80 text-[11px] font-extrabold uppercase tracking-wider text-amber-800">
                <Package className="w-3.5 h-3.5 text-amber-600" />
                <span>Direct Factory Import • In Stock Chennai</span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-neutral-950 font-['Outfit'] leading-tight">
                {product.name}
              </h1>

              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-normal pt-1">
                {product.shortDescription}
              </p>
            </div>

            {/* Wholesale Procurement Parameters */}
            <div className="grid grid-cols-2 gap-3 p-4 bg-white border border-neutral-200/80 rounded-2xl text-xs shadow-2xs">
              <div>
                <span className="text-neutral-400 uppercase tracking-wider block text-[10px] font-bold">
                  Wholesale MOQ
                </span>
                <span className="font-extrabold text-neutral-950 text-sm">
                  {product.minOrderQuantity || '1 Master Carton'}
                </span>
              </div>
              <div>
                <span className="text-neutral-400 uppercase tracking-wider block text-[10px] font-bold">
                  Chennai Dispatch
                </span>
                <span className="font-extrabold text-neutral-950 text-sm">
                  {product.leadTime || 'Within 24 Hours'}
                </span>
              </div>
            </div>

            {/* Primary Order Action Button */}
            <div className="space-y-3 pt-1">
              <a
                href={`/#contact`}
                className="w-full inline-flex items-center justify-center gap-2.5 rounded-full bg-neutral-950 hover:bg-neutral-800 text-white font-extrabold text-xs uppercase tracking-wider px-8 py-4 transition-all hover:scale-[1.02] active:scale-95 shadow-lg text-center"
              >
                <span>Inquire Master Carton Lot</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <div className="flex items-center justify-center gap-2 text-[11px] text-neutral-500 font-medium">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>GST Invoicing • PAN India Road Transport Dispatch</span>
              </div>
            </div>

            {/* Technical Specifications Table */}
            <div className="pt-4 border-t border-neutral-200/80 space-y-3">
              <h3 className="text-xs uppercase tracking-[0.2em] font-extrabold text-neutral-900 font-['Outfit'] flex items-center gap-1.5">
                <FileSpreadsheet className="w-3.5 h-3.5 text-amber-600" /> Master Carton Specifications
              </h3>

              {product.specifications && product.specifications.length > 0 ? (
                <div className="border border-neutral-200/90 rounded-2xl divide-y divide-neutral-100 overflow-hidden text-xs bg-white shadow-2xs">
                  {product.specifications.map((spec, i) => (
                    <div
                      key={i}
                      className="grid grid-cols-12 px-4 py-3 hover:bg-neutral-50/70 transition-colors"
                    >
                      <span className="col-span-5 font-semibold text-neutral-500">
                        {spec.label}
                      </span>
                      <span className="col-span-7 font-bold text-neutral-950">
                        {spec.value}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-neutral-500">
                  Standard master carton packing specifications available on enquiry.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Full Description & Logistics Notes */}
      <section className="bg-[#FAF5EE] border border-neutral-200/90 rounded-3xl p-8 sm:p-10 space-y-4">
        <h2 className="text-xl sm:text-2xl font-black tracking-tight text-neutral-950 font-['Outfit']">
          Import Sourcing & Quality Specifications
        </h2>
        <div className="text-xs sm:text-sm text-neutral-700 leading-relaxed space-y-3">
          <p>{product.fullDescription}</p>
        </div>
      </section>

      {/* Related Products from Same Category */}
      {relatedProducts.length > 0 && (
        <section className="pt-8 border-t border-neutral-200/80 space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-xs uppercase tracking-[0.2em] font-extrabold text-amber-700 font-['Outfit']">
                Complementary Bulk Deals
              </span>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-neutral-950 font-['Outfit']">
                More in {product.category}
              </h2>
            </div>

            <Link
              to="/#products"
              className="text-xs uppercase tracking-wider font-extrabold text-neutral-900 hover:text-amber-700 inline-flex items-center gap-1 transition-colors bg-white px-4 py-2 rounded-full border border-neutral-200 shadow-2xs"
            >
              Full Catalogue <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map((rel) => (
              <ProductCard key={rel.id} product={rel} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  return <ProductDetailContent key={id} id={id} />;
};
