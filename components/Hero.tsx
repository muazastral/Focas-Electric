import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from './Button';

interface HeroProps {
  onNavigate: (page: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  return (
    <div className="relative py-20 lg:py-32 overflow-hidden bg-slate-50 dark:bg-slate-950 transition-colors duration-300 border-t border-slate-200 dark:border-slate-900">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-red-500/20 dark:bg-red-500/20 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-screen animate-pulse" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-red-600/20 dark:bg-red-600/20 rounded-full blur-[100px] mix-blend-multiply dark:mix-blend-screen" />
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-sm font-medium mb-8">
            <span className="w-2 h-2 rounded-full bg-red-500 dark:bg-red-400 animate-pulse"></span>
            Leading Electrical Distributor in Malaysia
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-6 leading-tight">
            Powering Homes, <br />
            Projects & Industries <br />
            <span className="gradient-text">Across Malaysia</span>
          </h1>
          
          <p className="mt-4 text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-10">
            Your trusted electrical & electronic supplier — delivering quality brands, competitive pricing, and reliable stock for homes, contractors, and businesses.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button variant="primary" size="lg" className="gap-2 group" onClick={() => onNavigate('products')}>
              Browse Products
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>

        {/* Hero Visual Abstract */}
        <div className="mt-20 relative">
          <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-transparent to-transparent dark:from-slate-950 z-10"></div>
          <div className="glass-panel p-2 rounded-2xl shadow-xl dark:shadow-none">
             <img 
               src="/pdf-catalog/page-001/img-001.png" 
               alt="Industrial Electrical Supply" 
               className="w-full h-[300px] md:h-[400px] object-cover rounded-xl opacity-80 hover:opacity-100 transition-opacity duration-700" 
             />
          </div>
        </div>
      </div>
    </div>
  );
};