"use client";

import Link from "next/link";
import {
  useEffect,
  useRef,
  useState,
  type RefObject,
  type CSSProperties,
} from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronRight,
  Code2,
  Copy,
  Layers,
  Menu,
  Plus,
  RotateCcw,
  Sparkles,
  Terminal,
  X,
  type LucideIcon,
} from "lucide-react";
import { AgentDockBrand } from "@/components/brand";

const icons = {
  arrow: ArrowRight,
  external: ArrowUpRight,
  code: Code2,
  check: Check,
  copy: Copy,
  terminal: Terminal,
  layers: Layers,
  spark: Sparkles,
  chevron: ChevronRight,
  refresh: RotateCcw,
  close: X,
  menu: Menu,
  plus: Plus,
} satisfies Record<string, LucideIcon>;

type IconName = keyof typeof icons;
function Icon({
  name,
  className = "",
}: {
  name: IconName;
  className?: string;
}) {
  const Component = icons[name];
  return (
    <Component
      className={`ad-icon ${className}`}
      strokeWidth={1.6}
      aria-hidden="true"
    />
  );
}

function useLandingMotion(root: RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();
    media.add(
      "(prefers-reduced-motion: no-preference)",
      () => {
        const intro = gsap.timeline({
          defaults: {
            ease: "power2.out",
            duration: 0.65,
            clearProps: "transform,opacity",
          },
        });
        intro
          .from(
            ".ad-hero-copy > :not(h1)",
            { y: 12, opacity: 0, stagger: 0.07 },
            0.08,
          )
          .from(".ad-hero h1", { y: 18, opacity: 0 }, 0)
          .from(".ad-preview-wrap", { y: 22, opacity: 0, duration: 0.85 }, 0.18)
          .from(
            ".ad-hero h1 svg",
            { scaleX: 0, transformOrigin: "left center", duration: 0.7 },
            0.35,
          );
        // Animate each section independently; keep native scrolling and document flow.
        root.current
          ?.querySelectorAll<HTMLElement>(".ad-section, .ad-final")
          .forEach((section) => {
            gsap.from(section.children, {
              y: 18,
              opacity: 0,
              duration: 0.65,
              stagger: 0.09,
              ease: "power2.out",
              scrollTrigger: { trigger: section, start: "top 88%", once: true },
              clearProps: "transform,opacity",
            });
          });
      },
      root,
    );
    return () => media.revert();
  }, [root]);
}

function useContentMotion(root: RefObject<HTMLElement | null>, state: string) {
  useEffect(() => {
    const media = gsap.matchMedia();
    media.add(
      "(prefers-reduced-motion: no-preference)",
      () => {
        if (!root.current) return;
        gsap.from(root.current.children, {
          y: 10,
          opacity: 0,
          duration: 0.42,
          stagger: 0.06,
          ease: "power2.out",
          clearProps: "transform,opacity",
        });
      },
      root,
    );
    return () => media.revert();
  }, [root, state]);
}

function CopyButton({
  value,
  label = "Copy",
}: {
  value: string;
  label?: string;
}) {
  const [status, setStatus] = useState<"idle" | "copied" | "failed">("idle");
  useEffect(() => {
    if (status === "idle") return;
    const timer = setTimeout(() => setStatus("idle"), 2500);
    return () => clearTimeout(timer);
  }, [status]);
  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      setStatus("copied");
    } catch {
      setStatus("failed");
    }
  }
  return (
    <button
      className="ad-copy"
      data-status={status}
      onClick={copy}
      aria-label={
        status === "idle"
          ? label
          : status === "copied"
            ? "Copied to clipboard"
            : "Copy failed; select the code manually"
      }
    >
      <Icon name={status === "copied" ? "check" : "copy"} />
      <span aria-live="polite">
        {status === "copied"
          ? "Copied"
          : status === "failed"
            ? "Select to copy"
            : label}
      </span>
    </button>
  );
}

