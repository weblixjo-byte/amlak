"use client";

import React, { ReactNode, useEffect, useRef } from "react";
import { cn } from "../../lib/utils";
import { InteractiveHoverButton } from "./interactive-hover-button";

interface VerticalMarqueeProps {
  children: ReactNode;
  pauseOnHover?: boolean;
  reverse?: boolean;
  className?: string;
  speed?: number;
  onItemsRef?: (items: HTMLElement[]) => void;
}

function VerticalMarquee({
  children,
  pauseOnHover = false,
  reverse = false,
  className,
  speed = 22,
  onItemsRef,
}: VerticalMarqueeProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (onItemsRef && containerRef.current) {
      const items = Array.from(containerRef.current.querySelectorAll('.marquee-item')) as HTMLElement[];
      onItemsRef(items);
    }
  }, [onItemsRef]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "group flex flex-col overflow-hidden",
        className
      )}
      style={
        {
          "--duration": `${speed}s`,
        } as React.CSSProperties
      }
    >
      <div
        className={cn(
          "flex shrink-0 flex-col animate-marquee-vertical",
          reverse && "[animation-direction:reverse]",
          pauseOnHover && "group-hover:[animation-play-state:paused]"
        )}
      >
        {children}
      </div>
      <div
        className={cn(
          "flex shrink-0 flex-col animate-marquee-vertical",
          reverse && "[animation-direction:reverse]",
          pauseOnHover && "group-hover:[animation-play-state:paused]"
        )}
        aria-hidden="true"
      >
        {children}
      </div>
    </div>
  );
}

interface CTAWithVerticalMarqueeProps {
  isArabic?: boolean;
  onOpenInquiry?: (title?: string) => void;
  onNavigateBuy?: () => void;
}

export function CTAWithVerticalMarquee({
  isArabic = true,
  onOpenInquiry,
  onNavigateBuy,
}: CTAWithVerticalMarqueeProps) {
  const marqueeRef = useRef<HTMLDivElement>(null);

  const marqueeItems = isArabic
    ? [
        "شقق فاخرة في عمّان",
        "فيلل ومنازل مستقلة",
        "سيارات فاخرة ورياضية",
        "معاينة ميدانية فورية",
        "تسهيلات ونقل ملكية",
        "تداول مباشر بأمان",
      ]
    : [
        "Luxury Amman Apartments",
        "Independent Villas",
        "Exotic & Luxury Cars",
        "Instant On-Site Viewings",
        "Ownership Transfer Support",
        "Direct Safe Trading",
      ];

  useEffect(() => {
    const marqueeContainer = marqueeRef.current;
    if (!marqueeContainer) return;

    const updateOpacity = () => {
      const items = marqueeContainer.querySelectorAll('.marquee-item');
      const containerRect = marqueeContainer.getBoundingClientRect();
      const centerY = containerRect.top + containerRect.height / 2;

      items.forEach((item) => {
        const itemRect = item.getBoundingClientRect();
        const itemCenterY = itemRect.top + itemRect.height / 2;
        const distance = Math.abs(centerY - itemCenterY);
        const maxDistance = containerRect.height / 2;
        const normalizedDistance = Math.min(distance / maxDistance, 1);
        const opacity = 1 - normalizedDistance * 0.75;
        (item as HTMLElement).style.opacity = opacity.toString();
      });
    };

    const animationFrame = () => {
      updateOpacity();
      requestAnimationFrame(animationFrame);
    };

    const frame = requestAnimationFrame(animationFrame);

    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <section className="w-full bg-[#FAFAFA] text-neutral-900 py-24 px-6 md:px-12 overflow-hidden font-ibm border-t border-neutral-200 relative">
      
      {/* Background Decorative Soft Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#1E3A8A]/5 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-[1440px] mx-auto relative z-10 animate-fade-in-up">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          
          {/* Content Column */}
          <div className="space-y-8 max-w-xl text-right font-ibm">
            
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0D5C3A]/10 border border-[#0D5C3A]/30 text-[#0D5C3A] text-xs font-bold uppercase tracking-widest">
              <span>{isArabic ? "تواصل مباشر وحجز معاينة" : "DIRECT VIEWING & INQUIRY"}</span>
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-neutral-900 font-ibm">
              {isArabic ? (
                <>
                  اختر عقارك أو سيارتك القادمة واطلب{' '}
                  <span className="relative inline-block pb-1 text-[#1E3A8A] after:absolute after:bottom-0 after:right-0 after:w-full after:h-[4px] after:bg-[#0D5C3A] after:rounded-full">
                    معاينة فورية
                  </span>
                  .
                </>
              ) : (
                <>
                  Find your next asset and request an{' '}
                  <span className="relative inline-block pb-1 text-[#1E3A8A] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[4px] after:bg-[#0D5C3A] after:rounded-full">
                    instant viewing
                  </span>
                  .
                </>
              )}
            </h2>

            <p className="text-base md:text-lg text-neutral-600 leading-relaxed font-normal">
              {isArabic
                ? "فريق أملاك جاهز لمساعدتك في استكشاف أرقى العقارات والسيارات المعروضة للبيع، وترتيب معاينة ميدانية مباشرة في الموقع بدون وسطاء."
                : "The Amlak team is ready to schedule your direct on-site viewings for premium properties and luxury cars across Amman."}
            </p>

            {/* Action Buttons using InteractiveHoverButton */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <InteractiveHoverButton
                onClick={() => onOpenInquiry && onOpenInquiry("استفسار ومعاينة مباشرة")}
                text={isArabic ? "تواصل معنا الآن" : "Contact Us Now"}
                isArabic={isArabic}
                variant="primary"
                className="bg-[#1E3A8A] text-white border-[#1E3A8A] px-8 py-4 text-base"
              />

              {onNavigateBuy && (
                <InteractiveHoverButton
                  onClick={onNavigateBuy}
                  text={isArabic ? "قسم الشراء المباشر" : "Explore Buy Portal"}
                  isArabic={isArabic}
                  variant="dark"
                  className="bg-neutral-900 text-white border-neutral-900 px-8 py-4 text-base"
                />
              )}
            </div>

          </div>

          {/* Right Marquee Column */}
          <div ref={marqueeRef} className="relative h-[450px] md:h-[550px] flex items-center justify-center animate-fade-in-up">
            <div className="relative w-full h-full">
              <VerticalMarquee speed={22} className="h-full">
                {marqueeItems.map((item, idx) => (
                  <div
                    key={idx}
                    className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight py-6 text-center text-neutral-900 font-ibm marquee-item transition-opacity duration-300"
                  >
                    {item}
                  </div>
                ))}
              </VerticalMarquee>
              
              {/* Top vignette white gradient overlay */}
              <div className="pointer-events-none absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-[#FAFAFA] via-[#FAFAFA]/80 to-transparent z-10"></div>
              
              {/* Bottom vignette white gradient overlay */}
              <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#FAFAFA] via-[#FAFAFA]/80 to-transparent z-10"></div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default CTAWithVerticalMarquee;
