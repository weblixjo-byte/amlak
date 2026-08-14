import React, { useState } from 'react';
import { AnimatedDotButton } from './ui/animated-dot-button';
import { Building2, Car, Upload, Plus, Trash2, CheckCircle2, Phone, MapPin, Tag, FileText, Check, ArrowRight } from 'lucide-react';

interface AddListingPageProps {
  isArabic: boolean;
  onNavigateHome: () => void;
  onNavigateEstates: () => void;
}

export const AddListingPage: React.FC<AddListingPageProps> = ({
  isArabic,
  onNavigateHome,
  onNavigateEstates,
}) => {
  // Form Categories
  const [category, setCategory] = useState<'estate' | 'car'>('estate');
  const [purpose, setPurpose] = useState<'sale' | 'rent'>('sale');
  
  // Basic Info
  const [title, setTitle] = useState('');
  const [region, setRegion] = useState('');
  const [address, setAddress] = useState('');
  const [price, setPrice] = useState('');
  
  // Detailed Specs
  const [areaOrEngine, setAreaOrEngine] = useState('');
  const [beds, setBeds] = useState('3');
  const [baths, setBaths] = useState('2');
  const [floor, setFloor] = useState('1');
  const [buildingAge, setBuildingAge] = useState('1-5');

  // Selected Amenities Checkbox list
  const [amenities, setAmenities] = useState<string[]>([
    'مصعد',
    'بلكونة',
    'زجاج دبل جلاس',
    'مطبخ مجهز',
  ]);

  // Uploaded Image Files / Previews
  const [uploadedImages, setUploadedImages] = useState<string[]>([
    '/images/hero_mansion.jpg',
    '/images/about_home.jpeg',
  ]);

  // Full Description
  const [description, setDescription] = useState('');

  // Seller Details
  const [ownerName, setOwnerName] = useState('');
  const [ownerPhone, setOwnerPhone] = useState('');
  const [whatsappPhone, setWhatsappPhone] = useState('');

  // Submission State Modal
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const toggleAmenity = (item: string) => {
    setAmenities((prev) =>
      prev.includes(item) ? prev.filter((a) => a !== item) : [...prev, item]
    );
  };

  const handleImageUploadSimulated = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newUrls = Array.from(e.target.files).map((file) => URL.createObjectURL(file));
      setUploadedImages((prev) => [...prev, ...newUrls]);
    }
  };

  const removeImage = (index: number) => {
    setUploadedImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccessModalOpen(true);
  };

  const availableAmenitiesList = [
    'مصعد',
    'بلكونة / تراس',
    'كراج مستقل',
    'تدفئة مركزية',
    'مكيفات سبرلت',
    'مطبخ مجهز',
    'ستلايت مركزي',
    'زجاج دبل جلاس',
    'عزل واجهات حراري',
    'حارس بناية',
    'نظام حماية وكاميرات',
    'غرفة خادمة',
  ];

  return (
    <div className="w-full min-h-screen bg-[#F8FAFC] text-neutral-900 pt-28 pb-20 font-ibm">
      <div className="max-w-4xl mx-auto px-4 md:px-8 space-y-8">
        
        {/* Page Top Header Bar & Breadcrumb */}
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-neutral-200/80 shadow-sm text-right space-y-4">
          <button
            onClick={onNavigateHome}
            className="inline-flex items-center gap-2 text-xs font-bold text-[#1E3A8A] hover:text-[#0D5C3A] transition-colors"
          >
            <ArrowRight className="w-4 h-4" />
            <span>{isArabic ? "العودة للرئيسية" : "Back to Home"}</span>
          </button>

          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-950">
              {isArabic ? "إدراج عقار أو سيارة جديدة للبيع أو الإيجار" : "List Property or Vehicle for Sale / Rent"}
            </h1>
            <p className="text-xs sm:text-sm text-neutral-500">
              {isArabic
                ? "قم بتعبئة تفاصيل معروضك ورفع الصور وسيقوم فريق المعاينة بشركة أملاك بشرائه أو تسويقه لأرقى المستثمرين."
                : "Fill in listing details and upload photos for instant viewing approval."}
            </p>
          </div>
        </div>

        {/* MAIN FORM CONTAINER */}
        <form onSubmit={handleSubmit} className="space-y-8 text-right font-ibm">
          
          {/* STEP 1: Category & Purpose */}
          <div className="bg-white rounded-3xl p-6 md:p-8 border border-neutral-200/80 shadow-sm space-y-4">
            <h2 className="text-lg font-bold text-neutral-900 border-b border-neutral-100 pb-3 flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#1E3A8A]"></span>
              <span>{isArabic ? "1. تصنيف المعروض والغرض" : "1. Category & Purpose"}</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
              
              {/* Category */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-neutral-600 block">{isArabic ? "نوع المعروض" : "Category"}</label>
                <div className="grid grid-cols-2 gap-3 bg-neutral-100 p-1.5 rounded-2xl">
                  <button
                    type="button"
                    onClick={() => setCategory('estate')}
                    className={`py-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                      category === 'estate' ? 'bg-[#1E3A8A] text-white shadow-md' : 'text-neutral-600 hover:text-neutral-900'
                    }`}
                  >
                    <Building2 className="w-4 h-4" />
                    <span>{isArabic ? "عـقـار" : "Property"}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setCategory('car')}
                    className={`py-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                      category === 'car' ? 'bg-[#1E3A8A] text-white shadow-md' : 'text-neutral-600 hover:text-neutral-900'
                    }`}
                  >
                    <Car className="w-4 h-4" />
                    <span>{isArabic ? "سيـارة" : "Vehicle"}</span>
                  </button>
                </div>
              </div>

              {/* Purpose */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-neutral-600 block">{isArabic ? "الغرض من العرض" : "Purpose"}</label>
                <div className="grid grid-cols-2 gap-3 bg-neutral-100 p-1.5 rounded-2xl">
                  <button
                    type="button"
                    onClick={() => setPurpose('sale')}
                    className={`py-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                      purpose === 'sale' ? 'bg-[#0D5C3A] text-white shadow-md' : 'text-neutral-600 hover:text-neutral-900'
                    }`}
                  >
                    <span>{isArabic ? "للبيـع المباشر" : "For Sale"}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPurpose('rent')}
                    className={`py-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                      purpose === 'rent' ? 'bg-[#0D5C3A] text-white shadow-md' : 'text-neutral-600 hover:text-neutral-900'
                    }`}
                  >
                    <span>{isArabic ? "للإيجـار" : "For Rent"}</span>
                  </button>
                </div>
              </div>

            </div>
          </div>

          {/* STEP 2: Basic Information */}
          <div className="bg-white rounded-3xl p-6 md:p-8 border border-neutral-200/80 shadow-sm space-y-4">
            <h2 className="text-lg font-bold text-neutral-900 border-b border-neutral-100 pb-3 flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#1E3A8A]"></span>
              <span>{isArabic ? "2. التفاصيل والعناوين الرئيسية" : "2. Basic Details"}</span>
            </h2>

            <div className="space-y-4 pt-2 text-xs font-bold">
              
              <div className="space-y-1.5">
                <label className="text-neutral-700 block">{isArabic ? "عنوان الإعلان التجاري" : "Listing Title"}</label>
                <input
                  required
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder={isArabic ? "مثال: شقة فاخرة 180m2 للبيع في عبدون مع كراج ومصعد" : "Title..."}
                  className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 text-neutral-900 focus:outline-none focus:border-[#1E3A8A]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-neutral-700 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#1E3A8A]" />
                    <span>{isArabic ? "المنطقة / الحي" : "Region"}</span>
                  </label>
                  <input
                    required
                    type="text"
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                    placeholder={isArabic ? "مثال: عبدون / دابوق / دير غبار" : "Region..."}
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 text-neutral-900 focus:outline-none focus:border-[#1E3A8A]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-neutral-700 flex items-center gap-1">
                    <Tag className="w-3.5 h-3.5 text-red-600" />
                    <span>{isArabic ? "السعر المطلوب (دينار أردني)" : "Price (JOD)"}</span>
                  </label>
                  <input
                    required
                    type="text"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder={isArabic ? "مثال: 120,000" : "Price..."}
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 text-neutral-900 focus:outline-none focus:border-[#1E3A8A] font-mono"
                  />
                </div>
              </div>

            </div>
          </div>

          {/* STEP 3: Detailed Technical Specs */}
          <div className="bg-white rounded-3xl p-6 md:p-8 border border-neutral-200/80 shadow-sm space-y-4">
            <h2 className="text-lg font-bold text-neutral-900 border-b border-neutral-100 pb-3 flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#1E3A8A]"></span>
              <span>{isArabic ? "3. الخصائص الفنية والمساحة" : "3. Specs & Dimensions"}</span>
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-bold pt-2">
              
              <div className="space-y-1.5">
                <label className="text-neutral-700 block">{isArabic ? (category === 'estate' ? "المساحة (م²)" : "سعة المحرك") : "Area"}</label>
                <input
                  required
                  type="text"
                  value={areaOrEngine}
                  onChange={(e) => setAreaOrEngine(e.target.value)}
                  placeholder={isArabic ? "مثال: 180 م²" : "Area..."}
                  className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3 py-2.5 text-neutral-900 focus:outline-none focus:border-[#1E3A8A]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-neutral-700 block">{isArabic ? "عدد الغرف" : "Bedrooms"}</label>
                <select
                  value={beds}
                  onChange={(e) => setBeds(e.target.value)}
                  className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3 py-2.5 text-neutral-900 focus:outline-none"
                >
                  <option value="1">1 {isArabic ? "غرفة" : "Bed"}</option>
                  <option value="2">2 {isArabic ? "غرف نوم" : "Beds"}</option>
                  <option value="3">3 {isArabic ? "غرف نوم" : "Beds"}</option>
                  <option value="4">4 {isArabic ? "غرف نوم" : "Beds"}</option>
                  <option value="5+">5+ {isArabic ? "غرف نوم" : "Beds"}</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-neutral-700 block">{isArabic ? "عدد الحمامات" : "Bathrooms"}</label>
                <select
                  value={baths}
                  onChange={(e) => setBaths(e.target.value)}
                  className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3 py-2.5 text-neutral-900 focus:outline-none"
                >
                  <option value="1">1 {isArabic ? "حمام" : "Bath"}</option>
                  <option value="2">2 {isArabic ? "حمامات" : "Baths"}</option>
                  <option value="3">3 {isArabic ? "حمامات" : "Baths"}</option>
                  <option value="4+">4+ {isArabic ? "حمامات" : "Baths"}</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-neutral-700 block">{isArabic ? "رقم الطابق" : "Floor"}</label>
                <select
                  value={floor}
                  onChange={(e) => setFloor(e.target.value)}
                  className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3 py-2.5 text-neutral-900 focus:outline-none"
                >
                  <option value="0">{isArabic ? "طابق أرضي" : "Ground"}</option>
                  <option value="1">{isArabic ? "طابق أول" : "1st Floor"}</option>
                  <option value="2">{isArabic ? "طابق ثاني" : "2nd Floor"}</option>
                  <option value="3">{isArabic ? "طابق ثالث / روف" : "Roof"}</option>
                </select>
              </div>

            </div>
          </div>

          {/* STEP 4: Image Upload Drag & Drop Section (Matching User Directive) */}
          <div className="bg-white rounded-3xl p-6 md:p-8 border border-neutral-200/80 shadow-sm space-y-4">
            <h2 className="text-lg font-bold text-neutral-900 border-b border-neutral-100 pb-3 flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#1E3A8A]"></span>
              <span>{isArabic ? "4. رفع صور العقار / السيارة" : "4. Upload Property Photos"}</span>
            </h2>

            <div className="space-y-4 pt-2">
              
              {/* Drag & Drop Upload Zone */}
              <div className="border-2 border-dashed border-neutral-300 hover:border-[#1E3A8A] bg-neutral-50 hover:bg-[#1E3A8A]/5 rounded-3xl p-8 text-center transition-all cursor-pointer relative group">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUploadSimulated}
                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10"
                />
                <div className="space-y-3 pointer-events-none">
                  <div className="w-14 h-14 rounded-2xl bg-[#1E3A8A]/10 text-[#1E3A8A] flex items-center justify-center mx-auto shadow-sm group-hover:scale-110 transition-transform">
                    <Upload className="w-7 h-7" />
                  </div>
                  <h3 className="text-sm font-bold text-neutral-800">
                    {isArabic ? "اضغط هنا أو اسحب الصور لرفع صور المعروض" : "Click or drag images to upload"}
                  </h3>
                  <p className="text-xs text-neutral-400">
                    {isArabic ? "يدعم صيغ JPG, PNG, WEBP (يمكنك رفع عدة صور عالية الجودة)" : "Supports JPG, PNG, WEBP"}
                  </p>
                </div>
              </div>

              {/* Uploaded Images Previews Grid */}
              {uploadedImages.length > 0 && (
                <div className="space-y-2 pt-2">
                  <label className="text-xs font-bold text-neutral-600 block">{isArabic ? "الصور المرفوعة حالياً:" : "Uploaded Photos:"}</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {uploadedImages.map((img, idx) => (
                      <div key={idx} className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-neutral-200 group shadow-sm">
                        <img src={img} alt="معاينة" className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => removeImage(idx)}
                          className="absolute top-2 left-2 p-1.5 rounded-full bg-red-600 text-white shadow-md hover:bg-red-700 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          </div>

          {/* STEP 5: Amenities Checklist */}
          <div className="bg-white rounded-3xl p-6 md:p-8 border border-neutral-200/80 shadow-sm space-y-4">
            <h2 className="text-lg font-bold text-neutral-900 border-b border-neutral-100 pb-3 flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#1E3A8A]"></span>
              <span>{isArabic ? "5. الميزات والخدمات المتوفرة" : "5. Features & Amenities"}</span>
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs font-bold">
              {availableAmenitiesList.map((item, idx) => {
                const isSelected = amenities.includes(item);
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => toggleAmenity(item)}
                    className={`p-3 rounded-xl border transition-all text-right flex items-center justify-between ${
                      isSelected
                        ? 'bg-[#0D5C3A]/10 border-[#0D5C3A] text-[#0D5C3A] font-extrabold shadow-sm'
                        : 'bg-neutral-50 border-neutral-200 text-neutral-700 hover:bg-neutral-100'
                    }`}
                  >
                    <span>{item}</span>
                    {isSelected && <Check className="w-4 h-4 text-[#0D5C3A]" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* STEP 6: Description & Seller Contact */}
          <div className="bg-white rounded-3xl p-6 md:p-8 border border-neutral-200/80 shadow-sm space-y-4">
            <h2 className="text-lg font-bold text-neutral-900 border-b border-neutral-100 pb-3 flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#1E3A8A]"></span>
              <span>{isArabic ? "6. الوصف الكامل ومعلومات التواصل" : "6. Full Description & Seller Info"}</span>
            </h2>

            <div className="space-y-4 pt-2 text-xs font-bold">
              
              <div className="space-y-1.5">
                <label className="text-neutral-700 block">{isArabic ? "الوصف التفصيلي للمعروض" : "Full Description"}</label>
                <textarea
                  required
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder={isArabic ? "اكتب جميع تفاصيل ومواصفات العقار أو السيارة هنا..." : "Description..."}
                  className="w-full bg-neutral-50 border border-neutral-200 rounded-xl p-3.5 text-neutral-900 focus:outline-none focus:border-[#1E3A8A]"
                ></textarea>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="text-neutral-700 block">{isArabic ? "اسم صاحب المعروض" : "Owner Name"}</label>
                  <input
                    required
                    type="text"
                    value={ownerName}
                    onChange={(e) => setOwnerName(e.target.value)}
                    placeholder={isArabic ? "الاسم الكامل" : "Owner Name"}
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 text-neutral-900 focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-neutral-700 block">{isArabic ? "رقم الهاتف الأساسي" : "Phone Number"}</label>
                  <input
                    required
                    type="tel"
                    value={ownerPhone}
                    onChange={(e) => setOwnerPhone(e.target.value)}
                    placeholder="079XXXXXXX"
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 text-neutral-900 focus:outline-none font-mono dir-ltr text-right"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-neutral-700 block">{isArabic ? "رقم الواتساب" : "WhatsApp Number"}</label>
                  <input
                    type="tel"
                    value={whatsappPhone}
                    onChange={(e) => setWhatsappPhone(e.target.value)}
                    placeholder="077XXXXXXX"
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 text-neutral-900 focus:outline-none font-mono dir-ltr text-right"
                  />
                </div>
              </div>

            </div>
          </div>

          {/* SUBMIT ACTION BUTTON (إضافة للبيع والإدراج) */}
          <div className="pt-2">
            <AnimatedDotButton
              variant="blue"
              text={isArabic ? "إضافة للبيع والإدراج" : "Submit Listing for Review"}
              isArabic={isArabic}
              className="w-full justify-center py-4 text-base shadow-xl"
            />
          </div>

        </form>

      </div>

      {/* SUCCESS CONFIRMATION MODAL ("تم إرسال طلبك للمراجعة") */}
      {isSuccessModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white border border-neutral-200 rounded-3xl p-8 max-w-lg w-full shadow-2xl space-y-6 text-center font-ibm animate-fade-in-up">
            
            <div className="w-16 h-16 rounded-full bg-[#0D5C3A]/10 text-[#0D5C3A] flex items-center justify-center mx-auto shadow-sm">
              <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-extrabold text-neutral-950">
                {isArabic ? "تم إرسال طلبك للمراجعة بنجاح!" : "Your listing has been submitted for review!"}
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed max-w-md mx-auto font-normal">
                {isArabic
                  ? "شكراً لك! تم تسليم تفاصيل وصور المعروض إلى فريق المعاينة بشركة أملاك. سيقوم أحد مستشارينا بشرائها أو تدقيقها وتأكيدها خلال أقل من 24 ساعة."
                  : "Thank you! Your property/vehicle listing has been submitted. Our viewing team will review and confirm it within 24 hours."}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              <button
                onClick={() => {
                  setIsSuccessModalOpen(false);
                  onNavigateHome();
                }}
                className="w-full py-3.5 px-6 bg-[#1E3A8A] hover:bg-[#152C6E] text-white font-bold rounded-2xl text-sm transition-colors shadow-md"
              >
                {isArabic ? "العودة للصفحة الرئيسية" : "Back to Home"}
              </button>
              <button
                onClick={() => {
                  setIsSuccessModalOpen(false);
                  onNavigateEstates();
                }}
                className="w-full py-3.5 px-6 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 font-bold rounded-2xl text-sm transition-colors"
              >
                {isArabic ? "تصفح العقارات" : "Browse Properties"}
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default AddListingPage;
