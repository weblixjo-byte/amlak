import React from "react";
import { AnimatedDotButton } from "./animated-dot-button";
import { BrushUnderline } from "./brush-underline";
import { Building2, CheckCircle2, ArrowLeft } from "lucide-react";

interface AddListingCTAProps {
  isArabic?: boolean;
  onOpenInquiry?: (title?: string) => void;
  onNavigateAddListing?: () => void;
  onNavigateBuy?: () => void;
}

export function CTAWithVerticalMarquee({
  isArabic = true,
  onOpenInquiry,
  onNavigateAddListing,
  onNavigateBuy,
}: AddListingCTAProps) {
  return (
    <section id="add-listing" className="w-full bg-white text-neutral-900 py-24 px-6 md:px-12 overflow-hidden font-ibm border-t border-neutral-200 relative">
      
      {/* Subtle Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#1E3A8A]/5 rounded-full blur-[160px] pointer-events-none"></div>

      <div className="max-w-[1440px] mx-auto relative z-10">
        <div className="bg-[#F8FAFC] border border-neutral-200/90 rounded-3xl p-8 md:p-14 shadow-xl text-right font-ibm relative overflow-hidden">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left/Main Column: Text & Benefits */}
            <div className="lg:col-span-8 space-y-6">
              
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0D5C3A]/10 border border-[#0D5C3A]/30 text-[#0D5C3A] text-xs font-bold uppercase tracking-widest">
                <Building2 className="w-4 h-4" />
                <span>{isArabic ? "إدراج ومعاينة مباشرة" : "DIRECT LISTINGS & VIEWINGS"}</span>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight tracking-tight text-neutral-950 font-ibm">
                {isArabic ? (
                  <>
                    ترغب ببيع أو إيجار عقارك أو سيارتك؟{' '}
                    <span className="relative inline-block pb-2 text-[#1E3A8A] font-bold">
                      أضف عقارك للبيع الآن
                      <BrushUnderline color="#0D5C3A" />
                    </span>
                    .
                  </>
                ) : (
                  <>
                    Want to sell or rent your property or car?{' '}
                    <span className="relative inline-block pb-2 text-[#1E3A8A] font-bold">
                      List Your Asset Now
                      <BrushUnderline color="#0D5C3A" />
                    </span>
                    .
                  </>
                )}
              </h2>

              <p className="text-base md:text-lg text-neutral-600 leading-relaxed font-normal max-w-2xl">
                {isArabic
                  ? "انتقل إلى صفحة الإدراج الشاملة وقم برفع صور عقارك وتفاصيله كاملة. يتكفل فريقنا بالتصوير الاحترافي، المعاينة المباشرة، والتسويق لأرقى المستثمرين في عمّان."
                  : "Go to our dedicated listing page to upload photos and full specs for instant review and viewing approval."}
              </p>

              {/* Benefits Checklist */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs md:text-sm font-bold text-neutral-800">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-[#0D5C3A] shrink-0" />
                  <span>{isArabic ? "رفع صور المعروض عالية الجودة" : "Upload high-res photos"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-[#0D5C3A] shrink-0" />
                  <span>{isArabic ? "معاينة ميدانية وتصوير احترافي" : "Direct on-site viewings"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-[#0D5C3A] shrink-0" />
                  <span>{isArabic ? "متابعة كاملة حتى استلام المبلغ" : "Full ownership transfer support"}</span>
                </div>
              </div>

            </div>

            {/* Right Action Button Column */}
            <div className="lg:col-span-4 flex flex-col items-stretch lg:items-end justify-center gap-4 pt-4 lg:pt-0">
              <AnimatedDotButton
                variant="blue"
                onClick={onNavigateAddListing}
                text={isArabic ? "انتقل لصفحة إضافة المعروض" : "Go to Add Listing Page"}
                isArabic={isArabic}
                className="w-full justify-center py-4 text-base shadow-lg"
              />

              {onNavigateBuy && (
                <button
                  onClick={onNavigateBuy}
                  className="w-full py-3 px-6 rounded-2xl bg-neutral-200/80 hover:bg-neutral-300 text-neutral-800 text-xs font-bold transition-all flex items-center justify-center gap-2"
                >
                  <span>{isArabic ? "تصفح معروضات الشراء المتاحة" : "Browse Available Listings"}</span>
                  <ArrowLeft className="w-4 h-4" />
                </button>
              )}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}

export default CTAWithVerticalMarquee;
