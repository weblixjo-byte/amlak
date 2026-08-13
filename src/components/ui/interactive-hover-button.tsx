import React from "react";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { cn } from "../../lib/utils";

interface InteractiveHoverButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  isArabic?: boolean;
}

const InteractiveHoverButton = React.forwardRef<
  HTMLButtonElement,
  InteractiveHoverButtonProps
>(({ text = "Button", isArabic = true, className, children, ...props }, ref) => {
  const content = text || children;
  const ArrowIcon = isArabic ? ArrowLeft : ArrowRight;

  return (
    <button
      ref={ref}
      className={cn(
        "group relative cursor-pointer overflow-hidden rounded-full border border-[#1E3A8A] bg-[#1E3A8A] px-6 py-3 text-center font-bold text-white transition-all duration-300 shadow-md hover:shadow-xl",
        className
      )}
      {...props}
    >
      <span className="inline-block transition-all duration-300 group-hover:translate-x-12 group-hover:opacity-0">
        {content}
      </span>
      <div className="absolute top-0 inset-0 z-10 flex h-full w-full translate-x-12 items-center justify-center gap-2 text-white opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 font-bold">
        <span>{content}</span>
        <ArrowIcon className="w-4 h-4 shrink-0" />
      </div>
      <div className="absolute left-[20%] top-[40%] h-2 w-2 scale-[1] rounded-full bg-[#16316e] transition-all duration-300 group-hover:left-[0%] group-hover:top-[0%] group-hover:h-full group-hover:w-full group-hover:scale-[2.5]"></div>
    </button>
  );
});

InteractiveHoverButton.displayName = "InteractiveHoverButton";

export { InteractiveHoverButton };
