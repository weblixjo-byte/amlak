import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Brand } from '../types';

interface BrandPartnersSectionProps {
  isArabic?: boolean;
  brands: Brand[];
}

const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const distributeItems = (items: Brand[], columnCount: number): Brand[][] => {
  if (items.length === 0) return [];
  const shuffled = shuffleArray(items);
  const columns: Brand[][] = Array.from({ length: columnCount }, () => []);

  shuffled.forEach((item, index) => {
    columns[index % columnCount].push(item);
  });

  const maxLength = Math.max(...columns.map((col) => col.length));
  columns.forEach((col) => {
    while (col.length < maxLength && col.length > 0) {
      col.push(shuffled[Math.floor(Math.random() * shuffled.length)]);
    }
  });

  return columns;
};

const BrandColumn: React.FC<{ brands: Brand[]; index: number; currentTime: number }> = React.memo(
  ({ brands, index, currentTime }) => {
    const cycleInterval = 2400;
    const columnDelay = index * 280;
    const adjustedTime = (currentTime + columnDelay) % (cycleInterval * Math.max(1, brands.length));
    const currentIndex = Math.floor(adjustedTime / cycleInterval) % Math.max(1, brands.length);
    const currentBrand = brands[currentIndex];

    if (!currentBrand) return null;

    return (
      <motion.div
        className="relative h-20 w-44 md:h-24 md:w-64 overflow-hidden flex items-center justify-center bg-transparent"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1, duration: 0.5, ease: 'easeOut' }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={`${currentBrand.id}-${currentIndex}`}
            className="absolute inset-0 flex items-center justify-center p-2"
            initial={{ y: '25%', opacity: 0, filter: 'blur(6px)' }}
            animate={{
              y: '0%',
              opacity: 1,
              filter: 'blur(0px)',
              transition: {
                type: 'spring',
                stiffness: 280,
                damping: 24,
                bounce: 0.15,
                duration: 0.6,
              },
            }}
            exit={{
              y: '-25%',
              opacity: 0,
              filter: 'blur(6px)',
              transition: { type: 'tween', ease: 'easeIn', duration: 0.35 },
            }}
          >
            {/* Clean Transparent Backdrop - Bigger Logos */}
            <div className="inline-flex items-center justify-center p-2 rounded-2xl bg-transparent transition-all cursor-default h-full w-full text-center">
              {currentBrand.imageUrl ? (
                <img
                  src={currentBrand.imageUrl}
                  alt={currentBrand.name}
                  className="h-12 md:h-16 max-w-[180px] md:max-w-[230px] object-contain drop-shadow-sm filter grayscale hover:grayscale-0 transition-all duration-300"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const parent = target.parentElement;
                    if (parent) {
                      let span = parent.querySelector('span');
                      if (!span) {
                        span = document.createElement('span');
                        span.className = 'text-base md:text-xl font-bold text-neutral-900 font-ibm tracking-wide';
                        span.innerText = currentBrand.name;
                        parent.appendChild(span);
                      }
                      span.style.display = 'inline-block';
                    }
                  }}
                />
              ) : (
                <span className="text-base md:text-xl font-bold text-neutral-900 font-ibm tracking-wide hover:text-[#1E3A8A] transition-colors">
                  {currentBrand.name}
                </span>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    );
  }
);

BrandColumn.displayName = 'BrandColumn';

export const BrandPartnersSection: React.FC<BrandPartnersSectionProps> = ({ isArabic, brands }) => {
  const [columns, setColumns] = useState<Brand[][]>([]);
  const [currentTime, setCurrentTime] = useState(0);

  const columnCount = useMemo(() => {
    if (!brands || brands.length === 0) return 0;
    return Math.min(Math.max(1, brands.length), 4);
  }, [brands]);

  useEffect(() => {
    if (!brands || brands.length === 0) return;
    const distributed = distributeItems(brands, columnCount);
    setColumns(distributed);
  }, [brands, columnCount]);

  useEffect(() => {
    if (!brands || brands.length === 0) return;
    const interval = setInterval(() => {
      setCurrentTime((prev) => prev + 100);
    }, 100);
    return () => clearInterval(interval);
  }, [brands]);

  if (!brands || brands.length === 0) return null;

  return (
    <section className="w-full bg-[#FAFAFA] py-10 border-y border-neutral-200 font-ibm relative overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 mb-6 text-center">
        <p className="text-xs font-bold uppercase tracking-widest text-neutral-400">
          {isArabic ? 'شركاؤنا وعلاماتنا التجارية' : 'Our Brand Partners'}
        </p>
      </div>

      <div className="flex justify-center items-center gap-6 md:gap-12">
        {columns.map((cols, index) => (
          <BrandColumn
            key={index}
            brands={cols}
            index={index}
            currentTime={currentTime}
          />
        ))}
      </div>
    </section>
  );
};
