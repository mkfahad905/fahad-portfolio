"use client";

import { useId } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

export type Capability = {
  id: string;
  name: string;
  experience: string;
  uses: readonly string[];
};

export type CapabilityCardProps = {
  capability: Capability;
  index: number;
  className?: string;
};

export function CapabilityCard({
  capability,
  index,
  className,
}: CapabilityCardProps) {
  const prefersReducedMotion = useReducedMotion();
  const generatedId = useId().replace(/:/g, "");
  const headingId = `capability-${capability.id}-${generatedId}`;
  const descriptionId = `${headingId}-description`;

  const inspectionState = prefersReducedMotion
    ? undefined
    : {
        y: -3,
        backgroundColor: "#0a0a0a",
        borderColor: "rgba(204,255,0,0.36)",
      };

  return (
    <motion.article
      tabIndex={0}
      className={cn(
        "group relative min-h-64 overflow-hidden border border-white/[0.1] bg-[#070707] p-5 outline-none focus-visible:ring-1 focus-visible:ring-[#ccff00] sm:p-6",
        className,
      )}
      aria-labelledby={headingId}
      aria-describedby={descriptionId}
      initial={false}
      whileHover={inspectionState}
      whileFocus={inspectionState}
      transition={{
        duration: prefersReducedMotion ? 0 : 0.2,
        ease: [0.22, 1, 0.36, 1],
      }}
      data-toolkit-card
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="font-mono text-[0.5625rem] uppercase tracking-[0.18em] text-white/26">
            Capability
          </p>
          <h4
            id={headingId}
            className="mt-4 text-xl font-medium tracking-[-0.03em] text-white"
          >
            {capability.name}
          </h4>
        </div>

        <span
          className="font-mono text-[0.5625rem] tracking-[0.18em] text-[#7c3aed]"
          aria-hidden="true"
        >
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <p className="mt-4 max-w-[24ch] text-sm leading-6 text-white/42 transition-opacity duration-200 group-hover:opacity-0 group-focus:opacity-0">
        {capability.experience}
      </p>

      <div
        id={descriptionId}
        className="absolute inset-x-5 bottom-5 translate-y-2 opacity-0 transition-[opacity,transform] duration-200 group-hover:translate-y-0 group-hover:opacity-100 group-focus:translate-y-0 group-focus:opacity-100 sm:inset-x-6 sm:bottom-6"
      >
        <p className="font-mono text-[0.5625rem] uppercase tracking-[0.18em] text-[#ccff00]">
          Applied experience
        </p>
        <p className="mt-2 text-sm leading-5 text-white/72">
          {capability.experience}
        </p>

        <ul className="mt-4 space-y-2">
          {capability.uses.map((use) => (
            <li
              key={use}
              className="grid grid-cols-[0.75rem_1fr] gap-2 text-xs leading-5 text-[#a1a1aa]"
            >
              <span
                className="mt-[0.6rem] h-px w-2 bg-[#7c3aed]"
                aria-hidden="true"
              />
              {use}
            </li>
          ))}
        </ul>
      </div>

      <p className="absolute inset-x-5 bottom-5 font-mono text-[0.5rem] uppercase tracking-[0.16em] text-white/20 transition-opacity duration-200 group-hover:opacity-0 group-focus:opacity-0 sm:inset-x-6 sm:bottom-6">
        Focus / inspect
      </p>
    </motion.article>
  );
}
