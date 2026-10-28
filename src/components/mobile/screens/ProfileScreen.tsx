import React from 'react';
import { useApp } from '../../../context/AppContext';
import { ChevronLeft, Globe, Shield, LogOut, Bell, FileText, ChevronRight } from 'lucide-react';

export const ProfileScreen: React.FC = () => {
  const { setMobileScreen, language, setLanguage, currentUser } = useApp();

  return (
    <div className="flex flex-col h-full bg-[#F5F7F6]">
      {/* App Bar */}
      <div className="bg-white px-4 py-3 border-b border-slate-100 flex items-center justify-between sticky top-0 z-20">
        <button
          onClick={() => setMobileScreen('home')}
          className="p-1 rounded-full text-slate-700 hover:bg-slate-100 transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="text-base font-bold text-slate-800">
          {language === 'km' ? 'គណនីអ្នកប្រើប្រាស់' : 'User Profile'}
        </h1>
        <div className="w-6"></div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Profile Card */}
        <div className="bg-white rounded-3xl p-4 shadow-xs border border-slate-100 flex items-center gap-3.5">
          <img
            src={currentUser.avatar}
            alt={currentUser.fullName}
            className="w-16 h-16 rounded-full object-cover ring-2 ring-[#087F4F]"
          />
          <div className="min-w-0">
            <h2 className="text-base font-bold text-slate-900 truncate">
              {currentUser.fullName}
            </h2>
            <p className="text-xs text-slate-500">{currentUser.email}</p>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-[#07583D] inline-block mt-1">
              {currentUser.role} Account
            </span>
          </div>
        </div>

        {/* Settings Group */}
        <div className="bg-white rounded-2xl shadow-xs border border-slate-100 divide-y divide-slate-100 overflow-hidden text-xs">
          {/* Language Switch */}
          <div className="p-3.5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <Globe className="w-4 h-4" />
              </div>
              <span className="font-semibold text-slate-800">
                {language === 'km' ? 'ភាសា (Language)' : 'App Language'}
              </span>
            </div>
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg">
              <button
                onClick={() => setLanguage('en')}
                className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                  language === 'en' ? 'bg-[#087F4F] text-white shadow-xs' : 'text-slate-600'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage('km')}
                className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                  language === 'km' ? 'bg-[#087F4F] text-white shadow-xs' : 'text-slate-600'
                }`}
              >
                ខ្មែរ
              </button>
            </div>
          </div>

          {/* Notifications */}
          <div className="p-3.5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <Bell className="w-4 h-4" />
              </div>
              <span className="font-semibold text-slate-800">
                {language === 'km' ? 'ការជូនដំណឹង' : 'Notifications'}
              </span>
            </div>
            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
              Enabled
            </span>
          </div>

          {/* Security */}
          <div className="p-3.5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                <Shield className="w-4 h-4" />
              </div>
              <span className="font-semibold text-slate-800">
                {language === 'km' ? 'សុវត្ថិភាពគណនី' : 'Security & Password'}
              </span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </div>

          {/* Privacy Policy */}
          <div className="p-3.5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-slate-50 text-slate-600 flex items-center justify-center">
                <FileText className="w-4 h-4" />
              </div>
              <span className="font-semibold text-slate-800">
                {language === 'km' ? 'គោលការណ៍ឯកជនភាពកុមារ' : 'Child Protection Policy'}
              </span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </div>
        </div>

        {/* Logout Button */}
        <button
          onClick={() => setMobileScreen('login')}
          className="w-full py-3 px-4 bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-600 font-bold rounded-2xl transition-colors flex items-center justify-center gap-2 text-xs"
        >
          <LogOut className="w-4 h-4" />
          <span>{language === 'km' ? 'ចាកចេញពីគណនី (Logout)' : 'Log Out'}</span>
        </button>

        <p className="text-[10px] text-center text-slate-400 pt-2">
          Anjali House SIMS v1.0.0 • Siem Reap, Cambodia
        </p>
      </div>
    </div>
  );
};
