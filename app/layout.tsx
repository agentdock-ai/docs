import { RootProvider } from 'fumadocs-ui/provider/next';
import type { Metadata } from 'next';
import './global.css';

export const metadata: Metadata = {
  title: {
    default: 'Agentdock | TypeScript agent infrastructure',
    template: '%s | Agentdock',
  },
  description:
    'Build production-ready AI agents with a clear TypeScript API for models, typed tools, approvals, sessions, and streamed events.',
  applicationName: 'Agentdock',
  keywords: [
    'Agentdock',
    'TypeScript agents',
    'AI agents',
    'agent infrastructure',
    'tool calling',
    'LangGraph',
  ],
  authors: [{ name: 'Agentdock' }],
  creator: 'Agentdock',
  publisher: 'Agentdock',
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    title: 'Agentdock | TypeScript agent infrastructure',
    description:
      'Build production-ready AI agents with a clear TypeScript API for models, typed tools, approvals, sessions, and streamed events.',
    siteName: 'Agentdock',
  },
  twitter: {
    card: 'summary',
    title: 'Agentdock | TypeScript agent infrastructure',
    description:
      'Build production-ready AI agents with a clear TypeScript API for models, typed tools, approvals, sessions, and streamed events.',
  },
  icons: {
    icon: [{ url: '/icon.png', type: 'image/png' }],
    apple: '/icon.png',
  },
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
