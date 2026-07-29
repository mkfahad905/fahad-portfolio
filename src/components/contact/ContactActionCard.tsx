"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ContactChannel } from "@/config/contact";

type ContactActionCardProps = {
  channel: ContactChannel;
  index: number;
};

export function ContactActionCard({
  channel,
  index,
}: ContactActionCardProps) {
  const shouldReduceMotion = useReducedMotion();
  const position = String(index + 1).padStart(2, "0");
  const externalLabel = channel.external ? " (opens in a new tab)" : "";

  return (
    <motion.a
      href={channel.href}
      target={channel.external ? "_blank" : undefined}
      rel={channel.external ? "noreferrer" : undefined}
      className="group relative flex min-h-64 flex-col justify-between overflow-hidden border-b border-white/[0.1] px-1 py-7 outline-none transition-colors duration-300 hover:bg-white/[0.025] focus-visible:bg-white/[0.025] focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-[#ccff00] sm:min-h-72 sm:px-6 sm:py-8 lg:border-b-0 lg:border-r lg:border-white/[0.1] lg:last:border-r-0"
      aria-label={`${channel.label}: ${channel.action}${externalLabel}`}
      data-contact-card
      whileHover={shouldReduceMotion ? undefined : { y: -3 }}
      whileFocus={shouldReduceMotion ? undefined : { y: -3 }}
      transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="flex items-start justify-between gap-5">
        <span className="font-mono text-[0.625rem] uppercase tracking-[0.2em] text-white/38">
          Channel / {position}
        </span>
        <span
          className="text-base text-[#ccff00] transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-focus-visible:translate-x-0.5 group-focus-visible:-translate-y-0.5"
          aria-hidden="true"
        >
          ↗
        </span>
      </div>

      <div>
        <h3 className="text-[clamp(1.75rem,3vw,2.5rem)] font-medium tracking-[-0.04em] text-white">
          {channel.label}
        </h3>
        <p className="mt-3 max-w-xs text-sm leading-6 text-[#a1a1aa]">
          {channel.description}
        </p>
        <p className="mt-7 font-mono text-[0.625rem] uppercase tracking-[0.18em] text-white/58 transition-colors duration-300 group-hover:text-[#ccff00] group-focus-visible:text-[#ccff00]">
          {channel.action}
        </p>
      </div>

      <span
        className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-[#ccff00] transition-transform duration-300 ease-out group-hover:scale-x-100 group-focus-visible:scale-x-100"
        aria-hidden="true"
      />
    </motion.a>
  );
}

