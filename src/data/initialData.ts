import { Student, ClassEntity, AttendanceRecord, NewsItem, EventItem, GalleryItem, FAQItem, UserAccount } from '../types';

export const INITIAL_CLASSES: ClassEntity[] = [
  {
    id: 1,
    name: 'English Class Level 1 & 2',
    nameKhmer: 'ថ្នាក់ភាសាអង់គ្លេស កម្រិត ១ និង ២',
    teacherName: 'Teacher Panha Keo',
    room: 'Room A-101',
    schedule: 'Mon - Fri | 8:00 AM - 10:30 AM',
    studentCount: 120,
    color: '#087F4F'
  },
  {
    id: 2,
    name: 'Computer Literacy',
    nameKhmer: 'ថ្នាក់កុំព្យូទ័រ និងបច្ចេកវិទ្យា',
    teacherName: 'Teacher Dara Vong',
    room: 'Lab B-204',
    schedule: 'Mon - Fri | 1:30 PM - 3:30 PM',
    studentCount: 80,
    color: '#3B82F6'
  },
  {
    id: 3,
    name: 'Art & Creative Expression',
    nameKhmer: 'ថ្នាក់សិល្បៈ និងការបញ្ចេញគំនិតច្នៃប្រឌិត',
    teacherName: 'Teacher Sreymom Pich',
    room: 'Art Studio C-102',
    schedule: 'Tue & Thu | 3:30 PM - 5:00 PM',
    studentCount: 60,
    color: '#F59E0B'
  },
  {
    id: 4,
    name: 'Khmer Literacy & Support',
    nameKhmer: 'ថ្នាក់អក្ខរកម្មភាសាខ្មែរ',
    teacherName: 'Teacher Chantrea Som',
    room: 'Room A-103',
    schedule: 'Mon - Fri | 10:30 AM - 12:00 PM',
    studentCount: 35,
    color: '#8B5CF6'
  },
  {
    id: 5,
    name: 'Sports & Life Skills',
    nameKhmer: 'ថ្នាក់កីឡា និងបំណិនជីវិត',
    teacherName: 'Coach Rithy Kim',
    room: 'Field & Community Hall',
    schedule: 'Wed & Sat | 8:30 AM - 10:30 AM',
    studentCount: 25,
    color: '#EC4899'
  }
];

