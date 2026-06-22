import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { Search, Mail, Phone, Award, User, Clock } from 'lucide-react';
import { motion } from 'motion/react';

export const Teachers: React.FC = () => {
  const { teachers } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('All');

  // Subjects filter lists
  const subjects = ['All', 'Українська мова та література', 'Математика, Інформатика', 'Історія України, Правознавство', 'Фізика, Астрономія', 'Англійська та Німецька мови', 'Біологія, Географія'];

  const filteredTeachers = teachers.filter((t) => {
    const matchesSearch = t.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject = selectedSubject === 'All' || t.subject === selectedSubject;
    return matchesSearch && matchesSubject;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1 space-y-8">
      {/* Page header */}
      <div className="text-center">
        <h1 className="text-2xl sm:text-4xl font-extrabold font-display text-slate-900 dark:text-white leading-tight">Педагогічний колектив</h1>
        <p className="text-xs text-slate-500 max-w-xl mx-auto mt-2.5">
          Знайомтеся з нашими висококваліфікованими викладачами та класними керівниками Павлівського ліцею.
        </p>
      </div>

      {/* Filter and Search bars */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl shadow-xs border border-slate-150 dark:border-slate-800 flex flex-col md:flex-row gap-4 items-center justify-between">
        
        {/* Search Input */}
        <div className="relative w-full md:max-w-xs">
          <input 
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Пошук вчителя за ім'ям..."
            className="w-full text-xs pl-9 pr-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-100"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
        </div>

        {/* Categories scroll */}
        <div className="flex gap-1 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 whitespace-nowrap text-xs font-semibold">
          {subjects.map((subj, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedSubject(subj)}
              className={`px-3 py-1.5 rounded-full border transition-all cursor-pointer ${
                selectedSubject === subj 
                ? 'bg-school-blue-500 text-white border-school-blue-500' 
                : 'bg-slate-50 dark:bg-slate-800/60 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700'
              }`}
            >
              {subj === 'All' ? 'Усі предмети' : subj}
            </button>
          ))}
        </div>
      </div>

      {/* Grid Display */}
      {filteredTeachers.length === 0 ? (
        <div className="text-center py-12 text-slate-400">
          <p className="text-xs font-semibold">На жаль, за вашим запитом жодного педпрацівника не знайдено.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTeachers.map((teacher) => (
            <div key={teacher.id} className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-150/60 dark:border-slate-800/80 shadow-xs flex flex-col hover:scale-101 hover:shadow-md transition-all">
              <div className="h-56 bg-slate-100">
                <img src={teacher.photo} alt={teacher.name} className="w-full h-full object-cover" />
              </div>
              <div className="p-4 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <span className="text-[9px] font-bold text-school-blue-700 dark:text-school-blue-300 uppercase tracking-wider block">
                    {teacher.subject}
                  </span>
                  <h3 className="font-bold text-xs sm:text-sm text-slate-850 dark:text-white leading-tight font-display">{teacher.name}</h3>
                  <p className="text-[11px] text-slate-500 font-light leading-relaxed">
                    <strong>Кваліфікаційне звання:</strong> {teacher.category}
                  </p>
                </div>

                <div className="pt-3.5 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[11px]">
                  <span className="text-slate-400 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 shrink-0" />
                    Стаж: {teacher.experience} р.
                  </span>
                  <a 
                    href={`mailto:${teacher.email}`}
                    className="text-school-blue-600 hover:underline flex items-center gap-1.5 font-mono"
                    title="Написати листа"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    Написати
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
