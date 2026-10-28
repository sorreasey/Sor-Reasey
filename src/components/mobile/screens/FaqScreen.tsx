import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { ChevronLeft, ChevronDown, ChevronRight, HelpCircle, Plus, CheckCircle, X } from 'lucide-react';

export const FaqScreen: React.FC = () => {
  const { setMobileScreen, language, faqs, submitFaqQuestion } = useApp();
  const [activeTab, setActiveTab] = useState<'all' | 'my'>('all');
  const [expandedId, setExpandedId] = useState<string | null>('FAQ-01');
  const [showAskModal, setShowAskModal] = useState(false);
  const [newQuestion, setNewQuestion] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const displayedFaqs = activeTab === 'all' ? faqs : faqs.filter(f => f.isUserQuestion);

  const handleAskSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestion.trim()) return;

    submitFaqQuestion(newQuestion.trim());
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      setShowAskModal(false);
      setNewQuestion('');
      setActiveTab('my');
    }, 1500);
  };

  return (
    <div className="flex flex-col h-full bg-[#F5F7F6]">
      {/* App Bar matching Screen 5 */}
      <div className="bg-white px-4 py-3 border-b border-slate-100 flex items-center justify-between sticky top-0 z-20">
        <button
          onClick={() => setMobileScreen('home')}
          className="p-1 rounded-full text-slate-700 hover:bg-slate-100 transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="text-base font-bold text-slate-800">
          {language === 'km' ? 'សំណួរ-ចម្លើយ (Q&A / FAQ)' : 'Q&A / FAQ'}
        </h1>
        <div className="w-6"></div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Tabs: All Questions vs My Questions matching Screen 5 */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'all'
                ? 'bg-[#087F4F] text-white shadow-xs'
                : 'bg-white text-slate-600 border border-slate-200'
            }`}
          >
            {language === 'km' ? 'សំណួរទាំងអស់' : 'All Questions'}
          </button>

          <button
            onClick={() => setActiveTab('my')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'my'
                ? 'bg-[#087F4F] text-white shadow-xs'
                : 'bg-white text-slate-600 border border-slate-200'
            }`}
          >
            {language === 'km' ? 'សំណួររបស់ខ្ញុំ' : 'My Questions'}
          </button>
        </div>

        {/* Accordion Questions List matching Screen 5 */}
        <div className="space-y-2.5">
          {displayedFaqs.length === 0 ? (
            <div className="bg-white rounded-2xl p-6 text-center text-slate-400 text-xs">
              {language === 'km'
                ? 'មិនទាន់មានសំណួរផ្ទាល់ខ្លួននៅឡើយទេ'
                : 'You have not submitted any questions yet.'}
            </div>
          ) : (
            displayedFaqs.map((faq) => {
              const isExpanded = expandedId === faq.id;
              return (
                <div
                  key={faq.id}
                  className="bg-white rounded-2xl border border-slate-100/90 shadow-2xs overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setExpandedId(isExpanded ? null : faq.id)}
                    className="w-full text-left p-3.5 flex items-center justify-between gap-3 hover:bg-slate-50/50 transition-colors"
                  >
                    <span className="text-xs font-semibold text-slate-800 leading-snug">
                      {language === 'km' ? faq.questionKhmer : faq.question}
                    </span>
                    {isExpanded ? (
                      <ChevronDown className="w-4 h-4 text-[#087F4F] shrink-0" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
                    )}
                  </button>

                  {isExpanded && (
                    <div className="px-3.5 pb-3.5 pt-1 text-xs text-slate-600 leading-relaxed border-t border-slate-50 bg-slate-50/40">
                      <p>{language === 'km' ? faq.answerKhmer : faq.answer}</p>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Bottom Sticky Action Button matching Screen 5 */}
      <div className="p-4 bg-white border-t border-slate-100">
        <button
          onClick={() => setShowAskModal(true)}
          className="w-full py-3.5 px-4 bg-[#087F4F] hover:bg-[#07583D] active:scale-[0.99] text-white font-bold rounded-2xl shadow-sm transition-all text-sm flex items-center justify-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>{language === 'km' ? 'សួរសំណួរថ្មី' : 'Ask a Question'}</span>
        </button>
      </div>

      {/* Ask Question Modal */}
      {showAskModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-sm p-5 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setShowAskModal(false)}
              className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-600 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>

            {isSuccess ? (
              <div className="py-6 text-center space-y-2">
                <CheckCircle className="w-12 h-12 text-[#087F4F] mx-auto animate-bounce" />
                <h3 className="text-sm font-bold text-slate-800">
                  {language === 'km' ? 'សំណួររបស់អ្នកត្រូវបានកត់ត្រា!' : 'Question Submitted!'}
                </h3>
                <p className="text-xs text-slate-500">
                  {language === 'km'
                    ? 'ក្រុមការងារនឹងឆ្លើយតបក្នុងបញ្ជី "សំណួររបស់ខ្ញុំ"។'
                    : 'Our staff will review and answer in your My Questions tab.'}
                </p>
              </div>
            ) : (
              <form onSubmit={handleAskSubmit} className="space-y-3">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-8 h-8 rounded-xl bg-emerald-50 text-[#087F4F] flex items-center justify-center">
                    <HelpCircle className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-900">
                    {language === 'km' ? 'ដាក់សំណួរសាកសួរថ្មី' : 'Ask Anjali House Staff'}
                  </h3>
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                    {language === 'km' ? 'សំណួររបស់អ្នក' : 'Your Question *'}
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={newQuestion}
                    onChange={(e) => setNewQuestion(e.target.value)}
                    placeholder={
                      language === 'km'
                        ? 'សូមសរសេរសំណួររបស់អ្នកនៅទីនេះ...'
                        : 'e.g. How do I apply for the computer classes this semester?'
                    }
                    className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#087F4F] focus:outline-none resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-[#087F4F] hover:bg-[#07583D] text-white text-xs font-bold rounded-xl shadow-xs transition-colors"
                >
                  {language === 'km' ? 'បញ្ជូនសំណួរ' : 'Post Question'}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
