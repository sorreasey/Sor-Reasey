import React from 'react';
import { useApp, ViewMode } from '../../context/AppContext';
import { Smartphone, LayoutDashboard, Terminal, Database, Code2, BookOpen, Globe, RotateCcw } from 'lucide-react';

export const Header: React.FC = () => {
  const { viewMode, setViewMode, language, setLanguage, currentUser, resetToDefaults } = useApp();

  const navItems: { mode: ViewMode; labelEn: string; labelKm: string; icon: React.ReactNode; badge?: string }[] = [
    {
      mode: 'mobile',
      labelEn: 'Flutter Mobile App',
      labelKm: 'កម្មវិធីទូរស័ព្ទ Flutter',
      icon: <Smartphone className="w-4 h-4" />,
      badge: '16 Screens'
    },
    {
      mode: 'admin',
      labelEn: 'Admin Web Dashboard',
      labelKm: 'ផ្ទាំងគ្រប់គ្រងរដ្ឋបាល Web',
      icon: <LayoutDashboard className="w-4 h-4" />,
      badge: 'Live'
    },
    {
      mode: 'api',
      labelEn: 'ASP.NET Core API',
      labelKm: 'សេវាកម្ម API Backend',
      icon: <Terminal className="w-4 h-4" />
    },
    {
      mode: 'code',
      labelEn: 'Complete Source Code',
      labelKm: 'កូដគម្រោងពេញលេញ',
      icon: <Code2 className="w-4 h-4" />,
      badge: 'All Files'
    },
    {
      mode: 'docs',
      labelEn: 'Setup Guide (Docs)',
      labelKm: 'សៀវភៅណែនាំ (Docs)',
      icon: <BookOpen className="w-4 h-4" />
    }
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#07583D] text-white shadow-md border-b border-[#087F4F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Title */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center p-1.5 shadow-sm">
              <svg viewBox="0 0 100 100" className="w-full h-full text-[#087F4F] fill-current">
                {/* Stylized Roof / House */}
                <path d="M 50 12 L 15 42 L 25 42 L 25 85 L 75 85 L 75 42 L 85 42 Z" fill="none" stroke="#087F4F" strokeWidth="8" strokeLinejoin="round" />
                {/* 3 Children Stylized figures inside */}
                <circle cx="50" cy="46" r="6" />
                <path d="M 42 68 C 42 56, 58 56, 58 68 Z" />
                <circle cx="35" cy="52" r="5" />
                <path d="M 28 72 C 28 62, 42 62, 42 72 Z" />
                <circle cx="65" cy="52" r="5" />
                <path d="M 58 72 C 58 62, 72 62, 72 72 Z" />
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold tracking-wider text-base sm:text-lg uppercase">Anjali House</span>
                <span className="text-[11px] font-semibold bg-[#087F4F] px-2 py-0.5 rounded-full text-emerald-100 border border-emerald-500/40">
                  Siem Reap NGO
                </span>
              </div>
              <p className="text-xs text-emerald-200/90 font-light hidden sm:block">
                {language === 'km' ? 'ប្រព័ន្ធគ្រប់គ្រងព័ត៌មានសិស្ស (SIMS)' : 'Student Information Management System (SIMS)'}
              </p>
            </div>
          </div>

          {/* View Mode Switcher Pills */}
          <nav className="hidden md:flex items-center gap-1.5 bg-[#053d2b] p-1 rounded-xl border border-emerald-800/60">
            {navItems.map(item => {
              const active = viewMode === item.mode;
              return (
                <button
                  key={item.mode}
                  onClick={() => setViewMode(item.mode)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    active
                      ? 'bg-[#087F4F] text-white shadow-sm font-semibold'
                      : 'text-emerald-200/80 hover:text-white hover:bg-emerald-900/40'
                  }`}
                >
                  {item.icon}
                  <span>{language === 'km' ? item.labelKm : item.labelEn}</span>
                  {item.badge && (
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                      active ? 'bg-white text-[#07583D] font-bold' : 'bg-emerald-800/80 text-emerald-200'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Tools: Language Toggle + Reset + User Info */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Language Switch */}
            <div className="flex items-center bg-[#053d2b] rounded-lg p-0.5 border border-emerald-800/60">
              <button
                onClick={() => setLanguage('en')}
                className={`px-2 py-1 text-xs rounded font-medium transition-all ${
                  language === 'en' ? 'bg-[#087F4F] text-white font-bold' : 'text-emerald-300 hover:text-white'
                }`}
                title="Switch to English"
              >
                EN
              </button>
              <button
                onClick={() => setLanguage('km')}
                className={`px-2 py-1 text-xs rounded font-medium transition-all ${
                  language === 'km' ? 'bg-[#087F4F] text-white font-bold' : 'text-emerald-300 hover:text-white'
                }`}
                title="ប្តូរទៅជាភាសាខ្មែរ"
              >
                ខ្មែរ
              </button>
            </div>

            {/* Reset Demo Data */}
            <button
              onClick={() => {
                if (window.confirm(language === 'km' ? 'តើអ្នកចង់កំណត់ទិន្នន័យឡើងវិញមែនទេ?' : 'Reset to default sample data?')) {
                  resetToDefaults();
                }
              }}
              title={language === 'km' ? 'កំណត់ទិន្នន័យដើមឡើងវិញ' : 'Reset sample data'}
              className="p-1.5 text-emerald-300 hover:text-white hover:bg-emerald-800/50 rounded-lg transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            {/* Current User */}
            <div className="flex items-center gap-2 pl-2 border-l border-emerald-800">
              <img
                src={currentUser.avatar}
                alt={currentUser.fullName}
                className="w-8 h-8 rounded-full ring-2 ring-emerald-400 object-cover"
              />
              <div className="hidden lg:block text-left text-xs leading-tight">
                <p className="font-semibold">{currentUser.fullName}</p>
                <p className="text-[10px] text-emerald-300">{currentUser.role}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Submenu Bar */}
        <div className="md:hidden flex items-center justify-between overflow-x-auto py-2 gap-1 border-t border-emerald-800/60 text-xs">
          {navItems.map(item => (
            <button
              key={item.mode}
              onClick={() => setViewMode(item.mode)}
              className={`whitespace-nowrap px-2.5 py-1 rounded-md flex items-center gap-1 ${
                viewMode === item.mode ? 'bg-[#087F4F] text-white font-bold' : 'text-emerald-200'
              }`}
            >
              {item.icon}
              {language === 'km' ? item.labelKm : item.labelEn}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
};
