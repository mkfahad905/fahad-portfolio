import { cn } from "@/lib/utils";

export type ProjectsIntroductionProps = {
  eyebrow: string;
  title: string;
  description: string;
  sequenceLabel?: string;
  className?: string;
};

export function ProjectsIntroduction({
  eyebrow,
  title,
  description,
  sequenceLabel = "Context / Constraint / System / Result",
  className,
}: ProjectsIntroductionProps) {
  return (
    <header
      className={cn(
        "grid gap-10 border-y border-white/[0.08] py-10 sm:py-14 lg:grid-cols-[minmax(0,1.35fr)_minmax(18rem,0.65fr)] lg:gap-16 lg:py-20",
        className,
      )}
      data-project-intro
    >
      <div className="min-w-0">
        <p className="font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-[#ccff00]">
          {eyebrow}
        </p>
        <h2
          id="featured-projects-heading"
          className="mt-6 max-w-[12ch] text-[clamp(3rem,7vw,6.5rem)] font-medium leading-[0.9] tracking-[-0.055em] text-white"
          data-project-intro-title
        >
          {title}
        </h2>
      </div>

      <div className="flex min-w-0 flex-col justify-end lg:border-l lg:border-white/[0.08] lg:pl-8">
        <p className="max-w-xl text-[1.0625rem] leading-[1.65] tracking-[-0.012em] text-[#a1a1aa] sm:text-lg">
          {description}
        </p>
        <p className="mt-8 font-mono text-[0.625rem] uppercase tracking-[0.18em] text-white/32">
          {sequenceLabel}
        </p>
      </div>
    </header>
  );
}
