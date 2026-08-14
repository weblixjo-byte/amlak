import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";

interface NavHeaderProps {
  items?: { label: string; href: string; page?: 'home' | 'estates' | 'cars' | 'about' }[];
  isArabic?: boolean;
  isWhiteBg?: boolean;
  onNavigate?: (page: 'home' | 'estates' | 'cars' | 'about') => void;
}

export function NavHeader({ items, isArabic = true, isWhiteBg = false, onNavigate }: NavHeaderProps) {
  const defaultItems = isArabic
    ? [
        { label: "الرئيسية", href: "#home", page: "home" as const },
        { label: "قسم العقارات", href: "#estates", page: "estates" as const },
        { label: "قسم السيارات", href: "#cars", page: "cars" as const },
        { label: "عن المنصة", href: "#about", page: "about" as const },
      ]
    : [
        { label: "Home", href: "#home", page: "home" as const },
        { label: "Properties", href: "#estates", page: "estates" as const },
        { label: "Luxury Cars", href: "#cars", page: "cars" as const },
        { label: "About Us", href: "#about", page: "about" as const },
      ];

  const menuItems = items || defaultItems;
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
  const [position, setPosition] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });

  const tabRefs = useRef<(HTMLLIElement | null)[]>([]);

  const updateCursorToTab = (index: number) => {
    const el = tabRefs.current[index];
    if (el) {
      const { width } = el.getBoundingClientRect();
      setPosition({
        width,
        opacity: 1,
        left: el.offsetLeft,
      });
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      updateCursorToTab(activeIndex);
    }, 100);
    return () => clearTimeout(timer);
  }, [activeIndex, isArabic]);

  const highlightedIndex = hoveredIndex !== null ? hoveredIndex : activeIndex;

  return (
    <ul
      className="relative mx-auto flex w-fit gap-2 md:gap-3 rounded-full p-1.5 font-ibm px-3 md:px-4 transition-all duration-500 bg-transparent border-0 border-transparent outline-none ring-0"
      onMouseLeave={() => {
        setHoveredIndex(null);
        updateCursorToTab(activeIndex);
      }}
    >
      {menuItems.map((item, index) => {
        const isHighlighted = highlightedIndex === index;
        return (
          <Tab
            key={index}
            index={index}
            isHighlighted={isHighlighted}
            isWhiteBg={isWhiteBg}
            tabRefs={tabRefs}
            onMouseEnter={() => {
              setHoveredIndex(index);
              updateCursorToTab(index);
            }}
            onClick={() => {
              setActiveIndex(index);
              setHoveredIndex(index);
              updateCursorToTab(index);
              if (item.page && onNavigate) {
                onNavigate(item.page);
              }
            }}
            href={item.href}
          >
            {item.label}
          </Tab>
        );
      })}

      <Cursor position={position} />
    </ul>
  );
}

const Tab = ({
  children,
  index,
  isHighlighted,
  isWhiteBg,
  tabRefs,
  onMouseEnter,
  onClick,
  href,
}: {
  children: React.ReactNode;
  index: number;
  isHighlighted: boolean;
  isWhiteBg?: boolean;
  tabRefs: React.MutableRefObject<(HTMLLIElement | null)[]>;
  onMouseEnter: () => void;
  onClick: () => void;
  href?: string;
}) => {
  return (
    <li
      ref={(el) => (tabRefs.current[index] = el)}
      onMouseEnter={onMouseEnter}
      onClick={onClick}
      className={`relative z-10 block cursor-pointer px-5 py-2 text-xs md:px-7 md:py-2.5 md:text-sm font-bold font-ibm tracking-normal transition-colors duration-200 ${
        isHighlighted
          ? "text-white"
          : isWhiteBg
          ? "text-neutral-900 hover:text-neutral-700"
          : "text-white hover:text-neutral-200"
      }`}
    >
      {href ? (
        <a
          href={href}
          onClick={(e) => {
            if (href.startsWith('#')) {
              e.preventDefault();
            }
          }}
          className="block w-full h-full font-bold font-ibm"
        >
          {children}
        </a>
      ) : (
        children
      )}
    </li>
  );
};

const Cursor = ({
  position,
}: {
  position: { left: number; width: number; opacity: number };
}) => {
  return (
    <motion.li
      animate={position}
      transition={{ type: "spring", stiffness: 350, damping: 32 }}
      className="absolute z-0 h-8 rounded-full bg-[#1E3A8A] md:h-10 shadow-sm"
    />
  );
};

export default NavHeader;
