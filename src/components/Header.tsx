import React, { useState } from 'react';
import { NavHeader } from './ui/nav-header';
import { useScroll } from './ui/use-scroll';
import { cn } from '../lib/utils';

interface HeaderProps {
  onOpenInquiry: (itemTitle?: string) => void;
  isArabic: boolean;
  setIsArabic: (val: boolean) => void;
  currentPage: 'home' | 'buy' | 'about' | 'dashboard';
  onNavigate: (page: 'home' | 'buy' | 'about') => void;
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
        { label: 'قسم الشراء المباشر', href: '#buy', page: 'buy' as const },
        { label: 'عن المنصة', href: '#about', page: 'about' as const },
      ]
    : [
        { label: 'Home', href: '#home', page: 'home' as const },
        { label: 'Buy Portal', href: '#buy', page: 'buy' as const },
        { label: 'About Us', href: '#about', page: 'about' as const },
      ];

  const isWhiteBg = (currentPage === 'buy' || currentPage === 'about') ? true : isPastHero;

  return (
    <header className="fixed top-0 w-full z-50 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] font-ibm">
      
      {/* Container */}
      <div
        className={cn(
          "mx-auto transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] outline-none ring-0 border-0 border-transparent",
          (currentPage === 'buy' || currentPage === 'about')
            ? "max-w-[1140px] mt-3 py-1 px-5 rounded-full bg-white/95 backdrop-blur-2xl shadow-lg text-neutral-900 border border-neutral-200/80"
            : !isScrolled
            ? "w-full max-w-full mt-0 py-2 px-6 md:px-12 rounded-none bg-transparent text-white"
            : isPastHero
            ? "max-w-[1140px] mt-3 py-1 px-5 rounded-full bg-white/95 backdrop-blur-2xl shadow-lg text-neutral-900 border border-neutral-200/80"
            : "max-w-[1140px] mt-3 py-1 px-5 rounded-full bg-black/70 backdrop-blur-2xl shadow-2xl text-white"
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
                (currentPage === 'buy' || currentPage === 'about')
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
                  ? "bg-neutral-100 hover:bg-neutral-200 text-neutral-900"
                  : "bg-black/60 hover:bg-black/80 text-white"
              )}
              title="Switch Language"
            >
              <span className="material-symbols-outlined text-[18px]">language</span>
              <span>{isArabic ? 'EN' : 'العربية'}</span>
            </button>

            {/* Direct Buy Page CTA */}
            <button
              onClick={() => onNavigate('buy')}
              className="hidden md:flex items-center gap-2 bg-[#0D5C3A] hover:bg-[#09452b] text-white px-4 py-2 rounded-full font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-md hover:scale-105 border-0 outline-none ring-0"
            >
              <span>{isArabic ? 'قسم الشراء' : 'Buy Section'}</span>
              <span className="material-symbols-outlined text-[16px]">shopping_bag</span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={cn(
                "lg:hidden p-2 focus:outline-none transition-colors duration-300 border-0 outline-none",
                isWhiteBg ? "text-neutral-900" : "text-white"
              )}
              aria-label="Toggle menu"
            >
              <span className="material-symbols-outlined text-[28px]">
                {mobileMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-2 bg-white/95 backdrop-blur-2xl border border-neutral-200 rounded-2xl px-6 py-6 flex flex-col gap-4 shadow-xl max-w-[1200px] mx-auto text-neutral-900 font-ibm">
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onNavigate('home');
            }}
            className="text-right text-base font-bold text-neutral-900 py-2 border-b border-neutral-100"
          >
            {isArabic ? 'الرئيسية' : 'Home'}
          </button>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onNavigate('buy');
            }}
            className="text-right text-base font-bold text-[#1E3A8A] py-2 border-b border-neutral-100"
          >
            {isArabic ? 'قسم الشراء المباشر' : 'Buy Section'}
          </button>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onNavigate('home');
            }}
            className="text-right text-base font-bold text-neutral-800 py-2 border-b border-neutral-100"
          >
            {isArabic ? 'عن المنصة' : 'About Us'}
          </button>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenInquiry();
            }}
            className="mt-2 w-full py-3.5 rounded-xl bg-[#1E3A8A] text-white font-bold text-xs uppercase tracking-wider border-0"
          >
            {isArabic ? 'طلب استفسار' : 'Inquire Now'}
          </button>
        </div>
      )}

    </header>
  );
};
