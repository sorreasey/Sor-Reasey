import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Users,
  UserPlus,
  Calendar,
  Newspaper,
  ChevronRight,
  Plus,
  ArrowUpRight,
  TrendingUp,
  Download,
  Eye
} from 'lucide-react';
import { Student } from '../../types';

interface AdminDashboardOverviewProps {
  onNavigateTab: (tab: string) => void;
  onOpenAddStudent: () => void;
  onViewStudent: (student: Student) => void;
}

export const AdminDashboardOverview: React.FC<AdminDashboardOverviewProps> = ({
  onNavigateTab,
  onOpenAddStudent,
  onViewStudent
}) => {
  const { stats, students, language } = useApp();

  const recentStudents = students.slice(0, 5);

  return (
    <div className="space-y-6">
      {/* 4 Summary Statistic Cards matching Screen 6 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Students */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex items-center justify-between hover:shadow-md transition-shadow">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              {language === 'km' ? 'សិស្សសរុប' : 'Total Students'}
            </p>
            <h3 className="text-3xl font-extrabold text-slate-900 mt-1">
              {stats.totalStudents}
            </h3>
            <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-600 mt-2">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>+12% from last term</span>
            </div>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#087F4F] flex items-center justify-center">
            <Users className="w-6 h-6" />
          </div>
        </div>

        {/* New Registrations */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex items-center justify-between hover:shadow-md transition-shadow">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              {language === 'km' ? 'ចុះឈ្មោះថ្មី' : 'New Registrations'}
            </p>
            <h3 className="text-3xl font-extrabold text-slate-900 mt-1">
              {stats.newRegistrations}
            </h3>
            <div className="flex items-center gap-1 text-[11px] font-semibold text-blue-600 mt-2">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
              <span>This semester</span>
            </div>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <UserPlus className="w-6 h-6" />
          </div>
        </div>

        {/* Events */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex items-center justify-between hover:shadow-md transition-shadow">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              {language === 'km' ? 'ព្រឹត្តិការណ៍' : 'Events'}
            </p>
            <h3 className="text-3xl font-extrabold text-slate-900 mt-1">
              {stats.upcomingEvents}
            </h3>
            <p className="text-[11px] text-slate-400 mt-2">Scheduled in Siem Reap</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center">
            <Calendar className="w-6 h-6" />
          </div>
        </div>

        {/* News */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex items-center justify-between hover:shadow-md transition-shadow">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              {language === 'km' ? 'ព័ត៌មាន' : 'News'}
            </p>
            <h3 className="text-3xl font-extrabold text-slate-900 mt-1">
              {stats.publishedNews}
            </h3>
            <p className="text-[11px] text-slate-400 mt-2">Published updates</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <Newspaper className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Main Two-Column Layout matching Screen 6 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2/3): Recent Registrations Table */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden flex flex-col justify-between">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                {language === 'km' ? 'ការចុះឈ្មោះថ្មីៗ' : 'Recent Registrations'}
              </h2>
              <p className="text-xs text-slate-500">
                {language === 'km' ? 'សិស្សដែលបានចុះឈ្មោះចុងក្រោយបំផុត' : 'Latest enrolled students at Anjali House'}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={onOpenAddStudent}
                className="px-3 py-1.5 bg-[#087F4F] hover:bg-[#07583D] text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>{language === 'km' ? 'ចុះឈ្មោះសិស្សថ្មី' : 'Add Student'}</span>
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50/75 border-b border-slate-100 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="py-3 px-4">ID</th>
                  <th className="py-3 px-4">Name</th>
                  <th className="py-3 px-4">Class</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {recentStudents.map((s) => (
                  <tr key={s.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-slate-700">
                      {s.id}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={s.photoUrl || ''}
                          alt={s.fullName}
                          className="w-8 h-8 rounded-full object-cover ring-1 ring-slate-200"
                        />
                        <div>
                          <p className="font-bold text-slate-900">{s.fullName}</p>
                          <p className="text-[10px] text-slate-400">{s.fullNameKhmer}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-slate-600">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium">
                        {s.className.split(' Level')[0]}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-500 whitespace-nowrap">
                      {s.registeredDate}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-[#07583D] border border-emerald-200">
                        {s.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => onViewStudent(s)}
                        className="p-1.5 text-slate-400 hover:text-[#087F4F] hover:bg-emerald-50 rounded-lg transition-colors"
                        title="View details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-4 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between text-xs">
            <span className="text-slate-500">
              Showing 5 of {students.length} students
            </span>
            <button
              onClick={() => onNavigateTab('students')}
              className="text-[#087F4F] font-bold hover:underline flex items-center gap-1"
            >
              <span>{language === 'km' ? 'មើលបញ្ជីពេញលេញ' : 'View Full Student Table'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right Column (1/3): Students Overview Donut Chart matching Screen 6 */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 flex flex-col justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              {language === 'km' ? 'ទិដ្ឋភាពទូទៅនៃសិស្ស' : 'Students Overview'}
            </h2>
            <p className="text-xs text-slate-500">
              {language === 'km' ? 'ការបែងចែកសិស្សតាមថ្នាក់ជំនាញ' : 'Class enrollment breakdown'}
            </p>
          </div>

          {/* SVG Donut Chart */}
          <div className="py-6 flex flex-col items-center justify-center relative">
            <div className="relative w-44 h-44">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                {/* Background circle */}
                <circle cx="50" cy="50" r="38" fill="none" stroke="#F1F5F9" strokeWidth="16" />

                {/* English Class: 120 / 320 = 37.5% -> stroke-dasharray="89.5 238.7" stroke-dashoffset="0" */}
                <circle
                  cx="50"
                  cy="50"
                  r="38"
                  fill="none"
                  stroke="#087F4F"
                  strokeWidth="16"
                  strokeDasharray="89.5 238.7"
                  strokeDashoffset="0"
                />

                {/* Computer Class: 80 / 320 = 25% -> stroke-dasharray="59.7 238.7" stroke-dashoffset="-89.5" */}
                <circle
                  cx="50"
                  cy="50"
                  r="38"
                  fill="none"
                  stroke="#3B82F6"
                  strokeWidth="16"
                  strokeDasharray="59.7 238.7"
                  strokeDashoffset="-89.5"
                />

                {/* Art Class: 60 / 320 = 18.75% -> stroke-dasharray="44.7 238.7" stroke-dashoffset="-149.2" */}
                <circle
                  cx="50"
                  cy="50"
                  r="38"
                  fill="none"
                  stroke="#F59E0B"
                  strokeWidth="16"
                  strokeDasharray="44.7 238.7"
                  strokeDashoffset="-149.2"
                />

                {/* Other: 60 / 320 = 18.75% -> stroke-dasharray="44.7 238.7" stroke-dashoffset="-193.9" */}
                <circle
                  cx="50"
                  cy="50"
                  r="38"
                  fill="none"
                  stroke="#8B5CF6"
                  strokeWidth="16"
                  strokeDasharray="44.7 238.7"
                  strokeDashoffset="-193.9"
                />
              </svg>

              {/* Center Total matching Screen 6 */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-2xl font-black text-slate-900 tracking-tight">320</span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total</span>
              </div>
            </div>
          </div>

          {/* Legend matching Screen 6 */}
          <div className="space-y-2 border-t border-slate-100 pt-4 text-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#087F4F]"></span>
                <span className="text-slate-700 font-medium">English Class</span>
              </div>
              <span className="font-bold text-slate-900">120</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#3B82F6]"></span>
                <span className="text-slate-700 font-medium">Computer Class</span>
              </div>
              <span className="font-bold text-slate-900">80</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#F59E0B]"></span>
                <span className="text-slate-700 font-medium">Art Class</span>
              </div>
              <span className="font-bold text-slate-900">60</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#8B5CF6]"></span>
                <span className="text-slate-700 font-medium">Other (Khmer & Sports)</span>
              </div>
              <span className="font-bold text-slate-900">60</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
