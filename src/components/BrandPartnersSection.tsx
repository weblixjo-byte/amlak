import React from 'react';
import { Brand } from '../types';

interface BrandPartnersSectionProps {
  isArabic?: boolean;
  brands: Brand[];
}

export const BrandPartnersSection: React.FC<BrandPartnersSectionProps> = ({ isArabic, brands }) => {
  if (!brands || brands.length === 0) return null;

  // Repeat brands array to guarantee at least 12 items for a rich infinite marquee track
  const repeatCount = Math.max(4, Math.ceil(12 / brands.length));
  const marqueeItems = Array(repeatCount).fill(brands).flat();

  return (
    <section className="w-full bg-[#FAFAFA] py-8 border-y border-neutral-200 font-ibm relative overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 mb-4 text-center">
        <p className="text-xs font-bold uppercase tracking-widest text-neutral-400">
          {isArabic ? 'شركاؤنا وعلاماتنا التجارية' : 'Our Brand Partners'}
        </p>
      </div>

      {/* Infinite scrolling marquee container */}
      <div className="relative w-full overflow-hidden">
        {/* Gradient Fades on edges */}
        <div className="absolute left-0 top-0 h-full w-20 z-10 pointer-events-none bg-gradient-to-r from-[#FAFAFA] to-transparent" />
        <div className="absolute right-0 top-0 h-full w-20 z-10 pointer-events-none bg-gradient-to-l from-[#FAFAFA] to-transparent" />

        <div
          className="flex items-center gap-6 animate-marquee py-2"
          style={{ width: 'max-content' }}
        >
          {marqueeItems.map((brand, i) => (
            <div
              key={`${brand.id}-${i}`}
              className="inline-flex items-center justify-center px-6 py-3 rounded-2xl bg-white border border-neutral-200 shadow-sm hover:border-[#1E3A8A] hover:shadow-md transition-all cursor-default h-14 min-w-[120px]"
            >
              {brand.imageUrl ? (
                <img
                  src={brand.imageUrl}
                  alt={brand.name}
                  className="h-8 max-w-[130px] object-contain"
                  onError={(e) => {
                    // Fallback to brand name text if image fails to load
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const parent = target.parentElement;
                    if (parent) {
                      let span = parent.querySelector('span');
                      if (!span) {
                        span = document.createElement('span');
                        span.className = 'text-sm font-bold text-neutral-800 font-ibm';
                        span.innerText = brand.name;
                        parent.appendChild(span);
                      }
                      span.style.display = 'inline-block';
                    }
                  }}
                />
              ) : (
                <span className="text-sm font-bold text-neutral-800 font-ibm tracking-wide">
                  {brand.name}
                </span>
              )}
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
          animation: marquee 25s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};
