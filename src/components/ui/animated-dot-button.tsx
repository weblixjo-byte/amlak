"use client";

import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "../../lib/utils";
import { ArrowRight, ArrowLeft } from "lucide-react";

export interface AnimatedDotButtonProps extends Omit<HTMLMotionProps<"button">, "text"> {
  variant?: "black" | "blue";
  text?: React.ReactNode;
  isArabic?: boolean;
}

export function AnimatedDotButton({
  variant = "blue",
  text,
  isArabic = true,
  className,
  children,
  ...props
}: AnimatedDotButtonProps) {
  const isBlack = variant === "black";
  
  // Brand color logic:
  // Blue variant: bg-[#1E3A8A] with Emerald expanding fill #0D5C3A
  // Black variant: bg-[#111111] with Blue expanding fill #1E3A8A
  const buttonBg = isBlack ? "bg-[#111111]" : "bg-[#1E3A8A]"; 
  const dotColor = isBlack ? "bg-[#1E3A8A]" : "bg-[#0D5C3A]"; 
  const ArrowIcon = isArabic ? ArrowLeft : ArrowRight;

  return (
    <motion.button
      initial="initial"
      whileHover="hover"
      className={cn(
        "group relative flex w-fit items-center gap-3 overflow-hidden rounded-full px-8 py-3.5 font-bold text-white shadow-lg transition-colors cursor-pointer border-0 outline-none ring-0 focus:outline-none focus:ring-0 active:outline-none",
        buttonBg,
        className
      )}
      {...props}
    >
      {/* 1. Expanding Background Circle (Z-0) */}
      <motion.div
        className={cn(
          "absolute right-6 top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full pointer-events-none z-0",
          dotColor
        )}
        variants={{
          initial: { scale: 1 },
          hover: { scale: 150 },
        }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* 2. Static Dot (Fades out seamlessly on hover) */}
      <div
        className={cn(
          "relative z-10 h-2.5 w-2.5 rounded-full transition-opacity duration-300 group-hover:opacity-0 shrink-0",
          isBlack ? "bg-blue-400" : "bg-[#10B981]"
        )}
      />

      {/* 3. Button Text & Icon (Z-10 guarantees it stays above the expanding dot) */}
      <span className="relative z-10 flex items-center gap-2 font-ibm">
        {(text || children) as React.ReactNode}
        <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1 shrink-0" />
      </span>
    </motion.button>
  );
}
