"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function MotionEnhancements() {
  const pathname = usePathname();

  useEffect(() => {
    document.documentElement.classList.remove("is-route-loading");
  }, [pathname]);

  useEffect(() => {
    const clearLoader = () =>
      document.documentElement.classList.remove("is-route-loading");
    const onNavigate = (event: MouseEvent) => {
      const target = event.target as Element | null;
      const anchor = target?.closest("a");
      if (
        !anchor ||
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey ||
        anchor.target === "_blank" ||
        anchor.hasAttribute("download")
      ) return;

      const url = new URL(anchor.href, window.location.href);
      if (
        url.origin === window.location.origin &&
        url.pathname !== window.location.pathname
      ) {
        document.documentElement.classList.add("is-route-loading");
      }
    };

    document.addEventListener("click", onNavigate);
    window.addEventListener("pageshow", clearLoader);
    return () => {
      document.removeEventListener("click", onNavigate);
      window.removeEventListener("pageshow", clearLoader);
    };
  }, []);

  useEffect(() => {
    const elements = Array.from(
      document.querySelectorAll<HTMLElement>("main > section, .mv-card, footer"),
    );
    document.documentElement.classList.add("motion-ready");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );

    elements.forEach((element) => {
      element.classList.add("scroll-reveal");
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
