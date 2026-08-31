import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kontigo Transfer Confidence",
  description: "A product exploration for clearer cross-border transfer decisions."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body>{children}</body></html>;
}
