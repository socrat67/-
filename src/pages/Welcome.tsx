import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { 
  ArrowRight, Award, BookOpen, Calendar, HelpCircle, Shield, 
  Sparkles, Users, Coffee, Check, Clock, Eye, Send
} from 'lucide-react';
import { motion } from 'motion/react';

interface WelcomeProps {
  setCurrentPage: (page: string) => void;
}

export const Welcome: React.FC<WelcomeProps> = ({ setCurrentPage }) => {
  const { news, events, addSubmission } = useData();
  const [newsSearch, setNewsSearch] = useState('');
  
  // Fast feedback for online contact form
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [guestMsg, setGuestMsg] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // Take first 3 news items for homepage preview
  const homeNews = news.slice(0, 3);

  const handleQuickForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName || !guestMsg) return;
    addSubmission({
      type: 'general',
      senderName: guestName,
      email: guestEmail,
      phone: guestPhone,
      message: guestMsg,
      targetDirector: false
    });
    setGuestName('');
    setGuestEmail('');
    setGuestPhone('');
    setGuestMsg('');
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="flex-1 flex flex-col space-y-12 pb-16">
      
      {/* 1. Hero Bento Section (Contained Frame for elegant design) */}
      <section className="max-w-7xl mx-auto w-full px-4 pt-6">
        <div className="relative min-h-[70vh] sm:min-h-[75vh] rounded-[32px] overflow-hidden bg-slate-950 shadow-xl border border-slate-200/20 dark:border-slate-800/40 flex items-center justify-center">
          {/* Background image with brightness controls */}
          <div 
            className="absolute inset-0 bg-cover bg-center brightness-35 z-0 bg-no-repeat transform scale-103 transition-transform duration-10000"
            style={{ backgroundImage: `url('https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=1920')` }}
          />
          {/* Subtle gradient overlay keeping it readable and rich */}
          <div className="absolute inset-0 bg-gradient-to-b from-school-blue-900/30 via-transparent to-slate-950/95 z-5" />

          <div className="relative z-10 max-w-4xl mx-auto px-6 text-center text-white flex flex-col items-center space-y-6">
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center space-x-2 bg-school-yellow-400/20 text-school-yellow-300 px-4 py-1.5 rounded-full text-xs font-bold font-display uppercase tracking-widest border border-school-yellow-400/30"
              id="hero-community-badge"
            >
              <Sparkles className="w-3.5 h-3.5 text-school-yellow-400" />
              <span>Радехівська громада • Львівська область</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl sm:text-5xl md:text-6xl font-extrabold font-display leading-tight tracking-tight max-w-3xl"
              id="hero-title"
            >
              Заклад загальної середньої освіти І-ІІІ ст. с. Павлів 
              <span className="text-school-yellow-400 italic block mt-2 text-2xl sm:text-4xl">Традиції. Якість. Майбутнє.</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xs sm:text-sm md:text-base text-slate-350 max-w-2xl font-light leading-relaxed"
              id="hero-description"
            >
              Офіційний цифровий портал закладу загальної середньої освіти І-ІІІ ступенів. Надихаємо учнів на високі звершення, підтримуємо національну ідентичність та стимулюємо інновації 2026 року.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-3 w-full justify-center max-w-md pt-4"
              id="hero-actions"
            >
              <button 
                onClick={() => { setCurrentPage('parents-admission'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="bg-school-yellow-400 hover:bg-school-yellow-300 hover:scale-102 text-slate-950 font-bold px-6 py-3.5 rounded-xl text-xs transition-all flex items-center justify-center space-x-2 shadow-lg cursor-pointer shrink-0"
                id="cta-admission"
              >
                <span>Подати заяву до 1 класу</span>
                <BookOpen className="w-4 h-4 ml-0.5" />
              </button>
              <button 
                onClick={() => { setCurrentPage('news'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="bg-white/10 hover:bg-white/15 text-white font-bold px-6 py-3.5 rounded-xl text-xs transition-all flex items-center justify-center space-x-2 border border-white/20 cursor-pointer backdrop-blur-xs hover:border-white/30"
                id="cta-news"
              >
                <span>Новини школи</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. Core Bento Grid Showcase Section */}
      <section className="max-w-7xl mx-auto w-full px-4" id="main-bento-section">
        <div className="text-center mb-8">
          <span className="text-xs font-semibold uppercase tracking-widest text-school-blue-500 bg-school-blue-50 dark:bg-slate-900 px-3 py-1.5 rounded-full border border-slate-200/50 dark:border-slate-800">Навігатор шкільного простору</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-slate-900 dark:text-white mt-3 tracking-tight">Життя та інфраструктура нашого закладу</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-auto">
          
          {/* Card A: Director Welcome Box (Spans 2 cols, row-span-2) */}
          <div className="bento-card md:col-span-2 lg:row-span-2 select-none flex flex-col justify-between h-full bg-linear-to-b from-white to-slate-50/50 dark:from-slate-900 dark:to-slate-900/80" id="bento-director">
            <div className="space-y-4">
              <div className="flex items-center space-x-3.5">
                <span className="bento-badge bg-school-blue-50 text-school-blue-600 dark:bg-school-blue-950/40 dark:text-school-blue-300">
                  <Award className="w-3 h-3 text-school-yellow-500 mr-1 shrink-0" />
                  Вітальне слово директора
                </span>
              </div>
              <blockquote className="text-sm font-light text-slate-650 dark:text-slate-300 leading-relaxed italic border-l-2 border-school-blue-500 pl-4 py-1">
                "Кожен учень нашої школи – це маленьке індивідуальне сузір'я, талант якого ми прагнемо підтримати та розвинути. Ми формуємо м’які навички (soft skills), інформаційну компетентність та дух свободи в кожному серці!"
              </blockquote>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Школа – це живий організм взаємонавчання та безпеки. Орієнтуємо навчальний процес на розвиток екологічної свідомості й патріотизму для майбутнього вільної України.
              </p>
            </div>

            <div className="flex items-center space-x-4 pt-6 border-t border-slate-200/60 dark:border-slate-800/60 mt-6">
              <div className="w-14 h-14 rounded-full overflow-hidden shrink-0 border-2 border-school-yellow-400 shadow-xs">
                <img 
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200" 
                  alt="Любов Миколаївна Татарчук" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h4 className="font-bold text-xs text-slate-800 dark:text-white leading-tight">Татарчук Любов Миколаївна</h4>
                <p className="text-[10px] text-slate-400 mt-0.5 uppercase tracking-wider font-mono">Директорка школи, кандидатка пед. наук</p>
              </div>
            </div>
          </div>

          {/* Card B: Moodle & Distance Support (Spans 1 col) */}
          <div 
            onClick={() => { setCurrentPage('students-distance'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="bento-card-interactive group bg-linear-to-b from-white to-school-blue-50/10 dark:from-slate-900 dark:to-slate-950/1 w-full"
            id="bento-distance"
          >
            <div>
              <div className="p-3 bg-school-blue-50 dark:bg-school-blue-900/10 text-school-blue-600 dark:text-school-blue-300 rounded-2xl w-fit group-hover:scale-105 transition-transform duration-300">
                <BookOpen className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-xs uppercase tracking-wide text-slate-850 dark:text-white leading-tight mt-4 font-display">Moodle & Classroom</h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">Дистанційні платформи, електронні щоденники та цифрові класи.</p>
            </div>
            <div className="text-[10px] text-school-blue-600 dark:text-school-blue-400 font-bold flex items-center gap-1 mt-4 group-hover:translate-x-1 transition-transform">
              <span>Перейти до платформи</span>
              <ArrowRight className="w-3 h-3" />
            </div>
          </div>

          {/* Card C: Schedule Quick-View (Spans 1 col, interactive widgets) */}
          <div 
            className="bento-card bg-linear-to-b from-white to-slate-50/50 dark:from-slate-900 dark:to-slate-900/20"
            id="bento-schedule"
          >
            <div>
              <div className="flex items-center justify-between">
                <div className="p-3 bg-school-yellow-50 dark:bg-school-yellow-950/20 text-school-yellow-600 dark:text-school-yellow-400 rounded-2xl w-fit">
                  <Clock className="w-5 h-5" />
                </div>
                <span className="text-[9px] uppercase font-mono bg-emerald-50 text-emerald-600 dark:bg-emerald-950/25 dark:text-emerald-400 px-2 py-0.5 rounded-full font-bold">Актуально</span>
              </div>
              <h3 className="font-bold text-xs uppercase tracking-wide text-slate-850 dark:text-white mt-4 font-display">Розклад дзвінків</h3>
              
              <div className="space-y-1.5 mt-3">
                <div className="flex justify-between text-[10px] border-b border-dashed border-slate-100 dark:border-slate-800 pb-1">
                  <span className="text-slate-400">1 урок</span>
                  <span className="font-mono text-slate-650 dark:text-slate-350">08:30 - 09:15</span>
                </div>
                <div className="flex justify-between text-[10px] border-b border-dashed border-slate-100 dark:border-slate-800 pb-1">
                  <span className="text-slate-400">2 урок</span>
                  <span className="font-mono text-slate-650 dark:text-slate-350">09:25 - 10:10</span>
                </div>
                <div className="flex justify-between text-[10px] border-b border-dashed border-slate-100 dark:border-slate-800 pb-1">
                  <span className="text-slate-400">3 урок</span>
                  <span className="font-mono text-slate-650 dark:text-slate-350 text-school-blue-600 dark:text-school-blue-400 font-semibold">10:30 - 11:15</span>
                </div>
                <div className="flex justify-between text-[10px] pb-0.5">
                  <span className="text-slate-400">4 урок</span>
                  <span className="font-mono text-slate-650 dark:text-slate-350">11:35 - 12:20</span>
                </div>
              </div>
            </div>
            
            <button 
              onClick={() => { setCurrentPage('students-schedule'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="text-[10px] text-slate-400 hover:text-school-blue-500 font-bold flex items-center justify-between w-full pt-3 mt-3 border-t border-slate-100 dark:border-slate-800 cursor-pointer"
            >
              <span>Повний графік дзвінків</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          {/* Card D: School Nutrition (Spans 1 col) */}
          <div 
            onClick={() => { setCurrentPage('parents-food'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="bento-card-interactive group bg-linear-to-b from-white to-emerald-50/10 dark:from-slate-900 dark:to-slate-950/1"
            id="bento-nutrition"
          >
            <div>
              <div className="p-3 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 rounded-2xl w-fit group-hover:scale-105 transition-transform duration-300">
                <Coffee className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-xs uppercase tracking-wide text-slate-850 dark:text-white leading-tight mt-4 font-display">Здорове менструацію</h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">Двотижневе збалансоване меню за рецептами Клопотенка. Здоров'я дітей понад усе!</p>
            </div>
            <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1 mt-4 group-hover:translate-x-1 transition-transform">
              <span>Переглянути раціон</span>
              <ArrowRight className="w-3 h-3" />
            </div>
          </div>

          {/* Card E: Safety and Shelter (Spans 1 col) */}
          <div 
            onClick={() => { setCurrentPage('parents-safety'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="bento-card-interactive group bg-linear-to-b from-white to-purple-50/10 dark:from-slate-900 dark:to-slate-950/1"
            id="bento-safety"
          >
            <div>
              <div className="p-3 bg-purple-50 dark:bg-purple-950/20 text-purple-600 dark:text-purple-400 rounded-2xl w-fit group-hover:scale-105 transition-transform duration-300">
                <Shield className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-xs uppercase tracking-wide text-slate-850 dark:text-white leading-tight mt-4 font-display">Клас Безпеки & ДСНС</h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">Правила військового часу, інтерактивний тир безпеки, алгоритм проходу до укриття.</p>
            </div>
            <div className="text-[10px] text-purple-600 dark:text-purple-400 font-bold flex items-center gap-1 mt-4 group-hover:translate-x-1 transition-transform">
              <span>Заходи безпеки</span>
              <ArrowRight className="w-3 h-3" />
            </div>
          </div>

          {/* Card F: School Stats Dashboard (Spans 2 cols, gorgeous analytics display) */}
          <div className="bento-card md:col-span-2 select-none bg-slate-900 dark:bg-slate-950 text-white relative" id="bento-school-stats">
            {/* Ambient subtle light inside card */}
            <div className="absolute inset-x-0 bottom-0 top-1/2 bg-gradient-to-t from-school-blue-900/20 to-transparent pointer-events-none rounded-b-3xl" />
            
            <div className="relative z-10 w-full flex flex-col justify-between h-full space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <span className="text-[10px] uppercase font-mono tracking-widest text-school-yellow-400 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  Показники ефективності роботи
                </span>
                <span className="text-[9px] uppercase font-mono text-slate-400">Навчальний рік 2026</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-2">
                <div className="space-y-0.5">
                  <span className="block text-2xl sm:text-3xl font-extrabold font-mono text-school-yellow-400 tracking-tight">312</span>
                  <span className="block text-[9px] uppercase tracking-wider text-slate-400">Творчих учнів</span>
                </div>
                <div className="space-y-0.5">
                  <span className="block text-2xl sm:text-3xl font-extrabold font-mono text-school-yellow-400 tracking-tight">34</span>
                  <span className="block text-[9px] uppercase tracking-wider text-slate-400">Вчителі-майстри</span>
                </div>
                <div className="space-y-0.5">
                  <span className="block text-2xl sm:text-3xl font-extrabold font-mono text-school-yellow-400 tracking-tight">16</span>
                  <span className="block text-[9px] uppercase tracking-wider text-slate-400">Смарт-кабінетів</span>
                </div>
                <div className="space-y-0.5">
                  <span className="block text-2xl sm:text-3xl font-extrabold font-mono text-school-yellow-400 tracking-tight">22</span>
                  <span className="block text-[9px] uppercase tracking-wider text-slate-400">Призери олімпіад</span>
                </div>
              </div>

              <p className="text-[10px] text-slate-400 leading-normal font-light pt-2 border-t border-slate-800/60">
                За результатами щорічного НМТ-рейтингу, школа входить до когорти найсильніших сільських навчальних закладів Львівської області.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 3. Recent News & School Calendar Split Screen with Bento items */}
      <section className="max-w-7xl mx-auto w-full px-4 grid grid-cols-1 lg:grid-cols-3 gap-8" id="news-events-section">
        
        {/* Left Columns (News - Bento row style) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200/60 dark:border-slate-800/60">
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white font-display tracking-tight">Стрічка оголошень та подій</h2>
              <p className="text-xs text-slate-500 mt-1">Життя закладу, корисні заходи та досягнення учнів у режимі реального часу.</p>
            </div>
            <button 
              onClick={() => { setCurrentPage('news'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="text-xs text-school-blue-500 hover:text-school-blue-600 font-bold shrink-0 cursor-pointer flex items-center gap-1 hover:underline"
            >
              <span>Усі новини</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
            {homeNews.map((item) => (
              <div 
                key={item.id} 
                className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-200/65 dark:border-slate-800/80 shadow-xs flex flex-col sm:flex-row hover:shadow-md hover:border-slate-350 dark:hover:border-slate-700 transition-all duration-300"
              >
                <div className="sm:w-52 h-36 shrink-0 bg-slate-200 dark:bg-slate-800 relative">
                  <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                  <span className="absolute top-3 left-3 text-[8px] bg-slate-900/80 text-white px-2 py-0.5 rounded-full font-bold uppercase backdrop-blur-xs tracking-wider">
                    {item.category}
                  </span>
                </div>
                
                <div className="p-5 flex flex-col justify-between flex-1 space-y-3">
                  <div>
                    <h3 
                      onClick={() => { setCurrentPage('news'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                      className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white line-clamp-2 leading-snug hover:text-school-blue-500 cursor-pointer transition-colors font-display"
                    >
                      {item.title}
                    </h3>
                    <p className="text-[11px] text-slate-400 mt-1.5 line-clamp-2 leading-relaxed">
                      Приєднуйтесь до обговорення та перегляду деталей новини нашої шкільної громади в Павлівці.
                    </p>
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
                    <span className="font-mono">{item.date}</span>
                    <span className="flex items-center gap-1 font-mono"><Eye className="w-3.5 h-3.5 text-slate-400" /> {item.views} views</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column (Upcoming Calendar Events styled like vertical Bento slot) */}
        <div className="space-y-6">
          <div className="pb-3 border-b border-slate-200/60 dark:border-slate-800/60">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white font-display tracking-tight">Календар зустрічей</h2>
            <p className="text-xs text-slate-500 mt-1">Організаційні та виховні дати, шкільні конкурси.</p>
          </div>

          <div className="space-y-4">
            {events.slice(0, 3).map((e) => (
              <div 
                key={e.id} 
                className="bg-white dark:bg-slate-900 p-4.5 rounded-2xl border border-slate-200/85 dark:border-slate-800 shadow-xs flex items-start gap-4 hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
              >
                <div className="bg-school-blue-50 dark:bg-school-blue-900/10 text-school-blue-600 dark:text-school-blue-300 p-2.5 rounded-xl font-mono text-center shrink-0 w-12 text-xs font-bold leading-tight border border-school-blue-200/20">
                  {e.date.split('-')[2]}
                  <span className="block text-[8px] uppercase font-sans tracking-widest mt-0.5">Черв</span>
                </div>
                <div className="space-y-1 select-none">
                  <h4 className="text-xs font-bold text-slate-850 dark:text-white font-display leading-tight">{e.title}</h4>
                  <p className="text-[10px] text-slate-450 dark:text-slate-400 max-w-xs leading-normal">{e.description}</p>
                  {e.time && (
                    <span className="text-[9px] text-school-yellow-500 dark:text-school-yellow-400 block font-semibold font-mono">Час: {e.time}</span>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="p-5 bg-school-yellow-50/30 dark:bg-slate-900/40 rounded-3xl border border-school-yellow-300/30">
            <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 font-display">Електронний стіл допомоги</h4>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">Потрібна термінова довідка з місця навчання чи зустріч з практ-психологом? Напишіть нам напряму.</p>
            <button 
              onClick={() => { setCurrentPage('contacts'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="text-xs font-bold text-school-blue-600 hover:text-school-blue-700 dark:text-school-blue-300 dark:hover:text-school-blue-400 mt-3.5 flex items-center gap-1 cursor-pointer"
            >
              <span>Подати запит до школи</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </section>

      {/* 4. Elegant feedback interactive Online reception */}
      <section className="max-w-7xl mx-auto w-full px-4" id="online-reception-section">
        <div className="bg-slate-100/60 dark:bg-slate-900/20 border border-slate-200/50 dark:border-slate-800 rounded-[32px] p-6 sm:p-10 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          
          <div className="space-y-4">
            <span className="text-[10px] font-bold uppercase tracking-widest text-school-blue-500 bg-school-blue-50 dark:bg-slate-900/80 border border-slate-200/50 dark:border-slate-800 px-3 py-1.5 rounded-full w-fit block font-mono">Електронний зв'язок</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-display leading-tight text-slate-900 dark:text-white">
              Офіційна онлайн-приймальня
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-light">
              Маєте пропозиції чи важливе звернення до школи? Надішліть свій лист безпосередньо Любові Миколаївні Татарчук. Відповідно до Закону України «Про звернення громадян», кожне офіційне повідомлення фіксується у внутрішній системі обліку та опрацьовується протягом одного робочого дня.
            </p>
            <div className="space-y-2 pt-3">
              <div className="flex items-center gap-2.5 text-xs text-slate-600 dark:text-slate-400">
                <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Офіційна державна електронна черга с. Павлів.</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-slate-600 dark:text-slate-400">
                <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Захист персональних даних гарантується закладом.</span>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl shadow-sm border border-slate-200/55 dark:border-slate-800">
            {submitted ? (
              <motion.div 
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-center py-12 space-y-4"
              >
                <div className="w-12 h-12 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6" />
                </div>
                <h4 className="font-extrabold text-sm text-slate-800 dark:text-white font-display">Тікет успішно створено!</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs mx-auto">Дякуємо за небайдужість. Копію звернення надіслано на вказану пошту.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleQuickForm} className="space-y-4">
                <div>
                  <label className="block text-[10px] uppercase font-bold tracking-wider text-slate-500 mb-1">Ваше ПІБ (Батько/Мати/Заявник) *</label>
                  <input 
                    type="text" 
                    required 
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    placeholder="Мельник Сергій Іванович" 
                    className="w-full text-xs px-4 py-2.5 border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-850 rounded-xl text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-school-blue-500 focus:outline-hidden"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] uppercase font-bold tracking-wider text-slate-500 mb-1">E-mail адреса *</label>
                    <input 
                      type="email" 
                      required 
                      value={guestEmail}
                      onChange={(e) => setGuestEmail(e.target.value)}
                      placeholder="s.melnyk@gmail.com" 
                      className="w-full text-xs px-4 py-2.5 border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-850 rounded-xl text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-school-blue-500 focus:outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase font-bold tracking-wider text-slate-500 mb-1">Телефон</label>
                    <input 
                      type="text" 
                      value={guestPhone}
                      onChange={(e) => setGuestPhone(e.target.value)}
                      placeholder="+380" 
                      className="w-full text-xs px-4 py-2.5 border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-850 rounded-xl text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-school-blue-500 focus:outline-hidden"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-bold tracking-wider text-slate-500 mb-1">Суть вашого звернення до школи *</label>
                  <textarea 
                    required 
                    rows={4}
                    value={guestMsg}
                    onChange={(e) => setGuestMsg(e.target.value)}
                    placeholder="Детально опишіть ваше запитання чи ідею..." 
                    className="w-full text-xs px-4 py-2.5 border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-850 rounded-xl text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-school-blue-500 focus:outline-hidden"
                  />
                </div>
                <button 
                  type="submit" 
                  className="w-full bg-school-blue-500 hover:bg-school-blue-600 hover:scale-101 text-white font-bold py-3 rounded-xl text-xs transition-all flex items-center justify-center space-x-2 cursor-pointer shadow-md"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Надіслати листа керівництву</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
