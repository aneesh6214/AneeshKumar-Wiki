import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import BeaconProvider from "@/components/BeaconProvider";

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
        <div className="min-h-screen bg-white font-sans">
          <Header />
          {children}
        </div>
        <BeaconProvider />
      </body>
    </html>
  );
}