const scenarios = {
  research: {
    label: "Research",
    prompt: "Find the highlights. Draft an update for the team.",
    tool: "search_documents",
    summary: "3 documents found",
    title: "Ready to share the highlights",
    text: "I found the release notes and pulled together the key updates. Here’s the draft for your review.",
    action: "Send the team update",
    detail: "To: team@example.com",
    result:
      "Update sent. The team has the highlights, with links to all three source documents.",
    rejected:
      "Draft saved. The update wasn’t sent. You can revise it before sharing.",
  },
  support: {
    label: "Support",
    prompt: "Review order #1042 and prepare a customer reply.",
    tool: "lookup_order",
    summary: "Order #1042 found",
    title: "A reply, with the right context",
    text: "The order is on its way. I drafted a reply with the shipment status and tracking details.",
    action: "Send the customer reply",
    detail: "To: customer@example.com",
    result:
      "Reply sent. The customer now has their tracking details and delivery estimate.",
    rejected: "Reply saved as a draft. No message was sent to the customer.",
  },
  code: {
    label: "Code",
    prompt: "Review the changes and draft a pull request.",
    tool: "read_diff",
    summary: "4 files reviewed",
    title: "Changes reviewed. Draft ready.",
    text: "The changes add a loading state and improve keyboard navigation. I’ve prepared a pull request summary.",
    action: "Open the draft pull request",
    detail: "Branch: improve-chat-experience",
    result:
      "Draft pull request created with a summary of the changes and review notes.",
    rejected: "Summary saved. No pull request was created.",
  },
};
type Scenario = keyof typeof scenarios;
function AgentPreview() {
  const [scenario, setScenario] = useState<Scenario>("research");
  const [phase, setPhase] = useState<
    "review" | "running" | "done" | "rejected"
  >("review");
  const [expanded, setExpanded] = useState(false);
  const data = scenarios[scenario];
  const transcriptRef = useRef<HTMLDivElement>(null);
  useContentMotion(transcriptRef, scenario);
  useEffect(() => {
    if (phase !== "running") return;
    const timer = setTimeout(() => setPhase("done"), 1200);
    return () => clearTimeout(timer);
  }, [phase]);
  function choose(value: Scenario) {
    setScenario(value);
    setPhase("review");
    setExpanded(false);
  }
  return (
    <div className="ad-preview-wrap">
      <div className="ad-preview-orbit" aria-hidden="true" />
      <div className="ad-preview">
        <div className="ad-window-bar">
          <span className="ad-window-dots">
            <i />
            <i />
            <i />
          </span>
          <span>your-app / assistant</span>
          <span className="ad-preview-label">INTERACTIVE PREVIEW</span>
        </div>
        <div className="ad-preview-heading">
          <span className="ad-agent-avatar">
            <Icon name="spark" />
          </span>
          <div>
            <strong>Your agent, at work.</strong>
            <span>Powered by your graph. Designed for your app.</span>
          </div>
          <span className="ad-online">
            <i /> Demo
          </span>
        </div>
        <div
          className="ad-scenarios"
          style={
            {
              "--ad-choice": Object.keys(scenarios).indexOf(scenario),
            } as CSSProperties
          }
          role="group"
          aria-label="Choose a demo scenario"
        >
          <span className="ad-scenario-indicator" aria-hidden="true" />
          {(Object.keys(scenarios) as Scenario[]).map((key) => (
            <button
              key={key}
              aria-pressed={scenario === key}
              onClick={() => choose(key)}
            >
              {scenarios[key].label}
            </button>
          ))}
        </div>
        <div className="ad-transcript" ref={transcriptRef}>
          <div className="ad-user-message">
            <span>YOU</span>
            <p>{data.prompt}</p>
          </div>
          <div className="ad-agent-message">
            <span className="ad-mini-mark">
              <Icon name="spark" />
            </span>
            <div>
              <button
                className="ad-tool-disclosure"
                onClick={() => setExpanded(!expanded)}
                aria-expanded={expanded}
                aria-controls="demo-tool-detail"
              >
                <Icon name="check" />
                <code>{data.tool}</code>
                <span>{data.summary}</span>
                <Icon name="chevron" className={expanded ? "is-open" : ""} />
              </button>
              <div
                id="demo-tool-detail"
                className={`ad-tool-reveal ${expanded ? "is-open" : ""}`}
                aria-hidden={!expanded}
                inert={!expanded}
              >
                <div>
                  <p className="ad-tool-detail">
                    Example tool result · {data.summary}. Your app supplies the
                    tools and their data.
                  </p>
                </div>
              </div>
              <h3>{data.title}</h3>
              <p>{data.text}</p>
              {phase === "review" ? (
                <div className="ad-approval">
                  <div className="ad-approval-title">
                    <span className="ad-approval-dot" />
                    Approval required<span>YOUR CALL</span>
                  </div>
                  <strong>{data.action}</strong>
                  <span className="ad-approval-detail">{data.detail}</span>
                  <div className="ad-approval-actions">
                    <button onClick={() => setPhase("running")}>
                      <Icon name="check" />
                      Approve & continue
                    </button>
                    <button onClick={() => setPhase("rejected")}>
                      Decline
                    </button>
                  </div>
                </div>
              ) : (
                <div
                  key={phase}
                  className={`ad-demo-result ${phase}`}
                  role="status"
                >
                  {phase === "running" ? (
                    <>
                      <span className="ad-loader" />
                      Continuing the example…
                    </>
                  ) : (
                    <>
                      <Icon name={phase === "done" ? "check" : "close"} />
                      <p>{phase === "done" ? data.result : data.rejected}</p>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="ad-demo-composer">
          <span>
            {phase === "review"
              ? "Try approving or declining the action"
              : phase === "running"
                ? "The example is running…"
                : "Ready for another example?"}
          </span>
          <button
            onClick={() => {
              setPhase("review");
              setExpanded(false);
            }}
            aria-label="Replay demo"
            disabled={phase === "running"}
          >
            <Icon name="refresh" />
          </button>
        </div>
        <div className="ad-preview-foot">
          <span>
            <i />
            Streaming · Tools · Human approval
          </span>
          <span>Simulated locally. No actions are sent.</span>
        </div>
      </div>
      <div className="ad-preview-caption">
        <span className="ad-caption-line" />A little infrastructure. A much
        better experience.
      </div>
    </div>
  );
}

const examples = {
  node: {
    label: "Node / Express",
    file: "controller.ts",
    code: `import { Agentdock } from "@agentdock-ai/agentdock";

// Use the compiled LangGraph graph you already own.
const runtime = new Agentdock(graph);

// Your route authenticates and authorizes the request.
await runtime.pipe(response, {
  threadId: authorizedThreadId,
  input: { messages: [{ role: "user", content: prompt }] },
  context: trustedContext,
});`,
  },
  web: {
    label: "Web Response",
    file: "route.ts",
    code: `import { Agentdock } from "@agentdock-ai/agentdock";

const runtime = new Agentdock(graph);

// After your app validates and authorizes the request:
return runtime.toResponse({
  threadId: authorizedThreadId,
  input: { messages: [{ role: "user", content: prompt }] },
  context: trustedContext,
  signal: request.signal,
});`,
  },
  react: {
    label: "React UI",
    file: "assistant.tsx",
    code: `import { Chat } from "@/components/agentdock-ui/chat";
import type { ChatAdapter } from "@agentdock-ai/react";

// Your adapter owns requests, auth, and thread identity.
// sendMessage yields canonical Agentdock events.
const adapter: ChatAdapter = appChatAdapter;

export function Assistant() {
  return <Chat adapter={adapter} />;
}`,
  },
};
type Example = keyof typeof examples;
function HighlightedCode({ code }: { code: string }) {
  return (
    <code>
      {code.split("\n").map((line, index) => (
        <span className="ad-code-line" key={index}>
          <span className="ad-line-number" aria-hidden="true">
            {index + 1}
          </span>
          <span>
            {line
              .split(
                /(\/\/.*|"[^"]*"|\b(?:import|from|const|await|return|export|function)\b)/g,
              )
              .map((token, part) => (
                <span
                  key={part}
                  className={
                    token.startsWith("//")
                      ? "ad-syntax-comment"
                      : token.startsWith('"')
                        ? "ad-syntax-string"
                        : /^(import|from|const|await|return|export|function)$/.test(
                              token,
                            )
                          ? "ad-syntax-keyword"
                          : undefined
                  }
                >
                  {token}
                </span>
              ))}
          </span>
        </span>
      ))}
    </code>
  );
}

const faqs = [
  [
    "Is Agentdock an agent framework?",
    "Agentdock serves a graph you build with LangGraph or LangChain. Those projects own execution, models, tools, checkpoints, and interrupts. Agentdock maps events and handles streaming transports, backpressure, cancellation, and response cleanup.",
  ],
  [
    "Can I use the core without the UI?",
    "Yes. Consume the contract events directly, stream them to your own interface, or use a Node response or Web Response. Agentdock UI is an optional React layer on the same event contract.",
  ],
  [
    "Does this work with my existing application?",
    "The core fits into your existing route controllers. The UI is editable React source designed for TypeScript, Tailwind CSS 4, and shadcn semantic tokens, with Radix or Base UI primitives. Your application supplies its request adapter.",
  ],
  [
    "How do approvals and saved conversations work?",
    "LangGraph checkpoints and native interrupts hold execution state. Agentdock can read messages and pending resume state; your application authorizes every read and continuation. The UI can hydrate history and display pending approvals through its app-owned adapter.",
  ],
  [
    "Can I install Agentdock UI today?",
    "Yes. From your React app, run npx @agentdock-ai/agentdock-ui add chat. The installer copies editable chat components into your app and installs any missing dependencies. See the UI guide for requirements and options.",
  ],
];

export function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [example, setExample] = useState<Example>("node");
  const menuRef = useRef<HTMLButtonElement>(null);
  const siteRef = useRef<HTMLDivElement>(null);
  const codeRef = useRef<HTMLPreElement>(null);
  useLandingMotion(siteRef);
  useContentMotion(codeRef, example);
  useEffect(() => {
    if (!menuOpen) return;
    function escape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuRef.current?.focus();
      }
    }
    document.addEventListener("keydown", escape);
    return () => document.removeEventListener("keydown", escape);
  }, [menuOpen]);
  return (
    <div className="ad-site" ref={siteRef}>
      <a className="ad-skip" href="#main-content">
        Skip to content
      </a>
      <header className="ad-header ad-container">
        <Link href="/" aria-label="Agentdock home">
          <AgentDockBrand />
        </Link>
        <nav className="ad-nav" aria-label="Main navigation">
          <a href="#stack">The stack</a>
          <Link href="/docs/ui">UI components</Link>
          <a href="https://github.com/agentdock-ai/agentdock">
            GitHub <Icon name="external" />
          </a>
        </nav>
        <Link href="/docs" className="ad-nav-cta">
          Explore the docs <Icon name="arrow" />
        </Link>
        <button
          ref={menuRef}
          className="ad-menu-toggle"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <Icon name={menuOpen ? "close" : "menu"} />
        </button>
        {menuOpen && (
          <nav
            id="mobile-navigation"
            className="ad-mobile-nav"
            aria-label="Mobile navigation"
            onClick={() => setMenuOpen(false)}
          >
            <a href="#stack">The stack</a>
            <Link href="/docs/ui">UI components</Link>
            <a href="https://github.com/agentdock-ai/agentdock">
              GitHub <Icon name="external" />
            </a>
            <Link href="/docs">
              Explore the docs <Icon name="arrow" />
            </Link>
          </nav>
        )}
      </header>
      <main id="main-content">
        <section className="ad-hero ad-container" aria-labelledby="hero-title">
          <div className="ad-hero-copy">
            <a href="#stack" className="ad-announcement">
              <span />
              Open source. Yours to build on.
              <Icon name="arrow" />
            </a>
            <h1 id="hero-title">
              Your agent.
              <br />
              Your product.
              <br />
              <span>Connected.</span>
              <svg viewBox="0 0 340 16" fill="none" aria-hidden="true">
                <path
                  d="M3 11C88 2 231 2 336 8M17 15c94-8 222-9 307-4"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            </h1>
            <p>
              Bring your LangGraph agent into your app.
              <br className="ad-desktop-break" /> Stream every step. Put people
              in control.
              <br className="ad-desktop-break" /> Make the interface your own.
            </p>
            <div className="ad-hero-actions">
              <Link
                className="ad-button ad-button-primary"
                href="/docs/quickstart"
              >
                Start building <Icon name="arrow" />
              </Link>
              <a href="#experience" className="ad-button ad-button-quiet">
                Meet the UI <Icon name="layers" />
              </a>
            </div>
            <div className="ad-install">
              <code>npm i @agentdock-ai/agentdock</code>
              <CopyButton
                value="npm i @agentdock-ai/agentdock"
                label="Copy install command"
              />
            </div>
            <div className="ad-hero-meta">
              <span>MIT licensed</span>
              <span>TypeScript first</span>
              <span>Your infrastructure</span>
            </div>
          </div>
          <AgentPreview />
        </section>
        <div className="ad-built-with ad-container">
          <span>Fits the tools you already use</span>
          <div aria-label="Compatible technologies">
            <strong>LangGraph</strong>
            <strong>TypeScript</strong>
            <strong>React</strong>
            <strong>Tailwind CSS</strong>
          </div>
        </div>
        <section
          id="stack"
          className="ad-section ad-container"
          aria-labelledby="stack-title"
        >
          <div className="ad-section-heading">
            <div>
              <span className="ad-eyebrow">01 / THE CONNECTION</span>
              <h2 id="stack-title">
                From graph to interface.
                <br />
                <span>Without the glue code.</span>
              </h2>
            </div>
            <p>
              Three focused layers. One shared event contract.
              <br />
              Keep your agent logic and your product decisions
              <br className="ad-desktop-break" /> right where they belong.
            </p>
          </div>
          <div className="ad-flow">
            <article>
              <div className="ad-flow-top">
                <span>01</span>
                <Icon name="layers" />
              </div>
              <h3>Build your agent</h3>
              <p>
                Models, tools, and checkpoints.
                <br />
                The LangGraph graph you already own.
              </p>
              <span className="ad-flow-tag">LANGCHAIN + LANGGRAPH</span>
            </article>
            <div className="ad-flow-connector" aria-hidden="true">
              <Icon name="arrow" />
            </div>
            <article className="ad-flow-core">
              <div className="ad-flow-top">
                <span>02</span>
                <Icon name="terminal" />
              </div>
              <h3>Connect with Agentdock</h3>
              <p>
                A consistent event stream, with serving
                <br />
                mechanics taken care of.
              </p>
              <span className="ad-flow-tag">AGENTDOCK CORE</span>
            </article>
            <div className="ad-flow-connector" aria-hidden="true">
              <Icon name="arrow" />
            </div>
            <article>
              <div className="ad-flow-top">
                <span>03</span>
                <Icon name="spark" />
              </div>
              <h3>Make it your experience</h3>
              <p>
                Editable React chat components.
                <br />
                Or build your own interface.
              </p>
              <span className="ad-flow-tag">AGENTDOCK UI / YOUR UI</span>
            </article>
          </div>
          <div className="ad-ownership">
            <Icon name="check" />
            <p>
              Your application owns authentication, requests, thread identity,
              and infrastructure. Always.
            </p>
          </div>
        </section>
        <section
          id="experience"
          className="ad-section ad-container"
          aria-labelledby="experience-title"
        >
          <div className="ad-section-heading">
            <div>
              <span className="ad-eyebrow">
                02 / SMALL PIECES. BIG POSSIBILITIES.
              </span>
              <h2 id="experience-title">
                The plumbing, handled.
                <br />
                <span>The experience, yours.</span>
              </h2>
            </div>
            <Link href="/docs/ui" className="ad-text-link">
              Explore the UI guide <Icon name="arrow" />
            </Link>
          </div>
          <div className="ad-product-grid">
            <article className="ad-product ad-product-core">
              <div className="ad-product-top">
                <span className="ad-product-icon">
                  <Icon name="terminal" />
                </span>
                <span className="ad-pill">SERVER</span>
              </div>
              <h3>
                A small core.
                <br />A steady stream.
              </h3>
              <p>
                Serve your compiled graph through a Node response, a Web
                Response, or an async iterable.
              </p>
              <div
                className="ad-event-visual"
                aria-label="Example event sequence"
              >
                <div>
                  <span className="ad-event-index">01</span>
                  <code>run.started</code>
                  <span className="ad-event-check">
                    <Icon name="check" />
                  </span>
                </div>
                <div>
                  <span className="ad-event-index">02</span>
                  <code>message.part.delta</code>
                  <span className="ad-event-wave">
                    <i />
                    <i />
                    <i />
                    <i />
                    <i />
                  </span>
                </div>
                <div>
                  <span className="ad-event-index">03</span>
                  <code>tool.completed</code>
                  <span className="ad-event-check">
                    <Icon name="check" />
                  </span>
                </div>
                <div>
                  <span className="ad-event-index">04</span>
                  <code>interrupt.required</code>
                  <span className="ad-event-wait">YOUR TURN</span>
                </div>
              </div>
              <ul className="ad-product-features">
                <li>
                  <Icon name="check" />
                  Backpressure & disconnect cancellation
                </li>
                <li>
                  <Icon name="check" />
                  Native checkpoint reads & resume
                </li>
                <li>
                  <Icon name="check" />
                  One shared JSON event contract
                </li>
              </ul>
              <Link href="/docs/api-reference" className="ad-text-link">
                Get to know the core <Icon name="arrow" />
              </Link>
            </article>
            <article className="ad-product ad-product-ui">
              <div className="ad-product-top">
                <span className="ad-product-icon">
                  <Icon name="layers" />
                </span>
                <span className="ad-pill">REACT</span>
              </div>
              <h3>
                A chat interface.
                <br />
                With your fingerprints.
              </h3>
              <p>
                Copy the components into your app. Customize every detail with
                your existing theme and primitives.
              </p>
              <div className="ad-ui-visual">
                <div className="ad-ui-visual-top">
                  <Icon name="spark" />
                  <span>Built for the whole conversation</span>
                  <span className="ad-ui-badge">UI</span>
                </div>
                <div className="ad-ui-message">
                  Here’s what I found.
                  <div className="ad-ui-lines">
                    <i />
                    <i />
                  </div>
                </div>
                <div className="ad-ui-tool">
                  <Icon name="check" />
                  <span>Search complete</span>
                  <Icon name="chevron" />
                </div>
                <div className="ad-ui-input">
                  <span>Ask a follow-up…</span>
                  <span>
                    <Icon name="arrow" />
                  </span>
                </div>
              </div>
              <ul className="ad-product-features">
                <li>
                  <Icon name="check" />
                  Streaming, Markdown & tool disclosures
                </li>
                <li>
                  <Icon name="check" />
                  Approvals, cancellation & saved history
                </li>
                <li>
                  <Icon name="check" />
                  App-owned adapter. Editable source.
                </li>
              </ul>
              <Link
                href="https://github.com/agentdock-ai/agentdock-ui"
                className="ad-text-link"
              >
                Explore the UI source <Icon name="arrow" />
              </Link>
              <p className="ad-release-note">
                Install with npx @agentdock-ai/agentdock-ui add chat
              </p>
            </article>
          </div>
        </section>
        <section
          id="developers"
          className="ad-section ad-container ad-developer"
          aria-labelledby="developer-title"
        >
          <div className="ad-developer-copy">
            <span className="ad-eyebrow">03 / LESS CEREMONY</span>
            <h2 id="developer-title">
              Your graph.
              <br />A few lines.
              <br />
              <span>You’re connected.</span>
            </h2>
            <p>
              No new agent loop to learn. Put Agentdock in your route controller
              and send the events to your app.
            </p>
            <Link href="/docs/quickstart" className="ad-text-link">
              Walk through the quickstart <Icon name="arrow" />
            </Link>
            <div className="ad-developer-note">
              <Icon name="code" />
              <span>
                Use your framework.
                <br />
                Keep your model and tools.
              </span>
            </div>
          </div>
          <div className="ad-code-panel">
            <div
              className="ad-code-tabs"
              role="tablist"
              aria-label="Integration examples"
            >
              {(Object.keys(examples) as Example[]).map((key) => (
                <button
                  key={key}
                  id={`tab-${key}`}
                  role="tab"
                  aria-selected={example === key}
                  aria-controls="integration-code"
                  tabIndex={example === key ? 0 : -1}
                  onClick={() => setExample(key)}
                  onKeyDown={(event) => {
                    const keys = Object.keys(examples) as Example[];
                    const index = keys.indexOf(key);
                    const next =
                      event.key === "ArrowRight"
                        ? keys[(index + 1) % keys.length]
                        : event.key === "ArrowLeft"
                          ? keys[(index + keys.length - 1) % keys.length]
                          : event.key === "Home"
                            ? keys[0]
                            : event.key === "End"
                              ? keys[keys.length - 1]
                              : null;
                    if (next) {
                      event.preventDefault();
                      setExample(next);
                      document.getElementById(`tab-${next}`)?.focus();
                    }
                  }}
                >
                  {examples[key].label}
                </button>
              ))}
            </div>
            <div className="ad-code-file">
              <span>
                <Icon name="code" />
                {examples[example].file}
              </span>
              <CopyButton value={examples[example].code} label="Copy code" />
            </div>
            <pre
              ref={codeRef}
              id="integration-code"
              role="tabpanel"
              aria-labelledby={`tab-${example}`}
              tabIndex={0}
            >
              <HighlightedCode code={examples[example].code} />
            </pre>
            <div className="ad-code-footer">
              <span>
                <i />
                {example === "react"
                  ? "Editable components · local UI checkout"
                  : "Compiled graph → canonical events"}
              </span>
              <Link
                href={example === "react" ? "/docs/ui" : "/docs/installation"}
              >
                Setup guide <Icon name="arrow" />
              </Link>
            </div>
          </div>
        </section>
        <section
          className="ad-section ad-container ad-faq"
          aria-labelledby="faq-title"
        >
          <div>
            <span className="ad-eyebrow">A FEW GOOD QUESTIONS</span>
            <h2 id="faq-title">
              Before you
              <br />
              <span>start building.</span>
            </h2>
            <p>
              More details in the{" "}
              <Link href="/docs">
                documentation <Icon name="external" />
              </Link>
            </p>
          </div>
          <div className="ad-faq-list">
            {faqs.map(([question, answer]) => (
              <details key={question}>
                <summary>
                  {question}
                  <span aria-hidden="true">
                    <Icon name="plus" />
                  </span>
                </summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </section>
        <section
          className="ad-final ad-container"
          aria-labelledby="final-title"
        >
          <div className="ad-final-grid" aria-hidden="true" />
          <span className="ad-eyebrow">
            BUILD SOMETHING THAT FEELS LIKE YOURS.
          </span>
          <h2 id="final-title">
            Great agents deserve
            <br />
            <span>a great experience.</span>
          </h2>
          <p>Start with your graph. We’ll help you connect the rest.</p>
          <div>
            <Link
              href="/docs/quickstart"
              className="ad-button ad-button-primary"
            >
              Start building <Icon name="arrow" />
            </Link>
            <a
              href="https://github.com/agentdock-ai/agentdock"
              className="ad-button ad-button-outline"
            >
              Explore on GitHub <Icon name="code" />
            </a>
          </div>
          <span className="ad-final-footnote">
            Open source · MIT licensed · Built to be yours
          </span>
        </section>
      </main>
      <footer className="ad-footer ad-container">
        <div>
          <Link href="/" aria-label="Agentdock home">
            <AgentDockBrand />
          </Link>
          <p>The connection between your agent and your app.</p>
        </div>
        <nav aria-label="Footer navigation">
          <Link href="/docs">Documentation</Link>
          <Link href="/docs/ui">Agentdock UI</Link>
          <a href="https://github.com/agentdock-ai/agentdock">
            GitHub <Icon name="external" />
          </a>
          <a href="https://github.com/agentdock-ai/agentdock/blob/main/LICENSE">
            MIT license <Icon name="external" />
          </a>
        </nav>
        <p className="ad-maker">
          Made by{" "}
          <a href="https://muhammad-zain.com">
            Muhammad Zain <Icon name="external" />
          </a>
        </p>
      </footer>
    </div>
  );
}
