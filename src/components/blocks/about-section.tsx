import React from "react";

interface AboutSectionProps {
  onOpenInquiry?: (itemTitle?: string) => void;
  isArabic?: boolean;
}

export function AboutSection({ onOpenInquiry, isArabic = true }: AboutSectionProps) {
  return (
    <section id="why-us" className="py-24 bg-white font-ibm border-t border-neutral-200">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Clean Single Luxury Showcase Image */}
          <div className="lg:col-span-6 relative">
            <div className="relative z-10 rounded-3xl overflow-hidden shadow-xl border border-neutral-200 aspect-[4/3] bg-neutral-100">
              <img
                src="/images/about_home.jpeg"
                alt="أملاك - معروضات متميزة"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://www.homes-jordan.com/uploads/services/67ddc056-d058-4401-bf72-61593fc10145-20230225071248.jpeg';
                }}
              />
            </div>
          </div>

          {/* Editorial Content Column */}
          <div className="lg:col-span-6 space-y-8 text-right font-ibm">
            
            {/* Section Tag */}
            <span className="text-xs font-bold uppercase tracking-widest text-[#0D5C3A]">
              {isArabic ? "عن منصة أمـلاك" : "ABOUT AMLAK PLATFORM"}
            </span>

            {/* Natural, Friendly Headline with 1 Blue Word + Emerald Underline */}
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-neutral-900 leading-tight font-ibm">
              {isArabic ? (
                <>
                  معاينة وسهولة في الشراء{' '}
                  <span className="relative inline-block pb-2 text-[#1E3A8A] after:absolute after:bottom-0 after:right-0 after:w-full after:h-[4px] after:bg-[#0D5C3A] after:rounded-full">
                    مباشرة
                  </span>{' '}
                  لكل عقار وسيارة.
                </>
              ) : (
                <>
                  Easy viewing and direct{' '}
                  <span className="relative inline-block pb-2 text-[#1E3A8A] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[4px] after:bg-[#0D5C3A] after:rounded-full">
                    purchase
                  </span>{' '}
                  for properties &amp; cars.
                </>
              )}
            </h2>

            {/* Friendly, Direct, Grounded Copywriting */}
            <p className="text-base text-neutral-600 leading-relaxed font-normal">
              {isArabic
                ? "في منصة أملاك، بنسهل عليك تلاقي عقارك أو سيارتك القادمة بدون تعقيدات. بنوفرلك معاينات ميدانية وتأكد كامل من الملكية والأوراق قبل ما تشتري، لتختار براحتك وأمان."
                : "At Amlak, we make it simple to find your next property or car with direct viewings and full paperwork verification before purchase."}
            </p>

            {/* 3 Friendly Trust Points */}
            <div className="space-y-5 pt-2 border-t border-neutral-100">
              {[
                {
                  titleAr: "معاينة ميدانية وتأكد من الأوراق",
                  titleEn: "Physical Inspection & Document Check",
                  descAr: "بنفحص سندات الملكية والطابو وحالة السيارة قبل العرض لتشتري وأنت مطمن.",
                  descEn: "We verify title deeds and vehicle condition before listing.",
                },
                {
                  titleAr: "تواصل ومعاينة مباشرة",
                  titleEn: "Direct Communication & Viewing",
                  descAr: "بترتب موعد معاينة بالموقع أو المعرض مباشرة وبدون تعقيدات.",
                  descEn: "Schedule on-site viewings directly without middleman hassle.",
                },
                {
                  titleAr: "تسهيلات وإجراءات سريعة",
                  titleEn: "Fast Ownership Transfer",
                  descAr: "بنسهل عليك إجراءات نقل الملكية لتكمل الشراء بسهولة وسرعة.",
                  descEn: "Smooth legal and paperwork transfer for peace of mind.",
                },
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-4 text-right">
                  <div className="w-8 h-8 rounded-full bg-[#0D5C3A]/10 text-[#0D5C3A] flex items-center justify-center font-bold text-sm shrink-0 mt-1">
                    ✓
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-neutral-900 font-ibm">
                      {isArabic ? item.titleAr : item.titleEn}
                    </h4>
                    <p className="text-xs text-neutral-500 mt-1 font-normal">
                      {isArabic ? item.descAr : item.descEn}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Direct Action Buttons */}
            <div className="pt-4 flex flex-wrap gap-4 items-center">
              <button
                onClick={() => onOpenInquiry && onOpenInquiry('طلب حجز معاينة خاصة')}
                className="bg-[#1E3A8A] hover:bg-[#16316e] text-white px-8 py-3.5 rounded-2xl font-bold text-sm transition-all shadow-md hover:scale-105"
              >
                {isArabic ? "حجز معاينة الآن" : "Schedule Viewing"}
              </button>
              
              <button
                onClick={() => {
                  const el = document.getElementById('portfolio');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-neutral-100 hover:bg-neutral-200 text-neutral-900 px-8 py-3.5 rounded-2xl font-bold text-sm transition-all"
              >
                {isArabic ? "استعرض العروض المتاحة" : "Explore Listings"}
              </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
