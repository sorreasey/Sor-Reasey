import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Newspaper,
  Calendar,
  Image as ImageIcon,
  Plus,
  Trash2,
  Edit,
  Tag,
  Clock,
  MapPin,
  Users,
  X
} from 'lucide-react';

export const AdminNewsEventsView: React.FC = () => {
  const { news, events, gallery, deleteNews, addNews, addEvent, language } = useApp();
  const [subTab, setSubTab] = useState<'news' | 'events' | 'gallery'>('news');

  // New News Modal
  const [showNewsModal, setShowNewsModal] = useState(false);
  const [newsTitle, setNewsTitle] = useState('');
  const [newsTitleKhmer, setNewsTitleKhmer] = useState('');
  const [newsSummary, setNewsSummary] = useState('');
  const [newsCategory, setNewsCategory] = useState<'Education' | 'Community' | 'Health' | 'Event'>('Education');

  const handleCreateNews = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsTitle) return;
    addNews({
      title: newsTitle,
      titleKhmer: newsTitleKhmer || newsTitle,
      summary: newsSummary,
      summaryKhmer: newsSummary,
      content: newsSummary,
      author: 'Panha Keo',
      imageUrl: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=600',
      category: newsCategory
    });
    setShowNewsModal(false);
    setNewsTitle('');
    setNewsSummary('');
  };

  return (
    <div className="space-y-5">
      {/* Subtab Selector */}
      <div className="flex items-center justify-between bg-white p-3 rounded-2xl border border-slate-200/80 shadow-xs">
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setSubTab('news')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              subTab === 'news'
                ? 'bg-[#087F4F] text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Newspaper className="w-3.5 h-3.5" />
            <span>News & Press ({news.length})</span>
          </button>

          <button
            onClick={() => setSubTab('events')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              subTab === 'events'
                ? 'bg-[#087F4F] text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Events Calendar ({events.length})</span>
          </button>

          <button
            onClick={() => setSubTab('gallery')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              subTab === 'gallery'
                ? 'bg-[#087F4F] text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5" />
            <span>Activity Gallery ({gallery.length})</span>
          </button>
        </div>

        {subTab === 'news' && (
          <button
            onClick={() => setShowNewsModal(true)}
            className="px-3 py-1.5 bg-[#087F4F] hover:bg-[#07583D] text-white text-xs font-bold rounded-xl shadow-xs flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Article</span>
          </button>
        )}
      </div>

      {/* News List */}
      {subTab === 'news' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {news.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-xs flex flex-col justify-between"
            >
              <div>
                <img src={item.imageUrl} alt={item.title} className="w-full h-40 object-cover" />
                <div className="p-4 space-y-2">
                  <div className="flex items-center justify-between text-[10px] text-slate-400">
                    <span className="font-bold text-[#087F4F] bg-emerald-50 px-2 py-0.5 rounded">
                      {item.category}
                    </span>
                    <span>{item.date}</span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 leading-snug">{item.title}</h3>
                  <p className="text-xs text-slate-500 line-clamp-2">{item.summary}</p>
                </div>
              </div>

              <div className="p-3 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
                <span className="text-[11px] text-slate-400">By {item.author}</span>
                <button
                  onClick={() => deleteNews(item.id)}
                  className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg transition-colors"
                  title="Delete article"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Events List */}
      {subTab === 'events' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {events.map((evt) => (
            <div
              key={evt.id}
              className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-50 text-purple-700">
                  {evt.category}
                </span>
                <span className="text-xs font-bold text-slate-600">{evt.date}</span>
              </div>
              <h3 className="text-sm font-bold text-slate-900">{evt.title}</h3>
              <p className="text-xs text-slate-500 line-clamp-2">{evt.description}</p>
              <div className="pt-2 border-t border-slate-100 text-xs text-slate-600 space-y-1">
                <p className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-slate-400" /> {evt.time}</p>
                <p className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-rose-500" /> {evt.location}</p>
                <p className="flex items-center gap-1.5"><Users className="w-3.5 h-3.5 text-blue-500" /> {evt.participants} Enrolled</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Gallery List */}
      {subTab === 'gallery' && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {gallery.map((g) => (
            <div key={g.id} className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-xs">
              <img src={g.imageUrl} alt={g.title} className="w-full h-36 object-cover" />
              <div className="p-3">
                <h4 className="text-xs font-bold text-slate-800 truncate">{g.title}</h4>
                <div className="flex items-center justify-between mt-1 text-[10px] text-slate-400">
                  <span className="text-emerald-700 font-semibold">{g.category}</span>
                  <span>{g.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add News Modal */}
      {showNewsModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-md p-6 shadow-2xl relative animate-in fade-in zoom-in-95">
            <button
              onClick={() => setShowNewsModal(false)}
              className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-600 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-base font-bold text-slate-900 mb-4">Add News Article</h3>
            <form onSubmit={handleCreateNews} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Title (English) *</label>
                <input
                  type="text"
                  required
                  value={newsTitle}
                  onChange={(e) => setNewsTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>
              <div>
                <label className="font-bold text-slate-700 block mb-1">Title (Khmer)</label>
                <input
                  type="text"
                  value={newsTitleKhmer}
                  onChange={(e) => setNewsTitleKhmer(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>
              <div>
                <label className="font-bold text-slate-700 block mb-1">Category</label>
                <select
                  value={newsCategory}
                  onChange={(e) => setNewsCategory(e.target.value as any)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                >
                  <option value="Education">Education</option>
                  <option value="Community">Community</option>
                  <option value="Health">Health</option>
                  <option value="Event">Event</option>
                </select>
              </div>
              <div>
                <label className="font-bold text-slate-700 block mb-1">Summary *</label>
                <textarea
                  required
                  rows={3}
                  value={newsSummary}
                  onChange={(e) => setNewsSummary(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl resize-none"
                ></textarea>
              </div>
              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowNewsModal(false)}
                  className="px-4 py-2 bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#087F4F] text-white font-bold rounded-xl"
                >
                  Save & Publish
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
