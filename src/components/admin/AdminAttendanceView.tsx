import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Calendar,
  Filter,
  CheckCircle2,
  XCircle,
  Clock,
  AlertCircle,
  Download,
  CheckCheck
} from 'lucide-react';
import { AttendanceStatus } from '../../types';

export const AdminAttendanceView: React.FC = () => {
  const { classes, students, attendance, recordAttendance, bulkRecordAttendance, language } = useApp();
  const [selectedClassId, setSelectedClassId] = useState<number>(classes[0]?.id || 1);
  const [selectedDate, setSelectedDate] = useState('2024-05-15');
  const [saveSuccess, setSaveSuccess] = useState(false);

  const classStudents = students.filter(s => s.classId === selectedClassId);

  const getStatus = (studentId: string): AttendanceStatus => {
    const rec = attendance.find(a => a.studentId === studentId && a.date === selectedDate);
    return rec?.status || 'Present';
  };

  const handleStatusChange = (studentId: string, status: AttendanceStatus) => {
    recordAttendance(studentId, status, selectedDate);
  };

  const handleBulk = (status: AttendanceStatus) => {
    bulkRecordAttendance(selectedClassId, status, selectedDate);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  const presentCount = classStudents.filter(s => getStatus(s.id) === 'Present').length;
  const lateCount = classStudents.filter(s => getStatus(s.id) === 'Late').length;
  const absentCount = classStudents.filter(s => getStatus(s.id) === 'Absent').length;
  const excusedCount = classStudents.filter(s => getStatus(s.id) === 'Excused').length;
  const attendancePercentage = classStudents.length > 0 ? Math.round((presentCount / classStudents.length) * 100) : 100;

  const exportAttendanceReport = () => {
    const headers = ['Student ID,Student Name,Class,Date,Status'];
    const rows = classStudents.map(s =>
      `"${s.id}","${s.fullName}","${s.className}","${selectedDate}","${getStatus(s.id)}"`
    );
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers, ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Anjali_Attendance_${selectedDate}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-5">
      {/* Top Filter and Stats Bar */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              {language === 'km' ? 'តារាងកត់ត្រាវត្តមានសិស្សតាមថ្នាក់' : 'Class Daily Attendance Register'}
            </h2>
            <p className="text-xs text-slate-500">
              {language === 'km' ? 'កត់ត្រាវត្តមានសិស្សប្រចាំថ្ងៃ និងតាមដានអវត្តមាន' : 'Mark daily student attendance and track compliance rate'}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleBulk('Present')}
              className="px-3 py-1.5 bg-[#087F4F] hover:bg-[#07583D] text-white text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5"
            >
              <CheckCheck className="w-3.5 h-3.5" />
              <span>Mark All Present</span>
            </button>

            <button
              onClick={exportAttendanceReport}
              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export</span>
            </button>
          </div>
        </div>

        {/* Date and Class Selector */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-slate-100">
          <div>
            <label className="text-[10px] font-bold text-slate-400 block mb-1">Date</label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full text-xs font-semibold px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
            />
          </div>

          <div>
            <label className="text-[10px] font-bold text-slate-400 block mb-1">Class Program</label>
            <select
              value={selectedClassId}
              onChange={(e) => setSelectedClassId(Number(e.target.value))}
              className="w-full text-xs font-semibold px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
            >
              {classes.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2 pt-4">
            <div className="flex-1 bg-emerald-50 border border-emerald-200/80 rounded-xl px-3 py-1.5 flex items-center justify-between">
              <span className="text-xs text-emerald-800 font-medium">Compliance Rate</span>
              <span className="text-base font-black text-[#087F4F]">{attendancePercentage}%</span>
            </div>
          </div>
        </div>

        {/* Status Counters */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
          <div className="bg-emerald-50 rounded-xl p-2.5 border border-emerald-100 flex items-center justify-between">
            <span className="text-xs font-semibold text-emerald-800">Present (P)</span>
            <span className="text-sm font-black text-emerald-700">{presentCount}</span>
          </div>
          <div className="bg-amber-50 rounded-xl p-2.5 border border-amber-100 flex items-center justify-between">
            <span className="text-xs font-semibold text-amber-800">Late (L)</span>
            <span className="text-sm font-black text-amber-700">{lateCount}</span>
          </div>
          <div className="bg-rose-50 rounded-xl p-2.5 border border-rose-100 flex items-center justify-between">
            <span className="text-xs font-semibold text-rose-800">Absent (A)</span>
            <span className="text-sm font-black text-rose-700">{absentCount}</span>
          </div>
          <div className="bg-blue-50 rounded-xl p-2.5 border border-blue-100 flex items-center justify-between">
            <span className="text-xs font-semibold text-blue-800">Excused (E)</span>
            <span className="text-sm font-black text-blue-700">{excusedCount}</span>
          </div>
        </div>
      </div>

      {/* Attendance Sheet Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/80 border-b border-slate-200/80 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3 px-4">Student</th>
                <th className="py-3 px-4">Guardian Contact</th>
                <th className="py-3 px-4">Current Status</th>
                <th className="py-3 px-4 text-center">Mark Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {classStudents.map((s) => {
                const current = getStatus(s.id);
                return (
                  <tr key={s.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={s.photoUrl || ''}
                          alt={s.fullName}
                          className="w-9 h-9 rounded-full object-cover ring-1 ring-slate-200 shrink-0"
                        />
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="font-mono text-[10px] font-bold text-slate-500">{s.id}</span>
                            <span className="font-bold text-slate-900">{s.fullName}</span>
                          </div>
                          <span className="text-[10px] text-slate-400">{s.fullNameKhmer}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-slate-600">
                      <p className="font-medium">{s.guardianName}</p>
                      <p className="text-[10px] text-slate-400">{s.guardianPhone}</p>
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                          current === 'Present'
                            ? 'bg-emerald-100 text-[#07583D]'
                            : current === 'Late'
                            ? 'bg-amber-100 text-amber-800'
                            : current === 'Absent'
                            ? 'bg-rose-100 text-rose-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}
                      >
                        {current}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <div className="inline-flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
                        {(['Present', 'Late', 'Absent', 'Excused'] as const).map((st) => (
                          <button
                            key={st}
                            onClick={() => handleStatusChange(s.id, st)}
                            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                              current === st
                                ? st === 'Present'
                                  ? 'bg-[#087F4F] text-white shadow-xs'
                                  : st === 'Late'
                                  ? 'bg-amber-500 text-white shadow-xs'
                                  : st === 'Absent'
                                  ? 'bg-rose-500 text-white shadow-xs'
                                  : 'bg-blue-500 text-white shadow-xs'
                                : 'text-slate-600 hover:bg-white'
                            }`}
                          >
                            {st[0]}
                          </button>
                        ))}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
