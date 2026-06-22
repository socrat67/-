export interface Teacher {
  id: string;
  name: string;
  subject: string;
  photo: string;
  category: string;
  experience: number;
  email: string;
}

export interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  imageUrl: string;
  date: string;
  views: number;
}

export interface SchoolDocument {
  id: string;
  title: string;
  category: 'statut' | 'licence' | 'programs' | 'plan' | 'finance' | 'public';
  fileUrl: string;
  dateAdded: string;
  size: string;
}

export interface EventItem {
  id: string;
  title: string;
  date: string;
  time?: string;
  description: string;
  category: 'olympiad' | 'holiday' | 'meeting' | 'contest' | 'general';
}

export interface GalleryItem {
  id: string;
  title: string;
  type: 'photo' | 'video';
  url: string;
  description?: string;
  album: string;
}

export interface FeedbackSubmission {
  id: string;
  type: 'appeal' | 'admission' | 'general';
  senderName: string;
  email: string;
  phone: string;
  message: string;
  date: string;
  status: 'new' | 'processed';
  targetDirector?: boolean;
}

export interface User {
  uid: string;
  email: string;
  role: 'admin' | 'editor' | 'guest';
}
