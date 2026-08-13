import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Heart, Zap, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface AboutSectionProps {
  onOpenInquiry?: (itemTitle?: string) => void;
  isArabic?: boolean;
}

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: "easeOut" }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.15
    }
  }
};

export function AboutSection({ onOpenInquiry, isArabic = true }: AboutSectionProps) {
  return (
    <section id="why-us" className="py-24 bg-white overflow-hidden font-ibm border-t border-neutral-200">
      <div className="container mx-auto px-6 md:px-12 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-12 items-center">
          
          {/* Text Content */}
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="space-y-8"
          >
            <motion.div variants={fadeIn} className="flex items-center gap-2">
              <Badge className="rounded-full px-4 py-1.5 border-[#1E3A8A]/20 text-[#1E3A8A] bg-[#1E3A8A]/5 text-sm font-bold" variant="outline">
                {isArabic ? "قصة أمـلاك" : "Our Story"}
              </Badge>
            </motion.div>

            <motion.h2 variants={fadeIn} className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-neutral-900 leading-[1.15] font-ibm">
              {isArabic ? (
                <>
                  نصنع تجارب معايـنة <span className="text-[#1E3A8A]">فاخرة وموثوقة</span> لكل عقار وسيارة.
                </>
              ) : (
                <>
                  We build <span className="text-[#1E3A8A]">luxury viewing</span> experiences for properties and vehicles.
                </>
              )}
            </motion.h2>

            <motion.p variants={fadeIn} className="text-base md:text-lg text-neutral-600 leading-relaxed max-w-xl">
              {isArabic
                ? "نحن فريق متكـامل يجمع بين الخبرة العقارية وحلول الفخامة لتقديم منصة متطورة تمكنك من استكشاف أرقى العقارات والسيارات المعروضة للبيع في عمّان بسهولة ومباشرة."
                : "We combine real estate expertise and luxury solutions to bring you an advanced platform for exploring Amman's finest properties and vehicles."}
            </motion.p>

            <motion.div variants={fadeIn} className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                onClick={() => onOpenInquiry && onOpenInquiry()}
                className="rounded-full h-12 px-8 text-base bg-[#1E3A8A] hover:bg-[#1E3A8A] text-white font-bold shadow-md hover:scale-105 transition-all"
                size="lg"
              >
                <span>{isArabic ? "طلب معاينة الآن" : "Request Viewing"}</span>
                {isArabic ? <ArrowLeft className="mr-2 h-5 w-5" /> : <ArrowRight className="ml-2 h-5 w-5" />}
              </Button>
              <Button
                onClick={() => {
                  const el = document.getElementById('portfolio');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="rounded-full h-12 px-8 text-base font-bold border-neutral-300 hover:bg-neutral-100 text-neutral-800"
                size="lg"
                variant="outline"
              >
                {isArabic ? "استعرض المعروضات" : "View Listings"}
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div variants={fadeIn} className="grid grid-cols-2 gap-8 pt-8 border-t border-neutral-200">
              <div>
                <h3 className="text-4xl font-bold text-neutral-900 font-mono">100%</h3>
                <p className="text-sm text-neutral-600 mt-2 font-bold">{isArabic ? "معاينة ميدانية مضمونة" : "Direct Viewing Guarantee"}</p>
              </div>
              <div>
                <h3 className="text-4xl font-bold text-neutral-900 font-mono">24/7</h3>
                <p className="text-sm text-neutral-600 mt-2 font-bold">{isArabic ? "دعم واستجابة سريعة" : "Global Support"}</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Image & Cards Grid (Bento Style) */}
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-4 md:gap-6">
              
              {/* Left Column of Grid */}
              <motion.div variants={fadeIn} className="space-y-4 md:space-y-6 mt-8 md:mt-12">
                <div className="relative rounded-3xl overflow-hidden h-48 md:h-72 group shadow-md border border-neutral-200">
                  <img 
                    src="/images/dabouq_villa.jpg" 
                    alt="Luxury Villa" 
                    className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110" 
                  />
                  <div className="absolute inset-0 bg-black/20 transition-colors duration-500 group-hover:bg-black/0" />
                </div>
                
                <div className="bg-blue-50/80 rounded-3xl p-6 md:p-8 flex flex-col justify-center items-start h-48 md:h-64 shadow-sm border border-blue-100">
                  <div className="bg-[#1E3A8A] p-3 rounded-2xl text-white mb-4 shadow-md shadow-blue-500/20">
                    <Zap className="h-6 w-6"/>
                  </div>
                  <h4 className="text-xl font-bold text-neutral-900 mb-2 font-ibm">{isArabic ? "السرعة والدقة" : "Innovation & Speed"}</h4>
                  <p className="text-neutral-600 text-sm leading-relaxed">{isArabic ? "توفير معلومات دقيقة ومعاينة فورية بدون تعقيدات." : "Accurate details and direct instant viewings."}</p>
                </div>
              </motion.div>

              {/* Right Column of Grid */}
              <motion.div variants={fadeIn} className="space-y-4 md:space-y-6">
                <div className="bg-neutral-100/80 rounded-3xl p-6 md:p-8 flex flex-col justify-center items-start h-48 md:h-64 border border-neutral-200 shadow-sm">
                  <div className="bg-neutral-900 p-3 rounded-2xl text-white mb-4 shadow-md">
                    <Heart className="h-6 w-6"/>
                  </div>
                  <h4 className="text-xl font-bold text-neutral-900 mb-2 font-ibm">{isArabic ? "الموثوقية والشفافية" : "Trust & Transparency"}</h4>
                  <p className="text-neutral-600 text-sm leading-relaxed">{isArabic ? "فحص وتوثيق جميع العقارات والسيارات قبل عرضها للبيع." : "Thorough inspection of all luxury assets before listing."}</p>
                </div>
                
                <div className="relative rounded-3xl overflow-hidden h-48 md:h-72 group shadow-md border border-neutral-200">
                  <img 
                    src="/images/rolls_royce.jpg" 
                    alt="Luxury Car" 
                    className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110" 
                  />
                  <div className="absolute inset-0 bg-black/20 transition-colors duration-500 group-hover:bg-black/0" />
                </div>
              </motion.div>

            </div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
