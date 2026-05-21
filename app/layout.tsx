import type { Metadata } from "next";
import "./globals.css";
import BeaconProvider from "@/components/BeaconProvider";
import TopBanner from "@/components/TopBanner";

export const metadata: Metadata = {
  title: "Aneesh Kumar - Personal Website",
  description:
    "Personal website of Aneesh Kumar, Software Engineer and AI researcher",
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
