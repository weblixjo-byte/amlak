import React, { useState } from "react";
import { AnimatedDotButton } from "./animated-dot-button";
import { BrushUnderline } from "./brush-underline";
import { CheckCircle2, Building2, Car, Phone, MapPin, Tag, FileText, Check } from "lucide-react";

interface AddListingCTAProps {
  isArabic?: boolean;
  onOpenInquiry?: (title?: string) => void;
  onNavigateBuy?: () => void;
}

export function CTAWithVerticalMarquee({
  isArabic = true,
  onOpenInquiry,
  onNavigateBuy,
}: AddListingCTAProps) {
  // Form State
  const [listingType, setListingType] = useState<'estate' | 'car'>('estate');
  const [purpose, setPurpose] = useState<'sale' | 'rent'>('sale');
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [price, setPrice] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [ownerPhone, setOwnerPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    // Auto reset after 6s
    setTimeout(() => {
      setIsSubmitted(false);
      setTitle('');
      setLocation('');
      setPrice('');
      setOwnerName('');
      setOwnerPhone('');
      setNotes('');
    }, 6000);
  };

  return (
    <section id="add-listing" className="w-full bg-white text-neutral-900 py-20 px-6 md:px-12 overflow-hidden font-ibm border-t border-neutral-200 relative">
      
      {/* Subtle Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#1E3A8A]/5 rounded-full blur-[160px] pointer-events-none"></div>

      <div className="max-w-[1440px] mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* LEFT COLUMN: Text & Value Proposition */}
          <div className="lg:col-span-6 space-y-8 text-right font-ibm">
            
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0D5C3A]/10 border border-[#0D5C3A]/30 text-[#0D5C3A] text-xs font-bold uppercase tracking-widest">
              <Building2 className="w-4 h-4" />
              <span>{isArabic ? "إدراج ومعاينة مباشرة" : "DIRECT LISTINGS & VIEWINGS"}</span>
            </div>

            {/* Headline with thick emerald marker underline */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight tracking-tight text-neutral-950 font-ibm">
              {isArabic ? (
                <>
                  ترغب ببيع أو إيجار عقارك أو سيارتك؟{' '}
                  <span className="relative inline-block pb-2 text-[#1E3A8A] font-bold">
                    أضف معروضك الآن
                    <BrushUnderline color="#0D5C3A" />
                  </span>
                  .
                </>
              ) : (
                <>
                  Want to sell or rent your property or car?{' '}
                  <span className="relative inline-block pb-2 text-[#1E3A8A] font-bold">
                    List Your Asset Now
                    <BrushUnderline color="#0D5C3A" />
                  </span>
                  .
                </>
              )}
            </h2>

            <p className="text-base md:text-lg text-neutral-600 leading-relaxed font-normal">
              {isArabic
                ? "اعرض شقتك، فيلتك، أرضك، أو سيارتك الفاخرة مباشرة على منصة أملاك. يتكفل فريقنا بالتصوير الاحترافي، المعاينة المباشرة، والتسويق لأرقى المستثمرين في عمّان."
                : "List your property or vehicle directly on Amlak. Our team handles professional photography, direct viewings, and connecting you with qualified buyers."}
            </p>

            {/* Benefits Checkmarks */}
            <div className="space-y-3 pt-2 text-sm font-bold text-neutral-800">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#0D5C3A] shrink-0" />
                <span>{isArabic ? "معاينة ميدانية وتصوير احترافي مجاناً" : "Free professional photography and viewings"}</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#0D5C3A] shrink-0" />
                <span>{isArabic ? "وصول مباشر لآلاف المتابعين والمستثمرين المستهدفين" : "Direct access to thousands of targeted buyers"}</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#0D5C3A] shrink-0" />
                <span>{isArabic ? "متابعة قانونية كاملة حتى نقل الملكية واستلام المبلغ" : "Legal support through final ownership transfer"}</span>
              </div>
            </div>

            {/* Quick Inquiry Triggers */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <AnimatedDotButton
                variant="blue"
                onClick={() => {
                  const formEl = document.getElementById('listing-form-card');
                  if (formEl) formEl.scrollIntoView({ behavior: 'smooth' });
                }}
                text={isArabic ? "عبّي نموذج العرض" : "Fill Listing Form"}
                isArabic={isArabic}
              />

              {onNavigateBuy && (
                <AnimatedDotButton
                  variant="black"
                  onClick={onNavigateBuy}
                  text={isArabic ? "تصفح معروضات الشراء" : "Browse All Listings"}
                  isArabic={isArabic}
                />
              )}
            </div>

          </div>

          {/* RIGHT COLUMN: Interactive Form Card (Replacing Legacy Marquee) */}
          <div id="listing-form-card" className="lg:col-span-6">
            <div className="bg-[#F8FAFC] border border-neutral-200/90 rounded-3xl p-6 sm:p-8 shadow-xl text-right font-ibm relative overflow-hidden">
              
              {/* Form Title Header */}
              <div className="space-y-2 pb-5 border-b border-neutral-200">
                <div className="flex items-center gap-2 text-[#1E3A8A] font-extrabold text-lg">
                  <span className="material-symbols-outlined text-[24px]">post_add</span>
                  <h3>{isArabic ? "نموذج إضافة عقار أو سيارة" : "Add Property / Car Form"}</h3>
                </div>
                <p className="text-xs text-neutral-500 font-normal">
                  {isArabic
                    ? "أدخل تفاصيل المعروض وسيتواصل معك مستشار المعاينة خلال أقل من 24 ساعة."
                    : "Fill in listing details and our viewing team will contact you within 24 hours."}
                </p>
              </div>

              {isSubmitted ? (
                /* Success Message State */
                <div className="py-12 px-4 text-center space-y-4 animate-fade-in-up">
                  <div className="w-16 h-16 rounded-full bg-[#0D5C3A]/10 text-[#0D5C3A] flex items-center justify-center mx-auto shadow-sm">
                    <Check className="w-8 h-8 stroke-[3]" />
                  </div>
                  <h4 className="text-xl font-bold text-neutral-900">
                    {isArabic ? "تم إرسال طلب إدراج المعروض بنجاح!" : "Listing Submitted Successfully!"}
                  </h4>
                  <p className="text-xs text-neutral-600 max-w-sm mx-auto leading-relaxed">
                    {isArabic
                      ? "شكراً لك! قام نظام أملاك بتسجيل طلبك. سيتواصل معك أحد مستشارينا لمعاينة وتأكيد العقار/السيارة فوراً."
                      : "Thank you! Your request has been logged. Our viewing agent will contact you shortly."}
                  </p>
                </div>
              ) : (
                /* Interactive Form Fields */
                <form onSubmit={handleSubmit} className="space-y-4 pt-5 text-xs font-bold">
                  
                  {/* Listing Type & Purpose Selection */}
                  <div className="grid grid-cols-2 gap-3">
                    
                    {/* Category Selector */}
                    <div className="space-y-1.5">
                      <label className="text-neutral-600 block">{isArabic ? "نوع المعروض" : "Asset Type"}</label>
                      <div className="flex bg-neutral-200/70 p-1 rounded-xl">
                        <button
                          type="button"
                          onClick={() => setListingType('estate')}
                          className={`flex-1 py-2 rounded-lg text-xs transition-colors flex items-center justify-center gap-1 ${
                            listingType === 'estate' ? 'bg-white text-[#1E3A8A] shadow-sm font-extrabold' : 'text-neutral-600'
                          }`}
                        >
                          <Building2 className="w-3.5 h-3.5" />
                          <span>{isArabic ? "عـقـار" : "Property"}</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setListingType('car')}
                          className={`flex-1 py-2 rounded-lg text-xs transition-colors flex items-center justify-center gap-1 ${
                            listingType === 'car' ? 'bg-white text-[#1E3A8A] shadow-sm font-extrabold' : 'text-neutral-600'
                          }`}
                        >
                          <Car className="w-3.5 h-3.5" />
                          <span>{isArabic ? "سيـارة" : "Vehicle"}</span>
                        </button>
                      </div>
                    </div>

                    {/* Purpose Selector */}
                    <div className="space-y-1.5">
                      <label className="text-neutral-600 block">{isArabic ? "الغرض" : "Purpose"}</label>
                      <div className="flex bg-neutral-200/70 p-1 rounded-xl">
                        <button
                          type="button"
                          onClick={() => setPurpose('sale')}
                          className={`flex-1 py-2 rounded-lg text-xs transition-colors flex items-center justify-center gap-1 ${
                            purpose === 'sale' ? 'bg-white text-[#0D5C3A] shadow-sm font-extrabold' : 'text-neutral-600'
                          }`}
                        >
                          <span>{isArabic ? "للبيـع" : "Sale"}</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setPurpose('rent')}
                          className={`flex-1 py-2 rounded-lg text-xs transition-colors flex items-center justify-center gap-1 ${
                            purpose === 'rent' ? 'bg-white text-[#0D5C3A] shadow-sm font-extrabold' : 'text-neutral-600'
                          }`}
                        >
                          <span>{isArabic ? "للإيجـار" : "Rent"}</span>
                        </button>
                      </div>
                    </div>

                  </div>

                  {/* Title & Location Inputs */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <label className="text-neutral-600 flex items-center gap-1">
                        <FileText className="w-3.5 h-3.5 text-[#1E3A8A]" />
                        <span>{isArabic ? "عنوان المعروض" : "Title"}</span>
                      </label>
                      <input
                        required
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder={isArabic ? (listingType === 'estate' ? "مثال: شقة 160م للبيع" : "مثال: مرسيدس G63 2024") : "Title"}
                        className="w-full bg-white border border-neutral-300 rounded-xl px-3 py-2.5 text-neutral-900 focus:outline-none focus:border-[#1E3A8A]"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-neutral-600 flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-[#1E3A8A]" />
                        <span>{isArabic ? "الموقع / المنطقة" : "Location"}</span>
                      </label>
                      <input
                        required
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder={isArabic ? "مثال: دابوق / عبدون" : "Location"}
                        className="w-full bg-white border border-neutral-300 rounded-xl px-3 py-2.5 text-neutral-900 focus:outline-none focus:border-[#1E3A8A]"
                      />
                    </div>
                  </div>

                  {/* Price & Phone Inputs */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <label className="text-neutral-600 flex items-center gap-1">
                        <Tag className="w-3.5 h-3.5 text-[#1E3A8A]" />
                        <span>{isArabic ? "السعر المطلوب (دينار)" : "Expected Price"}</span>
                      </label>
                      <input
                        required
                        type="text"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder={isArabic ? "مثال: 95,000" : "Price"}
                        className="w-full bg-white border border-neutral-300 rounded-xl px-3 py-2.5 text-neutral-900 focus:outline-none focus:border-[#1E3A8A] font-mono"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-neutral-600 flex items-center gap-1">
                        <Phone className="w-3.5 h-3.5 text-[#1E3A8A]" />
                        <span>{isArabic ? "رقم الهاتف للتواصل" : "Phone Number"}</span>
                      </label>
                      <input
                        required
                        type="tel"
                        value={ownerPhone}
                        onChange={(e) => setOwnerPhone(e.target.value)}
                        placeholder="079XXXXXXX"
                        className="w-full bg-white border border-neutral-300 rounded-xl px-3 py-2.5 text-neutral-900 focus:outline-none focus:border-[#1E3A8A] font-mono dir-ltr text-right"
                      />
                    </div>
                  </div>

                  {/* Owner Name Input */}
                  <div className="space-y-1.5">
                    <label className="text-neutral-600 block">{isArabic ? "اسم صاحب المعروض" : "Owner Name"}</label>
                    <input
                      required
                      type="text"
                      value={ownerName}
                      onChange={(e) => setOwnerName(e.target.value)}
                      placeholder={isArabic ? "الاسم الكامل" : "Full Name"}
                      className="w-full bg-white border border-neutral-300 rounded-xl px-3 py-2.5 text-neutral-900 focus:outline-none focus:border-[#1E3A8A]"
                    />
                  </div>

                  {/* Notes & Description */}
                  <div className="space-y-1.5">
                    <label className="text-neutral-600 block">{isArabic ? "تفاصيل إضافية / مواصفات" : "Additional Notes"}</label>
                    <textarea
                      rows={2}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder={isArabic ? "اكتب أي تفاصيل أخرى عن العقار أو السيارة..." : "Notes..."}
                      className="w-full bg-white border border-neutral-300 rounded-xl px-3 py-2 text-neutral-900 focus:outline-none focus:border-[#1E3A8A]"
                    ></textarea>
                  </div>

                  {/* Submit Action */}
                  <div className="pt-2">
                    <AnimatedDotButton
                      variant="blue"
                      text={isArabic ? "إرسال طلب إدراج المعروض" : "Submit Listing Request"}
                      isArabic={isArabic}
                      className="w-full justify-center py-3.5 text-sm"
                    />
                  </div>

                </form>
              )}

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default CTAWithVerticalMarquee;
