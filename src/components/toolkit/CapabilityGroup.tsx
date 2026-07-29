import { cn } from "@/lib/utils";
import {
  CapabilityCard,
  type Capability,
} from "./CapabilityCard";

export type CapabilityGroupData = {
  id: string;
  label: string;
  description: string;
  capabilities: readonly Capability[];
};

export type CapabilityGroupProps = {
  group: CapabilityGroupData;
  index: number;
  className?: string;
};

export function CapabilityGroup({
  group,
  index,
  className,
}: CapabilityGroupProps) {
  const headingId = `toolkit-group-${group.id}`;

  return (
    <section
      className={cn(
        "border-t border-white/[0.1] py-8 sm:py-10",
        className,
      )}
      aria-labelledby={headingId}
      data-toolkit-group
    >
      <header className="mb-6 grid gap-4 sm:grid-cols-[8rem_1fr] sm:items-start">
        <div>
          <p className="font-mono text-[0.5625rem] uppercase tracking-[0.18em] text-[#7c3aed]">
            Group / {String(index + 1).padStart(2, "0")}
          </p>
          <h3
            id={headingId}
            className="mt-2 text-lg font-medium tracking-[-0.025em] text-white"
          >
            {group.label}
          </h3>
        </div>

        <p className="max-w-xl text-sm leading-6 text-[#a1a1aa]">
          {group.description}
        </p>
      </header>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {group.capabilities.map((capability, capabilityIndex) => (
          <CapabilityCard
            key={capability.id}
            capability={capability}
            index={capabilityIndex}
          />
        ))}
      </div>
    </section>
  );
}
