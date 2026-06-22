import React, { useState, useRef, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useData } from '../context/DataContext';
import { 
  Sun, Moon, Menu, X, Search, Globe, ChevronDown, Award, 
  MapPin, Phone, Mail, Clock, Shield, Sparkles, LogIn
} from 'lucide-react';
import { AdminPanel } from './AdminPanel';

interface LayoutProps {
  children: React.ReactNode;
  setCurrentPage: (page: string) => void;
  currentPage: string;
}

export const Layout: React.FC<LayoutProps> = ({ children, setCurrentPage, currentPage }) => {
  const { theme, toggleTheme } = useTheme();
  const { siteLanguage, setSiteLanguage, searchQuery, setSearchQuery, currentUser } = useData();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);
  
  // Track dropdown open states on mobile/tablet
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  // Simulated visitors count
  const [visitorsCount, setVisitorsCount] = useState(132450);

  useEffect(() => {
    // Randomly increase counter slightly for realistic feel
    const interval = setInterval(() => {
      setVisitorsCount(prev => prev + Math.floor(Math.random() * 3) + 1);
    }, 12000);
    return () => clearInterval(interval);
  }, []);

  const navStructure = [
    {
      id: 'about_group',
      label: 'Про ліцей',
      items: [
        { label: 'Історія закладу', target: 'about-history' },
        { label: 'Місія та цінності', target: 'about-mission' },
        { label: 'Символіка ліцею', target: 'about-symbols' },
        { label: 'Матеріальна база', target: 'about-base' },
      ]
    },
    {
      id: 'admin_group',
      label: 'Адміністрація',
      items: [
        { label: 'Керівний склад', target: 'administration' },
        { label: 'Графік прийому', target: 'administration-reception' },
        { label: 'Адміністративні контакти', target: 'administration-contacts' },
      ]
    },
    {
      id: 'process_group',
      label: 'Освітній процес',
      items: [
        { label: 'Освітні програми', target: 'education-programs' },
        { label: 'Календар навчального року', target: 'education-calendar' },
        { label: 'Нова Українська Школа (НУШ)', target: 'education-nush' },
        { label: 'Інклюзивне навчання', target: 'education-inclusive' },
      ]
    },
    {
      id: 'students_group',
      label: 'Учням',
      items: [
        { label: 'Розклад занять та дзвінків', target: 'students-schedule' },
        { label: 'Дистанційне навчання', target: 'students-distance' },
        { label: 'Олімпіади та конкурси', target: 'students-competitions' },
        { label: 'Учнівське самоврядування', target: 'students-council' },
      ]
    },
    {
      id: 'parents_group',
      label: 'Батькам',
      items: [
        { label: 'Шкільне харчування', target: 'parents-food' },
        { label: 'Безпечне середовище', target: 'parents-safety' },
        { label: 'Психологічна служба', target: 'parents-psychology' },
        { label: 'Вступ до 1-го класу', target: 'parents-admission' },
      ]
    },
  ];

  const handleNavClick = (target: string) => {
    setCurrentPage(target);
    setMobileMenuOpen(false);
    setActiveDropdown(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDropdownToggle = (group: string) => {
    if (activeDropdown === group) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(group);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 dark:bg-slate-950 dark:text-slate-100 transition-colors duration-205">
      {/* Dynamic Top Announcement Bar */}
      <div className="bg-school-blue-700 text-white text-xs py-2 px-4 shadow-xs border-b border-school-blue-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center space-y-1.5 md:space-y-0">
          <div className="flex items-center space-x-2">
            <span className="bg-school-yellow-400 text-slate-900 px-2 py-0.5 rounded-full font-bold uppercase text-[9px] tracking-wider animate-pulse">Оголошення</span>
            <span className="font-medium truncate">Розпочато онлайн-реєстрацію документів до 1 класу на 2026 н.р.</span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-[11px] text-school-blue-150 hidden lg:inline">Сьогодні: {new Date().toLocaleDateString('uk-UA', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
            <span className="text-[11px] font-mono tracking-wider text-school-yellow-300 flex items-center gap-1">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500"></span>
              UA:school-ID: 24716-PV
            </span>
          </div>
        </div>
      </div>

      {/* Main Header / Navigation */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md dark:bg-slate-900/90 border-b border-slate-200 dark:border-slate-800 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          
          {/* Logo Brand Component */}
          <div 
            onClick={() => handleNavClick('welcome')} 
            className="flex items-center space-x-3 cursor-pointer group select-none"
          >
            <div className="w-12 h-12 bg-linear-to-tr from-school-blue-600 to-school-blue-800 text-white rounded-xl flex items-center justify-center shadow-md border-2 border-school-yellow-400 group-hover:scale-105 transition-all">
              {/* Custom SVG logo mimicking school crest & book */}
              <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
              </svg>
            </div>
            <div>
              <h1 className="text-base sm:text-lg font-extrabold font-display leading-tight tracking-tight text-slate-900 dark:text-white flex items-center gap-1">
                Павлівський ліцей
                <Award className="w-4 h-4 text-school-yellow-500 shrink-0 hidden sm:inline" />
              </h1>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-widest font-mono">віті-павлів • ЗЗСО І-ІІІ ступенів</p>
            </div>
          </div>

          {/* Desktop Search Engine & Controls */}
          <div className="hidden lg:flex items-center space-x-4 max-w-xs w-full mx-4">
            <div className="relative w-full">
              <input 
                type="text"
                placeholder="Пошук по ліцею..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-xs pl-8 pr-3 py-1.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full focus:outline-hidden text-slate-800 dark:text-slate-100"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
            </div>
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center space-x-1">
            <button 
              onClick={() => handleNavClick('welcome')}
              className={`px-3 py-2 text-xs font-semibold rounded-md transition-colors hover:text-school-blue-600 ${currentPage === 'welcome' ? 'text-school-blue-600 font-bold' : 'text-slate-650 dark:text-slate-300'}`}
            >
              Головна
            </button>

            {/* Render Groups */}
            {navStructure.map((group) => (
              <div key={group.id} className="relative group/dropdown">
                <button
                  className="px-3 py-2 text-xs font-semibold text-slate-650 dark:text-slate-300 rounded-md flex items-center space-x-1 cursor-pointer group-hover/dropdown:text-school-blue-600 transition-colors"
                >
                  <span>{group.label}</span>
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>
                <div className="absolute top-full left-0 mt-1 bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-md shadow-lg py-2 w-56 opacity-0 invisible group-hover/dropdown:opacity-100 group-hover/dropdown:visible transition-all duration-200">
                  {group.items.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleNavClick(item.target)}
                      className="w-full text-left px-4 py-2 text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            ))}

            <button 
              onClick={() => handleNavClick('teachers')}
              className={`px-3 py-2 text-xs font-semibold rounded-md transition-colors hover:text-school-blue-600 ${currentPage === 'teachers' ? 'text-school-blue-600 font-bold' : 'text-slate-650 dark:text-slate-300'}`}
            >
              Колектив
            </button>
            
            <button 
              onClick={() => handleNavClick('documents')}
              className={`px-3 py-2 text-xs font-semibold rounded-md transition-colors hover:text-school-blue-600 ${currentPage === 'documents' ? 'text-school-blue-600 font-bold' : 'text-slate-650 dark:text-slate-300'}`}
            >
              Документи
            </button>

            <button 
              onClick={() => handleNavClick('google-workspace')}
              className={`px-3 py-2 text-xs font-semibold rounded-md transition-colors hover:text-school-blue-600 text-amber-600 dark:text-amber-400 ${currentPage === 'google-workspace' ? 'font-black border-b-2 border-amber-500' : 'font-semibold'}`}
            >
              Google Workspace ★
            </button>

            <button 
              onClick={() => handleNavClick('news')}
              className={`px-3 py-2 text-xs font-semibold rounded-md transition-colors hover:text-school-blue-600 ${currentPage === 'news' ? 'text-school-blue-600 font-bold' : 'text-slate-650 dark:text-slate-300'}`}
            >
              Новини
            </button>

            <button 
              onClick={() => handleNavClick('gallery')}
              className={`px-3 py-2 text-xs font-semibold rounded-md transition-colors hover:text-school-blue-600 ${currentPage === 'gallery' ? 'text-school-blue-600 font-bold' : 'text-slate-650 dark:text-slate-300'}`}
            >
              Галерея
            </button>

            <button 
              onClick={() => handleNavClick('contacts')}
              className={`px-3 py-2 text-xs font-semibold rounded-md transition-colors hover:text-school-blue-600 ${currentPage === 'contacts' ? 'text-school-blue-600 font-bold' : 'text-slate-650 dark:text-slate-300'}`}
            >
              Контакти
            </button>
          </nav>

          {/* Core Layout Controls (Theme, Language, Admin entry) */}
          <div className="flex items-center space-x-2 shrink-0">
            {/* Theme toggler */}
            <button 
              onClick={toggleTheme}
              className="p-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-full transition-colors cursor-pointer"
              title="Перемкнути тему сайту"
            >
              {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </button>

            {/* Multi-language button selector (UA / EN) */}
            <button 
              onClick={() => setSiteLanguage(siteLanguage === 'ua' ? 'en' : 'ua')}
              className="p-2 gap-1 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-full transition-all flex items-center cursor-pointer text-slate-700 dark:text-slate-300"
              title="Перемкнути мову (Translation)"
            >
              <Globe className="w-3.5 h-3.5" />
              <span className="text-[10px] font-bold uppercase">{siteLanguage}</span>
            </button>

            {/* Admin Backoffice entry button */}
            <button 
              onClick={() => setAdminOpen(true)}
              className={`p-2 rounded-full cursor-pointer transition-colors relative ${
                currentUser 
                ? 'bg-emerald-500 text-white hover:bg-emerald-600 animate-pulse' 
                : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300'
              }`}
              title="Адміністративна панель"
            >
              <LogIn className="w-4 h-4" />
              {currentUser && (
                <span className="absolute -top-1 -right-1 bg-school-yellow-400 border border-slate-900 rounded-full w-2.5 h-2.5"></span>
              )}
            </button>

            {/* Mobile menu trigger hamburger */}
            <button 
              onClick={() => setMobileMenuOpen(prev => !prev)}
              className="p-2 lg:hidden bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-full cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-4.5 h-4.5" /> : <Menu className="w-4.5 h-4.5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu panel overlay */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 p-4 space-y-4 max-h-[85vh] overflow-y-auto">
            {/* Mobile Search */}
            <div className="relative">
              <input 
                type="text"
                placeholder="Пошук по сайту..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-xs pl-8 pr-3 py-1.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full text-slate-800 dark:text-slate-100"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
            </div>

            {/* Links scroll */}
            <div className="space-y-1">
              <button 
                onClick={() => handleNavClick('welcome')}
                className="w-full text-left px-3 py-2 text-xs font-bold font-display hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg text-slate-800 dark:text-slate-100"
              >
                Головна
              </button>

              {navStructure.map((group) => (
                <div key={group.id} className="space-y-1 border-l-2 border-slate-200 dark:border-slate-700 ml-2 pl-2">
                  <button
                    onClick={() => handleDropdownToggle(group.id)}
                    className="w-full text-left px-3 py-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400 flex items-center justify-between"
                  >
                    <span>{group.label}</span>
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform ${activeDropdown === group.id ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {activeDropdown === group.id && (
                    <div className="space-y-0.5 ml-2">
                      {group.items.map((item, id) => (
                        <button
                          key={id}
                          onClick={() => handleNavClick(item.target)}
                          className="w-full text-left px-3 py-1.5 text-xs rounded-md text-slate-650 dark:text-slate-350 hover:bg-slate-105"
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              <button 
                onClick={() => handleNavClick('teachers')}
                className="w-full text-left px-3 py-2 text-xs font-bold font-display hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg text-slate-800 dark:text-slate-100"
              >
                Педагогічний колектив
              </button>

              <button 
                onClick={() => handleNavClick('documents')}
                className="w-full text-left px-3 py-2 text-xs font-bold font-display hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg text-slate-800 dark:text-slate-100"
              >
                Офіційні Документи
              </button>

              <button 
                onClick={() => handleNavClick('google-workspace')}
                className="w-full text-left px-3 py-2 text-xs font-bold font-display hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg text-amber-600 dark:text-amber-400"
              >
                Google Workspace ★
              </button>

              <button 
                onClick={() => handleNavClick('news')}
                className="w-full text-left px-3 py-2 text-xs font-bold font-display hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg text-slate-800 dark:text-slate-100"
              >
                Новини та Події
              </button>

              <button 
                onClick={() => handleNavClick('gallery')}
                className="w-full text-left px-3 py-2 text-xs font-bold font-display hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg text-slate-800 dark:text-slate-100"
              >
                Фотогалерея
              </button>

              <button 
                onClick={() => handleNavClick('contacts')}
                className="w-full text-left px-3 py-2 text-xs font-bold font-display hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg text-slate-800 dark:text-slate-100"
              >
                Контакти
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Main Container */}
      <main className="flex-1 w-full flex flex-col">
        {children}
      </main>

      {/* Footer styled beautifully according to "Architectural Honesty" and visual polish */}
      <footer className="bg-slate-900 text-slate-300 dark:bg-slate-950 border-t border-slate-800 pt-12 pb-6 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          
          {/* Section 1: Logo and address info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3 text-white">
              <div className="w-9 h-9 bg-school-blue-600 rounded-lg flex items-center justify-center border border-school-yellow-400">
                <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                  <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                </svg>
              </div>
              <h3 className="font-bold text-sm font-display leading-tight">Павлівський ліцей</h3>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Заклад загальної середньої освіти І-ІІІ ступенів с. Павлівка Волинської області. Надаємо якісну, сучасну, та безпечну освіту майбутньому поколінню України.
            </p>
            <div className="space-y-1 text-xs">
              <span className="text-[10px] uppercase font-mono tracking-widest text-slate-500 block">Прямі посилання</span>
              <div className="flex flex-col space-y-1">
                <a href="https://classroom.google.com" target="_blank" rel="noopener noreferrer" className="text-school-blue-400 hover:underline">Google Classroom ↗</a>
                <a href="https://drive.google.com" target="_blank" rel="noopener noreferrer" className="text-school-blue-400 hover:underline">Документи Google Drive ↗</a>
              </div>
            </div>
          </div>

          {/* Section 2: Quick Links inside educational resources */}
          <div>
            <h4 className="font-semibold text-white text-xs uppercase tracking-wider mb-4 font-display">Швидкий доступ</h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button onClick={() => handleNavClick('about-history')} className="hover:text-white transition-colors cursor-pointer">Історія та Символіка</button>
              </li>
              <li>
                <button onClick={() => handleNavClick('administration')} className="hover:text-white transition-colors cursor-pointer">Адміністративний Склад</button>
              </li>
              <li>
                <button onClick={() => handleNavClick('students-schedule')} className="hover:text-white transition-colors cursor-pointer">Розклад уроків та Дзвінків</button>
              </li>
              <li>
                <button onClick={() => handleNavClick('parents-admission')} className="hover:text-white transition-colors cursor-pointer">Для майбутніх першокласників</button>
              </li>
              <li>
                <button onClick={() => handleNavClick('education-programs')} className="hover:text-white transition-colors cursor-pointer">Освітні програми та НУШ</button>
              </li>
              <li>
                <button onClick={() => handleNavClick('documents')} className="hover:text-white transition-colors cursor-pointer">Статут & Фінанси</button>
              </li>
            </ul>
          </div>

          {/* Section 3: Detailed contacts */}
          <div>
            <h4 className="font-semibold text-white text-xs uppercase tracking-wider mb-4 font-display">Контакти закладу</h4>
            <ul className="space-y-3 text-xs">
              <li className="flex items-start space-x-2.5">
                <MapPin className="w-4 h-4 text-school-yellow-400 shrink-0" />
                <span className="text-slate-400">вул. Шкільна, 4, с. Павлівка, Волинська область, 45342, Україна.</span>
              </li>
              <li className="flex items-center space-x-2.5">
                <Phone className="w-4 h-4 text-school-yellow-400 shrink-0" />
                <span className="text-slate-400">+38 (03374) 9-54-32</span>
              </li>
              <li className="flex items-center space-x-2.5">
                <Mail className="w-4 h-4 text-school-yellow-400 shrink-0" />
                <span className="text-slate-400">school.pavliv@gmail.com</span>
              </li>
              <li className="flex items-center space-x-2.5">
                <Clock className="w-4 h-4 text-school-yellow-400 shrink-0" />
                <span className="text-slate-400">Пн-Пт: 08:00 - 17:00</span>
              </li>
            </ul>
          </div>

          {/* Section 4: Social widgets and visits count */}
          <div className="space-y-5">
            <div>
              <h4 className="font-semibold text-white text-xs uppercase tracking-wider mb-3.5 font-display">Ми в соціальних мережах</h4>
              <div className="flex space-x-3.5">
                <a 
                  href="https://facebook.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="bg-slate-800 hover:bg-school-blue-600 text-white p-2 rounded-lg transition-all"
                  aria-label="Лицей у Facebook"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                  </svg>
                </a>
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="bg-slate-800 hover:bg-pink-500 text-white p-2 rounded-lg transition-all"
                  aria-label="Лицей у Instagram"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a 
                  href="https://youtube.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="bg-slate-800 hover:bg-red-650 text-white p-2 rounded-lg transition-all"
                  aria-label="Лицей у YouTube"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.517 3.545 12 3.545 12 3.545s-7.517 0-9.388.508a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.871.508 9.388.508 9.388.508s7.517 0 9.388-.508a3.002 3.002 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
              </div>
            </div>

            <div className="bg-slate-800 p-4 rounded-xl border border-slate-700/60">
              <h5 className="text-[10px] uppercase font-mono tracking-wider font-semibold text-slate-400 mb-1 leading-tight">Лічильник відвідувачів сайту</h5>
              <div className="flex items-baseline space-x-1">
                <span className="font-mono text-lg font-bold text-school-yellow-400 tracking-widest">{visitorsCount.toLocaleString('uk-UA')}</span>
                <span className="text-[10px] text-slate-500">візитів</span>
              </div>
              <p className="text-[9px] text-slate-500 mt-1">Оновлено в реальному часі за стандартами 2026 н.р.</p>
            </div>
          </div>
        </div>

        {/* Lower row */}
        <div className="max-w-7xl mx-auto pt-6 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500 leading-relaxed text-center space-y-3 md:space-y-0">
          <p>© {new Date().getFullYear()} Павлівський ліцей Волинської області. Всі права захищено відповідно до законодавства України.</p>
          <div className="flex space-x-4">
            <span className="hover:text-white cursor-pointer" onClick={() => handleNavClick('education-inclusive')}>Інклюзивна доступність WCAG</span>
            <span>•</span>
            <span className="hover:text-white cursor-pointer" onClick={() => handleNavClick('documents')}>Публічна інформація</span>
          </div>
        </div>
      </footer>

      {/* Admin Panel Render managed as overlay */}
      <AdminPanel isOpen={adminOpen} onClose={() => setAdminOpen(false)} />
    </div>
  );
};
