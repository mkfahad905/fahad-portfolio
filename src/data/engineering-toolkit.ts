import type { EngineeringToolkitProps } from "@/sections/EngineeringToolkit";

export const ENGINEERING_TOOLKIT_DATA = {
  eyebrow: "04 / Engineering toolkit",
  title: "Capabilities, not checkboxes.",
  philosophy:
    "I choose technologies by the boundaries they clarify, the failure modes they expose, and how effectively they support a product from backend logic to the final interface.",
  supportingCopy:
    "The toolkit centers on maintainable services, explicit contracts, reliable data paths, responsive interfaces, and a workflow that keeps implementation, debugging, and delivery connected.",
  workflow: [
    "Model the system",
    "Implement the contract",
    "Integrate the layers",
    "Debug production behavior",
    "Ship and refine",
  ],
  groups: [
    {
      id: "backend",
      label: "Backend",
      description:
        "Service architecture, API contracts, production workflows, and integration boundaries.",
      capabilities: [
        {
          id: "django",
          name: "Django",
          experience:
            "Enterprise backend systems and production enhancement.",
          uses: [
            "Backend architecture",
            "REST API development",
            "Authentication workflows",
            "Production debugging",
          ],
        },
        {
          id: "python",
          name: "Python",
          experience:
            "Backend feature development, integration logic, and debugging.",
          uses: [
            "Service logic",
            "Data processing",
            "System integrations",
            "Automation and debugging",
          ],
        },
        {
          id: "rest-apis",
          name: "REST APIs",
          experience:
            "Stable contracts between backend workflows and product interfaces.",
          uses: [
            "Endpoint design",
            "Request validation",
            "Workflow integration",
            "Frontend/backend contracts",
          ],
        },
      ],
    },
    {
      id: "frontend",
      label: "Frontend",
      description:
        "Typed, responsive product interfaces built around reusable components and clear interaction states.",
      capabilities: [
        {
          id: "nextjs",
          name: "Next.js",
          experience:
            "Production web products and server-first application delivery.",
          uses: [
            "App Router architecture",
            "Server-first rendering",
            "Responsive applications",
            "Vercel deployment",
          ],
        },
        {
          id: "react",
          name: "React",
          experience:
            "Component-driven interfaces and integrated product experiences.",
          uses: [
            "Reusable components",
            "Interactive state",
            "Data presentation",
            "API integration",
          ],
        },
        {
          id: "typescript",
          name: "TypeScript",
          experience:
            "Typed contracts across components, data, and application boundaries.",
          uses: [
            "Component interfaces",
            "Domain models",
            "Safer refactoring",
            "Typed API integration",
          ],
        },
        {
          id: "javascript",
          name: "JavaScript",
          experience:
            "Browser behavior, visualization, integration, and interface debugging.",
          uses: [
            "Interaction logic",
            "Frontend integration",
            "Data visualization",
            "Runtime debugging",
          ],
        },
        {
          id: "html",
          name: "HTML",
          experience:
            "Semantic, accessible structure for content and application interfaces.",
          uses: [
            "Semantic landmarks",
            "Content hierarchy",
            "Accessible forms",
            "Structured interfaces",
          ],
        },
        {
          id: "css",
          name: "CSS",
          experience:
            "Responsive presentation and carefully controlled interface behavior.",
          uses: [
            "Responsive layouts",
            "Interaction states",
            "Motion styling",
            "Cross-device refinement",
          ],
        },
        {
          id: "tailwind-css",
          name: "Tailwind CSS",
          experience:
            "Token-driven styling for consistent, responsive product systems.",
          uses: [
            "Design tokens",
            "Responsive variants",
            "Component consistency",
            "Interface refinement",
          ],
        },
      ],
    },
    {
      id: "data",
      label: "Data",
      description:
        "Persistent state, object storage, asynchronous messaging, and the paths connecting them.",
      capabilities: [
        {
          id: "postgresql",
          name: "PostgreSQL",
          experience:
            "Relational application data, analytics queries, and production workflows.",
          uses: [
            "Query design",
            "Time and camera filtering",
            "Workflow state",
            "Query optimization",
          ],
        },
        {
          id: "minio",
          name: "MinIO",
          experience:
            "Object-storage integration for surveillance playback media.",
          uses: [
            "Playback storage",
            "Media retrieval",
            "Backend integration",
            "Storage debugging",
          ],
        },
        {
          id: "rabbitmq",
          name: "RabbitMQ",
          experience:
            "Asynchronous alert messaging in enterprise backend systems.",
          uses: [
            "Alert ingestion",
            "Service decoupling",
            "Event-driven workflows",
            "Integration debugging",
          ],
        },
      ],
    },
    {
      id: "engineering",
      label: "Engineering",
      description:
        "The development environment and delivery practices used to investigate, implement, and ship changes.",
      capabilities: [
        {
          id: "git",
          name: "Git",
          experience:
            "Versioned feature development, collaboration, and production fixes.",
          uses: [
            "Change tracking",
            "Feature workflows",
            "Regression investigation",
            "Delivery history",
          ],
        },
        {
          id: "linux",
          name: "Linux",
          experience:
            "Production-minded development and backend environment investigation.",
          uses: [
            "Service inspection",
            "Log-based debugging",
            "Environment configuration",
            "Development workflows",
          ],
        },
        {
          id: "vs-code",
          name: "VS Code",
          experience:
            "Integrated TypeScript, Python, Git, and debugging workflows.",
          uses: [
            "Code navigation",
            "Application debugging",
            "Git integration",
            "Cross-stack development",
          ],
        },
      ],
    },
  ],
} satisfies EngineeringToolkitProps;
