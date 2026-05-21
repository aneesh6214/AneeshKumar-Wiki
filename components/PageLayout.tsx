import Sidebar from "./Sidebar";
import { getArticleNavigation, JSONContent } from "@/lib/json-content";

interface PageLayoutProps {
  currentPath: string;
  content?: JSONContent;
  children: React.ReactNode;
}

export default function PageLayout({
  currentPath,
  content,
  children,
}: PageLayoutProps) {
  const articleLinks = content ? getArticleNavigation(content) : [];

  return (
    <div className="flex flex-col md:block">
      <Sidebar currentPath={currentPath} articleLinks={articleLinks} />
      <main className="min-w-0 flex-1 w-full md:ml-[15rem] md:w-auto">
        {children}
      </main>
    </div>
  );
}
