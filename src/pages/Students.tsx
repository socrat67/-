import React, { useState } from 'react';
import { Clock, BookOpen, Volume2, Globe, Sparkles, MessageSquare, Award } from 'lucide-react';
import { motion } from 'motion/react';

export const Students: React.FC<{ initialSection?: string }> = ({ initialSection = 'schedule' }) => {
  const [activeSection, setActiveSection] = useState(initialSection);

  const regularRings = [
    { lesson: '1 урок', range: '08:30 - 09:15' },
    { lesson: '2 урок', range: '09:25 - 10:10' },
    { lesson: '3 урок', range: '10:25 - 11:10', label: 'Велика перерва (обід)' },
    { lesson: '4 урок', range: '11:25 - 12:10', label: 'Велика перерва (обід)' },
    { lesson: '5 урок', range: '12:20 - 13:05' },
    { lesson: '6 урок', range: '13:15 - 14:00' },
    { lesson: '7 урок', range: '14:10 - 14:55' },
  ];

  const olympicSchedules = [
    { subject: 'Математика', level: 'II (Районний) етап', date: '08 листоп. 2026', status: 'Прийом заявок' },
    { subject: 'Українська мова', level: 'II (Районний) етап', date: '15 листоп. 2026', status: 'Прийом заявок' },
    { subject: 'Інформаційні технології', level: 'II (Районний) етап', date: '22 листоп. 2026', status: 'Прийом заявок' },
    { subject: 'Англійська мова', level: 'II (Районний) етап', date: '29 листоп. 2026', status: 'Прийом заявок' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1 space-y-10">
      {/* Page header */}
      <div className="text-center">
        <h1 className="text-2xl sm:text-4xl font-extrabold font-display text-slate-900 dark:text-white leading-tight">Куточок учня</h1>
        <p className="text-xs text-slate-500 max-w-xl mx-auto mt-2.5">
          Вся необхідна інформація для комфортного навчання в Павлівському ліцеї: розклади дзвінків, олімпіади та матеріали для дистанційних занять.
        </p>
      </div>

      {/* Group buttons */}
      <div className="flex border-b border-slate-200 dark:border-slate-850 overflow-x-auto whitespace-nowrap text-xs font-semibold gap-1">
        <button
          onClick={() => setActiveSection('schedule')}
          className={`py-3 px-4 border-b-2 transition-all cursor-pointer ${activeSection === 'schedule' ? 'border-school-blue-500 text-school-blue-600 font-bold' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
        >
          Розклад уроків та Дзвінків
        </button>
        <button
          onClick={() => setActiveSection('distance')}
          className={`py-3 px-4 border-b-2 transition-all cursor-pointer ${activeSection === 'distance' ? 'border-school-blue-500 text-school-blue-600 font-bold' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
        >
          Дистанційне навчання
        </button>
        <button
          onClick={() => setActiveSection('competitions')}
          className={`py-3 px-4 border-b-2 transition-all cursor-pointer ${activeSection === 'competitions' ? 'border-school-blue-500 text-school-blue-600 font-bold' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
        >
          Олімпіади & Конкурси
        </button>
        <button
          onClick={() => setActiveSection('council')}
          className={`py-3 px-4 border-b-2 transition-all cursor-pointer ${activeSection === 'council' ? 'border-school-blue-500 text-school-blue-600 font-bold' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
        >
          Учнівське самоврядування
        </button>
      </div>

      {/* Segment Contents */}
      <div className="bg-white dark:bg-slate-900 p-6 md:p-8 rounded-3xl border border-slate-150 dark:border-slate-800 shadow-xs">
        {activeSection === 'schedule' && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {/* Column 1: Time schedule lessons table */}
            <div className="space-y-4">
              <h2 className="text-sm font-bold font-display text-slate-900 dark:text-white flex items-center gap-2">
                <Clock className="w-4.5 h-4.5 text-school-blue-600" />
                Регламент / Розклад дзвінків
              </h2>
              <div className="overflow-x-auto rounded-xl border border-slate-150 dark:border-slate-850">
                <table className="min-w-full text-xs text-left divide-y divide-slate-150 dark:divide-slate-800">
                  <thead className="bg-slate-50 dark:bg-slate-950 text-slate-600 dark:text-slate-400 font-bold">
                    <tr>
                      <th className="py-2.5 px-4">Урок</th>
                      <th className="py-2.5 px-4 font-mono">Час проведення</th>
                      <th className="py-2.5 px-4">Примітка</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-150 dark:divide-slate-800 text-slate-705 dark:text-slate-305">
                    {regularRings.map((ring, index) => (
                      <tr key={index}>
                        <td className="py-2.5 px-4 font-semibold">{ring.lesson}</td>
                        <td className="py-2.5 px-4 font-mono">{ring.range}</td>
                        <td className="py-2.5 px-4 text-emerald-600 dark:text-emerald-400 font-medium">{ring.label || '-'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Column 2: Lessons timetable download info */}
            <div className="space-y-4 bg-slate-50 dark:bg-slate-950 p-5 rounded-2xl flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-xs uppercase tracking-wide text-slate-800 dark:text-slate-200 mb-2">Навчальний тиждень: Двотижнева сітка</h3>
                <p className="text-xs text-slate-500 leading-relaxed font-light">
                  Павлівський ліцей працює за 5-денним робочим регламентом. Усі класи поділяються на підгрупи при вивченні іноземних мов, інформатики та фізичної культури.
                </p>
                <div className="mt-4 p-3 bg-white dark:bg-slate-900 rounded-lg border flex items-center gap-3">
                  <Volume2 className="w-5 h-5 text-school-yellow-500 shrink-0" />
                  <span className="text-[11px] text-slate-450">Звук дзвінка у ліцеї подається автоматизованою музичною цифровою системою «Шкільний вальс».</span>
                </div>
              </div>
              
              <div className="mt-6">
                <a 
                  href="https://docs.google.com/document/d/1X_example_timetable/view"
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-school-blue-600 hover:bg-school-blue-700 text-white font-bold text-xs py-2.5 px-4 rounded-lg block text-center shadow-xs cursor-pointer"
                >
                  Переглянути повну сітку розкладу уроків ліцею на Google Drive ↗
                </a>
              </div>
            </div>
          </motion.div>
        )}

        {activeSection === 'distance' && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <h2 className="text-sm font-bold font-display text-slate-900 dark:text-white mb-2">Дистанційна та змішана освіта</h2>
            <p className="text-xs text-slate-500 leading-relaxed font-light">
              На випадок повітряних тривог, карантинних обмежень або несприятливих погодних умов у Павлівському ліцеї впроваджено повноцінне електронне середовище навчання. Ми використовуємо ліцензійні сервіси Google Workspace for Education.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              <div className="p-5 border border-slate-150 dark:border-slate-850 rounded-2xl space-y-3">
                <div className="p-2.5 bg-school-blue-100 text-school-blue-700 w-10 h-10 rounded-lg flex items-center justify-center">
                  <Globe className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-xs text-slate-850 dark:text-white">Google Classroom</h3>
                <p className="text-[11px] text-slate-500 leading-relaxed">Основне середовище для отримання щоденних домашніх та шкільних завдань, посилань на Zoom-конференції та проходження тестових робіт.</p>
                <a href="https://classroom.google.com" target="_blank" rel="noopener noreferrer" className="text-xs font-bold text-school-blue-600 hover:underline block pt-1.5">Увійти у Classroom ↗</a>
              </div>

              <div className="p-5 border border-slate-150 dark:border-slate-850 rounded-2xl space-y-3">
                <div className="p-2.5 bg-school-yellow-105 text-school-yellow-700 w-10 h-10 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-xs text-slate-850 dark:text-white">Електронні щоденники</h3>
                <p className="text-[11px] text-slate-500 leading-relaxed">Моніторинг оцінок учнів, відвідуваності та безпосередні зауваження керівників класів доступні у захищеному сервісі НІСО («Моя Школа»).</p>
                <a href="https://nz.ua" target="_blank" rel="noopener noreferrer" className="text-xs font-bold text-school-blue-600 hover:underline block pt-1.5">Авторизуватися в Ел. щоденнику ↗</a>
              </div>
            </div>
          </motion.div>
        )}

        {activeSection === 'competitions' && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <h2 className="text-sm font-bold font-display text-slate-900 dark:text-white flex items-center gap-2 mb-2">
              <Award className="w-5 h-5 text-school-yellow-500" />
              Шкільні олімпіади та творчі конкурси 2026 н.р.
            </h2>
            <p className="text-xs text-slate-500">
              Шановні ліцеїсти, починається реєстрація на Всеукраїнські предметні олімпіади. Нижче наведено перелік районних етапів. Звертайтеся до вчителів-предметників для включення у списки учасників.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {olympicSchedules.map((olymp, idx) => (
                <div key={idx} className="p-4 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-100 dark:border-slate-800 flex justify-between items-center text-xs">
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white">{olymp.subject}</h4>
                    <span className="text-[10px] text-slate-400 block mt-0.5">{olymp.level} — {olymp.date}</span>
                  </div>
                  <span className="bg-yellow-400/20 text-school-yellow-700 dark:text-school-yellow-300 font-bold px-2 py-0.5 rounded-full text-[9px] uppercase">{olymp.status}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {activeSection === 'council' && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <div className="flex flex-col lg:flex-row gap-8 items-center">
              <div className="space-y-4 lg:w-2/3">
                <h2 className="text-sm font-bold font-display text-slate-900 dark:text-white flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-school-yellow-501" />
                  Учнівське самоврядування «Світанок»
                </h2>
                <div className="space-y-3.5 text-xs text-slate-650 dark:text-slate-350 leading-relaxed font-light">
                  <p>
                    Самоврядування ліцею – це орган дитячого волевиявлення, що захищає та реалізує інтереси молоді. Наш президент обирається шляхом таємного загального голосування серед учнів 8-11 класів строком на 1 навчальний рік.
                  </p>
                  <p>
                    <strong>Головні напрямки діяльності «Світанок»:</strong> організація спортивних чемпіонатів на шкільному подвір’ї, благодійні акції на допомогу ЗСУ, видавництво шкільної газети «Голос Ліцею» та координація тематичних дискотек і літературних вечорів.
                  </p>
                </div>
              </div>
              <div className="p-6 bg-slate-50 dark:bg-slate-950 border border-slate-200/60 dark:border-slate-800 rounded-2xl lg:w-1/3 w-full text-center space-y-2">
                <div className="w-14 h-14 bg-school-blue-500 rounded-full flex items-center justify-center mx-auto text-white">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-xs text-slate-850 dark:text-white font-display">Тимчасовий лідер парламенту</h4>
                <p className="text-[11px] text-slate-500">Коваль Олексій Миколайович, учень 11-А класу.</p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};
