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

  // Determine if button is primary blue or dark/secondary
  const isPrimary = variant === "primary" || (className && className.includes("bg-[#1E3A8A]"));
  
  // Blue buttons expand to exact Emerald logo color (#0D5C3A), non-blue buttons expand to glossy dark black (#111111)
  const hoverCircleBg = isPrimary ? "bg-[#0D5C3A]" : "bg-[#111111]";

  return (
    <button
      ref={ref}
      className={cn(
        "group relative cursor-pointer overflow-hidden rounded-full px-6 py-3.5 text-center font-bold transition-all duration-300 shadow-md hover:shadow-xl border",
        isPrimary
          ? "border-[#1E3A8A] bg-[#1E3A8A] text-white"
          : "border-neutral-300 bg-neutral-900 text-white hover:border-neutral-800",
        className
      )}
      {...props}
    >
      {/* Idle Visible Text Layer (z-10, pointer-events-none, no dot overlap) */}
      <span className="relative z-10 flex items-center justify-center gap-2 transition-all duration-300 group-hover:translate-x-12 group-hover:opacity-0 pointer-events-none">
        {content}
      </span>

      {/* Hover Revealed Text & Arrow Layer (z-20) */}
      <div className="absolute inset-0 z-20 flex h-full w-full translate-x-12 items-center justify-center gap-2 text-white opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 font-bold pointer-events-none">
        <span>{content}</span>
        <ArrowIcon className="w-4 h-4 shrink-0" />
      </div>

      {/* Expanding Circle Background (z-0 BEHIND TEXT - hidden when idle via opacity-0) */}
      <div
        className={cn(
          "absolute left-[10%] top-[40%] z-0 h-2 w-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out group-hover:left-0 group-hover:top-0 group-hover:h-full group-hover:w-full group-hover:scale-[3]",
          hoverCircleBg
        )}
      ></div>
    </button>
  );
});

InteractiveHoverButton.displayName = "InteractiveHoverButton";

export { InteractiveHoverButton };
