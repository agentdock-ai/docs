import { RootProvider } from 'fumadocs-ui/provider/next';
import type { Metadata } from 'next';
import './global.css';

export const metadata: Metadata = {
  title: {
    default: 'AgentDock documentation',
    template: '%s | AgentDock documentation',
  },
  description: 'Simple guides for installing and using AgentDock.',
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
