import { RootProvider } from "fumadocs-ui/provider/next";
import type { Metadata } from "next";
import "./global.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://agentdock-ai.vercel.app"),
  title: {
    default: "Agentdock | From agent to application",
    template: "%s | Agentdock",
  },
  description:
    "Connect your LangGraph agent to your application with TypeScript streaming and editable React chat components.",
  applicationName: "Agentdock",
  keywords: [
    "Agentdock",
    "TypeScript agents",
    "AI agents",
    "agent infrastructure",
    "tool calling",
    "LangGraph",
  ],
  authors: [{ name: "Agentdock" }],
  creator: "Agentdock",
  publisher: "Agentdock",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    title: "Agentdock | From agent to application",
    description:
      "Connect your LangGraph agent to your application with TypeScript streaming and editable React chat components.",
    siteName: "Agentdock",
  },
  twitter: {
    card: "summary",
    title: "Agentdock | From agent to application",
    description:
      "Connect your LangGraph agent to your application with TypeScript streaming and editable React chat components.",
  },
  icons: {
    icon: [{ url: "/icon.png", type: "image/png" }],
    apple: "/icon.png",
  },
};

export default function Layout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
