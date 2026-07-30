import type { ExperienceProps } from "@/sections/Experience";

export const EXPERIENCE_DATA = {
  eyebrow: "03 / Experience",
  title: "Engineering in practice.",
  description:
    "Professional experience mapped as an evolving system of responsibilities, technologies, production challenges, and engineering growth.",
  experiences: [
    {
      id: "current-software-developer",
      duration: "Current employment period",
      company: "My current company",
      role: "Software Developer",
      current: true,
      summary:
        "Worked on enterprise surveillance software by contributing to backend services, analytics features, API integrations, production debugging, ticket workflows, playback functionality, and heat-map analytics.",
      responsibilities: [
        "Django backend development",
        "REST API implementation",
        "PostgreSQL queries",
        "RabbitMQ integrations",
        "MinIO playback integration",
        "Ticket workflow enhancements",
        "Heat-map analytics improvements",
        "Bug fixing",
        "Performance optimization",
        "Frontend/backend integration",
      ],
      technologies: [
        "Django",
        "Python",
        "PostgreSQL",
        "RabbitMQ",
        "MinIO",
        "JavaScript",
        "Git",
        "REST APIs",
      ],
      growth:
        "Expanded from feature implementation and production debugging into broader ownership across backend workflows, system integrations, data paths, analytics behavior, and frontend delivery.",
    },
  ],
} satisfies ExperienceProps;
