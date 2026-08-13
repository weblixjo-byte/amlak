import React from 'react';

interface BrushUnderlineProps {
  color?: string;
  className?: string;
}

export const BrushUnderline: React.FC<BrushUnderlineProps> = ({
  color = '#0D5C3A',
  className = '',
}) => {
  return (
    <svg
      viewBox="0 0 300 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`absolute -bottom-2.5 left-0 w-full h-3.5 md:h-4.5 pointer-events-none select-none ${className}`}
      preserveAspectRatio="none"
    >
      {/* Primary thick organic brush stroke body */}
      <path
        d="M 5,11 C 55,6 125,5 195,7.5 C 240,9 270,10.5 295,11.5 C 270,14.5 220,15 160,13.5 C 100,12 40,14 5,14 Z"
        fill={color}
      />
      {/* Secondary bristle texture lines at the tapered right edge matching user's image */}
      <path
        d="M 12,8.5 C 65,4.5 140,4 210,6.5 C 255,8 285,9.5 298,10.5 C 280,11.5 230,12 170,11 C 110,10 45,11 12,11 Z"
        fill={color}
        opacity="0.85"
      />
      <path
        d="M 180,9.5 C 220,10 260,10.5 292,11 C 275,12 235,12.5 195,11.8 Z"
        fill={color}
        opacity="0.6"
      />
      {/* Tapered bristle tips at tail */}
      <path
        d="M 285,11 L 299,10.8 L 294,12 Z"
        fill={color}
        opacity="0.9"
      />
    </svg>
  );
};
