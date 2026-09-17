"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export type ProjectShowcaseNavigationProps = {
  total: number;
  activeIndex: number;
  progress: number;
  onSelect: (index: number) => void;
  onPrev: () => void;
  onNext: () => void;
  canPrev: boolean;
  canNext: boolean;
  className?: string;
};

export function ProjectShowcaseNavigation({
  total,
  activeIndex,
  progress,
  onSelect,
  onPrev,
  onNext,
  canPrev,
  canNext,
  className,
}: ProjectShowcaseNavigationProps) {
  const formattedCurrent = String(activeIndex + 1).padStart(2, "0");
  const formattedTotal = String(total).padStart(2, "0");

  return (
    <div
      className={cn(
        "flex flex-wrap items-center justify-between gap-4 border-y border-white/[0.08] bg-[#050505]/95 py-3.5 backdrop-blur-md",
        className,
      )}
      aria-label="Project showcase controls"
    >
      {/* Left: Project Count & Progress Indicator */}
      <div className="flex items-center gap-4 sm:gap-6">
        <div className="flex items-baseline gap-1.5 font-mono text-xs tracking-[0.16em]">
          <span className="text-[#ccff00] font-semibold">{formattedCurrent}</span>
          <span className="text-white/28">/</span>
          <span className="text-white/50">{formattedTotal}</span>
        </div>

        {/* Step dots with track */}
        <div
          className="flex items-center gap-2"
          role="tablist"
          aria-label="Project slide selector"
        >
          {Array.from({ length: total }, (_, i) => {
            const isActive = i === activeIndex;
            return (
              <button
                key={i}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-label={`Jump to project ${String(i + 1).padStart(2, "0")}`}
                onClick={() => onSelect(i)}
                className={cn(
                  "group relative flex h-7 items-center justify-center px-2 font-mono text-[0.625rem] tracking-[0.14em] uppercase transition-all duration-200 outline-none focus-visible:ring-1 focus-visible:ring-[#ccff00]",
                  isActive
                    ? "text-[#ccff00]"
                    : "text-white/36 hover:text-white/75",
                )}
              >
                <span className="relative z-10">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {isActive && (
                  <span
                    className="absolute inset-x-0 bottom-0 h-[2px] bg-[#ccff00] shadow-[0_0_8px_rgba(204,255,0,0.5)]"
                    aria-hidden="true"
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Center: Subtle progress bar */}
      <div
        className="hidden sm:block relative h-1 w-28 md:w-40 overflow-hidden rounded-full bg-white/[0.08]"
        aria-hidden="true"
      >
        <div
          className="h-full bg-gradient-to-r from-[#ccff00]/60 to-[#ccff00] transition-[width] duration-150 ease-out"
          style={{ width: `${Math.max(4, Math.min(100, progress * 100))}%` }}
        />
      </div>

      {/* Right: Previous / Next Navigation Buttons */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onPrev}
          disabled={!canPrev}
          aria-label="Previous project"
          className="inline-flex h-11 w-11 sm:h-9 sm:w-9 items-center justify-center border border-white/[0.12] bg-[#090909] text-white/70 transition-colors duration-200 hover:border-[#ccff00]/50 hover:bg-white/[0.04] hover:text-[#ccff00] focus-visible:ring-1 focus-visible:ring-[#ccff00] disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-white/[0.12] disabled:hover:text-white/70"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        </button>

        <button
          type="button"
          onClick={onNext}
          disabled={!canNext}
          aria-label="Next project"
          className="inline-flex h-11 w-11 sm:h-9 sm:w-9 items-center justify-center border border-white/[0.12] bg-[#090909] text-white/70 transition-colors duration-200 hover:border-[#ccff00]/50 hover:bg-white/[0.04] hover:text-[#ccff00] focus-visible:ring-1 focus-visible:ring-[#ccff00] disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-white/[0.12] disabled:hover:text-white/70"
        >
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
