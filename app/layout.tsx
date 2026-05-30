import type { Metadata } from "next";
import "./globals.css";
import BeaconProvider from "@/components/BeaconProvider";
import Header from "@/components/Header";
import { MobileSidebarProvider } from "@/components/MobileSidebarProvider";
import SearchHighlight from "@/components/SearchHighlight";
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
        <MobileSidebarProvider>
          <div className="min-h-screen bg-white pt-14 font-sans">
            <Header />
            <SearchHighlight />
            {children}
          </div>
        </MobileSidebarProvider>
        <BeaconProvider />
      </body>
    </html>
  );
}
