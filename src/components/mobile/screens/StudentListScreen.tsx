import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import {
  ChevronLeft,
  Search,
  Filter,
  Plus,
  Trash2,
  ChevronRight,
  BookOpen,
  UserCheck
} from 'lucide-react';
import { Student } from '../../../types';

export const StudentListScreen: React.FC = () => {
  const { students, classes, setMobileScreen, setSelectedStudent, deleteStudent, language } = useApp();
  const [search, setSearch] = useState('');
  const [selectedClassId, setSelectedClassId] = useState<number | 'all'>('all');

  const filteredStudents = students.filter(student => {
    const matchesSearch =
      student.fullName.toLowerCase().includes(search.toLowerCase()) ||
      student.fullNameKhmer.includes(search) ||
      student.id.toLowerCase().includes(search.toLowerCase()) ||
      student.guardianPhone.includes(search);

    const matchesClass = selectedClassId === 'all' || student.classId === selectedClassId;
    return matchesSearch && matchesClass;
  });

  const handleSelectStudent = (student: Student) => {
    setSelectedStudent(student);
    setMobileScreen('detail');
  };

  const handleDelete = (e: React.MouseEvent, id: string, name: string) => {
    e.stopPropagation();
    if (window.confirm(language === 'km' ? `តើអ្នកប្រាកដជាចង់លុបឈ្មោះ ${name} ទេ?` : `Are you sure you want to delete ${name}?`)) {
      deleteStudent(id);
    }
  };

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
          {language === 'km' ? 'បញ្ជីឈ្មោះសិស្ស' : 'Students Directory'}
        </h1>
        <button
          onClick={() => setMobileScreen('register')}
          className="w-8 h-8 rounded-full bg-[#087F4F] text-white flex items-center justify-center hover:bg-[#07583D]"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {/* Search Bar */}
        <div className="relative">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={
              language === 'km'
                ? 'ស្វែងរកតាមឈ្មោះ, លេខសម្គាល់ ឬលេខទូរស័ព្ទ...'
                : 'Search name, ID (e.g. S0001), phone...'
            }
            className="w-full text-xs pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#087F4F] focus:outline-none shadow-2xs"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
        </div>

        {/* Class Filter Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs">
          <button
            onClick={() => setSelectedClassId('all')}
            className={`whitespace-nowrap px-3 py-1.5 rounded-xl font-medium transition-all ${
              selectedClassId === 'all'
                ? 'bg-[#087F4F] text-white font-bold shadow-2xs'
                : 'bg-white text-slate-600 border border-slate-200'
            }`}
          >
            {language === 'km' ? 'ទាំងអស់' : 'All Classes'} ({students.length})
          </button>
          {classes.map((cls) => {
            const count = students.filter(s => s.classId === cls.id).length;
            const isSelected = selectedClassId === cls.id;
            return (
              <button
                key={cls.id}
                onClick={() => setSelectedClassId(cls.id)}
                className={`whitespace-nowrap px-3 py-1.5 rounded-xl font-medium transition-all ${
                  isSelected
                    ? 'bg-[#087F4F] text-white font-bold shadow-2xs'
                    : 'bg-white text-slate-600 border border-slate-200'
                }`}
              >
                {cls.name.split(' ')[0]} ({count})
              </button>
            );
          })}
        </div>

        {/* Student Cards List */}
        <div className="space-y-2">
          {filteredStudents.length === 0 ? (
            <div className="bg-white rounded-2xl p-8 text-center text-slate-400 text-xs">
              <p>{language === 'km' ? 'រកមិនឃើញសិស្សដែលត្រូវគ្នានឹងការស្វែងរកទេ' : 'No students found.'}</p>
            </div>
          ) : (
            filteredStudents.map((student) => (
              <div
                key={student.id}
                onClick={() => handleSelectStudent(student)}
                className="bg-white p-3 rounded-2xl border border-slate-100 shadow-2xs flex items-center justify-between gap-3 hover:border-emerald-200 cursor-pointer active:scale-[0.99] transition-all group"
              >
                <img
                  src={student.photoUrl || 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=200'}
                  alt={student.fullName}
                  className="w-12 h-12 rounded-xl object-cover ring-2 ring-emerald-500/20 shrink-0"
                />

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-emerald-50 text-[#087F4F] border border-emerald-200">
                      {student.id}
                    </span>
                    <h3 className="text-xs font-bold text-slate-900 truncate">
                      {student.fullName}
                    </h3>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5 truncate">
                    {student.fullNameKhmer} • {student.gender === 'Male' ? (language === 'km' ? 'ប្រុស' : 'Male') : (language === 'km' ? 'ស្រី' : 'Female')}
                  </p>
                  <p className="text-[10px] text-emerald-700 font-semibold truncate mt-0.5">
                    {student.className}
                  </p>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={(e) => handleDelete(e, student.id, student.fullName)}
                    className="p-1.5 text-slate-300 hover:text-rose-500 rounded-lg transition-colors"
                    title="Delete Student"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#087F4F] transition-colors" />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
