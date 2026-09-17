"use client";

import { useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CONTACT_EMAIL, GITHUB_URL, LINKEDIN_URL } from "@/data/contact";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

export function Footer({ className }: { className?: string }) {
  const handleBackToTop = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    const isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const triggers = ScrollTrigger.getAll();
    const originalScrollBehavior = document.documentElement.style.scrollBehavior;

    // Temporarily disable CSS smooth scrolling to prevent browser conflicts
    document.documentElement.style.scrollBehavior = "auto";

    if (isReducedMotion) {
      triggers.forEach((t) => t.disable(true));
      window.scrollTo(0, 0);
      triggers.forEach((t) => t.enable());
      ScrollTrigger.refresh();
      document.documentElement.style.scrollBehavior = originalScrollBehavior;
      return;
    }

    // Normal motion: disable pins to shrink doc to natural height, preventing 
    // ScrollTrigger from interfering or jumping during the scroll.
    triggers.forEach((t) => t.disable(true));

    const scrollProxy = { y: window.scrollY };
    
    gsap.to(scrollProxy, {
      y: 0,
      duration: 1,
      ease: "power3.inOut",
      onUpdate: () => {
        window.scrollTo(0, scrollProxy.y);
      },
      onComplete: () => {
        triggers.forEach((t) => t.enable());
        ScrollTrigger.refresh();
        document.documentElement.style.scrollBehavior = originalScrollBehavior;
      },
    });
  }, []);

  return (
    <footer 
      className={cn(
        "bg-[#050505] text-white px-4 pb-8 pt-4 sm:px-6 sm:pb-12 lg:px-8",
        className
      )}
    >
      <div className="mx-auto w-full max-w-[100rem]">
        <div className="border-t border-white/[0.1] pt-10 sm:pt-12">
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:flex lg:items-start lg:justify-between">
            
            {/* Identity & Role */}
            <div className="flex flex-col gap-3">
              <span className="text-[1.5rem] font-medium leading-none tracking-tight text-white sm:text-[1.75rem]">
                FAHAD MK
              </span>
              <span className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-[#ccff00]">
                FULL STACK DEVELOPER
              </span>
              <span className="font-mono text-[0.625rem] uppercase tracking-[0.18em] text-[#a1a1aa]">
                DJANGO · REACT · NEXT.JS
              </span>
            </div>

            {/* Links */}
            <nav aria-label="Footer navigation" className="flex flex-col gap-4 sm:items-start lg:flex-row lg:items-center lg:gap-8">
              {[
                { label: "LINKEDIN", href: LINKEDIN_URL },
                { label: "GITHUB", href: GITHUB_URL },
                { 
                  label: "EMAIL", 
                  href: `https://mail.google.com/mail/?view=cm&fs=1&to=${CONTACT_EMAIL}` 
                },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-fit font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-[#a1a1aa] outline-none transition-colors duration-300 hover:text-white focus-visible:text-white focus-visible:ring-1 focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-[#050505]"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Bottom Bar */}
          <div className="mt-12 flex flex-col items-start justify-between gap-6 border-t border-white/[0.05] pt-6 sm:flex-row sm:items-center sm:gap-4 lg:mt-16">
            <p className="font-mono text-[0.625rem] uppercase tracking-[0.18em] text-white/42">
              &copy; 2026 FAHAD MK
            </p>
            
            <a
              href="#home"
              onClick={handleBackToTop}
              className="inline-flex w-fit items-center font-mono text-[0.625rem] uppercase tracking-[0.18em] text-white/54 outline-none transition-colors hover:text-[#ccff00] focus-visible:text-[#ccff00] focus-visible:ring-1 focus-visible:ring-[#ccff00] focus-visible:ring-offset-4 focus-visible:ring-offset-[#050505]"
            >
              BACK TO TOP &uarr;
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
