import React, { useState, useEffect } from 'react';
import { ArrowRight, X, Calendar, Tag } from 'lucide-react';
import { NEWS_ITEMS } from '../constants';
import { Button } from './Button';
import { NewsItem } from '../types';

interface NewsProps {
    onNavigate: (page: string) => void;
}

export const News: React.FC<NewsProps> = ({ onNavigate }) => {
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedNews) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedNews]);

  // Only show first 3 items on homepage
  const displayedNews = NEWS_ITEMS.slice(0, 3);

  return (
    <section id="news" className="py-24 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Latest Updates</h2>
          <Button variant="outline" size="sm" className="hidden sm:flex" onClick={() => onNavigate('news')}>View All News</Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {displayedNews.map((item, index) => (
            <div key={index} className="group cursor-pointer" onClick={() => setSelectedNews(item)}>
              <div className="rounded-xl overflow-hidden mb-4 border border-slate-200 dark:border-slate-800 relative">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur text-xs font-bold text-red-600 dark:text-red-400 px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                  {item.category}
                </div>
              </div>
              <div className="flex items-center gap-2 text-slate-500 text-sm mb-2">
                <span>{item.date}</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors mb-2">
                {item.title}
              </h3>
              <span className="inline-flex items-center text-sm font-medium text-red-600 dark:text-red-500 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                Read More <ArrowRight className="w-4 h-4 ml-1" />
              </span>
            </div>
          ))}
        </div>
        
        <div className="mt-8 sm:hidden">
            <Button variant="outline" className="w-full" onClick={() => onNavigate('news')}>View All News</Button>
        </div>
      </div>

      {/* News Detail Modal */}
      {selectedNews && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200" onClick={() => setSelectedNews(null)}>
          <div className="bg-white dark:bg-slate-900 w-full max-w-2xl max-h-[85vh] rounded-2xl shadow-2xl overflow-hidden flex flex-col relative animate-in zoom-in-95 duration-200" onClick={e => e.stopPropagation()}>
            
            {/* Close Button */}
            <button 
              onClick={() => setSelectedNews(null)} 
              className="absolute top-4 right-4 z-10 p-2 bg-black/20 hover:bg-black/40 text-white rounded-full transition-colors backdrop-blur-sm"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header Image */}
            <div className="relative h-64 flex-shrink-0">
              <img src={selectedNews.image} alt={selectedNews.title} className="w-full h-full object-cover" />
              <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-slate-900/90 via-slate-900/50 to-transparent p-6 pt-16">
                <div className="flex items-center gap-3 text-white/90 text-sm mb-2">
                  <span className="flex items-center gap-1 font-medium"><Calendar className="w-4 h-4" /> {selectedNews.date}</span>
                  <span className="flex items-center gap-1 bg-red-500/15 px-2 py-0.5 rounded text-red-100 border border-red-400/40 font-medium text-xs uppercase tracking-wide"><Tag className="w-3 h-3" /> {selectedNews.category}</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-white leading-tight shadow-sm">{selectedNews.title}</h3>
              </div>
            </div>

            {/* Scrollable Content */}
            <div className="p-6 md:p-8 overflow-y-auto">
              <div className="prose dark:prose-invert prose-slate max-w-none">
                {selectedNews.content.split('\n').map((paragraph, idx) => (
                    <p key={idx} className="mb-4 text-slate-600 dark:text-slate-300 leading-relaxed text-base">
                        {paragraph}
                    </p>
                ))}
              </div>
              <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 flex justify-end">
                <Button onClick={() => setSelectedNews(null)}>Close Article</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};