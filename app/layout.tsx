import type { Metadata } from "next";
import "./globals.css";
import BeaconProvider from "@/components/BeaconProvider";
import TopBanner from "@/components/TopBanner";
import { siteContent } from "@/content/site";

export const metadata: Metadata = {
  title: siteContent.metadata.title,
  description: siteContent.metadata.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen bg-white pt-8 font-sans">
          <TopBanner />
          {children}
        </div>
        <BeaconProvider />
      </body>
    </html>
  );
}
