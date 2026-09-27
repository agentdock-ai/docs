import Link from "next/link";
import { AgentDockBrand } from "@/components/brand";

const quickstart = `const graph = createAgent({
  model,
  tools,
  checkpointer,
}).graph;

const runtime = serveAgent(graph);

await runtime.pipe(response, {
  threadId: authorizedThreadId,
  input,
});`;

export default function HomePage() {
  return (
    <main className="landing-page">
      <header className="landing-header">
        <Link href="/" aria-label="AgentDock home">
          <AgentDockBrand className="agentdock-brand-landing" />
        </Link>
        <nav className="landing-nav" aria-label="Main navigation">
          <Link href="#how-it-works">How it works</Link>
          <Link href="/docs">Documentation</Link>
          <a
            href="https://github.com/agentdock-ai/agentdock"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
        </nav>
      </header>

      <section className="landing-hero" aria-labelledby="hero-title">
        <div className="landing-hero-copy">
          <p className="landing-eyebrow">A SMALL SERVING LAYER FOR LANGGRAPH</p>
          <h1 id="hero-title">
            Keep your agent.<span> Simplify serving.</span>
          </h1>
          <p className="landing-lede">
            Build your agent with LangChain or LangGraph. AgentDock adapts its
            event stream to a small, transport-friendly TypeScript API.
          </p>
          <div className="landing-actions">
            <Link
              className="landing-button landing-button-primary"
              href="/docs/quickstart"
            >
              Read the quickstart <span aria-hidden="true">↗</span>
            </Link>
            <Link
              className="landing-button landing-button-secondary"
              href="#how-it-works"
            >
              See the boundary
            </Link>
          </div>
          <div className="landing-trust-row" aria-label="Project details">
            <span>
              <b>01</b> TypeScript
            </span>
            <span>
              <b>02</b> Open source
            </span>
            <span>
              <b>03</b> Node.js 22+
            </span>
          </div>
        </div>
        <div className="landing-code-card" aria-label="Serving example">
          <div className="landing-code-topbar">
            <span className="landing-code-dots" aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
            <span>server.ts</span>
            <span className="landing-code-label">AgentDock</span>
          </div>
          <pre>
            <code>{quickstart}</code>
          </pre>
        </div>
      </section>

      <section
        className="landing-intro"
        id="how-it-works"
        aria-labelledby="why-title"
      >
        <div className="landing-section-kicker">THE OWNERSHIP BOUNDARY</div>
        <div className="landing-intro-grid">
          <h2>LangGraph runs the agent. Your app owns the product.</h2>
          <p>
            AgentDock handles event mapping and serving mechanics. You choose
            the model, build tools, authorize requests, derive thread IDs, and
            manage checkpoint storage.
          </p>
        </div>
      </section>

      <section
        className="landing-architecture"
        aria-label="How AgentDock fits with LangGraph"
      >
        <div className="landing-architecture-card">
          <div className="architecture-step architecture-app">
            <span className="architecture-index">01</span>
            <div className="architecture-icon">⌘</div>
            <h3>Your application</h3>
            <p>
              Authentication, authorization, providers, tools, and persistence.
            </p>
          </div>
          <div className="architecture-bridge">
            <span>compiled graph</span>
            <i />
          </div>
          <div className="architecture-step architecture-agentdock">
            <span className="architecture-index">02</span>
            <div className="architecture-icon architecture-icon-accent">✦</div>
            <h3>AgentDock</h3>
            <p>Event mapping, SSE framing, backpressure, and cancellation.</p>
          </div>
          <div className="architecture-bridge">
            <span>built on</span>
            <i />
          </div>
          <div className="architecture-step architecture-langgraph">
            <span className="architecture-index">03</span>
            <h3>LangChain + LangGraph</h3>
            <p>
              Agent construction, model/tool loop, graph state, and checkpoints.
            </p>
          </div>
        </div>
      </section>

      <section
        className="landing-capabilities"
        aria-labelledby="capabilities-title"
      >
        <div className="landing-section-heading">
          <div className="landing-section-kicker">A FEW SERVING METHODS</div>
          <h2 id="capabilities-title">
            A narrow API for getting events to your app.
          </h2>
        </div>
        <div className="landing-capability-grid">
          <article className="landing-capability-card capability-wide">
            <span className="landing-capability-number">01</span>
            <div>
              <h3>
                <code>pipe()</code>
              </h3>
              <p>
                Write SSE to a Node response with backpressure and cancellation.
              </p>
            </div>
          </article>
          <article className="landing-capability-card">
            <span className="landing-capability-number">02</span>
            <h3>
              <code>stream()</code>
            </h3>
            <p>Consume the same contract events as an async iterable.</p>
          </article>
          <article className="landing-capability-card">
            <span className="landing-capability-number">03</span>
            <h3>
              <code>toResponse()</code>
            </h3>
            <p>Adapt the stream to a Web-standard response.</p>
          </article>
        </div>
      </section>

      <section className="landing-bottom-cta">
        <AgentDockBrand className="agentdock-brand-cta" />
        <div>
          <div className="landing-section-kicker">GET STARTED</div>
          <h2>Build the agent with the tools you already use.</h2>
          <p>Then use AgentDock to serve its event stream.</p>
        </div>
        <Link
          className="landing-button landing-button-primary"
          href="/docs/quickstart"
        >
          Open the docs <span aria-hidden="true">↗</span>
        </Link>
      </section>

      <footer className="landing-footer">
        <span>AgentDock · a small serving layer for LangGraph</span>
        <span>Open source · MIT licensed</span>
      </footer>
    </main>
  );
}
