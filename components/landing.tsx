"use client";

import "./landing.css";
import Link from "next/link";
import {
  Fragment,
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent as ReactKeyboardEvent,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
  type RefObject,
} from "react";
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
  Send,
  ShieldCheck,
  Sparkles,
  Terminal,
  Workflow,
  X,
  type LucideIcon,
} from "lucide-react";
import { AgentdockBrand } from "@/components/brand";

const icons = {
  arrow: ArrowRight,
  external: ArrowUpRight,
  check: Check,
  chevron: ChevronRight,
  code: Code2,
  copy: Copy,
  layers: Layers,
  menu: Menu,
  plus: Plus,
  refresh: RotateCcw,
  send: Send,
  shield: ShieldCheck,
  spark: Sparkles,
  terminal: Terminal,
  workflow: Workflow,
  close: X,
} satisfies Record<string, LucideIcon>;

type IconName = keyof typeof icons;

function Icon({ name, className = "" }: { name: IconName; className?: string }) {
  const Component = icons[name];
  return (
    <Component
      className={`ad-icon ${className}`.trim()}
      strokeWidth={1.75}
      aria-hidden="true"
    />
  );
}

/* ------------------------------------------------------------------ */
/* Motion helpers                                                      */
/* ------------------------------------------------------------------ */

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/** Reveals `[data-reveal]` elements once as they enter the viewport. */
function useReveal(root: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const node = root.current;
    if (!node) return;
    const targets = node.querySelectorAll<HTMLElement>("[data-reveal]");
    if (prefersReducedMotion() || !("IntersectionObserver" in window)) {
      targets.forEach((target) => target.classList.add("is-in"));
      return;
    }
    node.dataset.motion = "on";
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-in");
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.08 },
    );
    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, [root]);
}

/** Tracks scroll progress and whether the page has left the top. */
function useScrollState(root: RefObject<HTMLElement | null>) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    let frame = 0;
    function update() {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? window.scrollY / max : 0;
      root.current?.style.setProperty("--ad-progress", progress.toFixed(4));
      setScrolled(window.scrollY > 8);
    }
    function schedule() {
      if (!frame) frame = requestAnimationFrame(update);
    }
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [root]);
  return scrolled;
}

/** Writes pointer coordinates to CSS variables for spotlight surfaces. */
function trackPointer(event: ReactPointerEvent<HTMLElement>) {
  const target = event.currentTarget;
  const rect = target.getBoundingClientRect();
  target.style.setProperty("--mx", `${event.clientX - rect.left}px`);
  target.style.setProperty("--my", `${event.clientY - rect.top}px`);
}

/** Nudges an element a few pixels toward the pointer. */
function magnetize(event: ReactPointerEvent<HTMLElement>) {
  if (event.pointerType !== "mouse") return;
  const target = event.currentTarget;
  const rect = target.getBoundingClientRect();
  const x = (event.clientX - rect.left - rect.width / 2) / rect.width;
  const y = (event.clientY - rect.top - rect.height / 2) / rect.height;
  target.style.setProperty("--tx", `${(x * 6).toFixed(2)}px`);
  target.style.setProperty("--ty", `${(y * 5).toFixed(2)}px`);
}

function demagnetize(event: ReactPointerEvent<HTMLElement>) {
  event.currentTarget.style.setProperty("--tx", "0px");
  event.currentTarget.style.setProperty("--ty", "0px");
}

const magnetic = { onPointerMove: magnetize, onPointerLeave: demagnetize };

/** Moves a pill indicator under the hovered or selected item of a group. */
function useIndicator<T extends HTMLElement>(
  container: RefObject<T | null>,
  selector: string,
  active?: string,
) {
  const place = useCallback(
    (item: HTMLElement | null) => {
      const node = container.current;
      if (!node) return;
      if (!item) {
        node.style.setProperty("--pill-o", "0");
        return;
      }
      node.style.setProperty("--pill-x", `${item.offsetLeft}px`);
      node.style.setProperty("--pill-w", `${item.offsetWidth}px`);
      node.style.setProperty("--pill-o", "1");
    },
    [container],
  );
  const reset = useCallback(() => {
    const node = container.current;
    if (!node) return;
    const selected = active
      ? node.querySelector<HTMLElement>(`${selector}[data-key="${active}"]`)
      : null;
    place(selected);
  }, [active, container, place, selector]);
  useEffect(() => {
    reset();
    const node = container.current;
    if (!node || !("ResizeObserver" in window)) return;
    const observer = new ResizeObserver(reset);
    observer.observe(node);
    return () => observer.disconnect();
  }, [container, reset]);
  return { place, reset };
}

/* ------------------------------------------------------------------ */
/* Copy                                                                */
/* ------------------------------------------------------------------ */

