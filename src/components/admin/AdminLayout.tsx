import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  LayoutDashboard,
  Users,
  ClipboardCheck,
  Newspaper,
  Calendar,
  Image as ImageIcon,
  HelpCircle,
  ShieldAlert,
  BarChart3,
  Settings,
  Bell,
  Search,
  Plus,
  LogOut,
  Menu,
  X
} from 'lucide-react';
import { AdminDashboardOverview } from './AdminDashboardOverview';
import { AdminStudentsView } from './AdminStudentsView';
import { AdminAttendanceView } from './AdminAttendanceView';
import { AdminNewsEventsView } from './AdminNewsEventsView';
import { AdminReportsView } from './AdminReportsView';
import { Student } from '../../types';

export const AdminLayout: React.FC = () => {
  const { currentUser, language, setMobileScreen, setViewMode } = useApp();
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedStudentForDetail, setSelectedStudentForDetail] = useState<Student | null>(null);

  const menuItems = [
    { id: 'dashboard', labelEn: 'Dashboard', labelKm: 'ផ្ទាំងដើម', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'students', labelEn: 'Students', labelKm: 'សិស្ស', icon: <Users className="w-4 h-4" /> },
    { id: 'attendance', labelEn: 'Attendance', labelKm: 'វត្តមាន', icon: <ClipboardCheck className="w-4 h-4" /> },
    { id: 'news', labelEn: 'News', labelKm: 'ព័ត៌មាន', icon: <Newspaper className="w-4 h-4" /> },
    { id: 'events', labelEn: 'Events', labelKm: 'ព្រឹត្តិការណ៍', icon: <Calendar className="w-4 h-4" /> },
    { id: 'gallery', labelEn: 'Gallery', labelKm: 'រូបភាព', icon: <ImageIcon className="w-4 h-4" /> },
    { id: 'qa', labelEn: 'Q&A', labelKm: 'សំណួរ-ចម្លើយ', icon: <HelpCircle className="w-4 h-4" /> },
    { id: 'users', labelEn: 'Users', labelKm: 'អ្នកប្រើប្រាស់', icon: <ShieldAlert className="w-4 h-4" /> },
    { id: 'reports', labelEn: 'Reports', labelKm: 'របាយការណ៍', icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'settings', labelEn: 'Settings', labelKm: 'ការកំណត់', icon: <Settings className="w-4 h-4" /> }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <AdminDashboardOverview
            onNavigateTab={(tab) => setActiveTab(tab)}
            onOpenAddStudent={() => setActiveTab('students')}
            onViewStudent={(s) => {
              setSelectedStudentForDetail(s);
              setActiveTab('students');
            }}
          />
        );
      case 'students':
        return <AdminStudentsView />;
      case 'attendance':
        return <AdminAttendanceView />;
      case 'news':
      case 'events':
      case 'gallery':
        return <AdminNewsEventsView />;
      case 'reports':
        return <AdminReportsView />;
      case 'qa':
      case 'users':
      case 'settings':
        return (
          <div className="bg-white rounded-2xl p-8 border border-slate-200/80 shadow-xs text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#087F4F] mx-auto flex items-center justify-center">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-800">
              {menuItems.find(m => m.id === activeTab)?.labelEn} Module
            </h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Administrator privileges active for user <span className="font-semibold text-slate-700">{currentUser.fullName}</span>. All role-based security policies enforced via ASP.NET Core JWT backend.
            </p>
          </div>
        );
      default:
        return <AdminDashboardOverview onNavigateTab={setActiveTab} onOpenAddStudent={() => {}} onViewStudent={() => {}} />;
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex bg-[#F5F7F6]">
      {/* Dark Sidebar matching Screen 6 in reference */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-[#1E293B] text-slate-300 flex flex-col justify-between transition-transform duration-300 lg:static lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-4 space-y-6">
          {/* Logo & NGO Title in Sidebar */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#087F4F] flex items-center justify-center text-white font-bold p-1">
                <svg viewBox="0 0 100 100" className="w-full h-full fill-current">
                  <path d="M 50 15 L 20 42 L 28 42 L 28 85 L 72 85 L 72 42 L 80 42 Z" fill="none" stroke="white" strokeWidth="8" strokeLinejoin="round" />
                  <circle cx="50" cy="50" r="8" />
                  <circle cx="36" cy="55" r="6" />
                  <circle cx="64" cy="55" r="6" />
                </svg>
              </div>
              <div>
                <span className="font-bold text-sm tracking-wider text-white uppercase block">
                  ANJALI HOUSE
                </span>
                <span className="text-[10px] text-emerald-400 font-semibold block">
                  Admin SIMS Portal
                </span>
              </div>
            </div>

            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Menu List */}
          <nav className="space-y-1">
            {menuItems.map((item) => {
              const active = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    active
                      ? 'bg-[#087F4F] text-white shadow-sm font-bold'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                  }`}
                >
                  {item.icon}
                  <span>{language === 'km' ? item.labelKm : item.labelEn}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer with NGO location */}
        <div className="p-4 border-t border-slate-800 text-[11px] text-slate-500 space-y-1">
          <p className="font-semibold text-slate-400">Siem Reap, Cambodia</p>
          <p>NGO Non-Profit SIMS</p>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Navbar */}
        <header className="bg-white border-b border-slate-200/80 px-4 sm:px-6 py-3.5 flex items-center justify-between sticky top-16 z-30 shadow-2xs">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-xl"
            >
              <Menu className="w-5 h-5" />
            </button>
            <h1 className="text-lg font-extrabold text-slate-900 capitalize">
              {menuItems.find(m => m.id === activeTab)?.labelEn}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab('students')}
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 bg-[#087F4F] hover:bg-[#07583D] text-white text-xs font-bold rounded-xl shadow-xs transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{language === 'km' ? 'ចុះឈ្មោះសិស្ស' : 'New Registration'}</span>
            </button>

            <div className="flex items-center gap-2 pl-3 border-l border-slate-200">
              <img
                src={currentUser.avatar}
                alt={currentUser.fullName}
                className="w-8 h-8 rounded-full object-cover ring-2 ring-emerald-500/20"
              />
              <div className="hidden md:block text-left text-xs">
                <p className="font-bold text-slate-800">{currentUser.fullName}</p>
                <p className="text-[10px] text-slate-400">{currentUser.role}</p>
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic View Body */}
        <main className="flex-1 p-4 sm:p-6 max-w-7xl w-full mx-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};
