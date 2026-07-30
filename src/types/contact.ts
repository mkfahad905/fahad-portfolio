export type ContactChannel = {
  id: "email" | "linkedin" | "github";
  label: string;
  description: string;
  action: string;
  href: string;
  external: boolean;
};

export type ContactContent = {
  eyebrow: string;
  title: string;
  description: string;
  ctaLabel: string;
  email: string;
  channels: readonly ContactChannel[];
};

