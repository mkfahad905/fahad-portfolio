import type { ExperienceProps } from "@/sections/Experience";

export const EXPERIENCE_DATA = {
  eyebrow: "03 / Experience",
  title: "Engineering in practice.",
  description:
    "Professional experience mapped as an evolving system of responsibilities, technologies, production challenges, and engineering growth.",
  experiences: [
    {
      id: "jezt-django-developer",
      duration: "Apr 2026 – Present",
      company: "Jezt Technologies Private Limited Company · Kochi, Kerala, India · On-site",
      role: "Django Developer (Internship)",
      current: true,
      summary:
        "Contributing to backend development for enterprise surveillance software, working across Django services, REST APIs, database workflows, system integrations, analytics features, and production debugging.",
      responsibilities: [
        "Engineered robust backend services for enterprise surveillance applications using the Django framework.",
        "Architected and deployed RESTful APIs to ensure reliable communication between system components.",
        "Optimized PostgreSQL database schemas and queries to handle high-throughput surveillance data.",
        "Integrated RabbitMQ to implement resilient asynchronous messaging and background task processing.",
        "Configured MinIO object storage to enable scalable and efficient video playback functionality.",
        "Enhanced operational efficiency by developing automated backend ticket workflow enhancements.",
        "Built and refined backend data pipelines for spatial tracking and heat-map analytics features.",
        "Conducted rigorous production debugging to identify and resolve critical system bottlenecks.",
        "Improved application performance by refactoring data paths and optimizing database transactions.",
        "Ensured seamless frontend and backend integration by maintaining clear API contracts.",
        "Implemented reliable error handling and logging mechanisms across the backend infrastructure."
      ],
      technologies: [
        "Django",
        "Python",
        "PostgreSQL",
        "RabbitMQ",
        "MinIO",
        "REST APIs",
        "Git",
        "JavaScript"
      ],
      growth:
        "Expanded from feature implementation and production debugging into broader ownership across backend workflows, system integrations, data paths, analytics behavior, and frontend delivery."
    },
  ],
} satisfies ExperienceProps;
