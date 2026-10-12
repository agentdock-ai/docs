"use client";

import { useState } from "react";
import type { UIComponentEntry } from "@/components/ui-component-catalog";

export function UIComponentDetail({
  component,
}: {
  component: UIComponentEntry;
}) {
  const [tab, setTab] = useState<"preview" | "usage">("preview");
  const [copied, setCopied] = useState(false);

  async function copyUsage() {
    await navigator.clipboard.writeText(component.usage);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  return (
    <section
      className="ad-component-detail"
      aria-label={`${component.name} example`}
    >
      <div
        className="ad-component-tabs"
        role="tablist"
        aria-label="Example view"
      >
        <button
          id="component-preview-tab"
          type="button"
          role="tab"
          aria-selected={tab === "preview"}
          aria-controls="component-preview-panel"
          onClick={() => setTab("preview")}
        >
          Preview
        </button>
        <button
          id="component-usage-tab"
          type="button"
          role="tab"
          aria-selected={tab === "usage"}
          aria-controls="component-usage-panel"
          onClick={() => setTab("usage")}
        >
          Usage
        </button>
      </div>

      {tab === "preview" ? (
        <div
          id="component-preview-panel"
          className="ad-component-preview-panel"
          role="tabpanel"
          aria-labelledby="component-preview-tab"
        >
          <img
            className="ad-component-image-light"
            src={`/ui-components/${component.image}.png`}
            alt={`${component.name} as rendered in the Agentdock UI playground`}
          />
          <img
            className="ad-component-image-dark"
            src={`/ui-components/${component.image}-dark.png`}
            alt=""
            aria-hidden="true"
          />
          <p>
            Rendered from the component’s sample in the Agentdock UI playground.
          </p>
        </div>
      ) : (
        <div
          id="component-usage-panel"
          className="ad-component-code-panel"
          role="tabpanel"
          aria-labelledby="component-usage-tab"
        >
          <div className="ad-component-code-heading">
            <span>Usage example</span>
            <button type="button" onClick={() => void copyUsage()}>
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
          <pre>
            <code>{component.usage}</code>
          </pre>
        </div>
      )}

      <a
        className="ad-component-source-link"
        href={component.source}
        target="_blank"
        rel="noreferrer"
      >
        View component source on GitHub ↗
      </a>
    </section>
  );
}
