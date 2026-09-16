"use client";

import { useMemo, useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
} from "framer-motion";
import { cn } from "@/lib/utils";
import {
  ArchitectureExplorer,
  type ArchitectureExplorerProps,
} from "./ArchitectureExplorer";
import {
  DecisionLedger,
  type ProjectDecision,
} from "./DecisionLedger";
import {
  OutcomeSummary,
  type ProjectOutcome,
} from "./OutcomeSummary";
import {
  ProjectActions,
  type ProjectAction,
} from "./ProjectActions";

export type ProjectRegisterData = {
  index: string;
  domain: string;
  role: string;
  status?: string;
  year?: string;
};

export type ProjectTechnology = {
  id: string;
  label: string;
  responsibility?: string;
};

export type ProjectCaseStudyData = {
  id: string;
  register: ProjectRegisterData;
  title: string;
  premise: string;
  architecture: ArchitectureExplorerProps["architecture"];
  layers: ArchitectureExplorerProps["layers"];
  decisions: readonly ProjectDecision[];
  technologies?: readonly ProjectTechnology[];
  outcome: ProjectOutcome;
  actions?: readonly ProjectAction[];
};

export type ProjectCaseStudyProps = {
  project: ProjectCaseStudyData;
  className?: string;
  variant?: "default" | "showcase";
  overrideIndex?: string;
};

