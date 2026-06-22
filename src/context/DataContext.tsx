import React, { createContext, useContext, useState, useEffect } from 'react';
import { Teacher, NewsItem, SchoolDocument, EventItem, GalleryItem, FeedbackSubmission, User } from '../types';

interface DataContextType {
  teachers: Teacher[];
  news: NewsItem[];
  documents: SchoolDocument[];
  events: EventItem[];
  gallery: GalleryItem[];
  submissions: FeedbackSubmission[];
  currentUser: User | null;
  siteLanguage: 'ua' | 'en';
  searchQuery: string;
  
  // CRUD & Actions
  setSearchQuery: (query: string) => void;
  setSiteLanguage: (lang: 'ua' | 'en') => void;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  registerUser: (email: string, role: 'admin' | 'editor' | 'guest') => void;
  
  // News Actions
  addNews: (item: Omit<NewsItem, 'id' | 'views'>) => void;
  editNews: (id: string, updated: Partial<NewsItem>) => void;
  deleteNews: (id: string) => void;
  incrementNewsViews: (id: string) => void;

  // Teacher Actions
  addTeacher: (item: Omit<Teacher, 'id'>) => void;
  editTeacher: (id: string, updated: Partial<Teacher>) => void;
  deleteTeacher: (id: string) => void;

  // Document Actions
  addDocument: (doc: Omit<SchoolDocument, 'id' | 'dateAdded' | 'size'>) => void;
  deleteDocument: (id: string) => void;

  // Event Actions
  addEvent: (event: Omit<EventItem, 'id'>) => void;
  deleteEvent: (id: string) => void;

  // Gallery Actions
  addGalleryItem: (item: Omit<GalleryItem, 'id'>) => void;
  deleteGalleryItem: (id: string) => void;

  // Feedback Actions
  addSubmission: (sub: Omit<FeedbackSubmission, 'id' | 'date' | 'status'>) => void;
  updateSubmissionStatus: (id: string, status: 'new' | 'processed') => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [siteLanguage, setSiteLanguageState] = useState<'ua' | 'en'>('ua');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // Load from LocalStorage or use default high fidelity state
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [documents, setDocuments] = useState<SchoolDocument[]>([]);
  const [events, setEvents] = useState<EventItem[]>([]);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [submissions, setSubmissions] = useState<FeedbackSubmission[]>([]);

