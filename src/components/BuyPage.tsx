import React, { useState } from 'react';
import { PropertyItem } from '../types';

interface BuyPageProps {
  onOpenInquiry: (itemTitle?: string) => void;
  isArabic: boolean;
  onNavigateHome: () => void;
}

const buyListings: (PropertyItem & { locationTag: string; locationTagAr: string; buyStatusAr: string })[] = [
  {
    id: 'buy-1',
    title: 'Apartment with a terrace for sale in Jabal Amman',
    titleAr: 'شقة فاخرة مع تراس في جبل عمّان',
    category: 'estate',
    type: 'Apartment',
    locationTag: 'Jabal Amman, Amman, Jordan',
    locationTagAr: 'جبل عمّان، عمّان',
    locationOrSpecs: 'Jabal Amman — 220 Sq.m',
    locationOrSpecsAr: 'جبل عمّان — 220 متر مربع',
    price: 'JOD 180,000',
    imageUrl: '/images/jabal_amman.jpg',
    badge: 'Direct Sale',
    badgeAr: 'بيع مباشر',
    buyStatusAr: 'جاهز لنقل الملكية فوراً',
    specs: {
      bedsOrHp: '3 غرف نوم',
      bathsOrSpeed: '3 حمامات',
      areaOrEngine: '220م² مساحة',
    },
    description: 'شقة واسعة ومستقلة مع تراس يطل على إطلالة جبل عمان العريقة مع كوشان طابو جاهز.',
    featured: true,
  },
  {
    id: 'buy-2',
    title: 'Furnished Duplex last floor with roof for sale in Airport Road',
    titleAr: 'دوبلكس مفروش بالكامل مع روف في طريق المطار',
    category: 'estate',
    type: 'Duplex',
    locationTag: 'Airport Road, Amman, Jordan',
    locationTagAr: 'طريق المطار، عمّان',
    locationOrSpecs: 'Airport Road — 310 Sq.m',
    locationOrSpecsAr: 'طريق المطار — 310 متر مربع',
    price: 'JOD 250,000',
    imageUrl: '/images/dabouq_villa.jpg',
    badge: 'Direct Sale',
    badgeAr: 'بيع مباشر',
    buyStatusAr: 'سند ملكية مفرز',
    specs: {
      bedsOrHp: '4 غرف نوم',
      bathsOrSpeed: '4 حمامات',
      areaOrEngine: '310م² مساحة',
    },
    description: 'دوبلكس حديث مفروش بأرقى الأثاث مع روف خاص ومدخل مستقل بالقرب من طريق المطار.',
    featured: true,
  },
  {
    id: 'buy-3',
    title: 'Flat apartment with garden in Dabouq',
    titleAr: 'شقة أرضية مميزة مع حديقة مستقلة في دابوق',
    category: 'estate',
    type: 'Villa/Flat',
    locationTag: 'Dabouq, Amman, Jordan',
    locationTagAr: 'دابوق، عمّان',
    locationOrSpecs: 'Dabouq — 450 Sq.m',
    locationOrSpecsAr: 'دابوق — 450 متر مربع',
    price: 'JOD 380,000',
    imageUrl: '/images/estate_interior.jpg',
    badge: 'Direct Sale',
    badgeAr: 'بيع مباشر',
    buyStatusAr: 'متاحة للشراء الفوري',
    specs: {
      bedsOrHp: '3 غرف نوم',
      bathsOrSpeed: '4 حمامات',
      areaOrEngine: '450م² مساحة',
    },
    description: 'شقة أرضية تشطيبات سوبر ديلوكس مع حديقة ومدخل خاص وموقف سيارات مسقوف.',
    featured: true,
  },
  {
    id: 'buy-4',
    title: 'Bugatti Tourbillon 2026',
    titleAr: 'بوغاتي توربيون موديل 2026',
    category: 'car',
    type: 'Supercar',
    locationTag: 'Amman Showroom, Jordan',
    locationTagAr: 'معرض عمّان، الأردن',
    locationOrSpecs: 'V16 Hybrid — 1,800 HP',
    locationOrSpecsAr: 'محرك V16 هجين — 1,800 حصان',
    price: 'JOD 3,400,000',
    imageUrl: '/images/hero_car.jpg',
    badge: 'New Car',
    badgeAr: 'سيارة جديدة',
    buyStatusAr: 'شامل التسجيل والتنازل',
    specs: {
      bedsOrHp: '1,800 حصان',
      bathsOrSpeed: '445 كم/س',
      areaOrEngine: 'V16 هجين',
    },
    description: 'سيارة بوغاتي توربيون زيرو بتصميم خارق وجاهزة للتسليم المباشر في عمّان.',
    featured: false,
  },
  {
    id: 'buy-5',
    title: 'Rolls-Royce Spectre Electric',
    titleAr: 'رولز رويس سبيكتر كهربائية بالكامل',
    category: 'car',
    type: 'Coupe',
    locationTag: 'Amman Gallery, Jordan',
    locationTagAr: 'معرض عمّان، الأردن',
    locationOrSpecs: 'Electric Dual Motor',
    locationOrSpecsAr: 'محرك كهربائي بالكامل',
    price: 'JOD 560,000',
    imageUrl: '/images/rolls_royce.jpg',
    badge: 'Luxury Car',
    badgeAr: 'سيارة فاخرة',
    buyStatusAr: 'جاهزة لنقل الملكية',
    specs: {
      bedsOrHp: '584 حصان',
      bathsOrSpeed: '0-100 بـ 4.4ث',
      areaOrEngine: 'كهربائي بالكامل',
    },
    description: 'رولز رويس سبيكتر الكهربائية الفاخرة مع ضمان الشركة والتنازل المباشر.',
    featured: false,
  },
  {
    id: 'buy-6',
    title: 'Modern Waterfront Villa',
    titleAr: 'فيلا فاخرة بواجهة مائية نخلة جميرا',
    category: 'estate',
    type: 'Villa',
    locationTag: 'Palm Jumeirah, Dubai, UAE',
    locationTagAr: 'نخلة جميرا، دبي',
    locationOrSpecs: 'Palm Jumeirah — 1,350 Sq.m',
    locationOrSpecsAr: 'نخلة جميرا — 1,350 متر مربع',
    price: 'JOD 12,500,000',
    imageUrl: '/images/hero_mansion.jpg',
    badge: 'Exclusive',
    badgeAr: 'حصري',
    buyStatusAr: 'ملكيتها حرّة جاهزة',
    specs: {
      bedsOrHp: '6 غرف نوم',
      bathsOrSpeed: '8 حمامات',
      areaOrEngine: '1,350م² مساحة',
    },
    description: 'فيلا فاخرة بواجهة مائية وشاطئ خاص في نخلة جميرا دبي.',
    featured: false,
  },
];

