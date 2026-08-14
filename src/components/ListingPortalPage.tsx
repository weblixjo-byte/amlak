import React, { useState, useMemo } from 'react';
import { PropertyItem } from '../types';
import { AmmanMapView } from './AmmanMapView';
import { ExperienceCard, ExperienceItem } from './ui/carousel-cards';
import { PropertyDetailsModal } from './PropertyDetailsModal';

interface ListingPortalPageProps {
  type: 'estate' | 'car';
  items: PropertyItem[];
  onOpenInquiry: (itemTitle?: string) => void;
  isArabic: boolean;
  onNavigateHome: () => void;
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

export const ListingPortalPage: React.FC<ListingPortalPageProps> = ({
  type,
  items,
  onOpenInquiry,
  isArabic,
  onNavigateHome,
}) => {
  const isEstate = type === 'estate';
  
  // State for Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBeds, setSelectedBeds] = useState('');
  const [selectedBaths, setSelectedBaths] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [minArea, setMinArea] = useState('');
  const [maxArea, setMaxArea] = useState('');
  const [selectedAgeOrYear, setSelectedAgeOrYear] = useState('');
  const [selectedFurnished, setSelectedFurnished] = useState('');
  const [selectedItemForMap, setSelectedItemForMap] = useState<PropertyItem | undefined>(undefined);
  const [detailsModalItem, setDetailsModalItem] = useState<PropertyItem | null>(null);

  // Filter items logic
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      // Category check
      if (item.category && item.category !== type) return false;

      // Text search
      if (searchTerm.trim()) {
        const query = searchTerm.toLowerCase();
        const title = (isArabic ? item.titleAr : item.title).toLowerCase();
        const location = (isArabic ? item.locationOrSpecsAr : item.locationOrSpecs).toLowerCase();
        if (!title.includes(query) && !location.includes(query)) return false;
      }

      // Beds check
      if (selectedBeds && item.specs.bedsOrHp) {
        if (!item.specs.bedsOrHp.includes(selectedBeds)) return false;
      }

      // Baths check
      if (selectedBaths && item.specs.bathsOrSpeed) {
        if (!item.specs.bathsOrSpeed.includes(selectedBaths)) return false;
      }

      return true;
    });
  }, [items, type, searchTerm, selectedBeds, selectedBaths, isArabic]);

  return (
    <div className="w-full min-h-screen bg-[#F8FAFC] text-neutral-900 pt-28 pb-20 font-ibm">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 space-y-8">
        
        {/* TOP BANNER & SEARCH BAR SECTION (Matching Screenshot) */}
        <div className="space-y-6">
          
          {/* Top Search Input with Red Search Button */}
          <div className="flex flex-col sm:flex-row items-center gap-3 bg-white p-3 rounded-2xl shadow-sm border border-neutral-200/80">
            
            <div className="relative flex-grow w-full">
              <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 text-[22px]">
                search
              </span>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={
                  isArabic
                    ? isEstate
                      ? "اكتب اسم المنطقة للبحث فيها أو رقم الإعلان (مثال: دابوق، عبدون، دير غبار...)"
                      : "اكتب موديل السيارة للبحث فيها (مثال: مرسيدس G63، رنج روفر، بورش...)"
                    : "Type area or keyword..."
                }
                className="w-full pr-12 pl-4 py-3.5 bg-neutral-50 rounded-xl border border-neutral-200 text-neutral-900 text-sm font-bold focus:outline-none focus:border-[#1E3A8A] transition-colors"
              />
            </div>

            <button className="w-full sm:w-auto px-10 py-3.5 bg-[#0D5C3A] hover:bg-[#0A4A2E] text-white font-bold rounded-xl text-sm transition-all shadow-md shrink-0 flex items-center justify-center gap-2">
              <span>{isArabic ? "بحـث" : "Search"}</span>
            </button>

          </div>

          {/* MULTI-FILTER CARD (Matching User Screenshot Layout) */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-neutral-200/80 space-y-5">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              
              {/* Filter 1: Building Age / Car Year */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-neutral-500 flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px] text-[#1E3A8A]">home</span>
                  <span>{isArabic ? (isEstate ? "عمر البناء" : "سنة الصنع") : "Year / Age"}</span>
                </label>
                <select
                  value={selectedAgeOrYear}
                  onChange={(e) => setSelectedAgeOrYear(e.target.value)}
                  className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3 py-2.5 text-xs font-bold text-neutral-800 focus:outline-none focus:border-[#1E3A8A]"
                >
                  <option value="">{isArabic ? "جميع الخيارات" : "All Years"}</option>
                  <option value="new">{isArabic ? "بناء جديد / صفر كم" : "Brand New"}</option>
                  <option value="1-5">{isArabic ? "1 - 5 سنوات" : "1-5 Years"}</option>
                  <option value="5+">{isArabic ? "أكثر من 5 سنوات" : "5+ Years"}</option>
                </select>
              </div>

              {/* Filter 2: Bedrooms / HP */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-neutral-500 flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px] text-[#1E3A8A]">bed</span>
                  <span>{isArabic ? (isEstate ? "غرف النوم" : "عدد الركاب / فئة") : "Bedrooms"}</span>
                </label>
                <select
                  value={selectedBeds}
                  onChange={(e) => setSelectedBeds(e.target.value)}
                  className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3 py-2.5 text-xs font-bold text-neutral-800 focus:outline-none focus:border-[#1E3A8A]"
                >
                  <option value="">{isArabic ? "غرف النوم (الكل)" : "All Bedrooms"}</option>
                  <option value="2">2 {isArabic ? "غرف نوم" : "Beds"}</option>
                  <option value="3">3 {isArabic ? "غرف نوم" : "Beds"}</option>
                  <option value="4">4 {isArabic ? "غرف نوم" : "Beds"}</option>
                  <option value="5">5+ {isArabic ? "غرف نوم" : "Beds"}</option>
                </select>
              </div>

              {/* Filter 3: Bathrooms / Specs */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-neutral-500 flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px] text-[#1E3A8A]">bathtub</span>
                  <span>{isArabic ? (isEstate ? "الحمامات" : "ناقل الحركة") : "Bathrooms"}</span>
                </label>
                <select
                  value={selectedBaths}
                  onChange={(e) => setSelectedBaths(e.target.value)}
                  className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3 py-2.5 text-xs font-bold text-neutral-800 focus:outline-none focus:border-[#1E3A8A]"
                >
                  <option value="">{isArabic ? "الحمامات (الكل)" : "All Bathrooms"}</option>
                  <option value="2">2 {isArabic ? "حمامات" : "Baths"}</option>
                  <option value="3">3 {isArabic ? "حمامات" : "Baths"}</option>
                  <option value="4">4+ {isArabic ? "حمامات" : "Baths"}</option>
                </select>
              </div>

              {/* Filter 4: Price Range Inputs (من - إلى) */}
              <div className="space-y-1.5 col-span-2 sm:col-span-1">
                <label className="text-xs font-bold text-neutral-500">
                  {isArabic ? "السعر (دينار)" : "Price Range"}
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    placeholder={isArabic ? "من" : "Min"}
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3 py-2.5 text-xs font-bold text-neutral-800 focus:outline-none focus:border-[#1E3A8A]"
                  />
                  <span className="text-neutral-400 text-xs">-</span>
                  <input
                    type="text"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    placeholder={isArabic ? "إلى" : "Max"}
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3 py-2.5 text-xs font-bold text-neutral-800 focus:outline-none focus:border-[#1E3A8A]"
                  />
                </div>
              </div>

              {/* Filter 5: Area / Engine Range Inputs */}
              <div className="space-y-1.5 col-span-2 sm:col-span-1">
                <label className="text-xs font-bold text-neutral-500">
                  {isArabic ? (isEstate ? "المساحة (م²)" : "سعة المحرك") : "Area Range"}
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={minArea}
                    onChange={(e) => setMinArea(e.target.value)}
                    placeholder={isArabic ? "من" : "Min"}
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3 py-2.5 text-xs font-bold text-neutral-800 focus:outline-none focus:border-[#1E3A8A]"
                  />
                  <span className="text-neutral-400 text-xs">-</span>
                  <input
                    type="text"
                    value={maxArea}
                    onChange={(e) => setMaxArea(e.target.value)}
                    placeholder={isArabic ? "إلى" : "Max"}
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3 py-2.5 text-xs font-bold text-neutral-800 focus:outline-none focus:border-[#1E3A8A]"
                  />
                </div>
              </div>

            </div>

            {/* Filter Row 2: Secondary Dropdowns */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-3 border-t border-neutral-100">
              
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-neutral-500">{isArabic ? (isEstate ? "رقم الطابق" : "الحالة") : "Floor"}</label>
                <select className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3 py-2.5 text-xs font-bold text-neutral-800 focus:outline-none">
                  <option value="">{isArabic ? "رقم الطابق (الكل)" : "All Floors"}</option>
                  <option value="1">{isArabic ? "طابق أول" : "1st Floor"}</option>
                  <option value="2">{isArabic ? "طابق ثاني" : "2nd Floor"}</option>
                  <option value="3">{isArabic ? "طابق ثالث / روف" : "3rd / Penthouse"}</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-neutral-500">{isArabic ? (isEstate ? "مفروش / غير مفروش" : "نوع الوقود") : "Furnished"}</label>
                <select
                  value={selectedFurnished}
                  onChange={(e) => setSelectedFurnished(e.target.value)}
                  className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3 py-2.5 text-xs font-bold text-neutral-800 focus:outline-none"
                >
                  <option value="">{isArabic ? "مفروش / غير مفروش" : "All"}</option>
                  <option value="yes">{isArabic ? "مفروش بالكامل" : "Furnished"}</option>
                  <option value="no">{isArabic ? "غير مفروش / عظم" : "Unfurnished"}</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-neutral-500">{isArabic ? "تاريخ الإضافة" : "Date Added"}</label>
                <select className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3 py-2.5 text-xs font-bold text-neutral-800 focus:outline-none">
                  <option value="">{isArabic ? "تاريخ الإضافة (الكل)" : "Anytime"}</option>
                  <option value="today">{isArabic ? "اليوم" : "Today"}</option>
                  <option value="week">{isArabic ? "هذا الأسبوع" : "This Week"}</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-neutral-500">{isArabic ? "ميزات إضافية" : "Extra Features"}</label>
                <select className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3 py-2.5 text-xs font-bold text-neutral-800 focus:outline-none">
                  <option value="">{isArabic ? "ميزات إضافية" : "All Features"}</option>
                  <option value="3d">{isArabic ? "تحتوي على جولة ثلاثية الأبعاد" : "3D Tour"}</option>
                </select>
              </div>

            </div>
          </div>

        </div>

        {/* SPLIT-SCREEN LAYOUT: MAP LEFT, LISTINGS GRID RIGHT (Matching User Screenshots) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Interactive Map View */}
          <div className="lg:col-span-5 sticky top-28">
            <AmmanMapView
              items={filteredItems}
              selectedItemId={selectedItemForMap?.id}
              onSelectItem={(item) => {
                setSelectedItemForMap(item);
                onOpenInquiry(isArabic ? item.titleAr : item.title);
              }}
              isArabic={isArabic}
              type={type}
            />
          </div>

          {/* Right Column: Listing Cards Grid View & Count Header */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Header Listing Count */}
            <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-neutral-200/80 shadow-sm">
              <span className="text-sm font-bold text-neutral-800">
                {isArabic
                  ? isEstate
                    ? `عدد العقارات المتاحة: ${filteredItems.length}`
                    : `عدد السيارات المتاحة: ${filteredItems.length}`
                  : `Total Available Listings: ${filteredItems.length}`}
              </span>
              <span className="text-xs text-neutral-400 font-normal">
                {isArabic ? 'تحديث مباشر ومعاينات فورية' : 'Live updates'}
              </span>
            </div>

            {/* Grid of Listings */}
            {filteredItems.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center border border-neutral-200/80 space-y-3">
                <span className="material-symbols-outlined text-[48px] text-neutral-300">
                  search_off
                </span>
                <h3 className="text-lg font-bold text-neutral-700">
                  {isArabic ? "لا توجد معروضات مطابقة لخيارات البحث" : "No listings match your search criteria"}
                </h3>
                <p className="text-xs text-neutral-500">
                  {isArabic ? "حاول تغيير خيارات الفلترة أو مسح كلمات البحث." : "Try adjusting your filters."}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {filteredItems.map((item) => (
                  <ExperienceCard
                    key={item.id}
                    experience={mapToExperience(item, isArabic)}
                    onClick={() => setDetailsModalItem(item)}
                  />
                ))}
              </div>
            )}

          </div>

        </div>

      </div>

      {/* PROPERTY DETAILS FULL MODAL */}
      <PropertyDetailsModal
        item={detailsModalItem}
        isOpen={!!detailsModalItem}
        onClose={() => setDetailsModalItem(null)}
        onOpenInquiry={onOpenInquiry}
        isArabic={isArabic}
      />
    </div>
  );
};

export default ListingPortalPage;
