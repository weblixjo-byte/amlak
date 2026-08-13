import React from 'react';
import { AboutSection } from './blocks/about-section';

interface AboutTeaserProps {
  onOpenInquiry: (itemTitle?: string) => void;
  isArabic: boolean;
}

export const AboutTeaser: React.FC<AboutTeaserProps> = ({ onOpenInquiry, isArabic }) => {
  return (
    <div className="w-full bg-white font-ibm">
      {/* Bento Grid AboutSection Component */}
      <AboutSection onOpenInquiry={onOpenInquiry} isArabic={isArabic} />
    </div>
  );
};
