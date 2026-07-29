import { cn } from "@/lib/utils";

export type ProjectOutcome = {
  eyebrow: string;
  title: string;
  description?: string;
  highlights?: readonly string[];
};

export type OutcomeSummaryProps = {
  outcome: ProjectOutcome;
  className?: string;
};

export function OutcomeSummary({
  outcome,
  className,
}: OutcomeSummaryProps) {
  return (
    <section
      className={cn(
        "border border-white/[0.08] bg-white/[0.025] p-5 sm:p-6 lg:p-8",
        className,
      )}
      aria-label="Project outcome"
      data-project-reveal
    >
      <p className="font-mono text-[0.625rem] uppercase tracking-[0.2em] text-[#ccff00]">
        {outcome.eyebrow}
      </p>
      <h4 className="mt-5 max-w-[22ch] text-[clamp(1.6rem,3vw,2.5rem)] font-medium leading-[1.05] tracking-[-0.035em] text-white">
        {outcome.title}
      </h4>
      {outcome.description ? (
        <p className="mt-5 max-w-xl text-[0.9375rem] leading-7 text-[#a1a1aa]">
          {outcome.description}
        </p>
      ) : null}

      {outcome.highlights && outcome.highlights.length > 0 ? (
        <ul className="mt-7 divide-y divide-white/[0.08] border-y border-white/[0.08]">
          {outcome.highlights.map((highlight, index) => (
            <li
              key={`${index}-${highlight.slice(0, 24)}`}
              className="grid grid-cols-[2.25rem_1fr] gap-3 py-3 text-sm leading-6 text-white/68"
            >
              <span
                className="font-mono text-[0.5625rem] tracking-[0.16em] text-[#7c3aed]"
                aria-hidden="true"
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              {highlight}
            </li>
          ))}
        </ul>
      ) : null}
    </section>
  );
}