export const INITIAL_STUDENTS: Student[] = [
  {
    id: 'S0001',
    fullName: 'Sok Chetra',
    fullNameKhmer: 'សុខ ចិត្រា',
    dateOfBirth: '2012-04-12',
    gender: 'Male',
    classId: 1,
    className: 'English Class Level 1 & 2',
    guardianName: 'Sok Samnang',
    guardianNameKhmer: 'សុខ សំណាង',
    guardianPhone: '+855 12 889 012',
    address: 'Salakanseng Village, Svay Dangkum, Siem Reap',
    photoUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=400',
    registeredDate: '2024-05-15',
    status: 'Active',
    notes: 'Very attentive in English reading. Receives free lunch daily.'
  },
  {
    id: 'S0002',
    fullName: 'Chan Davit',
    fullNameKhmer: 'ចាន់ ដាវីត',
    dateOfBirth: '2011-08-25',
    gender: 'Male',
    classId: 2,
    className: 'Computer Literacy',
    guardianName: 'Chan Kosal',
    guardianNameKhmer: 'ចាន់ កុសល',
    guardianPhone: '+855 77 345 901',
    address: 'Wat Bo Village, Salakamreuk, Siem Reap',
    photoUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=400',
    registeredDate: '2024-05-15',
    status: 'Active',
    notes: 'Loves graphic design and typing in Khmer Unicode.'
  },
  {
    id: 'S0003',
    fullName: 'Meas Sreyneang',
    fullNameKhmer: 'មាស ស្រីនាង',
    dateOfBirth: '2013-11-03',
    gender: 'Female',
    classId: 1,
    className: 'English Class Level 1 & 2',
    guardianName: 'Meas Sarun',
    guardianNameKhmer: 'មាស សារុន',
    guardianPhone: '+855 88 456 712',
    address: 'Mondul 1 Village, Svay Dangkum, Siem Reap',
    photoUrl: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&q=80&w=400',
    registeredDate: '2024-05-14',
    status: 'Active',
    notes: 'Passionate about storytelling and art.'
  },
  {
    id: 'S0004',
    fullName: 'Long Vicheka',
    fullNameKhmer: 'ឡុង វិច្ឆិកា',
    dateOfBirth: '2012-01-19',
    gender: 'Female',
    classId: 3,
    className: 'Art & Creative Expression',
    guardianName: 'Long Phally',
    guardianNameKhmer: 'ឡុង ផល្លី',
    guardianPhone: '+855 93 112 458',
    address: 'Chreav Village, Chreav Commune, Siem Reap',
    photoUrl: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&q=80&w=400',
    registeredDate: '2024-05-14',
    status: 'Active',
    notes: 'Exhibited painting at Angkor Children Art Fair.'
  },
  {
    id: 'S0005',
    fullName: 'Keo Panha',
    fullNameKhmer: 'កែវ បញ្ញា',
    dateOfBirth: '2010-06-30',
    gender: 'Male',
    classId: 2,
    className: 'Computer Literacy',
    guardianName: 'Keo Sophea',
    guardianNameKhmer: 'កែវ សុភា',
    guardianPhone: '+855 17 654 321',
    address: 'Slorkram Village, Slorkram, Siem Reap',
    photoUrl: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=400',
    registeredDate: '2024-05-12',
    status: 'Active',
    notes: 'Peer mentor in Scratch coding workshop.'
  },
  {
    id: 'S0006',
    fullName: 'Teng Bopha',
    fullNameKhmer: 'តេង បុប្ផា',
    dateOfBirth: '2013-09-15',
    gender: 'Female',
    classId: 1,
    className: 'English Class Level 1 & 2',
    guardianName: 'Teng Bunly',
    guardianNameKhmer: 'តេង ប៊ុនលី',
    guardianPhone: '+855 96 789 012',
    address: 'Kork Ta Chan, Nokor Thum, Siem Reap',
    photoUrl: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&q=80&w=400',
    registeredDate: '2024-05-10',
    status: 'Active',
    notes: 'Participates in after-school hygiene program.'
  },
  {
    id: 'S0007',
    fullName: 'Chhim Rathana',
    fullNameKhmer: 'ឈឹម រតនា',
    dateOfBirth: '2011-03-22',
    gender: 'Male',
    classId: 4,
    className: 'Khmer Literacy & Support',
    guardianName: 'Chhim Piseth',
    guardianNameKhmer: 'ឈឹម ពិសិដ្ឋ',
    guardianPhone: '+855 12 778 899',
    address: 'Kruos Village, Svay Dangkum, Siem Reap',
    photoUrl: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=400',
    registeredDate: '2024-05-08',
    status: 'Active',
    notes: 'Showing huge improvement in reading comprehension.'
  },
  {
    id: 'S0008',
    fullName: 'Seng Kolab',
    fullNameKhmer: 'សេង កុលាប',
    dateOfBirth: '2012-12-05',
    gender: 'Female',
    classId: 5,
    className: 'Sports & Life Skills',
    guardianName: 'Seng Vannak',
    guardianNameKhmer: 'សេង វណ្ណៈ',
    guardianPhone: '+855 78 554 433',
    address: 'Phsar Leu Area, Slorkram, Siem Reap',
    photoUrl: 'https://images.unsplash.com/photo-1519452635265-7b1fbfd1e4e0?auto=format&fit=crop&q=80&w=400',
    registeredDate: '2024-05-02',
    status: 'Active',
    notes: 'Captained the girls football friendly match.'
  }
];

