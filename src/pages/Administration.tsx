import React from 'react';
import { Mail, Phone, Calendar, Clock, Award, ShieldCheck, HeartPulse } from 'lucide-react';
import { motion } from 'motion/react';

export const Administration: React.FC = () => {
  const admins = [
    {
      name: 'Татарчук Любов Миколаївна',
      role: 'Директорка ЗЗСО І-ІІІ ст. с. Павлів',
      photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=350',
      education: 'Кандидатка педагогічних наук, вчителька вищої категорії, педагогічний досвід — 31 рік',
      awards: 'Нагрудний знак «Відмінник освіти України», Грамота МОН України',
      phone: '+38 (067) 123-45-67',
      email: 'l.tatarvhuk@pavliv.school.ukr.education'
    },
    {
      name: 'Михайлюк Андрій Сергійович',
      role: 'Заступник директора з навчально-виховної роботи',
      photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=350',
      education: 'Житомирський педагогічний інститут, вчитель математики вищої категорії, стаж — 24 роки',
      awards: 'Грамота обласного управління освіти Львівської ОДА',
      phone: '+38 (097) 987-65-43',
      email: 'a.mykhailiuk@pavliv.school.ukr.education'
    },
    {
      name: 'Панасюк Галина Петрівна',
      role: 'Заступниця директора з виховної роботи',
      photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=350',
      education: 'Рівненський університет, вчителька початкових класів та музики, стаж — 19 років',
      awards: 'Подяка Радехівського міського голови',
      phone: '+38 (050) 456-78-90',
      email: 'h.panasiuk@pavliv.school.ukr.education'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1 space-y-12">
      {/* Page Heading */}
      <div className="text-center">
        <h1 className="text-2xl sm:text-4xl font-extrabold font-display text-slate-900 dark:text-white leading-tight">Адміністрація закладу</h1>
        <p className="text-xs text-slate-500 max-w-xl mx-auto mt-2.5">
          Керівний склад закладу, який щодня забезпечує високі стандарти навчального, морального та безпекового процесу учнів.
        </p>
      </div>

      {/* Admins Grid Display */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {admins.map((admin, idx) => (
          <div key={idx} className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-150 dark:border-slate-800 shadow-xs flex flex-col hover:shadow-md transition-shadow">
            <div className="h-64 bg-slate-200">
              <img src={admin.photo} alt={admin.name} className="w-full h-full object-cover" />
            </div>
            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <span className="text-[10px] bg-school-blue-50 dark:bg-school-blue-950 text-school-blue-700 dark:text-school-blue-300 font-bold uppercase py-0.5 px-2.5 rounded-full inline-block mb-2">
                  {admin.role}
                </span>
                <h3 className="font-bold text-sm text-slate-900 dark:text-white font-display leading-tight">{admin.name}</h3>
                
                <div className="text-xs text-slate-500 mt-3 font-light leading-relaxed space-y-2">
                  <p className="flex items-start gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-slate-450 shrink-0 mt-0.5" />
                    <span><strong>Освіта та досвід:</strong> {admin.education}</span>
                  </p>
                  <p className="flex items-start gap-1.5">
                    <Award className="w-4 h-4 text-school-yellow-500 shrink-0 mt-0.5" />
                    <span><strong>Звання / Нагороди:</strong> {admin.awards}</span>
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2 text-xs">
                <a href={`tel:${admin.phone}`} className="flex items-center gap-2 text-slate-600 dark:text-slate-300 hover:text-school-blue-500 transition-colors">
                  <Phone className="w-3.5 h-3.5" />
                  <span>{admin.phone}</span>
                </a>
                <a href={`mailto:${admin.email}`} className="flex items-center gap-2 text-slate-600 dark:text-slate-300 hover:text-school-blue-500 transition-colors">
                  <Mail className="w-3.5 h-3.5" />
                  <span className="truncate">{admin.email}</span>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Citizens reception and working hours table */}
      <div className="bg-white dark:bg-slate-900 p-6 md:p-8 rounded-3xl shadow-xs border border-slate-150 dark:border-slate-800 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div className="space-y-4">
          <div className="inline-flex items-center space-x-2 bg-school-yellow-455/10 text-school-yellow-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider font-display">
            <Clock className="w-3.5 h-3.5" />
            <span>Прийом громадян</span>
          </div>
          <h2 className="text-xl font-bold font-display text-slate-900 dark:text-white">Графік особистого прийому громадян адміністрацією</h2>
          <p className="text-xs text-slate-500 leading-relaxed font-light">
            Ми завжди відкриті для відвертого діалогу, зауважень, консультацій та ідей. Особистий прийом проводиться в кабінетах адміністрації на першому поверсі шкільного корпусу у визначені години. Для попереднього запису ви можете звернутися до секретаря за номером школи.
          </p>
        </div>

        <div className="overflow-x-auto rounded-xl border border-slate-150 dark:border-slate-850">
          <table className="min-w-full text-xs text-left divide-y divide-slate-150 dark:divide-slate-800">
            <thead className="bg-slate-50 dark:bg-slate-950 text-slate-600 dark:text-slate-400 uppercase tracking-wider text-[10px] font-bold">
              <tr>
                <th className="py-3.5 px-4">Посада</th>
                <th className="py-3.5 px-4">День тижня</th>
                <th className="py-3.5 px-4 font-mono">Години прийому</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-150 dark:divide-slate-800 text-slate-705 dark:text-slate-305">
              <tr>
                <td className="py-3 px-4 font-semibold">Директор школи</td>
                <td className="py-3 px-4">Вівторок, Четвер</td>
                <td className="py-3 px-4 font-mono">09:00 - 12:00</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold">Заступник з навч. роботи</td>
                <td className="py-3 px-4">Середа</td>
                <td className="py-3 px-4 font-mono">13:00 - 16:00</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold">Заступниця з виховної роботи</td>
                <td className="py-3 px-4">П’ятниця</td>
                <td className="py-3 px-4 font-mono">10:00 - 13:00</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
