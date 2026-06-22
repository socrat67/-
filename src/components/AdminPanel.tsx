import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { 
  X, LogIn, LogOut, Plus, Trash2, Edit2, CheckCircle, 
  FileText, Users, Calendar, Image as ImageIcon, MessageSquare, AlertCircle, Eye
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ isOpen, onClose }) => {
  const { 
    currentUser, login, logout, 
    teachers, news, documents, events, submissions,
    addNews, editNews, deleteNews,
    addTeacher, editTeacher, deleteTeacher,
    addDocument, deleteDocument,
    addEvent, deleteEvent,
    updateSubmissionStatus
  } = useData();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [activeTab, setActiveTab] = useState<'news' | 'teachers' | 'documents' | 'events' | 'submissions'>('news');

  // Input states for creating objects
  const [newsTitle, setNewsTitle] = useState('');
  const [newsExcerpt, setNewsExcerpt] = useState('');
  const [newsContent, setNewsContent] = useState('');
  const [newsCategory, setNewsCategory] = useState('Події');
  const [newsImage, setNewsImage] = useState('https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&q=80&w=700');

  const [teacherName, setTeacherName] = useState('');
  const [teacherSubject, setTeacherSubject] = useState('');
  const [teacherCategory, setTeacherCategory] = useState('Спеціаліст вищої категорії');
  const [teacherExp, setTeacherExp] = useState(1);
  const [teacherEmail, setTeacherEmail] = useState('');
  const [teacherPhoto, setTeacherPhoto] = useState('https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300');

  const [docTitle, setDocTitle] = useState('');
  const [docCategory, setDocCategory] = useState<'statut' | 'licence' | 'programs' | 'plan' | 'finance' | 'public'>('statut');
  const [docUrl, setDocUrl] = useState('https://docs.google.com/document/d/1X50K1_A_example_statut/view');

  const [eventTitle, setEventTitle] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventTime, setEventTime] = useState('');
  const [eventDesc, setEventDesc] = useState('');
  const [eventCategory, setEventCategory] = useState<'olympiad' | 'holiday' | 'meeting' | 'contest' | 'general'>('general');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    const success = await login(email, password);
    if (success) {
      setEmail('');
      setPassword('');
    } else {
      setErrorMsg('Невірний пароль! Спробуйте "admin2026".');
    }
  };

  const handleCreateNews = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsTitle || !newsContent) return;
    addNews({
      title: newsTitle,
      excerpt: newsExcerpt || newsContent.slice(0, 100) + '...',
      content: newsContent,
      category: newsCategory,
      imageUrl: newsImage,
      date: new Date().toISOString().split('T')[0]
    });
    setNewsTitle('');
    setNewsExcerpt('');
    setNewsContent('');
  };

  const handleCreateTeacher = (e: React.FormEvent) => {
    e.preventDefault();
    if (!teacherName || !teacherSubject) return;
    addTeacher({
      name: teacherName,
      subject: teacherSubject,
      category: teacherCategory,
      experience: Number(teacherExp),
      email: teacherEmail || 't.new@pavliv.school.ukr.education',
      photo: teacherPhoto
    });
    setTeacherName('');
    setTeacherSubject('');
    setTeacherEmail('');
  };

  const handleCreateDoc = (e: React.FormEvent) => {
    e.preventDefault();
    if (!docTitle) return;
    addDocument({
      title: docTitle,
      category: docCategory,
      fileUrl: docUrl
    });
    setDocTitle('');
  };

  const handleCreateEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!eventTitle || !eventDate) return;
    addEvent({
      title: eventTitle,
      date: eventDate,
      time: eventTime || undefined,
      description: eventDesc,
      category: eventCategory
    });
    setEventTitle('');
    setEventDate('');
    setEventTime('');
    setEventDesc('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white dark:bg-slate-900 w-full max-w-5xl h-[85vh] rounded-2xl shadow-2xl overflow-hidden flex flex-col border border-slate-200 dark:border-slate-800"
      >
        {/* Header */}
        <div className="bg-school-blue-700 text-white p-5 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <LockIcon className="w-6 h-6 text-school-yellow-400" />
            <div>
              <h2 className="text-xl font-bold font-display">Адміністративна панель керування</h2>
              <p className="text-xs text-school-blue-200">
                {currentUser ? `Увійшли як: ${currentUser.email} (${currentUser.role === 'admin' ? 'Адміністратор' : 'Редактор'})` : 'Авторизація адміністратора'}
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1 hover:bg-school-blue-800 rounded-full transition-colors cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Auth View or Dashboard view */}
        {!currentUser ? (
          <div className="flex-1 flex items-center justify-center p-8 bg-slate-50 dark:bg-slate-950">
            <form onSubmit={handleLogin} className="bg-white dark:bg-slate-900 p-8 rounded-xl shadow-lg max-w-sm w-full border border-slate-100 dark:border-slate-800">
              <h3 className="text-lg font-bold mb-4 font-display text-slate-800 dark:text-slate-100 text-center">Цей розділ потребує паролю доступу</h3>
              <p className="text-xs text-slate-500 mb-6 text-center">Будь ласка, введіть ваші реквізити для керування новинами, вчителями та документами закладу.</p>
              
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">Email</label>
                  <input 
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@pavliv.school"
                    required
                    className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-150 focus:outline-hidden focus:ring-1 focus:ring-school-blue-500" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">Пароль доступу</label>
                  <input 
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-150 focus:outline-hidden focus:ring-1 focus:ring-school-blue-500" 
                  />
                </div>
              </div>

              {errorMsg && (
                <div className="flex items-center space-x-2 text-red-500 text-xs mb-4 bg-red-50 dark:bg-red-950/20 p-2.5 rounded-lg">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <button 
                type="submit"
                className="w-full bg-school-blue-600 hover:bg-school-blue-700 text-white font-medium py-2 rounded-lg text-sm transition-colors flex items-center justify-center space-x-2 cursor-pointer shadow-md"
              >
                <LogIn className="w-4 h-4" />
                <span>Увійти в панель</span>
              </button>
              
              <div className="mt-4 text-center">
                <span className="text-[11px] text-slate-400">Підказка: Пароль за замовчуванням <strong>admin2026</strong></span>
              </div>
            </form>
          </div>
        ) : (
          <div className="flex-1 flex overflow-hidden">
            {/* Sidebar layout */}
            <div className="w-56 bg-slate-50 dark:bg-slate-950 border-r border-slate-200 dark:border-slate-800 flex flex-col justify-between p-4">
              <nav className="space-y-1">
                <button
                  onClick={() => setActiveTab('news')}
                  className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                    activeTab === 'news' 
                    ? 'bg-school-blue-500 text-white shadow-xs' 
                    : 'text-slate-650 dark:text-slate-400 hover:bg-slate-150 dark:hover:bg-slate-800'
                  }`}
                >
                  <FileText className="w-4 h-4" />
                  <span>Повідомлення & Новини</span>
                </button>
                <button
                  onClick={() => setActiveTab('teachers')}
                  className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                    activeTab === 'teachers' 
                    ? 'bg-school-blue-500 text-white shadow-xs' 
                    : 'text-slate-650 dark:text-slate-400 hover:bg-slate-150 dark:hover:bg-slate-800'
                  }`}
                >
                  <Users className="w-4 h-4" />
                  <span>Вчителі & Кадри</span>
                </button>
                <button
                  onClick={() => setActiveTab('documents')}
                  className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                    activeTab === 'documents' 
                    ? 'bg-school-blue-500 text-white shadow-xs' 
                    : 'text-slate-650 dark:text-slate-400 hover:bg-slate-150 dark:hover:bg-slate-800'
                  }`}
                >
                  <FileText className="w-4 h-4 font-bold" />
                  <span>Нормативні Документи</span>
                </button>
                <button
                  onClick={() => setActiveTab('events')}
                  className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                    activeTab === 'events' 
                    ? 'bg-school-blue-500 text-white shadow-xs' 
                    : 'text-slate-650 dark:text-slate-400 hover:bg-slate-150 dark:hover:bg-slate-800'
                  }`}
                >
                  <Calendar className="w-4 h-4" />
                  <span>Календар & Події</span>
                </button>
                <button
                  onClick={() => setActiveTab('submissions')}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                    activeTab === 'submissions' 
                    ? 'bg-school-blue-500 text-white shadow-xs' 
                    : 'text-slate-650 dark:text-slate-400 hover:bg-slate-150 dark:hover:bg-slate-800'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <MessageSquare className="w-4 h-4" />
                    <span>Звернення громадян</span>
                  </div>
                  {submissions.filter(s => s.status === 'new').length > 0 && (
                    <span className="bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold">
                      {submissions.filter(s => s.status === 'new').length}
                    </span>
                  )}
                </button>
              </nav>

              <button
                onClick={logout}
                className="w-full flex items-center space-x-3 px-3 py-2 text-xs font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-lg transition-colors mt-auto cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                <span>Вийти з кабінету</span>
              </button>
            </div>

            {/* Sub-panels */}
            <div className="flex-1 overflow-y-auto p-6 bg-slate-50 dark:bg-slate-950">
              <AnimatePresence mode="wait">
                
                {/* NEWS TAB */}
                {activeTab === 'news' && (
                  <motion.div
                    key="news"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-6"
                  >
                    <div className="bg-white dark:bg-slate-900 p-5 rounded-xl shadow-xs border border-slate-100 dark:border-slate-800">
                      <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-1.5 font-display">
                        <Plus className="w-4 h-4 text-school-blue-600" />
                        Додати нову публікацію / новину
                      </h4>
                      <form onSubmit={handleCreateNews} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[11px] font-semibold text-slate-500 mb-1">Заголовок новини</label>
                            <input 
                              type="text" 
                              required
                              value={newsTitle}
                              onChange={(e) => setNewsTitle(e.target.value)}
                              placeholder="Наприклад: Перемога учнів у конкурсі..."
                              className="w-full px-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md focus:outline-hidden text-slate-800 dark:text-slate-100"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] font-semibold text-slate-500 mb-1">Категорія новини</label>
                            <select 
                              value={newsCategory}
                              onChange={(e) => setNewsCategory(e.target.value)}
                              className="w-full px-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md focus:outline-hidden text-slate-800 dark:text-slate-100"
                            >
                              <option>Події</option>
                              <option>Оголошення</option>
                              <option>Досягнення</option>
                              <option>Спорт та здоровий спосіб життя</option>
                            </select>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[11px] font-semibold text-slate-500 mb-1">Короткий опис (Excerpt)</label>
                            <input 
                              type="text" 
                              value={newsExcerpt}
                              onChange={(e) => setNewsExcerpt(e.target.value)}
                              placeholder="Короткий лід для анонсу..."
                              className="w-full px-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md focus:outline-hidden text-slate-800 dark:text-slate-100"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] font-semibold text-slate-500 mb-1">Посилання на фото новини (URL)</label>
                            <input 
                              type="text" 
                              value={newsImage}
                              onChange={(e) => setNewsImage(e.target.value)}
                              placeholder="URL картинки..."
                              className="w-full px-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md focus:outline-hidden text-slate-800 dark:text-slate-100"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-[11px] font-semibold text-slate-500 mb-1">Повний текст новини</label>
                          <textarea 
                            required
                            rows={4}
                            value={newsContent}
                            onChange={(e) => setNewsContent(e.target.value)}
                            placeholder="Напишіть детальний текст публікації..."
                            className="w-full px-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md focus:outline-hidden text-slate-800 dark:text-slate-100"
                          ></textarea>
                        </div>

                        <button 
                          type="submit"
                          className="bg-school-blue-600 hover:bg-school-blue-700 text-white font-medium px-4 py-1.5 rounded-lg text-xs cursor-pointer shadow-xs"
                        >
                          Опублікувати новину
                        </button>
                      </form>
                    </div>

                    {/* Manage list */}
                    <div className="bg-white dark:bg-slate-900 p-5 rounded-xl shadow-xs border border-slate-100 dark:border-slate-800">
                      <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-3 font-display">Існуючі новини ({news.length})</h4>
                      <div className="divide-y divide-slate-100 dark:divide-slate-800">
                        {news.map((item) => (
                          <div key={item.id} className="py-3 flex items-center justify-between">
                            <div>
                              <p className="text-xs font-semibold text-slate-850 dark:text-slate-200">{item.title}</p>
                              <span className="text-[10px] text-slate-450 dark:text-slate-550">{item.date} | Категорія: {item.category} | {item.views} переглядів</span>
                            </div>
                            <button
                              onClick={() => deleteNews(item.id)}
                              className="p-1 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-md transition-colors cursor-pointer"
                              title="Видалити"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* TEACHERS TAB */}
                {activeTab === 'teachers' && (
                  <motion.div
                    key="teachers"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-6"
                  >
                    <div className="bg-white dark:bg-slate-900 p-5 rounded-xl shadow-xs border border-slate-100 dark:border-slate-800">
                      <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-1.5 font-display">
                        <Plus className="w-4 h-4 text-school-blue-600" />
                        Додати вчителя до колективу
                      </h4>
                      <form onSubmit={handleCreateTeacher} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[11px] font-semibold text-slate-500 mb-1">ПІБ вчителя</label>
                            <input 
                              type="text" 
                              required
                              value={teacherName}
                              onChange={(e) => setTeacherName(e.target.value)}
                              placeholder="Коваль Петро Олександрович"
                              className="w-full px-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md focus:outline-hidden text-slate-800 dark:text-slate-100"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] font-semibold text-slate-500 mb-1">Предмети, що викладає</label>
                            <input 
                              type="text" 
                              required
                              value={teacherSubject}
                              onChange={(e) => setTeacherSubject(e.target.value)}
                              placeholder="Хімія, Основи здоров'я"
                              className="w-full px-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md focus:outline-hidden text-slate-800 dark:text-slate-100"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <label className="block text-[11px] font-semibold text-slate-500 mb-1">Категорія / Звання</label>
                            <input 
                              type="text" 
                              value={teacherCategory}
                              onChange={(e) => setTeacherCategory(e.target.value)}
                              placeholder="Спеціаліст вищої категорії"
                              className="w-full px-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md focus:outline-hidden text-slate-800 dark:text-slate-100"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] font-semibold text-slate-500 mb-1">Педагогічний стаж (років)</label>
                            <input 
                              type="number" 
                              value={teacherExp}
                              onChange={(e) => setTeacherExp(Number(e.target.value))}
                              min={1}
                              max={60}
                              className="w-full px-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md focus:outline-hidden text-slate-800 dark:text-slate-100"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] font-semibold text-slate-500 mb-1">Email вчителя</label>
                            <input 
                              type="email" 
                              value={teacherEmail}
                              onChange={(e) => setTeacherEmail(e.target.value)}
                              placeholder="p.koval@pavliv.school.ukr.education"
                              className="w-full px-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md focus:outline-hidden text-slate-800 dark:text-slate-100"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-[11px] font-semibold text-slate-500 mb-1">Посилання на фото портрет (URL)</label>
                          <input 
                            type="text" 
                            value={teacherPhoto}
                            onChange={(e) => setTeacherPhoto(e.target.value)}
                            className="w-full px-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md focus:outline-hidden text-slate-800 dark:text-slate-100"
                          />
                        </div>

                        <button 
                          type="submit"
                          className="bg-school-blue-600 hover:bg-school-blue-700 text-white font-medium px-4 py-1.5 rounded-lg text-xs cursor-pointer shadow-xs"
                        >
                          Додати до колективу
                        </button>
                      </form>
                    </div>

                    {/* Manage list */}
                    <div className="bg-white dark:bg-slate-900 p-5 rounded-xl shadow-xs border border-slate-100 dark:border-slate-800">
                      <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-3 font-display">Існуючі педпрацівники ({teachers.length})</h4>
                      <div className="divide-y divide-slate-100 dark:divide-slate-800">
                        {teachers.map((item) => (
                          <div key={item.id} className="py-2.5 flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <img src={item.photo} alt={item.name} className="w-10 h-10 object-cover rounded-full border border-slate-200" />
                              <div>
                                <p className="text-xs font-semibold text-slate-850 dark:text-slate-100">{item.name}</p>
                                <span className="text-[10px] text-slate-400">{item.subject} | Досвід: {item.experience} р.</span>
                              </div>
                            </div>
                            <button
                              onClick={() => deleteTeacher(item.id)}
                              className="p-1 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-md transition-colors cursor-pointer"
                              title="Видалити"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* DOCUMENTS TAB */}
                {activeTab === 'documents' && (
                  <motion.div
                    key="documents"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-6"
                  >
                    <div className="bg-white dark:bg-slate-900 p-5 rounded-xl shadow-xs border border-slate-100 dark:border-slate-800">
                      <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-1.5 font-display">
                        <Plus className="w-4 h-4 text-school-blue-600" />
                        Завантажити офіційний документ / звіт
                      </h4>
                      <form onSubmit={handleCreateDoc} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[11px] font-semibold text-slate-500 mb-1">Назва документа</label>
                            <input 
                              type="text" 
                              required
                              value={docTitle}
                              onChange={(e) => setDocTitle(e.target.value)}
                              placeholder="Наприклад: Звіт про прозорість за 2025..."
                              className="w-full px-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md focus:outline-hidden text-slate-800 dark:text-slate-100"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] font-semibold text-slate-500 mb-1">Розділ документа</label>
                            <select 
                              value={docCategory}
                              onChange={(e) => setDocCategory(e.target.value as any)}
                              className="w-full px-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md focus:outline-hidden text-slate-800 dark:text-slate-100"
                            >
                              <option value="statut">Статут закладу</option>
                              <option value="licence">Ліцензії та Дозволи</option>
                              <option value="programs">Освітні програми</option>
                              <option value="plan">Річний план</option>
                              <option value="finance">Фінансова звітність</option>
                              <option value="public">Публічна інформація</option>
                            </select>
                          </div>
                        </div>

                        <div>
                          <label className="block text-[11px] font-semibold text-slate-500 mb-1">Посилання на файл або Google Drive</label>
                          <input 
                            type="text"
                            value={docUrl}
                            onChange={(e) => setDocUrl(e.target.value)}
                            className="w-full px-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md focus:outline-hidden text-slate-800 dark:text-slate-100"
                          />
                        </div>

                        <button 
                          type="submit"
                          className="bg-school-blue-600 hover:bg-school-blue-700 text-white font-medium px-4 py-1.5 rounded-lg text-xs cursor-pointer shadow-xs"
                        >
                          Зберегти документ
                        </button>
                      </form>
                    </div>

                    {/* Manage docs list */}
                    <div className="bg-white dark:bg-slate-900 p-5 rounded-xl shadow-xs border border-slate-100 dark:border-slate-800">
                      <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-3 font-display">Існуючі юридичні документи ({documents.length})</h4>
                      <div className="divide-y divide-slate-100 dark:divide-slate-800">
                        {documents.map((doc) => (
                          <div key={doc.id} className="py-2.5 flex items-center justify-between">
                            <div className="flex items-center space-x-2.5">
                              <FileText className="w-4 h-4 text-slate-400 shrink-0" />
                              <div>
                                <p className="text-xs font-semibold text-slate-850 dark:text-slate-200">{doc.title}</p>
                                <span className="text-[10px] text-slate-400">Розділ: {doc.category} | Додано: {doc.dateAdded} | Розмір: {doc.size}</span>
                              </div>
                            </div>
                            <button
                              onClick={() => deleteDocument(doc.id)}
                              className="p-1 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-md transition-colors cursor-pointer"
                              title="Видалити"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* EVENTS TAB */}
                {activeTab === 'events' && (
                  <motion.div
                    key="events"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-6"
                  >
                    <div className="bg-white dark:bg-slate-900 p-5 rounded-xl shadow-xs border border-slate-100 dark:border-slate-800">
                      <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-1.5 font-display">
                        <Plus className="w-4 h-4 text-school-blue-600" />
                        Створити календарну подію або захід
                      </h4>
                      <form onSubmit={handleCreateEvent} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="md:col-span-2">
                            <label className="block text-[11px] font-semibold text-slate-500 mb-1">Назва події</label>
                            <input 
                              type="text" 
                              required
                              value={eventTitle}
                              onChange={(e) => setEventTitle(e.target.value)}
                              placeholder="Батьківські збори..."
                              className="w-full px-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md focus:outline-hidden text-slate-800 dark:text-slate-100"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] font-semibold text-slate-500 mb-1">Тип події</label>
                            <select 
                              value={eventCategory}
                              onChange={(e) => setEventCategory(e.target.value as any)}
                              className="w-full px-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md focus:outline-hidden text-slate-800 dark:text-slate-100"
                            >
                              <option value="holiday">Свято / Урочистість</option>
                              <option value="olympiad">Олімпіади та Конкурси</option>
                              <option value="meeting">Педагогічні збори / Семінари</option>
                              <option value="general">Загальне оголошення</option>
                            </select>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[11px] font-semibold text-slate-500 mb-1">Дата</label>
                            <input 
                              type="date" 
                              required
                              value={eventDate}
                              onChange={(e) => setEventDate(e.target.value)}
                              className="w-full px-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md focus:outline-hidden text-slate-800 dark:text-slate-100"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] font-semibold text-slate-500 mb-1">Час початку (необов'язково)</label>
                            <input 
                              type="time" 
                              value={eventTime}
                              onChange={(e) => setEventTime(e.target.value)}
                              className="w-full px-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md focus:outline-hidden text-slate-800 dark:text-slate-100"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-[11px] font-semibold text-slate-500 mb-1">Короткий опис заходу</label>
                          <input 
                            type="text" 
                            value={eventDesc}
                            onChange={(e) => setEventDesc(e.target.value)}
                            placeholder="Опишіть регламент або цільову аудиторію події..."
                            className="w-full px-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md focus:outline-hidden text-slate-800 dark:text-slate-100"
                          />
                        </div>

                        <button 
                          type="submit"
                          className="bg-school-blue-600 hover:bg-school-blue-700 text-white font-medium px-4 py-1.5 rounded-lg text-xs cursor-pointer shadow-xs"
                        >
                          Додати подію
                        </button>
                      </form>
                    </div>

                    {/* Manage event list */}
                    <div className="bg-white dark:bg-slate-900 p-5 rounded-xl shadow-xs border border-slate-100 dark:border-slate-800">
                      <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-3 font-display">Майбутній календар подій ({events.length})</h4>
                      <div className="divide-y divide-slate-100 dark:divide-slate-800">
                        {events.map((e) => (
                          <div key={e.id} className="py-2.5 flex items-center justify-between">
                            <div className="flex items-center space-x-2.5">
                              <Calendar className="w-4 h-4 text-slate-400" />
                              <div>
                                <p className="text-xs font-semibold text-slate-850 dark:text-slate-200">{e.title}</p>
                                <span className="text-[10px] text-slate-400">Дата: {e.date} {e.time ? `о ${e.time}` : ''} | Тип: {e.category}</span>
                              </div>
                            </div>
                            <button
                              onClick={() => deleteEvent(e.id)}
                              className="p-1 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-md transition-colors cursor-pointer"
                              title="Видалити"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* SUBMISSIONS TAB */}
                {activeTab === 'submissions' && (
                  <motion.div
                    key="submissions"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-4"
                  >
                    <div className="bg-white dark:bg-slate-900 p-5 rounded-xl shadow-xs border border-slate-100 dark:border-slate-800">
                      <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-3 font-display">Електронна приймальна громадян ({submissions.length})</h4>
                      <p className="text-xs text-slate-500 mb-4">Тут відображаються листи батьків та учнів, отримані через форми онлайн-звернення та прийому до 1 класу.</p>
                      
                      <div className="space-y-4">
                        {submissions.length === 0 ? (
                          <p className="text-xs text-center text-slate-400 py-6">Жодного звернення ще не отримано.</p>
                        ) : (
                          submissions.map((sub) => (
                            <div 
                              key={sub.id} 
                              className={`p-4 rounded-xl border transition-all ${
                                sub.status === 'new' 
                                ? 'bg-orange-50/20 border-orange-200 dark:border-orange-900/30' 
                                : 'bg-slate-50 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800'
                              }`}
                            >
                              <div className="flex items-start justify-between">
                                <div>
                                  <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold uppercase ${
                                    sub.type === 'admission' 
                                    ? 'bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300'
                                    : 'bg-school-blue-100 text-school-blue-700 dark:bg-school-blue-950'
                                  }`}>
                                    {sub.type === 'appeal' ? 'Звернення до директора' : sub.type === 'admission' ? 'Вступ до 1-го класу' : 'Загальне питання'}
                                  </span>
                                  <h5 className="text-xs font-bold mt-1.5 text-slate-800 dark:text-slate-100">{sub.senderName}</h5>
                                  <p className="text-[10px] text-slate-450 mt-0.5">Email: {sub.email} | Тлф: {sub.phone} | Дата: {sub.date}</p>
                                </div>
                                <div className="text-right">
                                  {sub.status === 'new' ? (
                                    <button
                                      onClick={() => updateSubmissionStatus(sub.id, 'processed')}
                                      className="text-xs bg-emerald-500 hover:bg-emerald-600 text-white font-medium px-2.5 py-1 rounded-md flex items-center gap-1 cursor-pointer transition-colors"
                                    >
                                      <CheckCircle className="w-3.5 h-3.5" />
                                      Опрацьовано
                                    </button>
                                  ) : (
                                    <span className="text-[10px] text-emerald-500 font-semibold flex items-center gap-1 justify-end">
                                      <CheckCircle className="w-3.5 h-3.5" /> Опрацьовано
                                    </span>
                                  )}
                                </div>
                              </div>
                              <p className="text-xs text-slate-650 dark:text-slate-350 mt-3 p-3 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-lg italic">
                                "{sub.message}"
                              </p>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

/* Custom inline SVG component preventing build error and keeping styling beautiful */
const LockIcon: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2500/svg" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
};
