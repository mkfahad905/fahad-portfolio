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
        domain: "Enterprise surveillance",
        role: "Backend engineering",
        status: "Production enhancements",
      },
      title: "Enterprise Surveillance Operations Platform.",
      premise:
        "Contributed significant backend and integration work to an existing enterprise platform that manages AI-generated surveillance incidents across cameras and sites, extending its APIs, ticket workflows, alert handling, playback capabilities, data integrations, and production reliability.",
      layers: projectLayers,
      architecture: {
        description:
          "AI detections become alerts, travel through RabbitMQ into the Django backend, move through ticket and configuration workflows, resolve persistent and playback data, and reach the operator dashboard through a dedicated playback API.",
        viewBox: {
          width: 960,
          height: 560,
        },
        nodes: [
          {
            id: "case-01-ai-detection",
            label: "AI detection",
            responsibility:
              "Produces incident events from surveillance camera activity for downstream alert processing.",
            kind: "client",
            position: { x: 24, y: 76, width: 148, height: 76 },
            layerIds: ["request"],
            protocol: "Detection event",
            mobileOrder: 1,
          },
          {
            id: "case-01-alert-generation",
            label: "Alert generation",
            responsibility:
              "Transforms detection events into structured alerts that can enter the platform workflow.",
            kind: "service",
            position: { x: 214, y: 76, width: 154, height: 76 },
            layerIds: ["request"],
            protocol: "Alert event",
            mobileOrder: 2,
          },
          {
            id: "case-01-rabbitmq",
            label: "RabbitMQ",
            responsibility:
              "Carries asynchronous alert messages into backend processing while separating detection producers from consumers.",
            kind: "queue",
            position: { x: 410, y: 76, width: 146, height: 76 },
            layerIds: ["request", "infrastructure", "observability"],
            protocol: "Message queue",
            boundary: "Event boundary",
            mobileOrder: 3,
          },
          {
            id: "case-01-django",
            label: "Django backend",
            responsibility:
              "Coordinates REST APIs, alert handling, ticket workflows, configuration access, database queries, and playback integration.",
            kind: "service",
            position: { x: 598, y: 76, width: 162, height: 76 },
            layerIds: [
              "request",
              "data",
              "infrastructure",
              "observability",
            ],
            protocol: "Django / Python",
            boundary: "Application boundary",
            mobileOrder: 4,
          },
          {
            id: "case-01-ticket-management",
            label: "Ticket management",
            responsibility:
              "Maintains incident records, alert associations, workflow state, and operator-facing investigation context.",
            kind: "service",
            position: { x: 796, y: 76, width: 140, height: 76 },
            layerIds: ["request", "data", "infrastructure"],
            protocol: "Ticket workflow",
            boundary: "Workflow boundary",
            mobileOrder: 5,
          },
          {
            id: "case-01-config-cache",
            label: "Configuration cache",
            responsibility:
              "Reuses frequently required camera, NVR, storage, and platform configuration while PostgreSQL remains authoritative.",
            kind: "datastore",
            position: { x: 796, y: 278, width: 140, height: 76 },
            layerIds: [
              "request",
              "data",
              "infrastructure",
              "observability",
            ],
            protocol: "Cached config",
            boundary: "Configuration boundary",
            mobileOrder: 6,
          },
          {
            id: "case-01-postgresql",
            label: "PostgreSQL",
            responsibility:
              "Stores tickets, alerts, mappings, and configuration data queried and maintained by backend workflows.",
            kind: "datastore",
            position: { x: 598, y: 278, width: 162, height: 76 },
            layerIds: [
              "request",
              "data",
              "infrastructure",
              "observability",
            ],
            protocol: "Relational state",
            boundary: "Persistent state",
            mobileOrder: 7,
          },
          {
            id: "case-01-minio",
            label: "MinIO playback",
            responsibility:
              "Provides object storage for incident playback media resolved through platform configuration and camera context.",
            kind: "datastore",
            position: { x: 410, y: 278, width: 146, height: 76 },
            layerIds: [
              "request",
              "data",
              "infrastructure",
              "observability",
            ],
            protocol: "Object storage",
            boundary: "Media storage",
            mobileOrder: 8,
          },
          {
            id: "case-01-playback-api",
            label: "Playback API",
            responsibility:
              "Coordinates timestamp-based playback retrieval using ticket context, camera and NVR mapping, and stored media references.",
            kind: "service",
            position: { x: 214, y: 278, width: 154, height: 76 },
            layerIds: [
              "request",
              "data",
              "infrastructure",
              "observability",
            ],
            protocol: "REST API",
            boundary: "Playback boundary",
            mobileOrder: 9,
          },
          {
            id: "case-01-dashboard",
            label: "Frontend dashboard",
            responsibility:
              "Combines ticket, alert, and playback data into the operator investigation workflow.",
            kind: "external",
            position: { x: 24, y: 278, width: 148, height: 76 },
            layerIds: ["request", "infrastructure"],
            protocol: "Dashboard UI",
            mobileOrder: 10,
          },
        ],
        edges: [
          {
            id: "case-01-detection-alert",
            source: "case-01-ai-detection",
            target: "case-01-alert-generation",
            layerIds: ["request"],
            traceOrder: 0,
          },
          {
            id: "case-01-alert-queue",
            source: "case-01-alert-generation",
            target: "case-01-rabbitmq",
            layerIds: ["request", "infrastructure", "observability"],
            traceOrder: 1,
          },
          {
            id: "case-01-queue-backend",
            source: "case-01-rabbitmq",
            target: "case-01-django",
            layerIds: ["request", "infrastructure", "observability"],
            traceOrder: 2,
          },
          {
            id: "case-01-backend-ticket",
            source: "case-01-django",
            target: "case-01-ticket-management",
            layerIds: [
              "request",
              "data",
              "infrastructure",
              "observability",
            ],
            traceOrder: 3,
            emphasis: "decision",
          },
          {
            id: "case-01-ticket-cache",
            source: "case-01-ticket-management",
            target: "case-01-config-cache",
            layerIds: ["request", "data", "infrastructure"],
            traceOrder: 4,
            emphasis: "decision",
          },
          {
            id: "case-01-cache-database",
            source: "case-01-config-cache",
            target: "case-01-postgresql",
            layerIds: [
              "request",
              "data",
              "infrastructure",
              "observability",
            ],
            traceOrder: 5,
          },
          {
            id: "case-01-database-storage",
            source: "case-01-postgresql",
            target: "case-01-minio",
            layerIds: [
              "request",
              "data",
              "infrastructure",
              "observability",
            ],
            traceOrder: 6,
          },
          {
            id: "case-01-storage-playback",
            source: "case-01-minio",
            target: "case-01-playback-api",
            layerIds: [
              "request",
              "data",
              "infrastructure",
              "observability",
            ],
            traceOrder: 7,
          },
          {
            id: "case-01-playback-dashboard",
            source: "case-01-playback-api",
            target: "case-01-dashboard",
            layerIds: ["request", "infrastructure"],
            traceOrder: 8,
          },
        ],
      },
      decisions: [
        {
          id: "case-01-decision-01",
          label: "Timestamp-based playback retrieval",
          constraint:
            "Operators needed incident playback to resolve from ticket and alert context across mapped cameras and recording sources.",
          decision:
            "Integrated playback retrieval around incident timestamps and backend-resolved camera, NVR, configuration, and storage context.",
          result:
            "Connected playback to the ticket workflow and simplified the operator investigation path.",
          relatedNodeIds: [
            "case-01-ticket-management",
            "case-01-minio",
            "case-01-playback-api",
            "case-01-dashboard",
          ],
          layerId: "request",
        },
        {
          id: "case-01-decision-02",
          label: "Configuration caching",
          constraint:
            "Camera, NVR, storage, and platform settings were required repeatedly across backend request paths.",
          decision:
            "Cached frequently reused configuration while retaining PostgreSQL as the authoritative source.",
          result:
            "Reduced repeated configuration lookups and centralized configuration access in the backend.",
          relatedNodeIds: ["case-01-config-cache", "case-01-postgresql"],
          layerId: "data",
        },
        {
          id: "case-01-decision-03",
          label: "Camera and NVR mapping",
          constraint:
            "Playback retrieval depended on resolving the correct relationship between incidents, cameras, NVR sources, and storage configuration.",
          decision:
            "Kept camera and NVR resolution inside backend integration logic instead of requiring the dashboard to reconstruct infrastructure mappings.",
          result:
            "Created a clearer and more consistent boundary between operator workflows and surveillance infrastructure details.",
          relatedNodeIds: [
            "case-01-django",
            "case-01-postgresql",
            "case-01-minio",
            "case-01-playback-api",
          ],
          layerId: "infrastructure",
        },
        {
          id: "case-01-decision-04",
          label: "External database synchronization",
          constraint:
            "Platform workflows needed data from an external database without spreading integration-specific queries throughout application logic.",
          decision:
            "Isolated external database access and synchronization handling behind backend integration paths and controlled query logic.",
          result:
            "Improved maintainability of the external data boundary and reduced coupling in ticket and configuration workflows.",
          relatedNodeIds: ["case-01-django", "case-01-postgresql"],
          layerId: "data",
        },
        {
          id: "case-01-decision-05",
          label: "Ticket workflow API design",
          constraint:
            "Alert handling, ticket state, playback access, and frontend integration had to operate as one investigation workflow.",
          decision:
            "Extended Django REST APIs around ticket operations, alert context, and playback access while preserving the existing platform architecture.",
          result:
            "Provided a clearer backend contract for frontend ticket and investigation features.",
          relatedNodeIds: [
            "case-01-django",
            "case-01-ticket-management",
            "case-01-playback-api",
            "case-01-dashboard",
          ],
          layerId: "request",
        },
        {
          id: "case-01-decision-06",
          label: "Backend optimization and debugging",
          constraint:
            "Production workflows exposed inefficient queries, integration defects, and failure paths across APIs and backend services.",
          decision:
            "Investigated request paths, improved PostgreSQL query handling, strengthened error handling, and delivered targeted bug fixes and production enhancements.",
          result:
            "Improved backend maintainability and reliability while preserving established product behavior.",
          relatedNodeIds: [
            "case-01-rabbitmq",
            "case-01-django",
            "case-01-postgresql",
            "case-01-playback-api",
          ],
          layerId: "observability",
        },
      ],
      technologies: [
        {
          id: "case-01-django-technology",
          label: "Django",
          responsibility:
            "Backend services, ticket workflows, APIs, and platform integrations.",
        },
        {
          id: "case-01-python",
          label: "Python",
          responsibility:
            "Application logic, debugging, data integration, and production fixes.",
        },
        {
          id: "case-01-postgresql-technology",
          label: "PostgreSQL",
          responsibility:
            "Ticket, alert, configuration, mapping, and integration queries.",
        },
        {
          id: "case-01-rabbitmq-technology",
          label: "RabbitMQ",
          responsibility:
            "Asynchronous alert messaging between detection and backend processing.",
        },
        {
          id: "case-01-minio-technology",
          label: "MinIO",
          responsibility:
            "Object storage integration for surveillance playback media.",
        },
        {
          id: "case-01-rest-api",
          label: "REST API",
          responsibility:
            "Contracts for tickets, alerts, configuration, and playback workflows.",
        },
        {
          id: "case-01-javascript",
          label: "JavaScript",
          responsibility:
            "Frontend integration with ticket and playback API behavior.",
        },
        {
          id: "case-01-html",
          label: "HTML",
          responsibility:
            "Operator-facing dashboard structure and feature integration.",
        },
        {
          id: "case-01-css",
          label: "CSS",
          responsibility:
            "Dashboard presentation and workflow interface refinements.",
        },
        {
          id: "case-01-git",
          label: "Git",
          responsibility:
            "Version control for feature development, debugging, and fixes.",
        },
      ],
      outcome: {
        eyebrow: "Verified outcome",
        title: "A more connected incident-to-investigation workflow.",
        description:
          "The work extended an existing enterprise surveillance platform across alert processing, ticket workflows, configuration and database integration, playback delivery, and frontend coordination.",
        highlights: [
          "Integrated timestamp-based playback into the ticket management workflow.",
          "Reduced repeated configuration lookups through backend caching.",
          "Centralized camera and NVR mapping within backend integration logic.",
          "Simplified operator investigation by connecting alerts, tickets, playback, and the dashboard.",
          "Improved backend maintainability and reliability through debugging, query work, bug fixes, and production enhancements.",
        ],
      },
      actions: [
        {
          id: "case-01-review-architecture",
          label: "Review system flow",
          href: "#project-case-study-01",
          kind: "case-study",
        },
      ],
    },
    {
      id: "case-study-02",
      register: {
        index: "Case study / 02",
        domain: "Analytics visualization",
        role: "Backend & visualization",
        status: "Feature enhancements",
      },
      title: "Heat Map Analytics System.",
      premise:
        "Enhanced and extended an existing enterprise heat-map analytics feature by improving backend APIs, database queries, time-range and camera filtering, data aggregation, overlay generation, frontend visualization, performance, and production behavior. The work consumed existing camera event data and did not include building the AI detection model.",
      layers: projectLayers,
      architecture: {
        description:
          "Existing camera event data moves through backend API boundaries, time and camera filters, aggregation, heat-map generation, overlay rendering, and the frontend analytics dashboard.",
        viewBox: {
          width: 960,
          height: 560,
        },
        nodes: [
          {
            id: "case-02-camera-events",
            label: "Camera events",
            responsibility:
              "Supplies existing event and coordinate data used by the analytics feature without changing the upstream detection model.",
            kind: "client",
            position: { x: 40, y: 218, width: 148, height: 76 },
            layerIds: ["request", "data"],
            protocol: "Event data",
            mobileOrder: 1,
          },
          {
            id: "case-02-backend-api",
            label: "Backend API",
            responsibility:
              "Accepts analytics requests, validates filter input, coordinates queries, and returns visualization-ready responses.",
            kind: "boundary",
            position: { x: 226, y: 218, width: 154, height: 76 },
            layerIds: [
              "request",
              "data",
              "infrastructure",
              "observability",
            ],
            protocol: "REST API",
            boundary: "API boundary",
            mobileOrder: 2,
          },
          {
            id: "case-02-filter-engine",
            label: "Filter engine",
            responsibility:
              "Applies validated time-range and camera criteria before analytics data enters the aggregation path.",
            kind: "service",
            position: { x: 420, y: 92, width: 164, height: 76 },
            layerIds: [
              "request",
              "data",
              "infrastructure",
              "observability",
            ],
            protocol: "Time / Camera",
            boundary: "Query boundary",
            mobileOrder: 3,
          },
          {
            id: "case-02-aggregation-engine",
            label: "Aggregation engine",
            responsibility:
              "Transforms filtered camera-event data into the spatial intensity values required by the heat-map feature.",
            kind: "service",
            position: { x: 662, y: 218, width: 174, height: 76 },
            layerIds: [
              "request",
              "data",
              "infrastructure",
              "observability",
            ],
            protocol: "Aggregate",
            boundary: "Analytics boundary",
            mobileOrder: 4,
          },
          {
            id: "case-02-heat-map-generator",
            label: "Heat-map generator",
            responsibility:
              "Converts aggregated spatial data into a consistent heat-map representation for the visualization layer.",
            kind: "service",
            position: { x: 420, y: 350, width: 164, height: 76 },
            layerIds: [
              "request",
              "data",
              "infrastructure",
              "observability",
            ],
            protocol: "Intensity map",
            boundary: "Generation boundary",
            mobileOrder: 5,
          },
          {
            id: "case-02-overlay-renderer",
            label: "Overlay renderer",
            responsibility:
              "Maps heat-map output into a visual overlay aligned with the selected camera view and dashboard state.",
            kind: "service",
            position: { x: 226, y: 350, width: 154, height: 76 },
            layerIds: [
              "request",
              "data",
              "infrastructure",
              "observability",
            ],
            protocol: "Visual overlay",
            boundary: "Rendering boundary",
            mobileOrder: 6,
          },
          {
            id: "case-02-dashboard",
            label: "Frontend dashboard",
            responsibility:
              "Provides camera and time controls and presents the generated overlay within the analytics workflow.",
            kind: "external",
            position: { x: 40, y: 350, width: 148, height: 76 },
            layerIds: ["request", "infrastructure", "observability"],
            protocol: "Analytics UI",
            mobileOrder: 7,
          },
        ],
        edges: [
          {
            id: "case-02-events-api",
            source: "case-02-camera-events",
            target: "case-02-backend-api",
            layerIds: ["request", "data", "infrastructure"],
            traceOrder: 0,
          },
          {
            id: "case-02-api-filter",
            source: "case-02-backend-api",
            target: "case-02-filter-engine",
            layerIds: [
              "request",
              "data",
              "infrastructure",
              "observability",
            ],
            traceOrder: 1,
            emphasis: "decision",
          },
          {
            id: "case-02-filter-aggregation",
            source: "case-02-filter-engine",
            target: "case-02-aggregation-engine",
            layerIds: [
              "request",
              "data",
              "infrastructure",
              "observability",
            ],
            traceOrder: 2,
            emphasis: "decision",
          },
          {
            id: "case-02-aggregation-heat-map",
            source: "case-02-aggregation-engine",
            target: "case-02-heat-map-generator",
            layerIds: [
              "request",
              "data",
              "infrastructure",
              "observability",
            ],
            traceOrder: 3,
          },
          {
            id: "case-02-heat-map-overlay",
            source: "case-02-heat-map-generator",
            target: "case-02-overlay-renderer",
            layerIds: [
              "request",
              "data",
              "infrastructure",
              "observability",
            ],
            traceOrder: 4,
            emphasis: "decision",
          },
          {
            id: "case-02-overlay-dashboard",
            source: "case-02-overlay-renderer",
            target: "case-02-dashboard",
            layerIds: ["request", "infrastructure", "observability"],
            traceOrder: 5,
          },
        ],
      },
      decisions: [
        {
          id: "case-02-decision-01",
          label: "Time-range filtering",
          constraint:
            "Analytics requests needed to isolate relevant event windows without processing unrelated historical data.",
          decision:
            "Validated time boundaries at the API and applied them within the backend query path before aggregation.",
          result:
            "Made heat-map requests more precise and limited unnecessary data processing.",
          relatedNodeIds: [
            "case-02-backend-api",
            "case-02-filter-engine",
            "case-02-aggregation-engine",
          ],
          layerId: "data",
        },
        {
          id: "case-02-decision-02",
          label: "Camera-based filtering",
          constraint:
            "Operators needed analytics scoped to a selected camera instead of mixed event data from unrelated views.",
          decision:
            "Added explicit camera filtering to the backend contract and restricted the dataset before aggregation.",
          result:
            "Produced heat-map data that consistently matched the selected camera context.",
          relatedNodeIds: [
            "case-02-camera-events",
            "case-02-backend-api",
            "case-02-filter-engine",
          ],
          layerId: "data",
        },
        {
          id: "case-02-decision-03",
          label: "Efficient aggregation",
          constraint:
            "Raw filtered events required additional processing before they could support a meaningful density visualization.",
          decision:
            "Consolidated the filtered event data into spatial intensity values within the backend analytics path.",
          result:
            "Reduced redundant visualization data and provided a clearer input for heat-map generation.",
          relatedNodeIds: [
            "case-02-filter-engine",
            "case-02-aggregation-engine",
            "case-02-heat-map-generator",
          ],
          layerId: "data",
        },
        {
          id: "case-02-decision-04",
          label: "Backend API design",
          constraint:
            "The dashboard needed a predictable contract for filter input and visualization-ready analytics output.",
          decision:
            "Enhanced the API around explicit time-range and camera parameters with a stable heat-map response structure.",
          result:
            "Simplified frontend integration and kept analytics processing behind the backend boundary.",
          relatedNodeIds: [
            "case-02-backend-api",
            "case-02-filter-engine",
            "case-02-dashboard",
          ],
          layerId: "request",
        },
        {
          id: "case-02-decision-05",
          label: "Visualization performance",
          constraint:
            "Filter changes and overlay updates could trigger unnecessary frontend visualization work.",
          decision:
            "Separated filter-driven data updates from overlay presentation and limited rendering work to the active analytics view.",
          result:
            "Improved interaction responsiveness and made visualization behavior easier to maintain.",
          relatedNodeIds: [
            "case-02-heat-map-generator",
            "case-02-overlay-renderer",
            "case-02-dashboard",
          ],
          layerId: "observability",
        },
        {
          id: "case-02-decision-06",
          label: "Overlay generation",
          constraint:
            "Aggregated heat-map data had to remain aligned with the selected camera context when presented in the dashboard.",
          decision:
            "Normalized the generated heat-map output before mapping it into the frontend overlay renderer.",
          result:
            "Created a more consistent path from backend analytics data to the displayed camera overlay.",
          relatedNodeIds: [
            "case-02-aggregation-engine",
            "case-02-heat-map-generator",
            "case-02-overlay-renderer",
            "case-02-dashboard",
          ],
          layerId: "request",
        },
      ],
      technologies: [
        {
          id: "case-02-django",
          label: "Django",
          responsibility:
            "Backend analytics endpoints, request validation, and feature integration.",
        },
        {
          id: "case-02-python",
          label: "Python",
          responsibility:
            "Filtering, aggregation, backend debugging, and feature enhancements.",
        },
        {
          id: "case-02-postgresql",
          label: "PostgreSQL",
          responsibility:
            "Time-range and camera-filtered analytics queries.",
        },
        {
          id: "case-02-rest-api",
          label: "REST API",
          responsibility:
            "Filter parameters and visualization-ready analytics responses.",
        },
        {
          id: "case-02-javascript",
          label: "JavaScript",
          responsibility:
            "Heat-map controls, overlay behavior, and dashboard visualization.",
        },
        {
          id: "case-02-html",
          label: "HTML",
          responsibility:
            "Analytics controls and visualization structure.",
        },
        {
          id: "case-02-css",
          label: "CSS",
          responsibility:
            "Heat-map overlay presentation and dashboard styling.",
        },
        {
          id: "case-02-git",
          label: "Git",
          responsibility:
            "Version control for feature work, optimization, and bug fixes.",
        },
      ],
      outcome: {
        eyebrow: "Verified outcome",
        title: "A clearer path from camera events to visual density.",
        description:
          "The work enhanced an existing enterprise analytics feature across backend filtering, query behavior, aggregation, API delivery, heat-map generation, and frontend overlay presentation.",
        highlights: [
          "Added and improved time-range and camera-based filtering.",
          "Improved database query and aggregation paths for relevant analytics data.",
          "Strengthened the backend API contract for heat-map visualization.",
          "Improved overlay generation and frontend visualization behavior.",
          "Delivered performance improvements, bug fixes, and maintainability enhancements without changing the upstream AI model.",
        ],
      },
      actions: [
        {
          id: "case-02-review-analytics",
          label: "Review analytics flow",
          href: "#project-case-study-02",
          kind: "case-study",
        },
      ],
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
