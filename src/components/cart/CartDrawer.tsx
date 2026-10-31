import React from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck, MessageCircle } from 'lucide-react';
import { useStore } from '../../context/useStore';
import { COMPANY_INFO } from '../../data/companyData';

export const CartDrawer: React.FC = () => {
  const { cart, isCartOpen, closeCart, removeFromCart, updateCartQuantity, clearCart, cartTotal, cartItemCount } = useStore();

  if (!isCartOpen) return null;

  const handleWhatsAppOrder = () => {
    if (cart.length === 0) return;

    let text = `*New Wholesale Master Order Request - Joli Enterprises*\n\n`;
    text += `*Wholesale Items:*\n`;
    cart.forEach((item, index) => {
      text += `${index + 1}. ${item.name} (${item.badge || item.sku || 'Wholesale Lot'})\n`;
      text += `   - Quantity: ${item.quantity} ${item.type === 'combo' ? 'Bundle(s)' : 'Carton(s)'}\n`;
      text += `   - Price: ₹${item.price.toLocaleString('en-IN')} each\n`;
      text += `   - Subtotal: ₹${(item.price * item.quantity).toLocaleString('en-IN')}\n\n`;
    });
    text += `*Estimated Grand Total:* ₹${cartTotal.toLocaleString('en-IN')}\n\n`;
    text += `Please confirm stock availability at Chennai warehouse and transport booking details.`;

    const phoneClean = COMPANY_INFO.contact.phone.replace(/[^0-9]/g, '');
    const url = `https://wa.me/${phoneClean}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-neutral-950/60 backdrop-blur-xs transition-opacity animate-fade-in"
        onClick={closeCart}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF5EE] border-l border-neutral-200/90 shadow-2xl flex flex-col justify-between animate-slide-in-right">
          
          {/* Drawer Header */}
          <div className="p-6 bg-white border-b border-neutral-200/80 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-amber-500/10 text-amber-700 flex items-center justify-center">
                <ShoppingBag className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <h3 className="text-lg font-black text-neutral-950 font-['Outfit']">
                  Wholesale Cart
                </h3>
                <span className="text-xs text-neutral-500 font-medium">
                  {cartItemCount} {cartItemCount === 1 ? 'item' : 'items'} selected
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {cart.length > 0 && (
                <button
                  onClick={clearCart}
                  className="text-xs text-neutral-400 hover:text-red-600 px-2.5 py-1 rounded-full hover:bg-neutral-100 transition-colors font-medium cursor-pointer"
                >
                  Clear
                </button>
              )}
              <button
                onClick={closeCart}
                className="w-9 h-9 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center text-neutral-600 hover:text-neutral-950 transition-colors cursor-pointer"
                aria-label="Close cart"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="py-20 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-amber-100/60 text-amber-700 flex items-center justify-center mx-auto">
                  <ShoppingBag className="w-8 h-8 text-amber-600" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-base font-bold text-neutral-950">
                    Your wholesale cart is empty
                  </h4>
                  <p className="text-xs text-neutral-500 max-w-xs mx-auto">
                    Explore our wholesale starter bundles or product catalogue to add master carton lots.
                  </p>
                </div>
                <button
                  onClick={closeCart}
                  className="rounded-full bg-neutral-950 text-white text-xs font-bold uppercase tracking-wider px-6 py-2.5 hover:bg-neutral-800 transition-all cursor-pointer shadow-xs"
                >
                  Browse Catalogue
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="bg-white border border-neutral-200/90 rounded-2xl p-4 shadow-2xs flex gap-3.5 items-start transition-all hover:border-amber-300"
                >
                  {/* Thumbnail */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-18 h-18 rounded-xl object-cover border border-neutral-100 shrink-0"
                  />

                  {/* Details */}
                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex items-center justify-between gap-1">
                      {item.badge && (
                        <span className="text-[10px] uppercase font-bold tracking-wider text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200/60">
                          {item.badge}
                        </span>
                      )}
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-neutral-300 hover:text-red-600 p-1 transition-colors cursor-pointer"
                        title="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <h4 className="text-xs sm:text-sm font-extrabold text-neutral-950 line-clamp-2 leading-tight">
                      {item.name}
                    </h4>

                    {item.totalPieces && (
                      <div className="text-[11px] text-neutral-500 font-medium">
                        Contains {item.totalPieces} pcs master assortment
                      </div>
                    )}

                    <div className="pt-2 flex items-center justify-between">
                      <div className="flex items-center gap-2 bg-[#FAF5EE] rounded-full border border-neutral-200/80 px-2 py-1">
                        <button
                          onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                          className="w-5 h-5 rounded-full bg-white flex items-center justify-center text-neutral-700 hover:bg-neutral-200 cursor-pointer text-xs"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold text-neutral-900 px-1 font-mono">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                          className="w-5 h-5 rounded-full bg-white flex items-center justify-center text-neutral-700 hover:bg-neutral-200 cursor-pointer text-xs"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="text-right">
                        <div className="text-xs font-black text-neutral-950 font-mono">
                          ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                        </div>
                        <div className="text-[10px] text-neutral-400">
                          ₹{item.price.toLocaleString('en-IN')} / unit
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer / Checkout Actions */}
          {cart.length > 0 && (
            <div className="p-6 bg-white border-t border-neutral-200/90 space-y-4 shadow-lg">
              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-neutral-500">
                  <span>Subtotal:</span>
                  <span className="font-bold text-neutral-900 font-mono">
                    ₹{cartTotal.toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="flex justify-between text-neutral-500">
                  <span>Transport Dispatch:</span>
                  <span className="font-bold text-emerald-600">FREE To Local Town</span>
                </div>
                <div className="flex justify-between text-neutral-500">
                  <span>GST Billing:</span>
                  <span className="text-neutral-700 font-medium">Eligible for Full ITC</span>
                </div>
                <div className="pt-2 border-t border-neutral-100 flex justify-between items-baseline">
                  <span className="font-extrabold text-neutral-950 text-sm font-['Outfit']">
                    Estimated Total:
                  </span>
                  <span className="font-black text-xl text-neutral-950 font-mono">
                    ₹{cartTotal.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2.5 pt-1">
                <button
                  onClick={handleWhatsAppOrder}
                  className="w-full py-3.5 px-6 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-md hover:scale-[1.02] active:scale-95 cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Order Directly via WhatsApp</span>
                </button>

                <button
                  onClick={() => {
                    closeCart();
                    const el = document.getElementById('contact');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full py-3 px-6 rounded-full bg-neutral-950 hover:bg-neutral-800 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer"
                >
                  <span>Inquire via B2B Form</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="flex items-center justify-center gap-2 text-[10px] text-neutral-400 font-medium pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Zero Risk • Inspected at Chennai Central Godown</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

