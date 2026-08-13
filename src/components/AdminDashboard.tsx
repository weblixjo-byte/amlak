import React, { useState, useMemo } from 'react';
import { PropertyItem, Brand } from '../types';
import { api, Inquiry } from '../lib/api';

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
  onLogout?: () => void;
}

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
  onLogout,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'properties' | 'cars' | 'brands' | 'inquiries'>('overview');
  const [inquiries, setInquiriesRaw] = useState<Inquiry[]>(() => api.getInquiries());

  const setInquiries = (items: Inquiry[]) => {
    setInquiriesRaw(items);
    api.saveInquiries(items);
  };

  const totalAssetValueNum = useMemo(() => {
    const parsePrice = (priceStr: string): number => {
      const cleaned = priceStr.replace(/[^0-9]/g, '');
      return parseInt(cleaned, 10) || 0;
    };
    return properties.reduce((acc, p) => acc + parsePrice(p.price), 0)
         + cars.reduce((acc, c) => acc + parsePrice(c.price), 0);
  }, [properties, cars]);

  const formattedTotalValue = useMemo(() => `JOD ${totalAssetValueNum.toLocaleString('en-US')}`, [totalAssetValueNum]);

  // Modal State
  const [showAddModal, setShowAddModal] = useState(false);
  const [addCategory, setAddCategory] = useState<'estate' | 'car'>('estate');
  const [form, setForm] = useState(emptyForm());
  const [isFeaturedModal, setIsFeaturedModal] = useState(false);

  const setField = (key: keyof ReturnType<typeof emptyForm>, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleCreateListing = (e: React.FormEvent) => {
    e.preventDefault();

    const fallbackImg = addCategory === 'estate' ? '/images/dabouq_villa.jpg' : '/images/hero_car.jpg';

    const newItem: PropertyItem = {
      id: `item-${Date.now()}`,
      titleAr: form.titleAr.trim(),
      title: form.title.trim() || form.titleAr.trim(),
      category: addCategory,
      type: form.type.trim() || (addCategory === 'estate' ? 'Apartment' : 'Car'),
      locationOrSpecsAr: form.locationOrSpecsAr.trim(),
      locationOrSpecs: form.locationOrSpecs.trim() || form.locationOrSpecsAr.trim(),
      price: form.price.trim().startsWith('JOD') ? form.price.trim() : `JOD ${form.price.trim()}`,
      imageUrl: form.imageUrl.trim() || fallbackImg,
      badgeAr: form.badgeAr || 'متاح للبيع',
      badge: form.badge || 'Available',
      specs: {
        bedsOrHp: form.bedsOrHp.trim() || undefined,
        bathsOrSpeed: form.bathsOrSpeed.trim() || undefined,
        areaOrEngine: form.areaOrEngine.trim() || undefined,
      },
      description: form.description.trim(),
      featured: isFeaturedModal, // Control Homepage vs Buy Page Only
    };

    if (addCategory === 'estate') {
      setProperties((prev) => [newItem, ...prev]);
    } else {
      setCars((prev) => [newItem, ...prev]);
    }

    setForm(emptyForm());
    setIsFeaturedModal(false);
    setShowAddModal(false);
  };

  // Brands State
  const [newBrandName, setNewBrandName] = useState('');
  const [newBrandImageUrl, setNewBrandImageUrl] = useState('');
  const handleAddBrand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBrandName.trim()) return;
    setBrands((prev) => [
      ...prev,
      {
        id: `brand-${Date.now()}`,
        name: newBrandName.trim(),
        imageUrl: newBrandImageUrl.trim() || undefined,
      },
    ]);
    setNewBrandName('');
    setNewBrandImageUrl('');
  };

  const handleDeleteBrand = (id: string) => setBrands((prev) => prev.filter((b) => b.id !== id));

  const handleStatusChange = (id: string, newStatus: string) =>
    setInquiries(inquiries.map((inq) => (inq.id === id ? { ...inq, status: newStatus } : inq)));

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
              <span className="text-neutral-500 text-xs font-bold uppercase tracking-wider">AMLAK PLATFORM ADMIN</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-neutral-900 font-ibm">
              {isArabic ? 'لوحة تحكم منصة أمـلاك' : 'Amlak Admin Dashboard'}
            </h1>
          </div>

          <div className="flex items-center gap-4">
            {/* Stats badges */}
            <div className="flex flex-wrap gap-3">
              <div className="bg-blue-50 border border-blue-200 rounded-2xl px-4 py-2.5 flex items-center gap-2">
                <span className="material-symbols-outlined text-[#1E3A8A] text-[20px]">apartment</span>
                <div>
                  <div className="text-[11px] text-blue-700 font-bold">{isArabic ? 'العقارات' : 'Properties'}</div>
                  <div className="text-base font-bold text-[#1E3A8A]">{properties.length}</div>
                </div>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-2xl px-4 py-2.5 flex items-center gap-2">
                <span className="material-symbols-outlined text-[#1E3A8A] text-[20px]">directions_car</span>
                <div>
                  <div className="text-[11px] text-blue-700 font-bold">{isArabic ? 'السيارات' : 'Vehicles'}</div>
                  <div className="text-base font-bold text-[#1E3A8A]">{cars.length}</div>
                </div>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-2xl px-4 py-2.5 flex items-center gap-2">
                <span className="material-symbols-outlined text-[#1E3A8A] text-[20px]">storefront</span>
                <div>
                  <div className="text-[11px] text-blue-700 font-bold">{isArabic ? 'البراندات' : 'Brands'}</div>
                  <div className="text-base font-bold text-[#1E3A8A]">{brands.length}</div>
                </div>
              </div>
            </div>

            {/* Logout button */}
            {onLogout && (
              <button
                onClick={onLogout}
                className="bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 px-4 py-2.5 rounded-2xl text-xs font-bold flex items-center gap-1.5 transition-colors"
                title={isArabic ? 'تسجيل الخروج' : 'Logout'}
              >
                <span className="material-symbols-outlined text-[18px]">logout</span>
                <span>{isArabic ? 'خروج' : 'Logout'}</span>
              </button>
            )}
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

        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { label: isArabic ? 'إجمالي قيمة المعروضات' : 'Total Asset Value', value: formattedTotalValue, icon: 'payments' },
                { label: isArabic ? 'إجمالي العقارات' : 'Total Properties', value: properties.length, icon: 'apartment' },
                { label: isArabic ? 'إجمالي السيارات' : 'Total Vehicles', value: cars.length, icon: 'directions_car' },
                { label: isArabic ? 'البراندات الفعالة' : 'Active Brands', value: brands.length, icon: 'storefront' },
              ].map((card, i) => (
                <div key={i} className="bg-white border border-neutral-200 p-6 rounded-2xl flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between text-neutral-500 mb-3">
                    <span className="text-xs font-bold uppercase">{card.label}</span>
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#1E3A8A] flex items-center justify-center">
                      <span className="material-symbols-outlined text-[20px]">{card.icon}</span>
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-neutral-900 font-mono">{card.value}</div>
                </div>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <button
                onClick={() => { setAddCategory('estate'); setIsFeaturedModal(false); setShowAddModal(true); }}
                className="bg-white border border-neutral-200 p-6 rounded-2xl flex items-center gap-4 shadow-sm hover:shadow-md hover:border-[#1E3A8A] transition-all group text-right"
              >
                <div className="w-12 h-12 rounded-xl bg-[#1E3A8A]/10 text-[#1E3A8A] flex items-center justify-center group-hover:bg-[#1E3A8A] group-hover:text-white transition-colors">
                  <span className="material-symbols-outlined text-[24px]">add_home</span>
                </div>
                <div>
                  <span className="font-bold text-neutral-900 block">{isArabic ? 'إضافة عقار جديد' : 'Add Property'}</span>
                  <span className="text-xs text-neutral-500">{isArabic ? 'تحديد إظهاره بالرئيسية أو الشراء' : 'Specify placement'}</span>
                </div>
              </button>

              <button
                onClick={() => { setAddCategory('car'); setIsFeaturedModal(false); setShowAddModal(true); }}
                className="bg-white border border-neutral-200 p-6 rounded-2xl flex items-center gap-4 shadow-sm hover:shadow-md hover:border-[#1E3A8A] transition-all group text-right"
              >
                <div className="w-12 h-12 rounded-xl bg-[#1E3A8A]/10 text-[#1E3A8A] flex items-center justify-center group-hover:bg-[#1E3A8A] group-hover:text-white transition-colors">
                  <span className="material-symbols-outlined text-[24px]">add</span>
                </div>
                <div>
                  <span className="font-bold text-neutral-900 block">{isArabic ? 'إضافة سيارة جديدة' : 'Add Vehicle'}</span>
                  <span className="text-xs text-neutral-500">{isArabic ? 'تحديد إظهارها بالرئيسية أو الشراء' : 'Specify placement'}</span>
                </div>
              </button>

              <button
                onClick={() => setActiveTab('brands')}
                className="bg-white border border-neutral-200 p-6 rounded-2xl flex items-center gap-4 shadow-sm hover:shadow-md hover:border-[#1E3A8A] transition-all group text-right"
              >
                <div className="w-12 h-12 rounded-xl bg-[#1E3A8A]/10 text-[#1E3A8A] flex items-center justify-center group-hover:bg-[#1E3A8A] group-hover:text-white transition-colors">
                  <span className="material-symbols-outlined text-[24px]">storefront</span>
                </div>
                <div>
                  <span className="font-bold text-neutral-900 block">{isArabic ? 'إدارة البراندات' : 'Manage Brands'}</span>
                  <span className="text-xs text-neutral-500">{isArabic ? 'تنسيق الشريط المتحرك' : 'Manage Marquee'}</span>
                </div>
              </button>
            </div>
          </div>
        )}

        {/* TAB 2 & 3: PROPERTIES & CARS */}
        {(activeTab === 'properties' || activeTab === 'cars') && (
          <div className="space-y-6">
            <div className="flex items-center justify-between bg-white border border-neutral-200 p-6 rounded-2xl shadow-sm">
              <div>
                <h3 className="text-xl font-bold text-neutral-900 font-ibm">
                  {activeTab === 'properties'
                    ? (isArabic ? 'قسم العقارات والشقق' : 'Properties Section')
                    : (isArabic ? 'قسم السيارات الفاخرة' : 'Luxury Vehicles Section')}
                </h3>
                <p className="text-xs text-neutral-500 mt-1">
                  {isArabic
                    ? 'يمكنك تحديد حتى 10 عناصر مميزة للظهور بالصفحة الرئيسية، أو إظهارها فقط بصفحة الشراء'
                    : 'Select featured items for Homepage (Max 10) or Buy Page only'}
                </p>
              </div>
              <button
                onClick={() => {
                  setAddCategory(activeTab === 'properties' ? 'estate' : 'car');
                  setIsFeaturedModal(false);
                  setShowAddModal(true);
                }}
                className="bg-[#1E3A8A] hover:bg-[#16316e] text-white px-5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all shadow-sm"
              >
                <span className="material-symbols-outlined text-[18px]">add</span>
                <span>{isArabic ? 'إضافة جديد' : 'Add New'}</span>
              </button>
            </div>

            {(activeTab === 'properties' ? properties : cars).length === 0 ? (
              <div className="bg-white border border-dashed border-neutral-300 rounded-2xl p-12 text-center">
                <span className="material-symbols-outlined text-[48px] text-neutral-300 mb-3 block">
                  {activeTab === 'properties' ? 'apartment' : 'directions_car'}
                </span>
                <p className="text-neutral-600 font-bold text-base mb-1">
                  {isArabic
                    ? (activeTab === 'properties' ? 'لا توجد عقارات حالياً' : 'لا توجد سيارات حالياً')
                    : 'No items yet'}
                </p>
                <p className="text-neutral-400 text-xs mb-6">
                  {isArabic ? 'اضغط على زر الإضافة أعلاه لنشر أول عنصر على الموقع' : 'Click Add New above to publish'}
                </p>
                <button
                  onClick={() => {
                    setAddCategory(activeTab === 'properties' ? 'estate' : 'car');
                    setIsFeaturedModal(false);
                    setShowAddModal(true);
                  }}
                  className="bg-[#1E3A8A] text-white px-6 py-3 rounded-xl font-bold text-xs inline-flex items-center gap-2 shadow-sm"
                >
                  <span className="material-symbols-outlined text-[18px]">add</span>
                  <span>{isArabic ? 'إضافة الآن' : 'Add Now'}</span>
                </button>
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
                        <th className="py-4 px-4">{isArabic ? 'مكان الظهور والترقية' : 'Placement (Featured)'}</th>
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
                              className="w-14 h-10 rounded-lg object-cover border border-neutral-200 bg-neutral-100"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = activeTab === 'properties' ? '/images/dabouq_villa.jpg' : '/images/hero_car.jpg';
                              }}
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
                          
                          {/* Placement toggle button (Featured vs Buy Page Only) */}
                          <td className="py-3 px-4">
                            <button
                              onClick={() => {
                                if (activeTab === 'properties') {
                                  setProperties((prev) => prev.map((p) => p.id === item.id ? { ...p, featured: !p.featured } : p));
                                } else {
                                  setCars((prev) => prev.map((c) => c.id === item.id ? { ...c, featured: !c.featured } : c));
                                }
                              }}
                              className={`px-3 py-1.5 rounded-xl font-bold text-[11px] flex items-center gap-1.5 transition-all ${
                                item.featured !== false
                                  ? 'bg-amber-50 text-amber-800 border border-amber-200 hover:bg-amber-100'
                                  : 'bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100'
                              }`}
                              title={isArabic ? 'انقر للتبديل بين الرئيسية وقسم الشراء' : 'Toggle Homepage featured'}
                            >
                              <span className="material-symbols-outlined text-[15px]">
                                {item.featured !== false ? 'star' : 'shopping_bag'}
                              </span>
                              <span>
                                {item.featured !== false
                                  ? (isArabic ? 'الرئيسية + الشراء' : 'Homepage + Buy')
                                  : (isArabic ? 'صفحة الشراء فقط' : 'Buy Page Only')}
                              </span>
                            </button>
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

        {/* TAB 4: BRAND PARTNERS */}
        {activeTab === 'brands' && (
          <div className="space-y-6">
            <div className="bg-white border border-neutral-200 p-6 rounded-2xl shadow-sm">
              <h3 className="text-xl font-bold text-neutral-900 font-ibm">
                {isArabic ? 'إدارة البراندات والشركاء' : 'Brand Partners Management'}
              </h3>
              <p className="text-xs text-neutral-500 mt-1">
                {isArabic ? 'البراندات المضافة تظهر كشريط متحرك أسفل قسم الهيرو مباشرة' : 'Brands appear as a marquee below hero'}
              </p>
            </div>

            {/* Add brand form */}
            <div className="bg-white border border-neutral-200 p-6 rounded-2xl shadow-sm">
              <h4 className="text-sm font-bold text-neutral-700 mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-[#1E3A8A] text-[18px]">add_circle</span>
                {isArabic ? 'إضافة براند جديد' : 'Add New Brand'}
              </h4>
              <form onSubmit={handleAddBrand} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-neutral-700 mb-1">
                      {isArabic ? 'اسم البراند *' : 'Brand Name *'}
                    </label>
                    <input
                      type="text"
                      value={newBrandName}
                      onChange={(e) => setNewBrandName(e.target.value)}
                      placeholder={isArabic ? 'مثال: BMW، Mercedes، Rolex' : 'e.g. BMW, Rolex'}
                      required
                      className="bg-neutral-50 border border-neutral-300 rounded-xl px-4 py-3 text-sm text-neutral-900 focus:outline-none focus:border-[#1E3A8A] font-ibm w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-neutral-700 mb-1">
                      {isArabic ? 'رابط صورة الشعار (اختياري)' : 'Logo Image URL (optional)'}
                    </label>
                    <input
                      type="text"
                      value={newBrandImageUrl}
                      onChange={(e) => setNewBrandImageUrl(e.target.value)}
                      placeholder="https://domain.com/logo.png"
                      className="bg-neutral-50 border border-neutral-300 rounded-xl px-4 py-3 text-sm text-neutral-900 focus:outline-none focus:border-[#1E3A8A] font-mono w-full"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="bg-[#1E3A8A] hover:bg-[#16316e] text-white px-6 py-3 rounded-xl font-bold text-sm flex items-center gap-2 shadow-sm transition-all"
                >
                  <span className="material-symbols-outlined text-[18px]">add</span>
                  <span>{isArabic ? 'إضافة البراند ونشره فوراً' : 'Add & Publish Brand'}</span>
                </button>
              </form>
            </div>

            {/* Brand list */}
            {brands.length === 0 ? (
              <div className="bg-white border border-dashed border-neutral-300 rounded-2xl p-12 text-center">
                <span className="material-symbols-outlined text-[48px] text-neutral-300 mb-3 block">storefront</span>
                <p className="text-neutral-600 font-bold text-sm mb-1">
                  {isArabic ? 'لا توجد براندات مضافة حالياً' : 'No brands added yet'}
                </p>
                <p className="text-neutral-400 text-xs">
                  {isArabic ? 'أضف أول براند أعلاه وسيظهر فوراً كشريط متصل على الموقع' : 'Add brand above to show on website'}
                </p>
              </div>
            ) : (
              <div className="bg-white border border-neutral-200 p-6 rounded-2xl shadow-sm">
                <h4 className="text-xs font-bold uppercase text-neutral-500 tracking-wider mb-4">
                  {isArabic ? `البراندات النشطة على الموقع (${brands.length})` : `Active Brands (${brands.length})`}
                </h4>
                <div className="flex flex-wrap gap-3">
                  {brands.map((brand) => (
                    <div
                      key={brand.id}
                      className="flex items-center gap-3 bg-neutral-50 border border-neutral-200 rounded-2xl px-4 py-2.5 shadow-sm"
                    >
                      {brand.imageUrl && (
                        <img
                          src={brand.imageUrl}
                          alt={brand.name}
                          className="h-6 max-w-[70px] object-contain"
                          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                        />
                      )}
                      <span className="text-sm font-bold text-neutral-900">{brand.name}</span>
                      <button
                        onClick={() => handleDeleteBrand(brand.id)}
                        className="w-6 h-6 rounded-full bg-red-50 hover:bg-red-100 text-red-600 flex items-center justify-center transition-colors ml-1"
                        title={isArabic ? 'حذف' : 'Delete'}
                      >
                        <span className="material-symbols-outlined text-[16px]">close</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 5: INQUIRIES */}
        {activeTab === 'inquiries' && (
          <div className="space-y-6">
            <div className="bg-white border border-neutral-200 p-6 rounded-2xl shadow-sm">
              <h3 className="text-xl font-bold text-neutral-900 font-ibm">{isArabic ? 'إدارة طلبات العملاء' : 'Customer Inquiries & Leads'}</h3>
              <p className="text-xs text-neutral-500 mt-1">{isArabic ? 'متابعة وتحديث حالة الطلبات' : 'Manage incoming contact forms'}</p>
            </div>

            {inquiries.length === 0 ? (
              <div className="bg-white border border-dashed border-neutral-300 rounded-2xl p-12 text-center">
                <span className="material-symbols-outlined text-[48px] text-neutral-300 mb-3 block">mark_email_read</span>
                <p className="text-neutral-600 font-bold text-sm mb-1">
                  {isArabic ? 'لا توجد طلبات عملاء حالياً' : 'No inquiries yet'}
                </p>
                <p className="text-neutral-400 text-xs">
                  {isArabic ? 'الطلبات المقدمة من نموذج الاستفسار تظهر هنا' : 'Incoming forms appear here'}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {inquiries.map((inq) => (
                  <div key={inq.id} className="bg-white border border-neutral-200 p-6 rounded-2xl flex flex-col justify-between gap-4 shadow-sm">
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
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* CREATE LISTING MODAL */}
        {showAddModal && (
          <div className="fixed inset-0 z-50 bg-neutral-900/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white border border-neutral-200 rounded-3xl p-8 max-w-2xl w-full shadow-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between border-b border-neutral-100 pb-4 mb-6">
                <h3 className="text-lg font-bold text-neutral-900 font-ibm flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#1E3A8A] text-[22px]">
                    {addCategory === 'estate' ? 'apartment' : 'directions_car'}
                  </span>
                  {isArabic
                    ? (addCategory === 'estate' ? 'إضافة عقار جديد للنشر' : 'إضافة سيارة جديدة للنشر')
                    : (addCategory === 'estate' ? 'Add Property' : 'Add Vehicle')}
                </h3>
                <button onClick={() => setShowAddModal(false)} className="text-neutral-400 hover:text-neutral-800 transition-colors">
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>

              <form onSubmit={handleCreateListing} className="space-y-4 font-ibm text-xs">
                
                {/* HOMEPAGE FEATURED PLACEMENT CHECKBOX */}
                <label className="flex items-center gap-3 p-4 bg-amber-50/80 border border-amber-200 rounded-2xl cursor-pointer hover:bg-amber-100/80 transition-colors">
                  <input
                    type="checkbox"
                    checked={isFeaturedModal}
                    onChange={(e) => setIsFeaturedModal(e.target.checked)}
                    className="w-5 h-5 accent-[#1E3A8A] rounded cursor-pointer"
                  />
                  <div>
                    <span className="block font-bold text-neutral-900 text-xs">
                      {isArabic ? '⭐ إظهار البطاقة في الصفحة الرئيسية (عنصر مميز)' : '⭐ Display on Homepage (Featured)'}
                    </span>
                    <span className="text-[11px] text-neutral-600 block">
                      {isArabic
                        ? 'إذا لم تفعل هذا الخيار، ستظهر البطاقة في صفحة الشراء المنفصلة فقط.'
                        : 'If unchecked, item will appear ONLY in the separate Buy Portal.'}
                    </span>
                  </div>
                </label>

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
                      placeholder={addCategory === 'estate' ? 'مثال: شقة فاخرة في جبل عمّان' : 'مثال: بوغاتي توربيون 2026'}
                      className="w-full bg-neutral-50 border border-neutral-300 rounded-xl px-4 py-3 text-neutral-900 focus:outline-none focus:border-[#1E3A8A]"
                    />
                  </div>
                  <div>
                    <label className="block text-neutral-700 font-bold mb-2">
                      {isArabic ? 'العنوان بالإنجليزية' : 'English Title'}
                    </label>
                    <input type="text" value={form.title}
                      onChange={(e) => setField('title', e.target.value)}
                      placeholder={addCategory === 'estate' ? 'Luxury Apartment' : 'Bugatti Tourbillon'}
                      className="w-full bg-neutral-50 border border-neutral-300 rounded-xl px-4 py-3 text-neutral-900 focus:outline-none focus:border-[#1E3A8A]"
                    />
                  </div>
                  <div>
                    <label className="block text-neutral-700 font-bold mb-2">
                      {addCategory === 'estate' ? (isArabic ? 'الموقع بالعربية *' : 'Arabic Location *') : (isArabic ? 'المواصفات بالعربية *' : 'Arabic Specs *')}
                    </label>
                    <input required type="text" value={form.locationOrSpecsAr}
                      onChange={(e) => setField('locationOrSpecsAr', e.target.value)}
                      placeholder={addCategory === 'estate' ? 'جبل عمّان، عمّان' : 'معرض عمّان، الأردن'}
                      className="w-full bg-neutral-50 border border-neutral-300 rounded-xl px-4 py-3 text-neutral-900 focus:outline-none focus:border-[#1E3A8A]"
                    />
                  </div>
                  <div>
                    <label className="block text-neutral-700 font-bold mb-2">
                      {addCategory === 'estate' ? (isArabic ? 'الموقع بالإنجليزية' : 'English Location') : (isArabic ? 'المواصفات بالإنجليزية' : 'English Specs')}
                    </label>
                    <input type="text" value={form.locationOrSpecs}
                      onChange={(e) => setField('locationOrSpecs', e.target.value)}
                      placeholder={addCategory === 'estate' ? 'Jabal Amman' : 'Amman Showroom'}
                      className="w-full bg-neutral-50 border border-neutral-300 rounded-xl px-4 py-3 text-neutral-900 focus:outline-none focus:border-[#1E3A8A]"
                    />
                  </div>
                  <div>
                    <label className="block text-neutral-700 font-bold mb-2">{isArabic ? 'السعر (JOD) *' : 'Price (JOD) *'}</label>
                    <input required type="text" value={form.price}
                      onChange={(e) => setField('price', e.target.value)}
                      placeholder="180,000"
                      className="w-full bg-neutral-50 border border-neutral-300 rounded-xl px-4 py-3 text-neutral-900 focus:outline-none focus:border-[#1E3A8A]"
                    />
                  </div>
                  <div>
                    <label className="block text-neutral-700 font-bold mb-2">{isArabic ? 'رابط الصورة' : 'Image URL'}</label>
                    <input type="text" value={form.imageUrl}
                      onChange={(e) => setField('imageUrl', e.target.value)}
                      placeholder="https://... أو اتركها فارغة"
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
                        {addCategory === 'estate' ? (isArabic ? 'الحمامات' : 'Baths') : (isArabic ? 'السرعة' : 'Speed')}
                      </label>
                      <input type="text" value={form.bathsOrSpeed}
                        onChange={(e) => setField('bathsOrSpeed', e.target.value)}
                        placeholder={addCategory === 'estate' ? '3 حمام' : '445 كم/س'}
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
                    </select>
                  </div>
                  <div>
                    <label className="block text-neutral-700 font-bold mb-2">{isArabic ? 'الحالة (إنجليزي)' : 'Badge (English)'}</label>
                    <select value={form.badge} onChange={(e) => setField('badge', e.target.value)}
                      className="w-full bg-neutral-50 border border-neutral-300 rounded-xl px-4 py-3 text-neutral-900 focus:outline-none focus:border-[#1E3A8A]">
                      <option value="Available">Available</option>
                      <option value="Exclusive">Exclusive</option>
                      <option value="New">New</option>
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
