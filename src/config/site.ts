import { GITHUB_URL, LINKEDIN_URL } from "@/data/contact";

export const SITE_NAME = "Fahad | Software Engineer";
export const SITE_OWNER = "Fahad";
export const SITE_DESCRIPTION =
  "Software Engineer building scalable backend systems, thoughtful product interfaces, and reliable engineering workflows.";

const DEFAULT_SITE_URL = "https://fahad-portfolio.vercel.app";

export const SITE_URL = new URL(
  process.env.NEXT_PUBLIC_SITE_URL ?? DEFAULT_SITE_URL,
);

export const PERSON_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: SITE_OWNER,
  jobTitle: "Software Engineer",
  description: SITE_DESCRIPTION,
  url: SITE_URL.toString(),
  sameAs: [GITHUB_URL, LINKEDIN_URL],
};
