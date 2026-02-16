import React from 'react';
import { 
  Home, 
  Zap, 
  Lightbulb, 
  Factory, 
  Building2, 
  Wrench, 
  Smartphone, 
  ClipboardList 
} from 'lucide-react';

interface CategoryNavProps {
  onNavigate: (page: string, category?: string) => void;
}

const CATEGORIES = [
  { label: 'Home', icon: Home, category: 'All' },
  { label: 'Utilities', icon: Zap, category: 'Switches' },
  { label: 'Lighting', icon: Lightbulb, category: 'Lighting' },
  { label: 'Industrial', icon: Factory, category: 'Industrial' },
  { label: 'Commercial', icon: Building2, category: 'Distribution Boards' },
  { label: 'Tools', icon: Wrench, category: 'Tools' },
  { label: 'Smart', icon: Smartphone, category: 'Smart Home' },
  { label: 'Project Supply', icon: ClipboardList, category: 'Cables' },
];

export const CategoryNav: React.FC<CategoryNavProps> = ({ onNavigate }) => {
  return (
    <div className="pt-6 pb-10 bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-start md:justify-between items-start gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x">
          {CATEGORIES.map((item) => (
            <button 
              key={item.label} 
              onClick={() => onNavigate('products', item.category)}
              className="snap-center group flex flex-col items-center min-w-[70px] gap-3 cursor-pointer focus:outline-none"
            >
              <div className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center rounded-full bg-white dark:bg-slate-900 shadow-sm border border-slate-200 dark:border-slate-800 group-hover:shadow-md group-hover:border-red-500/30 dark:group-hover:border-red-500/30 group-hover:-translate-y-1 transition-all duration-300">
                 <item.icon className="w-5 h-5 sm:w-6 sm:h-6 text-slate-600 dark:text-slate-400 group-hover:text-red-600 dark:group-hover:text-red-400 stroke-[1.5] transition-colors" />
              </div>
              <span className="text-[11px] sm:text-xs font-medium text-slate-700 dark:text-slate-300 group-hover:text-red-700 dark:group-hover:text-red-400 whitespace-nowrap text-center transition-colors">
                {item.label}
              </span>
            </button>
          ))}
        </div>
      </div>
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
        .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};