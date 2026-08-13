import React, { useState } from 'react';

interface FooterProps {
  onOpenInquiry: (itemTitle?: string) => void;
  isArabic: boolean;
  onOpenSecretAdmin?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenInquiry, isArabic, onOpenSecretAdmin }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => {
        setEmail('');
        setSubscribed(false);
      }, 3000);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="w-full bg-[#0A0A0A] text-white border-t border-neutral-800/80 pt-16 pb-10 relative overflow-hidden font-ibm">
      
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 relative z-10">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 mb-12">
          
          {/* Column 1: Brand Info */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <a href="#" className="flex items-center group py-1">
              <img
                src="/images/amlaklogo.svg"
                alt="أمـلاك | AMLAK"
                className="h-10 md:h-12 w-auto object-contain brightness-0 invert"
              />
            </a>

            <p className="text-neutral-400 text-sm leading-relaxed max-w-sm font-normal">
              {isArabic
                ? 'منصة أملاك تقدم خدمات التسويق والوساطة للعقارات والسيارات الفاخرة، لتوفير أفضل الخيارات والأسعار للمشترين والمستثمرين.'
                : 'Amlak provides real estate and luxury car brokerage services to connect buyers with the best deals.'}
            </p>

            <div className="flex flex-col gap-1 pt-1 text-xs font-bold text-neutral-300">
              <span>{isArabic ? 'المواقع: عمّان • دبي • لندن • الرياض' : 'Locations: Amman • Dubai • London • Riyadh'}</span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="lg:col-span-3 flex flex-col gap-3">
            <h4 className="text-white text-xs font-bold uppercase tracking-wider border-b border-neutral-800 pb-2">
              {isArabic ? 'روابط سريعة' : 'QUICK LINKS'}
            </h4>
            <ul className="flex flex-col gap-2.5 text-sm text-neutral-400 font-bold">
              <li>
                <a href="#portfolio" className="hover:text-white transition-colors">
                  {isArabic ? 'العقارات والسيارات' : 'Listings'}
                </a>
              </li>
              <li>
                <a href="#why-us" className="hover:text-white transition-colors">
                  {isArabic ? 'عن المنصة' : 'About Platform'}
                </a>
              </li>
              <li>
                <button onClick={() => onOpenInquiry('طلب استفسار')} className="hover:text-white transition-colors text-right">
                  {isArabic ? 'تواصل معنا' : 'Contact Us'}
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Services */}
          <div className="lg:col-span-2 flex flex-col gap-3">
            <h4 className="text-white text-xs font-bold uppercase tracking-wider border-b border-neutral-800 pb-2">
              {isArabic ? 'الخدمات' : 'SERVICES'}
            </h4>
            <ul className="flex flex-col gap-2.5 text-sm text-neutral-400 font-bold">
              <li>
                <button onClick={() => onOpenInquiry('طلب معاينة عقار')} className="hover:text-white transition-colors text-right">
                  {isArabic ? 'معاينة عقار' : 'Property Viewing'}
                </button>
              </li>
              <li>
                <button onClick={() => onOpenInquiry('طلب معاينة سيارة')} className="hover:text-white transition-colors text-right">
                  {isArabic ? 'معاينة سيارة' : 'Car Viewing'}
                </button>
              </li>
              <li>
                <button onClick={() => onOpenInquiry('استفسار عام')} className="hover:text-white transition-colors text-right">
                  {isArabic ? 'استفسار عام' : 'General Inquiry'}
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Seamless Newsletter Column */}
          <div className="lg:col-span-3 flex flex-col gap-3">
            <h4 className="text-white text-xs font-bold uppercase tracking-wider border-b border-neutral-800 pb-2">
              {isArabic ? 'اشترك في النشرة البريدية' : 'NEWSLETTER'}
            </h4>

            <p className="text-neutral-400 text-xs leading-relaxed font-normal">
              {isArabic
                ? 'أدخل بريدك الإلكتروني ليصلك أحدث العروض والفرص المتاحة أولاً بأول.'
                : 'Enter your email to receive the latest available listings.'}
            </p>

            {subscribed ? (
              <div className="p-3 rounded-xl bg-[#1E3A8A]/20 text-white border border-[#1E3A8A]/40 text-xs font-bold text-center">
                {isArabic ? '✓ تم الاشتراك بنجاح' : '✓ Subscribed successfully'}
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex items-center gap-2 mt-1">
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={isArabic ? 'بريدك الإلكتروني...' : 'Your email...'}
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3.5 py-2.5 text-white text-xs font-bold focus:outline-none focus:border-[#1E3A8A] placeholder:text-neutral-500"
                />
                <button
                  type="submit"
                  className="bg-[#1E3A8A] hover:bg-[#1E3A8A] text-white px-4 py-2.5 rounded-xl font-bold text-xs transition-all shrink-0 flex items-center justify-center shadow-sm"
                >
                  <span>{isArabic ? 'اشتراك' : 'Join'}</span>
                </button>
              </form>
            )}

            <button
              onClick={() => onOpenInquiry('اتصال مباشر')}
              className="mt-2 w-full py-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-sm"
            >
              <span className="material-symbols-outlined text-[16px] text-blue-400">call</span>
              <span>{isArabic ? 'تواصل معنا مباشرة' : 'Contact Us Directly'}</span>
            </button>
          </div>

        </div>

        {/* Bottom Bar with Secret Admin Trigger */}
        <div className="pt-6 border-t border-neutral-800/80 flex flex-col md:flex-row justify-between items-center gap-4 text-neutral-500 text-xs font-bold">
          <div className="flex items-center gap-2">
            <span>&copy; {new Date().getFullYear()} AMLAK PLATFORM. ALL RIGHTS RESERVED.</span>
            {/* Secret Hidden Lock Icon for Admin Access */}
            <button
              onClick={onOpenSecretAdmin}
              className="text-neutral-700 hover:text-neutral-500 transition-colors p-1"
              title="Protected System"
            >
              <span className="material-symbols-outlined text-[14px]">lock</span>
            </button>
          </div>

          <div className="flex items-center gap-5">
            <a href="#" className="hover:text-white transition-colors">
              {isArabic ? 'سياسة الخصوصية' : 'Privacy Policy'}
            </a>
            <a href="#" className="hover:text-white transition-colors">
              {isArabic ? 'الشروط والأحكام' : 'Terms & Conditions'}
            </a>
            
            {/* Scroll to top button */}
            <button
              onClick={scrollToTop}
              className="w-9 h-9 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-white flex items-center justify-center transition-all ml-2"
              title="Back to top"
            >
              <span className="material-symbols-outlined text-[18px]">arrow_upward</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
