import React, { useState } from 'react';
import { Award, BookOpen, Shield, HelpCircle, HardDrive, Cpu, Heart, CheckCircle } from 'lucide-react';
import { motion } from 'motion/react';

export const About: React.FC<{ initialSubTab?: string }> = ({ initialSubTab = 'history' }) => {
  const [activeTab, setActiveTab] = useState(initialSubTab);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1 flex flex-col">
      {/* Title block */}
      <div className="mb-10 text-center">
        <h1 className="text-2xl sm:text-4xl font-extrabold font-display text-slate-900 dark:text-white leading-tight">Про наш Павлівський ліцей</h1>
        <p className="text-xs text-slate-500 max-w-xl mx-auto mt-2.5">
          Дізнайтеся більше про багату історію закладу з моменту заснування, наші європейські цінності та сучасне технічне забезпечення.
        </p>
      </div>

      {/* Internal Tabs Navigator */}
      <div className="flex border-b border-slate-200 dark:border-slate-850 overflow-x-auto whitespace-nowrap mb-8 text-xs font-semibold gap-1">
        <button
          onClick={() => setActiveTab('history')}
          className={`py-3 px-4 border-b-2 transition-all cursor-pointer ${activeTab === 'history' ? 'border-school-blue-500 text-school-blue-600 font-bold' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
        >
          Історія закладу
        </button>
        <button
          onClick={() => setActiveTab('mission')}
          className={`py-3 px-4 border-b-2 transition-all cursor-pointer ${activeTab === 'mission' ? 'border-school-blue-500 text-school-blue-600 font-bold' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
        >
          Місія та Цінності
        </button>
        <button
          onClick={() => setActiveTab('symbols')}
          className={`py-3 px-4 border-b-2 transition-all cursor-pointer ${activeTab === 'symbols' ? 'border-school-blue-500 text-school-blue-600 font-bold' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
        >
          Символіка ліцею
        </button>
        <button
          onClick={() => setActiveTab('base')}
          className={`py-3 px-4 border-b-2 transition-all cursor-pointer ${activeTab === 'base' ? 'border-school-blue-500 text-school-blue-600 font-bold' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
        >
          Матеріально-технічна база
        </button>
      </div>

      {/* Tab Contents */}
      <div className="flex-1 bg-white dark:bg-slate-900 p-6 md:p-10 rounded-3xl shadow-xs border border-slate-100 dark:border-slate-800">
        {activeTab === 'history' && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="flex flex-col lg:flex-row gap-8 items-center">
              <div className="space-y-4 lg:w-2/3">
                <h2 className="text-xl font-bold font-display text-slate-900 dark:text-white">Шлях довжиною у десятиліття</h2>
                <div className="space-y-3 text-xs text-slate-650 dark:text-slate-350 leading-relaxed font-light">
                  <p>
                    Історія нашого закладу освіти нерозривно пов'язана зі становленням громади мальовничого села Павлівка. Першу трикласну школу в селі було засновано ще в далекому минулому столітті, коли спрагла до науки дітвора тулилася в невеликих найманих хатинах.
                  </p>
                  <p>
                    У наступні радянські часи відбулася розбудова нової будівлі школи, яка в подальшому перетворилася на загальноосвітню школу І-ІІІ ступенів. Здобуття Україною Незалежності вдихнуло нове європейське життя в класи нашого закладу: ми модернізували кабінети, перейшли на сучасні стандарти викладання та інтегрували вільні творчі підходи.
                  </p>
                  <p>
                    У 2021 році, відповідно до вимог освітньої реформи в Україні, Павлівська загальноосвітня школа І-ІІІ ступенів отримала почесний статус <strong>Павлівського ліцею</strong>. Сьогодні це опорний заклад, який об’єднує навколо себе талановиту учнівську молодь та пропонує передові СТЕМ-технології, комп’ютеризовані бази та індивідуальні освітні траєкторії.
                  </p>
                </div>
              </div>
              <div className="lg:w-1/3 w-full h-64 rounded-2xl overflow-hidden shadow-md">
                <img src="https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&q=80&w=500" alt="Стара школа" className="w-full h-full object-cover" />
              </div>
            </div>

            <div className="bg-slate-50 dark:bg-slate-950 p-5 rounded-2xl border border-slate-100 dark:border-slate-800">
              <h3 className="font-bold text-xs font-display text-slate-800 dark:text-white uppercase tracking-wider mb-3">Видатні випускники ліцею</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                За роки роботи школа гордо випустила сотні професіоналів свого діла. Наші вихованці сьогодні стоять на варті миру у Збройних Силах України, викладають у провідних вузах країни, очолюють IT-корпорації та розбудовують аграрний сектор Волині.
              </p>
            </div>
          </motion.div>
        )}

        {activeTab === 'mission' && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-xl font-bold font-display text-slate-900 dark:text-white text-center mb-6">Місія, візія та цінності нашого ліцею</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 bg-school-blue-50/50 dark:bg-school-blue-950/20 border border-school-blue-100 rounded-2xl space-y-3">
                  <div className="w-10 h-10 bg-school-blue-600 text-white rounded-lg flex items-center justify-center">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-xs uppercase tracking-wider text-school-blue-800 dark:text-school-blue-200">Наша місія</h3>
                  <p className="text-xs text-slate-650 dark:text-slate-350 leading-relaxed">
                    Створення інклюзивного, безпечного та надихаючого середовища партнерства, в якому кожен учень може відкрити свої таланти, сформувати критичне мислення та підготуватися до свідомого життя в сучасному демократичному суспільстві.
                  </p>
                </div>

                <div className="p-6 bg-school-yellow-50/50 dark:bg-school-yellow-950/20 border border-school-yellow-200 rounded-2xl space-y-3">
                  <div className="w-10 h-10 bg-school-yellow-500 text-slate-900 rounded-lg flex items-center justify-center">
                    <Award className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-xs uppercase tracking-wider text-school-yellow-800 dark:text-school-yellow-200">Наша Візія</h3>
                  <p className="text-xs text-slate-650 dark:text-slate-350 leading-relaxed">
                    Павлівський ліцей - це високотехнологічний освітній хаб Волинської області, що випускає всебічно розвинених лідерів, здатних до безперервного самонавчання протягом усього життя, вільних від стереотипів та готових створювати інновації.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-bold text-sm text-slate-800 dark:text-white font-display">Наші фундаментальні цінності</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 border border-slate-100 dark:border-slate-700/65 rounded-xl space-y-2">
                  <Heart className="w-6 h-6 text-red-500" />
                  <h4 className="font-bold text-xs text-slate-900 dark:text-white leading-tight">Патріотизм та Повага</h4>
                  <p className="text-[11px] text-slate-500 leading-relaxed">Любов до рідного краю, мови, збереження національної ідентичності та повага до прав кожної особистості.</p>
                </div>
                <div className="p-4 border border-slate-100 dark:border-slate-700/65 rounded-xl space-y-2">
                  <Shield className="w-6 h-6 text-school-blue-500" />
                  <h4 className="font-bold text-xs text-slate-900 dark:text-white leading-tight">Академічна доброчесність</h4>
                  <p className="text-[11px] text-slate-500 leading-relaxed">Чесність у здобутті освіти, відсутність плагіату та повага до інтелектуальної праці вчителів та однокласників.</p>
                </div>
                <div className="p-4 border border-slate-100 dark:border-slate-700/65 rounded-xl space-y-2">
                  <Cpu className="w-6 h-6 text-school-yellow-550" />
                  <h4 className="font-bold text-xs text-slate-900 dark:text-white leading-tight">Інноваційність</h4>
                  <p className="text-[11px] text-slate-500 leading-relaxed">Сміливе опанування новітніх технологій, робототехніки, штучного інтелекту та критичний підхід до інформаційного простору.</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'symbols' && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <h2 className="text-xl font-bold font-display text-slate-900 dark:text-white">Символіка Павлівського ліцею</h2>
                <div className="space-y-3.5 text-xs text-slate-650 dark:text-slate-350 leading-relaxed font-light">
                  <p>
                    <strong>Герб ліцею</strong> представляє собою щит, розколотий на синю та жовту частини, де зображена відкрита книга знань у світлі променів вранішнього сонця Волині. Вінок з дубового листя внизу символізує міцність духу та традиції довголіття нашої сільської громади.
                  </p>
                  <p>
                    <strong>Прапор ліцею</strong> – синє полотнище із золотою облямівкою та гербом у центрі. Він гордо підіймається під час Свята Першого та Останнього дзвоників.
                  </p>
                  <p>
                    <strong>Гімн ліцею</strong> написаний нашими талановитими педагогами спільно з випускниками та звучить на кожному шкільному фестивалі як символ нашої вічної освітньої дружби та патріотизму.
                  </p>
                </div>
              </div>
              <div className="p-6 bg-slate-50 dark:bg-slate-950 rounded-2xl border text-center space-y-4">
                <div className="w-24 h-24 bg-linear-to-tr from-school-blue-600 to-school-yellow-500 rounded-full flex items-center justify-center mx-auto text-white text-3xl font-bold shadow-md border-2 border-white">
                  🔱
                </div>
                <div>
                  <h4 className="font-bold text-xs font-display uppercase text-slate-800 dark:text-white">Слова з Гімну Школи</h4>
                  <p className="text-xs italic text-slate-500 mt-2">
                    "Павлівська школа – наш радісний дім,<br />
                    Світло науки палає у нім.<br />
                    До знань ми йдемо, доростаєм крильми,<br />
                    Щоб славу Вітчизни помножити ми!"
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'base' && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <h2 className="text-xl font-bold font-display text-slate-900 dark:text-white">Наша матеріально-технічна база</h2>
            <p className="text-xs text-slate-500">
              Ліцей регулярно оновлює свою технічну інфраструктуру, щоб відповідати всім державним ліцензійним та безпековим нормам Міністерства освіти України.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-slate-50 dark:bg-slate-950 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 space-y-3">
                <div className="p-2.5 bg-school-blue-100 text-school-blue-700 rounded-lg w-10 h-10 flex items-center justify-center">
                  <Cpu className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-xs text-slate-850 dark:text-white">STEM-Кабінет & Робототехніка</h3>
                <p className="text-[11px] text-slate-500 leading-relaxed">Комплекти Lego Spike Prime, 3D принтери FlashForge, контролери Arduino для конструювання проектів.</p>
              </div>

              <div className="bg-slate-50 dark:bg-slate-950 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 space-y-3">
                <div className="p-2.5 bg-school-yellow-105 text-school-yellow-700 rounded-lg w-10 h-10 flex items-center justify-center">
                  <HardDrive className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-xs text-slate-850 dark:text-white">Комп’ютерний клас</h3>
                <p className="text-[11px] text-slate-500 leading-relaxed">Модернові хромбуки з доступом до пакету Google Workspace, інтерактивні панелі для графічних уроків.</p>
              </div>

              <div className="bg-slate-50 dark:bg-slate-950 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 space-y-3">
                <div className="p-2.5 bg-purple-100 text-purple-700 rounded-lg w-10 h-10 flex items-center justify-center">
                  <Shield className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-xs text-slate-850 dark:text-white">Безпечне цивільне укриття</h3>
                <p className="text-[11px] text-slate-500 leading-relaxed">Сучасне обладнане підвальне приміщення укриття на 300 осіб із санвузлом, Wi-Fi інтернетом, та вентиляцією ДСНС.</p>
              </div>
            </div>

            <div className="bg-school-yellow-50/20 dark:bg-slate-905 p-5 rounded-2xl border border-school-yellow-200 text-xs">
              <span className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Інспекція готовності закладу:</span>
              <p className="text-slate-500 text-[11px]">Павлівський ліцей пройшов повну державну сертифікацію та атестацію готовності будівель, спортивного майданчика зі штучним покриттям та кабінетів початкових класів НУШ до 2026/2027 навчального року.</p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};
