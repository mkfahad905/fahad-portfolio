"use client";

import type { PointerEvent, ReactNode } from "react";
import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import { DataCounter, type AboutMetric } from "./DataCounter";

export type AboutSpec = {
  id: string;
  label: string;
  value: string;
  detail?: string;
};

export type SpecGridProps = {
  specs: readonly AboutSpec[];
  metrics: readonly AboutMetric[];
  ariaLabel: string;
};

type SpecCardProps = {
  children: ReactNode;
  index: number;
};

function SpecCard({ children, index }: SpecCardProps) {
  const cardRef = useRef<HTMLLIElement>(null);
  const boundsRef = useRef<DOMRect | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const targetX = useMotionValue(0);
  const targetY = useMotionValue(0);
  const x = useSpring(targetX, { stiffness: 260, damping: 24, mass: 0.35 });
  const y = useSpring(targetY, { stiffness: 260, damping: 24, mass: 0.35 });

  const handlePointerMove = (event: PointerEvent<HTMLLIElement>) => {
    if (prefersReducedMotion || event.pointerType !== "mouse") return;

    const bounds = boundsRef.current;
    if (!bounds) return;

    targetX.set((event.clientX - (bounds.left + bounds.width / 2)) * 0.035);
    targetY.set((event.clientY - (bounds.top + bounds.height / 2)) * 0.035);
  };

  const reset = () => {
    boundsRef.current = null;
    targetX.set(0);
    targetY.set(0);
  };

  return (
    <motion.li
      ref={cardRef}
      className="group relative min-h-48 snap-start overflow-hidden border-b border-r border-white/[0.08] bg-[#050505] p-5 sm:min-h-52 sm:p-6"
      style={prefersReducedMotion ? undefined : { x, y }}
      whileHover={
        prefersReducedMotion
          ? undefined
          : {
              backgroundColor: "#111111",
              boxShadow:
                "inset 0 0 0 1px rgba(124,58,237,0.48), 0 0 28px rgba(124,58,237,0.1)",
            }
      }
      transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
      onPointerEnter={(event) => {
        if (event.pointerType === "mouse") {
          boundsRef.current = cardRef.current?.getBoundingClientRect() ?? null;
        }
      }}
      onPointerMove={handlePointerMove}
      onPointerLeave={reset}
    >
      <span
        className="absolute right-4 top-4 font-mono text-[0.5625rem] tracking-[0.18em] text-white/22"
        aria-hidden="true"
      >
        {String(index + 1).padStart(2, "0")}
      </span>
      {children}
      <span
        className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-[#7c3aed] transition-transform duration-300 group-hover:scale-x-100"
        aria-hidden="true"
      />
    </motion.li>
  );
}

export function SpecGrid({
  specs,
  metrics,
  ariaLabel,
}: SpecGridProps) {
  if (specs.length === 0 && metrics.length === 0) return null;

  return (
    <section aria-label={ariaLabel} data-about-reveal>
      <header className="flex items-center justify-between border-b border-white/[0.08] px-5 py-4 sm:px-8 lg:px-10">
        <h3 className="text-sm font-medium tracking-[-0.01em] text-white">
          {ariaLabel}
        </h3>
        <span
          className="font-mono text-[0.625rem] uppercase tracking-[0.18em] text-[#ccff00]"
          aria-hidden="true"
        >
          SYS.SPEC
        </span>
      </header>

      <ul className="grid auto-cols-[minmax(15.5rem,78vw)] snap-x snap-mandatory grid-flow-col overflow-x-auto overscroll-x-contain border-l border-white/[0.08] [scrollbar-color:rgba(204,255,0,0.28)_transparent] [scrollbar-width:thin] sm:auto-cols-auto sm:grid-flow-row sm:grid-cols-2 sm:overflow-visible xl:grid-cols-3">
        {metrics.map((metric, index) => (
          <SpecCard key={metric.id} index={index}>
            <DataCounter metric={metric} className="pt-8" />
          </SpecCard>
        ))}

        {specs.map((spec, index) => (
          <SpecCard key={spec.id} index={metrics.length + index}>
            <p className="font-mono text-[0.6875rem] uppercase tracking-[0.2em] text-[#ccff00]">
              {spec.label}
            </p>
            <p className="mt-10 max-w-[17ch] text-lg font-medium leading-tight tracking-[-0.025em] text-white/90">
              {spec.value}
            </p>
            {spec.detail ? (
              <p className="mt-3 max-w-[30ch] text-sm leading-6 text-[#a1a1aa]">
                {spec.detail}
              </p>
            ) : null}
          </SpecCard>
        ))}
      </ul>
    </section>
  );
}
