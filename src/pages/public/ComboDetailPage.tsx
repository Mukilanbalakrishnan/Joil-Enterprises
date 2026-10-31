import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  ShoppingBag,
  MessageCircle,
  ShieldCheck,
  Package,
  Sparkles,
  TrendingUp,
  Percent,
  CheckCircle2,
  Plus,
  Minus,
} from 'lucide-react';
import { COMBO_OFFERS } from '../../data/mockData';
import { useStore } from '../../context/useStore';
import { Breadcrumb } from '../../components/ui/Breadcrumb';
import { COMPANY_INFO } from '../../data/companyData';

export const ComboDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { addToCart, openCart } = useStore();
  const [bundleQuantity, setBundleQuantity] = useState(1);

  // Find combo offer by id or slug
  const combo = COMBO_OFFERS.find(
    (c) => c.id === id || c.slug === id || c.id === `combo-${id}`
  );

  if (!combo) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 text-center space-y-4">
        <h2 className="text-3xl font-black text-neutral-950 font-['Outfit']">
          Wholesale Combo Pack Not Located
        </h2>
        <p className="text-neutral-500 text-sm max-w-md mx-auto">
          The requested wholesale bundle configuration could not be found. It may have expired or been updated with a seasonal pack.
        </p>
        <div className="pt-4">
          <Link
            to="/#offers"
            className="inline-flex items-center gap-2 rounded-full bg-neutral-950 text-white px-7 py-3 text-xs font-extrabold uppercase tracking-wider hover:bg-neutral-800 transition-all shadow-md"
          >
            Return to Combo Deals
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart({
      type: 'combo',
      referenceId: combo.id,
      name: combo.title,
      price: combo.comboPrice,
      quantity: bundleQuantity,
      image: combo.image,
      badge: combo.badge,
      totalPieces: combo.totalPieces,
    });
    openCart();
  };

  const handleBuyNow = () => {
    let text = `*Direct Wholesale Order Request - Joli Enterprises*\n\n`;
    text += `*Combo Pack:* ${combo.title} (${combo.tier})\n`;
    text += `*Bundles Requested:* ${bundleQuantity} Lot(s) (${combo.totalPieces * bundleQuantity} Total Pcs)\n`;
    text += `*Wholesale Combo Rate:* ₹${combo.comboPrice.toLocaleString('en-IN')} per bundle\n`;
    text += `*Total Order Value:* ₹${(combo.comboPrice * bundleQuantity).toLocaleString('en-IN')}\n\n`;
    text += `*Included Assortment:*\n`;
    combo.includedProducts.forEach((item) => {
      text += ` - ${item.quantity * bundleQuantity}x ${item.name} (${item.sku})\n`;
    });
    text += `\nPlease confirm dispatch date from Chennai godown and local road transport options.`;

    const phoneClean = COMPANY_INFO.contact.phone.replace(/[^0-9]/g, '');
    const url = `https://wa.me/${phoneClean}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-24 space-y-12">
      {/* Top Breadcrumb Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-200/80 pb-4">
        <Breadcrumb
          items={[
            { label: 'B2B Wholesale', href: '/#hero' },
            { label: 'Wholesale Starter Bundles', href: '/#offers' },
            { label: combo.title },
          ]}
        />

        <Link
          to="/#offers"
          className="text-xs uppercase tracking-wider text-neutral-500 hover:text-neutral-950 inline-flex items-center gap-1.5 font-bold transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Starter Packs
        </Link>
      </div>

      {/* Main Bundle Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Visual & Included Products List (7 cols) */}
        <div className="lg:col-span-7 space-y-8">
          {/* Main Visual Banner */}
          <div className="relative aspect-[16/9] sm:aspect-[2/1] bg-neutral-100 border border-neutral-200/90 rounded-3xl overflow-hidden shadow-sm">
            <img
              src={combo.image}
              alt={combo.title}
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/70 via-neutral-950/20 to-transparent" />

            {/* Badges Overlay */}
            <div className="absolute top-4 left-4 flex flex-wrap gap-2">
              <span className="bg-white/95 backdrop-blur-md text-neutral-900 text-xs font-bold px-3.5 py-1 rounded-full shadow-md">
                {combo.tier}
              </span>
              {combo.popular && (
                <span className="bg-amber-500 text-white text-xs font-black px-3.5 py-1 rounded-full shadow-md flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5" /> Retailer #1 Choice
                </span>
              )}
            </div>

            <div className="absolute top-4 right-4 bg-emerald-600 text-white text-xs font-black uppercase tracking-wider px-3.5 py-1 rounded-full shadow-md flex items-center gap-1">
              <Percent className="w-3.5 h-3.5" /> Save {combo.discountPercentage}% OFF
            </div>

            <div className="absolute bottom-5 left-5 right-5 text-white space-y-1">
              <span className="text-xs uppercase tracking-widest text-amber-300 font-bold block">
                {combo.badge}
              </span>
              <h1 className="text-xl sm:text-2xl font-black font-['Outfit'] leading-tight">
                {combo.title}
              </h1>
            </div>
          </div>

          {/* Description & Overview */}
          <div className="bg-[#FAF5EE] border border-neutral-200/90 rounded-3xl p-6 sm:p-7 space-y-4">
            <h2 className="text-lg font-black text-neutral-950 font-['Outfit'] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-600" /> Bundle Objective & Retail Strategy
            </h2>
            <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed">
              {combo.description}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
              {combo.features?.map((feat, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-neutral-800 font-medium bg-white p-2.5 rounded-xl border border-neutral-200/60 shadow-2xs">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* WHAT PRODUCTS ARE IN THIS COMBO — DETAILED BREAKDOWN LIST */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-[11px] uppercase tracking-wider font-extrabold text-amber-800 bg-amber-50 px-3 py-1 rounded-full border border-amber-200/70 inline-block">
                  Master Carton Contents
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-neutral-950 font-['Outfit']">
                  Products Included in This Combo ({combo.includedProducts.length} Items)
                </h3>
              </div>
              <span className="text-xs font-bold text-neutral-600 bg-white px-3.5 py-1.5 rounded-full border border-neutral-200 shadow-2xs">
                {combo.totalPieces} Pieces Total
              </span>
            </div>

            {/* Product Items Table / Cards */}
            <div className="space-y-3">
              {combo.includedProducts.map((prod) => (
                <div
                  key={prod.id}
                  className="bg-white border border-neutral-200/90 rounded-3xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-2xs hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={prod.image}
                      alt={prod.name}
                      className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border border-neutral-100 shadow-2xs shrink-0"
                    />
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono text-neutral-500 uppercase bg-neutral-100 px-2 py-0.5 rounded-full font-bold">
                          {prod.sku}
                        </span>
                        <span className="text-[11px] font-bold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200/60">
                          {prod.category}
                        </span>
                      </div>
                      <h4 className="font-extrabold text-sm sm:text-base text-neutral-950 font-['Outfit'] leading-snug">
                        {prod.name}
                      </h4>
                      {prod.specs && (
                        <p className="text-[11px] text-neutral-500 font-normal">
                          {prod.specs}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Quantity, Unit Price, and Item Subtotal */}
                  <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-neutral-100 gap-2 shrink-0">
                    <div className="inline-flex items-center gap-1.5 bg-[#FAF5EE] px-3 py-1 rounded-full border border-neutral-200/70 text-xs font-extrabold text-neutral-900">
                      <Package className="w-3.5 h-3.5 text-amber-600" />
                      <span>{prod.quantity} Pcs</span>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-black text-neutral-950 font-mono">
                        ₹{prod.totalPrice.toLocaleString('en-IN')}
                      </div>
                      <div className="text-[10px] text-neutral-400">
                        ₹{prod.unitPrice} / pc
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Pricing Breakdown & Sticky Buy / Cart Actions (5 cols) */}
        <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
          <div className="bg-[#FAF5EE] border border-neutral-200/90 rounded-3xl p-7 sm:p-8 space-y-6 shadow-sm">
            
            {/* Header / Discount Pill */}
            <div className="flex items-center justify-between pb-4 border-b border-neutral-200/80">
              <span className="text-xs font-black uppercase tracking-wider text-amber-800 font-['Outfit']">
                Wholesale Combo Pricing
              </span>
              <span className="px-3 py-1 rounded-full bg-emerald-600 text-white text-[11px] font-black uppercase tracking-wider shadow-2xs">
                {combo.discountPercentage}% Wholesale Discount
              </span>
            </div>

            {/* Price Calculations */}
            <div className="space-y-3">
              {/* Regular Price */}
              <div className="flex justify-between items-center text-xs text-neutral-500">
                <span>Standard Wholesale Price:</span>
                <span className="line-through font-mono text-sm">
                  ₹{combo.originalPrice.toLocaleString('en-IN')}
                </span>
              </div>

              {/* Discount Amount */}
              <div className="flex justify-between items-center text-xs text-emerald-700 font-bold">
                <span>Combo Bundle Discount ({combo.discountPercentage}% OFF):</span>
                <span className="font-mono text-sm">
                  - ₹{combo.savingsAmount.toLocaleString('en-IN')}
                </span>
              </div>

              {/* Final Combo Price */}
              <div className="pt-3 border-t border-neutral-200/80 flex justify-between items-baseline">
                <div>
                  <span className="text-xs uppercase font-extrabold text-neutral-900 block font-['Outfit']">
                    Offer Price (Per Bundle)
                  </span>
                  <span className="text-[10px] text-neutral-500">Includes all {combo.totalPieces} pieces</span>
                </div>
                <div className="text-right">
                  <span className="text-3xl font-black text-neutral-950 font-mono">
                    ₹{combo.comboPrice.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
            </div>

            {/* Retail Margin / Profit Estimation for Shopkeepers */}
            <div className="bg-white border border-neutral-200/80 rounded-2xl p-4 space-y-2 shadow-2xs">
              <div className="flex items-center justify-between text-xs">
                <span className="text-neutral-500">Estimated Retail MRP Total:</span>
                <span className="font-bold text-neutral-900 font-mono">
                  ₹{combo.estimatedRetailValue.toLocaleString('en-IN')}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs pt-1 border-t border-neutral-100">
                <span className="font-bold text-emerald-700">Estimated Shopkeeper Profit:</span>
                <span className="font-black text-emerald-700 font-mono text-sm">
                  ₹{(combo.estimatedRetailValue - combo.comboPrice).toLocaleString('en-IN')} ({combo.profitMargin})
                </span>
              </div>
            </div>

            {/* Bundle Quantity Selector */}
            <div className="space-y-2 pt-1">
              <label className="block text-xs uppercase font-bold text-neutral-700 tracking-wider">
                Select Number of Master Bundles
              </label>
              <div className="flex items-center justify-between bg-white border border-neutral-200 rounded-2xl p-2 shadow-2xs">
                <button
                  onClick={() => setBundleQuantity((q) => Math.max(1, q - 1))}
                  className="w-10 h-10 rounded-xl bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center text-neutral-700 font-bold cursor-pointer"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <div className="text-center">
                  <span className="text-base font-black text-neutral-950 font-mono">
                    {bundleQuantity} {bundleQuantity === 1 ? 'Bundle' : 'Bundles'}
                  </span>
                  <span className="block text-[10px] text-neutral-400">
                    ({combo.totalPieces * bundleQuantity} Total Assorted Pcs)
                  </span>
                </div>
                <button
                  onClick={() => setBundleQuantity((q) => q + 1)}
                  className="w-10 h-10 rounded-xl bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center text-neutral-700 font-bold cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Grand Total for Selected Bundles */}
            {bundleQuantity > 1 && (
              <div className="p-3 bg-amber-50/70 border border-amber-200/80 rounded-2xl flex justify-between items-center text-xs">
                <span className="font-bold text-amber-950">Grand Total ({bundleQuantity} Bundles):</span>
                <span className="font-black text-amber-950 text-base font-mono">
                  ₹{(combo.comboPrice * bundleQuantity).toLocaleString('en-IN')}
                </span>
              </div>
            )}

            {/* ACTION BUTTONS: ADD TO CART & BUY NOW */}
            <div className="space-y-3 pt-2">
              <button
                onClick={handleAddToCart}
                className="w-full py-3.5 px-6 rounded-full bg-white hover:bg-neutral-100 text-neutral-950 border border-neutral-300 font-extrabold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-xs hover:scale-[1.02] active:scale-95 cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4 text-amber-600" />
                <span>Add Bundle to Wholesale Cart</span>
              </button>

              <button
                onClick={handleBuyNow}
                className="w-full py-4 px-6 rounded-full bg-neutral-950 hover:bg-neutral-800 text-white font-extrabold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg hover:scale-[1.02] active:scale-95 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>Buy Now / Order Wholesale Lot</span>
              </button>
            </div>

            {/* Guarantees */}
            <div className="pt-2 border-t border-neutral-200/80 space-y-2 text-xs text-neutral-600">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Zero Risk • Inspected at Chennai Central Godown</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Free Transport Dispatch to your town across India</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>GST Tax Invoice with Full Input Tax Credit (ITC)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
