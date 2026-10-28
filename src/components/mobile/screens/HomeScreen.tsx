import React from 'react';
import { useApp } from '../../../context/AppContext';
import {
  Bell,
  UserPlus,
  Users,
  Newspaper,
  Calendar,
  MapPin,
  Image as ImageIcon,
  HelpCircle,
  PhoneCall,
  Info,
  ChevronRight,
  ClipboardCheck
} from 'lucide-react';

export const HomeScreen: React.FC = () => {
  const { setMobileScreen, language, news, currentUser } = useApp();

  const shortcuts = [
    {
      id: 'register',
      labelEn: 'Register',
      labelKm: 'ចុះឈ្មោះ',
      icon: <UserPlus className="w-6 h-6 text-emerald-600" />,
      bg: 'bg-emerald-50 text-emerald-700',
      screen: 'register' as const
    },
    {
      id: 'students',
      labelEn: 'Students',
      labelKm: 'សិស្ស',
      icon: <Users className="w-6 h-6 text-blue-600" />,
      bg: 'bg-blue-50 text-blue-700',
      screen: 'students' as const
    },
    {
      id: 'news',
      labelEn: 'News',
      labelKm: 'ព័ត៌មាន',
      icon: <Newspaper className="w-6 h-6 text-amber-600" />,
      bg: 'bg-amber-50 text-amber-700',
      screen: 'news' as const
    },
    {
      id: 'events',
      labelEn: 'Events',
      labelKm: 'ព្រឹត្តិការណ៍',
      icon: <Calendar className="w-6 h-6 text-purple-600" />,
      bg: 'bg-purple-50 text-purple-700',
      screen: 'events' as const
    },
    {
      id: 'location',
      labelEn: 'Location',
      labelKm: 'ទីតាំង',
      icon: <MapPin className="w-6 h-6 text-rose-600" />,
      bg: 'bg-rose-50 text-rose-700',
      screen: 'location' as const
    },
    {
      id: 'gallery',
      labelEn: 'Gallery',
      labelKm: 'រូបភាព',
      icon: <ImageIcon className="w-6 h-6 text-teal-600" />,
      bg: 'bg-teal-50 text-teal-700',
      screen: 'gallery' as const
    },
    {
      id: 'faq',
      labelEn: 'Q&A',
      labelKm: 'សំណួរ-ចម្លើយ',
      icon: <HelpCircle className="w-6 h-6 text-orange-600" />,
      bg: 'bg-orange-50 text-orange-700',
      screen: 'faq' as const
    },
    {
      id: 'contact',
      labelEn: 'Contact',
      labelKm: 'ទំនាក់ទំនង',
      icon: <PhoneCall className="w-6 h-6 text-sky-600" />,
      bg: 'bg-sky-50 text-sky-700',
      screen: 'contact' as const
    },
    {
      id: 'about',
      labelEn: 'About Us',
      labelKm: 'អំពីអង្គការ',
      icon: <Info className="w-6 h-6 text-[#087F4F]" />,
      bg: 'bg-emerald-50 text-[#087F4F]',
      screen: 'about' as const
    }
  ];

  const latestNewsItem = news[0];

  return (
    <div className="p-4 space-y-4 pb-6">
      {/* Top Greeting Header matching Screen 2 */}
      <div className="flex items-center justify-between pt-1">
        <div>
          <div className="flex items-center gap-1.5">
            <h1 className="text-xl font-bold text-slate-800">
              {language === 'km' ? 'សួស្តី, បញ្ញា' : 'Hello, Panha'}
            </h1>
            <span className="text-lg">👋</span>
          </div>
          <p className="text-xs text-slate-500 font-medium">
            {language === 'km' ? 'អរុណសួស្តី! សូមស្វាគមន៍មកកាន់ Anjali House' : 'Good Morning!'}
          </p>
        </div>

        <button
          onClick={() => alert(language === 'km' ? 'គ្មានការជូនដំណឹងថ្មីទេ' : 'No new notifications')}
          className="relative w-10 h-10 rounded-full bg-white border border-slate-200 shadow-xs flex items-center justify-center text-slate-600 hover:text-[#087F4F] transition-colors"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white"></span>
        </button>
      </div>

      {/* Banner Photo of smiling students matching Screen 2 */}
      <div className="relative rounded-2xl overflow-hidden shadow-xs border border-slate-100 group">
        <img
          src="https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=800"
          alt="Anjali House Students smiling together"
          className="w-full h-36 object-cover object-center group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-3.5">
          <span className="text-[10px] font-bold text-emerald-300 tracking-wider uppercase">
            {language === 'km' ? 'សៀមរាប • ប្រទេសកម្ពុជា' : 'Siem Reap • Cambodia'}
          </span>
          <p className="text-xs font-semibold text-white drop-shadow-xs">
            {language === 'km'
              ? 'ការផ្តល់អំណាចដល់កុមារកម្ពុជាតាមរយៈការអប់រំ និងសិល្បៈ'
              : 'Empowering Cambodian children through education & arts'}
          </p>
        </div>
      </div>

      {/* Quick Attendance action banner */}
      <div
        onClick={() => setMobileScreen('attendance')}
        className="bg-emerald-800 text-white p-3 rounded-2xl flex items-center justify-between cursor-pointer hover:bg-emerald-900 transition-colors shadow-xs"
      >
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-emerald-600 flex items-center justify-center">
            <ClipboardCheck className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-xs font-bold leading-tight">
              {language === 'km' ? 'កត់ត្រាវត្តមានប្រចាំថ្ងៃ' : 'Record Today Attendance'}
            </p>
            <p className="text-[10px] text-emerald-200">
              {language === 'km' ? 'ពិនិត្យវត្តមានសិស្សតាមថ្នាក់' : 'Class register & daily check'}
            </p>
          </div>
        </div>
        <ChevronRight className="w-4 h-4 text-emerald-300" />
      </div>

      {/* 8 Grid Action Shortcuts matching Screen 2 */}
      <div>
        <div className="grid grid-cols-3 gap-2.5">
          {shortcuts.map((item) => (
            <button
              key={item.id}
              onClick={() => setMobileScreen(item.screen)}
              className="bg-white rounded-2xl p-3 flex flex-col items-center justify-center text-center shadow-xs border border-slate-100/80 hover:shadow-md hover:border-emerald-200 active:scale-95 transition-all group min-h-[88px]"
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-1.5 transition-transform group-hover:scale-110">
                {item.icon}
              </div>
              <span className="text-xs font-semibold text-slate-700 leading-tight">
                {language === 'km' ? item.labelKm : item.labelEn}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Latest News Section matching Screen 2 */}
      <div className="pt-1">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-sm font-bold text-slate-800">
            {language === 'km' ? 'ព័ត៌មានចុងក្រោយ' : 'Latest News'}
          </h2>
          <button
            onClick={() => setMobileScreen('news')}
            className="text-xs font-bold text-[#087F4F] hover:underline"
          >
            {language === 'km' ? 'មើលទាំងអស់' : 'View All'}
          </button>
        </div>

        {latestNewsItem && (
          <div
            onClick={() => setMobileScreen('news')}
            className="bg-white p-2.5 rounded-2xl shadow-xs border border-slate-100 flex items-center justify-between gap-3 cursor-pointer hover:border-emerald-200 transition-all"
          >
            <img
              src={latestNewsItem.imageUrl}
              alt={latestNewsItem.title}
              className="w-14 h-14 rounded-xl object-cover shrink-0"
            />
            <div className="flex-1 min-w-0">
              <h3 className="text-xs font-bold text-slate-800 truncate">
                {language === 'km' ? latestNewsItem.titleKhmer : latestNewsItem.title}
              </h3>
              <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                {language === 'km' ? latestNewsItem.summaryKhmer : latestNewsItem.summary}
              </p>
              <span className="text-[10px] text-emerald-700 font-semibold inline-block mt-1">
                {latestNewsItem.date}
              </span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
          </div>
        )}
      </div>
    </div>
  );
};
