import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { Search, Eye, Calendar, ArrowRight, X, Heart, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const NewsList: React.FC = () => {
  const { news, incrementNewsViews } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  // News Expansion modal
  const [expandedNews, setExpandedNews] = useState<typeof news[0] | null>(null);
  const [liked, setLiked] = useState<string[]>([]);
  
  const categories = ['All', 'Події', 'Оголошення', 'Досягнення'];

  const handleNewsClick = (item: typeof news[0]) => {
    incrementNewsViews(item.id);
    setExpandedNews(item);
  };

  const handleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (liked.includes(id)) {
      setLiked(prev => prev.filter(item => item !== id));
    } else {
      setLiked(prev => [...prev, id]);
    }
  };

  const filteredNews = news.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1 space-y-8">
      {/* Page header */}
      <div className="text-center">
        <h1 className="text-2xl sm:text-4xl font-extrabold font-display text-slate-900 dark:text-white leading-tight">Стрічка новин та Оголошень</h1>
        <p className="text-xs text-slate-500 max-w-xl mx-auto mt-2.5">
          Стежте за останніми заходами, святами, зборами та перемогами учнівського та педагогічного колективів Павлівського ліцею.
        </p>
      </div>

      {/* Control bar */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl shadow-xs border border-slate-150 dark:border-slate-800 flex flex-col md:flex-row gap-4 items-center justify-between">
        
        {/* Search Input */}
        <div className="relative w-full md:max-w-xs">
          <input 
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Шукати в новинах..."
            className="w-full text-xs pl-9 pr-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-101 focus:outline-hidden"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
        </div>

        {/* Categories scroll filter */}
        <div className="flex gap-1 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 whitespace-nowrap text-xs font-semibold">
          {categories.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-full border transition-all cursor-pointer ${
                selectedCategory === cat 
                ? 'bg-school-blue-500 text-white border-school-blue-500' 
                : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700'
              }`}
            >
              {cat === 'All' ? 'Всі новини' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid view lists */}
      {filteredNews.length === 0 ? (
        <div className="text-center py-12 text-slate-400 text-xs font-semibold">
          Публікацій за вашим пошуком не знайдено.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNews.map((item) => (
            <article 
              key={item.id} 
              onClick={() => handleNewsClick(item)}
              className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-150 dark:border-slate-800/80 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow cursor-pointer group"
            >
              <div>
                <div className="h-48 bg-slate-200 overflow-hidden relative">
                  <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500" />
                  <span className="absolute top-3 left-3 text-[10px] bg-slate-900/80 text-white backdrop-blur-xs px-2.5 py-0.5 rounded-full font-bold uppercase">
                    {item.category}
                  </span>
                </div>
                <div className="p-4 space-y-3">
                  <span className="text-[10px] text-slate-400 flex items-center gap-1 font-mono">
                    <Calendar className="w-3.5 h-3.5" />
                    {item.date}
                  </span>
                  <h3 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white leading-snug line-clamp-2 group-hover:text-school-blue-600 font-display">
                    {item.title}
                  </h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 font-light leading-relaxed line-clamp-3">
                    {item.excerpt}
                  </p>
                </div>
              </div>

              {/* Lower info */}
              <div className="px-4 py-3 border-t border-slate-100 dark:border-slate-800/85 flex items-center justify-between text-[11px] text-slate-400">
                <div className="flex space-x-3">
                  <span className="flex items-center gap-1"><Eye className="w-4 h-4" /> {item.views}</span>
                  <button 
                    onClick={(e) => handleLike(item.id, e)}
                    className={`flex items-center gap-1 ${liked.includes(item.id) ? 'text-red-500' : ''}`}
                  >
                    <Heart className={`w-3.5 h-3.5 ${liked.includes(item.id) ? 'fill-current' : ''}`} />
                    <span>{liked.includes(item.id) ? 1 : 0}</span>
                  </button>
                </div>
                <span className="text-school-blue-600 font-bold group-hover:translate-x-1 transition-transform flex items-center gap-0.5">
                  Читати
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* Expand single News Modal */}
      <AnimatePresence>
        {expandedNews && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white dark:bg-slate-900 max-w-2xl w-full rounded-2xl shadow-2xl overflow-hidden max-h-[85vh] flex flex-col border border-slate-150 dark:border-slate-800"
            >
              <div className="p-4 bg-slate-50 dark:bg-slate-950 border-b flex items-center justify-between">
                <span className="text-[10px] bg-school-blue-50 dark:bg-school-blue-950 text-school-blue-700 dark:text-school-blue-300 font-bold uppercase py-0.5 px-2.5 rounded-full">
                  {expandedNews.category}
                </span>
                <button 
                  onClick={() => setExpandedNews(null)}
                  className="p-1 hover:bg-slate-100 dark:hover:bg-slate-805 rounded-full cursor-pointer text-slate-400"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                <div className="h-56 w-full rounded-xl overflow-hidden bg-slate-200">
                  <img src={expandedNews.imageUrl} alt={expandedNews.title} className="w-full h-full object-cover" />
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] text-slate-400 block font-mono">Дата публікації: {expandedNews.date}</span>
                  <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white font-display leading-snug">{expandedNews.title}</h2>
                </div>
                <div className="text-xs text-slate-650 dark:text-slate-350 leading-relaxed font-light space-y-3">
                  <p className="font-semibold text-slate-800 dark:text-slate-200">{expandedNews.excerpt}</p>
                  <p className="whitespace-pre-line">{expandedNews.content}</p>
                </div>
              </div>

              <div className="p-4 border-t bg-slate-50 dark:bg-slate-950 flex items-center justify-between text-xs text-slate-400">
                <span>Життя Павлівського Ліцею • {new Date().getFullYear()}</span>
                <span>{expandedNews.views} переглядів</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
