import type { ReactNode } from "react";

interface AdminArticleBodyProps {
  children: ReactNode;
  className?: string;
}

interface AdminLeadNoteProps {
  children: ReactNode;
}

interface AdminInlineCodeProps {
  children: ReactNode;
}

interface AdminPanelProps {
  children: ReactNode;
  className?: string;
}

interface AdminPanelHeaderProps {
  children: ReactNode;
  meta?: ReactNode;
  mono?: boolean;
}

interface AdminEmptyStateProps {
  children: ReactNode;
}

export const adminLinkClass = "text-blue-600 hover:underline";
export const adminTextClass = "text-[#202122]";
export const adminMutedTextClass = "text-gray-600";
export const adminBorderClass = "border-[#a2a9b1]";
export const adminSoftBorderClass = "border-[#eaecf0]";
export const adminPanelClass = `border ${adminBorderClass} bg-[#f8f9fa]`;

export function AdminArticleBody({
  children,
  className = "",
}: AdminArticleBodyProps) {
  return (
    <article className={`px-4 py-4 text-[#202122] sm:px-6 ${className}`}>
      {children}
    </article>
  );
}

export function AdminLeadNote({ children }: AdminLeadNoteProps) {
  return (
    <div className="mb-4 border-l-2 border-[#eaecf0] pl-6 text-sm italic text-gray-600">
      {children}
    </div>
  );
}

export function AdminInlineCode({ children }: AdminInlineCodeProps) {
  return (
    <code className="border border-[#eaecf0] bg-[#f8f9fa] px-1 text-xs">
      {children}
    </code>
  );
}

export function AdminPanel({ children, className = "" }: AdminPanelProps) {
  return <div className={`${adminPanelClass} ${className}`}>{children}</div>;
}

export function AdminPanelHeader({
  children,
  meta,
  mono = false,
}: AdminPanelHeaderProps) {
  return (
    <div
      className={`flex justify-between border-b border-[#a2a9b1] bg-[#eaecf0] px-3 py-1.5 ${
        mono ? "font-mono text-xs" : "font-serif text-base font-medium"
      }`}
    >
      <span>{children}</span>
      {meta && <span className="text-gray-500">{meta}</span>}
    </div>
  );
}

export function AdminEmptyState({ children }: AdminEmptyStateProps) {
  return <p className="my-4 text-sm italic text-gray-600">{children}</p>;
}

export function AdminStatusDot() {
  return <span className="text-gray-400">·</span>;
}
