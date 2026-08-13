import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { BrandPartnersSection } from './components/BrandPartnersSection';
import { Collection } from './components/Collection';
import { AboutTeaser } from './components/AboutTeaser';
import { BuyPage } from './components/BuyPage';
import { AdminDashboard } from './components/AdminDashboard';
import { Footer } from './components/Footer';
import { InquiryModal } from './components/InquiryModal';
import { PropertyItem, Brand } from './types';

const SECRET_HASH = '#amlak-admin-secret-8877';
const ADMIN_PASSWORD = 'amlak2026';

// ── DEFAULT INITIAL SEED DATA ───────────────────────────────────────────────
const defaultProperties: PropertyItem[] = [
  {
    id: 'p1',
    title: 'Apartment with terrace in Jabal Amman',
    titleAr: 'شقة فاخرة مع تراس في جبل عمّان',
    category: 'estate',
    type: 'Apartment',
    locationOrSpecs: 'Jabal Amman, Amman',
    locationOrSpecsAr: 'جبل عمّان، عمّان',
    price: 'JOD 180,000',
    imageUrl: '/images/jabal_amman.jpg',
    badge: 'Available',
    badgeAr: 'متاح',
    specs: { bedsOrHp: '3 غرف', bathsOrSpeed: '3 حمام', areaOrEngine: '220م²' },
    description: 'شقة واسعة ومستقلة مع تراس في جبل عمان.',
    featured: true,
  },
  {
    id: 'p2',
    title: 'Furnished Duplex with roof in Airport Road',
    titleAr: 'دوبلكس مفروش مع روف في طريق المطار',
    category: 'estate',
    type: 'Duplex',
    locationOrSpecs: 'Airport Road, Amman',
    locationOrSpecsAr: 'طريق المطار، عمّان',
    price: 'JOD 250,000',
    imageUrl: '/images/dabouq_villa.jpg',
    badge: 'Available',
    badgeAr: 'متاح',
    specs: { bedsOrHp: '4 غرف', bathsOrSpeed: '4 حمام', areaOrEngine: '310م²' },
    description: 'دوبلكس حديث مفروش بالكامل.',
    featured: true,
  },
  {
    id: 'p3',
    title: 'Flat apartment with garden in Dabouq',
    titleAr: 'شقة أرضية مميزة مع حديقة في دابوق',
    category: 'estate',
    type: 'Villa/Flat',
    locationOrSpecs: 'Dabouq, Amman',
    locationOrSpecsAr: 'دابوق، عمّان',
    price: 'JOD 380,000',
    imageUrl: '/images/estate_interior.jpg',
    badge: 'Available',
    badgeAr: 'متاح',
    specs: { bedsOrHp: '3 غرف', bathsOrSpeed: '4 حمام', areaOrEngine: '450م²' },
    description: 'شقة أرضية تشطيبات سوبر ديلوكس.',
    featured: true,
  },
  {
    id: 'p4',
    title: 'Modern Waterfront Villa Palm Jumeirah',
    titleAr: 'فيلا فاخرة بواجهة مائية نخلة جميرا',
    category: 'estate',
    type: 'Villa',
    locationOrSpecs: 'Palm Jumeirah, Dubai',
    locationOrSpecsAr: 'نخلة جميرا، دبي',
    price: 'JOD 12,500,000',
    imageUrl: '/images/hero_mansion.jpg',
    badge: 'Exclusive',
    badgeAr: 'حصري',
    specs: { bedsOrHp: '6 غرف', bathsOrSpeed: '8 حمام', areaOrEngine: '1,350م²' },
    description: 'فيلا فاخرة بواجهة مائية وشاطئ خاص.',
    featured: true,
  },
];

const defaultCars: PropertyItem[] = [
  {
    id: 'c1',
    title: 'Bugatti Tourbillon 2026',
    titleAr: 'بوغاتي توربيون موديل 2026',
    category: 'car',
    type: 'Supercar',
    locationOrSpecs: 'Amman Showroom, Jordan',
    locationOrSpecsAr: 'معرض عمّان، الأردن',
    price: 'JOD 3,400,000',
    imageUrl: '/images/hero_car.jpg',
    badge: 'New',
    badgeAr: 'جديد',
    specs: { bedsOrHp: '1,800 حصان', bathsOrSpeed: '445 كم/س', areaOrEngine: 'V16 هجين' },
    description: 'سيارة زيرو بأعلى المواصفات.',
    featured: false,
  },
  {
    id: 'c2',
    title: 'Rolls-Royce Spectre Electric',
    titleAr: 'رولز رويس سبيكتر كهربائية بالكامل',
    category: 'car',
    type: 'Coupe',
    locationOrSpecs: 'Amman Showroom, Jordan',
    locationOrSpecsAr: 'معرض عمّان، الأردن',
    price: 'JOD 560,000',
    imageUrl: '/images/rolls_royce.jpg',
    badge: 'Available',
    badgeAr: 'متاح',
    specs: { bedsOrHp: '584 حصان', bathsOrSpeed: '0-100 بـ 4.4ث', areaOrEngine: 'محرك كهربائي' },
    description: 'سيارة فاخرة كهربائية بالكامل.',
    featured: false,
  },
];

