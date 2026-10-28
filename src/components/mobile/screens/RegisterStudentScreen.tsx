import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import {
  ChevronLeft,
  Camera,
  Calendar,
  CheckCircle,
  User,
  Phone,
  Home,
  BookOpen
} from 'lucide-react';

export const RegisterStudentScreen: React.FC = () => {
  const { setMobileScreen, language, classes, addStudent, setSelectedStudent } = useApp();

  const [fullName, setFullName] = useState('');
  const [fullNameKhmer, setFullNameKhmer] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('2013-05-20');
  const [gender, setGender] = useState<'Male' | 'Female' | 'Other'>('Male');
  const [classId, setClassId] = useState<number>(classes[0]?.id || 1);
  const [guardianName, setGuardianName] = useState('');
  const [guardianPhone, setGuardianPhone] = useState('');
  const [address, setAddress] = useState('Salakanseng Village, Siem Reap');
  const [photoUrl, setPhotoUrl] = useState(
    'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=400'
  );
  const [showSuccess, setShowSuccess] = useState(false);
  const [createdId, setCreatedId] = useState('');

  const sampleAvatars = [
    'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=400',
    'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=400',
    'https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&q=80&w=400',
    'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&q=80&w=400'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !guardianName.trim() || !guardianPhone.trim()) {
      alert(language === 'km' ? 'សូមបំពេញព័ត៌មានចាំបាច់ទាំងអស់!' : 'Please fill all required fields!');
      return;
    }

    const selectedClass = classes.find(c => c.id === Number(classId)) || classes[0];

    const newStudent = addStudent({
      fullName: fullName.trim(),
      fullNameKhmer: fullNameKhmer.trim() || fullName.trim(),
      dateOfBirth,
      gender,
      classId: selectedClass.id,
      className: selectedClass.name,
      guardianName: guardianName.trim(),
      guardianNameKhmer: guardianName.trim(),
      guardianPhone: guardianPhone.trim(),
      address: address.trim(),
      photoUrl,
      status: 'Active',
      notes: 'New enrollment registered through mobile application.'
    });

    setCreatedId(newStudent.id);
    setSelectedStudent(newStudent);
    setShowSuccess(true);
  };

  return (
    <div className="flex flex-col h-full bg-[#F5F7F6]">
      {/* App Bar matching Screen 7 */}
      <div className="bg-white px-4 py-3 border-b border-slate-100 flex items-center justify-between sticky top-0 z-20">
        <button
          onClick={() => setMobileScreen('home')}
          className="p-1 rounded-full text-slate-700 hover:bg-slate-100 transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="text-base font-bold text-slate-800">
          {language === 'km' ? 'ចុះឈ្មោះសិស្ស' : 'Register Student'}
        </h1>
        <div className="w-6"></div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {showSuccess ? (
          <div className="bg-white rounded-3xl p-6 text-center space-y-4 shadow-sm border border-emerald-100 animate-in fade-in zoom-in-95 duration-200">
            <CheckCircle className="w-16 h-16 text-[#087F4F] mx-auto animate-bounce" />
            <h2 className="text-lg font-bold text-slate-800">
              {language === 'km' ? 'ចុះឈ្មោះសិស្សជោគជ័យ!' : 'Student Registered!'}
            </h2>
            <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs text-emerald-900">
              <p className="font-semibold">{language === 'km' ? 'លេខសម្គាល់សិស្ស (Student ID):' : 'Generated Student ID:'}</p>
              <p className="text-xl font-black text-[#087F4F] tracking-widest mt-1">{createdId}</p>
              <p className="mt-1 font-medium">{fullName}</p>
            </div>
            <div className="space-y-2 pt-2">
              <button
                onClick={() => setMobileScreen('detail')}
                className="w-full py-3 bg-[#087F4F] hover:bg-[#07583D] text-white text-xs font-bold rounded-xl"
              >
                {language === 'km' ? 'មើលព័ត៌មានលម្អិតសិស្ស' : 'View Student Profile'}
              </button>
              <button
                onClick={() => {
                  setShowSuccess(false);
                  setFullName('');
                  setFullNameKhmer('');
                  setGuardianName('');
                  setGuardianPhone('');
                }}
                className="w-full py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl"
              >
                {language === 'km' ? 'ចុះឈ្មោះសិស្សម្នាក់ទៀត' : 'Register Another Student'}
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Photo Upload Circle matching Screen 7 */}
            <div className="flex flex-col items-center justify-center pt-1">
              <div className="relative group">
                <div className="w-24 h-24 rounded-full bg-slate-100 border-2 border-dashed border-slate-300 flex flex-col items-center justify-center overflow-hidden shadow-xs cursor-pointer">
                  {photoUrl ? (
                    <img src={photoUrl} alt="Student" className="w-full h-full object-cover" />
                  ) : (
                    <Camera className="w-8 h-8 text-slate-400" />
                  )}
                </div>
                <div className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-[#087F4F] text-white flex items-center justify-center shadow-md">
                  <Camera className="w-4 h-4" />
                </div>
              </div>

              <span className="text-[11px] font-semibold text-slate-500 mt-2">
                {language === 'km' ? 'ជ្រើសរើសរូបថតសិស្ស (Upload Photo)' : 'Upload Photo'}
              </span>

              {/* Sample avatar switcher */}
              <div className="flex gap-2 mt-1.5">
                {sampleAvatars.map((url, i) => (
                  <img
                    key={i}
                    src={url}
                    alt={`Avatar ${i}`}
                    onClick={() => setPhotoUrl(url)}
                    className={`w-7 h-7 rounded-full cursor-pointer object-cover border-2 transition-all ${
                      photoUrl === url ? 'border-[#087F4F] scale-110' : 'border-transparent opacity-70'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Form Fields matching Screen 7 */}
            <div className="bg-white rounded-2xl p-4 shadow-xs border border-slate-100 space-y-3.5">
              {/* Full Name English */}
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  {language === 'km' ? 'ឈ្មោះសិស្ស (អក្សរឡាតាំង) *' : 'Full Name *'}
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Sok Chetra"
                    className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#087F4F] focus:outline-none"
                  />
                  <User className="w-4 h-4 text-slate-400 absolute right-3 top-3" />
                </div>
              </div>

              {/* Full Name Khmer */}
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  {language === 'km' ? 'ឈ្មោះសិស្ស (ជាភាសាខ្មែរ)' : 'Full Name (Khmer)'}
                </label>
                <input
                  type="text"
                  value={fullNameKhmer}
                  onChange={(e) => setFullNameKhmer(e.target.value)}
                  placeholder="ឧ. សុខ ចិត្រា"
                  className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#087F4F] focus:outline-none"
                />
              </div>

              {/* Date of Birth */}
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  {language === 'km' ? 'ថ្ងៃខែឆ្នាំកំណើត *' : 'Date of Birth *'}
                </label>
                <div className="relative">
                  <input
                    type="date"
                    required
                    value={dateOfBirth}
                    onChange={(e) => setDateOfBirth(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#087F4F] focus:outline-none"
                  />
                  <Calendar className="w-4 h-4 text-slate-400 absolute right-3 top-3 pointer-events-none" />
                </div>
              </div>

              {/* Gender Dropdown matching Screen 7 */}
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  {language === 'km' ? 'ភេទ *' : 'Gender *'}
                </label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value as any)}
                  className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#087F4F] focus:outline-none"
                >
                  <option value="Male">{language === 'km' ? 'ប្រុស (Male)' : 'Male'}</option>
                  <option value="Female">{language === 'km' ? 'ស្រី (Female)' : 'Female'}</option>
                  <option value="Other">{language === 'km' ? 'ផ្សេងៗ (Other)' : 'Other'}</option>
                </select>
              </div>

              {/* Class Dropdown matching Screen 7 */}
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  {language === 'km' ? 'ថ្នាក់រៀន *' : 'Class *'}
                </label>
                <select
                  value={classId}
                  onChange={(e) => setClassId(Number(e.target.value))}
                  className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#087F4F] focus:outline-none"
                >
                  {classes.map((cls) => (
                    <option key={cls.id} value={cls.id}>
                      {language === 'km' ? cls.nameKhmer : cls.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Parent / Guardian Name matching Screen 7 */}
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  {language === 'km' ? 'ឈ្មោះអាណាព្យាបាល *' : 'Parent / Guardian Name *'}
                </label>
                <input
                  type="text"
                  required
                  value={guardianName}
                  onChange={(e) => setGuardianName(e.target.value)}
                  placeholder="e.g. Sok Samnang"
                  className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#087F4F] focus:outline-none"
                />
              </div>

              {/* Phone Number matching Screen 7 */}
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  {language === 'km' ? 'លេខទូរស័ព្ទ *' : 'Phone Number *'}
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    required
                    value={guardianPhone}
                    onChange={(e) => setGuardianPhone(e.target.value)}
                    placeholder="+855 12 889 012"
                    className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#087F4F] focus:outline-none"
                  />
                  <Phone className="w-4 h-4 text-slate-400 absolute right-3 top-3" />
                </div>
              </div>

              {/* Address */}
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  {language === 'km' ? 'អាសយដ្ឋាន/ភូមិ' : 'Address / Village'}
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Salakanseng Village, Siem Reap"
                    className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#087F4F] focus:outline-none"
                  />
                  <Home className="w-4 h-4 text-slate-400 absolute right-3 top-3" />
                </div>
              </div>
            </div>

            {/* Submit Button matching Screen 7 */}
            <button
              type="submit"
              className="w-full py-3.5 px-4 bg-[#087F4F] hover:bg-[#07583D] active:scale-[0.99] text-white font-bold rounded-2xl shadow-sm transition-all text-sm"
            >
              {language === 'km' ? 'ចុះឈ្មោះ (Submit)' : 'Submit'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