function CopyButton({
  value,
  label = "Copy",
  showLabel = false,
  tone = "light",
}: {
  value: string;
  label?: string;
  showLabel?: boolean;
  tone?: "light" | "dark";
}) {
  const [status, setStatus] = useState<"idle" | "copied" | "failed">("idle");
  useEffect(() => {
    if (status === "idle") return;
    const timer = setTimeout(() => setStatus("idle"), 2000);
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
  const message =
    status === "copied"
      ? "Copied"
      : status === "failed"
        ? "Select to copy"
        : label;
  return (
    <button
      type="button"
      className={`ad-copy ad-copy-${tone} ${showLabel ? "has-label" : ""}`}
      data-status={status}
      onClick={copy}
      aria-label={status === "idle" ? label : message}
    >
      <span className="ad-copy-icons" aria-hidden="true">
        <Icon name="copy" className="ad-copy-idle" />
        <Icon name="check" className="ad-copy-done" />
      </span>
      {showLabel && <span className="ad-copy-label">{message}</span>}
      {!showLabel && (
        <span className="ad-copy-tip" aria-hidden="true">
          {status === "idle" ? "Copy" : message}
        </span>
      )}
      <span className="ad-sr" aria-live="polite">
        {status === "idle" ? "" : message}
      </span>
    </button>
  );
}

/* ------------------------------------------------------------------ */
/* Hero demo: a simulated event stream driving a chat interface        */
/* ------------------------------------------------------------------ */

const scenarios = {
  research: {
    label: "Research",
    prompt: "Find this week's release highlights and draft a team update.",
    tool: "search_documents",
    summary: "3 documents",
    detail: "release-notes.md, changelog.md, roadmap.md",
    text: "I pulled the key changes from the release notes and changelog. The draft covers the new approval flow, faster streaming, and two bug fixes.",
    interrupt: "send_email",
    action: "Send the team update",
    target: "team@example.com",
    approved: "Update sent to the team with links to all three documents.",
    declined: "Draft kept. Nothing was sent.",
  },
  support: {
    label: "Support",
    prompt: "Check order #1042 and prepare a reply for the customer.",
    tool: "lookup_order",
    summary: "Order #1042",
    detail: "Shipped Tuesday, arriving Friday, tracking 1Z84",
    text: "The order shipped on Tuesday and should arrive Friday. I drafted a reply with the tracking link and delivery estimate.",
    interrupt: "send_reply",
    action: "Send the customer reply",
    target: "customer@example.com",
    approved: "Reply sent with tracking details and the delivery estimate.",
    declined: "Reply kept as a draft. The customer was not contacted.",
  },
  code: {
    label: "Code",
    prompt: "Review the branch and open a draft pull request.",
    tool: "read_diff",
    summary: "4 files",
    detail: "composer.tsx, message-list.tsx, +2 more",
    text: "The branch adds a loading state to the composer and improves keyboard navigation in the message list. The summary and review notes are ready.",
    interrupt: "open_pull_request",
    action: "Open a draft pull request",
    target: "improve-chat-experience",
    approved: "Draft pull request opened with the summary and review notes.",
    declined: "Summary kept. No pull request was opened.",
  },
};

type Scenario = keyof typeof scenarios;
const scenarioKeys = Object.keys(scenarios) as Scenario[];

type DemoUi = {
  tool: "idle" | "running" | "done";
  chars: number;
  approval: "hidden" | "pending" | "approved" | "declined";
  action: "idle" | "running" | "done";
  status: "idle" | "working" | "waiting" | "done";
};

type DemoEvent = {
  id: number;
  at: number;
  type: string;
  detail: string;
  count?: number;
};

type DemoStep = {
  wait: number;
  type: string;
  detail: string;
  ui?: (ui: DemoUi) => Partial<DemoUi>;
};

const idleUi: DemoUi = {
  tool: "idle",
  chars: 0,
  approval: "hidden",
  action: "idle",
  status: "idle",
};

function startSteps(key: Scenario): DemoStep[] {
  const data = scenarios[key];
  const words = data.text.split(" ");
  const deltas: DemoStep[] = [];
  for (let index = 0; index < words.length; index += 3) {
    const chars = words.slice(0, index + 3).join(" ").length;
    deltas.push({
      wait: 90,
      type: "message.part.delta",
      detail: "text",
      ui: () => ({ chars }),
    });
  }
  return [
    {
      wait: 250,
      type: "run.started",
      detail: "thread_8f2c",
      ui: () => ({ status: "working" }),
    },
    {
      wait: 380,
      type: "tool.called",
      detail: data.tool,
      ui: () => ({ tool: "running" }),
    },
    {
      wait: 1000,
      type: "tool.completed",
      detail: data.summary,
      ui: () => ({ tool: "done" }),
    },
    { wait: 320, type: "message.started", detail: "assistant" },
    ...deltas,
    {
      wait: 200,
      type: "message.completed",
      detail: `${data.text.length} chars`,
      ui: () => ({ chars: data.text.length }),
    },
    {
      wait: 420,
      type: "interrupt.required",
      detail: data.interrupt,
      ui: () => ({ approval: "pending" }),
    },
    {
      wait: 160,
      type: "run.paused",
      detail: "awaiting approval",
      ui: () => ({ status: "waiting" }),
    },
  ];
}

function resumeSteps(key: Scenario, approved: boolean): DemoStep[] {
  const data = scenarios[key];
  const resolved: DemoStep[] = [
    {
      wait: 120,
      type: "run.started",
      detail: "resume",
      ui: () => ({ status: "working" }),
    },
    {
      wait: 240,
      type: "interrupt.resolved",
      detail: approved ? "approved" : "declined",
      ui: () =>
        approved
          ? { approval: "approved", action: "running" }
          : { approval: "declined" },
    },
  ];
  const finish: DemoStep = {
    wait: 260,
    type: "run.completed",
    detail: "ok",
    ui: () => ({ status: "done" }),
  };
  if (!approved) return [...resolved, finish];
  return [
    ...resolved,
    { wait: 300, type: "tool.called", detail: data.interrupt },
    {
      wait: 900,
      type: "tool.completed",
      detail: "ok",
      ui: () => ({ action: "done" }),
    },
    finish,
  ];
}

function eventTone(type: string) {
  if (type.startsWith("interrupt")) return "amber";
  if (type.startsWith("tool")) return "teal";
  if (type.startsWith("message")) return "violet";
  if (type === "run.completed") return "green";
  return "ink";
}

type DemoRun = {
  scenario: Scenario;
  mode: "start" | "approve" | "decline";
  nonce: number;
};

function AgentDemo() {
  const [scenario, setScenario] = useState<Scenario>("research");
  const [run, setRun] = useState<DemoRun | null>(null);
  const [ui, setUi] = useState<DemoUi>(idleUi);
  const [events, setEvents] = useState<DemoEvent[]>([]);
  const [expanded, setExpanded] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const logRef = useRef<HTMLOListElement>(null);
  const clock = useRef(0);
  const ids = useRef(0);
  const tabsRef = useRef<HTMLDivElement>(null);
  const tabs = useIndicator(tabsRef, "button", scenario);
  const data = scenarios[scenario];

  // Start the first run once the demo is on screen.
  useEffect(() => {
    const node = rootRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setRun({ scenario: "research", mode: "start", nonce: 0 });
        observer.disconnect();
      },
      { threshold: 0.15 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!run) return;
    const instant = prefersReducedMotion();
    const steps =
      run.mode === "start"
        ? startSteps(run.scenario)
        : resumeSteps(run.scenario, run.mode === "approve");
    if (run.mode === "start") {
      clock.current = 0;
      setUi(idleUi);
      setEvents([]);
      setExpanded(false);
    }
    const timers: ReturnType<typeof setTimeout>[] = [];
    let elapsed = 0;
    for (const step of steps) {
      elapsed += instant ? 0 : step.wait;
      timers.push(
        setTimeout(() => {
          clock.current += step.wait;
          const at = clock.current;
          if (step.ui) setUi((current) => ({ ...current, ...step.ui!(current) }));
          setEvents((current) => {
            const last = current[current.length - 1];
            if (last && last.type === step.type && step.type === "message.part.delta") {
              return [
                ...current.slice(0, -1),
                { ...last, at, count: (last.count ?? 1) + 1 },
              ];
            }
            ids.current += 1;
            return [
              ...current,
              { id: ids.current, at, type: step.type, detail: step.detail },
            ];
          });
        }, elapsed),
      );
    }
    return () => timers.forEach(clearTimeout);
  }, [run]);

  // Keep the newest event in view inside the log, never scrolling the page.
  useEffect(() => {
    const log = logRef.current;
    if (!log) return;
    log.scrollTo({
      top: log.scrollHeight,
      behavior: prefersReducedMotion() ? "auto" : "smooth",
    });
  }, [events]);

  function choose(key: Scenario) {
    setScenario(key);
    setRun((current) => ({
      scenario: key,
      mode: "start",
      nonce: (current?.nonce ?? 0) + 1,
    }));
  }

  function resolve(mode: "approve" | "decline") {
    setRun((current) => ({
      scenario,
      mode,
      nonce: (current?.nonce ?? 0) + 1,
    }));
  }

  function onTabKey(event: ReactKeyboardEvent<HTMLButtonElement>, key: Scenario) {
    const index = scenarioKeys.indexOf(key);
    const next =
      event.key === "ArrowRight"
        ? scenarioKeys[(index + 1) % scenarioKeys.length]
        : event.key === "ArrowLeft"
          ? scenarioKeys[(index + scenarioKeys.length - 1) % scenarioKeys.length]
          : null;
    if (!next) return;
    event.preventDefault();
    choose(next);
    tabsRef.current
      ?.querySelector<HTMLButtonElement>(`[data-key="${next}"]`)
      ?.focus();
  }

  const statusLabel = {
    idle: "Ready",
    working: "Streaming",
    waiting: "Waiting for you",
    done: "Complete",
  }[ui.status];

  const streaming = ui.chars > 0 && ui.chars < data.text.length;

  return (
    <div className="ad-demo" ref={rootRef}>
      <div className="ad-demo-glow" aria-hidden="true" />
      <div className="ad-demo-frame">
        <div className="ad-demo-bar">
          <div
            className="ad-segment"
            ref={tabsRef}
            role="group"
            aria-label="Choose a demo scenario"
          >
            <span className="ad-pill-indicator" aria-hidden="true" />
            {scenarioKeys.map((key) => (
              <button
                key={key}
                type="button"
                data-key={key}
                aria-pressed={scenario === key}
                tabIndex={scenario === key ? 0 : -1}
                onClick={() => choose(key)}
                onKeyDown={(event) => onTabKey(event, key)}
              >
                {scenarios[key].label}
              </button>
            ))}
          </div>
          <span className="ad-demo-url" aria-hidden="true">
            your-app.com/assistant
          </span>
          <button
            type="button"
            className="ad-icon-button"
            onClick={() => choose(scenario)}
            aria-label="Replay this scenario"
          >
            <Icon name="refresh" />
          </button>
        </div>

        <div className="ad-demo-body">
          <div className="ad-chat">
            <div className="ad-chat-head">
              <span className="ad-chat-avatar" aria-hidden="true">
                <Icon name="spark" />
              </span>
              <span className="ad-chat-title">
                <strong>Assistant</strong>
                <span>Runs your graph</span>
              </span>
              <span className="ad-status" data-status={ui.status}>
                <i aria-hidden="true" />
                {statusLabel}
              </span>
            </div>

            <div className="ad-chat-scroll">
              <p className="ad-bubble-user" key={`prompt-${scenario}-${run?.nonce}`}>
                {data.prompt}
              </p>

              {ui.tool !== "idle" && (
                <div className="ad-tool" data-state={ui.tool}>
                  <button
                    type="button"
                    onClick={() => setExpanded(!expanded)}
                    aria-expanded={expanded}
                    aria-controls="ad-tool-detail"
                    disabled={ui.tool !== "done"}
                  >
                    <span className="ad-tool-mark" aria-hidden="true">
                      {ui.tool === "done" ? <Icon name="check" /> : <span className="ad-spinner" />}
                    </span>
                    <code>{data.tool}</code>
                    <span className="ad-tool-summary">
                      {ui.tool === "done" ? data.summary : "Running"}
                    </span>
                    <Icon name="chevron" className="ad-tool-chevron" />
                  </button>
                  <div
                    id="ad-tool-detail"
                    className="ad-collapse"
                    data-open={expanded}
                    inert={!expanded}
                  >
                    <div>
                      <p>{data.detail}</p>
                    </div>
                  </div>
                </div>
              )}

              {ui.chars > 0 && (
                <p className="ad-bubble-agent">
                  {data.text.slice(0, ui.chars)}
                  {streaming && <span className="ad-caret" aria-hidden="true" />}
                </p>
              )}

              {ui.approval === "pending" && (
                <div className="ad-approval" role="group" aria-label="Approval required">
                  <div className="ad-approval-head">
                    <Icon name="shield" />
                    <span>Needs your approval</span>
                  </div>
                  <strong>{data.action}</strong>
                  <span className="ad-approval-target">{data.target}</span>
                  <div className="ad-approval-actions">
                    <button
                      type="button"
                      className="ad-btn ad-btn-primary ad-btn-sm"
                      onClick={() => resolve("approve")}
                    >
                      <Icon name="check" />
                      Approve
                    </button>
                    <button
                      type="button"
                      className="ad-btn ad-btn-ghost ad-btn-sm"
                      onClick={() => resolve("decline")}
                    >
                      Decline
                    </button>
                  </div>
                </div>
              )}

              {ui.approval === "approved" && (
                <div className="ad-outcome" data-state={ui.action} role="status">
                  {ui.action === "done" ? (
                    <>
                      <Icon name="check" />
                      <span>{data.approved}</span>
                    </>
                  ) : (
                    <>
                      <span className="ad-spinner" aria-hidden="true" />
                      <span>Running {data.interrupt}</span>
                    </>
                  )}
                </div>
              )}

              {ui.approval === "declined" && (
                <div className="ad-outcome" data-state="declined" role="status">
                  <Icon name="close" />
                  <span>{data.declined}</span>
                </div>
              )}
            </div>

            <div className="ad-composer" aria-hidden="true">
              <span>
                {ui.status === "waiting"
                  ? "Approve or decline to continue"
                  : ui.status === "done"
                    ? "Pick another scenario or replay"
                    : "Ask a follow-up"}
              </span>
              <span className="ad-composer-send">
                <Icon name="send" />
              </span>
            </div>
          </div>

          <div className="ad-stream" aria-label="Agentdock events for this run">
            <div className="ad-stream-head">
              <span className="ad-stream-title">
                <i aria-hidden="true" data-live={ui.status === "working"} />
                Event stream
              </span>
              <span className="ad-stream-count">{events.length} events</span>
            </div>
            <ol className="ad-stream-log" ref={logRef}>
              {events.map((event) => (
                <li key={event.id} data-tone={eventTone(event.type)}>
                  <span className="ad-stream-time">
                    {(event.at / 1000).toFixed(2)}s
                  </span>
                  <span className="ad-stream-dot" aria-hidden="true" />
                  <code>{event.type}</code>
                  <span className="ad-stream-detail">
                    {event.count ? (
                      <span className="ad-stream-tally" key={event.count}>
                        x{event.count}
                      </span>
                    ) : (
                      event.detail
                    )}
                  </span>
                </li>
              ))}
              {events.length === 0 && (
                <li className="ad-stream-empty">Waiting for the run to start</li>
              )}
            </ol>
            <p className="ad-stream-foot">
              The same events reach Node, Web Response, and React clients.
            </p>
          </div>
        </div>
      </div>
      <p className="ad-demo-note">
        A local simulation. Approve or decline to watch the run resume.
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Code samples                                                        */
/* ------------------------------------------------------------------ */

const examples = {
  node: {
    label: "Node",
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
const exampleKeys = Object.keys(examples) as Example[];
const keywordPattern =
  /(\/\/.*|"[^"]*"|\b(?:import|from|const|await|return|export|function|type|new)\b)/g;

function HighlightedCode({ code }: { code: string }) {
  return (
    <code>
      {code.split("\n").map((line, index) => (
        <span
          className="ad-code-line"
          key={index}
          style={{ "--i": index } as CSSProperties}
        >
          <span className="ad-line-number" aria-hidden="true">
            {index + 1}
          </span>
          <span>
            {line.split(keywordPattern).map((token, part) => (
              <span
                key={part}
                className={
                  token.startsWith("//")
                    ? "ad-tok-comment"
                    : token.startsWith('"')
                      ? "ad-tok-string"
                      : /^(import|from|const|await|return|export|function|type|new)$/.test(token)
                        ? "ad-tok-keyword"
                        : undefined
                }
              >
                {token}
              </span>
            ))}
            {line === "" ? " " : null}
          </span>
        </span>
      ))}
    </code>
  );
}

function CodePanel() {
  const [example, setExample] = useState<Example>("node");
  const tabsRef = useRef<HTMLDivElement>(null);
  useIndicator(tabsRef, "button", example);
  function onKey(event: ReactKeyboardEvent<HTMLButtonElement>, key: Example) {
    const index = exampleKeys.indexOf(key);
    const next =
      event.key === "ArrowRight"
        ? exampleKeys[(index + 1) % exampleKeys.length]
        : event.key === "ArrowLeft"
          ? exampleKeys[(index + exampleKeys.length - 1) % exampleKeys.length]
          : event.key === "Home"
            ? exampleKeys[0]
            : event.key === "End"
              ? exampleKeys[exampleKeys.length - 1]
              : null;
    if (!next) return;
    event.preventDefault();
    setExample(next);
    document.getElementById(`ad-tab-${next}`)?.focus();
  }
  return (
    <div className="ad-code" data-reveal style={{ "--d": "120ms" } as CSSProperties}>
      <div className="ad-code-head">
        <div
          className="ad-code-tabs"
          ref={tabsRef}
          role="tablist"
          aria-label="Integration examples"
        >
          <span className="ad-pill-indicator" aria-hidden="true" />
          {exampleKeys.map((key) => (
            <button
              key={key}
              id={`ad-tab-${key}`}
              type="button"
              data-key={key}
              role="tab"
              aria-selected={example === key}
              aria-controls="ad-code-panel"
              tabIndex={example === key ? 0 : -1}
              onClick={() => setExample(key)}
              onKeyDown={(event) => onKey(event, key)}
            >
              {examples[key].label}
            </button>
          ))}
        </div>
        <CopyButton value={examples[example].code} label="Copy code" tone="dark" />
      </div>
      <div className="ad-code-file">
        <Icon name="code" />
        <span key={example}>{examples[example].file}</span>
      </div>
      <pre
        id="ad-code-panel"
        role="tabpanel"
        aria-labelledby={`ad-tab-${example}`}
        tabIndex={0}
        key={example}
      >
        <HighlightedCode code={examples[example].code} />
      </pre>
      <div className="ad-code-foot">
        <span>
          {example === "react"
            ? "Editable components from the npm installer"
            : "Compiled graph in, canonical events out"}
        </span>
        <Link
          className="ad-link"
          href={example === "react" ? "/docs/ui" : "/docs/installation"}
        >
          Setup guide <Icon name="arrow" />
        </Link>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* FAQ                                                                 */
/* ------------------------------------------------------------------ */

const faqs = [
  [
    "Is Agentdock an agent framework?",
    "No. Agentdock serves a graph you build with LangGraph or LangChain. Those projects own execution, models, tools, checkpoints, and interrupts. Agentdock maps events and handles streaming transports, backpressure, cancellation, and response cleanup.",
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
    "Yes. From your React app, run npx @agentdock-ai/agentdock-ui add chat. The installer copies editable chat components into your app and installs any missing dependencies.",
  ],
] as const;

function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="ad-faq-list">
      {faqs.map(([question, answer], index) => {
        const isOpen = open === index;
        return (
          <div
            className="ad-faq-item"
            data-open={isOpen}
            key={question}
            data-reveal
            style={{ "--d": `${index * 60}ms` } as CSSProperties}
          >
            <h3>
              <button
                type="button"
                id={`ad-faq-q-${index}`}
                aria-expanded={isOpen}
                aria-controls={`ad-faq-a-${index}`}
                onClick={() => setOpen(isOpen ? null : index)}
              >
                <span>{question}</span>
                <span className="ad-faq-toggle" aria-hidden="true">
                  <Icon name="plus" />
                </span>
              </button>
            </h3>
            <div
              id={`ad-faq-a-${index}`}
              className="ad-collapse"
              data-open={isOpen}
              role="region"
              aria-labelledby={`ad-faq-q-${index}`}
              inert={!isOpen}
            >
              <div>
                <p>{answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

const installCommand = "npm i @agentdock-ai/agentdock";

const agentImplementationPrompt = `Read https://agentdock-ai.vercel.app/skills.md and the relevant Agentdock docs. Inspect my app, then ask me these unanswered questions and wait before coding:
- Who will use the agent, and what should it help them do?
- What framework, APIs, authentication, and deployment setup does the app use?
- How should threads and conversation history be identified and stored?
- Which tools or side effects are needed, and what requires approval?
- What UI, file uploads, constraints, and success criteria do I need?
Ask only what the code does not answer. After I respond, implement the smallest suitable solution with LangGraph and Agentdock; use Agentdock UI if a chat interface is needed. Keep secrets, authorization, trusted thread IDs, and persistence app-owned. Use canonical Agentdock events and a stable ChatAdapter. Verify relevant checks and summarize.`;

const navLinks = [
  { href: "#how", label: "How it works", external: false },
  { href: "/docs/ui", label: "UI components", external: false },
  { href: "/docs/api-reference", label: "API", external: false },
  {
    href: "https://github.com/agentdock-ai/agentdock",
    label: "GitHub",
    external: true,
  },
];

const stages = [
  {
    icon: "workflow" as const,
    owner: "LangGraph",
    title: "Your graph",
    text: "Models, tools, checkpoints, and interrupts stay in the graph you already wrote.",
  },
  {
    icon: "terminal" as const,
    owner: "Agentdock core",
    title: "One event stream",
    text: "Graph output becomes canonical events, with backpressure, cancellation, and cleanup handled.",
  },
  {
    icon: "layers" as const,
    owner: "Agentdock UI or yours",
    title: "Your interface",
    text: "Render with editable React components, or consume the events in any client you build.",
  },
];

const coreEvents = [
  { type: "run.started", tone: "ink", tail: "check" },
  { type: "tool.completed", tone: "teal", tail: "check" },
  { type: "message.part.delta", tone: "violet", tail: "wave" },
  { type: "interrupt.required", tone: "amber", tail: "turn" },
] as const;

function SectionHeading({
  id,
  title,
  children,
  aside,
}: {
  id: string;
  title: ReactNode;
  children?: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <div className="ad-heading" data-reveal>
      <div>
        <h2 id={id}>{title}</h2>
        {children && <p>{children}</p>}
      </div>
      {aside}
    </div>
  );
}

function HeroTitle({ text }: { text: string }) {
  return (
    <h1 id="hero-title" aria-label={text}>
      {text.split(" ").map((word, index) => (
        <Fragment key={index}>
          <span className="ad-word" aria-hidden="true">
            <span style={{ "--i": index } as CSSProperties}>{word}</span>
          </span>{" "}
        </Fragment>
      ))}
    </h1>
  );
}

export function LandingPage({ className = "" }: { className?: string }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const siteRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLButtonElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const scrolled = useScrollState(siteRef);
  const nav = useIndicator(navRef, "a");
  useReveal(siteRef);

  useEffect(() => {
    if (!menuOpen) return;
    function onKey(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      setMenuOpen(false);
      menuRef.current?.focus();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <div className={`ad-site ${className}`.trim()} ref={siteRef}>
      <a className="ad-skip" href="#main-content">
        Skip to content
      </a>
      <div className="ad-progress" aria-hidden="true" />

      <header className="ad-header" data-scrolled={scrolled || menuOpen}>
        <div className="ad-container ad-header-inner">
          <Link href="/" aria-label="Agentdock home" className="ad-home">
            <AgentdockBrand />
          </Link>
          <nav
            className="ad-nav"
            aria-label="Main navigation"
            ref={navRef}
            onPointerLeave={nav.reset}
          >
            <span className="ad-pill-indicator" aria-hidden="true" />
            {navLinks.map((link) =>
              link.external ? (
                <a
                  key={link.href}
                  href={link.href}
                  onPointerEnter={(event) => nav.place(event.currentTarget)}
                >
                  {link.label} <Icon name="external" />
                </a>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  onPointerEnter={(event) => nav.place(event.currentTarget)}
                >
                  {link.label}
                </Link>
              ),
            )}
          </nav>
          <Link href="/docs" className="ad-btn ad-btn-primary ad-btn-sm ad-header-cta" {...magnetic}>
            Read the docs <Icon name="arrow" />
          </Link>
          <button
            ref={menuRef}
            type="button"
            className="ad-menu-toggle"
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={menuOpen}
            aria-controls="ad-mobile-nav"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span data-open={menuOpen} aria-hidden="true">
              <i />
              <i />
            </span>
          </button>
        </div>
        <nav
          id="ad-mobile-nav"
          className="ad-mobile-nav"
          data-open={menuOpen}
          aria-label="Mobile navigation"
          inert={!menuOpen}
          onClick={(event) => {
            if ((event.target as HTMLElement).closest("a")) setMenuOpen(false);
          }}
        >
          {navLinks.map((link, index) => (
            <a
              key={link.href}
              href={link.href}
              style={{ "--i": index } as CSSProperties}
            >
              {link.label}
              <Icon name={link.external ? "external" : "arrow"} />
            </a>
          ))}
          <Link
            href="/docs"
            className="ad-btn ad-btn-primary"
            style={{ "--i": navLinks.length } as CSSProperties}
          >
            Read the docs <Icon name="arrow" />
          </Link>
        </nav>
      </header>

      <main id="main-content">
        <section className="ad-hero" aria-labelledby="hero-title">
          <div className="ad-hero-backdrop" aria-hidden="true" />
          <div className="ad-container ad-hero-grid">
            <div className="ad-hero-copy">
              <a
                className="ad-badge"
                href="https://github.com/agentdock-ai/agentdock"
              >
                <i aria-hidden="true" />
                Open source and MIT licensed
                <Icon name="arrow" />
              </a>
              <HeroTitle text="Put your LangGraph agent inside your product." />
            </div>
            <div className="ad-hero-side">
              <p>
                Agentdock serves a compiled graph as one typed event stream.
                Pipe it to Node, return a Web Response, or render it with
                editable React chat components.
              </p>
              <div className="ad-hero-actions">
                <Link
                  className="ad-btn ad-btn-primary"
                  href="/docs/quickstart"
                  {...magnetic}
                >
                  Start building <Icon name="arrow" />
                </Link>
                <div className="ad-install">
                  <span aria-hidden="true">$</span>
                  <code>{installCommand}</code>
                  <CopyButton value={installCommand} label="Copy install command" />
                </div>
              </div>
            </div>
          </div>
          <div className="ad-container ad-hero-demo">
            <AgentDemo />
          </div>
        </section>

        <div className="ad-container ad-fits" data-reveal>
          <span>Fits the stack you already use</span>
          <ul aria-label="Compatible technologies">
            {["LangGraph", "TypeScript", "Node.js", "React", "Tailwind CSS"].map(
              (name) => (
                <li key={name}>{name}</li>
              ),
            )}
          </ul>
        </div>

        <section id="how" className="ad-section ad-container" aria-labelledby="how-title">
          <SectionHeading id="how-title" title="Three layers. One event contract.">
            Your graph does the thinking. Agentdock carries every step to the
            client. Your interface decides how it looks.
          </SectionHeading>
          <ol className="ad-stages">
            {stages.map((stage, index) => (
              <li
                key={stage.title}
                className="ad-stage ad-spot"
                data-core={index === 1}
                data-reveal
                style={{ "--d": `${index * 110}ms` } as CSSProperties}
                onPointerMove={trackPointer}
              >
                <div className="ad-stage-top">
                  <span className="ad-stage-icon">
                    <Icon name={stage.icon} />
                  </span>
                  <span className="ad-stage-step">Step {index + 1}</span>
                </div>
                <h3>{stage.title}</h3>
                <p>{stage.text}</p>
                <span className="ad-stage-owner">{stage.owner}</span>
                {index < stages.length - 1 && (
                  <span className="ad-stage-link" aria-hidden="true">
                    <i />
                  </span>
                )}
              </li>
            ))}
          </ol>
          <div className="ad-ownership" data-reveal>
            <span className="ad-ownership-icon">
              <Icon name="shield" />
            </span>
            <p>
              Authentication, requests, thread identity, and infrastructure stay
              with your application.
            </p>
          </div>
        </section>

        <section className="ad-section ad-container" aria-labelledby="products-title">
          <SectionHeading
            id="products-title"
            title="A small core. An interface you can edit."
            aside={
              <Link href="/docs/ui" className="ad-link">
                Browse UI components <Icon name="arrow" />
              </Link>
            }
          />
          <div className="ad-products">
            <article
              className="ad-product ad-spot"
              data-reveal
              onPointerMove={trackPointer}
            >
              <div className="ad-product-top">
                <span className="ad-stage-icon">
                  <Icon name="terminal" />
                </span>
                <span className="ad-tag">Server</span>
              </div>
              <h3>Agentdock core</h3>
              <p>
                Serve your compiled graph through a Node response, a Web
                Response, or an async iterable.
              </p>
              <ol className="ad-core-visual" aria-label="Example event sequence">
                {coreEvents.map((event, index) => (
                  <li
                    key={event.type}
                    data-tone={event.tone}
                    style={{ "--i": index } as CSSProperties}
                  >
                    <span className="ad-stream-dot" aria-hidden="true" />
                    <code>{event.type}</code>
                    {event.tail === "check" && (
                      <span className="ad-core-check">
                        <Icon name="check" />
                      </span>
                    )}
                    {event.tail === "wave" && (
                      <span className="ad-wave" aria-hidden="true">
                        <i />
                        <i />
                        <i />
                        <i />
                        <i />
                      </span>
                    )}
                    {event.tail === "turn" && <span className="ad-turn">Your turn</span>}
                  </li>
                ))}
              </ol>
              <ul className="ad-features">
                <li>
                  <Icon name="check" />
                  Backpressure and disconnect cancellation
                </li>
                <li>
                  <Icon name="check" />
                  Native checkpoint reads and resume
                </li>
                <li>
                  <Icon name="check" />
                  One shared JSON event contract
                </li>
              </ul>
              <Link href="/docs/api-reference" className="ad-link">
                Read the API reference <Icon name="arrow" />
              </Link>
            </article>

            <article
              className="ad-product ad-spot"
              data-reveal
              style={{ "--d": "120ms" } as CSSProperties}
              onPointerMove={trackPointer}
            >
              <div className="ad-product-top">
                <span className="ad-stage-icon">
                  <Icon name="layers" />
                </span>
                <span className="ad-tag">React</span>
              </div>
              <h3>Agentdock UI</h3>
              <p>
                Copy chat components into your app, then shape every detail with
                your own theme and primitives.
              </p>
              <div className="ad-ui-visual" aria-hidden="true">
                <div className="ad-ui-msg">
                  <span className="ad-ui-line" />
                  <span className="ad-ui-line is-short" />
                </div>
                <div className="ad-ui-chip">
                  <Icon name="check" />
                  <code>search_documents</code>
                  <Icon name="chevron" />
                </div>
                <div className="ad-ui-input">
                  <span className="ad-ui-typing">Summarize the thread</span>
                  <span className="ad-composer-send">
                    <Icon name="arrow" />
                  </span>
                </div>
              </div>
              <ul className="ad-features">
                <li>
                  <Icon name="check" />
                  Streaming, Markdown, and tool disclosures
                </li>
                <li>
                  <Icon name="check" />
                  Approvals, cancellation, and saved history
                </li>
                <li>
                  <Icon name="check" />
                  App-owned adapter and editable source
                </li>
              </ul>
              <div className="ad-install ad-install-block">
                <span aria-hidden="true">$</span>
                <code>npx @agentdock-ai/agentdock-ui add chat</code>
                <CopyButton
                  value="npx @agentdock-ai/agentdock-ui add chat"
                  label="Copy UI install command"
                />
              </div>
            </article>
          </div>
        </section>

        <section
          className="ad-section ad-container ad-split"
          aria-labelledby="code-title"
        >
          <div className="ad-split-copy" data-reveal>
            <h2 id="code-title">A few lines in the route you already have.</h2>
            <p>
              No new agent loop to learn. Hand Agentdock your graph inside an
              authorized route, and the events flow to your app.
            </p>
            <ul className="ad-features">
              <li>
                <Icon name="check" />
                Keep your framework, model, and tools
              </li>
              <li>
                <Icon name="check" />
                Abort signals cancel the run cleanly
              </li>
            </ul>
            <Link href="/docs/quickstart" className="ad-link">
              Walk through the quickstart <Icon name="arrow" />
            </Link>
          </div>
          <CodePanel />
        </section>

        <section
          className="ad-section ad-container ad-split ad-prompt"
          aria-labelledby="prompt-title"
        >
          <div className="ad-split-copy" data-reveal>
            <h2 id="prompt-title">Let your coding agent do the setup.</h2>
            <p>
              Paste this brief into your coding agent. It reads the Agentdock
              guide, asks about your app first, and then builds to fit.
            </p>
            <Link href="/skills.md" className="ad-link">
              Read the agent guide <Icon name="arrow" />
            </Link>
          </div>
          <div
            className="ad-prompt-card"
            data-reveal
            style={{ "--d": "120ms" } as CSSProperties}
          >
            <div className="ad-prompt-head">
              <span>
                <Icon name="spark" />
                Agent brief
              </span>
              <CopyButton
                value={agentImplementationPrompt}
                label="Copy brief"
                showLabel
              />
            </div>
            <pre tabIndex={0}>{agentImplementationPrompt}</pre>
          </div>
        </section>

        <section
          className="ad-section ad-container ad-split ad-faq"
          aria-labelledby="faq-title"
        >
          <div className="ad-split-copy" data-reveal>
            <h2 id="faq-title">Questions before you start.</h2>
            <p>
              Anything else is covered in the{" "}
              <Link href="/docs" className="ad-inline-link">
                documentation
              </Link>
              .
            </p>
          </div>
          <Faq />
        </section>

        <section className="ad-container ad-final-wrap" aria-labelledby="final-title">
          <div className="ad-final ad-spot" data-reveal onPointerMove={trackPointer}>
            <div className="ad-final-grid" aria-hidden="true" />
            <h2 id="final-title">Ship the agent. Keep the product yours.</h2>
            <p>Start with your graph. Agentdock connects the rest.</p>
            <div className="ad-final-actions">
              <Link
                href="/docs/quickstart"
                className="ad-btn ad-btn-light"
                {...magnetic}
              >
                Start building <Icon name="arrow" />
              </Link>
              <a
                href="https://github.com/agentdock-ai/agentdock"
                className="ad-btn ad-btn-outline-light"
              >
                View on GitHub <Icon name="external" />
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="ad-footer ad-container">
        <div className="ad-footer-brand">
          <Link href="/" aria-label="Agentdock home" className="ad-home">
            <AgentdockBrand />
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
