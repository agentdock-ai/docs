import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { AgentdockBrand } from '@/components/brand';

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: <AgentdockBrand className="agentdock-brand-docs" />,
      url: '/',
    },
    githubUrl: 'https://github.com/agentdock-ai/docs',
  };
}