function ProjectRegister({
  register,
  overrideIndex,
}: {
  register: ProjectRegisterData;
  overrideIndex?: string;
}) {
  const entries = [
    { label: "Domain", value: register.domain },
    { label: "Role", value: register.role },
    ...(register.year ? [{ label: "Year", value: register.year }] : []),
    ...(register.status ? [{ label: "Status", value: register.status }] : []),
  ];

  return (
    <div
      className="flex flex-col gap-4 border-b border-white/[0.08] pb-4 sm:flex-row sm:items-end sm:justify-between"
      data-project-reveal
    >
      <p className="font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-[#ccff00]">
        {overrideIndex ?? register.index}
      </p>
      <dl className="flex max-w-full snap-x gap-7 overflow-x-auto overscroll-x-contain [scrollbar-color:rgba(204,255,0,0.24)_transparent] [scrollbar-width:thin]">
        {entries.map((entry) => (
          <div key={entry.label} className="min-w-max snap-start">
            <dt className="font-mono text-[0.5625rem] uppercase tracking-[0.16em] text-white/26">
              {entry.label}
            </dt>
            <dd className="mt-1.5 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-white/62">
              {entry.value}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

function TechnologyInventory({
  technologies,
}: {
  technologies: readonly ProjectTechnology[];
}) {
  if (technologies.length === 0) return null;

  return (
    <section
      className="border-y border-white/[0.08]"
      aria-label="Technology responsibilities"
      data-project-reveal
    >
      <ul className="flex snap-x overflow-x-auto overscroll-x-contain [scrollbar-color:rgba(204,255,0,0.24)_transparent] [scrollbar-width:thin]">
        {technologies.map((technology) => (
          <li
            key={technology.id}
            className="group min-w-max snap-start border-r border-white/[0.08] px-4 py-4 sm:px-5"
          >
            <p className="font-mono text-[0.625rem] uppercase tracking-[0.17em] text-white/72 transition-colors duration-200 group-hover:text-[#ccff00]">
              {technology.label}
            </p>
            {technology.responsibility ? (
              <p className="mt-2 max-w-64 text-xs leading-5 text-white/34 transition-colors duration-200 group-hover:text-white/58">
                {technology.responsibility}
              </p>
            ) : null}
          </li>
        ))}
      </ul>
    </section>
  );
}

export function ProjectCaseStudy({
  project,
  className,
  variant = "default",
  overrideIndex,
}: ProjectCaseStudyProps) {
  const articleRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [activeDecision, setActiveDecision] =
    useState<ProjectDecision | null>(null);
  const { scrollYProgress } = useScroll({
    target: articleRef,
    offset: ["start end", "end start"],
  });
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    mass: 0.3,
  });
  const headingId = `project-${project.id}-heading`;
  const highlightedNodeIds = useMemo(
    () => activeDecision?.relatedNodeIds ?? [],
    [activeDecision],
  );

  if (variant === "showcase") {
    return (
      <article
        ref={articleRef}
        id={`project-${project.id}`}
        className={cn(
          "relative flex flex-col justify-start gap-4 sm:gap-6 border border-white/[0.08] bg-[#070707]/90 p-5 sm:p-7 lg:p-8",
          "w-full min-w-0 select-text transition-colors duration-300",
          className,
        )}
        aria-labelledby={headingId}
        data-project-case
      >
        <div
          className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-[#ccff00]/60 via-white/20 to-transparent"
          aria-hidden="true"
        />

        <ProjectRegister register={project.register} overrideIndex={overrideIndex} />

        <header className="grid gap-3 py-3 sm:py-5 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,0.7fr)] lg:items-end lg:gap-8">
          <h3
            id={headingId}
            className="text-2xl font-medium leading-[1.08] tracking-[-0.04em] text-white sm:text-3xl lg:text-[2.25rem]"
            data-project-title
            data-project-reveal
          >
            {project.title}
          </h3>
          <p
            className="text-sm leading-relaxed text-[#a1a1aa] sm:text-base"
            data-project-reveal
          >
            {project.premise}
          </p>
        </header>

        <div className="grid gap-6 lg:grid-cols-12 lg:gap-8 lg:items-start">
          <div className="flex flex-col gap-5 lg:col-span-7 min-w-0">
            <ArchitectureExplorer
              architecture={project.architecture}
              layers={project.layers}
              highlightedNodeIds={highlightedNodeIds}
              preferredLayerId={activeDecision?.layerId}
            />

            <TechnologyInventory technologies={project.technologies ?? []} />
          </div>

          <div className="flex flex-col gap-5 lg:col-span-5 min-w-0">
            <div className="border border-white/[0.08] bg-white/[0.015] p-3.5 sm:p-4 max-h-[340px] overflow-y-auto overscroll-contain [scrollbar-color:rgba(204,255,0,0.24)_transparent] [scrollbar-width:thin]">
              <DecisionLedger
                decisions={project.decisions}
                activeDecisionId={activeDecision?.id ?? null}
                onActivate={setActiveDecision}
              />
            </div>

            <OutcomeSummary outcome={project.outcome} />
            <ProjectActions actions={project.actions ?? []} />
          </div>
        </div>
      </article>
    );
  }

  return (
    <article
      ref={articleRef}
      id={`project-${project.id}`}
      className={cn(
        "relative scroll-mt-20 border-t border-white/[0.1] py-16 sm:py-24 lg:py-32",
        className,
      )}
      aria-labelledby={headingId}
      data-project-case
    >
      <motion.div
        className="absolute inset-x-0 top-0 h-px origin-left bg-[#ccff00]"
        style={{
          scaleX: prefersReducedMotion ? 1 : smoothProgress,
        }}
        aria-hidden="true"
      />

      <ProjectRegister register={project.register} />

      <header className="grid gap-8 py-10 sm:py-14 lg:grid-cols-[minmax(0,1.25fr)_minmax(20rem,0.75fr)] lg:items-end lg:gap-16 lg:py-20">
        <h3
          id={headingId}
          className="max-w-[13ch] text-[clamp(2.7rem,6.5vw,6rem)] font-medium leading-[0.92] tracking-[-0.055em] text-white"
          data-project-title
          data-project-reveal
        >
          {project.title}
        </h3>
        <p
          className="max-w-2xl text-[1.0625rem] leading-[1.65] tracking-[-0.012em] text-[#a1a1aa] sm:text-lg"
          data-project-reveal
        >
          {project.premise}
        </p>
      </header>

      <ArchitectureExplorer
        architecture={project.architecture}
        layers={project.layers}
        highlightedNodeIds={highlightedNodeIds}
        preferredLayerId={activeDecision?.layerId}
      />

      <TechnologyInventory technologies={project.technologies ?? []} />

      <div className="grid gap-10 pt-12 sm:pt-16 lg:grid-cols-[minmax(0,1.35fr)_minmax(19rem,0.65fr)] lg:gap-16 lg:pt-20">
        <DecisionLedger
          decisions={project.decisions}
          activeDecisionId={activeDecision?.id ?? null}
          onActivate={setActiveDecision}
        />

        <div className="flex flex-col gap-6 lg:pt-4">
          <OutcomeSummary outcome={project.outcome} />
          <ProjectActions actions={project.actions ?? []} />
        </div>
      </div>
    </article>
  );
}
