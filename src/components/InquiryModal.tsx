import React, { useState } from 'react';
import { api } from '../lib/api';
import { AnimatedDotButton } from './ui/animated-dot-button';

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialItemTitle?: string;
  isArabic: boolean;
}

export const InquiryModal: React.FC<InquiryModalProps> = ({
  isOpen,
  onClose,
  initialItemTitle,
  isArabic,
}) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    interest: initialItemTitle || '',
    message: '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fadeIn font-ibm">
      <div className="relative w-full max-w-lg bg-white border border-neutral-300 rounded-2xl p-6 md:p-8 shadow-2xl overflow-hidden text-neutral-900">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-neutral-400 hover:text-neutral-900 transition-colors"
        >
          <span className="material-symbols-outlined text-[26px]">close</span>
        </button>

        {submitted ? (
          <div className="flex flex-col items-center justify-center py-10 text-center gap-3 animate-scaleUp">
            <div className="w-14 h-14 rounded-full bg-blue-100 border border-blue-400 flex items-center justify-center text-[#1E3A8A]">
              <span className="material-symbols-outlined text-[32px]">check_circle</span>
            </div>
            <h3 className="text-xl font-bold text-neutral-900">
              {isArabic ? 'تم استلام طلبك بنجاح' : 'Inquiry Received'}
            </h3>
            <p className="text-neutral-600 text-sm font-normal max-w-xs">
              {isArabic
                ? 'سنتواصل معك في أقرب وقت للتفاصيل والتنسيق.'
                : 'We will contact you shortly regarding your request.'}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="flex flex-col gap-1">
              <span className="text-[#1E3A8A] font-bold text-xs uppercase tracking-wider">
                {isArabic ? 'تواصل معنا' : 'CONTACT US'}
              </span>
              <h3 className="text-xl md:text-2xl font-bold text-neutral-900">
                {isArabic ? 'طلب استفسار أو معاينة' : 'Request Viewing or Details'}
              </h3>
            </div>

            <div className="flex flex-col gap-3.5">
              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1">
                  {isArabic ? 'الاسم الكامل' : 'Full Name'}
                </label>
                <input
                  required
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder={isArabic ? 'أدخل اسمك' : 'Your name'}
                  className="w-full bg-neutral-50 border border-neutral-300 focus:border-[#1E3A8A] rounded-xl px-3.5 py-3 text-neutral-900 text-sm font-bold focus:outline-none transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1">
                    {isArabic ? 'البريد الإلكتروني' : 'Email Address'}
                  </label>
                  <input
                    required
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@domain.com"
                    className="w-full bg-neutral-50 border border-neutral-300 focus:border-[#1E3A8A] rounded-xl px-3.5 py-3 text-neutral-900 text-sm font-bold focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1">
                    {isArabic ? 'رقم الهاتف' : 'Phone Number'}
                  </label>
                  <input
                    required
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+962 7X XXX XXXX"
                    className="w-full bg-neutral-50 border border-neutral-300 focus:border-[#1E3A8A] rounded-xl px-3.5 py-3 text-neutral-900 text-base font-bold focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1">
                  {isArabic ? 'موضوع الاستفسار' : 'Subject / Listing'}
                </label>
                <input
                  type="text"
                  value={formData.interest}
                  onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                  placeholder={isArabic ? 'اسم العقار أو السيارة' : 'Property or car name'}
                  className="w-full bg-neutral-50 border border-neutral-300 focus:border-[#1E3A8A] rounded-xl px-3.5 py-3 text-neutral-900 text-sm font-bold focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1">
                  {isArabic ? 'ملاحظات (اختياري)' : 'Message (Optional)'}
                </label>
                <textarea
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder={isArabic ? 'أدخل أي تفاصيل أو مواعيد تفضلها...' : 'Any specific details or questions...'}
                  className="w-full bg-neutral-50 border border-neutral-300 focus:border-[#1E3A8A] rounded-xl px-3.5 py-3 text-neutral-900 text-sm font-bold focus:outline-none transition-colors resize-none"
                />
              </div>
            </div>

            <AnimatedDotButton
              type="submit"
              variant="blue"
              text={isArabic ? 'إرسال الطلب' : 'Submit Request'}
              isArabic={isArabic}
              className="w-full justify-center mt-1 text-sm py-3.5"
            />
          </form>
        )}
      </div>
    </div>
  );
};
