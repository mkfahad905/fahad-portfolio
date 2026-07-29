"use client";

import { memo, useMemo, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export type AboutMetric = {
  id: string;
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  locale?: string;
  padLength?: number;
  bracketed?: boolean;
  duration?: number;
};

export type DataCounterProps = {
  metric: AboutMetric;
  className?: string;
};

type CounterFormatOptions = Pick<
  AboutMetric,
  | "locale"
  | "decimals"
  | "prefix"
  | "suffix"
  | "padLength"
  | "bracketed"
>;

function createFormatter(metric: CounterFormatOptions) {
  const {
    locale = "en-US",
    decimals = 0,
    prefix = "",
    suffix = "",
    padLength = 3,
    bracketed = true,
  } = metric;
  const formatter = new Intl.NumberFormat(locale, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return (value: number) => {
    const parts = formatter.formatToParts(value);
    const integerDigitCount = parts
      .filter((part) => part.type === "integer")
      .reduce((total, part) => total + part.value.length, 0);
    const zeroPadding = "0".repeat(
      Math.max(0, padLength - integerDigitCount),
    );
    const firstIntegerIndex = parts.findIndex(
      (part) => part.type === "integer",
    );
    const padded = parts
      .map((part, index) =>
        index === firstIntegerIndex
          ? `${zeroPadding}${part.value}`
          : part.value,
      )
      .join("");
    const decorated = `${prefix}${padded}${suffix}`;

    return bracketed ? `[ ${decorated} ]` : decorated;
  };
}

export const DataCounter = memo(function DataCounter({
  metric,
  className,
}: DataCounterProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const valueRef = useRef<HTMLSpanElement>(null);
  const liveRegionRef = useRef<HTMLSpanElement>(null);
  const {
    value,
    label,
    duration,
    locale,
    decimals,
    prefix,
    suffix,
    padLength,
    bracketed,
  } = metric;
  const formatValue = useMemo(
    () =>
      createFormatter({
        locale,
        decimals,
        prefix,
        suffix,
        padLength,
        bracketed,
      }),
    [locale, decimals, prefix, suffix, padLength, bracketed],
  );
  const finalValue = formatValue(value);
  const initialValue = formatValue(0);

  const renderValue = (value: number) => {
    if (valueRef.current) {
      valueRef.current.textContent = formatValue(value);
    }
  };

  const announceFinalValue = () => {
    if (liveRegionRef.current) {
      liveRegionRef.current.textContent = `${label}: ${finalValue}`;
    }
  };

  useGSAP(
    () => {
      const media = gsap.matchMedia();

      media.add("(prefers-reduced-motion: no-preference)", () => {
        const state = { value: 0 };
        renderValue(0);

        gsap.to(state, {
          value,
          duration: duration ?? 1.05,
          ease: "expo.out",
          onUpdate: () => renderValue(state.value),
          onComplete: () => {
            renderValue(value);
            announceFinalValue();
          },
          scrollTrigger: {
            trigger: rootRef.current,
            start: "center center",
            once: true,
          },
        });
      });

      media.add("(prefers-reduced-motion: reduce)", () => {
        renderValue(value);
        announceFinalValue();
      });

      return () => media.revert();
    },
    {
      scope: rootRef,
      dependencies: [
        value,
        prefix,
        suffix,
        decimals,
        locale,
        padLength,
        bracketed,
        duration,
        label,
      ],
      revertOnUpdate: true,
    },
  );

  return (
    <div ref={rootRef} className={className}>
      <p className="font-mono text-[0.6875rem] font-medium uppercase tracking-[0.2em] text-[#ccff00]">
        {label}
      </p>
      <p className="mt-5 font-mono text-[clamp(1.7rem,3vw,2.6rem)] leading-none tracking-[-0.07em] text-white">
        <span ref={valueRef} aria-hidden="true">
          {initialValue}
        </span>
      </p>
      <span
        ref={liveRegionRef}
        className="sr-only"
        aria-live="polite"
        aria-atomic="true"
      />
    </div>
  );
});
