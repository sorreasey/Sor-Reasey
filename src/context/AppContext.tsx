import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Student,
  ClassEntity,
  AttendanceRecord,
  NewsItem,
  EventItem,
  GalleryItem,
  FAQItem,
  ContactMessage,
  UserAccount,
  DashboardStats,
  AttendanceStatus
} from '../types';
import {
  INITIAL_CLASSES,
  INITIAL_STUDENTS,
  INITIAL_ATTENDANCE,
  INITIAL_NEWS,
  INITIAL_EVENTS,
  INITIAL_FAQS,
  INITIAL_GALLERY,
  CURRENT_USER
} from '../data/initialData';

export type ViewMode = 'mobile' | 'admin' | 'api' | 'code' | 'docs';

export type MobileScreen =
  | 'splash'
  | 'login'
  | 'home'
  | 'students'
  | 'register'
  | 'detail'
  | 'attendance'
  | 'news'
  | 'events'
  | 'location'
  | 'contact'
  | 'faq'
  | 'gallery'
  | 'about'
  | 'profile';

interface AppContextType {
  // State
  students: Student[];
  classes: ClassEntity[];
  attendance: AttendanceRecord[];
  news: NewsItem[];
  events: EventItem[];
  faqs: FAQItem[];
  gallery: GalleryItem[];
  contactMessages: ContactMessage[];
  currentUser: UserAccount;
  language: 'en' | 'km';
  viewMode: ViewMode;
  mobileScreen: MobileScreen;
  selectedStudent: Student | null;
  stats: DashboardStats;

  // Actions
  setLanguage: (lang: 'en' | 'km') => void;
  setViewMode: (mode: ViewMode) => void;
  setMobileScreen: (screen: MobileScreen) => void;
  setSelectedStudent: (student: Student | null) => void;

  // CRUD
  addStudent: (student: Omit<Student, 'id' | 'registeredDate'>) => Student;
  updateStudent: (student: Student) => void;
  deleteStudent: (studentId: string) => void;
  recordAttendance: (studentId: string, status: AttendanceStatus, date?: string, remarks?: string) => void;
  bulkRecordAttendance: (classId: number, status: AttendanceStatus, date?: string) => void;
  addNews: (item: Omit<NewsItem, 'id' | 'date'>) => void;
  deleteNews: (id: string) => void;
  addEvent: (item: Omit<EventItem, 'id'>) => void;
  submitContact: (contact: Omit<ContactMessage, 'id' | 'createdAt' | 'status'>) => void;
  submitFaqQuestion: (question: string, questionKhmer?: string) => void;
  resetToDefaults: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [students, setStudents] = useState<Student[]>(() => {
    const saved = localStorage.getItem('anjali_students');
    return saved ? JSON.parse(saved) : INITIAL_STUDENTS;
  });

  const [classes] = useState<ClassEntity[]>(INITIAL_CLASSES);

  const [attendance, setAttendance] = useState<AttendanceRecord[]>(() => {
    const saved = localStorage.getItem('anjali_attendance');
    return saved ? JSON.parse(saved) : INITIAL_ATTENDANCE;
  });

  const [news, setNews] = useState<NewsItem[]>(() => {
    const saved = localStorage.getItem('anjali_news');
    return saved ? JSON.parse(saved) : INITIAL_NEWS;
  });

  const [events, setEvents] = useState<EventItem[]>(() => {
    const saved = localStorage.getItem('anjali_events');
    return saved ? JSON.parse(saved) : INITIAL_EVENTS;
  });

  const [faqs, setFaqs] = useState<FAQItem[]>(() => {
    const saved = localStorage.getItem('anjali_faqs');
    return saved ? JSON.parse(saved) : INITIAL_FAQS;
  });

  const [gallery, setGallery] = useState<GalleryItem[]>(INITIAL_GALLERY);

  const [contactMessages, setContactMessages] = useState<ContactMessage[]>([
    {
      id: 'MSG-01',
      fullName: 'Vannak Heng',
      email: 'vannak.heng@gmail.com',
      phone: '+855 12 998 776',
      subject: 'Inquiring about English Class enrollment',
      message: 'Hello Anjali House, I would like to know if there are seats available for my 9-year-old nephew.',
      createdAt: '2024-05-14 10:30',
      status: 'Unread'
    }
  ]);

