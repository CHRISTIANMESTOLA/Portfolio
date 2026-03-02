import type { Metadata } from "next";

import FloatingChatButton from "@/components/FloatingChatButton";
import Footer from "@/components/Footer";
import SiteHeader from "@/components/SiteHeader";

import "./globals.css";

export const metadata: Metadata = {
  title: "Christian Faith Mestola| Portfolio",
  description: "Placeholder portfolio built with Next.js and Tailwind CSS.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-zinc-900 focus:px-3 focus:py-2 focus:text-sm focus:text-white"
        >
          Skip to content
        </a>
        <div className="flex min-h-screen flex-col">
          <SiteHeader />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
        <FloatingChatButton />
      </body>
    </html>
  );
}
