import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  HardDrive, Mail, FileText, Calendar, Table, Layers, Plus, Search, 
  Settings, Key, HelpCircle, Send, CheckCircle2, AlertCircle, ExternalLink, 
  FileSpreadsheet, LogIn, LogOut, ChevronRight, RefreshCw, Eye, ArrowUpRight, 
  Trash2, User, Clock, FileDown, BookOpen
} from 'lucide-react';

const DEFAULT_CLIENT_ID = '965550043292-custom.apps.googleusercontent.com'; // Placeholder or env client ID

export const WorkspaceHub: React.FC = () => {
  // Authentication & Configuration State
  const [googleClientId, setGoogleClientId] = useState(() => {
    return localStorage.getItem('g_client_id') || (import.meta as any).env?.VITE_GOOGLE_CLIENT_ID || '';
  });
  const [token, setToken] = useState(() => {
    const cachedToken = localStorage.getItem('g_workspace_token');
    const expiry = localStorage.getItem('g_workspace_token_expiry');
    if (cachedToken && expiry && Date.now() < Number(expiry)) {
      return cachedToken;
    }
    return '';
  });
  const [isAuthenticated, setIsAuthenticated] = useState(!!token);
  const [showConfig, setShowConfig] = useState(!googleClientId);
  const [activeTab, setActiveTab] = useState<'drive' | 'gmail' | 'sheets' | 'calendar' | 'docs' | 'slides'>('drive');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // API Data States
  const [driveFiles, setDriveFiles] = useState<any[]>([]);
  const [emails, setEmails] = useState<any[]>([]);
  const [calendarEvents, setCalendarEvents] = useState<any[]>([]);
  const [spreadsheets, setSpreadsheets] = useState<any[]>([]);
  const [activeSpreadsheet, setActiveSpreadsheet] = useState<any | null>(null);
  const [sheetData, setSheetData] = useState<string[][]>([]);
  const [documents, setDocuments] = useState<any[]>([]);
  const [presentations, setPresentations] = useState<any[]>([]);

  // Detailed Modals / Compose / Create States
  const [selectedEmail, setSelectedEmail] = useState<any | null>(null);
  const [composeEmail, setComposeEmail] = useState({ to: '', subject: '', body: '' });
  const [newEvent, setNewEvent] = useState({ title: '', date: '', time: '', description: '', location: '' });
  const [newFile, setNewFile] = useState({ name: '', type: 'document', parentFolder: '' });
  const [searchQuery, setSearchQuery] = useState('');
  const [newCellText, setNewCellText] = useState({ row: 0, col: 0, val: '' });

  // Load GIS client-side library
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
    return () => {
      // Clean up if needed
    };
  }, []);

  // Sync is authenticated with token
  useEffect(() => {
    setIsAuthenticated(!!token);
    if (token) {
      fetchCurrentWorkspaceData();
    } else {
      loadFallbackSchoolData();
    }
  }, [token, activeTab]);

  const loadFallbackSchoolData = () => {
    // Elegant fallback data when not logged in to make the hub feel completely functional and illustrative
    setDriveFiles([
      { id: '1', name: 'Річний_план_ліцей_2026.docx', mimeType: 'application/vnd.google-apps.document', size: '2.3 MB', modifiedTime: '2026-06-15T12:00:00Z', webViewLink: 'https://docs.google.com' },
      { id: '2', name: 'Бюджет_Павлівського_Ліцею_2026.xlsx', mimeType: 'application/vnd.google-apps.spreadsheet', size: '1.1 MB', modifiedTime: '2026-06-10T09:42:00Z', webViewLink: 'https://docs.google.com/spreadsheets' },
      { id: '3', name: 'Презентація_НУШ_Нові_Стандарти.pptx', mimeType: 'application/vnd.google-apps.presentation', size: '14.5 MB', modifiedTime: '2026-05-24T18:15:00Z', webViewLink: 'https://docs.google.com/presentation' },
      { id: '4', name: 'Шкільна_фотогалерея_випускний.gdoc', mimeType: 'application/vnd.google-apps.document', size: '820 KB', modifiedTime: '2026-06-18T10:05:00Z', webViewLink: 'https://docs.google.com' }
    ]);

    setEmails([
      { id: 'm1', from: 'Міністерство Освіти <mon@gov.ua>', subject: 'Про затвердження навчальних планів на 2026/2027 н.р.', date: 'Сьогодні, 09:30', snippet: 'Шановні колеги! Надсилаємо для ознайомлення та врахування у роботі рекомендації...', body: 'Повний текст офіційного розпорядження про порядок ведення класних журналів у новому освітньому році.' },
      { id: 'm2', from: 'Секретар Департаменту <volyn-osvita@ukr.net>', subject: 'Запит фінансових звітів за ІІ квартал', date: 'Вчора, 15:40', snippet: 'Будь ласка, завантажте звіт про використання цільових бюджетних коштів на STEM до п’ятниці...', body: 'Необхідно надати розгорнутий кошторис на обладнання STEM засобів.' },
      { id: 'm3', from: 'Марія Семенюк (Батьківський комітет)', subject: 'Організація випускного вечора 11-А класу', date: '16 червня', snippet: 'Вітаємо! Ми підготували погоджений план проведення урочистої частини свята на подвір’ї...', body: 'Батьківський актив пропонує провести випускний на відкритому ліцейному майданчику з дотриманням умов безпеки.' }
    ]);

    setCalendarEvents([
      { id: 'e1', title: 'Свято Останнього Дзвоника 2026', start: { dateTime: '2026-06-19T09:00:00+03:00' }, location: 'Ліцейне подвір’я', description: 'Урочиста лінійка, вітання випускників 11-х класів.' },
      { id: 'e2', title: 'Підсумкова Педагогічна Рада', start: { dateTime: '2026-06-23T11:00:00+03:00' }, location: 'STEM кабінет', description: 'Затвердження оцінок за ІІ семестр, річні звіти класних керівників.' },
      { id: 'e3', title: 'Зустріч з батьками першокласників', start: { dateTime: '2026-06-30T17:00:00+03:00' }, location: 'Актова зала', description: 'Психологічна готовність дитини до школи та правила прийому.' }
    ]);

    setSpreadsheets([
      { id: 'sheet1', name: 'Успішність_11_А_семестр', modifiedTime: '2026-06-18' },
      { id: 'sheet2', name: 'Рейтинг_олімпіадників_2026', modifiedTime: '2026-06-02' }
    ]);

    setActiveSpreadsheet({ id: 'sheet1', name: 'Успішність_11_А_семестр' });
    setSheetData([
      ['Прізвище Учня', 'Українська', 'Алгебра', 'Фізика', 'Історія', 'Англійська'],
      ['Бойко Максим', '10', '11', '12', '9', '11'],
      ['Шевченко Дмитро', '12', '9', '10', '11', '10'],
      ['Григоренко Вікторія', '11', '12', '11', '10', '12'],
      ['Клименко Артем', '9', '10', '9', '12', '9']
    ]);

    setDocuments([
      { id: '1', name: 'Статут_Ліцею_НоваРедакція', modifiedTime: '2026-06-12' },
      { id: '4', name: 'Правила_внутрішнього_розпорядку', modifiedTime: '2026-05-10' }
    ]);

    setPresentations([
      { id: '3', name: 'Презентація_НУШ_Нові_Стандарти', modifiedTime: '2026-05-24' }
    ]);
  };

  const handleSaveClientId = (id: string) => {
    localStorage.setItem('g_client_id', id);
    setGoogleClientId(id);
    setShowConfig(false);
    setSuccessMsg('Google Client ID збережено успішно!');
    setTimeout(() => setSuccessMsg(null), 3500);
  };

  const handleSignIn = () => {
    if (typeof window === 'undefined' || !(window as any).google) {
      setError('Бібліотека Google API ще завантажується. Зачекайте та спробуйте ще раз.');
      return;
    }

    try {
      const clientIdToUse = googleClientId || DEFAULT_CLIENT_ID;
      const client = (window as any).google.accounts.oauth2.initTokenClient({
        client_id: clientIdToUse,
        scope: [
          'https://www.googleapis.com/auth/drive',
          'https://www.googleapis.com/auth/drive.file',
          'https://www.googleapis.com/auth/spreadsheets',
          'https://www.googleapis.com/auth/calendar',
          'https://www.googleapis.com/auth/documents',
          'https://www.googleapis.com/auth/presentations',
          'https://mail.google.com/'
        ].join(' '),
        callback: (response: any) => {
          if (response.error) {
            setError('Помилка авторизації від Google: ' + response.error);
            return;
          }
          if (response.access_token) {
            setToken(response.access_token);
            localStorage.setItem('g_workspace_token', response.access_token);
            localStorage.setItem('g_workspace_token_expiry', String(Date.now() + 3600 * 1000));
            setIsAuthenticated(true);
            setError(null);
            setSuccessMsg('Вхід виконано! Підключено до реального Google Workspace.');
            setTimeout(() => setSuccessMsg(null), 4000);
          }
        },
      });
      client.requestAccessToken();
    } catch (err: any) {
      setError('Не вдалося ініціалізувати OAuth клієнт: ' + err.message);
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem('g_workspace_token');
    localStorage.removeItem('g_workspace_token_expiry');
    setToken('');
    setIsAuthenticated(false);
    loadFallbackSchoolData();
    setSuccessMsg('Вихід успішний. Переключено на демонстраційний режим ліцею.');
    setTimeout(() => setSuccessMsg(null), 3000);
  };

  // Fetch real Google Workspace data through Google REST Endpoints
  const fetchCurrentWorkspaceData = async () => {
    if (!token) return;
    setIsLoading(true);
    setError(null);
    try {
      if (activeTab === 'drive') {
        const res = await fetch('https://www.googleapis.com/drive/v3/files?orderBy=modifiedTime desc&pageSize=20&fields=files(id,name,mimeType,size,modifiedTime,webViewLink)', {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (!res.ok) throw new Error('Помилка завантаження файлів з Google Drive');
        const data = await res.json();
        setDriveFiles(data.files || []);
      } 
      else if (activeTab === 'gmail') {
        const res = await fetch('https://gmail.googleapis.com/gmail/v1/users/me/messages?maxResults=10', {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (!res.ok) throw new Error('Помилка завантаження пошти Gmail');
        const data = await res.json();
        
        if (data.messages && data.messages.length > 0) {
          const detailPromises = data.messages.map(async (msg: any) => {
            const detailRes = await fetch(`https://gmail.googleapis.com/gmail/v1/users/me/messages/${msg.id}`, {
              headers: { Authorization: `Bearer ${token}` }
            });
            return detailRes.json();
          });
          const detailedMessages = await Promise.all(detailPromises);
          const parsedEmails = detailedMessages.map((msg: any) => {
            const headers = msg.payload.headers;
            const from = headers.find((h: any) => h.name === 'From')?.value || 'Невідомий';
            const subject = headers.find((h: any) => h.name === 'Subject')?.value || '(Без теми)';
            const date = headers.find((h: any) => h.name === 'Date')?.value || '';
            return {
              id: msg.id,
              from,
              subject,
              date: new Date(date).toLocaleDateString('uk-UA', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }),
              snippet: msg.snippet,
              body: msg.snippet // Simplifying body render mapping
            };
          });
          setEmails(parsedEmails);
        } else {
          setEmails([]);
        }
      }
      else if (activeTab === 'calendar') {
        const res = await fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events?orderBy=startTime&singleEvents=true&maxResults=15', {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (!res.ok) throw new Error('Помилка завантаження календаря Google Calendar');
        const data = await res.json();
        const parsed = (data.items || []).map((ev: any) => ({
          id: ev.id,
          title: ev.summary || '(Без назви)',
          start: ev.start,
          location: ev.location || 'Онлайн',
          description: ev.description || ''
        }));
        setCalendarEvents(parsed);
      }
      else if (activeTab === 'sheets') {
        const res = await fetch("https://www.googleapis.com/drive/v3/files?q=mimeType='application/vnd.google-apps.spreadsheet'&fields=files(id,name,modifiedTime)", {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (!res.ok) throw new Error('Помилка завантаження таблиць Google Sheets');
        const data = await res.json();
        setSpreadsheets(data.files || []);

        if (data.files && data.files.length > 0) {
          handleSelectSpreadsheet(data.files[0]);
        }
      }
      else if (activeTab === 'docs') {
        const res = await fetch("https://www.googleapis.com/drive/v3/files?q=mimeType='application/vnd.google-apps.document'&fields=files(id,name,modifiedTime)", {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (!res.ok) throw new Error('Помилка завантаження документів Google Docs');
        const data = await res.json();
        setDocuments(data.files || []);
      }
      else if (activeTab === 'slides') {
        const res = await fetch("https://www.googleapis.com/drive/v3/files?q=mimeType='application/vnd.google-apps.presentation'&fields=files(id,name,modifiedTime)", {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (!res.ok) throw new Error('Помилка завантаження презентацій Google Slides');
        const data = await res.json();
        setPresentations(data.files || []);
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Помилка виконання запиту до Google API.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectSpreadsheet = async (sheetFile: any) => {
    setActiveSpreadsheet(sheetFile);
    if (!token) return;
    try {
      // Fetch sheet content range A1:F20
      const rangeRes = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${sheetFile.id}/values/A1:F20`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (rangeRes.ok) {
        const valData = await rangeRes.json();
        setSheetData(valData.values || [['Таблиця порожня']]);
      } else {
        setSheetData([['Немає доступу до вмісту таблиці']]);
      }
    } catch (err) {
      setSheetData([['Помилка зчитування осередок']]);
    }
  };

  // Google Mutation API - Creates with explicit confirmations where appropriate
  const handleCreateFileOnDrive = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) {
      // Offline Simulation Adding
      const newF = {
        id: 'new_demo_' + Date.now(),
        name: newFile.name + (newFile.type === 'spreadsheet' ? '.xlsx' : '.docx'),
        mimeType: newFile.type === 'spreadsheet' ? 'application/vnd.google-apps.spreadsheet' : 'application/vnd.google-apps.document',
        size: '0 KB',
        modifiedTime: new Date().toISOString()
      };
      setDriveFiles([newF, ...driveFiles]);
      setSuccessMsg(`[Демонстрація] Створено файл "${newF.name}"!`);
      setNewFile({ name: '', type: 'document', parentFolder: '' });
      setTimeout(() => setSuccessMsg(null), 3000);
      return;
    }

    const confirmed = window.confirm(`Ви підтверджуєте створення нового файлу "${newFile.name}" у вашому Google Drive?`);
    if (!confirmed) return;

    setIsLoading(true);
    try {
      const mime = newFile.type === 'spreadsheet' 
        ? 'application/vnd.google-apps.spreadsheet' 
        : 'application/vnd.google-apps.document';

      const metadataPayload = {
        name: newFile.name,
        mimeType: mime
      };

      const res = await fetch('https://www.googleapis.com/drive/v3/files', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(metadataPayload)
      });

      if (!res.ok) throw new Error('Помилка сервера при створенні файлу Drive.');
      setSuccessMsg(`Успішно створено файл "${newFile.name}" у вашому Drive!`);
      setNewFile({ name: '', type: 'document', parentFolder: '' });
      fetchCurrentWorkspaceData();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
      setTimeout(() => setSuccessMsg(null), 4000);
    }
  };

  const handleSendGmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) {
      setSuccessMsg(`[Демонстрація] Надіслано лист до ${composeEmail.to} з темою "${composeEmail.subject}"!`);
      setComposeEmail({ to: '', subject: '', body: '' });
      setTimeout(() => setSuccessMsg(null), 3000);
      return;
    }

    const confirmed = window.confirm(`Підтвердити відправку листа до ${composeEmail.to} через ваш запис Gmail?`);
    if (!confirmed) return;

    setIsLoading(true);
    try {
      // Craft Base64 Gmail RFC 2822 formatting
      const mailString = [
        `To: ${composeEmail.to}`,
        'Content-Type: text/html; charset=utf-8',
        'MIME-Version: 1.0',
        `Subject: =?utf-8?B?${btoa(unescape(encodeURIComponent(composeEmail.subject)))}?=`,
        '',
        composeEmail.body
      ].join('\r\n');

      // Base64 Web-Safe encoding helper
      const base64Mail = btoa(unescape(encodeURIComponent(mailString)))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');

      const res = await fetch('https://gmail.googleapis.com/gmail/v1/users/me/messages/send', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ raw: base64Mail })
      });

      if (!res.ok) throw new Error('Помилка надсилання електронної пошти.');
      setSuccessMsg('Лист успішно надіслано через ваш аккаунт Gmail!');
      setComposeEmail({ to: '', subject: '', body: '' });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
      setTimeout(() => setSuccessMsg(null), 4000);
    }
  };

  const handleAddCalendarEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) {
      const demoEv = {
        id: 'ev_dem_' + Date.now(),
        title: newEvent.title,
        start: { dateTime: `${newEvent.date}T${newEvent.time}:00` },
        location: newEvent.location,
        description: newEvent.description
      };
      setCalendarEvents([demoEv, ...calendarEvents]);
      setSuccessMsg(`[Демонстрація] Подію "${newEvent.title}" успішно додано до розкладу!`);
      setNewEvent({ title: '', date: '', time: '', description: '', location: '' });
      setTimeout(() => setSuccessMsg(null), 3000);
      return;
    }

    const confirmed = window.confirm(`Ви підтверджуєте планування події "${newEvent.title}" у вашому Google-календарі?`);
    if (!confirmed) return;

    setIsLoading(true);
    try {
      const formattedStart = `${newEvent.date}T${newEvent.time}:00`;
      const payload = {
        summary: newEvent.title,
        description: newEvent.description,
        location: newEvent.location,
        start: { dateTime: formattedStart, timeZone: 'Europe/Kyiv' },
        end: { dateTime: `${newEvent.date}T23:59:00`, timeZone: 'Europe/Kyiv' } // End of day fallback
      };

      const res = await fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (!res.ok) throw new Error('Помилка додавання осередку подій у календар.');
      setSuccessMsg(`Подію "${newEvent.title}" внесено до вашого Google Calendar!`);
      setNewEvent({ title: '', date: '', time: '', description: '', location: '' });
      fetchCurrentWorkspaceData();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
      setTimeout(() => setSuccessMsg(null), 4000);
    }
  };

  const handleDeleteFile = async (fileId: string, name: string) => {
    const confirmed = window.confirm(`Ви впевнені, що хочете видалити файл "${name}" у вашому Google Drive? Ця дія незворотна.`);
    if (!confirmed) return;

    if (!token) {
      setDriveFiles(driveFiles.filter(item => item.id !== fileId));
      setSuccessMsg(`[Демонстрація] Файл "${name}" було видалено з демо-системи.`);
      setTimeout(() => setSuccessMsg(null), 3000);
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch(`https://www.googleapis.com/drive/v3/files/${fileId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) throw new Error('Помилка видалення файлу з Google Drive.');
      setSuccessMsg(`Файл "${name}" видалено успішно.`);
      fetchCurrentWorkspaceData();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
      setTimeout(() => setSuccessMsg(null), 4000);
    }
  };

  const handleUpdateSheetCell = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeSpreadsheet) return;

    if (!token) {
      // Modify demo matrix in state
      const nextData = [...sheetData];
      if (nextData[newCellText.row]) {
        nextData[newCellText.row][newCellText.col] = newCellText.val;
        setSheetData(nextData);
        setSuccessMsg(`[Демонстрація] Комірку оновлено на "${newCellText.val}"!`);
        setTimeout(() => setSuccessMsg(null), 3000);
      }
      return;
    }

    const confirmed = window.confirm('Оновити вміст обраної комірки в реальній Google Таблиці?');
    if (!confirmed) return;

    setIsLoading(true);
    try {
      const charCol = String.fromCharCode(65 + newCellText.col); // Translate index to letter (A, B, C...)
      const range = `A${newCellText.row + 1}:${charCol}${newCellText.row + 1}`; // Specific row cell update
      
      const payload = {
        values: [[newCellText.val]]
      };

      // We append/update the specific cell
      const updateRes = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${activeSpreadsheet.id}/values/${range}?valueInputOption=USER_ENTERED`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (!updateRes.ok) throw new Error('Помилка збереження змін у таблиці.');
      setSuccessMsg('Зміни успішно внесено до файлу Google Sheets!');
      handleSelectSpreadsheet(activeSpreadsheet); // Reload
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
      setTimeout(() => setSuccessMsg(null), 4000);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1 space-y-8">
      {/* Upper header segment */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-slate-200 dark:border-slate-800 pb-6 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="bg-school-blue-100 text-school-blue-700 dark:bg-slate-800 dark:text-school-blue-300 text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full flex items-center gap-1">
              <Layers className="w-3 h-3" />
              Інтеграція Хмари
            </span>
            <span className="text-[10px] bg-amber-500/10 text-amber-500 font-bold px-2 py-0.5 rounded-full tracking-wider uppercase font-mono">
              OAuth 2.0
            </span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold font-display text-slate-900 dark:text-white leading-tight mt-1.5 flex items-center gap-2">
            Google Workspace Портал
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Керуйте навчальними матеріалами ліцею, офіційними листами та календарем у хмарі Google.
          </p>
        </div>

        <div className="flex flex-wrap gap-2.5 shrink-0">
          <button
            onClick={() => setShowConfig(!showConfig)}
            className="px-3.5 py-2 text-xs font-semibold rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-850 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center gap-1.5 transition-all cursor-pointer border border-slate-200/50 dark:border-slate-700"
          >
            <Settings className="w-3.5 h-3.5" />
            <span>Налаштування ключів</span>
          </button>

          {isAuthenticated ? (
            <button
              onClick={handleSignOut}
              className="px-3.5 py-2 text-xs font-bold rounded-lg bg-red-550 hover:bg-red-650 text-white flex items-center gap-1.5 shadow-sm hover:shadow-md transition-all cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Вийти з Google</span>
            </button>
          ) : (
            <button
              onClick={handleSignIn}
              className="px-3.5 py-2 text-xs font-bold rounded-lg bg-school-blue-650 hover:bg-school-blue-700 text-white flex items-center gap-1.5 shadow-md hover:shadow-lg hover:scale-[1.01] transition-all cursor-pointer border-2 border-school-yellow-400"
            >
              <LogIn className="w-4 h-4 text-school-yellow-300" />
              <span>Підключити Google Workspace</span>
            </button>
          )}
        </div>
      </div>

      {/* Alert Notices */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 p-4 rounded-xl text-xs flex items-center gap-3">
          <AlertCircle className="w-5 h-5 shrink-0 text-red-500" />
          <p className="leading-relaxed font-semibold">{error}</p>
        </div>
      )}

      {successMsg && (
        <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 p-4 rounded-xl text-xs flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-500" />
          <p className="leading-relaxed font-semibold">{successMsg}</p>
        </div>
      )}

      {/* Settings / Configuration Panel */}
      {showConfig && (
        <div className="bg-white dark:bg-slate-900 border border-slate-250 dark:border-slate-800 rounded-2xl p-6 shadow-md grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <h3 className="font-extrabold font-display text-slate-900 dark:text-white text-sm flex items-center gap-2">
              <Key className="w-4 h-4 text-school-blue-500" />
              Інструкція з налаштування Google Cloud OAuth
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Цей додаток інтегрується з хмарою вашого ліцею. Для роботи з користувацькими даними (Drive, Gmail, Calendar, Sheets) ви можете використовувати ваш унікальний <strong>Google Client ID</strong> або залишити поле порожнім для використання типового клієнтського ключа за замовчуванням.
            </p>
            <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-xl text-xs text-slate-500 dark:text-slate-400 space-y-2 border border-slate-200/50">
              <span className="font-bold text-slate-700 dark:text-slate-300 font-sans">Як отримати ключ клієнта:</span>
              <ol className="list-decimal list-inside space-y-1 ml-1 text-[11px] leading-relaxed">
                <li>Перейдіть у <a href="https://console.cloud.google.com" target="_blank" rel="noopener" className="text-school-blue-500 hover:underline inline-flex items-center gap-0.5 font-bold">Google Cloud Console ↗</a>.</li>
                <li>Створіть або оберіть ваш проект (наприклад, Lyceum Portal).</li>
                <li>Перейдіть у розділ <strong>APIs & Services &gt; Credentials</strong>.</li>
                <li>Натисніть <strong>Create Credentials &gt; OAuth client ID</strong> (оберіть тип "Web Application").</li>
                <li>Додайте <i>{window.location.origin}</i> до розділу <strong>Authorized JavaScript origins</strong>.</li>
                <li>Збережіть та скопіюйте згенерований <strong>Client ID</strong>, після чого вставте його у полі праворуч.</li>
              </ol>
            </div>
          </div>
          
          <div className="bg-slate-100 dark:bg-slate-950 p-5 rounded-xl border border-slate-200 dark:border-slate-800 flex flex-col justify-between">
            <div className="space-y-3.5">
              <span className="font-mono text-[10px] text-slate-400 block uppercase tracking-wider">Параметри Credentials</span>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Ваш Google Client ID:</label>
                <input
                  type="text"
                  placeholder="Введіть 96555...apps.googleusercontent.com"
                  value={googleClientId}
                  onChange={(e) => setGoogleClientId(e.target.value)}
                  className="w-full text-xs font-mono p-2.5 bg-white dark:bg-slate-900 border border-slate-250 dark:border-slate-800 rounded-lg text-slate-800 dark:text-slate-100 focus:ring-1 focus:ring-school-blue-500"
                />
              </div>
            </div>
            
            <div className="flex gap-2 mt-4">
              <button
                onClick={() => handleSaveClientId(googleClientId)}
                className="w-full py-2 bg-school-blue-600 hover:bg-school-blue-700 text-white rounded-lg text-xs font-bold transition-all"
              >
                Зберегти ключ
              </button>
              <button
                onClick={() => {
                  setGoogleClientId('');
                  localStorage.removeItem('g_client_id');
                  setSuccessMsg('Ключ скинуто на типовий значення');
                  setTimeout(() => setSuccessMsg(null), 3000);
                }}
                className="py-2 px-3 bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg text-xs font-bold hover:bg-opacity-80 transition-all"
                title="Скинути ключ"
              >
                Скинути
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Workspace Navigation (Tabs for the 6 services) */}
      <div className="border-b border-slate-200 dark:border-slate-800 overflow-x-auto">
        <nav className="flex gap-1 min-w-[650px] whitespace-nowrap" aria-label="Панель сервісів">
          {[
            { id: 'drive', label: 'Google Drive', icon: HardDrive, color: 'text-amber-500 bg-amber-500/10' },
            { id: 'gmail', label: 'Gmail Оповіщення', icon: Mail, color: 'text-red-500 bg-red-500/10' },
            { id: 'sheets', label: 'Google Sheets', icon: Table, color: 'text-emerald-500 bg-emerald-500/10' },
            { id: 'calendar', label: 'Google Calendar', icon: Calendar, color: 'text-blue-500 bg-blue-500/10' },
            { id: 'docs', label: 'Google Docs', icon: FileText, color: 'text-indigo-500 bg-indigo-500/10' },
            { id: 'slides', label: 'Google Slides', icon: Layers, color: 'text-orange-500 bg-orange-500/10' }
          ].map((tab) => {
            const Icon = tab.icon;
            const isTabActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-3.5 px-4.5 text-xs font-bold border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
                  isTabActive
                  ? 'border-school-blue-500 text-school-blue-600 dark:text-school-blue-400 bg-slate-100/50 dark:bg-slate-900/50'
                  : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-white'
                }`}
              >
                <span className={`p-1.5 rounded-md ${tab.color}`}>
                  <Icon className="w-4 h-4" />
                </span>
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Main Content Pane */}
      <div className="min-h-[450px] relative">
        {isLoading && (
          <div className="absolute inset-0 bg-white/60 dark:bg-slate-950/60 backdrop-blur-xs z-10 flex flex-col justify-center items-center">
            <RefreshCw className="w-8 h-8 text-school-blue-600 animate-spin" />
            <p className="text-xs font-bold text-slate-600 dark:text-slate-300 mt-2 font-mono">Звернення до серверів Google Cloud...</p>
          </div>
        )}

        {!isAuthenticated && (
          <div className="bg-amber-500/5 border border-amber-500/10 rounded-xl p-4 text-[11px] text-amber-600/90 dark:text-amber-400/80 flex items-center gap-2 mb-6">
            <HelpCircle className="w-4 h-4 shrink-0 text-amber-500" />
            <span>Ви переглядаєте <strong>демонстраційний режим</strong> Павлівського ліцею з наочними пре-сетами. Підключіть ваш реальний Google акаунт за допомогою синьої кнопки для завантаження та редагування ваших особистих хмарних ресурсів.</span>
          </div>
        )}

        {/* -------------------------------------------------------------------- */}
        {/* TABS VIEW CONTROLLERS */}

        {/* 1. GOOGLE DRIVE */}
        {activeTab === 'drive' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-800 dark:text-white text-xs">Файли у Хмарному Сховищі</span>
                <span className="text-[10px] font-mono text-slate-400">{driveFiles.length} файлів знайдено</span>
              </div>

              {driveFiles.length === 0 ? (
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-8 text-center text-xs text-slate-500">
                  <HardDrive className="w-10 h-10 mx-auto text-slate-350 dark:text-slate-700 mb-2" />
                  <p>Жодного файлу не виявлено на вашому Google Drive.</p>
                </div>
              ) : (
                <div className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-xl divide-y divide-slate-150 dark:divide-slate-800 overflow-hidden shadow-xs">
                  {driveFiles.map((file) => (
                    <div key={file.id} className="p-4 flex items-center justify-between gap-4 hover:bg-slate-50 dark:hover:bg-slate-850/30 transition-colors">
                      <div className="flex items-center space-x-3 truncate">
                        <div className={`p-2.5 rounded-lg shrink-0 ${
                          file.mimeType?.includes('spreadsheet') ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-950/45 dark:text-emerald-400' :
                          file.mimeType?.includes('presentation') ? 'bg-orange-100 text-orange-600 dark:bg-orange-950/45 dark:text-orange-400' :
                          'bg-blue-100 text-blue-600 dark:bg-blue-950/45 dark:text-blue-400'
                        }`}>
                          {file.mimeType?.includes('spreadsheet') ? <FileSpreadsheet className="w-5 h-5" /> : <FileText className="w-5 h-5" />}
                        </div>
                        <div className="truncate">
                          <h4 className="text-xs font-bold text-slate-800 dark:text-white truncate">{file.name}</h4>
                          <div className="flex items-center gap-2 mt-0.5 text-[9px] text-slate-400 font-mono">
                            <span>Модифіковано: {new Date(file.modifiedTime).toLocaleDateString('uk-UA')}</span>
                            {file.size && <span>• {file.size}</span>}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-1.5 shrink-0">
                        <a
                          href={file.webViewLink || 'https://drive.google.com'}
                          target="_blank"
                          rel="noreferrer"
                          className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-755 text-slate-600 dark:text-slate-300 text-xs transition-all flex items-center gap-1"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline text-[10px]">Переглянути</span>
                        </a>
                        <button
                          onClick={() => handleDeleteFile(file.id, file.name)}
                          className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-550 hover:text-white text-red-600 dark:text-red-400 transition-all cursor-pointer"
                          title="Видалити цей файл"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Sidebar form: Create new file */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm self-start">
              <h3 className="font-extrabold font-display text-slate-900 dark:text-white text-xs flex items-center gap-1.5">
                <Plus className="w-4 h-4 text-school-blue-500" />
                Створити новий документ
              </h3>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Швидке створення освітніх бланків чи розрахункових таблиць безпосередньо у хмарі ліцею.
              </p>

              <form onSubmit={handleCreateFileOnDrive} className="space-y-3">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-600 dark:text-slate-350">Назва файлу:</label>
                  <input
                    type="text"
                    required
                    placeholder="Наприклад: Програма_гуртка_2026"
                    value={newFile.name}
                    onChange={(e) => setNewFile({ ...newFile, name: e.target.value })}
                    className="w-full text-xs p-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-lg text-slate-850 dark:text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-600 dark:text-slate-350">Формат хмарного ресурсу:</label>
                  <select
                    value={newFile.type}
                    onChange={(e) => setNewFile({ ...newFile, type: e.target.value })}
                    className="w-full text-xs p-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-lg text-slate-800 dark:text-slate-200"
                  >
                    <option value="document">Google Document (Текст)</option>
                    <option value="spreadsheet">Google Spreadsheet (Таблиця)</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full py-2 bg-school-blue-600 hover:bg-school-blue-700 text-white rounded-lg text-xs font-bold transition-all mt-3 cursor-pointer flex items-center justify-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Розпочати створення</span>
                </button>
              </form>
            </div>
          </div>
        )}

        {/* 2. GMAIL INBOX */}
        {activeTab === 'gmail' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* List Messages */}
            <div className="lg:col-span-2 space-y-4">
              <span className="font-bold text-slate-800 dark:text-white text-xs block mb-1">Скринька Хмарної Пошти</span>
              
              {emails.length === 0 ? (
                <div className="bg-white dark:bg-slate-900 border border-slate-250 dark:border-slate-800 p-8 rounded-xl text-center text-xs text-slate-500">
                  <Mail className="w-10 h-10 mx-auto text-slate-300 dark:text-slate-750 mb-2" />
                  <p>Ваша ліцейна пошта наразі порожня.</p>
                </div>
              ) : (
                <div className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-xl divide-y divide-slate-150 dark:divide-slate-800 overflow-hidden shadow-xs">
                  {emails.map((mail) => (
                    <div 
                      key={mail.id} 
                      onClick={() => setSelectedEmail(mail)}
                      className={`p-4 hover:bg-slate-50 dark:hover:bg-slate-850/40 transition-colors cursor-pointer flex items-start gap-3 ${
                        selectedEmail?.id === mail.id ? 'bg-school-blue-50/40 dark:bg-slate-800/50 border-l-4 border-school-blue-500' : ''
                      }`}
                    >
                      <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-full shrink-0">
                        <Mail className="w-4.5 h-4.5 text-school-blue-500" />
                      </div>
                      <div className="min-w-0 flex-1 space-y-1">
                        <div className="flex justify-between items-baseline gap-2">
                          <h4 className="text-xs font-extrabold text-slate-800 dark:text-slate-200 truncate">{mail.from}</h4>
                          <span className="text-[9px] font-mono text-slate-450 shrink-0">{mail.date}</span>
                        </div>
                        <h5 className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 truncate">{mail.subject}</h5>
                        <p className="text-[10px] text-slate-450 dark:text-slate-400 truncate">{mail.snippet}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Email details Modal view overlay */}
              {selectedEmail && (
                <motion.div 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-slate-100 dark:bg-slate-900 border-2 border-school-blue-500/25 p-5 rounded-2xl space-y-3"
                >
                  <div className="flex justify-between items-start border-b border-slate-205 dark:border-slate-800 pb-2 gap-4">
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white">Тема: {selectedEmail.subject}</h4>
                      <p className="text-[10px] text-slate-500 mt-0.5">Від: <span className="font-mono text-school-blue-500">{selectedEmail.from}</span></p>
                    </div>
                    <button 
                      onClick={() => setSelectedEmail(null)}
                      className="text-[10px] font-semibold text-slate-400 hover:text-red-500"
                    >
                      Закрити
                    </button>
                  </div>
                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-sans bg-white dark:bg-slate-950 p-4 rounded-xl shadow-inner min-h-[100px] whitespace-pre-line">
                    {selectedEmail.body}
                  </p>
                </motion.div>
              )}
            </div>

            {/* Sidebar form: Compose parent email */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm self-start">
              <h3 className="font-extrabold font-display text-slate-900 dark:text-white text-xs flex items-center gap-1.5">
                <Send className="w-3.5 h-3.5 text-school-blue-500" />
                Надіслати електронну пошту
              </h3>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Надсилайте офіційні бюлетені, оцінки учнів чи довідкові листи батькам та закладам.
              </p>

              <form onSubmit={handleSendGmail} className="space-y-3.5">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-600 dark:text-slate-350">Кому (Отримувач):</label>
                  <input
                    type="email"
                    required
                    placeholder="parent@gmail.com, admin@gov.ua"
                    value={composeEmail.to}
                    onChange={(e) => setComposeEmail({ ...composeEmail, to: e.target.value })}
                    className="w-full text-xs p-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-lg text-slate-850 dark:text-white focus:outline-hidden"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-600 dark:text-slate-350">Тема оповіщення:</label>
                  <input
                    type="text"
                    required
                    placeholder="Наприклад: Пропуск занять або Подячний лист"
                    value={composeEmail.subject}
                    onChange={(e) => setComposeEmail({ ...composeEmail, subject: e.target.value })}
                    className="w-full text-xs p-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-lg text-slate-850 dark:text-white focus:outline-hidden"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-600 dark:text-slate-350">Вміст / Текст листа:</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Добрий день! Повідомляємо, що..."
                    value={composeEmail.body}
                    onChange={(e) => setComposeEmail({ ...composeEmail, body: e.target.value })}
                    className="w-full text-xs p-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-lg text-slate-850 dark:text-white focus:outline-hidden resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-school-blue-600 hover:bg-school-blue-700 text-white rounded-lg text-xs font-extrabold transition-all mt-2 cursor-pointer flex items-center justify-center gap-1"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Надіслати лист</span>
                </button>
              </form>
            </div>
          </div>
        )}

        {/* 3. GOOGLE SHEETS */}
        {activeTab === 'sheets' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {spreadsheets.map((s) => (
                <button
                  key={s.id}
                  onClick={() => handleSelectSpreadsheet(s)}
                  className={`p-3 text-left border rounded-xl rounded-b-none font-bold text-slate-700 dark:text-slate-300 text-xs transition-all cursor-pointer flex items-center gap-2 ${
                    activeSpreadsheet?.id === s.id 
                    ? 'border-emerald-500 bg-emerald-50/45 dark:bg-emerald-950/20 text-emerald-600' 
                    : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900'
                  }`}
                >
                  <FileSpreadsheet className="w-5 h-5 text-emerald-500" />
                  <span className="truncate">{s.name}</span>
                </button>
              ))}
            </div>

            {activeSpreadsheet && (
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <div className="lg:col-span-3 space-y-3">
                  <div className="flex justify-between items-center bg-slate-100 dark:bg-slate-900 p-3 rounded-lg border border-slate-200/50 dark:border-slate-800">
                    <span className="text-xs font-bold text-slate-800 dark:text-white flex items-center gap-1.5">
                      <Table className="w-4 h-4 text-emerald-500" />
                      Вміст таблиці: {activeSpreadsheet.name}
                    </span>
                    <a
                      href={`https://docs.google.com/spreadsheets/d/${activeSpreadsheet.id}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold hover:underline flex items-center gap-1"
                    >
                      Відкрити в Google Таблицях
                      <ArrowUpRight className="w-3 h-3" />
                    </a>
                  </div>

                  {/* Spreadsheet Grid component */}
                  <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl overflow-x-auto shadow-inner">
                    <table className="w-full min-w-[600px] border-collapse text-xs text-left">
                      <thead>
                        <tr className="bg-slate-100 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
                          <th className="p-2.5 font-mono text-slate-400 w-10 text-center border-r border-slate-200 dark:border-slate-800">#</th>
                          {sheetData[0]?.map((cell, idx) => (
                            <th key={idx} className="p-2.5 font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">{cell}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-150 dark:divide-slate-800">
                        {sheetData.slice(1).map((rowValues, rowIndex) => (
                          <tr key={rowIndex} className="hover:bg-slate-50 dark:hover:bg-slate-900/40 transition-colors">
                            <td className="p-2.5 font-mono text-slate-400 text-center bg-slate-50 dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 font-bold">{rowIndex + 1}</td>
                            {rowValues.map((cellValue, colIndex) => (
                              <td 
                                key={colIndex} 
                                onClick={() => setNewCellText({ row: rowIndex + 1, col: colIndex, val: cellValue })}
                                className={`p-2.5 text-slate-800 dark:text-slate-300 cursor-pointer ${
                                  newCellText.row === rowIndex + 1 && newCellText.col === colIndex 
                                  ? 'bg-amber-100 text-slate-900 dark:bg-amber-500/20 dark:text-amber-300 font-bold' 
                                  : ''
                                }`}
                              >
                                {cellValue}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Sidebar update panel */}
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm self-start">
                  <h3 className="font-extrabold font-display text-slate-900 dark:text-white text-xs flex items-center gap-1.5">
                    <Table className="w-4 h-4 text-emerald-500" />
                    Оновити клітинку таблиці
                  </h3>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Натисніть на значення у сітці ліворуч, щоб виділити клітинку та змінити її значення в один клік.
                  </p>

                  <form onSubmit={handleUpdateSheetCell} className="space-y-3">
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="space-y-0.5">
                        <span className="text-[10px] text-slate-400 font-sans font-bold">Номер рядка:</span>
                        <input
                          type="number"
                          disabled
                          value={newCellText.row}
                          className="w-full p-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded text-slate-800 dark:text-white text-center font-mono"
                        />
                      </div>
                      <div className="space-y-0.5">
                        <span className="text-[10px] text-slate-400 font-sans font-bold">Стовпець:</span>
                        <input
                          type="text"
                          disabled
                          value={String.fromCharCode(65 + newCellText.col)}
                          className="w-full p-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded text-slate-800 dark:text-white text-center font-mono"
                        />
                      </div>
                    </div>

                    <div className="space-y-1 mt-2">
                      <label className="text-[10px] font-bold text-slate-600 dark:text-slate-350">Введіть нове значення:</label>
                      <input
                        type="text"
                        required
                        placeholder="Оцінка або назва"
                        value={newCellText.val}
                        onChange={(e) => setNewCellText({ ...newCellText, val: e.target.value })}
                        className="w-full text-xs p-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-lg text-slate-850 dark:text-white focus:outline-hidden"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={newCellText.row === 0}
                      className={`w-full py-2.5 text-white rounded-lg text-xs font-bold transition-all mt-2 flex items-center justify-center gap-1.5 ${
                        newCellText.row === 0 ? 'bg-slate-300 dark:bg-slate-800 cursor-not-allowed' : 'bg-emerald-600 hover:bg-emerald-700 cursor-pointer'
                      }`}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Оновити клітинку</span>
                    </button>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* 4. GOOGLE CALENDAR */}
        {activeTab === 'calendar' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Calendar Event Schedule List */}
            <div className="lg:col-span-2 space-y-4">
              <span className="font-bold text-slate-800 dark:text-white text-xs block mb-1">Заплановані заходи ліцею у Календарі</span>

              {calendarEvents.length === 0 ? (
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-xl text-center text-xs text-slate-500">
                  <Calendar className="w-10 h-10 mx-auto text-slate-300 dark:text-slate-750 mb-2" />
                  <p>Календар не містить майбутніх запланованих подій.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {calendarEvents.map((ev) => {
                    const eventDate = new Date(ev.start?.dateTime || ev.start?.date || '');
                    return (
                      <div 
                        key={ev.id} 
                        className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 p-4 rounded-xl shadow-xs hover:border-blue-400 dark:hover:border-blue-600 transition-all flex items-start gap-4"
                      >
                        {/* Custom visual mini calendar sheet */}
                        <div className="w-12 h-14 bg-blue-50 dark:bg-blue-950/45 rounded-lg border border-blue-200/50 flex flex-col justify-between shrink-0 text-center overflow-hidden">
                          <span className="bg-blue-600 text-[8px] uppercase tracking-wider text-white py-0.5 font-bold">
                            {eventDate.toLocaleDateString('uk-UA', { month: 'short' })}
                          </span>
                          <span className="text-sm font-extrabold text-blue-700 dark:text-blue-300 pb-1 leading-none font-mono">
                            {eventDate.getDate()}
                          </span>
                        </div>

                        <div className="flex-1 space-y-1">
                          <h4 className="text-xs font-extrabold text-slate-800 dark:text-slate-200 leading-tight">
                            {ev.title}
                          </h4>
                          <p className="text-[10px] text-slate-550 leading-relaxed font-sans mt-0.5">{ev.description}</p>
                          <div className="flex flex-wrap gap-x-4 gap-y-1 pt-1 text-[9px] text-slate-400 font-mono">
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3 text-slate-400" />
                              {eventDate.toLocaleTimeString('uk-UA', { hour: '2-digit', minute: '2-digit' })}
                            </span>
                            {ev.location && (
                              <span className="flex items-center gap-1">
                                <ExternalLink className="w-2.5 h-2.5 text-slate-400" />
                                {ev.location}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Sidebar form: Add Event */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm self-start">
              <h3 className="font-extrabold font-display text-slate-900 dark:text-white text-xs flex items-center gap-1.5">
                <Plus className="w-4 h-4 text-school-blue-500" />
                Створити захід в календарі
              </h3>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Додавайте шкільні свята, педради, класні зустрічі чи розклад уроків безпосередньо у ваш Google Calendar.
              </p>

              <form onSubmit={handleAddCalendarEvent} className="space-y-3.5">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-600 dark:text-slate-350">Назва події:</label>
                  <input
                    type="text"
                    required
                    placeholder="Наприклад: Педагогічна засідання"
                    value={newEvent.title}
                    onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                    className="w-full text-xs p-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-lg text-slate-850 dark:text-white focus:outline-hidden"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-600 dark:text-slate-350">Дата:</label>
                    <input
                      type="date"
                      required
                      value={newEvent.date}
                      onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                      className="w-full p-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded text-slate-800 dark:text-white"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-600 dark:text-slate-350">Час початку:</label>
                    <input
                      type="time"
                      required
                      value={newEvent.time}
                      onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                      className="w-full p-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded text-slate-800 dark:text-white"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-600 dark:text-slate-350">Місце проведення:</label>
                  <input
                    type="text"
                    placeholder="Наприклад: STEM-хаб, актова зал"
                    value={newEvent.location}
                    onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                    className="w-full text-xs p-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-lg text-slate-850 dark:text-white focus:outline-hidden"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-600 dark:text-slate-350">Опис заходу:</label>
                  <textarea
                    rows={2}
                    placeholder="Порядок денний, посилання на Zoom або деталі..."
                    value={newEvent.description}
                    onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                    className="w-full text-xs p-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-lg text-slate-850 dark:text-white focus:outline-hidden resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-school-blue-600 hover:bg-school-blue-700 text-white rounded-lg text-xs font-extrabold transition-all mt-2 cursor-pointer flex items-center justify-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Запланувати подію</span>
                </button>
              </form>
            </div>
          </div>
        )}

        {/* 5. GOOGLE DOCS */}
        {activeTab === 'docs' && (
          <div className="space-y-4">
            <span className="font-bold text-slate-800 dark:text-white text-xs block mb-1">Офіційні матеріали у Google Docs</span>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {documents.map((doc) => (
                <div key={doc.id} className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-2xl p-5 flex flex-col justify-between hover:scale-[1.01] transition-all relative">
                  <div className="space-y-3.5">
                    <div className="p-3 bg-blue-100 text-blue-600 dark:bg-blue-950/45 dark:text-blue-400 rounded-xl w-fit">
                      <FileText className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-800 dark:text-white leading-tight font-display">{doc.name}</h4>
                      <p className="text-[10px] text-slate-400 font-mono mt-0.5">Останні зміни: {new Date(doc.modifiedTime).toLocaleDateString('uk-UA')}</p>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-slate-100 dark:border-slate-850 mt-4 flex items-center justify-between">
                    <a
                      href={`https://docs.google.com/document/d/${doc.id}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[10px] font-extrabold text-school-blue-600 flex items-center gap-1 hover:underline"
                    >
                      Відкрити Doc
                      <ArrowUpRight className="w-3 h-3" />
                    </a>
                    <button
                      onClick={() => handleDeleteFile(doc.id, doc.name)}
                      className="text-slate-400 hover:text-red-500 transition-colors"
                      title="Видалити"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 6. GOOGLE SLIDES */}
        {activeTab === 'slides' && (
          <div className="space-y-4">
            <span className="font-bold text-slate-800 dark:text-white text-xs block mb-1">Лекційні презентації у Google Slides</span>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {presentations.map((pres) => (
                <div key={pres.id} className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-2xl p-5 flex flex-col justify-between hover:scale-[1.01] transition-all">
                  <div className="space-y-3.5">
                    <div className="p-3 bg-orange-100 text-orange-600 dark:bg-orange-950/45 dark:text-orange-400 rounded-xl w-fit">
                      <Layers className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-800 dark:text-white leading-tight font-display">{pres.name}</h4>
                      <p className="text-[10px] text-slate-400 font-mono mt-0.5">Останні зміни: {new Date(pres.modifiedTime).toLocaleDateString('uk-UA')}</p>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-slate-100 dark:border-slate-850 mt-4 flex items-center justify-between">
                    <a
                      href={`https://docs.google.com/presentation/d/${pres.id}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[10px] font-extrabold text-orange-600 flex items-center gap-1 hover:underline"
                    >
                      Редагувати Slides
                      <ArrowUpRight className="w-3 h-3" />
                    </a>
                    <button
                      onClick={() => handleDeleteFile(pres.id, pres.name)}
                      className="text-slate-400 hover:text-red-500 transition-colors"
                      title="Видалити"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Developer footer block */}
      <div className="border border-slate-200 dark:border-slate-800 p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 max-w-3xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h4 className="text-xs font-extrabold text-slate-900 dark:text-white flex items-center gap-1">
            <BookOpen className="w-4 h-4 text-school-blue-500" />
            Документація розробника
          </h4>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
            Потребуєте локальної розробки та розгортання в робоче середовище? Натисніть кнопку завантаження інструкції.
          </p>
        </div>
        <a
          href="https://developers.google.com/workspace"
          target="_blank"
          rel="noopener noreferrer"
          className="px-3 py-1.5 bg-slate-205 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg text-[10px] font-bold transition-all text-center border border-slate-200/40 shrink-0 inline-flex items-center gap-1"
        >
          <FileDown className="w-3.5 h-3.5" />
          <span>Документація Google API ↗</span>
        </a>
      </div>
    </div>
  );
};
