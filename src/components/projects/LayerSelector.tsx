"use client";

import { useRef } from "react";
import { cn } from "@/lib/utils";

export type ProjectLayer = {
  id: string;
  label: string;
  description?: string;
};

export type LayerSelectorProps = {
  layers: readonly ProjectLayer[];
  activeLayerId: string;
  lockedLayerId: string | null;
  onPreview: (layerId: string) => void;
  onCommit: (layerId: string) => void;
  onReset: () => void;
  className?: string;
};

export function LayerSelector({
  layers,
  activeLayerId,
  lockedLayerId,
  onPreview,
  onCommit,
  onReset,
  className,
}: LayerSelectorProps) {
  const navRef = useRef<HTMLElement>(null);

  if (layers.length === 0) return null;

  return (
    <nav
      ref={navRef}
      className={cn(
        "min-w-0 border-y border-white/[0.08] bg-[#080808]",
        className,
      )}
      aria-label="Architecture layers"
      onPointerLeave={(event) => {
        if (event.pointerType === "mouse") onReset();
      }}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) onReset();
      }}
    >
      <div className="flex snap-x snap-mandatory overflow-x-auto overscroll-x-contain [scrollbar-color:rgba(204,255,0,0.24)_transparent] [scrollbar-width:thin]">
        {layers.map((layer, index) => {
          const isActive = activeLayerId === layer.id;
          const isLocked = lockedLayerId === layer.id;

          return (
            <button
              key={layer.id}
              type="button"
              className={cn(
                "group relative min-h-12 min-w-max snap-start border-r border-white/[0.08] px-4 py-3 text-left font-mono text-[0.625rem] uppercase tracking-[0.18em] outline-none transition-colors duration-200 focus-visible:z-10 focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-[#ccff00] sm:flex-1 sm:px-5",
                isActive
                  ? "bg-white/[0.06] text-[#ccff00]"
                  : "text-white/42 hover:bg-white/[0.03] hover:text-white/78",
              )}
              aria-pressed={isLocked}
              aria-label={`${layer.label}${layer.description ? `: ${layer.description}` : ""}`}
              onPointerEnter={(event) => {
                if (event.pointerType === "mouse") onPreview(layer.id);
              }}
              onFocus={() => onPreview(layer.id)}
              onClick={() => onCommit(layer.id)}
            >
              <span className="mr-3 text-white/22" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              {layer.label}
              <span
                className={cn(
                  "absolute inset-x-0 bottom-0 h-px origin-left bg-[#ccff00] transition-transform duration-200",
                  isActive ? "scale-x-100" : "scale-x-0",
                )}
                aria-hidden="true"
              />
            </button>
          );
        })}
      </div>
    </nav>
  );
}
