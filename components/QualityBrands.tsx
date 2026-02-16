import React from 'react';
import { ShieldCheck, Award, ThumbsUp } from 'lucide-react';

export const QualityBrands: React.FC = () => {
  return (
    <section className="py-24 bg-white dark:bg-slate-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
          
          <div className="relative mb-12 lg:mb-0">
             <div className="absolute inset-0 bg-red-500/10 blur-3xl rounded-full transform -translate-x-1/2"></div>
             <img 
               src="/pdf-catalog/page-003/img-001.png" 
               alt="Quality Electrical Components" 
               className="relative rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 z-10 w-full object-cover aspect-square"
             />
             <div className="absolute -bottom-6 -right-6 glass-panel p-6 rounded-xl z-20 max-w-xs shadow-xl dark:shadow-none">
               <div className="flex items-center gap-4">
                 <div className="p-3 bg-red-500 rounded-full text-white">
                   <Award className="w-6 h-6" />
                 </div>
                 <div>
                   <p className="text-sm text-slate-500 dark:text-slate-400">Certified</p>
                   <p className="font-bold text-slate-900 dark:text-white">SIRIM Approved</p>
                 </div>
               </div>
             </div>
          </div>

          <div>
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
              Only Trusted Brands. <br/>
              <span className="text-red-600 dark:text-red-400">No Compromise.</span>
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">
              We partner directly with established manufacturers to ensure every product meets safety standards, durability requirements, and local compliance.
            </p>

            <div className="space-y-6">
              <div className="flex gap-4">
                <ShieldCheck className="w-6 h-6 text-red-600 dark:text-red-400 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-lg">Safety First</h4>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">All components meet strict Malaysian safety regulations (MS/IEC).</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <ThumbsUp className="w-6 h-6 text-red-600 dark:text-red-400 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-lg">Authenticity Guaranteed</h4>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">100% genuine products sourced directly from brand manufacturers.</p>
                </div>
              </div>
            </div>

            <div className="mt-10 pt-10 border-t border-slate-200 dark:border-slate-800">
               <p className="text-sm text-slate-500 mb-4">Official Partners:</p>
               <p className="text-slate-700 dark:text-slate-300 font-medium">
                 Panasonic • KDK • Schneider Electric • Legrand • Bosch • SJ Lite • Hitachi
               </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};