"use client";

import { memo, useEffect, useState } from "react";
import {
  DecryptionMedia,
  type PortraitCardProps,
} from "./PortraitCard";

export type SidebarDatum = {
  id: string;
  label: string;
  value: string;
};

export type SidebarStatus = {
  label: string;
  value: string;
  active?: boolean;
};

export type SidebarClock = {
  label: string;
  timeZone: string;
  locale?: string;
};

export type AboutSidebarProps = {
  index: string;
  label: string;
  media: PortraitCardProps;
  telemetry?: readonly SidebarDatum[];
  status?: SidebarStatus;
  clock?: SidebarClock;
  note?: string;
};

const SystemClock = memo(function SystemClock({
  clock,
}: {
  clock: SidebarClock;
}) {
  const [localTime, setLocalTime] = useState("");

  useEffect(() => {
    const formatter = new Intl.DateTimeFormat(clock.locale ?? "en-US", {
      timeZone: clock.timeZone,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
    const updateClock = () => setLocalTime(formatter.format(new Date()));

    updateClock();
    const interval = window.setInterval(updateClock, 1000);
    return () => window.clearInterval(interval);
  }, [clock.locale, clock.timeZone]);

  return (
    <div className="px-4 py-4">
      <dt className="font-mono text-[0.5625rem] uppercase tracking-[0.18em] text-white/32">
        {clock.label}
      </dt>
      <dd className="mt-2 font-mono text-[0.625rem] uppercase tracking-[0.15em] text-white/72">
        {localTime}
      </dd>
    </div>
  );
});

export function StickySidebar({
  index,
  label,
  media,
  telemetry = [],
  status,
  clock,
  note,
}: AboutSidebarProps) {
  return (
    <aside
      className="self-start lg:sticky lg:top-24 lg:max-h-[calc(100svh-6rem)] lg:overflow-y-auto lg:overscroll-contain [scrollbar-color:rgba(204,255,0,0.28)_transparent] [scrollbar-width:thin]"
      aria-label={`${label} system panel`}
    >
      <header
        className="flex items-center justify-between gap-5 border-b border-white/[0.08] px-4 py-4 sm:px-5"
        data-about-reveal
      >
        <p className="font-mono text-[0.6875rem] uppercase tracking-[0.2em] text-[#ccff00]">
          {index}
        </p>
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-white/72">
          {label}
        </p>
      </header>

      <div className="p-4 sm:p-5" data-about-reveal>
        <DecryptionMedia {...media} />
      </div>

      {status || clock ? (
        <dl
          className={`grid border-y border-white/[0.08] ${
            status && clock ? "grid-cols-2" : "grid-cols-1"
          }`}
          data-about-reveal
        >
          {status ? (
            <div
              className={`px-4 py-4 ${
                clock ? "border-r border-white/[0.08]" : ""
              }`}
            >
              <dt className="font-mono text-[0.5625rem] uppercase tracking-[0.18em] text-white/32">
                {status.label}
              </dt>
              <dd className="mt-2 flex items-center gap-2 font-mono text-[0.625rem] uppercase tracking-[0.15em] text-white/72">
                <span
                  className={`h-1.5 w-1.5 rounded-full ${
                    status.active
                      ? "bg-[#ccff00] shadow-[0_0_12px_rgba(204,255,0,0.55)]"
                      : "bg-white/28"
                  }`}
                  aria-hidden="true"
                />
                {status.value}
              </dd>
            </div>
          ) : null}

          {clock ? <SystemClock clock={clock} /> : null}
        </dl>
      ) : null}

      {telemetry.length > 0 ? (
        <dl
          className="flex snap-x snap-mandatory overflow-x-auto overscroll-x-contain [scrollbar-color:rgba(204,255,0,0.28)_transparent] [scrollbar-width:thin] lg:grid lg:grid-cols-2 lg:overflow-visible"
          data-about-reveal
        >
          {telemetry.map((datum) => (
            <div
              key={datum.id}
              className="min-w-48 snap-start border-b border-r border-white/[0.08] px-4 py-4 lg:min-w-0"
            >
              <dt className="font-mono text-[0.5625rem] uppercase tracking-[0.18em] text-white/32">
                {datum.label}
              </dt>
              <dd className="mt-2 font-mono text-[0.625rem] uppercase leading-5 tracking-[0.13em] text-[#ccff00]">
                {datum.value}
              </dd>
            </div>
          ))}
        </dl>
      ) : null}

      {note ? (
        <p
          className="px-4 py-5 text-sm leading-6 text-[#a1a1aa] sm:px-5"
          data-about-reveal
        >
          {note}
        </p>
      ) : null}
    </aside>
  );
}

export const AboutSidebar = StickySidebar;
