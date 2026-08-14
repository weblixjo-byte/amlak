import React, { useState } from 'react';
import { NavHeader } from './ui/nav-header';
import { useScroll } from './ui/use-scroll';
import { cn } from '../lib/utils';

interface HeaderProps {
  onOpenInquiry: (itemTitle?: string) => void;
  isArabic: boolean;
  setIsArabic: (val: boolean) => void;
  currentPage: 'home' | 'estates' | 'cars' | 'dashboard';
  onNavigate: (page: 'home' | 'estates' | 'cars') => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenInquiry,
  isArabic,
  setIsArabic,
  currentPage,
  onNavigate,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const isScrolled = useScroll(20);
  const isPastHero = useScroll(500);

  // Clean Public Navigation Links pointing directly to dedicated pages
  const navItems = isArabic
    ? [
        { label: 'الرئيسية', href: '#home', page: 'home' as const },
        { label: 'قسم العقارات', href: '#estates', page: 'estates' as const },
        { label: 'قسم السيارات', href: '#cars', page: 'cars' as const },
      ]
    : [
        { label: 'Home', href: '#home', page: 'home' as const },
        { label: 'Properties', href: '#estates', page: 'estates' as const },
        { label: 'Luxury Cars', href: '#cars', page: 'cars' as const },
      ];

  const isWhiteBg = (currentPage === 'estates' || currentPage === 'cars') ? true : isPastHero;

  return (
    <header className="fixed top-0 w-full z-50 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] font-ibm">
      
      {/* Container */}
      <div
        className={cn(
          "mx-auto transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] outline-none ring-0 border-0 border-transparent",
          (currentPage === 'estates' || currentPage === 'cars')
            ? "max-w-[1140px] mt-3 py-1 px-5 rounded-full bg-white/95 backdrop-blur-2xl shadow-lg text-neutral-900 border border-neutral-200/80"
            : !isScrolled
            ? "w-full max-w-full mt-0 py-2 px-6 md:px-12 rounded-none bg-transparent text-white"
            : isPastHero
            ? "max-w-[1140px] mt-3 py-1 px-5 rounded-full bg-white/95 backdrop-blur-2xl shadow-lg text-neutral-900 border border-neutral-200/80"
            : "max-[#1140px] mt-3 py-1 px-5 rounded-full bg-black/70 backdrop-blur-2xl shadow-2xl text-white"
        )}
      >
        <div className="h-12 flex items-center justify-between">
          
          {/* Logo SVG */}
          <button onClick={() => onNavigate('home')} className="flex items-center group py-1 border-0 focus:outline-none">
            <img
              src="/images/amlaklogo.svg"
              alt="أمـلاك | AMLAK"
              className={cn(
                "h-7 md:h-8 w-auto transition-all duration-500 object-contain",
                (currentPage === 'estates' || currentPage === 'cars')
                  ? "filter-none"
                  : isPastHero
                  ? "filter-none"
                  : "brightness-0 invert"
              )}
            />
          </button>

          {/* Desktop Framer Motion NavHeader */}
          <nav className="hidden lg:flex items-center justify-center">
            <NavHeader items={navItems} isArabic={isArabic} isWhiteBg={isWhiteBg} onNavigate={onNavigate} />
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center gap-3">
            
            {/* Language Switcher */}
            <button
              onClick={() => setIsArabic(!isArabic)}
              className={cn(
                "px-3 py-1.5 rounded-full text-xs font-bold transition-all duration-300 flex items-center gap-1.5 border-0 outline-none ring-0",
                isWhiteBg
                  ? "bg-neutral-100 text-neutral-800 hover:bg-neutral-200"
                  : "bg-white/10 text-white hover:bg-white/20"
              )}
            >
              <span className="material-symbols-outlined text-[16px]">language</span>
              <span>{isArabic ? "EN" : "عربي"}</span>
            </button>

            {/* Quick Action Button - Logo Emerald Color (#0D5C3A) */}
            <button
              onClick={() => onNavigate('estates')}
              className="bg-[#0D5C3A] hover:bg-[#0A4A2E] text-white px-5 py-2 rounded-full text-xs font-bold transition-all duration-300 shadow-md hover:shadow-lg flex items-center gap-1.5 border-0 outline-none ring-0 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">real_estate_agent</span>
              <span>{isArabic ? 'قسم العقارات' : 'Properties'}</span>
            </button>

          </div>

        </div>
      </div>
    </header>
  );
};
