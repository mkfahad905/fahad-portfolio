import type { ContactChannel, ContactContent } from "@/types/contact";

export const CONTACT_EMAIL = "hello@example.com";
export const LINKEDIN_URL = "https://www.linkedin.com/in/your-profile";
export const GITHUB_URL = "https://github.com/your-username";

export const CONTACT_CHANNELS = [
  {
    id: "email",
    label: "Email",
    description: "Start a direct conversation about a role or project.",
    action: "Write an email",
    href: `mailto:${CONTACT_EMAIL}`,
    external: false,
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    description: "Connect for professional updates and opportunities.",
    action: "View profile",
    href: LINKEDIN_URL,
    external: true,
  },
  {
    id: "github",
    label: "GitHub",
    description: "Explore source code, experiments, and ongoing work.",
    action: "View repositories",
    href: GITHUB_URL,
    external: true,
  },
] satisfies readonly ContactChannel[];

export const CONTACT_DATA = {
  eyebrow: "05 / Contact",
  title: "Let’s Build Something Meaningful.",
  description:
    "I’m currently open to full-time Software Engineering opportunities where I can contribute to scalable products, solve meaningful technical challenges, and continue growing as an engineer.",
  ctaLabel: "Get In Touch",
  email: CONTACT_EMAIL,
  channels: CONTACT_CHANNELS,
} satisfies ContactContent;
