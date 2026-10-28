import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { ChevronLeft, X, Image as ImageIcon, ZoomIn } from 'lucide-react';
import { GalleryItem } from '../../../types';

export const GalleryScreen: React.FC = () => {
  const { setMobileScreen, language, gallery } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activePhoto, setActivePhoto] = useState<GalleryItem | null>(null);

  const categories = ['All', 'Education', 'Art', 'Sports', 'Community'];

  const filteredItems = selectedCategory === 'All'
    ? gallery
    : gallery.filter(g => g.category === selectedCategory);

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
          {language === 'km' ? 'កម្រងរូបភាពសកម្មភាព' : 'Activity Gallery'}
        </h1>
        <div className="w-6"></div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {/* Category Filter Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`whitespace-nowrap px-3 py-1.5 rounded-xl font-medium transition-all ${
                selectedCategory === cat
                  ? 'bg-[#087F4F] text-white font-bold shadow-2xs'
                  : 'bg-white text-slate-600 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* 2-Column Photo Grid */}
        <div className="grid grid-cols-2 gap-2.5">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setActivePhoto(item)}
              className="bg-white rounded-2xl overflow-hidden shadow-2xs border border-slate-100 cursor-pointer group hover:border-emerald-200 transition-all relative"
            >
              <div className="relative aspect-4/3 overflow-hidden bg-slate-100">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                  <ZoomIn className="w-5 h-5 text-white" />
                </div>
              </div>
              <div className="p-2">
                <p className="text-[11px] font-bold text-slate-800 truncate">
                  {language === 'km' ? item.titleKhmer : item.title}
                </p>
                <div className="flex items-center justify-between mt-1 text-[9px] text-slate-400">
                  <span className="font-semibold text-emerald-700">{item.category}</span>
                  <span>{item.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activePhoto && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-slate-900 rounded-3xl w-full max-w-sm p-4 text-white relative animate-in fade-in zoom-in-95">
            <button
              onClick={() => setActivePhoto(null)}
              className="absolute top-4 right-4 p-1.5 text-slate-300 hover:text-white rounded-full bg-black/40"
            >
              <X className="w-5 h-5" />
            </button>

            <img
              src={activePhoto.imageUrl}
              alt={activePhoto.title}
              className="w-full max-h-[50vh] object-contain rounded-2xl mb-3"
            />

            <h3 className="text-sm font-bold">
              {language === 'km' ? activePhoto.titleKhmer : activePhoto.title}
            </h3>
            <p className="text-xs text-emerald-400 mt-0.5">
              {activePhoto.category} • {activePhoto.date}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
