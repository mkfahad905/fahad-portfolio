import type { AboutProps } from "@/sections/About";

export const ABOUT_DATA = {
  sidebar: {
    index: "01 / ABOUT",
    label: "System profile",
    status: {
      label: "System status",
      value: "Operational",
      active: true,
    },
    clock: {
      label: "Local time",
      timeZone: "Asia/Kolkata",
      locale: "en-IN",
    },
    telemetry: [
      {
        id: "runtime",
        label: "Runtime",
        value: "Next.js 15.5.22",
      },
      {
        id: "language",
        label: "Language",
        value: "TypeScript / Strict",
      },
      {
        id: "motion",
        label: "Motion",
        value: "GSAP + Framer",
      },
      {
        id: "render",
        label: "Render",
        value: "App Router",
      },
    ],
  },
  editorial: {
    kicker: "[ Engineering philosophy ]",
    title: "Continuity across every layer.",
    introduction:
      "I build full-stack systems where backend logic, APIs, data, and interfaces work as one coherent system—from the initial request to the final rendered experience.",
    paragraphs: [
      "Backend architecture establishes the contract. APIs, data flows, and infrastructure need to remain reliable as the system grows.",
      "The interface is another layer of the same system—translating backend state into clear, responsive experiences without losing the underlying logic.",
    ],
  },
  metrics: [],
  specs: [
    {
      id: "framework",
      label: "Framework",
      value: "Next.js 15 / App Router",
      detail: "Server-first composition with isolated client interactions.",
    },
    {
      id: "language",
      label: "Language",
      value: "TypeScript / Strict",
      detail: "Explicit contracts across component and data boundaries.",
    },
    {
      id: "motion-system",
      label: "Motion system",
      value: "GSAP + Framer Motion",
      detail: "Scoped timelines with motion-safe interaction states.",
    },
    {
      id: "styling",
      label: "Styling",
      value: "Tailwind CSS",
      detail: "Responsive, token-driven interface construction.",
    },
  ],
  specsAriaLabel: "Portfolio system specifications",
  portrait: {
    src: "/continuity-blueprint.svg",
    alt: "Technical blueprint showing a request flowing through state into the rendered frame",
    width: 1200,
    height: 1500,
    caption: "Continuity architecture",
    credit: "System map / 01",
    overlayData: [
      {
        id: "mode",
        label: "Mode",
        value: "Engineering",
      },
      {
        id: "pipeline",
        label: "Pipeline",
        value: "API → State → Frame",
      },
    ],
  },
} satisfies AboutProps;
