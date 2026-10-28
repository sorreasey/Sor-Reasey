import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import {
  ChevronLeft,
  Calendar,
  Phone,
  MapPin,
  BookOpen,
  Award,
  QrCode,
  Share2,
  Printer,
  CheckCircle,
  Clock,
  XCircle,
  Edit2,
  UserCheck
} from 'lucide-react';

export const StudentDetailScreen: React.FC = () => {
  const { selectedStudent, setMobileScreen, language, attendance } = useApp();
  const [showIdCardModal, setShowIdCardModal] = useState(false);

  if (!selectedStudent) {
    return (
      <div className="p-8 text-center text-slate-500">
        <p>No student selected.</p>
        <button
          onClick={() => setMobileScreen('students')}
          className="mt-3 px-4 py-2 bg-[#087F4F] text-white text-xs rounded-xl"
        >
          Back to Students
        </button>
      </div>
    );
  }

  const studentAttendance = attendance.filter(a => a.studentId === selectedStudent.id);

  return (
    <div className="flex flex-col h-full bg-[#F5F7F6]">
      {/* App Bar */}
      <div className="bg-white px-4 py-3 border-b border-slate-100 flex items-center justify-between sticky top-0 z-20">
        <button
          onClick={() => setMobileScreen('students')}
          className="p-1 rounded-full text-slate-700 hover:bg-slate-100 transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="text-base font-bold text-slate-800">
          {language === 'km' ? 'ព័ត៌មានលម្អិតសិស្ស' : 'Student Profile'}
        </h1>
        <button
          onClick={() => setShowIdCardModal(true)}
          className="p-1.5 text-[#087F4F] hover:bg-emerald-50 rounded-lg transition-colors"
          title="Print / View ID Badge"
        >
          <QrCode className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Header Hero Card */}
        <div className="bg-white rounded-3xl p-4 shadow-xs border border-slate-100 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-r from-[#07583D] to-[#087F4F]"></div>

          <div className="relative pt-6 flex flex-col items-center">
            <img
              src={selectedStudent.photoUrl || 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=400'}
              alt={selectedStudent.fullName}
              className="w-20 h-20 rounded-full object-cover ring-4 ring-white shadow-md"
            />
            <span className="mt-2 text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-[#087F4F] border border-emerald-200">
              {selectedStudent.id}
            </span>
            <h2 className="text-base font-bold text-slate-900 mt-1">
              {selectedStudent.fullName}
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              {selectedStudent.fullNameKhmer}
            </p>

            <div className="flex items-center gap-2 mt-2">
              <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-emerald-100 text-[#07583D]">
                {selectedStudent.className}
              </span>
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700">
                {selectedStudent.status}
              </span>
            </div>
          </div>
        </div>

        {/* Essential Information Grid */}
        <div className="bg-white rounded-2xl p-4 shadow-xs border border-slate-100 space-y-3">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider text-slate-400">
            {language === 'km' ? 'ព័ត៌មានទូទៅ' : 'Personal Details'}
          </h3>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-2.5 bg-slate-50 rounded-xl">
              <span className="text-[10px] text-slate-400 block">{language === 'km' ? 'ថ្ងៃខែឆ្នាំកំណើត' : 'Date of Birth'}</span>
              <span className="font-semibold text-slate-800">{selectedStudent.dateOfBirth}</span>
            </div>
            <div className="p-2.5 bg-slate-50 rounded-xl">
              <span className="text-[10px] text-slate-400 block">{language === 'km' ? 'ភេទ' : 'Gender'}</span>
              <span className="font-semibold text-slate-800">{selectedStudent.gender}</span>
            </div>
            <div className="p-2.5 bg-slate-50 rounded-xl">
              <span className="text-[10px] text-slate-400 block">{language === 'km' ? 'កាលបរិច្ឆេទចុះឈ្មោះ' : 'Enrolled Date'}</span>
              <span className="font-semibold text-slate-800">{selectedStudent.registeredDate}</span>
            </div>
            <div className="p-2.5 bg-slate-50 rounded-xl">
              <span className="text-[10px] text-slate-400 block">{language === 'km' ? 'អាហារូបត្ថម្ភ' : 'Nutrition'}</span>
              <span className="font-semibold text-[#087F4F]">Free Daily Lunch</span>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100 space-y-2">
            <div className="flex items-center gap-2.5 text-xs text-slate-700">
              <UserCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <div>
                <span className="text-[10px] text-slate-400 block">{language === 'km' ? 'អាណាព្យាបាល' : 'Guardian Name'}</span>
                <span className="font-medium">{selectedStudent.guardianName} ({selectedStudent.guardianNameKhmer})</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5 text-xs text-slate-700">
              <Phone className="w-4 h-4 text-emerald-600 shrink-0" />
              <div>
                <span className="text-[10px] text-slate-400 block">{language === 'km' ? 'លេខទូរស័ព្ទ' : 'Phone'}</span>
                <a href={`tel:${selectedStudent.guardianPhone}`} className="font-bold text-emerald-700 underline">
                  {selectedStudent.guardianPhone}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-2.5 text-xs text-slate-700">
              <MapPin className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
              <div>
                <span className="text-[10px] text-slate-400 block">{language === 'km' ? 'អាសយដ្ឋាន' : 'Address'}</span>
                <span className="font-medium">{selectedStudent.address}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Attendance Summary */}
        <div className="bg-white rounded-2xl p-4 shadow-xs border border-slate-100 space-y-2.5">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-900">
              {language === 'km' ? 'ប្រវត្តិនៃវត្តមាន' : 'Attendance Log'}
            </h3>
            <span className="text-[11px] font-bold text-emerald-700">
              96% Attendance Rate
            </span>
          </div>

          <div className="space-y-1.5 text-xs">
            {studentAttendance.length === 0 ? (
              <p className="text-slate-400 text-xs py-2">{language === 'km' ? 'មិនទាន់មានទិន្នន័យវត្តមាន' : 'No attendance recorded yet.'}</p>
            ) : (
              studentAttendance.map((rec) => (
                <div key={rec.id} className="flex items-center justify-between p-2 rounded-xl bg-slate-50">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span className="font-medium text-slate-700">{rec.date}</span>
                  </div>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                      rec.status === 'Present'
                        ? 'bg-emerald-100 text-emerald-800'
                        : rec.status === 'Late'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-rose-100 text-rose-800'
                    }`}
                  >
                    {rec.status}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Action Button: Open ID Card */}
        <button
          onClick={() => setShowIdCardModal(true)}
          className="w-full py-3 px-4 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-[#07583D] font-bold rounded-2xl shadow-xs transition-colors flex items-center justify-center gap-2 text-xs"
        >
          <QrCode className="w-4 h-4 text-[#087F4F]" />
          <span>{language === 'km' ? 'មើលប័ណ្ណសម្គាល់ខ្លួនសិស្ស (ID Card)' : 'View & Print Student ID Card'}</span>
        </button>
      </div>

      {/* Student ID Card Modal */}
      {showIdCardModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-xs p-5 shadow-2xl relative animate-in fade-in zoom-in-95">
            {/* Card Preview */}
            <div className="border-2 border-[#087F4F] rounded-2xl p-4 bg-gradient-to-b from-emerald-50/50 to-white relative text-center">
              <div className="flex items-center justify-between pb-2 border-b border-emerald-200">
                <div className="text-left">
                  <p className="text-[10px] font-black uppercase text-[#07583D] tracking-wider">ANJALI HOUSE</p>
                  <p className="text-[8px] text-slate-500">Student Identity Card</p>
                </div>
                <div className="w-6 h-6 rounded-md bg-[#087F4F] flex items-center justify-center text-white text-[10px] font-bold">
                  AH
                </div>
              </div>

              <div className="py-3 flex flex-col items-center">
                <img
                  src={selectedStudent.photoUrl || ''}
                  alt={selectedStudent.fullName}
                  className="w-20 h-20 rounded-xl object-cover ring-2 ring-[#087F4F] shadow-sm mb-2"
                />
                <h4 className="text-sm font-black text-slate-900">{selectedStudent.fullName}</h4>
                <p className="text-xs font-semibold text-[#087F4F]">{selectedStudent.fullNameKhmer}</p>
                <p className="text-[11px] font-mono font-bold bg-emerald-100 text-[#07583D] px-2 py-0.5 rounded-md mt-1">
                  ID: {selectedStudent.id}
                </p>
                <p className="text-[10px] text-slate-600 mt-1">{selectedStudent.className}</p>
              </div>

              <div className="pt-2 border-t border-dashed border-emerald-200 flex items-center justify-between text-[9px] text-slate-500">
                <span>DOB: {selectedStudent.dateOfBirth}</span>
                <span>Siem Reap, Cambodia</span>
              </div>
            </div>

            <div className="mt-4 flex gap-2">
              <button
                onClick={() => {
                  window.print();
                }}
                className="flex-1 py-2.5 bg-[#087F4F] text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>{language === 'km' ? 'ព្រីនប័ណ្ណ' : 'Print Card'}</span>
              </button>
              <button
                onClick={() => setShowIdCardModal(false)}
                className="px-4 py-2.5 bg-slate-100 text-slate-700 text-xs font-semibold rounded-xl"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
