type AgentDockBrandProps = {
  className?: string;
};

export function AgentDockBrand({ className = '' }: AgentDockBrandProps) {
  return (
    <span
      className={`agentdock-brand ${className}`.trim()}
      role="img"
      aria-label="AgentDock"
    >
      <img
        className="agentdock-logo agentdock-logo-light"
        src="/brand/agentdock-logo-light.png"
        alt=""
        aria-hidden="true"
      />
      <img
        className="agentdock-logo agentdock-logo-dark"
        src="/brand/agentdock-logo-dark.png"
        alt=""
        aria-hidden="true"
      />
    </span>
  );
}