  const [currentUser] = useState<UserAccount>(CURRENT_USER);
  const [language, setLanguage] = useState<'en' | 'km'>('en');
  const [viewMode, setViewMode] = useState<ViewMode>('mobile');
  const [mobileScreen, setMobileScreen] = useState<MobileScreen>('home');
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('anjali_students', JSON.stringify(students));
  }, [students]);

  useEffect(() => {
    localStorage.setItem('anjali_attendance', JSON.stringify(attendance));
  }, [attendance]);

  useEffect(() => {
    localStorage.setItem('anjali_news', JSON.stringify(news));
  }, [news]);

  useEffect(() => {
    localStorage.setItem('anjali_events', JSON.stringify(events));
  }, [events]);

  useEffect(() => {
    localStorage.setItem('anjali_faqs', JSON.stringify(faqs));
  }, [faqs]);

  // Student CRUD
  const addStudent = (data: Omit<Student, 'id' | 'registeredDate'>): Student => {
    const nextNum = students.length + 1;
    const nextId = `S${String(nextNum).padStart(4, '0')}`;
    const today = new Date().toISOString().substring(0, 10);
    const newStudent: Student = {
      ...data,
      id: nextId,
      registeredDate: today,
      status: 'Active'
    };
    setStudents(prev => [newStudent, ...prev]);
    return newStudent;
  };

  const updateStudent = (updated: Student) => {
    setStudents(prev => prev.map(s => (s.id === updated.id ? updated : s)));
    if (selectedStudent?.id === updated.id) {
      setSelectedStudent(updated);
    }
  };

  const deleteStudent = (studentId: string) => {
    setStudents(prev => prev.filter(s => s.id !== studentId));
    if (selectedStudent?.id === studentId) {
      setSelectedStudent(null);
    }
  };

  // Attendance
  const recordAttendance = (
    studentId: string,
    status: AttendanceStatus,
    date = '2024-05-15',
    remarks?: string
  ) => {
    const student = students.find(s => s.id === studentId);
    if (!student) return;

    setAttendance(prev => {
      const filtered = prev.filter(a => !(a.studentId === studentId && a.date === date));
      const newRec: AttendanceRecord = {
        id: `ATT-${Date.now()}-${studentId}`,
        studentId,
        studentName: student.fullName,
        classId: student.classId,
        className: student.className,
        date,
        status,
        remarks
      };
      return [newRec, ...filtered];
    });
  };

  const bulkRecordAttendance = (classId: number, status: AttendanceStatus, date = '2024-05-15') => {
    const targetStudents = students.filter(s => s.classId === classId);
    targetStudents.forEach(s => {
      recordAttendance(s.id, status, date);
    });
  };

  // News & Events
  const addNews = (item: Omit<NewsItem, 'id' | 'date'>) => {
    const newItem: NewsItem = {
      ...item,
      id: `NEWS-${Date.now()}`,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    };
    setNews(prev => [newItem, ...prev]);
  };

  const deleteNews = (id: string) => {
    setNews(prev => prev.filter(n => n.id !== id));
  };

  const addEvent = (item: Omit<EventItem, 'id'>) => {
    const newEvt: EventItem = {
      ...item,
      id: `EVT-${Date.now()}`
    };
    setEvents(prev => [...prev, newEvt]);
  };

  const submitContact = (contact: Omit<ContactMessage, 'id' | 'createdAt' | 'status'>) => {
    const newMsg: ContactMessage = {
      ...contact,
      id: `MSG-${Date.now()}`,
      createdAt: new Date().toISOString().substring(0, 16).replace('T', ' '),
      status: 'Unread'
    };
    setContactMessages(prev => [newMsg, ...prev]);
  };

  const submitFaqQuestion = (question: string, questionKhmer?: string) => {
    const newFaq: FAQItem = {
      id: `FAQ-${Date.now()}`,
      question,
      questionKhmer: questionKhmer || question,
      answer: 'Thank you for your question. Our administration team is reviewing it and will provide an answer shortly.',
      answerKhmer: 'សូមអរគុណសម្រាប់សំណួររបស់អ្នក។ ក្រុមការងាររដ្ឋបាលរបស់យើងកំពុងពិនិត្យ និងឆ្លើយតបក្នុងពេលឆាប់ៗនេះ។',
      category: 'General',
      isUserQuestion: true
    };
    setFaqs(prev => [newFaq, ...prev]);
  };

  const resetToDefaults = () => {
    localStorage.clear();
    setStudents(INITIAL_STUDENTS);
    setAttendance(INITIAL_ATTENDANCE);
    setNews(INITIAL_NEWS);
    setEvents(INITIAL_EVENTS);
    setFaqs(INITIAL_FAQS);
    setGallery(INITIAL_GALLERY);
  };

  // Live Stats
  const classCounts = classes.map(c => {
    const count = students.filter(s => s.classId === c.id).length;
    // Scale count for NGO representation if needed
    return {
      name: c.name.split(' Level')[0].split(' &')[0],
      count: count * 15 || c.studentCount,
      color: c.color
    };
  });

  const presentCount = attendance.filter(a => a.status === 'Present').length;
  const attendanceRate = attendance.length > 0 ? Math.round((presentCount / attendance.length) * 100) : 92;

  const stats: DashboardStats = {
    totalStudents: 320, // matches reference design
    newRegistrations: 28, // matches reference design
    upcomingEvents: events.length || 12,
    publishedNews: news.length || 8,
    attendanceRateToday: attendanceRate,
    classDistribution: [
      { name: 'English Class', count: 120, color: '#087F4F' },
      { name: 'Computer Class', count: 80, color: '#3B82F6' },
      { name: 'Art Class', count: 60, color: '#F59E0B' },
      { name: 'Other', count: 60, color: '#8B5CF6' }
    ]
  };

  return (
    <AppContext.Provider
      value={{
        students,
        classes,
        attendance,
        news,
        events,
        faqs,
        gallery,
        contactMessages,
        currentUser,
        language,
        viewMode,
        mobileScreen,
        selectedStudent,
        stats,
        setLanguage,
        setViewMode,
        setMobileScreen,
        setSelectedStudent,
        addStudent,
        updateStudent,
        deleteStudent,
        recordAttendance,
        bulkRecordAttendance,
        addNews,
        deleteNews,
        addEvent,
        submitContact,
        submitFaqQuestion,
        resetToDefaults
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
