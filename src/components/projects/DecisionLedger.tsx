"use client";

import { useId } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

export type ProjectDecision = {
  id: string;
  label: string;
  constraint: string;
  decision: string;
  result: string;
  relatedNodeIds: readonly string[];
  layerId?: string;
};

export type DecisionLedgerProps = {
  decisions: readonly ProjectDecision[];
  activeDecisionId: string | null;
  onActivate: (decision: ProjectDecision | null) => void;
  className?: string;
};

export function DecisionLedger({
  decisions,
  activeDecisionId,
  onActivate,
  className,
}: DecisionLedgerProps) {
  const prefersReducedMotion = useReducedMotion();
  const headingId = `project-decision-ledger-${useId().replace(/:/g, "")}`;

  if (decisions.length === 0) return null;

  return (
    <section
      className={cn("min-w-0", className)}
      aria-labelledby={headingId}
      data-project-reveal
    >
      <header className="flex items-center justify-between border-b border-white/[0.08] py-4">
        <h4
          id={headingId}
          className="text-sm font-medium tracking-[-0.01em] text-white"
        >
          Decision ledger
        </h4>
        <span className="font-mono text-[0.5625rem] uppercase tracking-[0.18em] text-[#7c3aed]">
          Constraint / Decision / Result
        </span>
      </header>

      <ol className="divide-y divide-white/[0.08]">
        {decisions.map((decision, index) => {
          const isActive = decision.id === activeDecisionId;

          return (
            <motion.li
              key={decision.id}
              initial={false}
              animate={{
                backgroundColor: isActive
                  ? "rgba(124,58,237,0.08)"
                  : "rgba(5,5,5,0)",
              }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
            >
              <button
                type="button"
                className="grid w-full gap-5 px-0 py-6 text-left outline-none focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-[#ccff00] md:grid-cols-[4rem_minmax(0,1fr)] lg:py-7"
                aria-pressed={isActive}
                onPointerEnter={(event) => {
                  if (event.pointerType === "mouse") onActivate(decision);
                }}
                onPointerLeave={(event) => {
                  if (event.pointerType === "mouse") onActivate(null);
                }}
                onFocus={() => onActivate(decision)}
                onBlur={() => onActivate(null)}
                onClick={() => onActivate(isActive ? null : decision)}
              >
                <span className="font-mono text-[0.625rem] tracking-[0.18em] text-white/28">
                  D/{String(index + 1).padStart(2, "0")}
                </span>

                <span className="min-w-0">
                  <span className="block font-mono text-[0.625rem] uppercase tracking-[0.18em] text-[#ccff00]">
                    {decision.label}
                  </span>
                  <span className="mt-5 grid gap-5 sm:grid-cols-3">
                    <span>
                      <span className="block font-mono text-[0.5625rem] uppercase tracking-[0.16em] text-white/28">
                        Constraint
                      </span>
                      <span className="mt-2 block text-sm leading-6 text-[#a1a1aa]">
                        {decision.constraint}
                      </span>
                    </span>
                    <span>
                      <span className="block font-mono text-[0.5625rem] uppercase tracking-[0.16em] text-white/28">
                        Decision
                      </span>
                      <span className="mt-2 block text-sm leading-6 text-white/76">
                        {decision.decision}
                      </span>
                    </span>
                    <span>
                      <span className="block font-mono text-[0.5625rem] uppercase tracking-[0.16em] text-white/28">
                        Result
                      </span>
                      <span className="mt-2 block text-sm leading-6 text-[#a1a1aa]">
                        {decision.result}
                      </span>
                    </span>
                  </span>
                </span>
              </button>
            </motion.li>
          );
        })}
      </ol>
    </section>
  );
}
