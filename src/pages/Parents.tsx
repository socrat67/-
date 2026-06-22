import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { Coffee, ShieldAlert, Heart, Calendar, FilePlus2, Check } from 'lucide-react';
import { motion } from 'motion/react';

export const Parents: React.FC = () => {
  const { addSubmission } = useData();
  const [activeTab, setActiveTab] = useState('catering');
  
  // Registration Form State
  const [parentName, setParentName] = useState('');
  const [childName, setChildName] = useState('');
  const [childBirth, setChildBirth] = useState('');
  const [parentPhone, setParentPhone] = useState('');
  const [parentEmail, setParentEmail] = useState('');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleRegisterInput = (e: React.FormEvent) => {
    e.preventDefault();
    if (!parentName || !childName) return;

    // Save as standard submission of admission type
    addSubmission({
      type: 'admission',
      senderName: parentName,
      email: parentEmail,
      phone: parentPhone,
      message: `Заява на вступ до 1-го класу. Дитина: ${childName}, рік народження: ${childBirth}. Адреса: ${address}. Нотатки: ${notes}`
    });

    setParentName('');
    setChildName('');
    setChildBirth('');
    setParentPhone('');
    setParentEmail('');
    setAddress('');
    setNotes('');
    setIsSuccess(true);
    setTimeout(() => setIsSuccess(false), 6000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1 space-y-10">
      {/* Page header */}
      <div className="text-center">
        <h1 className="text-2xl sm:text-4xl font-extrabold font-display text-slate-900 dark:text-white leading-tight">Батьківський куточок</h1>
        <p className="text-xs text-slate-500 max-w-xl mx-auto mt-2.5">
          Корисна інформація для турботливих батьків щодо здорового харчування дітей, шкільної безпеки та процедури запису дитини до першого класу.
        </p>
      </div>

      {/* Internal Menu Toggles */}
      <div className="flex border-b border-slate-200 dark:border-slate-850 overflow-x-auto whitespace-nowrap text-xs font-semibold gap-1">
        <button
          onClick={() => setActiveTab('catering')}
          className={`py-3 px-4 border-b-2 transition-all cursor-pointer ${activeTab === 'catering' ? 'border-school-blue-500 text-school-blue-600 font-bold' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
        >
          Шкільне харчування
        </button>
        <button
          onClick={() => setActiveTab('safety')}
          className={`py-3 px-4 border-b-2 transition-all cursor-pointer ${activeTab === 'safety' ? 'border-school-blue-500 text-school-blue-600 font-bold' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
        >
          Безпека та укриття
        </button>
        <button
          onClick={() => setActiveTab('psychology')}
          className={`py-3 px-4 border-b-2 transition-all cursor-pointer ${activeTab === 'psychology' ? 'border-school-blue-500 text-school-blue-600 font-bold' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
        >
          Поради психолога
        </button>
        <button
          onClick={() => setActiveTab('admission')}
          className={`py-3 px-4 border-b-2 transition-all cursor-pointer ${activeTab === 'admission' ? 'border-school-blue-500 text-school-blue-600 font-bold' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
        >
          Вступ до 1-го класу
        </button>
      </div>

      {/* Subpage Frame content */}
      <div className="bg-white dark:bg-slate-900 p-6 md:p-8 rounded-3xl border border-slate-150 dark:border-slate-800 shadow-xs">
        
        {/* Catering Section */}
        {activeTab === 'catering' && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <div className="flex flex-col lg:flex-row gap-8 items-center">
              <div className="space-y-4 lg:w-2/3">
                <h2 className="text-sm font-bold font-display text-slate-900 dark:text-white flex items-center gap-2">
                  <Coffee className="w-5 h-5 text-emerald-600" />
                  Сучасне та збалансоване шкільне меню
                </h2>
                <div className="space-y-3 text-xs text-slate-650 dark:text-slate-350 leading-relaxed font-light">
                  <p>
                    Заклад загальної середньої освіти І-ІІІ ст. с. Павлів повністю перейшов на сучасну кулінарну систему збалансованого харчування за рецептами відомого шеф-кухаря України <strong>Євгена Клопотенка</strong>. Нашим першочерговим завданням є відсутність шкідливих кондитерських жирів, надлишкової кількості цукру чи солі.
                  </p>
                  <p>
                    <strong>Пільгові категорії</strong> отримують безкоштовне гаряче харчування за рахунок фінансування з Павлівської сільської ради. Для решти учнів діє гнучкий абонемент та можливість самостійного безконтактного розрахунку в буфеті за допомогою смарт-карток або Google Pay.
                  </p>
                </div>
              </div>
              <div className="lg:w-1/3 w-full bg-slate-50 dark:bg-slate-950 p-5 rounded-2xl border border-slate-100 dark:border-slate-800">
                <h4 className="font-bold text-xs uppercase text-slate-800 dark:text-slate-200 mb-2">Обідне меню на Сьогодні</h4>
                <ul className="text-[11px] text-slate-500 space-y-1.5 list-disc pl-4 leading-relaxed">
                  <li>Запечена куряча грудка під сирним бешамелем</li>
                  <li>Картопляне пюре із ароматним чебрецем</li>
                  <li>Салат зі свіжої капусти з насінням гарбуза</li>
                  <li>Напій з плодів шипшини із медом</li>
                  <li>Свіжі органічні фрукти (яблуко / банан)</li>
                </ul>
              </div>
            </div>
          </motion.div>
        )}

        {/* Safety Section */}
        {activeTab === 'safety' && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-5"
          >
            <h2 className="text-sm font-bold font-display text-slate-900 dark:text-white flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-red-500" />
              Безпека життєдіяльності та алгоритми тривог
            </h2>
            <div className="space-y-3 text-xs text-slate-500 leading-relaxed font-light">
              <p>
                Ми розуміємо всю хвилю занепокоєння батьків у сучасних реаліях України. Головним принципом роботи школи у 2026 році є <strong>Безпека понад усе</strong>.
              </p>
              <p>
                У випадку оголошення сигналу повітряної тривоги на території Львівської області, вчителі призупиняють урок, виводять речі першої допомоги та організовано здійснюють супровід дітей у шкільне укриття. Кожен учень має закріплене та промарковане місце сидіння. Батьки просять не намагатися забрати дитину під час тривоги з міркувань безпеки. Після відбою урок продовжується у штатному режимі.
              </p>
            </div>
            <div className="p-4 bg-red-50/15 dark:bg-red-955/10 rounded-2xl border border-red-200 text-xs">
              <strong>Будь ласка, перевірте наявність «тривожного наплічника» вашої дитини:</strong> зміна чистої білизни, вологі серветки, індивідуальні ліки, пляшечка води та записка з номерами телефонів батьків.
            </div>
          </motion.div>
        )}

        {/* Psychology counselling info */}
        {activeTab === 'psychology' && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <h2 className="text-sm font-bold font-display text-slate-900 dark:text-white flex items-center gap-2">
              <Heart className="w-5 h-5 text-pink-500" />
              Психологічна допомога та супровід учнів
            </h2>
            <p className="text-xs text-slate-500 leading-relaxed font-light">
              У нашому закладі щодня працює сертифікована шкільна практична психологиня. Спеціаліст займається адаптацією учнів початкових класів до НУШ, психологічним розвантаженням депресивних станів викликаних війною, та профорієнтацією 9-11 класів.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs pt-2">
              <div className="p-4 border rounded-xl space-y-1">
                <h4 className="font-bold text-slate-800 dark:text-white">Консультації для батьків:</h4>
                <p className="text-slate-550">Індивідуальні бесіди щодо кризового підліткового періоду. Попередній запис через Viber-асистента.</p>
              </div>
              <div className="p-4 border rounded-xl space-y-1">
                <h4 className="font-bold text-slate-800 dark:text-white">Кабінет Емоційної Гармонії:</h4>
                <p className="text-slate-550">Спеціальна розслаблюючі зона у школі з м’якими кріслами-мішками, затишним підсвічуванням та арт-терапевтичними матеріалами.</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Grade 1 online enrollment system (Stateful persistent CRUD form) */}
        {activeTab === 'admission' && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <div className="space-y-2">
              <h2 className="text-sm font-bold font-display text-slate-900 dark:text-white flex items-center gap-2">
                <Calendar className="w-5 h-5 text-school-blue-600" />
                Онлайн реєстрація заяви до 1 класу на {new Date().getFullYear()} н.р.
              </h2>
              <p className="text-xs text-slate-500 leading-relaxed font-light">
                Для подачі електронної заяви батькам не обов’язково відвідувати секретаріат школи. Заповніть форму нижче – після автоматичного розгляду, вам прийде офлайн запрошення з переліком необхідних документів (копія свідоцтва, медична довідка № 086-1/о).
              </p>
            </div>

            {isSuccess ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-emerald-50/30 border border-emerald-300 rounded-2xl p-6 text-center space-y-3"
              >
                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-xs text-slate-800 dark:text-white font-display">Електронна заява успішно зареєстрована!</h4>
                <p className="text-slate-500 text-[11px] leading-relaxed">
                  Ваші дані внесено в чергу вступної кампанії школи. Наш заступник директора Олена Миколаївна зв’яжеться із вами телефоном для узгодження часу подачі паперових оригіналів. Дякуємо за довіру!
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleRegisterInput} className="space-y-4 pt-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">ПІБ одного з батьків / опікуна *</label>
                    <input 
                      type="text" 
                      required
                      value={parentName}
                      onChange={(e) => setParentName(e.target.value)}
                      placeholder="Петренко Андрій Вікторович"
                      className="w-full text-xs px-3.5 py-2 border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-850 rounded-lg text-slate-800 dark:text-slate-105 focus:outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">Повне ім`я та прізвище дитини *</label>
                    <input 
                      type="text" 
                      required
                      value={childName}
                      onChange={(e) => setChildName(e.target.value)}
                      placeholder="Петренко Дарина Андріївна"
                      className="w-full text-xs px-3.5 py-2 border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-850 rounded-lg text-slate-800 dark:text-slate-105 focus:outline-hidden"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">Дата народження дитини *</label>
                    <input 
                      type="date" 
                      required
                      value={childBirth}
                      onChange={(e) => setChildBirth(e.target.value)}
                      className="w-full text-xs px-3.5 py-2 border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-850 rounded-lg text-slate-850 dark:text-slate-105 focus:outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">Контактний телефон батька *</label>
                    <input 
                      type="tel" 
                      required
                      value={parentPhone}
                      onChange={(e) => setParentPhone(e.target.value)}
                      placeholder="+380"
                      className="w-full text-xs px-3.5 py-2 border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-850 rounded-lg text-slate-850 dark:text-slate-105 focus:outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">Електронна пошта *</label>
                    <input 
                      type="email" 
                      required
                      value={parentEmail}
                      onChange={(e) => setParentEmail(e.target.value)}
                      placeholder="petrenko@gmail.com"
                      className="w-full text-xs px-3.5 py-2 border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-850 rounded-lg text-slate-850 dark:text-slate-105 focus:outline-hidden"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">Адреса фактичного проживання дитини *</label>
                  <input 
                    type="text" 
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="с. Павлів, вул. Молодіжна, б. 12"
                    className="w-full text-xs px-3.5 py-2 border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-850 rounded-lg text-slate-850 dark:text-slate-105 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">Особливі освітні примітки (за наявності інклюзії)</label>
                  <textarea 
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Укажіть тут індивідуальні особливості, побажання щодо групового кабінету..."
                    className="w-full text-xs px-3.5 py-2 border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-850 rounded-lg text-slate-850 dark:text-slate-105 focus:outline-hidden"
                  />
                </div>

                <button 
                  type="submit" 
                  className="bg-school-blue-600 hover:bg-school-blue-700 text-white font-bold py-3 px-6 rounded-xl text-xs flex items-center space-x-2 transition-all cursor-pointer shadow-md shadow-school-blue-100 dark:shadow-none"
                >
                  <FilePlus2 className="w-4 h-4" />
                  <span>Подати електронну заяву</span>
                </button>
              </form>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};
