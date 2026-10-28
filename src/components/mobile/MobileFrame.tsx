import React from 'react';
import { useApp, MobileScreen } from '../../context/AppContext';
import {
  Smartphone,
  ChevronLeft,
  Home,
  Newspaper,
  Calendar,
  User,
  Menu,
  RotateCw,
  Maximize2
} from 'lucide-react';

// Screens
import { SplashScreen } from './screens/SplashScreen';
import { LoginScreen } from './screens/LoginScreen';
import { HomeScreen } from './screens/HomeScreen';
import { StudentListScreen } from './screens/StudentListScreen';
import { RegisterStudentScreen } from './screens/RegisterStudentScreen';
import { StudentDetailScreen } from './screens/StudentDetailScreen';
import { AttendanceScreen } from './screens/AttendanceScreen';
import { NewsScreen } from './screens/NewsScreen';
import { EventsScreen } from './screens/EventsScreen';
import { LocationScreen } from './screens/LocationScreen';
import { ContactScreen } from './screens/ContactScreen';
import { FaqScreen } from './screens/FaqScreen';
import { GalleryScreen } from './screens/GalleryScreen';
import { AboutScreen } from './screens/AboutScreen';
import { ProfileScreen } from './screens/ProfileScreen';

export const MobileFrame: React.FC = () => {
  const { mobileScreen, setMobileScreen, language } = useApp();
  const [deviceFrame, setDeviceFrame] = React.useState(true);

  // Map of screen title
  const screenTitles: Record<MobileScreen, { en: string; km: string }> = {
    splash: { en: '1. Splash Screen', km: '១. ផ្ទាំងចាប់ផ្តើម (Splash)' },
    home: { en: '2. Home Dashboard', km: '២. ផ្ទាំងដើម (Home)' },
    location: { en: '3. Location Screen', km: '៣. ទីតាំងអង្គការ (Location)' },
    contact: { en: '4. Contact Us Screen', km: '៤. ទំនាក់ទំនង (Contact Us)' },
    faq: { en: '5. Q&A / FAQ Screen', km: '៥. សំណួរ-ចម្លើយ (Q&A / FAQ)' },
    register: { en: '7. Register Student Form', km: '៧. ចុះឈ្មោះសិស្ស (Register)' },
    students: { en: 'Student List', km: 'បញ្ជីឈ្មោះសិស្ស' },
    detail: { en: 'Student Details', km: 'ព័ត៌មានលម្អិតសិស្ស' },
    attendance: { en: 'Daily Attendance', km: 'កត់ត្រាវត្តមានសិស្ស' },
    news: { en: 'News & Announcements', km: 'ព័ត៌មាន និងសេចក្តីជូនដំណឹង' },
    events: { en: 'Upcoming Events', km: 'ព្រឹត្តិការណ៍ និងសកម្មភាព' },
    gallery: { en: 'Photo Gallery', km: 'កម្រងរូបភាពសកម្មភាព' },
    about: { en: 'About Anjali House', km: 'អំពីអង្គការ Anjali House' },
    profile: { en: 'User Profile', km: 'គណនីអ្នកប្រើប្រាស់' },
    login: { en: 'Staff Login', km: 'ចូលប្រព័ន្ធ (Login)' }
  };

  const renderActiveScreen = () => {
    switch (mobileScreen) {
      case 'splash':
        return <SplashScreen />;
      case 'login':
        return <LoginScreen />;
      case 'home':
        return <HomeScreen />;
      case 'students':
        return <StudentListScreen />;
      case 'register':
        return <RegisterStudentScreen />;
      case 'detail':
        return <StudentDetailScreen />;
      case 'attendance':
        return <AttendanceScreen />;
      case 'news':
        return <NewsScreen />;
      case 'events':
        return <EventsScreen />;
      case 'location':
        return <LocationScreen />;
      case 'contact':
        return <ContactScreen />;
      case 'faq':
        return <FaqScreen />;
      case 'gallery':
        return <GalleryScreen />;
      case 'about':
        return <AboutScreen />;
      case 'profile':
        return <ProfileScreen />;
      default:
        return <HomeScreen />;
    }
  };

  const isFullscreenSplash = mobileScreen === 'splash';

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-slate-100 to-emerald-50/40 p-4 sm:p-6 flex flex-col items-center justify-start">
      {/* Control Bar: Jump to any screen from the reference design! */}
      <div className="w-full max-w-4xl bg-white border border-slate-200/80 rounded-2xl p-3 mb-6 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-100 text-[#087F4F] flex items-center justify-center font-bold text-xs">
            📱
          </div>
          <div>
            <p className="text-xs text-slate-500 font-medium">
              {language === 'km' ? 'កម្មវិធីទូរស័ព្ទ Flutter (Android)' : 'Flutter Mobile App (Android Simulation)'}
            </p>
            <h3 className="text-sm font-bold text-slate-800">
              {language === 'km' ? screenTitles[mobileScreen].km : screenTitles[mobileScreen].en}
            </h3>
          </div>
        </div>

        {/* Quick Screen Select Dropdown */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-slate-500 hidden sm:inline">
            {language === 'km' ? 'ជ្រើសរើសផ្ទាំង៖' : 'Jump Screen:'}
          </span>
          <select
            value={mobileScreen}
            onChange={(e) => setMobileScreen(e.target.value as MobileScreen)}
            className="text-xs bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#087F4F]"
          >
            <option value="splash">1. Splash Screen</option>
            <option value="home">2. Home Screen</option>
            <option value="location">3. Location Screen</option>
            <option value="contact">4. Contact Us Screen</option>
            <option value="faq">5. Q&A / FAQ Screen</option>
            <option value="register">7. Register Student Form</option>
            <option value="students">Student List & CRUD</option>
            <option value="detail">Student Details</option>
            <option value="attendance">Daily Attendance Tracker</option>
            <option value="news">News & Updates</option>
            <option value="events">Events Calendar</option>
            <option value="gallery">Activity Gallery</option>
            <option value="about">About Anjali House</option>
            <option value="profile">Profile & Settings</option>
            <option value="login">Login Screen</option>
          </select>

          <button
            onClick={() => setDeviceFrame(!deviceFrame)}
            className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 text-xs flex items-center gap-1"
            title="Toggle Device Frame"
          >
            <Maximize2 className="w-3.5 h-3.5" />
            <span className="hidden md:inline">{deviceFrame ? 'Frameless' : 'Frame'}</span>
          </button>
        </div>
      </div>

      {/* Mobile Device Mockup */}
      <div
        className={`relative transition-all duration-300 ${
          deviceFrame
            ? 'w-full max-w-[390px] h-[780px] bg-slate-900 rounded-[44px] p-3 shadow-2xl ring-12 ring-slate-800/90'
            : 'w-full max-w-[440px] h-[780px] bg-white rounded-2xl shadow-xl border border-slate-200'
        }`}
      >
        {/* Device Notch & Dynamic Island (when framed) */}
        {deviceFrame && (
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-36 h-5 bg-slate-900 rounded-b-2xl z-40 flex items-center justify-center">
            <div className="w-12 h-3.5 bg-black rounded-full flex items-center justify-end px-1.5">
              <div className="w-2 h-2 rounded-full bg-emerald-500/80"></div>
            </div>
          </div>
        )}

        {/* Screen Content Wrapper */}
        <div className="w-full h-full bg-[#F5F7F6] rounded-[34px] overflow-hidden flex flex-col relative select-none">
          {/* Status Bar */}
          {!isFullscreenSplash && (
            <div className="h-8 bg-transparent px-5 flex items-center justify-between text-xs font-semibold text-slate-700 z-30 pt-1">
              <span>9:41</span>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px]">5G</span>
                <div className="w-5 h-2.5 border border-slate-700 rounded-sm p-0.5 flex items-center">
                  <div className="w-full h-full bg-slate-700 rounded-2xs"></div>
                </div>
              </div>
            </div>
          )}

          {/* Active Screen Area with scroll */}
          <div className="flex-1 overflow-y-auto relative scroll-smooth">
            {renderActiveScreen()}
          </div>

          {/* Bottom Navigation Bar (Shown on main browsing screens) */}
          {!isFullscreenSplash && mobileScreen !== 'login' && (
            <div className="h-16 bg-white border-t border-slate-100 flex items-center justify-around px-2 z-30 shadow-xs">
              <button
                onClick={() => setMobileScreen('home')}
                className={`flex flex-col items-center justify-center gap-1 flex-1 py-1 ${
                  mobileScreen === 'home' ? 'text-[#087F4F] font-bold' : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                <Home className="w-5 h-5" />
                <span className="text-[10px]">{language === 'km' ? 'ទំព័រដើម' : 'Home'}</span>
              </button>

              <button
                onClick={() => setMobileScreen('news')}
                className={`flex flex-col items-center justify-center gap-1 flex-1 py-1 ${
                  mobileScreen === 'news' ? 'text-[#087F4F] font-bold' : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                <Newspaper className="w-5 h-5" />
                <span className="text-[10px]">{language === 'km' ? 'ព័ត៌មាន' : 'News'}</span>
              </button>

              <button
                onClick={() => setMobileScreen('events')}
                className={`flex flex-col items-center justify-center gap-1 flex-1 py-1 ${
                  mobileScreen === 'events' ? 'text-[#087F4F] font-bold' : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                <Calendar className="w-5 h-5" />
                <span className="text-[10px]">{language === 'km' ? 'ព្រឹត្តិការណ៍' : 'Events'}</span>
              </button>

              <button
                onClick={() => setMobileScreen('profile')}
                className={`flex flex-col items-center justify-center gap-1 flex-1 py-1 ${
                  mobileScreen === 'profile' ? 'text-[#087F4F] font-bold' : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                <User className="w-5 h-5" />
                <span className="text-[10px]">{language === 'km' ? 'គណនី' : 'Profile'}</span>
              </button>

              <button
                onClick={() => setMobileScreen('about')}
                className={`flex flex-col items-center justify-center gap-1 flex-1 py-1 ${
                  mobileScreen === 'about' ? 'text-[#087F4F] font-bold' : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                <Menu className="w-5 h-5" />
                <span className="text-[10px]">{language === 'km' ? 'ផ្សេងៗ' : 'More'}</span>
              </button>
            </div>
          )}

          {/* Android Home Indicator bar */}
          <div className="h-4 bg-white flex items-center justify-center pb-1">
            <div className="w-32 h-1 bg-slate-300 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
