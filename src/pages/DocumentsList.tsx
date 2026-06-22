import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { FileText, Search, Download, ExternalLink, Calendar } from 'lucide-react';
import { motion } from 'motion/react';

export const DocumentsList: React.FC = () => {
  const { documents } = useData();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const categories = [
    { value: 'all', label: 'Усі документи' },
    { value: 'statut', label: 'Статут закладу' },
    { value: 'licence', label: 'Ліцензії' },
    { value: 'programs', label: 'Освітні програми' },
    { value: 'plan', label: 'Річні плани' },
    { value: 'finance', label: 'Фінансова звітність' },
    { value: 'public', label: 'Публічна інформація' }
  ];

  const filteredDocs = documents.filter((doc) => {
    const matchesCategory = activeCategory === 'all' || doc.category === activeCategory;
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1 space-y-8">
      {/* Title */}
      <div className="text-center">
        <h1 className="text-2xl sm:text-4xl font-extrabold font-display text-slate-900 dark:text-white leading-tight">Офіційні Документи та Звіти</h1>
        <p className="text-xs text-slate-500 max-w-xl mx-auto mt-2.5">
          Публічний доступ до статутних документів, ліцензій, річних фінансових кошторисів та звітів про використання коштів відповідно до ст. 30 Закону України «Про освіту».
        </p>
      </div>

      {/* Control bar */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl shadow-xs border border-slate-150 dark:border-slate-800 flex flex-col lg:flex-row gap-4 items-center justify-between">
        
        {/* Document categories filters */}
        <div className="flex gap-1 overflow-x-auto w-full lg:w-auto pb-1 lg:pb-0 whitespace-nowrap text-xs font-semibold">
          {categories.map((cat, id) => (
            <button
              key={id}
              onClick={() => setActiveCategory(cat.value)}
              className={`px-3 py-1.5 rounded-full border transition-all cursor-pointer ${
                activeCategory === cat.value
                ? 'bg-school-blue-500 text-white border-school-blue-500'
                : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full lg:max-w-xs shrink-0">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Пошук документа за назвою..."
            className="w-full text-xs pl-9 pr-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-105"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
        </div>
      </div>

      {/* Documents Grid */}
      {filteredDocs.length === 0 ? (
        <div className="text-center py-10 text-slate-400 text-xs font-semibold">
          Жодного документа в даній категорії не знайдено за вашим запитом.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredDocs.map((doc) => (
            <div 
              key={doc.id} 
              className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-150 dark:border-slate-800 shadow-xs hover:shadow-md transition-shadow flex items-start gap-4"
            >
              <div className="w-12 h-12 bg-school-blue-50 dark:bg-school-blue-950/40 rounded-xl flex items-center justify-center shrink-0 border border-school-blue-105/30">
                <FileText className="w-5 h-5 text-school-blue-600 dark:text-school-blue-400" />
              </div>
              <div className="flex-1 min-w-0 flex flex-col justify-between h-full space-y-2">
                <div>
                  <h3 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white leading-snug line-clamp-2">
                    {doc.title}
                  </h3>
                  <div className="flex items-center gap-2.5 text-[10px] text-slate-400 mt-1">
                    <span className="bg-slate-100 dark:bg-slate-800 text-[9px] uppercase px-1.5 py-0.5 rounded-sm text-slate-50s font-semibold">{doc.category}</span>
                    <span>Розмір: {doc.size}</span>
                  </div>
                </div>
                <div className="pt-2 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between text-[11px]">
                  <span className="text-slate-400 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    Завантажено: {doc.dateAdded}
                  </span>
                  <a
                    href={doc.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-school-blue-600 hover:underline flex items-center gap-1 font-semibold"
                  >
                    <span>Відкрити у Drive</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
