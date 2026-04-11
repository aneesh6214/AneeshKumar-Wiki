import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "aneeshkumar.com — Administrator's observatory",
  description: "Observability dashboard",
};

export default function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <>{children}</>;
}
