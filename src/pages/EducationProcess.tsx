import React, { useState } from 'react';
import { Calendar, Award, BookOpen, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';

export const EducationProcess: React.FC<{ initialGroup?: string }> = ({ initialGroup = 'programs' }) => {
  const [activeGroup, setActiveGroup] = useState(initialGroup);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1 space-y-10">
      {/* Page header */}
      <div className="text-center">
        <h1 className="text-2xl sm:text-4xl font-extrabold font-display text-slate-900 dark:text-white leading-tight">Освітній процес</h1>
        <p className="text-xs text-slate-500 max-w-xl mx-auto mt-2.5">
          Нормативний опис та структура навчання у Закладі загальної середньої освіти І-ІІІ ст. с. Павлів відповідно до державного освітнього стандарту України.
        </p>
      </div>

      {/* Navigator buttons */}
      <div className="flex border-b border-slate-200 dark:border-slate-850 overflow-x-auto whitespace-nowrap text-xs font-semibold gap-1">
        <button
          onClick={() => setActiveGroup('programs')}
          className={`py-3 px-4 border-b-2 transition-all cursor-pointer ${activeGroup === 'programs' ? 'border-school-blue-500 text-school-blue-600 font-bold' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
        >
          Освітні програми та Плани
        </button>
        <button
          onClick={() => setActiveGroup('calendar')}
          className={`py-3 px-4 border-b-2 transition-all cursor-pointer ${activeGroup === 'calendar' ? 'border-school-blue-500 text-school-blue-600 font-bold' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
        >
          Календар навчального року
        </button>
        <button
          onClick={() => setActiveGroup('nush')}
          className={`py-3 px-4 border-b-2 transition-all cursor-pointer ${activeGroup === 'nush' ? 'border-school-blue-500 text-school-blue-600 font-bold' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
        >
          Нова Українська Школа (НУШ)
        </button>
        <button
          onClick={() => setActiveGroup('inclusive')}
          className={`py-3 px-4 border-b-2 transition-all cursor-pointer ${activeGroup === 'inclusive' ? 'border-school-blue-500 text-school-blue-600 font-bold' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
        >
          Інклюзія та безбар'єрність
        </button>
      </div>

      {/* Screen Frame content */}
      <div className="bg-white dark:bg-slate-900 p-6 md:p-8 rounded-3xl border border-slate-150 dark:border-slate-800 shadow-xs">
        
        {/* Programs */}
        {activeGroup === 'programs' && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <h2 className="text-sm font-bold font-display text-slate-900 dark:text-white flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-school-blue-600" />
              Освітні плани школи
            </h2>
            <div className="space-y-3 text-xs text-slate-500 leading-relaxed font-light">
              <p>
                Освітній процес у Закладі загальної середньої освіти І-ІІІ ст. с. Павлів розроблено на основі Типових освітніх програм, затверджених Міністерством освіти і науки України. Навчальний план охоплює три ступені освіти:
              </p>
              <ul className="list-decimal pl-5 space-y-1 text-slate-650 dark:text-slate-355 font-normal">
                <li><strong>Початкова школа (1-4 класи)</strong> — формування базових мовних, математичних та загальнокультурних компетентностей відповідно до стандартів НУШ-1 та НУШ-2.</li>
                <li><strong>Базова середня школа (5-9 класи)</strong> — розвиток наукового світогляду, профільне самовизначення, вивчення інноваційних СТЕМ-предметів та комп’ютерних технологій.</li>
                <li><strong>Профільна середня школа (10-11 класи)</strong> — поглиблене вивчення окремих предметів (філологічний та математичний профілі) для підготовки до успішного складання НМТ (ЗНО).</li>
              </ul>
            </div>
          </motion.div>
        )}

        {/* Academic Calendar */}
        {activeGroup === 'calendar' && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <h2 className="text-sm font-bold font-display text-slate-900 dark:text-white flex items-center gap-2">
              <Calendar className="w-5 h-5 text-school-blue-600" />
              Структура 2025/2026 навчального року
            </h2>
            <div className="space-y-3 text-xs text-slate-500 leading-relaxed font-light">
              <p>
                Навчальні заняття організовуються за семестровою системою за рішенням педагогічної ради школи:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs pt-1">
                <div className="p-4 bg-slate-50 dark:bg-slate-955 rounded-xl border border-slate-100 dark:border-slate-800">
                  <h4 className="font-bold text-slate-850 dark:text-white">I Семестр</h4>
                  <p className="text-slate-450 mt-1">з 1 вересня по 24 грудня 2025 року</p>
                </div>
                <div className="p-4 bg-slate-50 dark:bg-slate-955 rounded-xl border border-slate-100 dark:border-slate-800">
                  <h4 className="font-bold text-slate-850 dark:text-white">II Семестр</h4>
                  <p className="text-slate-450 mt-1">з 10 січня по 19 червня 2026 року</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* NUS detail */}
        {activeGroup === 'nush' && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
          >
            <h2 className="text-sm font-bold font-display text-slate-900 dark:text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-school-yellow-500" />
              Нова Українська Школа (НУШ) в дії
            </h2>
            <p className="text-xs text-slate-500 leading-relaxed font-light">
              НУШ – це не просто зміна підручників, це зовсім інший ментальний клімат у класі. Вся початкова ланка та 5-7 класи Закладу загальної середньої освіти І-ІІІ ст. с. Павлів навчаються за цим стандартом. Діти вчаться критично мислити, висловлювати власну позицію, не боятись робити помилки та розробляти власні спільні командні проекти з екології, дизайну та вирощування польових рослин на дослідній ділянці закладу.
            </p>
          </motion.div>
        )}

        {/* Inclusive schooling */}
        {activeGroup === 'inclusive' && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
          >
            <h2 className="text-sm font-bold font-display text-slate-900 dark:text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              Інклюзія, толерантність та доступність WCAG
            </h2>
            <p className="text-xs text-slate-500 leading-relaxed font-light">
              У Закладі загальної середньої освіти І-ІІІ ст. с. Павлів успішно працюють два інклюзивні класи. Для забезпечення якісної освіти дітей з особливими освітніми потребами створено службу супроводу, залучено асистентів вчителів та облаштовано кабінет сенсорної розвантажувальної терапії з пісочницями та сухими кульковими басейнами. Ми гарантуємо повну фізичну та цифрову доступність нашого закладу для кожного громадянина.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};
