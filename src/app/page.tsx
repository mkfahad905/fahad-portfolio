import { About, type AboutProps } from "@/sections/About";
import {
  FeaturedProjects,
  type FeaturedProjectsProps,
} from "@/sections/FeaturedProjects";
import { Hero } from "@/sections/Hero";

const aboutProps = {
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
      "I build multi-part systems around one governing principle: state, performance, and logic should remain coherent from the initial API request to the final rendered frame.",
    paragraphs: [
      "Backend architecture establishes the contract. Cloud infrastructure protects its reliability. The interface makes the same system legible without weakening the underlying logic.",
      "Every layer is treated as part of a single narrative—measured, observable, and designed to preserve intent as data moves through the stack.",
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
  specsAriaLabel: "System specifications",
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

const projectLayers = [
  {
    id: "request",
    label: "Request",
    description: "Follow the request from entry to response.",
  },
  {
    id: "data",
    label: "Data",
    description: "Inspect state ownership and data movement.",
  },
  {
    id: "infrastructure",
    label: "Infrastructure",
    description: "Review service and deployment boundaries.",
  },
  {
    id: "observability",
    label: "Observability",
    description: "Expose telemetry and operational feedback.",
  },
] as const;

const featuredProjectsProps = {
  introduction: {
    eyebrow: "02 / Featured projects",
    title: "Systems under review.",
    description:
      "Selected engineering work presented through constraints, architecture, system behavior, and verified outcomes—not surface-level screenshots.",
  },
  projects: [
    {
      id: "case-study-01",
      register: {
        index: "Case study / 01",
        domain: "Project domain",
        role: "Engineering role",
        status: "Content placeholder",
      },
      title: "Project case study 01.",
      premise:
        "Replace this premise with the real system problem, the operating context, and the architectural responsibility owned within the project.",
      layers: projectLayers,
      architecture: {
        description:
          "Placeholder system flow from client entry through application services, state, delivery, and operational telemetry.",
        viewBox: {
          width: 960,
          height: 560,
        },
        nodes: [
          {
            id: "case-01-client",
            label: "Client entry",
            responsibility:
              "Replace with the real client, consumer, or upstream system.",
            kind: "client",
            position: { x: 38, y: 218, width: 148, height: 76 },
            layerIds: ["request", "infrastructure"],
            protocol: "Request",
            mobileOrder: 1,
          },
          {
            id: "case-01-boundary",
            label: "System boundary",
            responsibility:
              "Replace with the real authentication, gateway, or validation boundary.",
            kind: "boundary",
            position: { x: 242, y: 218, width: 154, height: 76 },
            layerIds: ["request", "infrastructure"],
            protocol: "Validate",
            boundary: "Trust boundary",
            mobileOrder: 2,
          },
          {
            id: "case-01-service",
            label: "Application service",
            responsibility:
              "Replace with the primary service responsibility and execution contract.",
            kind: "service",
            position: { x: 462, y: 122, width: 164, height: 76 },
            layerPositions: {
              data: { x: 436, y: 124, width: 164, height: 76 },
              observability: { x: 430, y: 92, width: 164, height: 76 },
            },
            protocol: "Execute",
            mobileOrder: 3,
          },
          {
            id: "case-01-queue",
            label: "Event boundary",
            responsibility:
              "Replace with the asynchronous work or domain-event boundary.",
            kind: "queue",
            position: { x: 462, y: 318, width: 164, height: 76 },
            layerIds: ["request", "data", "infrastructure"],
            protocol: "Dispatch",
            mobileOrder: 4,
          },
          {
            id: "case-01-store",
            label: "Primary state",
            responsibility:
              "Replace with the authoritative data store and its consistency model.",
            kind: "datastore",
            position: { x: 716, y: 318, width: 168, height: 76 },
            layerPositions: {
              data: { x: 702, y: 218, width: 168, height: 76 },
            },
            layerIds: ["request", "data", "infrastructure"],
            protocol: "Persist",
            boundary: "State ownership",
            mobileOrder: 5,
          },
          {
            id: "case-01-delivery",
            label: "Delivery layer",
            responsibility:
              "Replace with the rendered output, downstream delivery, or response surface.",
            kind: "external",
            position: { x: 716, y: 122, width: 168, height: 76 },
            layerIds: ["request", "infrastructure"],
            protocol: "Respond",
            mobileOrder: 6,
          },
          {
            id: "case-01-observe",
            label: "Operational telemetry",
            responsibility:
              "Replace with the real logging, tracing, metrics, and alerting strategy.",
            kind: "observability",
            position: { x: 462, y: 454, width: 182, height: 70 },
            layerPositions: {
              observability: { x: 688, y: 218, width: 182, height: 70 },
            },
            layerIds: ["infrastructure", "observability"],
            protocol: "Observe",
            mobileOrder: 7,
          },
        ],
        edges: [
          {
            id: "case-01-entry",
            source: "case-01-client",
            target: "case-01-boundary",
            layerIds: ["request", "infrastructure"],
            traceOrder: 0,
          },
          {
            id: "case-01-execute",
            source: "case-01-boundary",
            target: "case-01-service",
            layerIds: ["request", "infrastructure"],
            traceOrder: 1,
          },
          {
            id: "case-01-dispatch",
            source: "case-01-service",
            target: "case-01-queue",
            layerIds: ["request", "data", "infrastructure"],
            traceOrder: 2,
            emphasis: "decision",
          },
          {
            id: "case-01-persist",
            source: "case-01-queue",
            target: "case-01-store",
            layerIds: ["request", "data", "infrastructure"],
            traceOrder: 3,
          },
          {
            id: "case-01-response",
            source: "case-01-service",
            target: "case-01-delivery",
            layerIds: ["request", "infrastructure"],
            traceOrder: 2,
          },
          {
            id: "case-01-telemetry-service",
            source: "case-01-service",
            target: "case-01-observe",
            layerIds: ["infrastructure", "observability"],
            emphasis: "external",
          },
          {
            id: "case-01-telemetry-state",
            source: "case-01-store",
            target: "case-01-observe",
            layerIds: ["infrastructure", "observability"],
            emphasis: "external",
          },
        ],
      },
      decisions: [
        {
          id: "case-01-decision-01",
          label: "Primary architectural decision",
          constraint:
            "Replace with the verified technical, operational, or product constraint.",
          decision:
            "Document the selected architecture and why it was appropriate.",
          result:
            "Add the observed result without inventing performance claims.",
          relatedNodeIds: [
            "case-01-service",
            "case-01-queue",
            "case-01-store",
          ],
          layerId: "data",
        },
        {
          id: "case-01-decision-02",
          label: "Operational decision",
          constraint:
            "Replace with the reliability or observability requirement.",
          decision:
            "Describe the real monitoring, recovery, and ownership model.",
          result:
            "Record only outcomes supported by project evidence.",
          relatedNodeIds: ["case-01-service", "case-01-observe"],
          layerId: "observability",
        },
      ],
      technologies: [
        {
          id: "case-01-runtime",
          label: "Runtime",
          responsibility: "Replace with the production runtime and its role.",
        },
        {
          id: "case-01-state",
          label: "Data layer",
          responsibility: "Replace with the authoritative state technology.",
        },
        {
          id: "case-01-events",
          label: "Event system",
          responsibility: "Replace with the actual asynchronous boundary.",
        },
        {
          id: "case-01-observability",
          label: "Observability",
          responsibility: "Replace with the operational toolchain.",
        },
      ],
      outcome: {
        eyebrow: "Verified outcome",
        title: "Add the validated project outcome.",
        description:
          "Replace this placeholder with evidence from the real system. Avoid unsupported scale, latency, uptime, or business metrics.",
        highlights: [
          "Document the architectural capability that was delivered.",
          "Document the verified operational or user-facing improvement.",
        ],
      },
      actions: [],
    },
    {
      id: "case-study-02",
      register: {
        index: "Case study / 02",
        domain: "Project domain",
        role: "Engineering role",
        status: "Content placeholder",
      },
      title: "Project case study 02.",
      premise:
        "Replace this premise with a second project narrative focused on a materially different system, constraint set, and engineering contribution.",
      layers: projectLayers,
      architecture: {
        description:
          "Placeholder fan-out architecture connecting an entry boundary to parallel services, shared state, delivery, and observability.",
        viewBox: {
          width: 960,
          height: 560,
        },
        nodes: [
          {
            id: "case-02-entry",
            label: "Ingress",
            responsibility:
              "Replace with the actual request, event, or workload source.",
            kind: "client",
            position: { x: 46, y: 218, width: 144, height: 76 },
            protocol: "Ingress",
            mobileOrder: 1,
          },
          {
            id: "case-02-router",
            label: "Routing boundary",
            responsibility:
              "Replace with the real routing, policy, or orchestration responsibility.",
            kind: "boundary",
            position: { x: 244, y: 218, width: 160, height: 76 },
            protocol: "Route",
            boundary: "Policy boundary",
            mobileOrder: 2,
          },
          {
            id: "case-02-service-a",
            label: "Domain service A",
            responsibility:
              "Replace with the first independently owned domain capability.",
            kind: "service",
            position: { x: 468, y: 102, width: 166, height: 76 },
            layerIds: ["request", "data", "infrastructure"],
            protocol: "Process",
            mobileOrder: 3,
          },
          {
            id: "case-02-service-b",
            label: "Domain service B",
            responsibility:
              "Replace with the second independently owned domain capability.",
            kind: "service",
            position: { x: 468, y: 332, width: 166, height: 76 },
            layerIds: ["request", "data", "infrastructure"],
            protocol: "Process",
            mobileOrder: 4,
          },
          {
            id: "case-02-state",
            label: "Shared state boundary",
            responsibility:
              "Replace with the actual ownership, synchronization, or consistency model.",
            kind: "datastore",
            position: { x: 740, y: 218, width: 174, height: 76 },
            layerPositions: {
              data: { x: 714, y: 218, width: 174, height: 76 },
            },
            layerIds: ["request", "data", "infrastructure"],
            protocol: "Coordinate",
            boundary: "Consistency boundary",
            mobileOrder: 5,
          },
          {
            id: "case-02-output",
            label: "Delivery target",
            responsibility:
              "Replace with the actual downstream consumer or delivery surface.",
            kind: "external",
            position: { x: 740, y: 76, width: 174, height: 76 },
            layerIds: ["request", "infrastructure"],
            protocol: "Deliver",
            mobileOrder: 6,
          },
          {
            id: "case-02-observe",
            label: "Feedback loop",
            responsibility:
              "Replace with the real traces, metrics, audit events, and alert routes.",
            kind: "observability",
            position: { x: 740, y: 394, width: 174, height: 76 },
            layerPositions: {
              observability: { x: 710, y: 218, width: 174, height: 76 },
            },
            layerIds: ["infrastructure", "observability"],
            protocol: "Evaluate",
            mobileOrder: 7,
          },
        ],
        edges: [
          {
            id: "case-02-ingress",
            source: "case-02-entry",
            target: "case-02-router",
            layerIds: ["request", "infrastructure"],
            traceOrder: 0,
          },
          {
            id: "case-02-route-a",
            source: "case-02-router",
            target: "case-02-service-a",
            layerIds: ["request", "infrastructure"],
            traceOrder: 1,
          },
          {
            id: "case-02-route-b",
            source: "case-02-router",
            target: "case-02-service-b",
            layerIds: ["request", "infrastructure"],
            traceOrder: 1,
          },
          {
            id: "case-02-state-a",
            source: "case-02-service-a",
            target: "case-02-state",
            layerIds: ["request", "data", "infrastructure"],
            traceOrder: 2,
            emphasis: "decision",
          },
          {
            id: "case-02-state-b",
            source: "case-02-service-b",
            target: "case-02-state",
            layerIds: ["request", "data", "infrastructure"],
            traceOrder: 2,
            emphasis: "decision",
          },
          {
            id: "case-02-delivery",
            source: "case-02-state",
            target: "case-02-output",
            layerIds: ["request", "infrastructure"],
            traceOrder: 3,
          },
          {
            id: "case-02-feedback",
            source: "case-02-state",
            target: "case-02-observe",
            layerIds: ["infrastructure", "observability"],
            emphasis: "external",
          },
        ],
      },
      decisions: [
        {
          id: "case-02-decision-01",
          label: "Domain boundary decision",
          constraint:
            "Replace with the verified coupling, ownership, or delivery constraint.",
          decision:
            "Explain the selected service boundary and its tradeoffs.",
          result:
            "Record the real effect on system behavior and team ownership.",
          relatedNodeIds: [
            "case-02-router",
            "case-02-service-a",
            "case-02-service-b",
          ],
          layerId: "infrastructure",
        },
        {
          id: "case-02-decision-02",
          label: "State coordination decision",
          constraint:
            "Replace with the actual consistency and failure-mode requirement.",
          decision:
            "Document how state changes are coordinated and recovered.",
          result:
            "Add only evidence supported by the implemented project.",
          relatedNodeIds: [
            "case-02-service-a",
            "case-02-service-b",
            "case-02-state",
          ],
          layerId: "data",
        },
      ],
      technologies: [
        {
          id: "case-02-edge",
          label: "Ingress",
          responsibility: "Replace with the request or workload entry layer.",
        },
        {
          id: "case-02-services",
          label: "Services",
          responsibility: "Replace with the implemented domain services.",
        },
        {
          id: "case-02-storage",
          label: "State",
          responsibility: "Replace with the state and consistency technology.",
        },
        {
          id: "case-02-operations",
          label: "Operations",
          responsibility: "Replace with the deployment and monitoring stack.",
        },
      ],
      outcome: {
        eyebrow: "Verified outcome",
        title: "Add the validated project outcome.",
        description:
          "Replace this placeholder with the real architectural and product result once supporting evidence is available.",
        highlights: [
          "Describe the completed system capability.",
          "Describe the verified operational or delivery improvement.",
        ],
      },
      actions: [],
    },
  ],
} satisfies FeaturedProjectsProps;

export default function Home() {
  return (
    <main>
      <Hero />
      <About {...aboutProps} />
      <FeaturedProjects {...featuredProjectsProps} />
    </main>
  );
}
