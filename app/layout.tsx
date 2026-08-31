import type { Metadata } from "next";
// @ts-ignore CSS side-effect imports are handled by Next.js at build time.
import "./globals.css";

export const metadata: Metadata = {
  title: "Kontigo Transfer Confidence",
  description: "A product exploration for clearer cross-border transfer decisions."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body>{children}</body></html>;
}
