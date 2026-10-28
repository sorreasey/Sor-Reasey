import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { ChevronLeft, Calendar, Clock, MapPin, Users, Plus, Check } from 'lucide-react';

export const EventsScreen: React.FC = () => {
  const { setMobileScreen, language, events } = useApp();
  const [joinedEvents, setJoinedEvents] = useState<string[]>([]);

  const toggleJoin = (id: string) => {
    if (joinedEvents.includes(id)) {
      setJoinedEvents(joinedEvents.filter(e => e !== id));
    } else {
      setJoinedEvents([...joinedEvents, id]);
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
          {language === 'km' ? 'ព្រឹត្តិការណ៍ និងសកម្មភាព' : 'Upcoming Events'}
        </h1>
        <div className="w-6"></div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3.5">
        {events.map((evt) => {
          const isJoined = joinedEvents.includes(evt.id);
          return (
            <div
              key={evt.id}
              className="bg-white rounded-2xl p-4 shadow-xs border border-slate-100 space-y-3 hover:border-emerald-200 transition-all"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 border border-purple-100 uppercase">
                    {evt.category}
                  </span>
                  <h3 className="text-sm font-bold text-slate-900 mt-1.5 leading-snug">
                    {language === 'km' ? evt.titleKhmer : evt.title}
                  </h3>
                </div>
              </div>

              <p className="text-xs text-slate-500 leading-relaxed">
                {evt.description}
              </p>

              <div className="space-y-1.5 pt-1 text-xs text-slate-600 border-t border-slate-50">
                <div className="flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-[#087F4F]" />
                  <span className="font-medium">{evt.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>{evt.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-rose-500" />
                  <span className="truncate">{evt.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-3.5 h-3.5 text-blue-500" />
                  <span>{evt.participants + (isJoined ? 1 : 0)} participants enrolled</span>
                </div>
              </div>

              <button
                onClick={() => toggleJoin(evt.id)}
                className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                  isJoined
                    ? 'bg-emerald-100 text-[#07583D]'
                    : 'bg-[#087F4F] hover:bg-[#07583D] text-white shadow-2xs'
                }`}
              >
                {isJoined ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#087F4F]" />
                    <span>{language === 'km' ? 'បានចុះឈ្មោះចូលរួមហើយ' : 'Enrolled (Joined)'}</span>
                  </>
                ) : (
                  <span>{language === 'km' ? 'ចុះឈ្មោះចូលរួម' : 'RSVP / Join Event'}</span>
                )}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
