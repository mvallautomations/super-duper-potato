"use client";

import { useEffect, useState } from "react";

interface TimelineSection {
  id: string;
  label: string;
}

function makeHeadingId(text: string, index: number): string {
  const slug = text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  return slug || `section-${index + 1}`;
}

export default function ArticleTimelineNav({ targetId }: { targetId: string }) {
  const [sections, setSections] = useState<TimelineSection[]>([]);
  const [activeId, setActiveId] = useState("");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const article = document.getElementById(targetId);
    if (!article) return;

    const headings = Array.from(article.querySelectorAll<HTMLHeadingElement>("h2, h3"));
    const usedIds = new Set<string>();
    const nextSections = headings.map((heading, index) => {
      const baseId = heading.id || makeHeadingId(heading.textContent ?? "", index);
      let id = baseId;
      let duplicate = 2;

      while (usedIds.has(id)) {
        id = `${baseId}-${duplicate}`;
        duplicate += 1;
      }

      usedIds.add(id);
      heading.id = id;
      return { id, label: heading.textContent?.trim() || `Section ${index + 1}` };
    });

    const initialStateFrame = window.requestAnimationFrame(() => {
      setSections(nextSections);
      setActiveId(nextSections[0]?.id ?? "");
    });

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        const id = visible[0]?.target.id;
        if (id) setActiveId(id);
      },
      { rootMargin: "-18% 0px -68% 0px", threshold: 0 },
    );

    headings.forEach((heading) => observer.observe(heading));

    const updateProgress = () => {
      const rect = article.getBoundingClientRect();
      const start = window.scrollY + rect.top - window.innerHeight * 0.2;
      const distance = Math.max(rect.height - window.innerHeight * 0.55, 1);
      const value = ((window.scrollY - start) / distance) * 100;
      setProgress(Math.min(100, Math.max(0, value)));
    };

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);

    return () => {
      window.cancelAnimationFrame(initialStateFrame);
      observer.disconnect();
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, [targetId]);

  if (sections.length === 0) return null;

  return (
    <aside className="article-timeline" aria-label="Article timeline">
      <p className="article-timeline__label">On this page</p>
      <div className="article-timeline__track" aria-hidden="true">
        <span className="article-timeline__progress" style={{ height: `${progress}%` }} />
      </div>
      <ol className="article-timeline__list">
        {sections.map((section) => {
          const isActive = activeId === section.id;
          return (
            <li key={section.id}>
              <button
                type="button"
                className="article-timeline__link"
                aria-current={isActive ? "location" : undefined}
                onClick={() => {
                  document.getElementById(section.id)?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  });
                }}
              >
                <span className="article-timeline__marker" aria-hidden="true" />
                <span>{section.label}</span>
              </button>
            </li>
          );
        })}
      </ol>
      <p className="article-timeline__percent" aria-live="polite">
        {Math.round(progress)}% read
      </p>
    </aside>
  );
}
