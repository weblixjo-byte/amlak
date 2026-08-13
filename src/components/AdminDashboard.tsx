import React, { useState, useMemo } from 'react';
import { PropertyItem, Brand } from '../types';

interface AdminDashboardProps {
  isArabic: boolean;
  onNavigateHome: () => void;
  onOpenInquiry: (title?: string) => void;
  properties: PropertyItem[];
  setProperties: React.Dispatch<React.SetStateAction<PropertyItem[]>>;
  cars: PropertyItem[];
  setCars: React.Dispatch<React.SetStateAction<PropertyItem[]>>;
  brands: Brand[];
  setBrands: React.Dispatch<React.SetStateAction<Brand[]>>;
  onResetDefaults?: () => void;
}

// ─────────────────────────────────────────────────────────────
// Empty form state helpers
// ─────────────────────────────────────────────────────────────
const emptyForm = () => ({
  titleAr: '',
  title: '',
  locationOrSpecsAr: '',
  locationOrSpecs: '',
  price: '',
  badgeAr: 'متاح للبيع',
  badge: 'Available',
  bedsOrHp: '',
  bathsOrSpeed: '',
  areaOrEngine: '',
  imageUrl: '',
  type: '',
  description: '',
});

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  isArabic,
  onNavigateHome,
  properties,
  setProperties,
  cars,
  setCars,
  brands,
  setBrands,
  onResetDefaults,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'properties' | 'cars' | 'brands' | 'inquiries'>('overview');

  // Dynamic Real Data State for Inquiries
  const [inquiries, setInquiries] = useState([
    { id: 'inq-101', name: 'أحمد المجالي', phone: '+962 7 9123 4567', item: 'شقة فاخرة في جبل عمّان', date: '2026-08-12', status: 'جديد', type: 'معاينة عقار' },
    { id: 'inq-102', name: 'سارة خالد', phone: '+962 7 8888 9999', item: 'رولز رويس سبيكتر', date: '2026-08-11', status: 'تم التواصل', type: 'شراء مباشر' },
    { id: 'inq-103', name: 'عمر القاسم', phone: '+962 7 7711 2233', item: 'فيلا نخلة جميرا دبي', date: '2026-08-10', status: 'قيد المتابعة', type: 'استفسار عام' },
  ]);

  // DYNAMIC COMPUTATIONS
  const totalAssetValueNum = useMemo(() => {
    const parsePrice = (priceStr: string): number => {
      const cleaned = priceStr.replace(/[^0-9]/g, '');
      return parseInt(cleaned, 10) || 0;
    };
    return properties.reduce((acc, p) => acc + parsePrice(p.price), 0)
         + cars.reduce((acc, c) => acc + parsePrice(c.price), 0);
  }, [properties, cars]);

  const formattedTotalValue = useMemo(() => `JOD ${totalAssetValueNum.toLocaleString('en-US')}`, [totalAssetValueNum]);

  // ── Add Modal State ──────────────────────────────────────────
  const [showAddModal, setShowAddModal] = useState(false);
  const [addCategory, setAddCategory] = useState<'estate' | 'car'>('estate');
  const [form, setForm] = useState(emptyForm());

  const setField = (key: keyof ReturnType<typeof emptyForm>, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleCreateListing = (e: React.FormEvent) => {
    e.preventDefault();
    const newItem: PropertyItem = {
      id: `item-${Date.now()}`,
      titleAr: form.titleAr,
      title: form.title || form.titleAr,
      category: addCategory,
      type: form.type || (addCategory === 'estate' ? 'Apartment' : 'Car'),
      locationOrSpecsAr: form.locationOrSpecsAr,
      locationOrSpecs: form.locationOrSpecs || form.locationOrSpecsAr,
      price: form.price.startsWith('JOD') ? form.price : `JOD ${form.price}`,
      imageUrl: form.imageUrl || (addCategory === 'estate' ? '/images/dabouq_villa.jpg' : '/images/hero_car.jpg'),
      badgeAr: form.badgeAr,
      badge: form.badge,
      specs: {
        bedsOrHp: form.bedsOrHp || undefined,
        bathsOrSpeed: form.bathsOrSpeed || undefined,
        areaOrEngine: form.areaOrEngine || undefined,
      },
      description: form.description,
      featured: true,
    };

    if (addCategory === 'estate') {
      setProperties((prev) => [newItem, ...prev]);
    } else {
      setCars((prev) => [newItem, ...prev]);
    }

    setForm(emptyForm());
    setShowAddModal(false);
  };

  // ── Brand State ──────────────────────────────────────────────
  const [newBrandName, setNewBrandName] = useState('');
  const [newBrandImageUrl, setNewBrandImageUrl] = useState('');
  const handleAddBrand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBrandName.trim()) return;
    setBrands((prev) => [...prev, {
      id: `brand-${Date.now()}`,
      name: newBrandName.trim(),
      imageUrl: newBrandImageUrl.trim() || undefined,
    }]);
    setNewBrandName('');
    setNewBrandImageUrl('');
  };
  const handleDeleteBrand = (id: string) => setBrands((prev) => prev.filter((b) => b.id !== id));

  // ── Inquiries ────────────────────────────────────────────────
  const handleStatusChange = (id: string, newStatus: string) =>
    setInquiries(inquiries.map((inq) => (inq.id === id ? { ...inq, status: newStatus } : inq)));

  // ─────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-neutral-900 font-ibm pt-10 pb-20">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">

        {/* ── Top Header ──────────────────────────────────────── */}
        <div className="bg-white border border-neutral-200 rounded-3xl p-6 md:p-8 shadow-sm mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <button onClick={onNavigateHome} className="text-xs font-bold text-[#1E3A8A] hover:underline transition-colors flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                <span>{isArabic ? 'الرجوع للموقع الرئيسي' : 'Back to Website'}</span>
              </button>
              <span className="text-neutral-300">•</span>
              {onResetDefaults && (
                <>
                  <button
                    onClick={onResetDefaults}
                    className="text-xs font-bold text-neutral-600 hover:text-[#1E3A8A] bg-neutral-100 hover:bg-neutral-200 px-3 py-1 rounded-lg transition-colors flex items-center gap-1"
                    title={isArabic ? 'استعادة العقارات والسيارات والبراندات النموذجية' : 'Reset sample data'}
                  >
                    <span className="material-symbols-outlined text-[15px]">restart_alt</span>
                    <span>{isArabic ? 'استعادة البيانات النموذجية' : 'Restore Demo Data'}</span>
                  </button>
                  <span className="text-neutral-300">•</span>
                </>
              )}
              <span className="text-neutral-500 text-xs font-bold uppercase tracking-wider">AMLAK PLATFORM</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-neutral-900 font-ibm">
              {isArabic ? 'لوحة تحكم منصة أمـلاك' : 'Amlak Admin Dashboard'}
            </h1>
          </div>

          {/* Stats badges */}
          <div className="flex flex-wrap gap-3">
            <div className="bg-blue-50 border border-blue-200 rounded-2xl px-4 py-3 flex items-center gap-2">
              <span className="material-symbols-outlined text-[#1E3A8A] text-[20px]">apartment</span>
              <div>
                <div className="text-xs text-blue-700 font-bold">{isArabic ? 'العقارات' : 'Properties'}</div>
                <div className="text-lg font-bold text-[#1E3A8A]">{properties.length}</div>
              </div>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-2xl px-4 py-3 flex items-center gap-2">
              <span className="material-symbols-outlined text-[#1E3A8A] text-[20px]">directions_car</span>
              <div>
                <div className="text-xs text-blue-700 font-bold">{isArabic ? 'السيارات' : 'Vehicles'}</div>
                <div className="text-lg font-bold text-[#1E3A8A]">{cars.length}</div>
              </div>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-2xl px-4 py-3 flex items-center gap-2">
              <span className="material-symbols-outlined text-[#1E3A8A] text-[20px]">storefront</span>
              <div>
                <div className="text-xs text-blue-700 font-bold">{isArabic ? 'البراندات' : 'Brands'}</div>
                <div className="text-lg font-bold text-[#1E3A8A]">{brands.length}</div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Navigation Tabs ─────────────────────────────────── */}
        <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2 border-b border-neutral-200 no-scrollbar">
          {(
            [
              { key: 'overview', icon: 'dashboard', ar: 'التحليلات العامة', en: 'Overview' },
              { key: 'properties', icon: 'apartment', ar: 'إدارة العقارات', en: 'Properties', count: properties.length },
              { key: 'cars', icon: 'directions_car', ar: 'إدارة السيارات', en: 'Vehicles', count: cars.length },
              { key: 'brands', icon: 'storefront', ar: 'البراندات والشركاء', en: 'Brand Partners', count: brands.length },
              { key: 'inquiries', icon: 'mark_email_unread', ar: 'طلبات العملاء', en: 'Inquiries', count: inquiries.length, green: true },
            ] as const
          ).map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-5 py-3 rounded-xl font-bold text-xs md:text-sm transition-all flex items-center gap-2 whitespace-nowrap ${
                activeTab === tab.key
                  ? 'bg-[#1E3A8A] text-white shadow-md'
                  : 'bg-white hover:bg-neutral-100 text-neutral-700 border border-neutral-200'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">{tab.icon}</span>
              <span>{isArabic ? tab.ar : tab.en}</span>
              {'count' in tab && (
                <span className={`px-2 py-0.5 rounded-md text-[11px] font-bold font-mono ${
                  'green' in tab && tab.green ? 'bg-emerald-100 text-emerald-800' : 'bg-neutral-100 text-neutral-800'
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* ══════════════════════════════════════════════════════
            TAB 1: OVERVIEW
        ══════════════════════════════════════════════════════ */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { label: isArabic ? 'إجمالي قيمة المعروضات' : 'Total Asset Value', value: formattedTotalValue, icon: 'payments', color: 'blue' },
                { label: isArabic ? 'إجمالي العقارات' : 'Total Properties', value: properties.length, icon: 'apartment', color: 'blue' },
                { label: isArabic ? 'إجمالي السيارات' : 'Total Vehicles', value: cars.length, icon: 'directions_car', color: 'blue' },
                { label: isArabic ? 'طلبات العملاء' : 'Inquiries', value: inquiries.length, icon: 'mark_email_unread', color: 'emerald' },
              ].map((card, i) => (
                <div key={i} className="bg-white border border-neutral-200 p-6 rounded-2xl flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between text-neutral-500 mb-3">
                    <span className="text-xs font-bold uppercase">{card.label}</span>
                    <div className={`w-10 h-10 rounded-xl bg-${card.color}-50 text-[#1E3A8A] flex items-center justify-center`}>
                      <span className="material-symbols-outlined text-[20px]">{card.icon}</span>
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-neutral-900 font-mono">{card.value}</div>
                </div>
              ))}
            </div>

            {/* Quick actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { label: isArabic ? 'إضافة عقار جديد' : 'Add Property', icon: 'add_home', action: () => { setAddCategory('estate'); setShowAddModal(true); } },
                { label: isArabic ? 'إضافة سيارة جديدة' : 'Add Vehicle', icon: 'add', action: () => { setAddCategory('car'); setShowAddModal(true); } },
                { label: isArabic ? 'إدارة البراندات' : 'Manage Brands', icon: 'storefront', action: () => setActiveTab('brands') },
              ].map((btn, i) => (
                <button
                  key={i}
                  onClick={btn.action}
                  className="bg-white border border-neutral-200 p-6 rounded-2xl flex items-center gap-4 shadow-sm hover:shadow-md hover:border-[#1E3A8A] transition-all group text-right"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#1E3A8A]/10 text-[#1E3A8A] flex items-center justify-center group-hover:bg-[#1E3A8A] group-hover:text-white transition-colors">
                    <span className="material-symbols-outlined text-[24px]">{btn.icon}</span>
                  </div>
                  <span className="font-bold text-neutral-900">{btn.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════════════════
            TAB 2 & 3: PROPERTIES & CARS CRUD
        ══════════════════════════════════════════════════════ */}
        {(activeTab === 'properties' || activeTab === 'cars') && (
          <div className="space-y-6">
            {/* Header row */}
            <div className="flex items-center justify-between bg-white border border-neutral-200 p-6 rounded-2xl shadow-sm">
              <div>
                <h3 className="text-xl font-bold text-neutral-900 font-ibm">
                  {activeTab === 'properties'
                    ? (isArabic ? 'قسم العقارات والشقق' : 'Properties Section')
                    : (isArabic ? 'قسم السيارات الفاخرة' : 'Luxury Vehicles Section')}
                </h3>
                <p className="text-xs text-neutral-500 mt-1">
                  {isArabic ? 'كل ما تضيفه هنا يظهر مباشرة على الموقع' : 'Everything you add here shows live on the website'}
                </p>
              </div>
              <button
                onClick={() => {
                  setAddCategory(activeTab === 'properties' ? 'estate' : 'car');
                  setShowAddModal(true);
                }}
                className="bg-[#1E3A8A] hover:bg-[#16316e] text-white px-5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all shadow-sm"
              >
                <span className="material-symbols-outlined text-[18px]">add</span>
                <span>{isArabic ? 'إضافة جديد' : 'Add New'}</span>
              </button>
            </div>

            {/* Table */}
            {(activeTab === 'properties' ? properties : cars).length === 0 ? (
              <div className="bg-white border border-dashed border-neutral-300 rounded-2xl p-12 text-center">
                <span className="material-symbols-outlined text-[48px] text-neutral-300 mb-3 block">
                  {activeTab === 'properties' ? 'apartment' : 'directions_car'}
                </span>
                <p className="text-neutral-500 font-bold text-sm">
                  {isArabic ? 'لا توجد عناصر بعد. ابدأ بإضافة الأول.' : 'No items yet. Add your first one.'}
                </p>
              </div>
            ) : (
              <div className="bg-white border border-neutral-200 rounded-2xl overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-right font-ibm text-xs">
                    <thead>
                      <tr className="bg-neutral-50 border-b border-neutral-200 text-neutral-500 uppercase text-[11px]">
                        <th className="py-4 px-4">{isArabic ? 'الصورة' : 'Image'}</th>
                        <th className="py-4 px-4">{isArabic ? 'العنوان' : 'Title'}</th>
                        <th className="py-4 px-4">{isArabic ? 'الموقع / المواصفات' : 'Location / Specs'}</th>
                        <th className="py-4 px-4">{isArabic ? 'السعر' : 'Price'}</th>
                        <th className="py-4 px-4">{isArabic ? 'التفاصيل' : 'Specs'}</th>
                        <th className="py-4 px-4">{isArabic ? 'الحالة' : 'Badge'}</th>
                        <th className="py-4 px-4 text-center">{isArabic ? 'حذف' : 'Delete'}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-100">
                      {(activeTab === 'properties' ? properties : cars).map((item) => (
                        <tr key={item.id} className="hover:bg-neutral-50 transition-colors">
                          <td className="py-3 px-4">
                            <img
                              src={item.imageUrl}
                              alt={item.title}
                              className="w-14 h-10 rounded-lg object-cover border border-neutral-200"
                            />
                          </td>
                          <td className="py-3 px-4">
                            <div className="font-bold text-neutral-900">{isArabic ? item.titleAr : item.title}</div>
                            <div className="text-neutral-400 text-[11px] font-mono">{item.id}</div>
                          </td>
                          <td className="py-3 px-4 text-neutral-600">
                            {isArabic ? item.locationOrSpecsAr : item.locationOrSpecs}
                          </td>
                          <td className="py-3 px-4 font-mono font-bold text-[#1E3A8A]">{item.price}</td>
                          <td className="py-3 px-4 text-neutral-500">
                            {[item.specs.bedsOrHp, item.specs.bathsOrSpeed, item.specs.areaOrEngine].filter(Boolean).join(' • ') || '—'}
                          </td>
                          <td className="py-3 px-4">
                            <span className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 font-bold text-[11px]">
                              {isArabic ? item.badgeAr : item.badge}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-center">
                            <button
                              onClick={() => {
                                if (activeTab === 'properties') {
                                  setProperties((prev) => prev.filter((p) => p.id !== item.id));
                                } else {
                                  setCars((prev) => prev.filter((c) => c.id !== item.id));
                                }
                              }}
                              className="p-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 transition-colors"
                              title={isArabic ? 'حذف' : 'Delete'}
                            >
                              <span className="material-symbols-outlined text-[18px]">delete</span>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ══════════════════════════════════════════════════════
            TAB 4: BRAND PARTNERS
        ══════════════════════════════════════════════════════ */}
        {activeTab === 'brands' && (
          <div className="space-y-6">
            <div className="bg-white border border-neutral-200 p-6 rounded-2xl shadow-sm">
              <h3 className="text-xl font-bold text-neutral-900 font-ibm">
                {isArabic ? 'إدارة البراندات والشركاء' : 'Brand Partners Management'}
              </h3>
              <p className="text-xs text-neutral-500 mt-1">
                {isArabic ? 'البراندات المضافة تظهر كشريط متحرك أسفل الهيرو مباشرة' : 'Brands appear as a scrolling marquee below the hero section'}
              </p>
            </div>

            {/* Add brand form */}
            <div className="bg-white border border-neutral-200 p-6 rounded-2xl shadow-sm">
              <h4 className="text-sm font-bold text-neutral-700 mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-[#1E3A8A] text-[18px]">add_circle</span>
                {isArabic ? 'إضافة براند جديد' : 'Add New Brand'}
              </h4>
              <form onSubmit={handleAddBrand} className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="flex flex-col gap-1 flex-grow">
                    <label className="text-xs font-bold text-neutral-600">
                      {isArabic ? 'اسم البراند *' : 'Brand Name *'}
                    </label>
                    <input
                      type="text"
                      value={newBrandName}
                      onChange={(e) => setNewBrandName(e.target.value)}
                      placeholder={isArabic ? 'مثال: BMW، Rolls-Royce، Ferrari' : 'e.g. BMW, Rolls-Royce, Ferrari'}
                      required
                      className="bg-neutral-50 border border-neutral-300 rounded-xl px-4 py-3 text-sm text-neutral-900 focus:outline-none focus:border-[#1E3A8A] font-ibm w-full"
                    />
                  </div>
                  <div className="flex flex-col gap-1 flex-grow">
                    <label className="text-xs font-bold text-neutral-600">
                      {isArabic ? 'رابط صورة الشعار (اختياري)' : 'Logo Image URL (optional)'}
                    </label>
                    <input
                      type="text"
                      value={newBrandImageUrl}
                      onChange={(e) => setNewBrandImageUrl(e.target.value)}
                      placeholder="https://example.com/logo.png"
                      className="bg-neutral-50 border border-neutral-300 rounded-xl px-4 py-3 text-sm text-neutral-900 focus:outline-none focus:border-[#1E3A8A] font-mono w-full"
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-[#1E3A8A] hover:bg-[#16316e] text-white px-6 py-3 rounded-xl font-bold text-sm flex items-center gap-2 shadow-sm transition-all whitespace-nowrap self-end"
                  >
                    <span className="material-symbols-outlined text-[18px]">add</span>
                    {isArabic ? 'إضافة' : 'Add'}
                  </button>
                </div>
                {newBrandImageUrl && (
                  <div className="flex items-center gap-3 bg-neutral-50 border border-neutral-200 rounded-xl p-3">
                    <span className="text-xs text-neutral-500 font-bold">{isArabic ? 'معاينة الشعار:' : 'Logo Preview:'}</span>
                    <img
                      src={newBrandImageUrl}
                      alt="preview"
                      className="h-8 max-w-[120px] object-contain rounded"
                      onError={(e) => { (e.target as HTMLImageElement).style.opacity = '0.3'; }}
                    />
                  </div>
                )}
              </form>
            </div>

            {/* Brand list */}
            {brands.length === 0 ? (
              <div className="bg-white border border-dashed border-neutral-300 rounded-2xl p-12 text-center">
                <span className="material-symbols-outlined text-[48px] text-neutral-300 mb-3 block">storefront</span>
                <p className="text-neutral-500 font-bold text-sm">
                  {isArabic ? 'لا توجد براندات بعد. ابدأ بإضافة الأول.' : 'No brands yet. Add your first one.'}
                </p>
              </div>
            ) : (
              <div className="bg-white border border-neutral-200 p-6 rounded-2xl shadow-sm">
                <h4 className="text-xs font-bold uppercase text-neutral-500 tracking-wider mb-4">
                  {isArabic ? `البراندات المضافة (${brands.length})` : `Added Brands (${brands.length})`}
                </h4>
                <div className="flex flex-wrap gap-3">
                  {brands.map((brand) => (
                    <div
                      key={brand.id}
                      className="flex items-center gap-2 bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-2.5"
                    >
                      {brand.imageUrl && (
                        <img
                          src={brand.imageUrl}
                          alt={brand.name}
                          className="h-6 max-w-[60px] object-contain"
                        />
                      )}
                      <span className="text-sm font-bold text-neutral-800">{brand.name}</span>
                      <button
                        onClick={() => handleDeleteBrand(brand.id)}
                        className="w-5 h-5 rounded-full bg-red-100 hover:bg-red-200 text-red-600 flex items-center justify-center transition-colors"
                        title={isArabic ? 'حذف' : 'Delete'}
                      >
                        <span className="material-symbols-outlined text-[14px]">close</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ══════════════════════════════════════════════════════
            TAB 5: INQUIRIES
        ══════════════════════════════════════════════════════ */}
        {activeTab === 'inquiries' && (
          <div className="space-y-6">
            <div className="bg-white border border-neutral-200 p-6 rounded-2xl shadow-sm">
              <h3 className="text-xl font-bold text-neutral-900 font-ibm">{isArabic ? 'إدارة طلبات العملاء' : 'Customer Inquiries & Leads'}</h3>
              <p className="text-xs text-neutral-500 mt-1">{isArabic ? 'متابعة وتحديث حالة الطلبات' : 'Manage incoming contact forms'}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {inquiries.map((inq) => (
                <div key={inq.id} className="bg-white border border-neutral-200 p-6 rounded-2xl flex flex-col justify-between gap-4 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
                    <span className="font-mono text-xs font-bold text-[#1E3A8A]">{inq.id}</span>
                    <span className="px-2.5 py-0.5 rounded-lg bg-emerald-50 text-emerald-700 text-xs font-bold">{inq.status}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-xs text-neutral-500">{isArabic ? 'العميل:' : 'Client:'}</span>
                    <h4 className="text-base font-bold text-neutral-900">{inq.name}</h4>
                    <span className="text-xs font-mono text-neutral-600">{inq.phone}</span>
                  </div>
                  <div className="bg-neutral-50 p-3 rounded-xl border border-neutral-200 flex flex-col gap-1 text-xs">
                    <span className="text-neutral-500 font-bold">{isArabic ? 'الموضوع:' : 'Requested:'}</span>
                    <span className="text-neutral-800 font-bold">{inq.item}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleStatusChange(inq.id, 'تم التواصل')}
                      className="flex-grow py-2.5 rounded-xl bg-[#1E3A8A] hover:bg-[#16316e] text-white font-bold text-xs flex items-center justify-center gap-1 shadow-sm transition-colors"
                    >
                      <span className="material-symbols-outlined text-[16px]">check_circle</span>
                      <span>{isArabic ? 'تم التواصل' : 'Mark Contacted'}</span>
                    </button>
                    <button
                      onClick={() => alert(`الاتصال: ${inq.phone}`)}
                      className="p-2.5 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-800 transition-colors"
                      title={isArabic ? 'اتصال' : 'Call'}
                    >
                      <span className="material-symbols-outlined text-[18px]">call</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════════════════
            ADD LISTING MODAL (Full Fields)
        ══════════════════════════════════════════════════════ */}
        {showAddModal && (
          <div className="fixed inset-0 z-50 bg-neutral-900/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white border border-neutral-200 rounded-3xl p-8 max-w-2xl w-full shadow-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between border-b border-neutral-100 pb-4 mb-6">
                <h3 className="text-lg font-bold text-neutral-900 font-ibm flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#1E3A8A] text-[22px]">
                    {addCategory === 'estate' ? 'apartment' : 'directions_car'}
                  </span>
                  {isArabic
                    ? (addCategory === 'estate' ? 'إضافة عقار جديد' : 'إضافة سيارة جديدة')
                    : (addCategory === 'estate' ? 'Add New Property' : 'Add New Vehicle')}
                </h3>
                <button onClick={() => setShowAddModal(false)} className="text-neutral-400 hover:text-neutral-800 transition-colors">
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>

              <form onSubmit={handleCreateListing} className="space-y-4 font-ibm text-xs">
                {/* Category */}
                <div>
                  <label className="block text-neutral-700 font-bold mb-2">{isArabic ? 'نوع الفئة' : 'Category'}</label>
                  <div className="flex gap-3">
                    {(['estate', 'car'] as const).map((cat) => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setAddCategory(cat)}
                        className={`flex-1 py-3 rounded-xl font-bold border transition-all ${
                          addCategory === cat
                            ? 'bg-[#1E3A8A] text-white border-[#1E3A8A]'
                            : 'bg-neutral-50 text-neutral-600 border-neutral-300 hover:border-[#1E3A8A]'
                        }`}
                      >
                        <span className="material-symbols-outlined text-[18px] block mx-auto mb-1">
                          {cat === 'estate' ? 'apartment' : 'directions_car'}
                        </span>
                        {cat === 'estate' ? (isArabic ? 'عقار / شقة' : 'Property') : (isArabic ? 'سيارة' : 'Vehicle')}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2-col fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-neutral-700 font-bold mb-2">
                      {isArabic ? 'العنوان بالعربية *' : 'Arabic Title *'}
                    </label>
                    <input required type="text" value={form.titleAr}
                      onChange={(e) => setField('titleAr', e.target.value)}
                      placeholder={addCategory === 'estate' ? 'شقة فاخرة في جبل عمّان' : 'بوغاتي توربيون 2026'}
                      className="w-full bg-neutral-50 border border-neutral-300 rounded-xl px-4 py-3 text-neutral-900 focus:outline-none focus:border-[#1E3A8A]"
                    />
                  </div>
                  <div>
                    <label className="block text-neutral-700 font-bold mb-2">
                      {isArabic ? 'العنوان بالإنجليزية' : 'English Title'}
                    </label>
                    <input type="text" value={form.title}
                      onChange={(e) => setField('title', e.target.value)}
                      placeholder={addCategory === 'estate' ? 'Luxury Apartment in Jabal Amman' : 'Bugatti Tourbillon 2026'}
                      className="w-full bg-neutral-50 border border-neutral-300 rounded-xl px-4 py-3 text-neutral-900 focus:outline-none focus:border-[#1E3A8A]"
                    />
                  </div>
                  <div>
                    <label className="block text-neutral-700 font-bold mb-2">
                      {addCategory === 'estate' ? (isArabic ? 'الموقع بالعربية *' : 'Arabic Location *') : (isArabic ? 'المواصفات بالعربية *' : 'Arabic Specs *')}
                    </label>
                    <input required type="text" value={form.locationOrSpecsAr}
                      onChange={(e) => setField('locationOrSpecsAr', e.target.value)}
                      placeholder={addCategory === 'estate' ? 'جبل عمّان — 220م²' : 'معرض عمّان، الأردن'}
                      className="w-full bg-neutral-50 border border-neutral-300 rounded-xl px-4 py-3 text-neutral-900 focus:outline-none focus:border-[#1E3A8A]"
                    />
                  </div>
                  <div>
                    <label className="block text-neutral-700 font-bold mb-2">
                      {addCategory === 'estate' ? (isArabic ? 'الموقع بالإنجليزية' : 'English Location') : (isArabic ? 'المواصفات بالإنجليزية' : 'English Specs')}
                    </label>
                    <input type="text" value={form.locationOrSpecs}
                      onChange={(e) => setField('locationOrSpecs', e.target.value)}
                      placeholder={addCategory === 'estate' ? 'Jabal Amman — 220sqm' : 'Amman Showroom, Jordan'}
                      className="w-full bg-neutral-50 border border-neutral-300 rounded-xl px-4 py-3 text-neutral-900 focus:outline-none focus:border-[#1E3A8A]"
                    />
                  </div>
                  <div>
                    <label className="block text-neutral-700 font-bold mb-2">{isArabic ? 'السعر (JOD) *' : 'Price (JOD) *'}</label>
                    <input required type="text" value={form.price}
                      onChange={(e) => setField('price', e.target.value)}
                      placeholder="250,000"
                      className="w-full bg-neutral-50 border border-neutral-300 rounded-xl px-4 py-3 text-neutral-900 focus:outline-none focus:border-[#1E3A8A]"
                    />
                  </div>
                  <div>
                    <label className="block text-neutral-700 font-bold mb-2">{isArabic ? 'رابط الصورة' : 'Image URL'}</label>
                    <input type="text" value={form.imageUrl}
                      onChange={(e) => setField('imageUrl', e.target.value)}
                      placeholder="/images/photo.jpg"
                      className="w-full bg-neutral-50 border border-neutral-300 rounded-xl px-4 py-3 text-neutral-900 focus:outline-none focus:border-[#1E3A8A]"
                    />
                  </div>
                </div>

                {/* Specs line */}
                <div className="border border-neutral-200 rounded-xl p-4 bg-neutral-50 space-y-3">
                  <p className="text-xs font-bold text-neutral-600 uppercase tracking-wide">
                    {addCategory === 'estate'
                      ? (isArabic ? 'مواصفات العقار' : 'Property Specs')
                      : (isArabic ? 'مواصفات السيارة' : 'Vehicle Specs')}
                  </p>
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="block text-neutral-500 font-bold mb-1">
                        {addCategory === 'estate' ? (isArabic ? 'الغرف' : 'Beds') : (isArabic ? 'الحصان' : 'Horsepower')}
                      </label>
                      <input type="text" value={form.bedsOrHp}
                        onChange={(e) => setField('bedsOrHp', e.target.value)}
                        placeholder={addCategory === 'estate' ? '3 غرف' : '1,800 حصان'}
                        className="w-full bg-white border border-neutral-300 rounded-lg px-3 py-2 text-neutral-900 focus:outline-none focus:border-[#1E3A8A]"
                      />
                    </div>
                    <div>
                      <label className="block text-neutral-500 font-bold mb-1">
                        {addCategory === 'estate' ? (isArabic ? 'الحمامات' : 'Baths') : (isArabic ? 'الكيلو/س' : 'Top Speed')}
                      </label>
                      <input type="text" value={form.bathsOrSpeed}
                        onChange={(e) => setField('bathsOrSpeed', e.target.value)}
                        placeholder={addCategory === 'estate' ? '2 حمام' : '445 كم/س'}
                        className="w-full bg-white border border-neutral-300 rounded-lg px-3 py-2 text-neutral-900 focus:outline-none focus:border-[#1E3A8A]"
                      />
                    </div>
                    <div>
                      <label className="block text-neutral-500 font-bold mb-1">
                        {addCategory === 'estate' ? (isArabic ? 'المساحة' : 'Area') : (isArabic ? 'المحرك' : 'Engine')}
                      </label>
                      <input type="text" value={form.areaOrEngine}
                        onChange={(e) => setField('areaOrEngine', e.target.value)}
                        placeholder={addCategory === 'estate' ? '220م²' : 'V16 هجين'}
                        className="w-full bg-white border border-neutral-300 rounded-lg px-3 py-2 text-neutral-900 focus:outline-none focus:border-[#1E3A8A]"
                      />
                    </div>
                  </div>
                </div>

                {/* Badge */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-neutral-700 font-bold mb-2">{isArabic ? 'الحالة (عربي)' : 'Badge (Arabic)'}</label>
                    <select value={form.badgeAr} onChange={(e) => setField('badgeAr', e.target.value)}
                      className="w-full bg-neutral-50 border border-neutral-300 rounded-xl px-4 py-3 text-neutral-900 focus:outline-none focus:border-[#1E3A8A]">
                      <option value="متاح للبيع">متاح للبيع</option>
                      <option value="متاح">متاح</option>
                      <option value="حصري">حصري</option>
                      <option value="جديد">جديد</option>
                      <option value="قيد المعاينة">قيد المعاينة</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-neutral-700 font-bold mb-2">{isArabic ? 'الحالة (إنجليزي)' : 'Badge (English)'}</label>
                    <select value={form.badge} onChange={(e) => setField('badge', e.target.value)}
                      className="w-full bg-neutral-50 border border-neutral-300 rounded-xl px-4 py-3 text-neutral-900 focus:outline-none focus:border-[#1E3A8A]">
                      <option value="Available">Available</option>
                      <option value="Exclusive">Exclusive</option>
                      <option value="New">New</option>
                      <option value="Under Viewing">Under Viewing</option>
                    </select>
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-4 flex items-center justify-end gap-3 border-t border-neutral-100">
                  <button type="button" onClick={() => setShowAddModal(false)}
                    className="px-6 py-3 rounded-xl bg-neutral-100 text-neutral-700 font-bold hover:bg-neutral-200 text-sm transition-colors">
                    {isArabic ? 'إلغاء' : 'Cancel'}
                  </button>
                  <button type="submit"
                    className="px-8 py-3 rounded-xl bg-[#1E3A8A] hover:bg-[#16316e] text-white font-bold shadow-sm text-sm transition-colors flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px]">check_circle</span>
                    {isArabic ? 'حفظ ونشر على الموقع' : 'Save & Publish'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
