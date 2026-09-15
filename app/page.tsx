import Link from 'next/link';
import { AgentDockBrand } from '@/components/brand';

const quickstart = `import { createAgentDock } from
  "@agentdock-ai/agentdock";
import { AgentDockModel } from
  "@agentdock-ai/models";

const agent = createAgentDock({
  model: AgentDockModel.openAI({
    model: "gpt-5.4-mini",
  }),
});

const result = await agent.run(
  "Summarize this order",
  { userId: "user-123" },
  { sessionId: "session-123" },
);`;

function LangGraphLogo({ className = '' }: { className?: string }) {
  return (
    <span className={`langgraph-brand ${className}`.trim()}>
      <img className="langgraph-logo langgraph-logo-light-theme" src="/brand/langgraph-logo-light.svg" alt="LangGraph" />
      <img className="langgraph-logo langgraph-logo-dark-theme" src="/brand/langgraph-logo-dark.svg" alt="LangGraph" />
    </span>
  );
}

export default function HomePage() {
  return (
    <main className="landing-page">
      <header className="landing-header">
        <Link href="/" aria-label="Agentdock home">
          <AgentDockBrand className="agentdock-brand-landing" />
        </Link>
        <nav className="landing-nav" aria-label="Main navigation">
          <Link href="#why-agentdock">Why Agentdock</Link>
          <Link href="#agentdock-ui">Agentdock UI</Link>
          <Link href="/docs">Documentation</Link>
          <a href="https://github.com/agentdock-ai/agentdock" target="_blank" rel="noreferrer">
            GitHub
          </a>
        </nav>
      </header>

      <section className="landing-hero" aria-labelledby="hero-title">
        <div className="landing-hero-copy">
          <div className="landing-eyebrow-row">
            <p className="landing-eyebrow">THE EASY LAYER ON LANGGRAPH</p>
            <span className="landing-live-pill"><i /> Built for production</span>
          </div>
          <h1 id="hero-title">
            Build agents.
            <span> Ship the experience.</span>
          </h1>
          <p className="landing-lede">
            Agentdock gives your TypeScript app a simple, durable way to run agents with tools,
            approvals, sessions, and streams. LangGraph handles the orchestration underneath.
          </p>
          <div className="landing-actions">
            <Link className="landing-button landing-button-primary" href="/docs/quickstart">
              Build your first agent <span aria-hidden="true">↗</span>
            </Link>
            <Link className="landing-button landing-button-secondary" href="#why-agentdock">
              See how it works
            </Link>
          </div>
          <div className="landing-trust-row" aria-label="Project details">
            <span><b>01</b> TypeScript first</span>
            <span><b>02</b> Open source</span>
            <span><b>03</b> Node.js 22+</span>
          </div>
        </div>

        <div className="landing-hero-stage" aria-label="Agentdock and LangGraph workflow preview">
          <div className="landing-stage-glow" aria-hidden="true" />
          <div className="landing-graph-card">
            <div className="landing-card-topbar">
              <div className="landing-card-title"><span className="landing-card-icon">✦</span> agent-flow</div>
              <span className="landing-graph-status"><i /> running</span>
            </div>
            <div className="landing-graph-canvas">
              <svg className="landing-graph-lines" viewBox="0 0 520 260" fill="none" aria-hidden="true">
                <path className="graph-line graph-line-one" d="M72 132C126 132 125 73 186 73H228" />
                <path className="graph-line graph-line-two" d="M292 73C352 73 343 132 400 132H447" />
                <path className="graph-line graph-line-three" d="M292 73C354 73 352 202 400 202H447" />
                <circle className="graph-pulse graph-pulse-one" cx="126" cy="132" r="4" />
                <circle className="graph-pulse graph-pulse-two" cx="354" cy="73" r="4" />
                <circle className="graph-pulse graph-pulse-three" cx="354" cy="202" r="4" />
              </svg>
              <div className="landing-graph-node landing-graph-input">
                <span className="graph-node-mark">⌁</span>
                <strong>Prompt</strong>
                <small>user input</small>
              </div>
              <div className="landing-graph-node landing-graph-agent">
                <span className="graph-node-mark graph-node-mark-accent">✦</span>
                <strong>Agentdock</strong>
                <small>agent loop</small>
              </div>
              <div className="landing-graph-node landing-graph-tool">
                <span className="graph-node-mark">⚒</span>
                <strong>Tools</strong>
                <small>typed + safe</small>
              </div>
              <div className="landing-graph-node landing-graph-stream">
                <span className="graph-node-mark">◌</span>
                <strong>Stream</strong>
                <small>events out</small>
              </div>
            </div>
            <div className="landing-graph-footer">
              <LangGraphLogo />
              <span>durable orchestration underneath</span>
            </div>
          </div>

          <div className="landing-code-card">
            <div className="landing-code-topbar">
              <span className="landing-code-dots" aria-hidden="true"><i /><i /><i /></span>
              <span>quickstart.ts</span>
              <span className="landing-code-label">Agentdock</span>
            </div>
            <pre><code>{quickstart}</code></pre>
          </div>
        </div>
      </section>

      <section className="landing-intro" id="why-agentdock" aria-labelledby="why-title">
        <div className="landing-section-kicker">01 / WHY AGENTDOCK</div>
        <div className="landing-intro-grid">
          <h2 id="why-title">The graph is powerful. Your app should feel simple.</h2>
          <p>
            LangGraph gives you the enterprise-grade runtime for stateful, long-running agents.
            Agentdock puts a small, readable TypeScript API in front of it so your team can focus
            on the product instead of wiring the graph.
          </p>
        </div>
      </section>

      <section className="landing-architecture" aria-label="How Agentdock fits with LangGraph">
        <div className="landing-architecture-card">
          <div className="architecture-step architecture-app">
            <span className="architecture-index">01</span>
            <div className="architecture-icon">⌘</div>
            <h3>Your application</h3>
            <p>One clear API for prompts, context, and typed tools.</p>
          </div>
          <div className="architecture-bridge"><span>simple config</span><i /></div>
          <div className="architecture-step architecture-agentdock">
            <span className="architecture-index">02</span>
            <div className="architecture-icon architecture-icon-accent">✦</div>
            <h3>Agentdock</h3>
            <p>Policies, approvals, sessions, events, and lifecycle control.</p>
          </div>
          <div className="architecture-bridge"><span>powered by</span><i /></div>
          <div className="architecture-step architecture-langgraph">
            <span className="architecture-index">03</span>
            <LangGraphLogo className="architecture-langgraph-logo" />
            <h3>LangGraph</h3>
            <p>Durable orchestration for stateful, production agents.</p>
          </div>
        </div>
      </section>

      <section className="landing-capabilities" aria-labelledby="capabilities-title">
        <div className="landing-section-heading">
          <div className="landing-section-kicker">02 / THE PUBLIC API</div>
          <h2 id="capabilities-title">Small surface. Serious capabilities.</h2>
          <p>Everything you need to move from a clever demo to an agent your users can trust.</p>
        </div>
        <div className="landing-capability-grid">
          <article className="landing-capability-card capability-wide">
            <span className="landing-capability-number">01</span>
            <div><h3>Tools that stay in bounds</h3><p>Zod schemas, authorization, approvals, progress, and cancellation are part of the same run.</p></div>
            <div className="capability-signal capability-signal-tools" aria-hidden="true"><span /><span /><span /><span /></div>
          </article>
          <article className="landing-capability-card">
            <span className="landing-capability-number">02</span>
            <h3>Sessions that continue</h3>
            <p>Keep context across runs, then add durable checkpoints when your app is ready.</p>
            <div className="capability-sessions" aria-hidden="true"><i /><i /><i /><i /><i /></div>
          </article>
          <article className="landing-capability-card">
            <span className="landing-capability-number">03</span>
            <h3>Events your UI understands</h3>
            <p>One normalized stream for text, tools, approvals, progress, usage, and terminal states.</p>
            <div className="capability-wave" aria-hidden="true"><i /><i /><i /><i /><i /><i /><i /></div>
          </article>
        </div>
      </section>

      <section className="landing-coming-soon" id="agentdock-ui" aria-labelledby="ui-title">
        <div className="coming-copy">
          <div className="coming-badge"><span /> COMING SOON · AGENTDOCK UI</div>
          <h2 id="ui-title">Plug the agent into your product.</h2>
          <p>
            A ready-made frontend library for Agentdock agents. Drop in a chat surface, show tool
            activity, handle approvals, and keep your team out of the plumbing.
          </p>
          <div className="coming-points">
            <span><b>✓</b> Stream-aware components</span>
            <span><b>✓</b> Approval-ready interactions</span>
            <span><b>✓</b> Your design system, your control</span>
          </div>
          <Link className="landing-button landing-button-secondary" href="/docs">
            Explore the runtime <span aria-hidden="true">↗</span>
          </Link>
        </div>
        <div className="coming-demo" aria-label="Agentdock UI preview">
          <div className="coming-demo-window">
            <div className="coming-demo-topbar"><span><i /><i /><i /></span><small>Agentdock UI</small><em>preview</em></div>
            <div className="coming-chat">
              <div className="chat-avatar">A</div>
              <div className="chat-bubble">I found three orders that need your review.</div>
              <div className="chat-tool-row"><span className="chat-tool-icon">⌁</span><div><strong>get_orders</strong><small>Tool completed · 3 results</small></div><span className="chat-check">✓</span></div>
              <div className="chat-input"><span>Ask your agent anything…</span><b>↑</b></div>
            </div>
          </div>
          <div className="coming-demo-orbit orbit-one" aria-hidden="true" />
          <div className="coming-demo-orbit orbit-two" aria-hidden="true" />
        </div>
      </section>

      <section className="landing-bottom-cta">
        <AgentDockBrand className="agentdock-brand-cta" />
        <div>
          <div className="landing-section-kicker">READY WHEN YOU ARE</div>
          <h2>Start with one agent and grow from there.</h2>
          <p>Read the quickstart, wire your first tool, and let Agentdock handle the loop.</p>
        </div>
        <Link className="landing-button landing-button-primary" href="/docs/quickstart">Open the docs <span aria-hidden="true">↗</span></Link>
      </section>

      <footer className="landing-footer">
        <span>Agentdock · the easy layer on LangGraph</span>
        <span>Open source · MIT licensed</span>
      </footer>
    </main>
  );
}
