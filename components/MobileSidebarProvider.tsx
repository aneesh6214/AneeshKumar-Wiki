"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { usePathname } from "next/navigation";

interface MobileSidebarContextValue {
  closeSidebar: () => void;
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

interface MobileSidebarProviderProps {
  children: ReactNode;
}

const MobileSidebarContext =
  createContext<MobileSidebarContextValue | null>(null);

export function MobileSidebarProvider({
  children,
}: MobileSidebarProviderProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsSidebarOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isSidebarOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsSidebarOpen(false);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isSidebarOpen]);

  const value = useMemo(
    () => ({
      closeSidebar: () => setIsSidebarOpen(false),
      isSidebarOpen,
      toggleSidebar: () => setIsSidebarOpen((open) => !open),
    }),
    [isSidebarOpen],
  );

  return (
    <MobileSidebarContext.Provider value={value}>
      {children}
    </MobileSidebarContext.Provider>
  );
}

export function useMobileSidebar() {
  const context = useContext(MobileSidebarContext);

  if (!context) {
    throw new Error("useMobileSidebar must be used within MobileSidebarProvider");
  }

  return context;
}
