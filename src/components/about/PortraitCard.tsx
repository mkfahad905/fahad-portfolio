"use client";

import { useEffect, useRef } from "react";
import Image, { type StaticImageData } from "next/image";
import { useReducedMotion } from "framer-motion";

export type MediaDatum = {
  id: string;
  label: string;
  value: string;
};

export type PortraitCardProps = {
  src: string | StaticImageData;
  alt: string;
  width: number;
  height: number;
  caption?: string;
  credit?: string;
  sizes?: string;
  priority?: boolean;
  objectPosition?: string;
  overlayData?: readonly MediaDatum[];
};

const GLYPHS = "01{}[]<>/\\:;#@$_+-=*";
const DECRYPTION_DURATION = 200;

export function DecryptionMedia({
  src,
  alt,
  width,
  height,
  caption,
  credit,
  sizes = "(min-width: 1024px) 27vw, 100vw",
  priority = false,
  objectPosition = "center",
  overlayData = [],
}: PortraitCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef<number | null>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(
    () => () => {
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
      }
    },
    [],
  );

  const decrypt = () => {
    if (
      prefersReducedMotion ||
      !containerRef.current ||
      !canvasRef.current ||
      frameRef.current !== null
    ) {
      return;
    }

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    if (!context) return;

    const container = containerRef.current;
    const bounds = container.getBoundingClientRect();
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    const monoFont =
      getComputedStyle(container)
        .getPropertyValue("--font-geist-mono")
        .trim() || "monospace";
    canvas.width = Math.round(bounds.width * pixelRatio);
    canvas.height = Math.round(bounds.height * pixelRatio);
    canvas.style.opacity = "1";
    context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

    if (imageRef.current) {
      imageRef.current.style.filter = "grayscale(1) contrast(1.75)";
    }

    const startedAt = performance.now();
    const cellSize = Math.max(10, Math.min(14, bounds.width / 28));

    const drawFrame = (timestamp: number) => {
      const progress = Math.min(
        (timestamp - startedAt) / DECRYPTION_DURATION,
        1,
      );
      const fade = progress < 0.58 ? 1 : 1 - (progress - 0.58) / 0.42;

      context.clearRect(0, 0, bounds.width, bounds.height);
      context.fillStyle = `rgba(5, 5, 5, ${0.92 * fade})`;
      context.fillRect(0, 0, bounds.width, bounds.height);
      context.font = `${cellSize}px ${monoFont}`;
      context.textBaseline = "top";

      for (let y = 0; y < bounds.height; y += cellSize * 1.15) {
        for (let x = 0; x < bounds.width; x += cellSize * 0.78) {
          if (Math.random() < progress * 0.72) continue;

          const glyph = GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          const accent = Math.random();
          context.fillStyle =
            accent > 0.92
              ? `rgba(204, 255, 0, ${fade})`
              : accent > 0.84
                ? `rgba(124, 58, 237, ${fade})`
                : `rgba(225, 225, 225, ${0.52 * fade})`;
          context.fillText(glyph, x, y);
        }
      }

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(drawFrame);
        return;
      }

      canvas.style.opacity = "0";
      if (imageRef.current) {
        imageRef.current.style.removeProperty("filter");
      }
      frameRef.current = null;
    };

    frameRef.current = requestAnimationFrame(drawFrame);
  };

  return (
    <figure className="min-w-0" data-about-reveal>
      <div
        ref={containerRef}
        className="group relative overflow-hidden bg-[#050505]"
        style={{ aspectRatio: `${width} / ${height}` }}
        onPointerEnter={(event) => {
          if (event.pointerType === "mouse") decrypt();
        }}
      >
        <Image
          ref={imageRef}
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover grayscale transition-[filter,transform] duration-500 ease-out group-hover:scale-[1.012]"
          style={{ objectPosition }}
        />

        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#050505]/85 via-transparent to-[#050505]/10"
          aria-hidden="true"
        />

        <canvas
          ref={canvasRef}
          className="pointer-events-none absolute inset-0 h-full w-full opacity-0"
          aria-hidden="true"
        />

        {overlayData.length > 0 ? (
          <dl className="absolute inset-x-0 bottom-0 z-10 grid grid-cols-2 border-t border-white/[0.08] bg-[#050505]/75 backdrop-blur-md">
            {overlayData.map((datum) => (
              <div
                key={datum.id}
                className="border-r border-white/[0.08] px-4 py-3 even:border-r-0"
              >
                <dt className="font-mono text-[0.55rem] uppercase tracking-[0.18em] text-white/35">
                  {datum.label}
                </dt>
                <dd className="mt-1 font-mono text-[0.625rem] uppercase tracking-[0.12em] text-[#ccff00]">
                  {datum.value}
                </dd>
              </div>
            ))}
          </dl>
        ) : null}

        <span
          className="pointer-events-none absolute left-3 top-3 h-5 w-5 border-l border-t border-[#ccff00]/75"
          aria-hidden="true"
        />
        <span
          className="pointer-events-none absolute right-3 top-3 h-5 w-5 border-r border-t border-[#ccff00]/75"
          aria-hidden="true"
        />
      </div>

      {caption || credit ? (
        <figcaption className="flex items-start justify-between gap-5 border-x border-b border-white/[0.08] px-4 py-3 font-mono text-[0.625rem] uppercase leading-5 tracking-[0.16em] text-white/38">
          {caption ? <span>{caption}</span> : <span aria-hidden="true" />}
          {credit ? <span className="text-right">{credit}</span> : null}
        </figcaption>
      ) : null}
    </figure>
  );
}

export const PortraitCard = DecryptionMedia;
