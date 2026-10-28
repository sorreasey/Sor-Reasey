import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { ChevronLeft, Calendar, User, Plus, X, Tag } from 'lucide-react';
import { NewsItem } from '../../../types';

export const NewsScreen: React.FC = () => {
  const { setMobileScreen, language, news, addNews } = useApp();
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  // Form state
  const [title, setTitle] = useState('');
  const [titleKhmer, setTitleKhmer] = useState('');
  const [summary, setSummary] = useState('');
  const [summaryKhmer, setSummaryKhmer] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState<'Education' | 'Community' | 'Health' | 'Event'>('Education');

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !summary) return;

    addNews({
      title,
      titleKhmer: titleKhmer || title,
      summary,
      summaryKhmer: summaryKhmer || summary,
      content: content || summary,
      author: 'Anjali House Staff',
      imageUrl: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=600',
      category
    });

    setShowAddModal(false);
    setTitle('');
    setTitleKhmer('');
    setSummary('');
    setSummaryKhmer('');
    setContent('');
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
          {language === 'km' ? 'ព័ត៌មាន និងសេចក្តីជូនដំណឹង' : 'News & Announcements'}
        </h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="w-8 h-8 rounded-full bg-[#087F4F] text-white flex items-center justify-center hover:bg-[#07583D]"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {news.map((item) => (
          <div
            key={item.id}
            onClick={() => setSelectedNews(item)}
            className="bg-white rounded-2xl overflow-hidden shadow-xs border border-slate-100 hover:border-emerald-200 cursor-pointer active:scale-[0.99] transition-all group"
          >
            <div className="relative h-40 overflow-hidden">
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <span className="absolute top-3 left-3 bg-[#087F4F] text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">
                {item.category}
              </span>
            </div>

            <div className="p-3.5 space-y-2">
              <div className="flex items-center gap-3 text-[10px] text-slate-400 font-medium">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {item.date}
                </span>
                <span className="flex items-center gap-1">
                  <User className="w-3 h-3" />
                  {item.author}
                </span>
              </div>

              <h3 className="text-sm font-bold text-slate-900 group-hover:text-[#087F4F] transition-colors leading-snug">
                {language === 'km' ? item.titleKhmer : item.title}
              </h3>

              <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                {language === 'km' ? item.summaryKhmer : item.summary}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Article Detail Modal */}
      {selectedNews && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-sm max-h-[85vh] overflow-y-auto p-5 shadow-2xl relative animate-in fade-in zoom-in-95">
            <button
              onClick={() => setSelectedNews(null)}
              className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-600 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>

            <img
              src={selectedNews.imageUrl}
              alt={selectedNews.title}
              className="w-full h-44 rounded-2xl object-cover mb-3"
            />

            <span className="bg-emerald-100 text-[#07583D] text-[10px] font-bold px-2.5 py-0.5 rounded-full inline-block mb-2">
              {selectedNews.category}
            </span>

            <h2 className="text-base font-bold text-slate-900 leading-snug">
              {language === 'km' ? selectedNews.titleKhmer : selectedNews.title}
            </h2>

            <div className="flex items-center gap-3 text-[11px] text-slate-400 py-2 border-b border-slate-100 mb-3">
              <span>{selectedNews.date}</span>
              <span>•</span>
              <span>{selectedNews.author}</span>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed whitespace-pre-line">
              {language === 'km' ? selectedNews.summaryKhmer : selectedNews.summary}
              {'\n\n'}
              {selectedNews.content}
            </p>

            <button
              onClick={() => setSelectedNews(null)}
              className="w-full mt-4 py-2.5 bg-slate-100 text-slate-700 text-xs font-bold rounded-xl"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Add News Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-sm p-5 shadow-2xl relative animate-in fade-in zoom-in-95">
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-600 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-sm font-bold text-slate-900 mb-3">
              {language === 'km' ? 'ផ្សព្វផ្សាយព័ត៌មានថ្មី' : 'Publish New Article'}
            </h3>

            <form onSubmit={handleAddSubmit} className="space-y-3">
              <div>
                <label className="text-[10px] font-bold text-slate-700 block mb-1">Title (English) *</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Free Dental Kits Distribution"
                  className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-700 block mb-1">Title (Khmer)</label>
                <input
                  type="text"
                  value={titleKhmer}
                  onChange={(e) => setTitleKhmer(e.target.value)}
                  placeholder="ឧ. ការចែកសម្ភារៈអនាម័យធ្មេញ..."
                  className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-700 block mb-1">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                >
                  <option value="Education">Education</option>
                  <option value="Community">Community</option>
                  <option value="Health">Health</option>
                  <option value="Event">Event</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-700 block mb-1">Summary *</label>
                <textarea
                  required
                  rows={2}
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-[#087F4F] text-white text-xs font-bold rounded-xl shadow-xs"
              >
                Publish News
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
