import { ArrowUpRight, ExternalLink, GitBranch } from "lucide-react";
import { cn } from "@/lib/utils";

export type ProjectAction = {
  id: string;
  label: string;
  href: string;
  kind?: "case-study" | "repository" | "external";
  external?: boolean;
};

export type ProjectActionsProps = {
  actions: readonly ProjectAction[];
  className?: string;
};

const actionIcon = {
  "case-study": ArrowUpRight,
  repository: GitBranch,
  external: ExternalLink,
};

export function ProjectActions({
  actions,
  className,
}: ProjectActionsProps) {
  if (actions.length === 0) return null;

  return (
    <nav
      className={cn("flex flex-wrap gap-3", className)}
      aria-label="Project links"
      data-project-reveal
    >
      {actions.map((action) => {
        const Icon = actionIcon[action.kind ?? "case-study"];
        const external =
          action.external ?? /^https?:\/\//.test(action.href);

        return (
          <a
            key={action.id}
            href={action.href}
            className="group relative inline-flex min-h-12 items-center gap-3 overflow-hidden border border-white/[0.12] bg-[#080808] px-5 font-mono text-[0.625rem] uppercase tracking-[0.17em] text-white/72 outline-none transition-colors duration-200 hover:border-[#ccff00]/55 hover:text-[#ccff00] focus-visible:ring-1 focus-visible:ring-[#ccff00]"
            target={external ? "_blank" : undefined}
            rel={external ? "noreferrer" : undefined}
          >
            <span
              className="absolute inset-y-0 left-0 w-px origin-top scale-y-0 bg-[#ccff00] transition-transform duration-200 group-hover:scale-y-100"
              aria-hidden="true"
            />
            {action.label}
            <Icon
              className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              aria-hidden="true"
            />
            {external ? <span className="sr-only">(opens in a new tab)</span> : null}
          </a>
        );
      })}
    </nav>
  );
}
