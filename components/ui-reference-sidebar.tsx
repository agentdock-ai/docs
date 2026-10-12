"use client";

import { useEffect, useRef, useState } from "react";
import type { UIReferenceMeta } from "./ui-reference-data";

export function UIReferenceSidebar({
  entries,
}: {
  entries: UIReferenceMeta[];
}) {
  const [active, setActive] = useState(entries[0]?.slug ?? "");
  const navigationTarget = useRef<string | null>(null);
  const groups = [...new Set(entries.map((entry) => entry.group))];

  useEffect(() => {
    const sections = entries
      .map((entry) => document.getElementById(entry.slug))
      .filter((section): section is HTMLElement => section !== null);

    const updateActive = () => {
      if (navigationTarget.current) return;
      const threshold = Math.min(180, window.innerHeight * 0.25);
      let current = sections[0];
      for (const section of sections) {
        if (section.getBoundingClientRect().top <= threshold) current = section;
        else break;
      }
      if (current) setActive(current.id);
    };

    updateActive();
    document.addEventListener("scroll", updateActive, true);
    window.addEventListener("resize", updateActive);
    return () => {
      document.removeEventListener("scroll", updateActive, true);
      window.removeEventListener("resize", updateActive);
    };
  }, [entries]);

  return (
    <section className="ad-component-tree" aria-label="UI components">
      <div className="ad-component-tree-heading">
        <div>
          <p className="ad-component-tree-eyebrow">UI reference</p>
          <h4>Components</h4>
        </div>
        <span>{entries.length}</span>
      </div>
      <nav
        className="ad-component-tree-nav"
        aria-label="Components on this page"
      >
        {groups.map((group) => (
          <div className="ad-component-tree-group" key={group}>
            <p>{group}</p>
            {entries
              .filter((entry) => entry.group === group)
              .map((entry) => (
                <a
                  href={`#${entry.slug}`}
                  className={active === entry.slug ? "is-active" : undefined}
                  aria-current={active === entry.slug ? "location" : undefined}
                  onClick={() => {
                    navigationTarget.current = entry.slug;
                    setActive(entry.slug);
                    window.setTimeout(() => {
                      navigationTarget.current = null;
                    }, 900);
                  }}
                  key={entry.slug}
                >
                  <span>{entry.name}</span>
                  <small>{entry.description}</small>
                </a>
              ))}
          </div>
        ))}
      </nav>
    </section>
  );
}
