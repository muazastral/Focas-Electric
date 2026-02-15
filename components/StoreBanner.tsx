import React from 'react';
import { ChevronRight } from 'lucide-react';

export const StoreBanner: React.FC = () => {
  return (
    <div className="relative pt-28 pb-10 overflow-hidden bg-white dark:bg-slate-950 transition-colors duration-300">
      {/* Background Gradient */}
      <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-orange-50/50 via-amber-50/30 to-orange-50/50 dark:from-slate-950 dark:via-amber-900/5 dark:to-slate-950 -z-10" />
      
      {/* Decorative Glows */}
      <div className="absolute top-1/2 left-1/3 w-96 h-96 bg-orange-300/20 dark:bg-orange-600/10 rounded-full blur-[100px] -translate-y-1/2" />
      <div className="absolute top-1/2 right-1/3 w-96 h-96 bg-yellow-200/30 dark:bg-yellow-600/10 rounded-full blur-[100px] -translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:h-[200px]">
          
          {/* Left: Heading */}
          <div className="flex-shrink-0 text-center md:text-left self-start md:self-center">
             <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white tracking-tight">
               Store<span className="text-amber-500">.</span>
             </h1>
             <p className="mt-2 text-slate-500 dark:text-slate-400 text-lg font-medium">
               The best way to buy electrical <br className="hidden md:block" /> supplies for your project.
             </p>
          </div>

          {/* Center: Image */}
          <div className="flex-1 flex justify-center relative w-full max-w-sm md:max-w-md">
              {/* Light Mode Image */}
              <img 
                src="ChatGPT Image Jan 21, 2026, 10_37_10 AM.png"
                alt="Featured Product" 
                className="w-full h-[180px] md:h-[240px] object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-700 block dark:hidden" 
              />
              {/* Dark Mode Image */}
              <img 
                src="darkmode.png"
                alt="Featured Product" 
                className="w-full h-[180px] md:h-[240px] object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-700 hidden dark:block" 
              />
          </div>

          {/* Right: Promotion */}
          <div className="flex-shrink-0 text-center md:text-right self-end md:self-center">
             <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-3">
               Power up your <br/>
               next big renovation.
             </h2>
             <div className="flex flex-col gap-2 items-center md:items-end text-sm font-medium text-cyan-600 dark:text-cyan-400">
               <a href="#" className="flex items-center hover:underline hover:text-cyan-700 dark:hover:text-cyan-300 transition-colors">
                 Connect with a Specialist <ChevronRight className="w-3 h-3 ml-1" />
               </a>
               <a href="#" className="flex items-center hover:underline hover:text-cyan-700 dark:hover:text-cyan-300 transition-colors">
                 Find a Store near you <ChevronRight className="w-3 h-3 ml-1" />
               </a>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};