const defaultBrands: Brand[] = [
  { id: 'b1', name: 'BMW' },
  { id: 'b2', name: 'Mercedes-Benz' },
  { id: 'b3', name: 'Porsche' },
  { id: 'b4', name: 'Rolls-Royce' },
  { id: 'b5', name: 'Ferrari' },
  { id: 'b6', name: 'Sotheby\'s' },
  { id: 'b7', name: 'Rolex' },
];

export const App: React.FC = () => {
  const [isArabic, setIsArabic] = useState(true);
  const [currentPage, setCurrentPage] = useState<'home' | 'buy' | 'dashboard'>('home');
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);
  const [selectedItemTitle, setSelectedItemTitle] = useState<string | undefined>(undefined);

  // ── Shared State (localStorage-backed with default seed data) ──────────────
  const [properties, setPropertiesRaw] = useState<PropertyItem[]>(() => {
    try {
      const saved = localStorage.getItem('amlak_properties');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error(e);
    }
    return defaultProperties;
  });

  const [cars, setCarsRaw] = useState<PropertyItem[]>(() => {
    try {
      const saved = localStorage.getItem('amlak_cars');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error(e);
    }
    return defaultCars;
  });

  const [brands, setBrandsRaw] = useState<Brand[]>(() => {
    try {
      const saved = localStorage.getItem('amlak_brands');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error(e);
    }
    return defaultBrands;
  });

  // State Wrappers that also persist to localStorage immediately
  const setProperties: React.Dispatch<React.SetStateAction<PropertyItem[]>> = (val) => {
    setPropertiesRaw((prev) => {
      const next = typeof val === 'function' ? val(prev) : val;
      try { localStorage.setItem('amlak_properties', JSON.stringify(next)); } catch (e) { console.error(e); }
      return next;
    });
  };

  const setCars: React.Dispatch<React.SetStateAction<PropertyItem[]>> = (val) => {
    setCarsRaw((prev) => {
      const next = typeof val === 'function' ? val(prev) : val;
      try { localStorage.setItem('amlak_cars', JSON.stringify(next)); } catch (e) { console.error(e); }
      return next;
    });
  };

  const setBrands: React.Dispatch<React.SetStateAction<Brand[]>> = (val) => {
    setBrandsRaw((prev) => {
      const next = typeof val === 'function' ? val(prev) : val;
      try { localStorage.setItem('amlak_brands', JSON.stringify(next)); } catch (e) { console.error(e); }
      return next;
    });
  };

  // Security & Admin Authentication State
  const [showPasswordAuthModal, setShowPasswordAuthModal] = useState(false);
  const [inputPassword, setInputPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

  // Secret Hash Listener for Unexpected URL Access
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === SECRET_HASH) {
        if (!isAdminAuthenticated) {
          setShowPasswordAuthModal(true);
        } else {
          setCurrentPage('dashboard');
        }
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [isAdminAuthenticated]);

  const handleOpenInquiry = (title?: string) => {
    setSelectedItemTitle(title);
    setInquiryModalOpen(true);
  };

  const handleNavigate = (page: 'home' | 'buy') => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenSecretAdmin = () => {
    window.location.hash = SECRET_HASH;
    if (!isAdminAuthenticated) {
      setShowPasswordAuthModal(true);
    } else {
      setCurrentPage('dashboard');
    }
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputPassword === ADMIN_PASSWORD) {
      setIsAdminAuthenticated(true);
      setShowPasswordAuthModal(false);
      setPasswordError(false);
      setInputPassword('');
      setCurrentPage('dashboard');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setPasswordError(true);
    }
  };

  // Standalone Fullscreen View for Dashboard (NO HEADER & NO FOOTER)
  if (currentPage === 'dashboard' && isAdminAuthenticated) {
    return (
      <div className={`min-h-screen bg-[#F8FAFC] text-neutral-900 font-ibm ${isArabic ? 'rtl' : 'ltr'}`} dir={isArabic ? 'rtl' : 'ltr'}>
        <AdminDashboard
          isArabic={isArabic}
          onNavigateHome={() => {
            window.location.hash = '';
            handleNavigate('home');
          }}
          onOpenInquiry={handleOpenInquiry}
          properties={properties}
          setProperties={setProperties}
          cars={cars}
          setCars={setCars}
          brands={brands}
          setBrands={setBrands}
        />
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-[#FAFAFA] text-neutral-900 font-ibm ${isArabic ? 'rtl' : 'ltr'}`} dir={isArabic ? 'rtl' : 'ltr'}>
      
      {/* Header (Only on public site pages) */}
      <Header
        onOpenInquiry={handleOpenInquiry}
        isArabic={isArabic}
        setIsArabic={setIsArabic}
        currentPage={currentPage}
        onNavigate={handleNavigate}
      />

      <main>
        {currentPage === 'home' ? (
          <>
            <Hero onOpenInquiry={handleOpenInquiry} isArabic={isArabic} />
            <BrandPartnersSection isArabic={isArabic} brands={brands} />
            <Collection onOpenInquiry={handleOpenInquiry} isArabic={isArabic} properties={properties} cars={cars} />
            <AboutTeaser onOpenInquiry={handleOpenInquiry} isArabic={isArabic} />
          </>
        ) : (
          <BuyPage
            onOpenInquiry={handleOpenInquiry}
            isArabic={isArabic}
            onNavigateHome={() => handleNavigate('home')}
          />
        )}
      </main>

      {/* Footer (Only on public site pages) */}
      <Footer onOpenInquiry={handleOpenInquiry} isArabic={isArabic} onOpenSecretAdmin={handleOpenSecretAdmin} />

      <InquiryModal
        isOpen={inquiryModalOpen}
        onClose={() => setInquiryModalOpen(false)}
        initialItemTitle={selectedItemTitle}
        isArabic={isArabic}
      />

      {/* PASSWORD AUTHENTICATION SECURITY MODAL */}
      {showPasswordAuthModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white border border-neutral-200 rounded-3xl p-8 max-w-md w-full shadow-2xl space-y-6 text-right font-ibm">
            
            <div className="flex flex-col gap-2 items-center text-center">
              <div className="w-14 h-14 rounded-2xl bg-[#1E3A8A] text-white flex items-center justify-center shadow-md mb-2">
                <span className="material-symbols-outlined text-[30px]">admin_panel_settings</span>
              </div>
              <h3 className="text-xl font-bold text-neutral-900 font-ibm">
                {isArabic ? 'منطقة أدمن محمية بكلمة سر' : 'Protected Admin Portal'}
              </h3>
              <p className="text-xs text-neutral-600 font-normal">
                {isArabic
                  ? 'يرجى إدخال كلمة السر للوصول إلى لوحة التحكم.'
                  : 'Enter password to access Admin Dashboard.'}
              </p>
            </div>

            <form onSubmit={handlePasswordSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-neutral-700 font-bold mb-2">{isArabic ? 'كلمة السر' : 'Password'}</label>
                <input
                  required
                  autoFocus
                  type="password"
                  value={inputPassword}
                  onChange={(e) => {
                    setInputPassword(e.target.value);
                    setPasswordError(false);
                  }}
                  placeholder="••••••••"
                  className={`w-full bg-neutral-50 border ${
                    passwordError ? 'border-red-500 text-red-600' : 'border-neutral-300 text-neutral-900'
                  } rounded-xl px-4 py-3 font-mono text-sm focus:outline-none focus:border-[#1E3A8A]`}
                />
                {passwordError && (
                  <span className="text-xs text-red-600 font-bold mt-1.5 block">
                    ❌ {isArabic ? 'كلمة السر غير صحيحة، حاول مجدداً!' : 'Incorrect password!'}
                  </span>
                )}
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowPasswordAuthModal(false);
                    window.location.hash = '';
                  }}
                  className="w-full py-3 rounded-xl bg-neutral-100 text-neutral-700 font-bold hover:bg-neutral-200 text-xs"
                >
                  {isArabic ? 'إلغاء' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-[#1E3A8A] hover:bg-[#1E3A8A] text-white font-bold text-xs shadow-md"
                >
                  {isArabic ? 'دخول لوحة التحكم' : 'Authenticate'}
                </button>
              </div>
            </form>

            <div className="text-[11px] text-neutral-400 text-center font-mono">
              SECRET URL ROUTE: {SECRET_HASH}
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default App;
