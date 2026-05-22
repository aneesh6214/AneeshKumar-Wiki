import type { Metadata } from "next";
import { adminContent } from "@/content/admin";

export const metadata: Metadata = {
  title: adminContent.metadata.title,
  description: adminContent.metadata.description,
};

export default function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <>{children}</>;
}
