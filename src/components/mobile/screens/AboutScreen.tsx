import React from 'react';
import { useApp } from '../../../context/AppContext';
import { ChevronLeft, Heart, BookOpen, Utensils, ShieldCheck, Palette, Users, Sparkles } from 'lucide-react';

export const AboutScreen: React.FC = () => {
  const { setMobileScreen, language } = useApp();

  const pillars = [
    {
      titleEn: 'Quality Education',
      titleKm: 'ការអប់រំប្រកបដោយគុណភាព',
      descEn: 'English, Khmer literacy, and computer coding for underserved children.',
      icon: <BookOpen className="w-5 h-5 text-emerald-600" />
    },
    {
      titleEn: 'Nutrition & Hot Meals',
      titleKm: 'អាហារូបត្ថម្ភ និងអាហារក្តៅ',
      descEn: 'Providing balanced, nutritious daily hot lunches prepared fresh.',
      icon: <Utensils className="w-5 h-5 text-amber-600" />
    },
    {
      titleEn: 'Health & Dental Care',
      titleKm: 'ការថែទាំសុខភាព និងធ្មេញ',
      descEn: 'Regular physical checkups, vaccinations, and hygiene education.',
      icon: <Heart className="w-5 h-5 text-rose-600" />
    },
    {
      titleEn: 'Arts & Creative Expression',
      titleKm: 'សិល្បៈ និងការច្នៃប្រឌិត',
      descEn: 'Photography, watercolor painting, traditional dance, and sports.',
      icon: <Palette className="w-5 h-5 text-purple-600" />
    }
  ];

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
          {language === 'km' ? 'អំពីអង្គការ Anjali House' : 'About Us'}
        </h1>
        <div className="w-6"></div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Hero Card */}
        <div className="bg-gradient-to-br from-[#07583D] to-[#087F4F] rounded-3xl p-5 text-white shadow-md relative overflow-hidden">
          <div className="relative z-10 space-y-2">
            <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-300">
              Siem Reap, Cambodia • Est. 2005
            </span>
            <h2 className="text-lg font-black leading-tight">
              Anjali House NGO
            </h2>
            <p className="text-xs text-emerald-100/90 leading-relaxed font-light">
              {language === 'km'
                ? 'អង្គការមិនមែនរដ្ឋាភិបាលក្នុងស្រុកដែលប្តេជ្ញាគាំទ្រកុមារ និងយុវជនងាយរងគ្រោះជាង ៣២០ នាក់នៅខេត្តសៀមរាប តាមរយៈការអប់រំ អាហារូបត្ថម្ភ សុខភាព និងសិល្បៈ។'
                : 'Anjali House is a grass-roots NGO founded during the Angkor Photography Festival in 2005. Today, we support over 320 children with comprehensive holistic care.'}
            </p>
          </div>
        </div>

        {/* Mission Card */}
        <div className="bg-white rounded-2xl p-4 shadow-xs border border-slate-100 space-y-2">
          <div className="flex items-center gap-2 text-[#087F4F]">
            <Sparkles className="w-4 h-4" />
            <h3 className="text-xs font-bold uppercase tracking-wider">
              {language === 'km' ? 'បេសកកម្មរបស់យើង' : 'Our Mission'}
            </h3>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            {language === 'km'
              ? 'ផ្តល់សិទ្ធិអំណាចដល់កុមារកម្ពុជាឱ្យសម្រេចបាននូវសក្តានុពលពេញលេញរបស់ពួកគេ និងក្លាយជាពលរដ្ឋដែលមានឯករាជ្យភាព ទំនួលខុសត្រូវ និងវិជ្ជាជីវៈខ្ពស់។'
              : 'To empower underprivileged Cambodian children to reach their full potential and become self-reliant, responsible adults through access to quality education, healthcare, and creative arts.'}
          </p>
        </div>

        {/* 4 Core Pillars */}
        <div className="space-y-2.5">
          <h3 className="text-xs font-bold text-slate-900 px-1">
            {language === 'km' ? 'សសរស្តម្ភទាំង ៤ នៃកម្មវិធី' : 'Our 4 Core Pillars'}
          </h3>
          <div className="grid grid-cols-1 gap-2">
            {pillars.map((p, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-3 border border-slate-100 shadow-2xs flex items-start gap-3"
              >
                <div className="p-2 rounded-xl bg-slate-50 shrink-0">
                  {p.icon}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">
                    {language === 'km' ? p.titleKm : p.titleEn}
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                    {p.descEn}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
