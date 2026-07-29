"use client";

import { useId } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

export type ExperienceEntry = {
  id: string;
  duration: string;
  company: string;
  role: string;
  summary: string;
  responsibilities: readonly string[];
  technologies: readonly string[];
  growth?: string;
  current?: boolean;
};

export type ExperienceCardProps = {
  experience: ExperienceEntry;
  className?: string;
};

export function ExperienceCard({
  experience,
  className,
}: ExperienceCardProps) {
  const prefersReducedMotion = useReducedMotion();
  const generatedId = useId().replace(/:/g, "");
  const headingId = `experience-${experience.id}-${generatedId}`;

  const interactiveState = prefersReducedMotion
    ? undefined
    : {
        y: -4,
        backgroundColor: "#0a0a0a",
        borderColor: "rgba(124,58,237,0.5)",
      };

  return (
    <motion.article
      tabIndex={0}
      className={cn(
        "relative min-w-0 border border-white/[0.1] bg-[#070707] p-5 outline-none focus-visible:ring-1 focus-visible:ring-[#ccff00] sm:p-7 lg:p-8",
        className,
      )}
      aria-labelledby={headingId}
      initial={false}
      whileHover={interactiveState}
      whileFocus={interactiveState}
      transition={{
        duration: prefersReducedMotion ? 0 : 0.22,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <header className="border-b border-white/[0.08] pb-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="font-mono text-[0.625rem] uppercase tracking-[0.18em] text-[#ccff00]">
            {experience.duration}
          </p>

          {experience.current ? (
            <p className="inline-flex items-center gap-2 font-mono text-[0.5625rem] uppercase tracking-[0.16em] text-white/48">
              <span
                className="h-1.5 w-1.5 rounded-full bg-[#ccff00] shadow-[0_0_12px_rgba(204,255,0,0.5)]"
                aria-hidden="true"
              />
              Current
            </p>
          ) : null}
        </div>

        <h3
          id={headingId}
          className="mt-6 text-[clamp(1.75rem,3vw,2.75rem)] font-medium leading-[1.02] tracking-[-0.04em] text-white"
        >
          {experience.role}
        </h3>
        <p className="mt-3 text-sm font-medium tracking-[-0.01em] text-white/58">
          {experience.company}
        </p>
      </header>

      <p className="py-6 text-[0.9375rem] leading-7 text-[#a1a1aa] sm:text-base">
        {experience.summary}
      </p>

      <section
        className="border-t border-white/[0.08] pt-6"
        aria-label="Responsibilities"
      >
        <h4 className="font-mono text-[0.625rem] uppercase tracking-[0.18em] text-white/36">
          Responsibilities
        </h4>
        <ul className="mt-5 grid gap-x-6 gap-y-3 sm:grid-cols-2">
          {experience.responsibilities.map((responsibility) => (
            <li
              key={responsibility}
              className="grid grid-cols-[0.75rem_1fr] gap-2 text-sm leading-6 text-white/68"
            >
              <span
                className="mt-[0.6rem] h-px w-2 bg-[#7c3aed]"
                aria-hidden="true"
              />
              {responsibility}
            </li>
          ))}
        </ul>
      </section>

      <section
        className="mt-7 border-t border-white/[0.08] pt-6"
        aria-label="Technologies"
      >
        <h4 className="font-mono text-[0.625rem] uppercase tracking-[0.18em] text-white/36">
          Technologies
        </h4>
        <ul className="mt-4 flex flex-wrap gap-2">
          {experience.technologies.map((technology) => (
            <li
              key={technology}
              className="border border-white/[0.1] px-3 py-2 font-mono text-[0.5625rem] uppercase tracking-[0.14em] text-white/58 transition-colors duration-200 hover:border-[#ccff00]/40 hover:text-[#ccff00]"
            >
              {technology}
            </li>
          ))}
        </ul>
      </section>

      {experience.growth ? (
        <section className="mt-7 border-l border-[#7c3aed] bg-white/[0.025] px-4 py-4">
          <h4 className="font-mono text-[0.5625rem] uppercase tracking-[0.18em] text-[#7c3aed]">
            Engineering growth
          </h4>
          <p className="mt-2 text-sm leading-6 text-white/62">
            {experience.growth}
          </p>
        </section>
      ) : null}
    </motion.article>
  );
}
