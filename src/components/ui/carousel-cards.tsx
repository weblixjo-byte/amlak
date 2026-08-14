import { ChevronLeft, ChevronRight, Heart } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { AnimatedDotButton } from "./animated-dot-button";

export interface ExperienceItem {
  id: string;
  title: string;
  image: string;
  location: string;
  price: number | string;
  currency?: string;
  rating?: number;
  reviewCount?: number;
  badge?: string;
  date?: string;
}

export interface ExperienceGridProps {
  title: string;
  items: ExperienceItem[];
  onItemClick?: (title: string) => void;
}

export const ExperienceCard = ({
  experience,
  onClick,
}: {
  experience: ExperienceItem;
  onClick?: () => void;
}) => (
  <div
    onClick={onClick}
    className="group relative flex h-[410px] min-w-[280px] sm:min-w-[300px] max-w-[310px] flex-col overflow-hidden rounded-2xl border border-neutral-200/90 bg-white shadow-sm transition-all duration-300 hover:shadow-xl cursor-pointer snap-start"
  >
    {/* Top Image Container with Heart & Golden 'مميز' Badge */}
    <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-100 p-2">
      <div className="w-full h-full rounded-xl overflow-hidden relative">
        <img
          alt={experience.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          src={experience.image}
        />

        {/* Favorite Heart Icon Button */}
        <button
          className="absolute top-2.5 right-2.5 z-10 h-8 w-8 rounded-full bg-white/90 text-neutral-800 backdrop-blur-md hover:bg-white hover:text-red-500 flex items-center justify-center shadow-md transition-all duration-300"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <Heart className="h-4 w-4 stroke-[2.2px]" />
        </button>

        {/* Golden Ribbon 'مميز' Badge matching user screenshot */}
        <div className="absolute bottom-0 left-0 z-10 bg-gradient-to-r from-[#F59E0B] to-[#F59E0B] text-white px-3.5 py-1 text-xs font-bold rounded-tr-xl shadow-md flex items-center gap-1 font-ibm">
          <span>مميز</span>
        </div>
      </div>
    </div>

    {/* Card Body */}
    <div className="flex flex-1 flex-col justify-between p-4 space-y-3 font-ibm">
      <div className="space-y-2">
        <h3 className="font-bold text-base tracking-tight text-neutral-900 line-clamp-2 leading-snug group-hover:text-[#1E3A8A] transition-colors min-h-[44px]">
          {experience.title}
        </h3>

        <div className="flex items-center gap-1.5 text-neutral-500 text-xs font-semibold">
          <span className="material-symbols-outlined text-[16px] text-[#0D5C3A]">location_on</span>
          <span className="truncate">{experience.location}</span>
        </div>

        {experience.date && (
          <div className="text-neutral-400 text-xs font-medium truncate pt-0.5">
            {experience.date}
          </div>
        )}
      </div>

      {/* Footer Price & Action Button */}
      <div className="pt-3 border-t border-neutral-100 flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-[10px] text-neutral-400 font-bold uppercase">سعر مباشر</span>
          <span className="text-base font-bold text-red-600 font-mono">
            {experience.currency ? `${experience.currency} ${experience.price}` : experience.price}
          </span>
        </div>

        <AnimatedDotButton
          variant="blue"
          text="طلب معاينة"
          className="px-4 py-2 text-xs"
        />
      </div>
    </div>
  </div>
);

export const ExperienceSection = ({
  title,
  items,
  onItemClick,
}: ExperienceGridProps) => {
  const scrollContainer = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Automated 1-card-at-a-time sliding carousel timer (slides 1 card every 3 seconds)
  useEffect(() => {
    const container = scrollContainer.current;
    if (!container || items.length <= 1) return;

    const interval = setInterval(() => {
      if (isHovered) return;

      const cardWidth = 316; // Single card width + gap
      const maxScroll = container.scrollWidth - container.clientWidth;

      if (Math.abs(container.scrollLeft) + cardWidth >= maxScroll - 20) {
        // Loop back smoothly to the beginning
        container.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        // Slide 1 card forward
        container.scrollBy({ left: -cardWidth, behavior: "smooth" });
      }
    }, 3200);

    return () => clearInterval(interval);
  }, [items.length, isHovered]);

  const handleScrollLeft = () => {
    if (scrollContainer.current) {
      scrollContainer.current.scrollBy({
        left: 316,
        behavior: "smooth",
      });
    }
  };

  const handleScrollRight = () => {
    if (scrollContainer.current) {
      scrollContainer.current.scrollBy({
        left: -316,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="w-full py-4 font-ibm">
      <div className="mx-auto max-w-[1440px] px-2 md:px-4">
        
        {/* Title Header */}
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-bold text-xl tracking-tight md:text-2xl text-neutral-900">
            {title}
          </h2>
        </div>

        {/* Carousel Container with Auto-slide & Side Control Arrows */}
        <div
          className="relative group/carousel"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Left Arrow Button */}
          <button
            onClick={handleScrollLeft}
            className="absolute -left-3 md:-left-6 top-1/2 -translate-y-1/2 z-20 h-11 w-11 rounded-full bg-white/95 hover:bg-white text-neutral-900 border border-neutral-300 shadow-xl backdrop-blur-md flex items-center justify-center transition-all duration-300 hover:scale-110 focus:outline-none"
            aria-label="Scroll left"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          {/* Right Arrow Button */}
          <button
            onClick={handleScrollRight}
            className="absolute -right-3 md:-right-6 top-1/2 -translate-y-1/2 z-20 h-11 w-11 rounded-full bg-white/95 hover:bg-white text-neutral-900 border border-neutral-300 shadow-xl backdrop-blur-md flex items-center justify-center transition-all duration-300 hover:scale-110 focus:outline-none"
            aria-label="Scroll right"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          {/* Single-card Slide Scroll Track */}
          <div
            className="scrollbar-hide flex snap-x snap-mandatory gap-5 overflow-x-auto px-1 pb-4 no-scrollbar scroll-smooth"
            ref={scrollContainer}
          >
            {items.map((item) => (
              <ExperienceCard
                key={item.id}
                experience={item}
                onClick={() => onItemClick && onItemClick(item.title)}
              />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default ExperienceSection;
