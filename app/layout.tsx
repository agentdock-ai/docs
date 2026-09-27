import { RootProvider } from "fumadocs-ui/provider/next";
import type { Metadata } from "next";
import "./global.css";

export const metadata: Metadata = {
  title: {
    default: "AgentDock | LangGraph serving adapter",
    template: "%s | AgentDock",
  },
  description:
    "Serve compiled LangGraph agents through a small TypeScript API for SSE, event mapping, and cancellation.",
  applicationName: "AgentDock",
  keywords: [
    "AgentDock",
    "TypeScript agents",
    "AI agents",
    "agent infrastructure",
    "tool calling",
    "LangGraph",
  ],
  authors: [{ name: "AgentDock" }],
  creator: "AgentDock",
  publisher: "AgentDock",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    title: "AgentDock | LangGraph serving adapter",
    description:
      "Serve compiled LangGraph agents through a small TypeScript API for SSE, event mapping, and cancellation.",
    siteName: "AgentDock",
  },
  twitter: {
    card: "summary",
    title: "AgentDock | LangGraph serving adapter",
    description:
      "Serve compiled LangGraph agents through a small TypeScript API for SSE, event mapping, and cancellation.",
  },
  icons: {
    icon: [{ url: "/icon.png", type: "image/png" }],
    apple: "/icon.png",
  },
};

export default function Layout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
