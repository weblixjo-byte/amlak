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

export const App: React.FC = () => {
  const [isArabic, setIsArabic] = useState(true);
  const [currentPage, setCurrentPage] = useState<'home' | 'buy' | 'dashboard'>('home');
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);
  const [selectedItemTitle, setSelectedItemTitle] = useState<string | undefined>(undefined);

  // ── Shared State (localStorage-backed so data persists across refreshes) ─
  const [properties, setPropertiesRaw] = useState<PropertyItem[]>(() => {
    try { return JSON.parse(localStorage.getItem('amlak_properties') || '[]'); } catch { return []; }
  });
  const [cars, setCarsRaw] = useState<PropertyItem[]>(() => {
    try { return JSON.parse(localStorage.getItem('amlak_cars') || '[]'); } catch { return []; }
  });
  const [brands, setBrandsRaw] = useState<Brand[]>(() => {
    try { return JSON.parse(localStorage.getItem('amlak_brands') || '[]'); } catch { return []; }
  });

  // Wrappers that also save to localStorage
  const setProperties: React.Dispatch<React.SetStateAction<PropertyItem[]>> = (val) => {
    setPropertiesRaw((prev) => {
      const next = typeof val === 'function' ? val(prev) : val;
      localStorage.setItem('amlak_properties', JSON.stringify(next));
      return next;
    });
  };
  const setCars: React.Dispatch<React.SetStateAction<PropertyItem[]>> = (val) => {
    setCarsRaw((prev) => {
      const next = typeof val === 'function' ? val(prev) : val;
      localStorage.setItem('amlak_cars', JSON.stringify(next));
      return next;
    });
  };
  const setBrands: React.Dispatch<React.SetStateAction<Brand[]>> = (val) => {
    setBrandsRaw((prev) => {
      const next = typeof val === 'function' ? val(prev) : val;
      localStorage.setItem('amlak_brands', JSON.stringify(next));
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