export const INITIAL_ATTENDANCE: AttendanceRecord[] = [
  { id: 'ATT-001', studentId: 'S0001', studentName: 'Sok Chetra', classId: 1, className: 'English Class Level 1 & 2', date: '2024-05-15', status: 'Present' },
  { id: 'ATT-002', studentId: 'S0002', studentName: 'Chan Davit', classId: 2, className: 'Computer Literacy', date: '2024-05-15', status: 'Present' },
  { id: 'ATT-003', studentId: 'S0003', studentName: 'Meas Sreyneang', classId: 1, className: 'English Class Level 1 & 2', date: '2024-05-15', status: 'Present' },
  { id: 'ATT-004', studentId: 'S0004', studentName: 'Long Vicheka', classId: 3, className: 'Art & Creative Expression', date: '2024-05-15', status: 'Late', remarks: 'Traffic delay' },
  { id: 'ATT-005', studentId: 'S0005', studentName: 'Keo Panha', classId: 2, className: 'Computer Literacy', date: '2024-05-15', status: 'Present' },
  { id: 'ATT-006', studentId: 'S0006', studentName: 'Teng Bopha', classId: 1, className: 'English Class Level 1 & 2', date: '2024-05-15', status: 'Excused', remarks: 'Medical visit' },
  { id: 'ATT-007', studentId: 'S0007', studentName: 'Chhim Rathana', classId: 4, className: 'Khmer Literacy & Support', date: '2024-05-15', status: 'Present' },
  { id: 'ATT-008', studentId: 'S0008', studentName: 'Seng Kolab', classId: 5, className: 'Sports & Life Skills', date: '2024-05-15', status: 'Present' }
];

export const INITIAL_NEWS: NewsItem[] = [
  {
    id: 'NEWS-01',
    title: 'New English Class Starts',
    titleKhmer: 'ថ្នាក់ភាសាអង់គ្លេសថ្មីបានចាប់ផ្តើម',
    summary: 'Anjali House welcomes 60 new young learners for our free intermediate conversational English semester.',
    summaryKhmer: 'អង្គការ Anjali House ស្វាគមន៍សិស្សថ្មីចំនួន ៦០ នាក់ សម្រាប់វគ្គបណ្តុះបណ្តាលភាសាអង់គ្លេសឥតគិតថ្លៃ។',
    content: 'We are thrilled to announce the official opening of our Level 1 and 2 English program for students aged 8 to 14. Equipped with audio visual aids and interactive games, this course builds conversational confidence and prepares children for future academic success.',
    date: 'May 15, 2024',
    author: 'Teacher Panha Keo',
    imageUrl: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=600',
    category: 'Education'
  },
  {
    id: 'NEWS-02',
    title: 'Health & Dental Checkup Week',
    titleKhmer: 'សប្តាហ៍ពិនិត្យសុខភាព និងធ្មេញទូទៅ',
    summary: 'Annual medical screening completed for all 320 enrolled children in partnership with Angkor Children Hospital.',
    summaryKhmer: 'ការពិនិត្យសុខភាពប្រចាំឆ្នាំសម្រាប់កុមារទាំង ៣២០ នាក់ ដោយសហការជាមួយមន្ទីរពេទ្យកុមារអង្គរ។',
    content: 'Good health is foundational for learning. This week, our volunteer medical and pediatric dental teams examined vision, hygiene, nutrition metrics, and provided vitamins and oral care kits to every student.',
    date: 'May 10, 2024',
    author: 'Healthcare Coordinator',
    imageUrl: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=600',
    category: 'Health'
  },
  {
    id: 'NEWS-03',
    title: 'Youth Art Exhibition in Siem Reap',
    titleKhmer: 'ពិព័រណ៍សិល្បៈយុវជននៅក្រុងសៀមរាប',
    summary: 'Over 45 original watercolor and photography pieces created by Anjali House students on public display.',
    summaryKhmer: 'ផ្ទាំងគំនូរពណ៌ទឹក និងរូបថតជាង ៤៥ សន្លឹក បង្កើតឡើងដោយសិស្ស Anjali House ត្រូវបានដាក់តាំងបង្ហាញជាសាធារណៈ។',
    content: 'Our photography and painting workshops give children a powerful creative voice to express their dreams and their love for Cambodian cultural heritage around Angkor.',
    date: 'May 04, 2024',
    author: 'Arts Director',
    imageUrl: 'https://images.unsplash.com/photo-1460518451282-474b15672083?auto=format&fit=crop&q=80&w=600',
    category: 'Community'
  }
];

