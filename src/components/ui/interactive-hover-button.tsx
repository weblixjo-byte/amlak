import React from "react";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { cn } from "../../lib/utils";

interface InteractiveHoverButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  isArabic?: boolean;
  variant?: "primary" | "secondary" | "dark";
}

const InteractiveHoverButton = React.forwardRef<
  HTMLButtonElement,
  InteractiveHoverButtonProps
>(({ text = "Button", isArabic = true, variant = "primary", className, children, ...props }, ref) => {
  const content = text || children;
  const ArrowIcon = isArabic ? ArrowLeft : ArrowRight;

  const isPrimary = variant === "primary" || (className && className.includes("bg-[#1E3A8A]"));
  const hoverCircleBg = isPrimary ? "bg-[#0D5C3A]" : "bg-[#111111]";

  return (
    <button
      ref={ref}
      className={cn(
        "group relative cursor-pointer overflow-hidden rounded-full px-6 py-3.5 text-center font-bold transition-all duration-300 shadow-md hover:shadow-xl border-0 outline-none ring-0 focus:outline-none focus:ring-0 focus:border-0 active:outline-none active:border-0",
        isPrimary
          ? "bg-[#1E3A8A] text-white"
          : "bg-neutral-900 text-white",
        className
      )}
      {...props}
    >
      {/* Idle Visible Text with Dot Indicator (z-10) */}
      <span className="relative z-10 flex items-center justify-center gap-2 transition-all duration-300 group-hover:translate-x-12 group-hover:opacity-0 pointer-events-none">
        <span className="w-2 h-2 rounded-full bg-[#10B981] shrink-0 animate-pulse"></span>
        <span>{content}</span>
      </span>

      {/* Hover Revealed Text & Arrow (z-20) */}
      <div className="absolute inset-0 z-20 flex h-full w-full translate-x-12 items-center justify-center gap-2 text-white opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 font-bold pointer-events-none">
        <span>{content}</span>
        <ArrowIcon className="w-4 h-4 shrink-0" />
      </div>

      {/* Expanding Circle Background from the dot position (z-0) */}
      <div
        className={cn(
          "absolute right-4 top-1/2 -translate-y-1/2 z-0 h-2.5 w-2.5 rounded-full scale-0 group-hover:scale-[35] transition-transform duration-500 ease-out origin-center pointer-events-none",
          hoverCircleBg
        )}
      ></div>
    </button>
  );
});

InteractiveHoverButton.displayName = "InteractiveHoverButton";

export { InteractiveHoverButton };
