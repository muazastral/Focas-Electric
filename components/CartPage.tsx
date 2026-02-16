import React, { useState } from 'react';
import {
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  ArrowLeft,
  ArrowRight,
  ShoppingBag,
  CreditCard,
  Truck,
  Shield,
  Tag,
  X,
} from 'lucide-react';
import { Button } from './Button';
import { useCart } from './CartContext';
import { useAuth } from './AuthContext';

interface CartPageProps {
  onNavigate?: (page: string) => void;
}

export const CartPage: React.FC<CartPageProps> = ({ onNavigate }) => {
  const { cart, removeFromCart, updateQuantity, cartTotal, cartCount, clearCart } = useCart();
  const { user } = useAuth();
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);

  const shipping = cartTotal > 200 ? 0 : 15;
  const discount = promoApplied ? cartTotal * 0.1 : 0;
  const finalTotal = cartTotal - discount + shipping;

  const handleApplyPromo = () => {
    if (promoCode.toLowerCase() === 'focus10') {
      setPromoApplied(true);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="pt-20 min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors">
        <div className="max-w-4xl mx-auto px-4 py-20 text-center">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-slate-100 dark:bg-slate-900 flex items-center justify-center">
            <ShoppingCart className="w-12 h-12 text-slate-300 dark:text-slate-700" />
          </div>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">Your Cart is Empty</h2>
          <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-md mx-auto">
            Looks like you haven't added any products yet. Browse our catalog and find quality electrical supplies.
          </p>
          <Button size="lg" className="gap-2" onClick={() => onNavigate?.('products')}>
            <ShoppingBag className="w-5 h-5" /> Browse Products
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Shopping Cart</h1>
            <p className="text-slate-500 dark:text-slate-400 mt-1">{cartCount} item{cartCount !== 1 ? 's' : ''} in your cart</p>
          </div>
          <button
            onClick={() => onNavigate?.('products')}
            className="flex items-center gap-2 text-sm font-medium text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Continue Shopping
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {/* Table Header */}
            <div className="hidden md:grid md:grid-cols-12 gap-4 px-6 py-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              <div className="col-span-6">Product</div>
              <div className="col-span-2 text-center">Price</div>
              <div className="col-span-2 text-center">Quantity</div>
              <div className="col-span-2 text-right">Total</div>
            </div>

            {/* Items */}
            {cart.map((item) => (
              <div
                key={item.cartKey}
                className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4 md:p-6 transition-all hover:shadow-md"
              >
                <div className="grid md:grid-cols-12 gap-4 items-center">
                  {/* Product Info */}
                  <div className="md:col-span-6 flex items-center gap-4">
                    <div className="w-20 h-20 flex-shrink-0 bg-slate-50 dark:bg-slate-800 rounded-xl flex items-center justify-center overflow-hidden">
                      <img src={item.image} alt={item.name} className="w-full h-full object-contain p-2" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold text-slate-900 dark:text-white text-sm line-clamp-2 mb-1">{item.name}</h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{item.category} · {item.brand}</p>
                      {item.selectedOptions && (
                        <div className="flex flex-wrap gap-1 mt-1">
                          {Object.entries(item.selectedOptions).filter(([,v]) => v).map(([k, v]) => (
                            <span key={k} className="text-[10px] px-1.5 py-0.5 rounded bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border border-red-100 dark:border-red-900/30">
                              {v}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Price */}
                  <div className="md:col-span-2 text-center">
                    <span className="md:hidden text-xs text-slate-400 mr-2">Price:</span>
                    <span className="font-semibold text-slate-900 dark:text-white">
                      RM {item.price.toFixed(2)}
                    </span>
                    {item.originalPrice && (
                      <span className="block text-xs text-slate-400 line-through">
                        RM {item.originalPrice.toFixed(2)}
                      </span>
                    )}
                  </div>

                  {/* Quantity */}
                  <div className="md:col-span-2 flex items-center justify-center">
                    <div className="flex items-center bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                      <button
                        onClick={() => updateQuantity(item.cartKey, item.quantity - 1)}
                        className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-l-lg transition-colors"
                      >
                        <Minus className="w-3.5 h-3.5 text-slate-600 dark:text-slate-400" />
                      </button>
                      <span className="w-10 text-center text-sm font-bold text-slate-900 dark:text-white">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.cartKey, item.quantity + 1)}
                        className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-r-lg transition-colors"
                      >
                        <Plus className="w-3.5 h-3.5 text-slate-600 dark:text-slate-400" />
                      </button>
                    </div>
                  </div>

                  {/* Subtotal & Remove */}
                  <div className="md:col-span-2 flex items-center justify-end gap-3">
                    <span className="font-bold text-slate-900 dark:text-white">
                      RM {(item.price * item.quantity).toFixed(2)}
                    </span>
                    <button
                      onClick={() => removeFromCart(item.cartKey)}
                      className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                      title="Remove"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {/* Clear cart */}
            <div className="flex justify-end pt-2">
              <button
                onClick={clearCart}
                className="flex items-center gap-2 text-sm text-slate-500 hover:text-red-600 dark:text-slate-400 dark:hover:text-red-400 transition-colors"
              >
                <X className="w-4 h-4" /> Clear Cart
              </button>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sticky top-24">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Order Summary</h3>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500 dark:text-slate-400">Subtotal ({cartCount} items)</span>
                  <span className="font-medium text-slate-900 dark:text-white">RM {cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500 dark:text-slate-400">Shipping</span>
                  <span className={`font-medium ${shipping === 0 ? 'text-green-600' : 'text-slate-900 dark:text-white'}`}>
                    {shipping === 0 ? 'FREE' : `RM ${shipping.toFixed(2)}`}
                  </span>
                </div>
                {promoApplied && (
                  <div className="flex justify-between text-sm">
                    <span className="text-green-600 flex items-center gap-1"><Tag className="w-3 h-3" /> Discount (10%)</span>
                    <span className="font-medium text-green-600">-RM {discount.toFixed(2)}</span>
                  </div>
                )}
                <hr className="border-slate-100 dark:border-slate-800" />
                <div className="flex justify-between">
                  <span className="font-bold text-slate-900 dark:text-white">Total</span>
                  <span className="text-xl font-bold text-slate-900 dark:text-white">RM {finalTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Promo Code */}
              <div className="mb-6">
                <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-2">Promo Code</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Enter code"
                    className="flex-1 px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-red-500 outline-none"
                    disabled={promoApplied}
                  />
                  <Button size="sm" variant="outline" onClick={handleApplyPromo} disabled={promoApplied || !promoCode}>
                    {promoApplied ? 'Applied' : 'Apply'}
                  </Button>
                </div>
                {promoApplied && (
                  <p className="text-xs text-green-600 mt-1.5">FOCUS10 applied — 10% off!</p>
                )}
              </div>

              {/* Shipping note */}
              {shipping > 0 && (
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 bg-amber-50 dark:bg-amber-900/10 p-3 rounded-lg border border-amber-100 dark:border-amber-900/20">
                  Add RM {(200 - cartTotal).toFixed(2)} more for <span className="font-bold text-amber-700 dark:text-amber-400">FREE shipping</span>
                </p>
              )}

              {/* Checkout Button */}
              <Button size="lg" className="w-full gap-2 mb-3" onClick={() => {
                if (!user) {
                  onNavigate?.('login');
                }
                // TODO: checkout flow
              }}>
                <CreditCard className="w-5 h-5" /> {user ? 'Proceed to Checkout' : 'Login to Checkout'}
              </Button>

              {user && (
                <button
                  onClick={() => onNavigate?.('my-orders')}
                  className="w-full text-center text-sm text-slate-500 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 transition-colors py-2"
                >
                  View My Orders →
                </button>
              )}

              {/* Trust badges */}
              <div className="grid grid-cols-2 gap-3 mt-6 pt-6 border-t border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                  <Truck className="w-4 h-4 text-red-500 flex-shrink-0" />
                  <span>Fast Delivery</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                  <Shield className="w-4 h-4 text-red-500 flex-shrink-0" />
                  <span>Secure Payment</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
