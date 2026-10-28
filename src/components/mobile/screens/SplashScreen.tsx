import React from 'react';
import { useApp } from '../../../context/AppContext';

export const SplashScreen: React.FC = () => {
  const { setMobileScreen, language } = useApp();

  return (
    <div className="relative w-full h-full bg-[#07583D] flex flex-col justify-between p-6 overflow-hidden">
      {/* Background Kids Photo with overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=800"
          alt="Happy students at Anjali House"
          className="w-full h-full object-cover opacity-20 filter saturate-150"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#07583D]/95 via-[#087F4F]/85 to-[#07583D]/95"></div>
      </div>

      {/* Decorative Circles */}
      <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-white/5 pointer-events-none"></div>
      <div className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full bg-emerald-400/10 pointer-events-none"></div>

      {/* Center Branding matching Screen 1 */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-4">
        {/* House Logo with stylized children */}
        <div className="w-24 h-24 mb-4 flex items-center justify-center">
          <svg viewBox="0 0 100 100" className="w-full h-full text-white fill-current drop-shadow-md">
            <path
              d="M 50 10 L 12 44 L 22 44 L 22 88 L 78 88 L 78 44 L 88 44 Z"
              fill="none"
              stroke="white"
              strokeWidth="7"
              strokeLinejoin="round"
            />
            {/* Center child */}
            <circle cx="50" cy="46" r="6" />
            <path d="M 42 70 C 42 57, 58 57, 58 70 Z" />
            {/* Left child */}
            <circle cx="34" cy="52" r="5" />
            <path d="M 27 74 C 27 63, 41 63, 41 74 Z" />
            {/* Right child */}
            <circle cx="66" cy="52" r="5" />
            <path d="M 59 74 C 59 63, 73 63, 73 74 Z" />
          </svg>
        </div>

        <h1 className="text-2xl font-black text-white tracking-widest uppercase">
          ANJALI HOUSE
        </h1>
        <p className="text-xs font-semibold tracking-wider text-emerald-200 mt-0.5">
          SIEM REAP, CAMBODIA
        </p>

        {/* Tagline */}
        <p className="text-sm font-light text-emerald-100/90 mt-4 max-w-xs leading-relaxed italic">
          "{language === 'km' ? 'ការអប់រំគឺជាគន្លឹះឆ្ពោះទៅកាន់អនាគតដ៏ភ្លឺស្វាង' : 'Education is the key to a better future'}"
        </p>
      </div>

      {/* Bottom Buttons matching Screen 1 */}
      <div className="relative z-10 space-y-3 pb-6">
        <button
          onClick={() => setMobileScreen('login')}
          className="w-full py-3.5 px-4 bg-[#10B981] hover:bg-emerald-500 active:scale-[0.98] text-white font-semibold rounded-2xl shadow-lg shadow-emerald-900/30 transition-all text-sm"
        >
          {language === 'km' ? 'ចូលប្រព័ន្ធ (Login)' : 'Login'}
        </button>

        <button
          onClick={() => setMobileScreen('home')}
          className="w-full py-3.5 px-4 bg-white hover:bg-emerald-50 active:scale-[0.98] text-[#07583D] font-bold rounded-2xl shadow-md transition-all text-sm"
        >
          {language === 'km' ? 'ចាប់ផ្តើម (Get Started)' : 'Get Started'}
        </button>

        <p className="text-[11px] text-center text-emerald-200/70 pt-2">
          {language === 'km' ? 'គាំទ្រដោយអង្គការមិនមែនរដ្ឋាភិបាល Anjali House' : 'Non-Governmental Organization • Est. 2005'}
        </p>
      </div>
    </div>
  );
};