export const BuyPage: React.FC<BuyPageProps> = ({ onOpenInquiry, isArabic, onNavigateHome }) => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'estate' | 'car'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = buyListings.filter((item) => {
    const matchesCat = selectedCategory === 'all' || item.category === selectedCategory;
    const titleToMatch = isArabic ? item.titleAr : item.title;
    const locToMatch = isArabic ? item.locationTagAr : item.locationTag;
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
              onClick={() => onOpenInquiry('طلب شراء عقار/سيارة مخصص')}
              className="w-full py-3 rounded-xl bg-[#1E3A8A] hover:bg-[#1E3A8A] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md mt-1"
            >
              {isArabic ? 'تقديم طلب شراء مخصص' : 'Submit Custom Request'}
            </button>
          </div>
        </div>

        {/* Search & Category Filter Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 bg-white border border-neutral-200 p-4 rounded-2xl shadow-sm">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto no-scrollbar">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-5 py-2.5 rounded-xl font-bold text-xs md:text-sm transition-all ${
                selectedCategory === 'all'
                  ? 'bg-[#1E3A8A] text-white shadow-md'
                  : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-800'
              }`}
            >
              {isArabic ? 'جميع المعروضات للشراء' : 'All Listings'}
            </button>

            <button
              onClick={() => setSelectedCategory('estate')}
              className={`px-5 py-2.5 rounded-xl font-bold text-xs md:text-sm transition-all ${
                selectedCategory === 'estate'
                  ? 'bg-[#1E3A8A] text-white shadow-md'
                  : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-800'
              }`}
            >
              {isArabic ? 'عقارات وشقق للشراء' : 'Properties'}
            </button>

            <button
              onClick={() => setSelectedCategory('car')}
              className={`px-5 py-2.5 rounded-xl font-bold text-xs md:text-sm transition-all ${
                selectedCategory === 'car'
                  ? 'bg-[#1E3A8A] text-white shadow-md'
                  : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-800'
              }`}
            >
              {isArabic ? 'سيارات فاخرة للشراء' : 'Vehicles'}
            </button>
          </div>

          {/* Search Box */}
          <div className="w-full md:w-80 relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isArabic ? 'ابحث في عقارات وسيارات الشراء...' : 'Search purchase listings...'}
              className="w-full bg-neutral-50 border border-neutral-300 focus:border-[#1E3A8A] rounded-xl pr-10 pl-4 py-2.5 text-neutral-900 text-xs md:text-sm font-bold focus:outline-none transition-colors"
            />
            <span className="material-symbols-outlined absolute right-3 top-2.5 text-neutral-500 text-[20px]">
              search
            </span>
          </div>

        </div>

        {/* Purchase Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="group bg-white border border-neutral-200 hover:border-[#1E3A8A] rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              {/* Image Viewport */}
              <div className="relative w-full aspect-[4/3] overflow-hidden bg-neutral-900">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />

                <div className="absolute top-3 right-3 bg-[#1E3A8A] text-white text-xs font-bold px-3 py-1 rounded-lg shadow-md">
                  {isArabic ? item.badgeAr : item.badge}
                </div>

                <div className="absolute bottom-3 right-3 left-3 bg-neutral-900/80 backdrop-blur-md text-white text-xs font-bold px-3.5 py-2 rounded-xl flex items-center gap-1.5 shadow-sm truncate">
                  <span className="material-symbols-outlined text-[16px] text-blue-300">location_on</span>
                  <span className="truncate">{isArabic ? item.locationTagAr : item.locationTag}</span>
                </div>
              </div>

              {/* Body */}
              <div className="p-6 flex flex-col gap-4 flex-grow justify-between">
                <div className="flex flex-col gap-2">
                  <div className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md w-fit flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">check_circle</span>
                    <span>{item.buyStatusAr}</span>
                  </div>

                  <h3 className="text-neutral-900 font-bold text-lg leading-snug font-ibm group-hover:text-[#1E3A8A] transition-colors">
                    {isArabic ? item.titleAr : item.title}
                  </h3>

                  <p className="text-neutral-600 text-xs line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>

                  <div className="text-[#1E3A8A] font-bold text-2xl font-mono pt-1">
                    {item.price}
                  </div>
                </div>

                {/* Specs */}
                <div className="flex items-center justify-between text-neutral-700 text-xs font-bold border-t border-neutral-100 pt-3">
                  <span>{item.specs.bedsOrHp}</span>
                  <span>•</span>
                  <span>{item.specs.bathsOrSpeed}</span>
                  <span>•</span>
                  <span>{item.specs.areaOrEngine}</span>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2 pt-2">
                  <button
                    onClick={() => onOpenInquiry(`طلب شراء مباشر: ${isArabic ? item.titleAr : item.title}`)}
                    className="flex-grow py-3 rounded-xl bg-[#1E3A8A] hover:bg-[#1E3A8A] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md"
                  >
                    {isArabic ? 'بدء إجراءات الشراء' : 'Start Purchase'}
                  </button>
                  <button
                    onClick={() => onOpenInquiry(`طلب معاينة قبل الشراء: ${isArabic ? item.titleAr : item.title}`)}
                    className="p-3 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-800 font-bold text-xs transition-colors"
                    title={isArabic ? 'تنسيق معاينة' : 'Schedule Viewing'}
                  >
                    <span className="material-symbols-outlined text-[18px]">visibility</span>
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Direct Purchase Steps Section */}
        <div className="bg-white border border-neutral-200 rounded-3xl p-8 md:p-12 shadow-sm">
          <div className="text-center max-w-2xl mx-auto mb-12 flex flex-col gap-2">
            <span className="text-[#1E3A8A] text-xs font-bold uppercase tracking-wider">
              {isArabic ? 'خطوات وإجراءات الشراء المباشر' : 'DIRECT PURCHASE STEPS'}
            </span>
            <h2 className="text-2xl md:text-4xl font-bold text-neutral-900 font-ibm">
              {isArabic ? 'كيف تتسوق وتشتري عبر منصة أمـلاك؟' : 'How To Purchase On Amlak Platform'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-[#FAFAFA] border border-neutral-200 flex flex-col gap-3">
              <div className="w-12 h-12 rounded-xl bg-[#1E3A8A] text-white font-bold text-lg flex items-center justify-center font-mono">
                01
              </div>
              <h4 className="text-lg font-bold text-neutral-900 font-ibm">
                {isArabic ? 'اختيار المعروض ومعاينته' : 'Select & View Asset'}
              </h4>
              <p className="text-neutral-600 text-xs leading-relaxed">
                {isArabic
                  ? 'اختر العقار أو السيارة المناسبة ونسّق موعداً للمعاينة المباشرة مع الفحص الميداني.'
                  : 'Select your preferred listing and schedule a direct viewing.'}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FAFAFA] border border-neutral-200 flex flex-col gap-3">
              <div className="w-12 h-12 rounded-xl bg-[#1E3A8A] text-white font-bold text-lg flex items-center justify-center font-mono">
                02
              </div>
              <h4 className="text-lg font-bold text-neutral-900 font-ibm">
                {isArabic ? 'الفحص والتثبت القانوني' : 'Verification & Inspection'}
              </h4>
              <p className="text-neutral-600 text-xs leading-relaxed">
                {isArabic
                  ? 'يتم التأكد من صحة سند الملكية، والكوشان المفرز، وفحص حالة المركبة الفنية بالكامل.'
                  : 'Verify full legal ownership papers and technical inspection reports.'}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FAFAFA] border border-neutral-200 flex flex-col gap-3">
              <div className="w-12 h-12 rounded-xl bg-[#1E3A8A] text-white font-bold text-lg flex items-center justify-center font-mono">
                03
              </div>
              <h4 className="text-lg font-bold text-neutral-900 font-ibm">
                {isArabic ? 'نقل الملكية وتوقيع العقود' : 'Transfer & Ownership'}
              </h4>
              <p className="text-neutral-600 text-xs leading-relaxed">
                {isArabic
                  ? 'إتمام إجراءات البيع وتوقيع العقود الرسمية لنقل الملكية بسلاسة ومباشرة.'
                  : 'Finalize official purchase contracts and transfer ownership directly.'}
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
