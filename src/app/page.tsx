import { ABOUT_DATA } from "@/data/about";
import { CONTACT_DATA } from "@/data/contact";
import { ENGINEERING_TOOLKIT_DATA } from "@/data/engineering-toolkit";
import { EXPERIENCE_DATA } from "@/data/experience";
import { FEATURED_PROJECTS_DATA } from "@/data/featured-projects";
import { About } from "@/sections/About";
import { Contact } from "@/sections/Contact";
import { EngineeringToolkit } from "@/sections/EngineeringToolkit";
import { Experience } from "@/sections/Experience";
import { FeaturedProjects } from "@/sections/FeaturedProjects";
import { Hero } from "@/sections/Hero";

export default function Home() {
  return (
    <main id="top">
      <Hero />
      <About {...ABOUT_DATA} />
      <FeaturedProjects {...FEATURED_PROJECTS_DATA} />
      <Experience {...EXPERIENCE_DATA} />
      <EngineeringToolkit {...ENGINEERING_TOOLKIT_DATA} />
      <Contact {...CONTACT_DATA} />
    </main>
  );
}