  // Initial Seed Data (Ukrainian language)
  useEffect(() => {
    const localTeachers = localStorage.getItem('school_teachers');
    const localNews = localStorage.getItem('school_news');
    const localDocs = localStorage.getItem('school_docs_v2');
    const localEvents = localStorage.getItem('school_events');
    const localGallery = localStorage.getItem('school_gallery');
    const localSubs = localStorage.getItem('school_submissions');
    const localUser = localStorage.getItem('school_current_user');

    if (localUser) {
      setCurrentUser(JSON.parse(localUser));
    }

    if (localTeachers) {
      setTeachers(JSON.parse(localTeachers));
    } else {
      const defaultTeachers: Teacher[] = [
        {
          id: '1',
          name: 'Ярош Олена Миколаївна',
          subject: 'Українська мова та література',
          photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=300',
          category: 'Спеціаліст вищої категорії, вчитель-методист',
          experience: 23,
          email: 'o.yarosh@pavliv.school.ukr.education'
        },
        {
          id: '2',
          name: 'Ковальчук Іван Петрович',
          subject: 'Математика, Інформатика',
          photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=300',
          category: 'Спеціаліст вищої категорії',
          experience: 18,
          email: 'i.kovalchuk@pavliv.school.ukr.education'
        },
        {
          id: '3',
          name: 'Бондар Ганна Василівна',
          subject: 'Історія України, Правознавство',
          photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300',
          category: 'Спеціаліст І категорії',
          experience: 12,
          email: 'h.bondar@pavliv.school.ukr.education'
        },
        {
          id: '4',
          name: 'Григоренко Віктор Степанович',
          subject: 'Фізика, Астрономія',
          photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=300',
          category: 'Спеціаліст вищої категорії, старший вчитель',
          experience: 27,
          email: 'v.grygorenko@pavliv.school.ukr.education'
        },
        {
          id: '5',
          name: 'Мельник Тетяна Дмитрівна',
          subject: 'Англійська та Німецька мови',
          photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=300',
          category: 'Спеціаліст ІІ категорії',
          experience: 6,
          email: 't.melnyk@pavliv.school.ukr.education'
        },
        {
          id: '6',
          name: 'Клименко Ольга Андріївна',
          subject: 'Біологія, Географія',
          photo: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&q=80&w=300',
          category: 'Спеціаліст вищої категорії',
          experience: 15,
          email: 'o.klymenko@pavliv.school.ukr.education'
        }
      ];
      setTeachers(defaultTeachers);
      localStorage.setItem('school_teachers', JSON.stringify(defaultTeachers));
    }

    if (localNews) {
      setNews(JSON.parse(localNews));
    } else {
      const defaultNews: NewsItem[] = [
        {
          id: 'n1',
          title: 'Заклад загальної середньої освіти І-ІІІ ст. с. Павлів урочисто відкриває новий кабінет робототехніки та STEM-освіти',
          excerpt: 'Завдяки співпраці з громадою та залученню грантових коштів, учні нашої школи тепер матимуть змогу конструювати сучасних роботів.',
          content: 'У нашому закладі відбулося офіційне відкриття сучасного освітнього STEM-простору. Кабінет оснащено 3D-принтерами, найсучаснішими наборами конструкторів Lego Education Spike Prime, датчиками для проведення фізико-хімічних досліджень Vernier та комп’ютерним обладнанням. Директор школи відзначив, що це відкриває неймовірні горизонти для творчих дітей, а вчителі інформатики та фізики вже пройшли відповідне сертифікаційне навчання для впровадження новітніх технологій у навчальну програму.',
          category: 'Події',
          imageUrl: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=700',
          date: '2026-06-12',
          views: 142
        },
        {
          id: 'n2',
          title: 'Учні Закладу загальної середньої освіти І-ІІІ ст. с. Павлів вибороли призові місця на олімпіадах',
          excerpt: 'Щиро вітаємо наших переможців та їхніх наставників з визначним результатом на регіональному рівні!',
          content: 'Ми пишаємося здобутками наших вихованців! На обласному етапі Всеукраїнської учнівської олімпіади з інформаційних технологій учень 11-А класу Ковальчук Дмитро посів почесне ІІ місце, а учениця 10-Б класу Семенюк Марія виборола ІІІ місце. Підготовкою учнів займався вчитель інформатики Ковальчук Іван Петрович. Бажаємо команді не зупинятися на досягнутому та прагнути підкорення нових наукових вершин!',
          category: 'Досягнення',
          imageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=700',
          date: '2026-05-28',
          views: 95
        },
        {
          id: 'n3',
          title: 'Організація безпечного простору: у школі облаштовано затишне та безпечне укриття за стандартами ДСНС',
          excerpt: 'Безпека під час навчального процесу є першочерговим пріоритетом. Ознайомтеся з облаштуванням та правилами перебування в укритті.',
          content: 'Адміністрація Закладу загальної середньої освіти І-ІІІ ст. с. Павлів звітує про завершення модернізації цокольного приміщення під сучасне цивільне укриття безпечного типу. Облаштовано зони для відпочинку, навчальні сектора, де інтегровано Wi-Fi мережу для доступу до навчальних матеріалів, санітарні кімнати, медичний куточок з аптечками першої допомоги, великий запас питної води та вентиляційну систему очищення повітря. Стіни прикрасили малюнками учнів для створення позитивного психологічного фону.',
          category: 'Оголошення',
          imageUrl: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=700',
          date: '2026-05-15',
          views: 210
        },
        {
          id: 'n4',
          title: 'Родинний екологічний фестиваль «Зелені серця Павлова» об’єднав понад 300 учасників',
          excerpt: 'Спільне висаджування дерев, збір вторинної сировини та благодійний ярмарок на підтримку ландшафтного парку.',
          content: 'У суботу на подвір’ї школи пройшов масштабний захід, присвячений захисту довкілля та здоровому способу життя. Спільно учні, батьки та педагоги висадили понад 45 нових туй і декоративних кущів навколо спортивного майданчика. В межах фестивалю відбувся благодійний ярмарок домашньої випічки, під час якого зібрано 15 400 грн. Весь прибуток буде передано на придбання ліків для місцевих ветеранів та військовослужбовців на Сході.',
          category: 'Події',
          imageUrl: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&q=80&w=700',
          date: '2026-04-20',
          views: 187
        }
      ];
      setNews(defaultNews);
      localStorage.setItem('school_news', JSON.stringify(defaultNews));
    }

    if (localDocs) {
      setDocuments(JSON.parse(localDocs));
    } else {
      const defaultDocs: SchoolDocument[] = [
        {
          id: 'd1',
          title: 'Статут Закладу загальної середньої освіти І-ІІІ ст. с. Павлів Львівської області (Нова редакція 2024)',
          category: 'statut',
          fileUrl: 'https://docs.google.com/document/d/1X50K1_A_example_statut/view',
          dateAdded: '2024-09-01',
          size: '1.2 MB'
        },
        {
          id: 'd2',
          title: 'Ліцензія на провадження освітньої діяльності закладу загальної середньої освіти',
          category: 'licence',
          fileUrl: 'https://docs.google.com/document/d/1Y_example_licence/view',
          dateAdded: '2023-05-11',
          size: '840 KB'
        },
        {
          id: 'd3',
          title: 'Освітня програма школи на 2025/2026 навчальний рік (Початкова, Базова та Профільна ланка)',
          category: 'programs',
          fileUrl: 'https://docs.google.com/document/d/1Z_example_program/view',
          dateAdded: '2025-08-28',
          size: '2.4 MB'
        },
        {
          id: 'd4',
          title: 'Річний план роботи закладу освіти на 2025-2026 навчальний рік',
          category: 'plan',
          fileUrl: 'https://docs.google.com/document/d/1A_example_plan/view',
          dateAdded: '2025-08-30',
          size: '3.1 MB'
        },
        {
          id: 'd5',
          title: 'Фінансовий звіт про надходження та використання коштів за 2025 рік',
          category: 'finance',
          fileUrl: 'https://docs.google.com/spreadsheets/d/1B_example_finance/view',
          dateAdded: '2026-01-15',
          size: '420 KB'
        },
        {
          id: 'd6',
          title: 'План заходів, спрямованих на запобігання та протидію булінгу (цькуванню) в закладі',
          category: 'public',
          fileUrl: 'https://docs.google.com/document/d/1C_example_bullying/view',
          dateAdded: '2025-09-02',
          size: '720 KB'
        }
      ];
      setDocuments(defaultDocs);
      localStorage.setItem('school_docs_v2', JSON.stringify(defaultDocs));
    }

    if (localEvents) {
      setEvents(JSON.parse(localEvents));
    } else {
      const defaultEvents: EventItem[] = [
        {
          id: 'e1',
          title: 'Урочисті збори школи та Свято Останнього Дзвоника',
          date: '2026-06-19',
          time: '09:00',
          description: 'Святковий захід, присвячений закінченню навчального року. Особливі вітання 11-класникам!',
          category: 'holiday'
        },
        {
          id: 'e2',
          title: 'Педагогічна рада: підсумки ІІ семестру та перспективи',
          date: '2026-06-23',
          time: '11:00',
          description: 'Підбиття підсумків оцінювання учнів та затвердження програм літнього оздоровлення.',
          category: 'meeting'
        },
        {
          id: 'e3',
          title: 'Початок прийому заяв до 1-го класу на 2026/2027 рік',
          date: '2026-06-25',
          time: '08:30',
          description: 'Подача документів у кабінет секретаря школи за затвердженим переліком.',
          category: 'general'
        },
        {
          id: 'e4',
          title: 'Психологічний практикум для батьків майбутніх першокласників «Упевнений старт»',
          date: '2026-06-30',
          time: '17:00',
          description: 'Зустріч з практичним психологом у шкільному STEM-хабі з приводу адаптації дитини.',
          category: 'meeting'
        }
      ];
      setEvents(defaultEvents);
      localStorage.setItem('school_events', JSON.stringify(defaultEvents));
    }

    if (localGallery) {
      setGallery(JSON.parse(localGallery));
    } else {
      const defaultGallery: GalleryItem[] = [
        { id: 'g1', title: 'Сучасна Будівля ЗЗСО І-ІІІ ст. с. Павлів здалеку', type: 'photo', url: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=600', album: 'Наш заклад' },
        { id: 'g2', title: 'Урок фізики у новому STEM класі', type: 'photo', url: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=600', album: 'Навчальний Процес' },
        { id: 'g3', title: 'Шкільна бібліотека з медіатекою', type: 'photo', url: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&q=80&w=600', album: 'Наша школа' },
        { id: 'g4', title: 'Футбольний матч на штучному майданчику школи', type: 'photo', url: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&q=80&w=600', album: 'Спорт та Дозвілля' },
        { id: 'g5', title: 'Благодійний осінній ярмарок біля школи', type: 'photo', url: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=600', album: 'Свята та Фестивалі' },
        { id: 'g6', title: 'Творчий виступ нашої вокальної студії', type: 'photo', url: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=600', album: 'Свята та Фестивалі' },
        { id: 'g7', title: 'Офіційна Відеопрезентація ЗЗСО І-ІІІ ст. с. Павлів', type: 'video', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', album: 'Відеоархів' }
      ];
      setGallery(defaultGallery);
      localStorage.setItem('school_gallery', JSON.stringify(defaultGallery));
    }

    if (localSubs) {
      setSubmissions(JSON.parse(localSubs));
    } else {
      const defaultSubs: FeedbackSubmission[] = [
        {
          id: 's1',
          type: 'general',
          senderName: 'Олександр Шевченко',
          email: 'shevchenko@gmail.com',
          phone: '+380501234567',
          message: 'Чи планується наступного року відкриття гуртка з шахів для початкових класів?',
          date: '2026-06-16',
          status: 'new'
        }
      ];
      setSubmissions(defaultSubs);
      localStorage.setItem('school_submissions', JSON.stringify(defaultSubs));
    }
  }, []);

  const setSiteLanguage = (lang: 'ua' | 'en') => {
    setSiteLanguageState(lang);
  };

  // Auth Functions Simulation
  const login = async (email: string, password: string): Promise<boolean> => {
    if (password === 'admin2026') {
      const role = email.includes('editor') ? 'editor' : 'admin';
      const loggedUser: User = { uid: 'u_admin', email, role };
      setCurrentUser(loggedUser);
      localStorage.setItem('school_current_user', JSON.stringify(loggedUser));
      return true;
    }
    return false;
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('school_current_user');
  };

  const registerUser = (email: string, role: 'admin' | 'editor' | 'guest') => {
    const user: User = { uid: 'u_' + Math.random().toString(), email, role };
    // Keep admin state active
  };

  // CRUD for News
  const addNews = (item: Omit<NewsItem, 'id' | 'views'>) => {
    const newItem: NewsItem = {
      ...item,
      id: 'news_' + Math.random().toString(36).substr(2, 9),
      views: 0
    };
    const updatedNews = [newItem, ...news];
    setNews(updatedNews);
    localStorage.setItem('school_news', JSON.stringify(updatedNews));
  };

  const editNews = (id: string, updated: Partial<NewsItem>) => {
    const updatedNews = news.map((item) => (item.id === id ? { ...item, ...updated } : item));
    setNews(updatedNews);
    localStorage.setItem('school_news', JSON.stringify(updatedNews));
  };

  const deleteNews = (id: string) => {
    const updatedNews = news.filter((item) => item.id !== id);
    setNews(updatedNews);
    localStorage.setItem('school_news', JSON.stringify(updatedNews));
  };

  const incrementNewsViews = (id: string) => {
    const updatedNews = news.map((item) => (item.id === id ? { ...item, views: item.views + 1 } : item));
    setNews(updatedNews);
    localStorage.setItem('school_news', JSON.stringify(updatedNews));
  };

  // CRUD for Teachers
  const addTeacher = (item: Omit<Teacher, 'id'>) => {
    const newItem: Teacher = {
      ...item,
      id: 'teacher_' + Math.random().toString(36).substr(2, 9)
    };
    const updated = [...teachers, newItem];
    setTeachers(updated);
    localStorage.setItem('school_teachers', JSON.stringify(updated));
  };

  const editTeacher = (id: string, updated: Partial<Teacher>) => {
    const updatedTeachers = teachers.map((item) => (item.id === id ? { ...item, ...updated } : item));
    setTeachers(updatedTeachers);
    localStorage.setItem('school_teachers', JSON.stringify(updatedTeachers));
  };

  const deleteTeacher = (id: string) => {
    const updated = teachers.filter((item) => item.id !== id);
    setTeachers(updated);
    localStorage.setItem('school_teachers', JSON.stringify(updated));
  };

  // CRUD for Documents
  const addDocument = (doc: Omit<SchoolDocument, 'id' | 'dateAdded' | 'size'>) => {
    const newDoc: SchoolDocument = {
      ...doc,
      id: 'doc_' + Math.random().toString(36).substr(2, 9),
      dateAdded: new Date().toISOString().split('T')[0],
      size: '1.4 MB'
    };
    const updated = [newDoc, ...documents];
    setDocuments(updated);
    localStorage.setItem('school_docs', JSON.stringify(updated));
  };

  const deleteDocument = (id: string) => {
    const updated = documents.filter((doc) => doc.id !== id);
    setDocuments(updated);
    localStorage.setItem('school_docs', JSON.stringify(updated));
  };

  // CRUD for Events
  const addEvent = (event: Omit<EventItem, 'id'>) => {
    const newEvent: EventItem = {
      ...event,
      id: 'event_' + Math.random().toString(36).substr(2, 9)
    };
    const updated = [...events, newEvent].sort((a, b) => a.date.localeCompare(b.date));
    setEvents(updated);
    localStorage.setItem('school_events', JSON.stringify(updated));
  };

  const deleteEvent = (id: string) => {
    const updated = events.filter((e) => e.id !== id);
    setEvents(updated);
    localStorage.setItem('school_events', JSON.stringify(updated));
  };

  // CRUD for Gallery
  const addGalleryItem = (item: Omit<GalleryItem, 'id'>) => {
    const newItem: GalleryItem = {
      ...item,
      id: 'gallery_' + Math.random().toString(36).substr(2, 9)
    };
    const updated = [...gallery, newItem];
    setGallery(updated);
    localStorage.setItem('school_gallery', JSON.stringify(updated));
  };

  const deleteGalleryItem = (id: string) => {
    const updated = gallery.filter((g) => g.id !== id);
    setGallery(updated);
    localStorage.setItem('school_gallery', JSON.stringify(updated));
  };

  // Feedback Actions
  const addSubmission = (sub: Omit<FeedbackSubmission, 'id' | 'date' | 'status'>) => {
    const newSub: FeedbackSubmission = {
      ...sub,
      id: 'sub_' + Math.random().toString(36).substr(2, 9),
      date: new Date().toISOString().split('T')[0],
      status: 'new'
    };
    const updated = [newSub, ...submissions];
    setSubmissions(updated);
    localStorage.setItem('school_submissions', JSON.stringify(updated));
  };

  const updateSubmissionStatus = (id: string, status: 'new' | 'processed') => {
    const updated = submissions.map((s) => (s.id === id ? { ...s, status } : s));
    setSubmissions(updated);
    localStorage.setItem('school_submissions', JSON.stringify(updated));
  };

  return (
    <DataContext.Provider
      value={{
        teachers,
        news,
        documents,
        events,
        gallery,
        submissions,
        currentUser,
        siteLanguage,
        searchQuery,
        setSearchQuery,
        setSiteLanguage,
        login,
        logout,
        registerUser,
        addNews,
        editNews,
        deleteNews,
        incrementNewsViews,
        addTeacher,
        editTeacher,
        deleteTeacher,
        addDocument,
        deleteDocument,
        addEvent,
        deleteEvent,
        addGalleryItem,
        deleteGalleryItem,
        addSubmission,
        updateSubmissionStatus
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
