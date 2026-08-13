import React from 'react';
import { Brand } from '../types';

interface BrandPartnersSectionProps {
  isArabic?: boolean;
  brands: Brand[];
}

export const BrandPartnersSection: React.FC<BrandPartnersSectionProps> = ({ isArabic, brands }) => {
  if (brands.length === 0) return null;

  // Duplicate for seamless infinite scroll
  const doubled = [...brands, ...brands];

  return (
    <section className="w-full bg-[#FAFAFA] py-10 border-y border-neutral-200 font-ibm relative overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 mb-5 text-center">
        <p className="text-xs font-bold uppercase tracking-widest text-neutral-400">
          {isArabic ? 'شركاؤنا وعلاماتنا التجارية' : 'Our Brand Partners'}
        </p>
      </div>

      {/* Infinite scrolling marquee */}
      <div className="relative overflow-hidden">
        {/* Left fade */}
        <div className="absolute left-0 top-0 h-full w-16 z-10 pointer-events-none bg-gradient-to-r from-[#FAFAFA] to-transparent" />
        {/* Right fade */}
        <div className="absolute right-0 top-0 h-full w-16 z-10 pointer-events-none bg-gradient-to-l from-[#FAFAFA] to-transparent" />

        <div
          className="flex items-center gap-6 animate-marquee"
          style={{ width: 'max-content' }}
        >
          {doubled.map((brand, i) => (
            <div
              key={`${brand.id}-${i}`}
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-white border border-neutral-200 shadow-sm hover:border-[#1E3A8A] transition-colors cursor-default h-14"
            >
              {brand.imageUrl ? (
                <img
                  src={brand.imageUrl}
                  alt={brand.name}
                  className="h-8 max-w-[120px] object-contain"
                  onError={(e) => {
                    // Fallback to text if image fails
                    (e.target as HTMLImageElement).style.display = 'none';
                    (e.target as HTMLImageElement).nextElementSibling?.removeAttribute('style');
                  }}
                />
              ) : null}
              <span
                className="text-sm font-bold text-neutral-700 whitespace-nowrap tracking-wide"
                style={brand.imageUrl ? { display: 'none' } : {}}
              >
                {brand.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};
