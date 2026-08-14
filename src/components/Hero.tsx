import React from 'react';
import { BrushUnderline } from './ui/brush-underline';
import { AnimatedDotButton } from './ui/animated-dot-button';

interface HeroProps {
  onOpenInquiry: (itemTitle?: string) => void;
  isArabic: boolean;
}

export const Hero: React.FC<HeroProps> = ({ onOpenInquiry, isArabic }) => {
  return (
    <section id="home" className="relative w-full min-h-screen bg-neutral-950 overflow-hidden flex flex-col justify-between pt-32 pb-16 font-ibm">
      
      {/* Full-Bleed 4K Video Background */}
      <div className="absolute inset-0 w-full h-full">
        <video
          src="/videos/hero_bg.mp4"
          preload="auto"
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover object-center brightness-105 contrast-105"
        />
        {/* Subtle Dark Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#FAFAFA] via-black/40 to-black/50"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/30"></div>
      </div>

      {/* Hero Content Container - Shifted higher on mobile screens */}
      <div className="relative z-20 max-w-[1440px] w-full mx-auto px-6 md:px-12 pt-14 md:pt-20 pb-36 md:pb-20 flex flex-col justify-center md:justify-end flex-grow -mt-12 md:mt-0">
        
        {/* Direct Text Group */}
        <div className="max-w-4xl flex flex-col gap-6">
          
          {/* Main Direct Headline - Perfectly Balanced Typography Hierarchy */}
          <div className="flex flex-col gap-3 font-ibm">
            {isArabic ? (
              <>
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight drop-shadow-2xl">
                  عقارات وسيارات مميزة للبيع
                </h1>
                <div className="text-2xl md:text-4xl font-bold text-white tracking-tight">
                  <span className="relative inline-block pb-2">
                    أفضل الأسعار
                    <BrushUnderline color="#0D5C3A" />
                  </span>
                  <span className="mr-3 text-neutral-200">والخيارات المناسبة للجميع</span>
                </div>
              </>
            ) : (
              <>
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight drop-shadow-2xl">
                  Properties &amp; Vehicles For Sale
                </h1>
                <div className="text-2xl md:text-4xl font-bold text-white tracking-tight">
                  <span className="relative inline-block pb-2">
                    Best Prices
                    <BrushUnderline color="#0D5C3A" />
                  </span>
                  <span className="ml-3 text-neutral-200">&amp; Premium Options</span>
                </div>
              </>
            )}
          </div>

          {/* Description */}
          <p className="text-neutral-200 text-base md:text-lg font-normal leading-relaxed max-w-2xl drop-shadow-md">
            {isArabic
              ? 'منصة أملاك تساعدك في العثور على شقق، فيلل، وسيارات متوفرة للبيع بأفضل الأسعار وبسهولة تامة في عمّان وباقي المناطق.'
              : 'Amlak helps you discover available apartments, villas, and cars for sale at competitive prices across Amman.'}
          </p>

          {/* Action Buttons using AnimatedDotButton */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <AnimatedDotButton
              variant="blue"
              onClick={() => onOpenInquiry('طلب معاينة أو استفسار')}
              text={isArabic ? 'تواصل معنا للمعاينة' : 'Contact Us For Viewing'}
              isArabic={isArabic}
            />

            <AnimatedDotButton
              variant="black"
              onClick={() => {
                const el = document.getElementById('portfolio');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              text={isArabic ? 'استعرض العروض' : 'Browse Listings'}
              isArabic={isArabic}
            />
          </div>

        </div>

      </div>

    </section>
  );
};
