import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { AgentDockBrand } from '@/components/brand';

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: <AgentDockBrand className="agentdock-brand-docs" />,
      url: '/',
    },
    githubUrl: 'https://github.com/agentdock-ai/docs',
  };
}
