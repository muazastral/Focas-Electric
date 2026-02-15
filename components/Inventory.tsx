import React from 'react';
import { ArrowRight } from 'lucide-react';
import { INVENTORY_CATEGORIES } from '../constants';
import { Button } from './Button';

export const Inventory: React.FC = () => {
  return (
    <section id="products" className="py-24 bg-slate-50 dark:bg-slate-950 relative transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
            Everything You Need — <br/>
            In One <span className="gradient-text">Electrical Store</span>
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            From residential upgrades to industrial projects, we supply a complete range of certified electrical and electronic products.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {INVENTORY_CATEGORIES.map((category, index) => (
            <div 
              key={index}
              className="group relative p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-cyan-500/50 dark:hover:border-cyan-500/50 transition-all duration-300 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:-translate-y-1 shadow-sm hover:shadow-md dark:shadow-none"
            >
              <div className="w-12 h-12 rounded-lg bg-cyan-100 dark:bg-cyan-900/30 flex items-center justify-center mb-6 group-hover:bg-cyan-200 dark:group-hover:bg-cyan-500/20 transition-colors">
                <category.icon className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{category.title}</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-6 text-sm">
                 Certified components ready for installation. High durability and compliance guaranteed.
              </p>
              <div className="flex items-center text-cyan-600 dark:text-cyan-400 text-sm font-medium group-hover:gap-2 transition-all">
                Browse Category <ArrowRight className="w-4 h-4 ml-1" />
              </div>
            </div>
          ))}
          
          {/* Last card CTA */}
          <div className="p-6 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 flex flex-col items-center justify-center text-center hover:border-cyan-500/50 transition-colors">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">View Full Catalog</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-6 text-sm">Download our latest price list and catalog.</p>
            <Button variant="outline" size="sm">Explore All</Button>
          </div>
        </div>

      </div>
    </section>
  );
};