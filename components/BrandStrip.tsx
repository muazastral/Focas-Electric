import React from 'react';
import { BRAND_NAMES } from '../constants';

export const BrandStrip: React.FC = () => {
  return (
    <div className="border-y border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 py-10 overflow-hidden transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 mb-6 text-center">
        <p className="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-500">
          Authorized Distributor & Trusted Supplier For Leading Brands
        </p>
      </div>
      
      <div className="relative flex overflow-x-hidden group">
        <div className="animate-marquee whitespace-nowrap flex space-x-12 px-4">
          {[...BRAND_NAMES, ...BRAND_NAMES].map((brand, index) => (
            <span key={`${brand}-${index}`} className="text-2xl font-bold text-slate-400 hover:text-slate-600 dark:text-slate-600 dark:hover:text-slate-300 transition-colors cursor-default">
              {brand}
            </span>
          ))}
        </div>
        
        <div className="absolute top-0 animate-marquee2 whitespace-nowrap flex space-x-12 px-4">
           {[...BRAND_NAMES, ...BRAND_NAMES].map((brand, index) => (
            <span key={`dup-${brand}-${index}`} className="text-2xl font-bold text-slate-400 hover:text-slate-600 dark:text-slate-600 dark:hover:text-slate-300 transition-colors cursor-default">
              {brand}
            </span>
          ))}
        </div>
      </div>
      
      <style>{`
        .animate-marquee {
          animation: marquee 25s linear infinite;
        }
        .animate-marquee2 {
          animation: marquee2 25s linear infinite;
        }
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-100%); }
        }
        @keyframes marquee2 {
          0% { transform: translateX(100%); }
          100% { transform: translateX(0%); }
        }
      `}</style>
    </div>
  );
};