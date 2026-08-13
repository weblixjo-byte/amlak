import { ChevronLeft, ChevronRight, Heart, Star } from "lucide-react";
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

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
  viewAllHref?: string;
  onItemClick?: (title: string) => void;
}

export const ExperienceCard = ({
  experience,
  onClick,
}: {
  experience: ExperienceItem;
  onClick?: () => void;
}) => (
  <Card
    onClick={onClick}
    className="group relative flex h-[350px] w-full flex-col overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm transition-all duration-300 hover:shadow-lg cursor-pointer"
  >
    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-t-xl bg-neutral-100">
      <img
        alt={experience.title}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        src={experience.image}
      />
      <Button
        className="absolute top-2.5 right-2.5 z-10 rounded-full bg-white/80 text-neutral-700 backdrop-blur-sm hover:bg-white hover:text-[#1E3A8A]"
        size="icon"
        variant="ghost"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <Heart className="h-4 w-4 stroke-[2px]" />
        <span className="sr-only">Favorite</span>
      </Button>
      {experience.badge && (
        <Badge className="absolute top-2.5 left-2.5 rounded-md bg-[#1E3A8A] text-white px-2 py-0.5 font-bold text-xs shadow-sm">
          {experience.badge}
        </Badge>
      )}
    </div>

    <div className="flex flex-1 flex-col justify-between p-3">
      <CardContent className="p-0 space-y-1">
        <h3 className="font-bold text-base tracking-tight text-neutral-900 line-clamp-1 group-hover:text-[#1E3A8A] transition-colors font-ibm">
          {experience.title}
        </h3>
        <p className="text-neutral-500 text-xs tracking-tight font-medium flex items-center gap-1">
          <span className="material-symbols-outlined text-[14px] text-[#1E3A8A]">location_on</span>
          <span className="truncate">{experience.location}</span>
        </p>
        {experience.date && (
          <p className="text-neutral-400 text-[11px] tracking-tight font-medium">
            {experience.date}
          </p>
        )}
      </CardContent>

      <CardFooter className="mt-auto flex items-center justify-between p-0 pt-2 border-t border-neutral-100 font-ibm">
        {experience.rating ? (
          <span className="flex items-center gap-1 text-xs font-bold text-neutral-800">
            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
            {experience.rating}
            {experience.reviewCount && (
              <span className="text-neutral-400 font-normal">
                ({experience.reviewCount})
              </span>
            )}
          </span>
        ) : (
          <span className="text-[11px] text-neutral-500 font-bold">معاينة مباشرة</span>
        )}
        <span className="text-sm font-bold text-[#1E3A8A] font-mono">
          {experience.currency ? `${experience.currency} ${experience.price}` : experience.price}
        </span>
      </CardFooter>
    </div>
  </Card>
);

export const ExperienceSection = ({
  title,
  items,
  onItemClick,
}: ExperienceGridProps) => {
  const scrollContainer = React.useRef<HTMLDivElement>(null);

  const handleScrollLeft = () => {
    if (scrollContainer.current) {
      scrollContainer.current.scrollBy({
        left: -320,
        behavior: "smooth",
      });
    }
  };

  const handleScrollRight = () => {
    if (scrollContainer.current) {
      scrollContainer.current.scrollBy({
        left: 320,
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

        {/* Carousel Container with Left & Right Side Arrows */}
        <div className="relative group/carousel">
          
          {/* Left Arrow Button */}
          <button
            onClick={handleScrollLeft}
            className="absolute -left-3 md:-left-6 top-1/2 -translate-y-1/2 z-20 h-10 w-10 md:h-12 md:w-12 rounded-full bg-white/90 hover:bg-white text-neutral-900 border border-neutral-300 shadow-xl backdrop-blur-md flex items-center justify-center transition-all duration-300 hover:scale-110 focus:outline-none"
            aria-label="Scroll left"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          {/* Right Arrow Button */}
          <button
            onClick={handleScrollRight}
            className="absolute -right-3 md:-right-6 top-1/2 -translate-y-1/2 z-20 h-10 w-10 md:h-12 md:w-12 rounded-full bg-white/90 hover:bg-white text-neutral-900 border border-neutral-300 shadow-xl backdrop-blur-md flex items-center justify-center transition-all duration-300 hover:scale-110 focus:outline-none"
            aria-label="Scroll right"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          {/* Scrolling Track */}
          <div
            className="scrollbar-hide -mx-1 flex snap-x snap-mandatory gap-4 overflow-x-auto px-1 pb-4 no-scrollbar"
            ref={scrollContainer}
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {items.map((item) => (
              <div
                className="w-[280px] md:w-[320px] flex-none snap-start"
                key={item.id}
              >
                <ExperienceCard
                  experience={item}
                  onClick={() => onItemClick && onItemClick(item.title)}
                />
              </div>
            ))}
          </div>

        </div>

      </div>
    </div>
  );
};

export default function CarouselCards() {
  return null;
}
