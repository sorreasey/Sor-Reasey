import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import {
  ChevronLeft,
  Mail,
  Phone,
  Facebook,
  Send,
  MapPin,
  CheckCircle,
  X
} from 'lucide-react';

export const ContactScreen: React.FC = () => {
  const { setMobileScreen, language, submitContact } = useApp();
  const [showModal, setShowModal] = useState(false);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !message) return;

    submitContact({
      fullName,
      email: email || 'user@example.com',
      phone: phone || '+855 12 000 000',
      subject: subject || 'General Inquiry',
      message
    });

    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      setShowModal(false);
      setFullName('');
      setEmail('');
      setPhone('');
      setSubject('');
      setMessage('');
    }, 1800);
  };

  return (
    <div className="flex flex-col h-full bg-[#F5F7F6]">
      {/* App Bar matching Screen 4 */}
      <div className="bg-white px-4 py-3 border-b border-slate-100 flex items-center justify-between sticky top-0 z-20">
        <button
          onClick={() => setMobileScreen('home')}
          className="p-1 rounded-full text-slate-700 hover:bg-slate-100 transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="text-base font-bold text-slate-800">
          {language === 'km' ? 'ទំនាក់ទំនង' : 'Contact Us'}
        </h1>
        <div className="w-6"></div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Illustration Envelope Banner matching Screen 4 */}
        <div className="w-full h-36 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl flex items-center justify-center p-4 border border-emerald-100 relative overflow-hidden">
          <div className="w-20 h-20 rounded-2xl bg-white shadow-md flex items-center justify-center text-[#087F4F] relative z-10 border border-emerald-100">
            <Mail className="w-10 h-10 stroke-[1.5]" />
          </div>
          {/* Subtle paper plane / envelope art decorations */}
          <div className="absolute right-6 top-6 text-emerald-300 opacity-60">
            <Send className="w-12 h-12 rotate-12" />
          </div>
        </div>

        {/* Section title matching Screen 4 */}
        <div>
          <h2 className="text-lg font-bold text-slate-900">
            {language === 'km' ? 'ទំនាក់ទំនងមកកាន់យើង' : 'Get in Touch'}
          </h2>
          <p className="text-xs text-slate-500">
            {language === 'km' ? 'យើងរីករាយស្វាគមន៍ និងឆ្លើយតបសំណួររបស់អ្នក!' : 'We are here to help you!'}
          </p>
        </div>

        {/* Contact List Cards matching Screen 4 */}
        <div className="bg-white rounded-2xl p-3.5 shadow-xs border border-slate-100 space-y-3">
          {/* Phone */}
          <a
            href="tel:+85512345678"
            className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-50 transition-colors"
          >
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-[#087F4F] flex items-center justify-center shrink-0">
              <Phone className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[10px] text-slate-400 uppercase font-semibold">
                {language === 'km' ? 'ទូរស័ព្ទ' : 'Phone'}
              </p>
              <p className="text-xs font-bold text-slate-800">+855 12 345 678</p>
            </div>
          </a>

          {/* Email */}
          <a
            href="mailto:info@anjalihouse.org"
            className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-50 transition-colors"
          >
            <div className="w-9 h-9 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center shrink-0">
              <Mail className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[10px] text-slate-400 uppercase font-semibold">
                {language === 'km' ? 'អ៊ីមែល' : 'Email'}
              </p>
              <p className="text-xs font-bold text-slate-800">info@anjalihouse.org</p>
            </div>
          </a>

          {/* Facebook */}
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-50 transition-colors"
          >
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <Facebook className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[10px] text-slate-400 uppercase font-semibold">Facebook</p>
              <p className="text-xs font-bold text-slate-800">Anjali House NGO</p>
            </div>
          </a>

          {/* Telegram */}
          <a
            href="https://t.me"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-50 transition-colors"
          >
            <div className="w-9 h-9 rounded-xl bg-sky-50 text-sky-500 flex items-center justify-center shrink-0">
              <Send className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[10px] text-slate-400 uppercase font-semibold">Telegram</p>
              <p className="text-xs font-bold text-slate-800">@anjalihouse</p>
            </div>
          </a>

          {/* Address */}
          <div className="flex items-start gap-3 p-2 rounded-xl hover:bg-slate-50 transition-colors">
            <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0 mt-0.5">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[10px] text-slate-400 uppercase font-semibold">
                {language === 'km' ? 'អាសយដ្ឋាន' : 'Address'}
              </p>
              <p className="text-xs font-bold text-slate-800 leading-snug">
                {language === 'km'
                  ? 'ភូមិសាលាកន្សែង សង្កាត់ស្វាយដង្គំ ក្រុងសៀមរាប'
                  : 'Salakanseng Village, Siem Reap, Cambodia'}
              </p>
            </div>
          </div>
        </div>

        {/* Action Button matching Screen 4 */}
        <button
          onClick={() => setShowModal(true)}
          className="w-full py-3.5 px-4 bg-[#087F4F] hover:bg-[#07583D] active:scale-[0.99] text-white font-bold rounded-2xl shadow-sm transition-all text-sm flex items-center justify-center gap-2"
        >
          <Send className="w-4 h-4" />
          <span>{language === 'km' ? 'ផ្ញើសារមកកាន់យើង' : 'Send Message'}</span>
        </button>
      </div>

      {/* Message Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-sm p-5 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-600 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>

            {isSuccess ? (
              <div className="py-8 text-center space-y-3">
                <CheckCircle className="w-12 h-12 text-[#087F4F] mx-auto animate-bounce" />
                <h3 className="text-base font-bold text-slate-800">
                  {language === 'km' ? 'សារត្រូវបានផ្ញើរួចរាល់!' : 'Message Sent Successfully!'}
                </h3>
                <p className="text-xs text-slate-500">
                  {language === 'km'
                    ? 'បុគ្គលិករបស់យើងនឹងឆ្លើយតបមកកាន់លោកអ្នកក្នុងពេលឆាប់ៗ។'
                    : 'Our team will contact you back as soon as possible.'}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <h3 className="text-base font-bold text-slate-900 mb-1">
                  {language === 'km' ? 'ផ្ញើសារសាកសួរ' : 'Send us a message'}
                </h3>

                <div>
                  <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                    {language === 'km' ? 'ឈ្មោះពេញ' : 'Full Name *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Panha Keo"
                    className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#087F4F] focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                      {language === 'km' ? 'ទូរស័ព្ទ' : 'Phone'}
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+855 12 ..."
                      className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#087F4F] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                      {language === 'km' ? 'អ៊ីមែល' : 'Email'}
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@email.com"
                      className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#087F4F] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                    {language === 'km' ? 'កម្មវត្ថុ' : 'Subject'}
                  </label>
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="e.g. Class Schedule Inquiry"
                    className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#087F4F] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                    {language === 'km' ? 'ខ្លឹមសារសារ' : 'Message *'}
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Write your questions or notes here..."
                    className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#087F4F] focus:outline-none resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-[#087F4F] hover:bg-[#07583D] text-white text-xs font-bold rounded-xl shadow-xs transition-colors"
                >
                  {language === 'km' ? 'បញ្ជូនសារ' : 'Submit Message'}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
