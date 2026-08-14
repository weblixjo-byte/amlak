import React, { useState } from 'react';
import { PropertyItem } from '../types';
import { AnimatedDotButton } from './ui/animated-dot-button';
import { Heart, Share2, Phone, MessageSquare, ChevronLeft, ChevronRight, X } from 'lucide-react';

interface PropertyDetailsModalProps {
  item: PropertyItem | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenInquiry: (itemTitle?: string) => void;
  isArabic?: boolean;
}

export const PropertyDetailsModal: React.FC<PropertyDetailsModalProps> = ({
  item,
  isOpen,
  onClose,
  onOpenInquiry,
  isArabic = true,
}) => {
  if (!isOpen || !item) return null;

  // Gallery Images List (Use item.galleryImages or fallback array using main image)
  const images = item.galleryImages && item.galleryImages.length > 0
    ? item.galleryImages
    : [
        item.imageUrl,
        '/images/about_home.jpeg',
        '/images/dabouq_villa.jpg',
        '/images/jabal_amman.jpg',
      ];

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  const prevImage = () => {
    setActiveImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextImage = () => {
    setActiveImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  // Specs fallbacks matching user screenshot
  const specs = {
    area: item.specs.areaOrEngine || '110 متر مربع',
    age: item.specs.buildingAge || '5-0 سنوات',
    beds: item.specs.bedsOrHp || '3',
    floor: item.specs.floorNumber || '1',
    baths: item.specs.bathsOrSpeed || '2',
    masterBeds: item.specs.masterBeds || '1',
    buildingAppts: item.specs.apartmentsInBuilding || '8 شقق',
  };

  // Details fallbacks matching user screenshot
  const details = {
    adNumber: item.details?.adNumber || '78479',
    viewsCount: item.details?.viewsCount || 890,
    ownerName: item.details?.ownerName || 'المالك نفسه',
    ownerPhone: item.details?.ownerPhone || '0779984283',
    region: item.details?.region || (isArabic ? item.locationOrSpecsAr : item.locationOrSpecs),
    landmarks: item.details?.landmarks || 'جوار المدارس والخدمات الرئيسية',
    surroundingArea: item.details?.surroundingArea || 'منطقة سكنية هادئة مخدومة وقريبة للأسواق',
    address: item.details?.address || 'حي العروبة / عمان',
    amenities: item.details?.amenities || [
      'مصعد',
      'بلكونة',
      'صالون واسع',
      'نوافذ زجاجية مزدوجة',
      'مطبخ مجهز',
      'ستلايت مركزي',
      'عزل واجهات وأسطح خارجية',
      'منطقة مخدومة بالكامل',
    ],
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto font-ibm animate-fade-in-up">
      <div className="bg-white border border-neutral-200 rounded-3xl max-w-5xl w-full max-h-[92vh] overflow-y-auto shadow-2xl relative text-neutral-900 my-auto">
        
        {/* Modal Top Header Bar */}
        <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-md px-6 py-4 border-b border-neutral-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-700 flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="text-right">
              <span className="text-xs text-neutral-400 font-semibold block">
                {isArabic ? `رقم الإعلان: ${details.adNumber} • عدد المشاهدات: ${details.viewsCount}` : `Ad ID: ${details.adNumber}`}
              </span>
              <h2 className="text-lg md:text-xl font-bold text-neutral-950 truncate max-w-lg">
                {isArabic ? item.titleAr : item.title}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsFavorite(!isFavorite)}
              className={`p-2.5 rounded-full border transition-colors ${
                isFavorite ? 'bg-red-50 text-red-600 border-red-200' : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
              }`}
            >
              <Heart className={`w-4 h-4 ${isFavorite ? 'fill-red-600' : ''}`} />
            </button>
            <button className="p-2.5 rounded-full bg-neutral-100 text-neutral-600 hover:bg-neutral-200 transition-colors">
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Main Content */}
        <div className="p-6 md:p-8 space-y-8">
          
          {/* Owner Direct Contact Bar (Matching Screenshot Header Box) */}
          <div className="bg-neutral-50 rounded-2xl p-4 border border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-[#1E3A8A] text-white flex items-center justify-center font-bold text-lg shadow-sm">
                <span className="material-symbols-outlined text-[24px]">person</span>
              </div>
              <div className="text-right">
                <span className="text-xs text-[#0D5C3A] font-extrabold uppercase tracking-widest bg-[#0D5C3A]/10 px-2.5 py-0.5 rounded-full inline-block mb-1">
                  {details.ownerName}
                </span>
                <p className="text-sm font-bold text-neutral-800 dir-ltr">{details.ownerPhone}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <a
                href={`tel:${details.ownerPhone}`}
                className="flex-1 sm:flex-none px-5 py-2.5 bg-[#0D5C3A] hover:bg-[#0A4A2E] text-white rounded-xl text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4" />
                <span>{isArabic ? "اتصال مباشر" : "Direct Call"}</span>
              </a>

              <a
                href={`https://wa.me/962779984283`}
                target="_blank"
                rel="noreferrer"
                className="flex-1 sm:flex-none px-5 py-2.5 bg-[#25D366] hover:bg-[#1DA851] text-white rounded-xl text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>{isArabic ? "واتساب" : "WhatsApp"}</span>
              </a>
            </div>
          </div>

          {/* 2-Column Split View: Left Gallery & Map, Right Details */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* LEFT COLUMN: Image Gallery Slider & Interactive Map */}
            <div className="lg:col-span-6 space-y-6">
              
              {/* Featured Image Slider */}
              <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden bg-neutral-900 group shadow-md border border-neutral-200">
                <img
                  src={images[activeImageIndex]}
                  alt={item.title}
                  className="w-full h-full object-cover transition-all duration-500"
                />

                {/* Left / Right Nav Arrows */}
                <button
                  onClick={prevImage}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 hover:bg-white text-neutral-900 flex items-center justify-center shadow-lg backdrop-blur-md transition-all"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 hover:bg-white text-neutral-900 flex items-center justify-center shadow-lg backdrop-blur-md transition-all"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>

              {/* Thumbnails Row */}
              <div className="grid grid-cols-4 gap-3">
                {images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImageIndex(index)}
                    className={`aspect-[4/3] rounded-xl overflow-hidden border-2 transition-all ${
                      activeImageIndex === index ? 'border-[#1E3A8A] ring-2 ring-[#1E3A8A]/30 scale-105' : 'border-neutral-200 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="معاينة" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>

              {/* Interactive Location Map (الموقع - Matching Screenshot) */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-2 text-right">
                  <span className="material-symbols-outlined text-[20px] text-[#0D5C3A]">location_on</span>
                  <h3 className="text-base font-bold text-neutral-950">{isArabic ? "الموقع الجغرافي الخريطة" : "Location Map"}</h3>
                </div>
                <div className="w-full h-56 rounded-2xl overflow-hidden border border-neutral-300 relative shadow-inner">
                  <iframe
                    title="Property Map Location"
                    width="100%"
                    height="100%"
                    className="w-full h-full border-0"
                    src="https://www.openstreetmap.org/export/embed.html?bbox=35.9000%2C31.9000%2C35.9500%2C31.9600&amp;layer=mapnik"
                  ></iframe>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div className="w-6 h-6 rounded-full bg-[#0D5C3A] border-4 border-white shadow-lg animate-bounce"></div>
                  </div>
                </div>
              </div>

            </div>

            {/* RIGHT COLUMN: Overview, Price Table, Specs Grid & Amenities */}
            <div className="lg:col-span-6 space-y-6 text-right">
              
              {/* Overview Paragraph (نظرة عامة) */}
              <div className="space-y-2 pb-4 border-b border-neutral-200">
                <span className="text-xs font-bold text-neutral-400 uppercase tracking-widest">{isArabic ? "نظرة عامة" : "Overview"}</span>
                <p className="text-sm text-neutral-700 leading-relaxed font-normal">
                  {item.description}
                </p>
              </div>

              {/* Price & Primary Details Table (Matching User Screenshot) */}
              <div className="bg-neutral-50 p-4 rounded-2xl border border-neutral-200 space-y-3 text-xs font-bold">
                <div className="flex items-center justify-between pb-2 border-b border-neutral-200">
                  <span className="text-neutral-500">{isArabic ? "السعر المباشر" : "Price"}</span>
                  <span className="text-xl font-extrabold text-[#0D5C3A] font-mono">{item.price}</span>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-neutral-200">
                  <span className="text-neutral-500">{isArabic ? "المنطقة" : "Region"}</span>
                  <span className="text-neutral-900">{details.region}</span>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-neutral-200">
                  <span className="text-neutral-500">{isArabic ? "معالم معروفة" : "Landmarks"}</span>
                  <span className="text-neutral-900">{details.landmarks}</span>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-neutral-200">
                  <span className="text-neutral-500">{isArabic ? "المنطقة المحيطة" : "Surrounding Area"}</span>
                  <span className="text-neutral-900">{details.surroundingArea}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-neutral-500">{isArabic ? "العنوان" : "Address"}</span>
                  <span className="text-neutral-900">{details.address}</span>
                </div>
              </div>

              {/* Property Specs Grid (الخصائص - Matching Screenshot) */}
              <div className="space-y-3 pt-2">
                <h3 className="text-base font-bold text-neutral-950 pb-2 border-b border-neutral-200">{isArabic ? "الخصائص" : "Property Specs"}</h3>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="bg-white p-3 rounded-xl border border-neutral-200 flex items-center justify-between shadow-sm">
                    <span className="text-neutral-500">{isArabic ? "المساحة" : "Area"}</span>
                    <span className="font-bold text-neutral-900">{specs.area}</span>
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-neutral-200 flex items-center justify-between shadow-sm">
                    <span className="text-neutral-500">{isArabic ? "عمر البناء" : "Building Age"}</span>
                    <span className="font-bold text-neutral-900">{specs.age}</span>
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-neutral-200 flex items-center justify-between shadow-sm">
                    <span className="text-neutral-500">{isArabic ? "عدد الغرف" : "Bedrooms"}</span>
                    <span className="font-bold text-neutral-900">{specs.beds}</span>
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-neutral-200 flex items-center justify-between shadow-sm">
                    <span className="text-neutral-500">{isArabic ? "رقم الطابق" : "Floor"}</span>
                    <span className="font-bold text-neutral-900">{specs.floor}</span>
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-neutral-200 flex items-center justify-between shadow-sm">
                    <span className="text-neutral-500">{isArabic ? "الحمامات" : "Bathrooms"}</span>
                    <span className="font-bold text-neutral-900">{specs.baths}</span>
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-neutral-200 flex items-center justify-between shadow-sm">
                    <span className="text-neutral-500">{isArabic ? "الشقق بالمبنى" : "Building Units"}</span>
                    <span className="font-bold text-neutral-900">{specs.buildingAppts}</span>
                  </div>
                </div>
              </div>

              {/* Extra Amenities List (ميزات أخرى - Matching Screenshot) */}
              <div className="space-y-3 pt-2">
                <h3 className="text-base font-bold text-neutral-950 pb-2 border-b border-neutral-200">{isArabic ? "ميزات أخرى" : "Amenities"}</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                  {details.amenities.map((amenity, idx) => (
                    <div key={idx} className="bg-neutral-50 p-2.5 rounded-xl border border-neutral-200 flex items-center gap-2 text-neutral-800 font-semibold">
                      <span className="w-2 h-2 rounded-full bg-[#0D5C3A] shrink-0"></span>
                      <span className="truncate">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-4 flex items-center justify-end">
                <AnimatedDotButton
                  variant="blue"
                  onClick={() => {
                    onClose();
                    onOpenInquiry(isArabic ? item.titleAr : item.title);
                  }}
                  text={isArabic ? "طلب معاينة فورية في الموقع" : "Book Direct On-Site Viewing"}
                  isArabic={isArabic}
                  className="w-full justify-center py-4 text-base"
                />
              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default PropertyDetailsModal;
