import type { FeaturedProjectsProps } from "@/sections/FeaturedProjects";

const PROJECT_LAYERS = [
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

export const FEATURED_PROJECTS_DATA = {
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
      layers: PROJECT_LAYERS,
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
      id: "case-study-03",
      register: {
        index: "Case study / 02",
        domain: "Counselling platform",
        role: "Product & frontend engineering",
        status: "Concept to deployment",
      },
      title: "InnerLight Counselling Platform.",
      premise:
        "Designed and developed a modern counselling platform for a clinical psychologist, translating professional services into a trustworthy, accessible, and responsive product that establishes an online presence and guides prospective clients through a simple onboarding flow without an unnecessary custom backend.",
      layers: PROJECT_LAYERS,
      architecture: {
        description:
          "A visitor moves through the Next.js application and trust-focused content into a lightweight session-booking flow that connects Google Forms, WhatsApp, and the counsellor.",
        viewBox: {
          width: 960,
          height: 560,
        },
        nodes: [
          {
            id: "case-03-visitor",
            label: "Visitor",
            responsibility:
              "Explores counselling services, professional context, and the available path to begin a conversation.",
            kind: "client",
            position: { x: 40, y: 218, width: 148, height: 76 },
            layerIds: ["request"],
            protocol: "Client journey",
            mobileOrder: 1,
          },
          {
            id: "case-03-next-application",
            label: "Next.js application",
            responsibility:
              "Delivers responsive routes, content, navigation, and interactive presentation through the App Router.",
            kind: "boundary",
            position: { x: 222, y: 90, width: 164, height: 76 },
            layerIds: ["request", "infrastructure", "observability"],
            protocol: "App Router",
            boundary: "Application boundary",
            mobileOrder: 2,
          },
          {
            id: "case-03-content-sections",
            label: "Content sections",
            responsibility:
              "Organizes services, practitioner information, process guidance, and trust-building content into a clear hierarchy.",
            kind: "service",
            position: { x: 420, y: 218, width: 164, height: 76 },
            layerIds: ["request", "data", "infrastructure"],
            protocol: "Structured content",
            boundary: "Content boundary",
            mobileOrder: 3,
          },
          {
            id: "case-03-session-booking",
            label: "Session booking",
            responsibility:
              "Provides focused calls to action and guides prospective clients from service discovery into onboarding.",
            kind: "service",
            position: { x: 618, y: 90, width: 164, height: 76 },
            layerIds: [
              "request",
              "data",
              "infrastructure",
              "observability",
            ],
            protocol: "Booking flow",
            boundary: "Onboarding boundary",
            mobileOrder: 4,
          },
          {
            id: "case-03-google-form",
            label: "Google Form",
            responsibility:
              "Collects structured session-request information through a lightweight managed integration.",
            kind: "external",
            position: { x: 782, y: 218, width: 148, height: 76 },
            layerIds: ["request", "data", "infrastructure"],
            protocol: "Form integration",
            boundary: "External form",
            mobileOrder: 5,
          },
          {
            id: "case-03-whatsapp",
            label: "WhatsApp",
            responsibility:
              "Offers a familiar direct communication path for follow-up and appointment coordination.",
            kind: "external",
            position: { x: 618, y: 350, width: 164, height: 76 },
            layerIds: ["request", "infrastructure"],
            protocol: "Direct contact",
            boundary: "Communication",
            mobileOrder: 6,
          },
          {
            id: "case-03-counsellor",
            label: "Counsellor",
            responsibility:
              "Receives client enquiries and continues the human onboarding and session-coordination process.",
            kind: "external",
            position: { x: 420, y: 350, width: 164, height: 76 },
            layerIds: ["request"],
            protocol: "Human follow-up",
            mobileOrder: 7,
          },
        ],
        edges: [
          {
            id: "case-03-visitor-application",
            source: "case-03-visitor",
            target: "case-03-next-application",
            layerIds: ["request", "infrastructure", "observability"],
            traceOrder: 0,
          },
          {
            id: "case-03-application-content",
            source: "case-03-next-application",
            target: "case-03-content-sections",
            layerIds: [
              "request",
              "data",
              "infrastructure",
              "observability",
            ],
            traceOrder: 1,
          },
          {
            id: "case-03-content-booking",
            source: "case-03-content-sections",
            target: "case-03-session-booking",
            layerIds: ["request", "data", "infrastructure"],
            traceOrder: 2,
            emphasis: "decision",
          },
          {
            id: "case-03-booking-form",
            source: "case-03-session-booking",
            target: "case-03-google-form",
            layerIds: ["request", "data", "infrastructure"],
            traceOrder: 3,
            emphasis: "decision",
          },
          {
            id: "case-03-form-whatsapp",
            source: "case-03-google-form",
            target: "case-03-whatsapp",
            layerIds: ["request", "infrastructure"],
            traceOrder: 4,
          },
          {
            id: "case-03-whatsapp-counsellor",
            source: "case-03-whatsapp",
            target: "case-03-counsellor",
            layerIds: ["request", "infrastructure"],
            traceOrder: 5,
          },
        ],
      },
      decisions: [
        {
          id: "case-03-decision-01",
          label: "Mobile-first responsive design",
          constraint:
            "Prospective clients needed a clear and comfortable experience across phones, tablets, and larger screens.",
          decision:
            "Established the content hierarchy and interaction flow from the smallest viewport first, then expanded the reusable layouts for wider devices.",
          result:
            "Created a consistent and usable counselling experience across device sizes.",
          relatedNodeIds: [
            "case-03-visitor",
            "case-03-next-application",
            "case-03-content-sections",
          ],
          layerId: "infrastructure",
        },
        {
          id: "case-03-decision-02",
          label: "Trust-focused information hierarchy",
          constraint:
            "A counselling platform must communicate professional credibility and service clarity without overwhelming a prospective client.",
          decision:
            "Prioritized practitioner context, services, process guidance, reassuring content, and clear next steps within the page hierarchy.",
          result:
            "Made the platform easier to understand and created a more confident path toward booking.",
          relatedNodeIds: [
            "case-03-visitor",
            "case-03-content-sections",
            "case-03-session-booking",
          ],
          layerId: "data",
        },
        {
          id: "case-03-decision-03",
          label: "Lightweight booking integrations",
          constraint:
            "The practice required straightforward client onboarding without the operational cost of accounts, scheduling infrastructure, or a custom backend.",
          decision:
            "Connected the booking flow to Google Forms for structured enquiries and WhatsApp for direct follow-up.",
          result:
            "Simplified client onboarding while keeping the product lightweight and maintainable.",
          relatedNodeIds: [
            "case-03-session-booking",
            "case-03-google-form",
            "case-03-whatsapp",
            "case-03-counsellor",
          ],
          layerId: "request",
        },
        {
          id: "case-03-decision-04",
          label: "Next.js App Router performance",
          constraint:
            "The public-facing platform needed responsive navigation and efficient delivery without unnecessary application complexity.",
          decision:
            "Used the Next.js App Router to compose the experience around lightweight routes, server-first delivery, and isolated interactive behavior.",
          result:
            "Produced a performant foundation that remained straightforward to deploy and maintain.",
          relatedNodeIds: [
            "case-03-visitor",
            "case-03-next-application",
            "case-03-content-sections",
          ],
          layerId: "observability",
        },
        {
          id: "case-03-decision-05",
          label: "Reusable component architecture",
          constraint:
            "Service content, calls to action, navigation, and responsive sections needed a consistent visual language.",
          decision:
            "Built reusable components around shared typography, spacing, interaction patterns, and design tokens.",
          result:
            "Established a coherent design system and made the product easier to extend.",
          relatedNodeIds: [
            "case-03-next-application",
            "case-03-content-sections",
            "case-03-session-booking",
          ],
          layerId: "infrastructure",
        },
      ],
      technologies: [
        {
          id: "case-03-nextjs",
          label: "Next.js",
          responsibility:
            "App Router, route composition, rendering, and production application delivery.",
        },
        {
          id: "case-03-typescript",
          label: "TypeScript",
          responsibility:
            "Typed component contracts and maintainable frontend architecture.",
        },
        {
          id: "case-03-tailwind",
          label: "Tailwind CSS",
          responsibility:
            "Responsive layouts, shared design tokens, and consistent styling.",
        },
        {
          id: "case-03-framer-motion",
          label: "Framer Motion",
          responsibility:
            "Declarative interaction and interface transitions.",
        },
        {
          id: "case-03-gsap",
          label: "GSAP",
          responsibility:
            "Scoped page and scroll-based motion sequences.",
        },
        {
          id: "case-03-git",
          label: "Git",
          responsibility:
            "Version control across product development and deployment.",
        },
        {
          id: "case-03-vercel",
          label: "Vercel",
          responsibility:
            "Production deployment and delivery of the Next.js application.",
        },
      ],
      outcome: {
        eyebrow: "Verified outcome",
        title: "A trustworthy digital front door for counselling services.",
        description:
          "The project moved from product concept through design, responsive development, integration, and deployment while keeping the experience focused on clarity, accessibility, and simple client onboarding.",
        highlights: [
          "Built the counselling platform from concept to production deployment.",
          "Created a responsive experience across mobile, tablet, and desktop layouts.",
          "Simplified client onboarding through Google Forms and WhatsApp.",
          "Established a consistent component and design-token system.",
          "Improved usability through clear navigation, content hierarchy, and booking paths.",
        ],
      },
      actions: [
        {
          id: "case-03-review-product",
          label: "Review product flow",
          href: "#project-case-study-03",
          kind: "case-study",
        },
      ],
    },
  ],
} satisfies FeaturedProjectsProps;
