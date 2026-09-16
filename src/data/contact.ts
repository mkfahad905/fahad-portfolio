import type { ContactChannel, ContactContent } from "@/types/contact";

export const CONTACT_EMAIL = "mkfahad905@gmail.com";
export const LINKEDIN_URL = "https://www.linkedin.com/in/fahad-mk-19690a309";
export const GITHUB_URL = "https://github.com/mkfahad905";

export const CONTACT_CHANNELS = [
  {
    id: "email",
    label: "Email",
    description: "Start a direct conversation about a role or project.",
    action: "Write an email",
    href: `https://mail.google.com/mail/?view=cm&fs=1&to=${CONTACT_EMAIL}`,
    external: true,
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

export const CONTACT_CTA_HREF = `https://mail.google.com/mail/?view=cm&fs=1&to=${CONTACT_EMAIL}`;

export const CONTACT_DATA = {
  eyebrow: "05 / Contact",
  title: "Let's Build Something Meaningful.",
  description:
    "I'm currently open to full-time Software Engineering opportunities where I can contribute to scalable products, solve meaningful technical challenges, and continue growing as an engineer.",
  ctaLabel: "Get In Touch",
  ctaHref: CONTACT_CTA_HREF,
  email: CONTACT_EMAIL,
  channels: CONTACT_CHANNELS,
} satisfies ContactContent;
