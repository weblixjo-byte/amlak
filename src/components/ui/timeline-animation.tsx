import React from "react";
import { motion, Variants } from "framer-motion";
import { cn } from "../../lib/utils";

interface TimelineContentProps {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  as?: "div" | "p" | "button" | "figure" | "span" | "h2" | "h3" | "section";
  animationNum?: number;
  customVariants?: Variants;
  timelineRef?: React.RefObject<HTMLDivElement | HTMLElement | null>;
  onClick?: () => void;
}

export const TimelineContent: React.FC<TimelineContentProps> = ({
  children,
  className,
  style,
  as = "div",
  animationNum = 0,
  customVariants,
  onClick,
}) => {
  const Component = motion[as as keyof typeof motion] as any;

  const defaultVariants: Variants = {
    hidden: { opacity: 0, y: 30, filter: "blur(6px)" },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        delay: i * 0.2,
        duration: 0.6,
        ease: "easeOut",
      },
    }),
  };

  return (
    <Component
      className={cn(className)}
      style={style}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      custom={animationNum}
      variants={customVariants || defaultVariants}
      onClick={onClick}
    >
      {children}
    </Component>
  );
};
