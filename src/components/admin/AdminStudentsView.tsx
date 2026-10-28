import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Search,
  Filter,
  Plus,
  Download,
  Trash2,
  Edit,
  Eye,
  QrCode,
  X,
  Printer,
  UserCheck
} from 'lucide-react';
import { Student } from '../../types';

export const AdminStudentsView: React.FC = () => {
  const { students, classes, addStudent, updateStudent, deleteStudent, language } = useApp();
  const [search, setSearch] = useState('');
  const [classFilter, setClassFilter] = useState<number | 'all'>('all');
  const [genderFilter, setGenderFilter] = useState<'all' | 'Male' | 'Female'>('all');

  // Modals
  const [modalMode, setModalMode] = useState<'none' | 'add' | 'edit' | 'view'>('none');
  const [activeStudent, setActiveStudent] = useState<Student | null>(null);

  // Form Fields
  const [formData, setFormData] = useState({
    fullName: '',
    fullNameKhmer: '',
    dateOfBirth: '2012-05-15',
    gender: 'Male' as 'Male' | 'Female' | 'Other',
    classId: classes[0]?.id || 1,
    guardianName: '',
    guardianNameKhmer: '',
    guardianPhone: '',
    address: 'Salakanseng Village, Siem Reap',
    photoUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=400',
    status: 'Active' as 'Active' | 'Inactive' | 'Graduated',
    notes: ''
  });

  const filteredStudents = students.filter((s) => {
    const matchesSearch =
      s.fullName.toLowerCase().includes(search.toLowerCase()) ||
      s.fullNameKhmer.includes(search) ||
      s.id.toLowerCase().includes(search.toLowerCase()) ||
      s.guardianPhone.includes(search);
    const matchesClass = classFilter === 'all' || s.classId === classFilter;
    const matchesGender = genderFilter === 'all' || s.gender === genderFilter;
    return matchesSearch && matchesClass && matchesGender;
  });

  const handleOpenAdd = () => {
    setFormData({
      fullName: '',
      fullNameKhmer: '',
      dateOfBirth: '2012-05-15',
      gender: 'Male',
      classId: classes[0]?.id || 1,
      guardianName: '',
      guardianNameKhmer: '',
      guardianPhone: '',
      address: 'Salakanseng Village, Siem Reap',
      photoUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=400',
      status: 'Active',
      notes: ''
    });
    setModalMode('add');
  };

  const handleOpenEdit = (student: Student) => {
    setActiveStudent(student);
    setFormData({
      fullName: student.fullName,
      fullNameKhmer: student.fullNameKhmer,
      dateOfBirth: student.dateOfBirth,
      gender: student.gender,
      classId: student.classId,
      guardianName: student.guardianName,
      guardianNameKhmer: student.guardianNameKhmer,
      guardianPhone: student.guardianPhone,
      address: student.address,
      photoUrl: student.photoUrl,
      status: student.status,
      notes: student.notes || ''
    });
    setModalMode('edit');
  };

  const handleOpenView = (student: Student) => {
    setActiveStudent(student);
    setModalMode('view');
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const selectedClass = classes.find(c => c.id === Number(formData.classId)) || classes[0];

    if (modalMode === 'add') {
      addStudent({
        ...formData,
        classId: selectedClass.id,
        className: selectedClass.name
      });
    } else if (modalMode === 'edit' && activeStudent) {
      updateStudent({
        ...activeStudent,
        ...formData,
        classId: selectedClass.id,
        className: selectedClass.name
      });
    }
    setModalMode('none');
  };

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(language === 'km' ? `តើអ្នកប្រាកដជាចង់លុបសិស្ស ${name} ទេ?` : `Are you sure you want to delete ${name}?`)) {
      deleteStudent(id);
    }
  };

  const exportCsv = () => {
    const headers = ['ID,Full Name,Khmer Name,Class,Gender,DOB,Guardian,Phone,Address,Status'];
    const rows = filteredStudents.map(s =>
      `"${s.id}","${s.fullName}","${s.fullNameKhmer}","${s.className}","${s.gender}","${s.dateOfBirth}","${s.guardianName}","${s.guardianPhone}","${s.address}","${s.status}"`
    );
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers, ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Anjali_House_Students_${new Date().toISOString().substring(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-5">
      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={language === 'km' ? 'ស្វែងរកតាមឈ្មោះ, ID, ឬលេខទូរស័ព្ទ...' : 'Search student name, ID, phone...'}
            className="w-full text-xs pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#087F4F] focus:outline-none"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
        </div>

        {/* Filters and Actions */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Class Filter */}
          <select
            value={classFilter}
            onChange={(e) => setClassFilter(e.target.value === 'all' ? 'all' : Number(e.target.value))}
            className="text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 font-medium focus:outline-none"
          >
            <option value="all">All Classes</option>
            {classes.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>

          {/* Gender Filter */}
          <select
            value={genderFilter}
            onChange={(e) => setGenderFilter(e.target.value as any)}
            className="text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 font-medium focus:outline-none"
          >
            <option value="all">All Genders</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>

          {/* Export CSV */}
          <button
            onClick={exportCsv}
            className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-colors"
            title="Export CSV"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Export CSV</span>
          </button>

          {/* Add Student Button */}
          <button
            onClick={handleOpenAdd}
            className="px-3.5 py-2 bg-[#087F4F] hover:bg-[#07583D] text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>{language === 'km' ? 'ចុះឈ្មោះសិស្សថ្មី' : 'Register Student'}</span>
          </button>
        </div>
      </div>

      {/* Main Student Data Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/80 border-b border-slate-200/80 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3 px-4">Student ID</th>
                <th className="py-3 px-4">Student Name</th>
                <th className="py-3 px-4">Class</th>
                <th className="py-3 px-4">Gender</th>
                <th className="py-3 px-4">Date of Birth</th>
                <th className="py-3 px-4">Guardian & Phone</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-slate-400">
                    No students match the criteria.
                  </td>
                </tr>
              ) : (
                filteredStudents.map((s) => (
                  <tr key={s.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3 px-4 font-mono font-bold text-slate-800">
                      {s.id}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={s.photoUrl || ''}
                          alt={s.fullName}
                          className="w-8 h-8 rounded-full object-cover ring-1 ring-slate-200 shrink-0"
                        />
                        <div>
                          <p className="font-bold text-slate-900">{s.fullName}</p>
                          <p className="text-[10px] text-slate-400">{s.fullNameKhmer}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-slate-700">
                      <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 font-medium border border-emerald-100">
                        {s.className}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-600">
                      {s.gender}
                    </td>
                    <td className="py-3 px-4 text-slate-600 font-mono">
                      {s.dateOfBirth}
                    </td>
                    <td className="py-3 px-4 text-slate-700">
                      <p className="font-semibold">{s.guardianName}</p>
                      <p className="text-[10px] text-slate-400">{s.guardianPhone}</p>
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-[#07583D]">
                        {s.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => handleOpenView(s)}
                          className="p-1.5 text-slate-400 hover:text-[#087F4F] hover:bg-emerald-50 rounded-lg transition-colors"
                          title="View Profile / Badge"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleOpenEdit(s)}
                          className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Edit Student"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(s.id, s.fullName)}
                          className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                          title="Delete Student"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="p-4 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between text-xs text-slate-500">
          <span>Total Records: {filteredStudents.length} Students</span>
          <span className="text-[11px]">Anjali House SIMS Database • Salakanseng Village, Siem Reap</span>
        </div>
      </div>

      {/* Add / Edit Student Modal Dialog */}
      {(modalMode === 'add' || modalMode === 'edit') && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-xl max-h-[90vh] overflow-y-auto p-6 shadow-2xl relative animate-in fade-in zoom-in-95">
            <button
              onClick={() => setModalMode('none')}
              className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-600 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
              <UserCheck className="w-5 h-5 text-[#087F4F]" />
              <span>{modalMode === 'add' ? 'Register New Student' : `Edit Student (${activeStudent?.id})`}</span>
            </h3>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Full Name (English) *</label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#087F4F] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Full Name (Khmer)</label>
                  <input
                    type="text"
                    value={formData.fullNameKhmer}
                    onChange={(e) => setFormData({ ...formData, fullNameKhmer: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#087F4F] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Date of Birth *</label>
                  <input
                    type="date"
                    required
                    value={formData.dateOfBirth}
                    onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#087F4F] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Gender *</label>
                  <select
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value as any })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#087F4F] focus:outline-none"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#087F4F] focus:outline-none"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                    <option value="Graduated">Graduated</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Assigned Class *</label>
                <select
                  value={formData.classId}
                  onChange={(e) => setFormData({ ...formData, classId: Number(e.target.value) })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#087F4F] focus:outline-none"
                >
                  {classes.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Guardian Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.guardianName}
                    onChange={(e) => setFormData({ ...formData, guardianName: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#087F4F] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Guardian Phone *</label>
                  <input
                    type="tel"
                    required
                    value={formData.guardianPhone}
                    onChange={(e) => setFormData({ ...formData, guardianPhone: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#087F4F] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Village / Address</label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#087F4F] focus:outline-none"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setModalMode('none')}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#087F4F] hover:bg-[#07583D] text-white font-bold rounded-xl shadow-xs"
                >
                  {modalMode === 'add' ? 'Save New Student' : 'Update Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View / Print ID Badge Modal */}
      {modalMode === 'view' && activeStudent && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-sm p-6 shadow-2xl relative animate-in fade-in zoom-in-95">
            <button
              onClick={() => setModalMode('none')}
              className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-600 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Printable ID card element */}
            <div className="border-2 border-[#087F4F] rounded-2xl p-4 bg-gradient-to-b from-emerald-50/60 to-white text-center shadow-xs">
              <div className="flex items-center justify-between pb-2 border-b border-emerald-200">
                <div className="text-left">
                  <p className="text-[11px] font-black uppercase text-[#07583D] tracking-wider">ANJALI HOUSE</p>
                  <p className="text-[9px] text-slate-500">Student Identity Badge</p>
                </div>
                <span className="w-7 h-7 rounded-lg bg-[#087F4F] text-white text-xs font-black flex items-center justify-center">
                  AH
                </span>
              </div>

              <div className="py-4 flex flex-col items-center">
                <img
                  src={activeStudent.photoUrl || ''}
                  alt={activeStudent.fullName}
                  className="w-24 h-24 rounded-2xl object-cover ring-2 ring-[#087F4F] shadow-md mb-2"
                />
                <h4 className="text-base font-black text-slate-900">{activeStudent.fullName}</h4>
                <p className="text-xs font-semibold text-[#087F4F]">{activeStudent.fullNameKhmer}</p>
                <p className="text-xs font-mono font-bold bg-emerald-100 text-[#07583D] px-2.5 py-0.5 rounded-md mt-1">
                  ID: {activeStudent.id}
                </p>
                <p className="text-xs text-slate-700 font-medium mt-1">{activeStudent.className}</p>
              </div>

              <div className="pt-2 border-t border-dashed border-emerald-200 flex items-center justify-between text-[10px] text-slate-500">
                <span>DOB: {activeStudent.dateOfBirth}</span>
                <span>Guardian: {activeStudent.guardianPhone}</span>
              </div>
            </div>

            <div className="mt-4 flex gap-2">
              <button
                onClick={() => window.print()}
                className="flex-1 py-2.5 bg-[#087F4F] hover:bg-[#07583D] text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5"
              >
                <Printer className="w-4 h-4" />
                <span>Print Student Card</span>
              </button>
              <button
                onClick={() => setModalMode('none')}
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
