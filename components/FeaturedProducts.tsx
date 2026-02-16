import React, { useState } from 'react';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { PRODUCTS } from '../constants';
import { useCart } from './CartContext';
import { Button } from './Button';

interface FeaturedProductsProps {
  onNavigate: (page: string) => void;
}

export const FeaturedProducts: React.FC<FeaturedProductsProps> = ({ onNavigate }) => {
  const { addToCart } = useCart();
  const [addedEffect, setAddedEffect] = useState<string | null>(null);

  // Filter to show only 'New' or specific items for the homepage display
  const featuredItems = PRODUCTS.filter(p => p.isNew || p.isSale).slice(0, 3);

  const handleAddToCart = (product: any, e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product);
    setAddedEffect(product.id);
    setTimeout(() => setAddedEffect(null), 1000);
  };

  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <div className="w-full max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-12">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6 px-2">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
              <span className="text-orange-600 dark:text-orange-500">New Arrivals.</span> <br />
              Take your pick.
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-lg max-w-xl">
              Check out the latest additions to our inventory. Upgrade your setup today.
            </p>
          </div>
          <button 
            onClick={() => onNavigate('products')}
            className="group flex items-center gap-1 text-red-600 dark:text-red-400 font-semibold hover:text-red-700 dark:hover:text-red-300 transition-colors"
          >
            View all models <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Apple Style Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {featuredItems.map((product) => (
            <div 
              key={product.id} 
              className="group bg-white dark:bg-slate-900 rounded-[32px] p-8 flex flex-col h-[520px] border border-slate-200 dark:border-slate-800 transition-all duration-300 hover:shadow-2xl cursor-pointer relative overflow-hidden"
              onClick={() => onNavigate('products')}
            >
              
              {/* Top Label */}
              <div className="flex flex-col items-start z-10">
                {product.isNew ? (
                  <span className="text-orange-600 dark:text-orange-500 text-[10px] font-bold uppercase tracking-wide mb-2">New</span>
                ) : product.isSale ? (
                  <span className="text-red-600 dark:text-red-500 text-[10px] font-bold uppercase tracking-wide mb-2">Sale</span>
                ) : (
                  <span className="h-[23px] block"></span> 
                )}
                
                <h3 className="text-3xl font-bold text-slate-900 dark:text-white leading-tight tracking-tight mb-1">
                  {product.name}
                </h3>
                <p className="text-slate-500 text-sm">{product.category}</p>
              </div>

              {/* Image */}
              <div className="flex-1 flex items-center justify-center relative my-4">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full max-h-[220px] object-contain transition-transform duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-105" 
                />
              </div>

              {/* Color Dots (Mock) */}
              <div className="flex justify-center gap-2 mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="w-3 h-3 rounded-full bg-slate-800 border border-slate-200 dark:border-slate-600"></div>
                <div className="w-3 h-3 rounded-full bg-slate-400 border border-slate-200 dark:border-slate-600"></div>
                {parseInt(product.id) % 2 === 0 && <div className="w-3 h-3 rounded-full bg-amber-200 border border-slate-200 dark:border-slate-600"></div>}
              </div>

              {/* Bottom Actions */}
              <div className="flex items-end justify-between mt-auto pt-4 border-t border-transparent group-hover:border-slate-100 dark:group-hover:border-slate-800 transition-colors">
                <div className="flex flex-col">
                  <span className="text-slate-900 dark:text-white font-semibold text-base">
                    From RM {product.price.toFixed(0)}
                  </span>
                  <span className="text-slate-500 text-[10px] mt-0.5">
                    or RM {(product.price / 24).toFixed(2)}/mo*
                  </span>
                </div>
                
                <button 
                  onClick={(e) => handleAddToCart(product, e)}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 transform active:scale-95 ${
                    addedEffect === product.id 
                    ? 'bg-green-600 text-white' 
                    : 'bg-red-600 text-white hover:bg-red-700'
                  }`}
                >
                  {addedEffect === product.id ? 'Added' : 'Buy'}
                </button>
              </div>

            </div>
          ))}
        </div>
        
        {/* Mobile View All */}
        <div className="mt-8 text-center md:hidden">
            <Button variant="outline" className="w-full" onClick={() => onNavigate('products')}>
                View All Products
            </Button>
        </div>

      </div>
    </section>
  );
};