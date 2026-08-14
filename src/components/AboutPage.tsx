import React from 'react';
import { AboutSection } from './blocks/about-section';
import { CTAWithVerticalMarquee } from './ui/cta-with-text-marquee';
import { AnimatedDotButton } from './ui/animated-dot-button';

interface AboutPageProps {
  onOpenInquiry: (itemTitle?: string) => void;
  isArabic: boolean;
  onNavigateHome: () => void;
  onNavigateBuy: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({
  onOpenInquiry,
  isArabic,
  onNavigateHome,
  onNavigateBuy,
}) => {
  return (
    <div className="w-full min-h-screen bg-[#FAFAFA] text-neutral-900 pt-28 font-ibm">
      {/* Top Banner / Hero Header */}
      <div className="bg-white border-b border-neutral-200 py-12 px-6 md:px-12">
        <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 text-right">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0D5C3A]/10 border border-[#0D5C3A]/30 text-[#0D5C3A] text-xs font-bold uppercase tracking-widest">
              <span>{isArabic ? "صفحة منصة أمـلاك" : "ABOUT AMLAK PAGE"}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-neutral-950 tracking-tight font-ibm">
              {isArabic ? "الريادة في المعاينة والتداول المباشر" : "Pioneering Direct Real Estate & Exotic Car Trade"}
            </h1>
            <p className="text-sm md:text-base text-neutral-600 max-w-2xl font-normal">
              {isArabic
                ? "تعرّف على رؤيتنا وفريق القيادة والشركاء في منصة أملاك الأردنية المتخصصة بالعقارات والسيارات المعروضة للبيع."
                : "Learn about Amlak's vision, philosophy, and executive leadership behind direct viewing and verified property trade across Amman."}
            </p>
          </div>

          <AnimatedDotButton
            variant="black"
            onClick={onNavigateHome}
            text={isArabic ? "الرجوع للرئيسية" : "Back to Home"}
            isArabic={isArabic}
          />
        </div>
      </div>

      {/* Main Luxury About Section */}
      <AboutSection onOpenInquiry={onOpenInquiry} isArabic={isArabic} />

      {/* Bottom Contact & Marquee Section */}
      <CTAWithVerticalMarquee
        isArabic={isArabic}
        onOpenInquiry={onOpenInquiry}
        onNavigateBuy={onNavigateBuy}
      />
    </div>
  );
};

export default AboutPage;
