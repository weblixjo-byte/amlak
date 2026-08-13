import React from 'react';
import { ExperienceSection, ExperienceItem } from './ui/carousel-cards';
import { PropertyItem } from '../types';

interface CollectionProps {
  onOpenInquiry: (itemTitle?: string) => void;
  isArabic: boolean;
  properties: PropertyItem[];
  cars: PropertyItem[];
}

const mapToExperience = (item: PropertyItem, isArabic: boolean): ExperienceItem => ({
  id: item.id,
  title: isArabic ? item.titleAr : item.title,
  image: item.imageUrl,
  location: isArabic ? item.locationOrSpecsAr : item.locationOrSpecs,
  price: item.price,
  badge: isArabic ? item.badgeAr : item.badge,
  date: [item.specs.bedsOrHp, item.specs.bathsOrSpeed, item.specs.areaOrEngine]
    .filter(Boolean)
    .join(' • '),
});

export const Collection: React.FC<CollectionProps> = ({ onOpenInquiry, isArabic, properties, cars }) => {
  // Only show items marked as Featured on Homepage (Up to 10 max)
  const estateItems = properties
    .filter((p) => (!p.category || p.category === 'estate') && p.featured === true)
    .slice(0, 10)
    .map((p) => mapToExperience(p, isArabic));

  const carItems = cars
    .filter((c) => (!c.category || c.category === 'car') && c.featured === true)
    .slice(0, 10)
    .map((c) => mapToExperience(c, isArabic));

  // Don't render section if both are empty
  if (estateItems.length === 0 && carItems.length === 0) {
    return (
      <section id="portfolio" className="w-full bg-[#FAFAFA] py-20 relative font-ibm border-b border-neutral-200">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-neutral-900 tracking-tight font-ibm leading-tight mb-4">
            {isArabic ? 'عقارات وسيارات متوفرة للبيع' : 'Featured Properties & Vehicles'}
          </h2>
          <p className="text-neutral-400 text-sm">
            {isArabic ? 'لا توجد معروضات حالياً. أضف من لوحة التحكم.' : 'No listings yet. Add them from the dashboard.'}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="portfolio" className="w-full bg-[#FAFAFA] py-20 relative font-ibm border-b border-neutral-200">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 relative z-10">
        
        {/* Centered Title */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-14 gap-3">
          <h2 className="text-3xl md:text-5xl font-bold text-neutral-900 tracking-tight font-ibm leading-tight">
            {isArabic ? 'عقارات وسيارات متوفرة للبيع' : 'Featured Properties & Vehicles'}
          </h2>
          <p className="text-neutral-600 text-sm md:text-base font-normal max-w-xl">
            {isArabic
              ? 'تصفح المعروضات المتاحة حالياً مع خيارات معاينة مباشرة بأسعار منافسة.'
              : 'Browse available listings for sale with direct viewings.'}
          </p>
        </div>

        {/* Carousel Sections */}
        <div className="space-y-12">
          {estateItems.length > 0 && (
            <ExperienceSection
              title={isArabic ? 'عقارات وشقق مميزة ›' : 'Featured Properties ›'}
              items={estateItems}
              onItemClick={(title) => onOpenInquiry(title)}
            />
          )}

          {carItems.length > 0 && (
            <ExperienceSection
              title={isArabic ? 'سيارات فاخرة مجهزة للمعاينة ›' : 'Luxury Vehicles Available ›'}
              items={carItems}
              onItemClick={(title) => onOpenInquiry(title)}
            />
          )}
        </div>

      </div>
    </section>
  );
};
