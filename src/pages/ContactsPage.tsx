import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { 
  MapPin, Phone, Mail, Clock, Send, Calendar, 
  HelpCircle, CheckCircle, Facebook, Youtube, Flame
} from 'lucide-react';
import { motion } from 'motion/react';

export const ContactsPage: React.FC = () => {
  const { addSubmission } = useData();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [targetDirector, setTargetDirector] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !message) return;

    addSubmission({
      type: targetDirector ? 'appeal' : 'general',
      senderName: name,
      email,
      phone,
      message,
      targetDirector
    });

    setName('');
    setEmail('');
    setPhone('');
    setMessage('');
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5600);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1 space-y-12">
      {/* Title */}
      <div className="text-center">
        <h1 className="text-2xl sm:text-4xl font-extrabold font-display text-slate-900 dark:text-white leading-tight">Контакти закладу</h1>
        <p className="text-xs text-slate-500 max-w-xl mx-auto mt-2.5">
          Зв’яжіться з представниками школи зручним для вас способом або залиште повідомлення у формі зворотного зв’язку.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left column: Cards of contact coordinates (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-150 dark:border-slate-800 shadow-xs space-y-5">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white font-display uppercase tracking-wider pb-2 border-b">Реквізити школи</h3>
            
            <div className="space-y-4 text-xs font-light">
              <div className="flex items-start gap-3.5">
                <MapPin className="w-5 h-5 text-school-blue-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-slate-850 dark:text-white mb-0.5">Поштова адреса</h4>
                  <p className="text-slate-500">вул. Шкільна, 4, с. Павлів, Червоноградський р-н, Львівська область, 45342, Україна.</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <Phone className="w-5 h-5 text-school-blue-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-slate-850 dark:text-white mb-0.5">Телефон канцелярії</h4>
                  <p className="text-slate-550 font-mono">+38 (03374) 9-54-32</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <Mail className="w-5 h-5 text-school-blue-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-slate-850 dark:text-white mb-0.5">Електронна логістика</h4>
                  <p className="text-slate-550">school.pavliv@gmail.com</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <Clock className="w-5 h-5 text-school-blue-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-slate-850 dark:text-white mb-0.5">Години роботи</h4>
                  <p className="text-slate-500">Понеділок - П’ятниця з 08:00 до 17:00. Субота, Неділя — вихідні.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Social integration widget info */}
          <div className="bg-slate-900 text-white p-5 rounded-2xl space-y-3.5 border border-slate-800">
            <h4 className="font-bold text-xs uppercase tracking-wide font-display text-school-yellow-400">Ми в цифровому суспільстві</h4>
            <p className="text-[11px] text-slate-300 leading-relaxed">Підписуйтесь на наші канали та стежте за яскравими відео-анонсами та подіями нашої школи.</p>
            <div className="flex gap-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs text-slate-200 hover:text-school-blue-400">
                <Facebook className="w-4 h-4 shrink-0" />
                <span>Facebook</span>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs text-slate-200 hover:text-red-500">
                <Youtube className="w-4 h-4 shrink-0" />
                <span>YouTube</span>
              </a>
            </div>
          </div>
        </div>

        {/* Right column: Interactive Map frame and dynamic form (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Map Frame visual */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-150 dark:border-slate-800 shadow-xs h-64">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2539.1171804900894!2d24.45391637719602!3d50.66212567163489!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4724df39c185e4ef%3A0xe6bf4be6a09ad5fa!2sPavlivka%252C%2520Volyn%2520Oblast%252C%2520Ukraine%252C%252045342!5e0!3m2!1sen!2sua!4v1718698745342!5m2!1sen!2sua" 
              className="w-full h-full border-0" 
              allowFullScreen 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade" 
              title="ЗЗСО І-ІІІ ст. с. Павлів мапа розташування"
            />
          </div>

          {/* Feedback Form */}
          <div className="bg-white dark:bg-slate-900 p-6 md:p-8 rounded-3xl border border-slate-150 dark:border-slate-800 shadow-xs">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white font-display mb-4">Надіслати електронне запитання канцелярії</h3>
            
            {submitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-emerald-50/20 border border-emerald-350 p-6 rounded-2xl text-center space-y-3"
              >
                <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-xs text-slate-800 dark:text-white">Дякуємо! Ваше звернення надіслано.</h4>
                <p className="text-[11px] text-slate-500">Ми опрацюємо його найближчим часом та надішлемо вам розгорнуту відповідь на електронну пошту.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-650 dark:text-slate-450 mb-1">Ваше ПІБ *</label>
                    <input 
                      type="text" 
                      required 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Сергійчук Світлана"
                      className="w-full text-xs px-3.5 py-2 border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-850 rounded-lg text-slate-805 dark:text-slate-105 focus:outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-650 dark:text-slate-450 mb-1">Електронна скринька *</label>
                    <input 
                      type="email" 
                      required 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="svitlana@gmail.com"
                      className="w-full text-xs px-3.5 py-2 border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-850 rounded-lg text-slate-805 dark:text-slate-105 focus:outline-hidden"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-650 dark:text-slate-450 mb-1">Номер телефону</label>
                    <input 
                      type="tel" 
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+380"
                      className="w-full text-xs px-3.5 py-2 border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-850 rounded-lg text-slate-805 dark:text-slate-105 focus:outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-650 dark:text-slate-450 mb-1">Адресат листа</label>
                    <select
                      value={targetDirector ? 'director' : 'general'}
                      onChange={(e) => setTargetDirector(e.target.value === 'director')}
                      className="w-full text-xs px-3.5 py-2 border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-850 rounded-lg text-slate-805 dark:text-slate-105 focus:outline-hidden"
                    >
                      <option value="general">Загальне питання (секретар)</option>
                      <option value="director">Особисто директору школи</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-650 dark:text-slate-450 mb-1">Текст повідомлення *</label>
                  <textarea 
                    required 
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Ваше запитання чи пропозиція..."
                    className="w-full text-xs px-3.5 py-2 border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-850 rounded-lg text-slate-805 dark:text-slate-105 focus:outline-hidden"
                  />
                </div>

                <button 
                  type="submit" 
                  className="bg-school-blue-600 hover:bg-school-blue-700 text-white font-bold py-2.5 px-6 rounded-lg text-xs flex items-center space-x-2 transition-colors cursor-pointer shadow-md"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Надіслати листа</span>
                </button>
              </form>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
