import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Calendar, 
  Tag, 
  Filter, 
  ArrowRight, 
  ArrowLeft,
  X,
  ChevronDown
} from 'lucide-react';
import { NEWS_ITEMS } from '../constants';
import { Button } from './Button';
import { NewsItem } from '../types';
import { fallbackData, getNewsRequest } from '../services/api';

interface NewsPageProps {
    onNavigate: (page: string) => void;
}

export const NewsPage: React.FC<NewsPageProps> = ({ onNavigate }) => {
  const [newsItems, setNewsItems] = useState<NewsItem[]>(NEWS_ITEMS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');
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

  useEffect(() => {
    const loadNews = async () => {
      try {
        const apiNews = await getNewsRequest();
        setNewsItems(apiNews);
      } catch {
        setNewsItems(fallbackData.news);
      }
    };

    loadNews();
  }, []);

  // Extract unique categories
  const categories = ['All', ...Array.from(new Set(newsItems.map(item => item.category)))];

  // Helper to parse date string "Oct 12, 2023" to Date object
  const parseDate = (dateStr: string) => {
    return new Date(dateStr);
  };

  const filteredNews = newsItems.filter(item => {
    const matchesSearch = 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      item.content.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;

    return matchesSearch && matchesCategory;
  }).sort((a, b) => {
    const dateA = parseDate(a.date).getTime();
    const dateB = parseDate(b.date).getTime();
    return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
  });

  return (
    <div className="pt-20 bg-slate-50 dark:bg-slate-950 min-h-screen transition-colors duration-300">
      
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <button 
             onClick={() => onNavigate('home')}
             className="flex items-center gap-2 text-slate-500 hover:text-cyan-600 dark:text-slate-400 dark:hover:text-cyan-400 mb-6 transition-colors"
           >
             <ArrowLeft className="w-4 h-4" /> Back to Home
           </button>
           <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
             News & <span className="text-cyan-600 dark:text-cyan-400">Insights</span>
           </h1>
           <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl">
             Stay updated with the latest product launches, company announcements, and technical guides from Focus Electrical.
           </p>
        </div>
      </div>

      {/* Toolbar */}
      <div className="sticky top-20 z-30 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
            
            {/* Search */}
            <div className="relative w-full md:w-96">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
               <input 
                 type="text" 
                 placeholder="Search articles..." 
                 className="w-full pl-9 pr-4 py-2.5 rounded-lg bg-slate-100 dark:bg-slate-800 border-none focus:ring-2 focus:ring-cyan-500 outline-none text-slate-900 dark:text-white"
                 value={searchQuery}
                 onChange={(e) => setSearchQuery(e.target.value)}
               />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-3 w-full md:w-auto items-center">
               <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-hide max-w-[calc(100vw-32px)] md:max-w-none">
                 {categories.map(cat => (
                   <button
                     key={cat}
                     onClick={() => setSelectedCategory(cat)}
                     className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                       selectedCategory === cat 
                         ? 'bg-cyan-600 text-white' 
                         : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700'
                     }`}
                   >
                     {cat}
                   </button>
                 ))}
               </div>
               
               <div className="w-px h-8 bg-slate-200 dark:bg-slate-800 hidden md:block"></div>

               <div className="relative">
                 <select 
                   className="appearance-none bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 py-2 pl-4 pr-10 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-cyan-500 cursor-pointer"
                   value={sortOrder}
                   onChange={(e) => setSortOrder(e.target.value as 'newest' | 'oldest')}
                 >
                   <option value="newest">Newest First</option>
                   <option value="oldest">Oldest First</option>
                 </select>
                 <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
               </div>
            </div>

          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {filteredNews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredNews.map((item, index) => (
              <div 
                key={index} 
                className="group cursor-pointer bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1" 
                onClick={() => setSelectedNews(item)}
              >
                <div className="relative h-56 overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur text-xs font-bold text-cyan-600 dark:text-cyan-400 px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                    {item.category}
                  </div>
                  <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/10 transition-colors duration-300"></div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-sm mb-3">
                    <Calendar className="w-4 h-4" />
                    <span>{item.date}</span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors mb-3 line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm line-clamp-3 mb-6 leading-relaxed">
                     {item.content}
                  </p>
                  <span className="inline-flex items-center text-sm font-bold text-cyan-600 dark:text-cyan-400 hover:underline">
                    Read Article <ArrowRight className="w-4 h-4 ml-1" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
           <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-full mb-4">
                <Search className="w-8 h-8 text-slate-400" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">No articles found</h3>
              <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto">
                We couldn't find any news articles matching your search for "{searchQuery}". Try a different keyword or category.
              </p>
              <Button 
                variant="outline" 
                className="mt-6"
                onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
              >
                Clear Filters
              </Button>
           </div>
        )}
      </div>

       {/* News Detail Modal (Reused) */}
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
                  <span className="flex items-center gap-1 bg-cyan-500/20 px-2 py-0.5 rounded text-cyan-300 border border-cyan-500/30 font-medium text-xs uppercase tracking-wide"><Tag className="w-3 h-3" /> {selectedNews.category}</span>
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

    </div>
  );
};