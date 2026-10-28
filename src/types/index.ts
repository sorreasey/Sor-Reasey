export interface Student {
  id: string; // e.g., 'S0001'
  fullName: string;
  fullNameKhmer: string;
  dateOfBirth: string; // YYYY-MM-DD
  gender: 'Male' | 'Female' | 'Other';
  classId: number;
  className: string;
  guardianName: string;
  guardianNameKhmer: string;
  guardianPhone: string;
  address: string;
  photoUrl: string;
  registeredDate: string;
  status: 'Active' | 'Inactive' | 'Graduated';
  notes?: string;
}

export interface ClassEntity {
  id: number;
  name: string;
  nameKhmer: string;
  teacherName: string;
  room: string;
  schedule: string;
  studentCount: number;
  color: string;
}

export type AttendanceStatus = 'Present' | 'Absent' | 'Late' | 'Excused';

export interface AttendanceRecord {
  id: string;
  studentId: string;
  studentName: string;
  classId: number;
  className: string;
  date: string; // YYYY-MM-DD
  status: AttendanceStatus;
  remarks?: string;
}

export interface NewsItem {
  id: string;
  title: string;
  titleKhmer: string;
  summary: string;
  summaryKhmer: string;
  content: string;
  date: string;
  author: string;
  imageUrl: string;
  category: 'Education' | 'Community' | 'Health' | 'Event';
}

export interface EventItem {
  id: string;
  title: string;
  titleKhmer: string;
  description: string;
  date: string;
  time: string;
  location: string;
  category: 'Workshop' | 'Cultural' | 'Exhibition' | 'Health' | 'Sports';
  participants: number;
}

export interface GalleryItem {
  id: string;
  title: string;
  titleKhmer: string;
  category: 'Education' | 'Art' | 'Sports' | 'Community';
  imageUrl: string;
  date: string;
}

export interface FAQItem {
  id: string;
  question: string;
  questionKhmer: string;
  answer: string;
  answerKhmer: string;
  category: 'General' | 'Enrollment' | 'Schedule' | 'Support';
  isUserQuestion?: boolean;
}

export interface ContactMessage {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  createdAt: string;
  status: 'Unread' | 'Replied';
}

export interface UserAccount {
  id: string;
  username: string;
  fullName: string;
  email: string;
  role: 'Admin' | 'Teacher' | 'Staff';
  avatar: string;
}

export interface DashboardStats {
  totalStudents: number;
  newRegistrations: number;
  upcomingEvents: number;
  publishedNews: number;
  attendanceRateToday: number;
  classDistribution: { name: string; count: number; color: string }[];
}
