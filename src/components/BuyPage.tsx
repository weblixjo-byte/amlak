import React, { useState } from 'react';
import { PropertyItem } from '../types';
import { AnimatedDotButton } from './ui/animated-dot-button';

interface BuyPageProps {
  onOpenInquiry: (itemTitle?: string) => void;
  isArabic: boolean;
  onNavigateHome: () => void;
  properties?: PropertyItem[];
  cars?: PropertyItem[];
}

export const BuyPage: React.FC<BuyPageProps> = ({
  onOpenInquiry,
  isArabic,
  onNavigateHome,
  properties = [],
  cars = [],
}) => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'estate' | 'car'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Combine dynamic properties and cars passed from App state
  const allListings: PropertyItem[] = [...properties, ...cars];

  const filteredItems = allListings.filter((item) => {
    const matchesCat = selectedCategory === 'all' || item.category === selectedCategory;
    const titleToMatch = isArabic ? (item.titleAr || item.title) : (item.title || item.titleAr);
    const locToMatch = isArabic ? (item.locationOrSpecsAr || item.locationOrSpecs) : (item.locationOrSpecs || item.locationOrSpecsAr);
    const matchesSearch =
      titleToMatch.toLowerCase().includes(searchQuery.toLowerCase()) ||
      locToMatch.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-neutral-900 font-ibm pt-32 pb-24">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs font-bold text-neutral-500 mb-6">
          <button onClick={onNavigateHome} className="hover:text-[#1E3A8A] transition-colors">
            {isArabic ? 'الرئيسية' : 'Home'}
          </button>
          <span>/</span>
          <span className="text-neutral-900">{isArabic ? 'قسم الشراء المباشر' : 'Buy Section'}</span>
        </div>

        {/* Hero Header Banner */}
        <div className="bg-white border border-neutral-200 rounded-3xl p-8 md:p-12 shadow-sm mb-12 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="flex flex-col gap-3 max-w-2xl text-right">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1E3A8A]/10 text-[#1E3A8A] text-xs font-bold uppercase tracking-wider w-fit">
              <span className="w-2 h-2 rounded-full bg-[#1E3A8A]"></span>
              <span>{isArabic ? 'قسم الشراء والملكية المباشرة' : 'PURCHASE PORTAL'}</span>
            </div>

            <h1 className="text-3xl md:text-5xl font-bold text-neutral-900 tracking-tight font-ibm leading-tight">
              {isArabic ? 'شراء العقارات والسيارات الفاخرة' : 'Buy Luxury Properties & Vehicles'}
            </h1>

            <p className="text-neutral-600 text-sm md:text-base font-normal leading-relaxed">
              {isArabic
                ? 'استكشف المعروضات الحصرية المتاحة للشراء الفوري ونقل الملكية المباشر، مع توفير الفحص الميداني والتسهيلات القانونية كاملة.'
                : 'Browse exclusive listings available for immediate direct purchase with full inspection guarantees.'}
            </p>
          </div>

          {/* Quick CTA Card */}
          <div className="w-full lg:w-80 bg-[#FAFAFA] border border-neutral-200 p-6 rounded-2xl flex flex-col gap-3 shadow-sm">
            <span className="text-xs font-bold text-neutral-500 uppercase">{isArabic ? 'استشارة شراء مجانية' : 'Free Purchase Consultation'}</span>
            <h4 className="text-base font-bold text-neutral-900 font-ibm">{isArabic ? 'هل تبحث عن عقار أو سيارة محددة؟' : 'Looking for a specific property or car?'}</h4>
            <button
              onClick={() => onOpenInquiry('طلب استشارة شراء وتنقيب مخصص')}
              className="mt-2 w-full py-3 rounded-xl bg-[#1E3A8A] hover:bg-[#16316e] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md"
            >
              {isArabic ? 'طلب استشارة شراء' : 'Request Consultation'}
            </button>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="bg-white border border-neutral-200 p-4 md:p-6 rounded-2xl shadow-sm mb-10 flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
            {(
              [
                { key: 'all', labelAr: 'جميع المعروضات', labelEn: 'All Listings', icon: 'apps' },
                { key: 'estate', labelAr: 'العقارات والشقق', labelEn: 'Properties', icon: 'apartment' },
                { key: 'car', labelAr: 'السيارات المتاحة', labelEn: 'Vehicles', icon: 'directions_car' },
              ] as const
            ).map((tab) => (
              <button
                key={tab.key}
                onClick={() => setSelectedCategory(tab.key)}
                className={`px-5 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center gap-2 whitespace-nowrap ${
                  selectedCategory === tab.key
                    ? 'bg-[#1E3A8A] text-white shadow-md'
                    : 'bg-neutral-50 hover:bg-neutral-100 text-neutral-700 border border-neutral-200'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">{tab.icon}</span>
                <span>{isArabic ? tab.labelAr : tab.labelEn}</span>
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <span className="material-symbols-outlined absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 text-[20px]">
              search
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isArabic ? 'ابحث بالاسم أو الموقع...' : 'Search by title or location...'}
              className="w-full bg-neutral-50 border border-neutral-200 rounded-xl pr-10 pl-4 py-2.5 text-xs text-neutral-900 focus:outline-none focus:border-[#1E3A8A] font-ibm"
            />
          </div>

        </div>

        {/* Listings Grid */}
        {filteredItems.length === 0 ? (
          <div className="bg-white border border-dashed border-neutral-300 rounded-3xl p-16 text-center max-w-xl mx-auto my-12">
            <span className="material-symbols-outlined text-[56px] text-neutral-300 mb-4 block">
              storefront
            </span>
            <h3 className="text-xl font-bold text-neutral-800 font-ibm mb-2">
              {isArabic ? 'لا توجد معروضات متاحة حالياً' : 'No listings available'}
            </h3>
            <p className="text-neutral-500 text-xs leading-relaxed mb-6">
              {isArabic
                ? 'لم يتم إدخال أي معروضات من لوحة التحكم حتى الآن. يمكنك إضافة عقارات أو سيارات جديدة من لوحة التحكم لتظهر هنا فوراً.'
                : 'No items added from the admin dashboard yet.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="bg-white border border-neutral-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
              >
                {/* Image */}
                <div className="relative aspect-[16/10] w-full bg-neutral-100 overflow-hidden">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = item.category === 'estate' ? '/images/dabouq_villa.jpg' : '/images/hero_car.jpg';
                    }}
                  />
                  <div className="absolute top-3 left-3 bg-[#1E3A8A] text-white px-3 py-1 rounded-lg text-xs font-bold shadow-md">
                    {isArabic ? (item.badgeAr || item.badge) : (item.badge || item.badgeAr)}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-grow justify-between gap-4 font-ibm">
                  <div className="space-y-2">
                    <span className="text-[11px] font-bold text-[#1E3A8A] uppercase tracking-wider">
                      {item.category === 'estate' ? (isArabic ? 'عقار / شقة' : 'PROPERTY') : (isArabic ? 'سيارة فاخرة' : 'VEHICLE')}
                    </span>
                    <h3 className="text-lg font-bold text-neutral-900 group-hover:text-[#1E3A8A] transition-colors leading-snug">
                      {isArabic ? (item.titleAr || item.title) : (item.title || item.titleAr)}
                    </h3>
                    <p className="text-xs text-neutral-500 flex items-center gap-1">
                      <span className="material-symbols-outlined text-[15px] text-[#1E3A8A]">location_on</span>
                      <span>{isArabic ? (item.locationOrSpecsAr || item.locationOrSpecs) : (item.locationOrSpecs || item.locationOrSpecsAr)}</span>
                    </p>
                  </div>

                  {/* Specs */}
                  <div className="grid grid-cols-3 gap-2 py-3 px-3 bg-neutral-50 rounded-xl border border-neutral-100 text-[11px] text-neutral-600 font-bold text-center">
                    <div>{item.specs?.bedsOrHp || '—'}</div>
                    <div>{item.specs?.bathsOrSpeed || '—'}</div>
                    <div>{item.specs?.areaOrEngine || '—'}</div>
                  </div>

                  {/* Price & Action */}
                  <div className="flex items-center justify-between pt-2 border-t border-neutral-100">
                    <div className="flex flex-col">
                      <span className="text-[10px] text-neutral-400 font-bold uppercase">{isArabic ? 'سعر الشراء المباشر' : 'Price'}</span>
                      <span className="text-base font-bold text-[#1E3A8A] font-mono">{item.price}</span>
                    </div>

                    <AnimatedDotButton
                      variant="blue"
                      onClick={() => onOpenInquiry(isArabic ? (item.titleAr || item.title) : (item.title || item.titleAr))}
                      text={isArabic ? 'طلب معاينة' : 'Inquire'}
                      isArabic={isArabic}
                      className="px-5 py-2 text-xs"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};
