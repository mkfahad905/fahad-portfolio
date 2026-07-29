export type ContactChannel = {
  id: "email" | "linkedin" | "github";
  label: string;
  description: string;
  action: string;
  href: string;
  external: boolean;
};

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

