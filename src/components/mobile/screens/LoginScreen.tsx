import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { Lock, Mail, ChevronLeft, ArrowRight, ShieldCheck } from 'lucide-react';

export const LoginScreen: React.FC = () => {
  const { setMobileScreen, language } = useApp();
  const [email, setEmail] = useState('panha.keo@anjalihouse.org');
  const [password, setPassword] = useState('••••••••');
  const [role, setRole] = useState<'Admin' | 'Teacher' | 'Staff'>('Admin');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setMobileScreen('home');
  };

  const setPresetUser = (presetRole: 'Admin' | 'Teacher' | 'Staff') => {
    setRole(presetRole);
    if (presetRole === 'Admin') {
      setEmail('panha.keo@anjalihouse.org');
    } else if (presetRole === 'Teacher') {
      setEmail('dara.vong@anjalihouse.org');
    } else {
      setEmail('staff.reap@anjalihouse.org');
    }
    setPassword('anjali2024');
  };

  return (
    <div className="flex flex-col h-full bg-white p-6 justify-between">
      {/* Top Header */}
      <div>
        <button
          onClick={() => setMobileScreen('splash')}
          className="p-1 rounded-full text-slate-700 hover:bg-slate-100 transition-colors inline-block mb-4"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <div className="space-y-1">
          <h1 className="text-xl font-bold text-slate-900">
            {language === 'km' ? 'សូមស្វាគមន៍ត្រឡប់មកវិញ!' : 'Welcome Back!'}
          </h1>
          <p className="text-xs text-slate-500">
            {language === 'km'
              ? 'ចូលប្រើប្រព័ន្ធគ្រប់គ្រងសិស្ស Anjali House'
              : 'Sign in to Anjali House Student Information System'}
          </p>
        </div>

        {/* Role Preset Chips for easy testing */}
        <div className="mt-4 p-2 bg-slate-50 rounded-2xl border border-slate-100">
          <span className="text-[10px] font-bold text-slate-400 block mb-1.5 uppercase">
            {language === 'km' ? 'ជ្រើសរើសតួនាទីសាកល្បង (Quick Role):' : 'Quick Demo Role:'}
          </span>
          <div className="flex gap-1.5">
            {(['Admin', 'Teacher', 'Staff'] as const).map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setPresetUser(r)}
                className={`flex-1 py-1 rounded-xl text-[11px] font-bold transition-all ${
                  role === r
                    ? 'bg-[#087F4F] text-white shadow-2xs'
                    : 'bg-white text-slate-600 border border-slate-200'
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-3.5 mt-5">
          <div>
            <label className="text-[11px] font-bold text-slate-700 block mb-1">
              {language === 'km' ? 'អ៊ីមែល ឬ ឈ្មោះអ្នកប្រើ' : 'Email Address'}
            </label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#087F4F] focus:outline-none"
              />
              <Mail className="w-4 h-4 text-slate-400 absolute right-3 top-3" />
            </div>
          </div>

          <div>
            <label className="text-[11px] font-bold text-slate-700 block mb-1">
              {language === 'km' ? 'ពាក្យសម្ងាត់' : 'Password'}
            </label>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#087F4F] focus:outline-none"
              />
              <Lock className="w-4 h-4 text-slate-400 absolute right-3 top-3" />
            </div>
          </div>

          <div className="flex items-center justify-between text-[11px] pt-1">
            <label className="flex items-center gap-1.5 text-slate-600 cursor-pointer">
              <input type="checkbox" defaultChecked className="rounded text-[#087F4F]" />
              <span>Remember me</span>
            </label>
            <a href="#forgot" className="text-[#087F4F] font-semibold hover:underline">
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-[#087F4F] hover:bg-[#07583D] active:scale-[0.99] text-white font-bold rounded-2xl shadow-sm transition-all text-xs flex items-center justify-center gap-2 mt-4"
          >
            <span>{language === 'km' ? 'ចូលប្រើប្រព័ន្ធ' : 'Sign In'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>

      {/* Footer */}
      <div className="text-center pt-4 border-t border-slate-100">
        <p className="text-xs text-slate-500">
          {language === 'km' ? 'ត្រូវការជំនួយគណនី?' : 'Need staff credentials?'}
          <button
            onClick={() => setMobileScreen('contact')}
            className="text-[#087F4F] font-bold ml-1 hover:underline"
          >
            {language === 'km' ? 'ទាក់ទងរដ្ឋបាល' : 'Contact Admin'}
          </button>
        </p>
      </div>
    </div>
  );
};
