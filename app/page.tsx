import { Bricolage_Grotesque, JetBrains_Mono } from "next/font/google";
import { LandingPage } from "@/components/landing";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--ad-font-display",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--ad-font-mono",
  display: "swap",
});

export default function HomePage() {
  return <LandingPage className={`${display.variable} ${mono.variable}`} />;
}
