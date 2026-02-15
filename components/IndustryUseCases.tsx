import React from 'react';
import { USE_CASES } from '../constants';

export const IndustryUseCases: React.FC = () => {
  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Serving Every <span className="text-cyan-600 dark:text-cyan-400">Electrical Need</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-lg">Trusted by professionals across various sectors.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {USE_CASES.map((item, index) => (
            <div key={index} className="group relative rounded-xl overflow-hidden h-64 border border-slate-200 dark:border-slate-800 shadow-sm dark:shadow-none">
              <img 
                src={item.image} 
                alt={item.title} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 dark:opacity-60"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent"></div>
              
              <div className="absolute bottom-0 left-0 p-6 w-full">
                <div className="flex items-center gap-3 mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <div className="p-2 bg-cyan-600 dark:bg-cyan-500 rounded-lg">
                    <item.icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white">{item.title}</h3>
                </div>
                <div className="h-0 group-hover:h-auto overflow-hidden transition-all duration-300">
                  <p className="text-sm text-slate-200 mt-2 opacity-0 group-hover:opacity-100 transition-opacity delay-100">
                    Specialized supply solutions.
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};