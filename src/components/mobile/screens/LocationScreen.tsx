import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { ChevronLeft, MapPin, Phone, Mail, Clock, ExternalLink, Navigation } from 'lucide-react';

export const LocationScreen: React.FC = () => {
  const { setMobileScreen, language } = useApp();
  const [mapType, setMapType] = useState<'map' | 'satellite'>('map');

  const latitude = 13.3633;
  const longitude = 103.8564;
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=Anjali+House+Siem+Reap`;

  return (
    <div className="flex flex-col h-full bg-[#F5F7F6]">
      {/* App Bar matching Screen 3 */}
      <div className="bg-white px-4 py-3 border-b border-slate-100 flex items-center justify-between sticky top-0 z-20">
        <button
          onClick={() => setMobileScreen('home')}
          className="p-1 rounded-full text-slate-700 hover:bg-slate-100 transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="text-base font-bold text-slate-800">
          {language === 'km' ? 'ទីតាំងអង្គការ' : 'Location'}
        </h1>
        <div className="w-6"></div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Map Container matching Screen 3 */}
        <div className="relative w-full h-56 bg-emerald-50 rounded-2xl overflow-hidden border border-slate-200 shadow-xs">
          {/* Stylized vector map canvas */}
          <div className="absolute inset-0 bg-[#E8ECE9] overflow-hidden">
            {/* Siem Reap River SVG curve */}
            <svg className="w-full h-full" viewBox="0 0 400 240" preserveAspectRatio="none">
              {/* Roads */}
              <line x1="0" y1="120" x2="400" y2="120" stroke="#FFFFFF" strokeWidth="8" />
              <line x1="160" y1="0" x2="160" y2="240" stroke="#FFFFFF" strokeWidth="6" />
              <line x1="280" y1="0" x2="280" y2="240" stroke="#FFFFFF" strokeWidth="6" />
              <line x1="0" y1="50" x2="400" y2="90" stroke="#FFFFFF" strokeWidth="5" />
              <line x1="50" y1="240" x2="350" y2="0" stroke="#FFFFFF" strokeWidth="4" />

              {/* Siem Reap River */}
              <path
                d="M 220 0 Q 240 60 210 120 T 250 240"
                fill="none"
                stroke="#93C5FD"
                strokeWidth="12"
                strokeLinecap="round"
              />

              {/* Landmarks text */}
              <text x="30" y="45" fill="#64748B" fontSize="11" fontWeight="bold">
                Angkor Wat 🏛️
              </text>
              <text x="35" y="195" fill="#64748B" fontSize="11" fontWeight="bold">
                Wat Bo
              </text>
              <text x="260" y="195" fill="#64748B" fontSize="10">
                Pub Street Area
              </text>
              <text x="270" y="55" fill="#64748B" fontSize="10">
                Siem Reap River
              </text>
            </svg>

            {/* Custom Anjali House Pin matching Screen 3 */}
            <div className="absolute top-[48%] left-[54%] -translate-x-1/2 -translate-y-full flex flex-col items-center">
              <div className="bg-white/95 px-2 py-0.5 rounded-md shadow-md border border-emerald-300 text-[10px] font-bold text-slate-800 whitespace-nowrap mb-1 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-[#087F4F]"></span>
                Anjali House
              </div>
              <div className="w-8 h-8 rounded-full bg-rose-600 border-2 border-white shadow-lg flex items-center justify-center animate-bounce">
                <MapPin className="w-5 h-5 text-white fill-current" />
              </div>
            </div>

            {/* Google Watermark */}
            <div className="absolute bottom-2 left-2.5 flex items-center gap-1 bg-white/80 backdrop-blur-xs px-2 py-0.5 rounded text-[10px] font-bold text-slate-600 shadow-2xs">
              <span className="text-blue-500">G</span>
              <span className="text-red-500">o</span>
              <span className="text-yellow-500">o</span>
              <span className="text-blue-500">g</span>
              <span className="text-green-500">l</span>
              <span className="text-red-500">e</span>
            </div>
          </div>
        </div>

        {/* Info Card matching Screen 3 */}
        <div className="bg-white rounded-2xl p-4 shadow-xs border border-slate-100 space-y-3.5">
          <div>
            <h2 className="text-base font-bold text-slate-900">Anjali House</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              {language === 'km'
                ? 'ភូមិសាលាកន្សែង សង្កាត់ស្វាយដង្គំ ក្រុងសៀមរាប'
                : 'Salakanseng Village, Siem Reap, Cambodia'}
            </p>
          </div>

          <hr className="border-slate-100" />

          {/* Details list */}
          <div className="space-y-2.5 text-xs">
            <div className="flex items-center gap-3 text-slate-700">
              <div className="w-8 h-8 rounded-xl bg-emerald-50 text-[#087F4F] flex items-center justify-center shrink-0">
                <Phone className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block">{language === 'km' ? 'លេខទូរស័ព្ទ' : 'Phone'}</span>
                <span className="font-semibold">+855 12 345 678</span>
              </div>
            </div>

            <div className="flex items-center gap-3 text-slate-700">
              <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                <Mail className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block">{language === 'km' ? 'អ៊ីមែល' : 'Email'}</span>
                <span className="font-semibold">info@anjalihouse.org</span>
              </div>
            </div>

            <div className="flex items-center gap-3 text-slate-700">
              <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block">{language === 'km' ? 'ម៉ោងធ្វើការ' : 'Working Hours'}</span>
                <span className="font-semibold">Mon - Sat: 7:30 AM - 5:30 PM</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Button matching Screen 3 */}
        <a
          href={googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-3.5 px-4 bg-[#087F4F] hover:bg-[#07583D] active:scale-[0.99] text-white font-bold rounded-2xl shadow-sm transition-all flex items-center justify-center gap-2 text-sm text-center"
        >
          <Navigation className="w-4 h-4" />
          <span>{language === 'km' ? 'បើកមើលក្នុង Google Maps' : 'Open in Google Maps'}</span>
        </a>
      </div>
    </div>
  );
};
