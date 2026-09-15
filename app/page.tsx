import Link from 'next/link';
import { AgentDockBrand } from '@/components/brand';

export default function HomePage() {
  return (
    <main className="landing-page">
      <header className="landing-header">
        <Link href="/" aria-label="Agentdock home">
          <AgentDockBrand className="agentdock-brand-landing" />
        </Link>
        <nav className="landing-nav" aria-label="Main navigation">
          <Link href="/docs">Documentation</Link>
          <a href="https://github.com/agentdock-ai/agentdock" target="_blank" rel="noreferrer">
            GitHub
          </a>
        </nav>
      </header>

      <section className="landing-hero">
        <div className="landing-hero-copy">
          <p className="landing-eyebrow">AGENT INFRASTRUCTURE FOR TYPESCRIPT</p>
          <h1>Build agents ready for real applications.</h1>
          <p className="landing-lede">
            Agentdock gives your server a clear API for models, typed tools,
            approvals, sessions, persistence, and streamed events.
          </p>
          <div className="landing-actions">
            <Link className="landing-button landing-button-primary" href="/docs/quickstart">
              Get started
            </Link>
            <Link className="landing-button landing-button-secondary" href="/docs">
              Read the docs
            </Link>
          </div>
          <p className="landing-meta">Open source · MIT licensed · Node.js 22+</p>
        </div>

        <div className="landing-code-card" aria-label="Agentdock quickstart example">
          <div className="landing-code-topbar">
            <span className="landing-code-dots" aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
            <span>quickstart.ts</span>
            <span className="landing-code-label">Agentdock</span>
          </div>
          <pre>
            <code>{`import { createAgentDock } from
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
);`}</code>
          </pre>
        </div>
      </section>

      <section className="landing-features" aria-labelledby="landing-features-title">
        <div className="landing-section-heading">
          <p className="landing-eyebrow">A SMALL PUBLIC API</p>
          <h2 id="landing-features-title">Everything your agent needs to run well.</h2>
        </div>
        <div className="landing-feature-grid">
          <article className="landing-feature-card">
            <span className="landing-feature-number">01</span>
            <h3>Typed tools</h3>
            <p>Define tools with Zod, validate input, report progress, and protect side effects with approvals.</p>
          </article>
          <article className="landing-feature-card">
            <span className="landing-feature-number">02</span>
            <h3>Durable sessions</h3>
            <p>Start with memory, then add SQLite, PostgreSQL, MongoDB, or Redis when your app needs persistence.</p>
          </article>
          <article className="landing-feature-card">
            <span className="landing-feature-number">03</span>
            <h3>Streamed events</h3>
            <p>Send one normalized event contract to any frontend, transport, or UI you choose.</p>
          </article>
        </div>
      </section>

      <section className="landing-bottom-cta">
        <AgentDockBrand className="agentdock-brand-cta" />
        <div>
          <h2>Start with the quickstart.</h2>
          <p>Learn the core API in a few small steps.</p>
        </div>
        <Link className="landing-button landing-button-primary" href="/docs/quickstart">
          Open the docs
        </Link>
      </section>

      <footer className="landing-footer">
        <span>Agentdock documentation</span>
        <span>Built for TypeScript applications</span>
      </footer>
    </main>
  );
}
