"use client";

import React, { useRef } from "react";
import { TimelineContent } from "../ui/timeline-animation";
import { AnimatedDotButton } from "../ui/animated-dot-button";
import { BrushUnderline } from "../ui/brush-underline";

interface AboutSectionProps {
  onOpenInquiry?: (itemTitle?: string) => void;
  isArabic?: boolean;
}

export function AboutSection({
  onOpenInquiry,
  isArabic = true,
}: AboutSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <section ref={sectionRef} id="about" className="w-full bg-[#FAFAFA] text-neutral-900 py-20 px-6 md:px-12 font-ibm overflow-hidden border-b border-neutral-200">
      <div className="max-w-[1440px] mx-auto space-y-16 md:space-y-24">
        
        {/* TOP SECTION: ABOUT US TITLE + HERO IMAGE + PHILOSOPHY */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left / Arabic Right: Huge Title & Description */}
          <div className="lg:col-span-5 space-y-6 text-right">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0D5C3A]/10 border border-[#0D5C3A]/30 text-[#0D5C3A] text-xs font-bold uppercase tracking-widest">
              <span>{isArabic ? "عن منصة أمـلاك" : "ABOUT AMLAK PLATFORM"}</span>
            </div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-neutral-950 uppercase tracking-tight leading-[0.95] font-ibm">
              {isArabic ? (
                <>
                  عـن<br />
                  <span className="relative inline-block text-[#1E3A8A]">
                    أمـلاك
                    <BrushUnderline color="#0D5C3A" />
                  </span>
                </>
              ) : (
                <>
                  ABOUT<br />
                  <span className="relative inline-block text-[#1E3A8A]">
                    AMLAK
                    <BrushUnderline color="#0D5C3A" />
                  </span>
                </>
              )}
            </h1>

            <div className="space-y-3 pt-2">
              <h3 className="text-base sm:text-lg font-bold text-neutral-900">
                {isArabic ? "خبرة عقارية وتداول استثماري متميز" : "Luxurious Real Estate & Vehicle Experience"}
              </h3>
              <p className="text-neutral-600 text-sm sm:text-base leading-relaxed max-w-md font-normal">
                {isArabic
                  ? "نؤمن في منصة أملاك بتقديم خيارات فاخرة ومعاينة مباشرة لكل عقار وسيارة معروضة بأعلى معايير الدقة والأمان في عمّان وباقي مناطق المملكة."
                  : "Modern Elegance: Designs featuring clean lines, neutral palettes, and high-quality verification across properties and exotic cars."}
              </p>
            </div>
          </div>

          {/* Middle: Featured Living Space Image */}
          <div className="lg:col-span-4 h-full min-h-[320px] md:min-h-[420px]">
            <div className="w-full h-full rounded-[2.5rem] overflow-hidden shadow-xl border border-neutral-200/80 group">
              <img
                src="/images/about_home.jpeg"
                alt="املاك تجربة سكنية فاخرة"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
            </div>
          </div>

          {/* Right / Arabic Left: Philosophy Card & Thumbnail */}
          <div className="lg:col-span-3 space-y-5 text-right flex flex-col justify-between h-full">
            <div className="w-full h-44 rounded-[2rem] overflow-hidden shadow-md border border-neutral-200">
              <img
                src="/images/dabouq_villa.jpg"
                alt="فلسفة المعاينة المباشرة"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-3 pt-1">
              <h3 className="text-xl font-extrabold text-neutral-950 tracking-tight font-ibm">
                {isArabic ? "رؤيتنا وفلسفتنا" : "Our Philosophy"}
              </h3>
              <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed font-normal">
                {isArabic
                  ? "في منصة أملاك، نهدف لتطوير تجربة شراء وتداول الملكيات الفاخرة عبر معاينات ميدانية مباشرة وتدقيق شامل للوثائق الرسمية، لتعكس تطلعات عملائنا."
                  : "At Amlak, we believe in creating seamless, direct viewing environments that reflect our clients' distinct lifestyle and asset goals."}
              </p>
            </div>
          </div>

        </div>

        {/* BOTTOM CONTAINER: MEET THE PRINCIPALS (BEIGE RECTANGLE WITH TEAM & STATEMENT) */}
        <div className="bg-[#F4F1EA] border border-neutral-200/80 rounded-[2.5rem] p-6 sm:p-8 md:p-12 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            
            {/* Left Executive Founder */}
            <div className="space-y-4 text-right">
              <div className="w-full h-[360px] md:h-[420px] rounded-[2rem] overflow-hidden shadow-lg border border-neutral-300/60 group relative">
                <img
                  src="/images/founder_1.jpg"
                  alt="طارق العبداللات - الشريك الرئيسي"
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80"></div>
                <div className="absolute bottom-6 right-6 text-white text-right">
                  <h4 className="text-2xl font-bold font-ibm">طارق العبداللات</h4>
                  <p className="text-xs text-neutral-300 uppercase tracking-widest font-semibold">المؤسس والشريك الرئيسي</p>
                </div>
              </div>
            </div>

            {/* Center Card: MEET THE PRINCIPALS Notch Statement */}
            <div className="bg-white rounded-[2rem] p-8 md:p-10 shadow-md border border-neutral-200/80 text-center flex flex-col justify-between items-center space-y-6 min-h-[380px] font-ibm">
              
              <div className="space-y-2">
                <span className="text-[11px] text-[#0D5C3A] font-extrabold uppercase tracking-widest bg-[#0D5C3A]/10 px-3 py-1 rounded-full">
                  {isArabic ? "فريق الإدارة والعمليات" : "EXECUTIVE TEAM"}
                </span>
                <h2 className="text-3xl sm:text-4xl font-black text-neutral-950 uppercase tracking-tight leading-tight">
                  {isArabic ? "فريق المعاينة والإدارة" : "MEET THE PRINCIPALS"}
                </h2>
              </div>

              {/* Decorative Thumbnail Strip */}
              <div className="flex items-center justify-center gap-2 py-2">
                <div className="w-16 h-10 rounded-full overflow-hidden border border-neutral-200 shadow-sm">
                  <img src="/images/about_home.jpeg" alt="معاينة" className="w-full h-full object-cover" />
                </div>
                <div className="w-20 h-10 rounded-full overflow-hidden border border-neutral-200 shadow-sm">
                  <img src="/images/hero_car.jpg" alt="سيارات" className="w-full h-full object-cover" />
                </div>
                <div className="w-16 h-10 rounded-full overflow-hidden border border-neutral-200 shadow-sm">
                  <img src="/images/jabal_amman.jpg" alt="شقق" className="w-full h-full object-cover" />
                </div>
              </div>

              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed max-w-sm font-normal">
                {isArabic
                  ? "يقوم كبار الشركاء والأخصائيين بمتابعة كل معاينة وتدقيق الملكية الميدانية في الموقع، لضمان السهولة التامة لجميع العملاء."
                  : "As principal executives, the founders oversee day-to-day operations of Amlak's direct viewing network and asset verification."}
              </p>

              <AnimatedDotButton
                variant="blue"
                onClick={() => onOpenInquiry && onOpenInquiry("حجز معاينة أو استفسار مع الإدارة")}
                text={isArabic ? "طلب معاينة مع الإدارة" : "Contact Management"}
                isArabic={isArabic}
                className="text-xs py-3"
              />

            </div>

            {/* Right Executive Founder */}
            <div className="space-y-4 text-right">
              <div className="w-full h-[360px] md:h-[420px] rounded-[2rem] overflow-hidden shadow-lg border border-neutral-300/60 group relative">
                <img
                  src="/images/founder_2.jpg"
                  alt="عمر الشريف - رئيس قسم التداول"
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80"></div>
                <div className="absolute bottom-6 right-6 text-white text-right">
                  <h4 className="text-2xl font-bold font-ibm">عمر الشريف</h4>
                  <p className="text-xs text-neutral-300 uppercase tracking-widest font-semibold">المؤسس ورئيس التداول</p>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

export default AboutSection;
