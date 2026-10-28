import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import {
  ChevronLeft,
  Calendar,
  CheckCircle2,
  XCircle,
  Clock,
  AlertCircle,
  Save,
  CheckCheck
} from 'lucide-react';
import { AttendanceStatus } from '../../../types';

export const AttendanceScreen: React.FC = () => {
  const { setMobileScreen, language, classes, students, attendance, recordAttendance, bulkRecordAttendance } = useApp();
  const [selectedClassId, setSelectedClassId] = useState<number>(classes[0]?.id || 1);
  const [selectedDate, setSelectedDate] = useState('2024-05-15');
  const [saveToast, setSaveToast] = useState(false);

  const classStudents = students.filter(s => s.classId === selectedClassId);

  const getStatusForStudent = (studentId: string): AttendanceStatus => {
    const record = attendance.find(a => a.studentId === studentId && a.date === selectedDate);
    return record?.status || 'Present';
  };

  const handleStatusChange = (studentId: string, status: AttendanceStatus) => {
    recordAttendance(studentId, status, selectedDate);
  };

  const handleMarkAllPresent = () => {
    bulkRecordAttendance(selectedClassId, 'Present', selectedDate);
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 2000);
  };

  const presentCount = classStudents.filter(s => getStatusForStudent(s.id) === 'Present').length;
  const lateCount = classStudents.filter(s => getStatusForStudent(s.id) === 'Late').length;
  const absentCount = classStudents.filter(s => getStatusForStudent(s.id) === 'Absent').length;
  const excusedCount = classStudents.filter(s => getStatusForStudent(s.id) === 'Excused').length;

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
          {language === 'km' ? 'កត់ត្រាវត្តមានសិស្ស' : 'Daily Attendance'}
        </h1>
        <button
          onClick={handleMarkAllPresent}
          className="text-xs font-bold text-[#087F4F] hover:bg-emerald-50 px-2 py-1 rounded-lg"
          title="Mark All Present"
        >
          {language === 'km' ? 'វត្តមានទាំងអស់' : 'All Present'}
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3.5">
        {/* Date and Class Selector Bar */}
        <div className="bg-white p-3 rounded-2xl border border-slate-100 shadow-2xs space-y-2.5">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-[10px] font-bold text-slate-400 block mb-1">
                {language === 'km' ? 'កាលបរិច្ឆេទ' : 'Date'}
              </label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full text-xs font-semibold px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#087F4F] focus:outline-none"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-400 block mb-1">
                {language === 'km' ? 'ជ្រើសរើសថ្នាក់' : 'Class'}
              </label>
              <select
                value={selectedClassId}
                onChange={(e) => setSelectedClassId(Number(e.target.value))}
                className="w-full text-xs font-semibold px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#087F4F] focus:outline-none truncate"
              >
                {classes.map(cls => (
                  <option key={cls.id} value={cls.id}>
                    {cls.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-4 gap-1.5 pt-1 text-center">
            <div className="bg-emerald-50 p-1.5 rounded-xl border border-emerald-100">
              <span className="text-[9px] font-bold text-emerald-800 uppercase block">Present</span>
              <span className="text-xs font-black text-emerald-700">{presentCount}</span>
            </div>
            <div className="bg-amber-50 p-1.5 rounded-xl border border-amber-100">
              <span className="text-[9px] font-bold text-amber-800 uppercase block">Late</span>
              <span className="text-xs font-black text-amber-700">{lateCount}</span>
            </div>
            <div className="bg-rose-50 p-1.5 rounded-xl border border-rose-100">
              <span className="text-[9px] font-bold text-rose-800 uppercase block">Absent</span>
              <span className="text-xs font-black text-rose-700">{absentCount}</span>
            </div>
            <div className="bg-blue-50 p-1.5 rounded-xl border border-blue-100">
              <span className="text-[9px] font-bold text-blue-800 uppercase block">Excused</span>
              <span className="text-xs font-black text-blue-700">{excusedCount}</span>
            </div>
          </div>
        </div>

        {saveToast && (
          <div className="p-2.5 bg-emerald-600 text-white text-xs font-semibold rounded-xl text-center shadow-md animate-fade-in flex items-center justify-center gap-1.5">
            <CheckCheck className="w-4 h-4" />
            <span>{language === 'km' ? 'បានកត់ត្រាវត្តមានទាំងអស់រួចរាល់!' : 'All marked present successfully!'}</span>
          </div>
        )}

        {/* Student Attendance List */}
        <div className="space-y-2">
          {classStudents.length === 0 ? (
            <div className="bg-white rounded-2xl p-6 text-center text-slate-400 text-xs">
              <p>{language === 'km' ? 'មិនមានសិស្សក្នុងថ្នាក់នេះទេ' : 'No students found in this class.'}</p>
            </div>
          ) : (
            classStudents.map((student) => {
              const currentStatus = getStatusForStudent(student.id);
              return (
                <div
                  key={student.id}
                  className="bg-white p-3 rounded-2xl border border-slate-100 shadow-2xs flex items-center justify-between gap-2"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <img
                      src={student.photoUrl || ''}
                      alt={student.fullName}
                      className="w-10 h-10 rounded-full object-cover shrink-0 ring-1 ring-slate-200"
                    />
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[9px] font-mono font-bold text-[#087F4F]">
                          {student.id}
                        </span>
                        <h4 className="text-xs font-bold text-slate-900 truncate">
                          {student.fullName}
                        </h4>
                      </div>
                      <p className="text-[10px] text-slate-500 truncate">
                        {student.fullNameKhmer}
                      </p>
                    </div>
                  </div>

                  {/* 4 Status Toggle Buttons */}
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={() => handleStatusChange(student.id, 'Present')}
                      className={`w-7 h-7 rounded-lg text-[10px] font-black transition-all ${
                        currentStatus === 'Present'
                          ? 'bg-[#087F4F] text-white shadow-xs scale-105'
                          : 'bg-slate-100 text-slate-500 hover:bg-emerald-50'
                      }`}
                      title="Present (វត្តមាន)"
                    >
                      P
                    </button>
                    <button
                      onClick={() => handleStatusChange(student.id, 'Late')}
                      className={`w-7 h-7 rounded-lg text-[10px] font-black transition-all ${
                        currentStatus === 'Late'
                          ? 'bg-amber-500 text-white shadow-xs scale-105'
                          : 'bg-slate-100 text-slate-500 hover:bg-amber-50'
                      }`}
                      title="Late (យឺត)"
                    >
                      L
                    </button>
                    <button
                      onClick={() => handleStatusChange(student.id, 'Absent')}
                      className={`w-7 h-7 rounded-lg text-[10px] font-black transition-all ${
                        currentStatus === 'Absent'
                          ? 'bg-rose-500 text-white shadow-xs scale-105'
                          : 'bg-slate-100 text-slate-500 hover:bg-rose-50'
                      }`}
                      title="Absent (អវត្តមាន)"
                    >
                      A
                    </button>
                    <button
                      onClick={() => handleStatusChange(student.id, 'Excused')}
                      className={`w-7 h-7 rounded-lg text-[10px] font-black transition-all ${
                        currentStatus === 'Excused'
                          ? 'bg-blue-500 text-white shadow-xs scale-105'
                          : 'bg-slate-100 text-slate-500 hover:bg-blue-50'
                      }`}
                      title="Excused (មានការអនុញ្ញាត)"
                    >
                      E
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
