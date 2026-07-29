import { cn } from "@/lib/utils";
import {
  ExperienceCard,
  type ExperienceEntry,
} from "./ExperienceCard";

export type ExperienceTimelineProps = {
  experiences: readonly ExperienceEntry[];
  className?: string;
};

export function ExperienceTimeline({
  experiences,
  className,
}: ExperienceTimelineProps) {
  if (experiences.length === 0) return null;

  return (
    <div className={cn("relative", className)}>
      <span
        className="absolute inset-y-0 left-6 w-px origin-top bg-white/[0.12] lg:left-1/2"
        data-experience-line
        aria-hidden="true"
      />

      <ol className="relative">
        {experiences.map((experience, index) => {
          const cardOnLeft = index % 2 === 0;

          return (
            <li
              key={experience.id}
              className="relative grid grid-cols-[3rem_minmax(0,1fr)] gap-4 py-8 sm:gap-6 sm:py-10 lg:grid-cols-[minmax(0,1fr)_5rem_minmax(0,1fr)] lg:gap-8 lg:py-14"
              data-experience-entry
            >
              <div className="relative col-start-1 row-start-1 flex justify-center lg:col-start-2">
                <span
                  className="relative z-10 mt-6 flex h-5 w-5 items-center justify-center border border-[#ccff00]/55 bg-[#050505]"
                  data-experience-marker
                  aria-hidden="true"
                >
                  <span className="h-1.5 w-1.5 bg-[#ccff00]" />
                </span>
              </div>

              <div
                className={cn(
                  "col-start-2 row-start-1 min-w-0 lg:col-span-1",
                  cardOnLeft
                    ? "lg:col-start-1"
                    : "lg:col-start-3",
                )}
              >
                <ExperienceCard experience={experience} />
              </div>

              <div
                className={cn(
                  "hidden self-start pt-6 lg:block",
                  cardOnLeft
                    ? "lg:col-start-3"
                    : "lg:col-start-1 lg:text-right",
                )}
                aria-hidden="true"
              >
                <p className="font-mono text-[0.625rem] uppercase tracking-[0.18em] text-[#ccff00]">
                  {experience.duration}
                </p>
                <p className="mt-3 text-sm text-white/34">
                  {experience.company}
                </p>
                <p className="mt-1 font-mono text-[0.5625rem] uppercase tracking-[0.15em] text-white/22">
                  Entry / {String(index + 1).padStart(2, "0")}
                </p>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