export const INITIAL_EVENTS: EventItem[] = [
  {
    id: 'EVT-01',
    title: 'Angkor Heritage Educational Tour',
    titleKhmer: 'ដំណើរទស្សនកិច្ចសិក្សាបេតិកភណ្ឌអង្គរ',
    description: 'Guided tour for 80 students to Angkor Wat & Bayon Temple focusing on Khmer history, architecture, and environmental conservation.',
    date: 'May 25, 2024',
    time: '7:30 AM - 12:30 PM',
    location: 'Angkor Archaeological Park',
    category: 'Cultural',
    participants: 80
  },
  {
    id: 'EVT-02',
    title: 'Mid-Year Parent & Teacher Meeting',
    titleKhmer: 'កិច្ចប្រជុំមាតាបិតាសិស្ស និងលោកគ្រូអ្នកគ្រូ',
    description: 'Discussing student attendance, nutrition progress, hygiene standards, and family support packages.',
    date: 'June 02, 2024',
    time: '8:30 AM - 11:00 AM',
    location: 'Anjali House Main Hall',
    category: 'Workshop',
    participants: 150
  },
  {
    id: 'EVT-03',
    title: 'Community Soccer & Friendship Cup',
    titleKhmer: 'ការប្រកួតកីឡាបាល់ទាត់មិត្តភាពសហគមន៍',
    description: 'Promoting teamwork, physical health, and sportsmanship between local Siem Reap youth organizations.',
    date: 'June 15, 2024',
    time: '2:00 PM - 5:30 PM',
    location: 'Siem Reap Provincial Stadium',
    category: 'Sports',
    participants: 120
  }
];

export const INITIAL_FAQS: FAQItem[] = [
  {
    id: 'FAQ-01',
    question: 'What documents are needed for registration?',
    questionKhmer: 'តើត្រូវមានឯកសារអ្វីខ្លះដើម្បីចុះឈ្មោះចូលរៀន?',
    answer: 'To register a child at Anjali House, guardians need: (1) Family Book or Residence Book, (2) Birth Certificate of the child, (3) Guardian National ID card, and (4) 2 passport-sized photos.',
    answerKhmer: 'ដើម្បីចុះឈ្មោះកុមារនៅ Anjali House អាណាព្យាបាលត្រូវមាន៖ (១) សៀវភៅគ្រួសារ ឬសៀវភៅស្នាក់នៅ (២) សំបុត្រកំណើតកុមារ (៣) អត្តសញ្ញាណប័ណ្ណអាណាព្យាបាល និង (៤) រូបថត ៤x៦ ចំនួន ២សន្លឹក។',
    category: 'Enrollment'
  },
  {
    id: 'FAQ-02',
    question: 'How can I update my phone number?',
    questionKhmer: 'តើខ្ញុំអាចធ្វើបច្ចុប្បន្នភាពលេខទូរស័ព្ទរបស់ខ្ញុំដោយរបៀបណា?',
    answer: 'You can update your phone number through this mobile app under your profile screen, or visit the administration desk during office hours (Mon-Sat, 7:30 AM - 5:30 PM).',
    answerKhmer: 'អ្នកអាចកែប្រែលេខទូរស័ព្ទតាមរយៈកម្មវិធីទូរស័ព្ទនេះនៅក្នុងផ្នែកប្រវត្តិរូប ឬមកកាន់ការិយាល័យរដ្ឋបាលផ្ទាល់នៅម៉ោងធ្វើការ (ច័ន្ទ-សៅរ៍ ៧:៣០ ព្រឹក - ៥:៣០ ល្ងាច)។',
    category: 'Support'
  },
  {
    id: 'FAQ-03',
    question: 'What are the class schedules?',
    questionKhmer: 'តើកាលវិភាគសិក្សាមានពេលវេលាដូចម្តេចដែរ?',
    answer: 'Morning sessions run from 7:30 AM to 11:30 AM (English & Khmer Literacy). Afternoon sessions run from 1:30 PM to 5:00 PM (Computer, Arts, and Sports). Free lunch is served at 11:45 AM.',
    answerKhmer: 'វេនពេលព្រឹកចាប់ពីម៉ោង ៧:៣០ ព្រឹក ដល់ ១១:៣០ ព្រឹក (ភាសាអង់គ្លេស និងអក្ខរកម្មខ្មែរ)។ វេនរសៀលចាប់ពីម៉ោង ១:៣០ រសៀល ដល់ ៥:០០ ល្ងាច (កុំព្យូទ័រ សិល្បៈ និងកីឡា)។ អាហារថ្ងៃត្រង់ឥតគិតថ្លៃផ្តល់ជូននៅម៉ោង ១១:៤៥ ព្រឹក។',
    category: 'Schedule'
  },
  {
    id: 'FAQ-04',
    question: 'Is there any fee to study at Anjali House?',
    questionKhmer: 'តើមានការបង់ថ្លៃសិក្សានៅ Anjali House ដែរឬទេ?',
    answer: 'No. All education, school supplies, uniforms, daily hot meals, hygiene supplies, and healthcare checkups are 100% free of charge for enrolled children and supported by international donors.',
    answerKhmer: 'មិនមានការបង់ប្រាក់ឡើយ! រាល់ការសិក្សា សម្ភារៈសិក្សា ឯកសណ្ឋាន អាហារក្តៅប្រចាំថ្ងៃ សម្ភារៈអនាម័យ និងការថែទាំសុខភាព គឺឥតគិតថ្លៃ ១០០% សម្រាប់កុមារដែលបានចុះឈ្មោះ។',
    category: 'General'
  },
  {
    id: 'FAQ-05',
    question: 'How can I contact the staff?',
    questionKhmer: 'តើខ្ញុំអាចទាក់ទងបុគ្គលិកដោយរបៀបណា?',
    answer: 'You can call us directly at +855 12 345 678, send a message through the Contact Us tab, or email us at info@anjalihouse.org. Our office is open Monday to Saturday.',
    answerKhmer: 'អ្នកអាចទូរស័ព្ទមកយើងផ្ទាល់តាមរយៈ +855 12 345 678 ផ្ញើសារតាមផ្ទាំង Contact Us ឬផ្ញើអ៊ីមែលមក info@anjalihouse.org។ ការិយាល័យរបស់យើងបើកពីថ្ងៃច័ន្ទ ដល់ថ្ងៃសៅរ៍។',
    category: 'Support'
  }
];

