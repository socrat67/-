import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { Image as ImageIcon, Video, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const Gallery: React.FC = () => {
  const { gallery } = useData();

  const [filter, setFilter] = useState('All');
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  // Dynamic tabs
  const albums = ['All', 'Наш Ліцей', 'Навчальний Процес', 'Свята та Фестивалі', 'Спорт та Дозвілля', 'Відеоархів'];

  const filteredItems = gallery.filter((item) => {
    if (filter === 'All') return true;
    if (filter === 'Відеоархів') return item.type === 'video';
    return item.album === filter && item.type === 'photo';
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1 space-y-8">
      {/* Page header */}
      <div className="text-center">
        <h1 className="text-2xl sm:text-4xl font-extrabold font-display text-slate-900 dark:text-white leading-tight">Медіагалерея ліцею</h1>
        <p className="text-xs text-slate-500 max-w-xl mx-auto mt-2.5">
          Пориньте у яскраву атмосферу наших буднів, унікальних уроків та святкових ліцейних концертів у Павлові.
        </p>
      </div>

      {/* Categories select options */}
      <div className="bg-white dark:bg-slate-900 p-3 rounded-2xl shadow-xs border border-slate-150 dark:border-slate-800/80 flex items-center justify-center overflow-x-auto whitespace-nowrap text-xs font-semibold gap-1">
        {albums.map((alb, index) => (
          <button
            key={index}
            onClick={() => setFilter(alb)}
            className={`px-4 py-2 rounded-xl transition-all cursor-pointer ${
              filter === alb 
              ? 'bg-school-blue-550 text-white shadow-xs' 
              : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            {alb === 'All' ? 'Показати все' : alb}
          </button>
        ))}
      </div>

      {/* Grid representation */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div 
            key={item.id}
            className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-150/60 dark:border-slate-800/80 shadow-xs flex flex-col justify-between hover:scale-[1.01] transition-all duration-300"
          >
            {item.type === 'photo' ? (
              <div 
                onClick={() => setSelectedPhoto(item.url)}
                className="h-56 bg-slate-100 cursor-pointer overflow-hidden relative group"
              >
                <img src={item.url} alt={item.title} className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <ImageIcon className="w-8 h-8 text-white" />
                </div>
              </div>
            ) : (
              <div className="h-56 bg-black relative">
                <iframe 
                  src={item.url} 
                  title={item.title}
                  className="w-full h-full" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                />
              </div>
            )}
            <div className="p-4 space-y-1 bg-slate-50/50 dark:bg-slate-900/60">
              <span className="text-[9px] bg-school-blue-50 dark:bg-school-blue-1000 text-school-blue-700 dark:text-school-blue-200 px-2 py-0.5 rounded-sm font-bold uppercase tracking-wider">
                {item.album}
              </span>
              <h4 className="font-bold text-xs text-slate-800 dark:text-white leading-snug pt-1 font-display line-clamp-1">{item.title}</h4>
            </div>
          </div>
        ))}
      </div>

      {/* Photo Expansion overlay dialog */}
      <AnimatePresence>
        {selectedPhoto && (
          <div 
            onClick={() => setSelectedPhoto(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xs cursor-zoom-out"
          >
            <div className="relative max-w-4xl w-full max-h-[85vh] rounded-xl overflow-hidden shadow-2xl bg-black">
              <button 
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-4 right-4 bg-slate-900/80 p-1.5 rounded-full text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
              <img src={selectedPhoto} alt="Zoomed view" className="w-full h-full object-contain mx-auto" />
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
