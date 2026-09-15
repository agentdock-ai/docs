import { RootProvider } from 'fumadocs-ui/provider/next';
import type { Metadata } from 'next';
import './global.css';

export const metadata: Metadata = {
  title: {
    default: 'AgentDock | TypeScript agent infrastructure',
    template: '%s | AgentDock',
  },
  description: 'Build streamed, tool-using agents with a clear TypeScript API.',
};

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