export const INITIAL_GALLERY: GalleryItem[] = [
  {
    id: 'GAL-01',
    title: 'Morning Interactive English Class',
    titleKhmer: 'ថ្នាក់រៀនភាសាអង់គ្លេសពេលព្រឹក',
    category: 'Education',
    imageUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=800',
    date: 'May 2024'
  },
  {
    id: 'GAL-02',
    title: 'Computer Lab Digital Literacy',
    titleKhmer: 'ការរៀនកុំព្យូទ័រ និងបច្ចេកវិទ្យា',
    category: 'Education',
    imageUrl: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=800',
    date: 'May 2024'
  },
  {
    id: 'GAL-03',
    title: 'Watercolor Painting Workshop',
    titleKhmer: 'សិក្ខាសាលាគូរគំនូរពណ៌ទឹក',
    category: 'Art',
    imageUrl: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=800',
    date: 'Apr 2024'
  },
  {
    id: 'GAL-04',
    title: 'Afternoon Football Training',
    titleKhmer: 'ការហ្វឹកហាត់កីឡាបាល់ទាត់ពេលរសៀល',
    category: 'Sports',
    imageUrl: 'https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&q=80&w=800',
    date: 'Apr 2024'
  },
  {
    id: 'GAL-05',
    title: 'Healthy Hot Lunch Nutrition Program',
    titleKhmer: 'កម្មវិធីអាហារថ្ងៃត្រង់មានជីវជាតិ',
    category: 'Community',
    imageUrl: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=800',
    date: 'Mar 2024'
  },
  {
    id: 'GAL-06',
    title: 'Angkor Wat Archaeological Field Trip',
    titleKhmer: 'ទស្សនកិច្ចសិក្សានៅប្រាសាទអង្គរវត្ត',
    category: 'Community',
    imageUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=800',
    date: 'Feb 2024'
  }
];

export const CURRENT_USER: UserAccount = {
  id: 'USR-01',
  username: 'panha.keo',
  fullName: 'Panha Keo',
  email: 'panha.keo@anjalihouse.org',
  role: 'Admin',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300'
};
