import React from "react";
import { motion } from "framer-motion";

interface AboutSectionProps {
  onOpenInquiry?: (itemTitle?: string) => void;
  isArabic?: boolean;
}

export function AboutSection({ onOpenInquiry, isArabic = true }: AboutSectionProps) {
  return (
    <section id="why-us" className="py-24 bg-white font-ibm border-t border-neutral-200">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Editorial Visual Composition (Left in LTR / Right in RTL) */}
          <div className="lg:col-span-6 relative">
            <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl border border-neutral-200 aspect-[4/3] bg-neutral-100">
              <img
                src="/images/estate_interior.jpg"
                alt="أملاك - معروضات فاخرة"
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Overlapping secondary luxury image */}
            <div className="hidden sm:block absolute -bottom-8 -left-6 md:-left-8 z-20 w-3/5 aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
              <img
                src="/images/hero_car.jpg"
                alt="سيارات فاخرة مجهزة للمعاينة"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Subtle Brand Accent Box */}
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-[#1E3A8A]/5 rounded-3xl -z-0"></div>
          </div>

          {/* Editorial Content Column */}
          <div className="lg:col-span-6 space-y-8 text-right font-ibm">
            
            {/* Section Tag */}
            <span className="text-xs font-bold uppercase tracking-widest text-[#0D5C3A]">
              {isArabic ? "عن منصة أمـلاك" : "ABOUT AMLAK PLATFORM"}
            </span>

            {/* Human Editorial Headline */}
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-neutral-900 leading-tight font-ibm">
              {isArabic ? (
                <>
                  معاينة مـيدانية وتداول مباشر <br />
                  <span className="text-[#1E3A8A]">للعقارات والسيارات النخبوية في الأردن.</span>
                </>
              ) : (
                <>
                  Direct viewings &amp; premium trading <br />
                  <span className="text-[#1E3A8A]">for luxury assets in Jordan.</span>
                </>
              )}
            </h2>

            {/* Direct Copywriting */}
            <p className="text-base text-neutral-600 leading-relaxed font-normal">
              {isArabic
                ? "تأسست منصة أملاك لتقديم تجربة بيع وشراء راقية ومباشرة في عمّان وباقي المحافظات، بعيداً عن التعقيدات التقليدية. نحن نوفر معاينات ميدانية دقيقة وفحصاً شاملاً للملكيات والأوراق قبل إدراج أي عرض."
                : "Amlak Platform provides a direct, elevated experience for buying and inspecting high-end properties and luxury vehicles across Jordan."}
            </p>

            {/* 3 Human Trust Highlights */}
            <div className="space-y-5 pt-2 border-t border-neutral-100">
              {[
                {
                  titleAr: "توثيق الملكية والمعاينة الميدانية",
                  titleEn: "Verified Ownership & Physical Inspection",
                  descAr: "التأكد التام من سندات الطابو وحالة السيارات الفنية قبل العرض.",
                  descEn: "Thorough verification of title deeds and vehicle specs.",
                },
                {
                  titleAr: "ترتيب مواعيد معاينة خاصة",
                  titleEn: "Private Viewing Appointments",
                  descAr: "معاينة مباشرة في الموقع أو المعرض مع مالك العقار أو الشريك بدون وسطاء متعددين.",
                  descEn: "Direct viewings scheduled on-site with zero hassle.",
                },
                {
                  titleAr: "تسهيلات القانونية ونقل الملكية",
                  titleEn: "Legal & Transfer Support",
                  descAr: "متابعة كاملة لإجراءات البيع ونقل الملكية بسلاسة وأمان.",
                  descEn: "Full guidance through legal transfer processes.",
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
