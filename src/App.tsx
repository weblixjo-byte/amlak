import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { BrandPartnersSection } from './components/BrandPartnersSection';
import { Collection } from './components/Collection';
import { AboutTeaser } from './components/AboutTeaser';
import { CTAWithVerticalMarquee } from './components/ui/cta-with-text-marquee';
import { BuyPage } from './components/BuyPage';
import { AdminDashboard } from './components/AdminDashboard';
import { Footer } from './components/Footer';
import { InquiryModal } from './components/InquiryModal';
import { PropertyItem, Brand } from './types';
import { api } from './lib/api';

const SECRET_HASH = '#amlak-admin-secret-8877';
const ADMIN_PASSWORD = 'amlak2026';

export const App: React.FC = () => {
  const [isArabic, setIsArabic] = useState(true);
  const [currentPage, setCurrentPage] = useState<'home' | 'buy' | 'dashboard'>('home');
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);
  const [selectedItemTitle, setSelectedItemTitle] = useState<string | undefined>(undefined);

  // ── Persistent Admin Authentication ─────────────────────────────────────
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    try {
      return localStorage.getItem('amlak_admin_authenticated') === 'true';
    } catch {
      return false;
    }
  });

  const [showPasswordAuthModal, setShowPasswordAuthModal] = useState(false);
  const [inputPassword, setInputPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);

  // ── Shared State (Starts 100% CLEAN & SPOTLESS) ──────────────────────────
  const [properties, setPropertiesRaw] = useState<PropertyItem[]>(() => api.getProperties());
  const [cars, setCarsRaw] = useState<PropertyItem[]>(() => api.getCars());
  const [brands, setBrandsRaw] = useState<Brand[]>(() => api.getBrands());

  // Setters that persist to local storage + API sync
  const setProperties: React.Dispatch<React.SetStateAction<PropertyItem[]>> = (val) => {
    setPropertiesRaw((prev) => {
      const next = typeof val === 'function' ? val(prev) : val;
      api.saveProperties(next);
      return next;
    });
  };

  const setCars: React.Dispatch<React.SetStateAction<PropertyItem[]>> = (val) => {
    setCarsRaw((prev) => {
      const next = typeof val === 'function' ? val(prev) : val;
      api.saveCars(next);
      return next;
    });
  };

  const setBrands: React.Dispatch<React.SetStateAction<Brand[]>> = (val) => {
    setBrandsRaw((prev) => {
      const next = typeof val === 'function' ? val(prev) : val;
      api.saveBrands(next);
      return next;
    });
  };

  // Sync across tabs/windows
  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === 'amlak_properties') {
        try { setPropertiesRaw(e.newValue ? JSON.parse(e.newValue) : []); } catch {}
      }
      if (e.key === 'amlak_cars') {
        try { setCarsRaw(e.newValue ? JSON.parse(e.newValue) : []); } catch {}
      }
      if (e.key === 'amlak_brands') {
        try { setBrandsRaw(e.newValue ? JSON.parse(e.newValue) : []); } catch {}
      }
      if (e.key === 'amlak_admin_authenticated') {
        setIsAdminAuthenticated(e.newValue === 'true');
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  // Listen for secret hash URL
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
      try { localStorage.setItem('amlak_admin_authenticated', 'true'); } catch {}
      setShowPasswordAuthModal(false);
      setPasswordError(false);
      setInputPassword('');
      setCurrentPage('dashboard');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setPasswordError(true);
    }
  };

  const handleLogoutAdmin = () => {
    setIsAdminAuthenticated(false);
    try { localStorage.removeItem('amlak_admin_authenticated'); } catch {}
    window.location.hash = '';
    setCurrentPage('home');
  };

  // Fullscreen Dashboard
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
          onLogout={handleLogoutAdmin}
        />
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-[#FAFAFA] text-neutral-900 font-ibm ${isArabic ? 'rtl' : 'ltr'}`} dir={isArabic ? 'rtl' : 'ltr'}>
      
      {/* Header */}
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
            <CTAWithVerticalMarquee
              isArabic={isArabic}
              onOpenInquiry={handleOpenInquiry}
              onNavigateBuy={() => handleNavigate('buy')}
            />
          </>
        ) : (
          <BuyPage
            onOpenInquiry={handleOpenInquiry}
            isArabic={isArabic}
            onNavigateHome={() => handleNavigate('home')}
            properties={properties}
            cars={cars}
          />
        )}
      </main>

      {/* Footer */}
      <Footer onOpenInquiry={handleOpenInquiry} isArabic={isArabic} onOpenSecretAdmin={handleOpenSecretAdmin} />

      <InquiryModal
        isOpen={inquiryModalOpen}
        onClose={() => setInquiryModalOpen(false)}
        initialItemTitle={selectedItemTitle}
        isArabic={isArabic}
      />

      {/* PASSWORD SECURITY MODAL */}
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
