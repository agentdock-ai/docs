type AgentdockBrandProps = {
  className?: string;
};

export function AgentdockBrand({ className = '' }: AgentdockBrandProps) {
  return (
    <span
      className={`agentdock-brand ${className}`.trim()}
      role="img"
      aria-label="Agentdock"
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
