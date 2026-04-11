// components/BeaconProvider.tsx
"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { onTTFB, onLCP } from "web-vitals";
import { sendBeacon } from "@/lib/beacon";

export default function BeaconProvider() {
  const pathname = usePathname();

  // Engagement: max scroll depth + visible time per pageview
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (navigator.doNotTrack === "1") return;

    let maxScrollPct = 0;
    let visibleMs = 0;
    let visibleSince = document.visibilityState === "visible" ? performance.now() : null;

    const onScroll = () => {
      const doc = document.documentElement;
      const max = Math.max(1, doc.scrollHeight - doc.clientHeight);
      const pct = Math.min(100, Math.round(((doc.scrollTop || window.scrollY) / max) * 100));
      if (pct > maxScrollPct) maxScrollPct = pct;
    };

    const onVis = () => {
      const now = performance.now();
      if (document.visibilityState === "visible") {
        visibleSince = now;
      } else if (visibleSince !== null) {
        visibleMs += now - visibleSince;
        visibleSince = null;
      }
    };

    const flush = () => {
      if (visibleSince !== null) {
        visibleMs += performance.now() - visibleSince;
        visibleSince = null;
      }
      sendBeacon({
        type: "engagement",
        path: pathname,
        payload: {
          max_scroll_pct: maxScrollPct,
          visible_ms: Math.round(visibleMs),
        },
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("visibilitychange", onVis);
    window.addEventListener("pagehide", flush);

    return () => {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("pagehide", flush);
      flush();
    };
  }, [pathname]);

  // Outbound clicks
  useEffect(() => {
    if (typeof window === "undefined") return;
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const anchor = target?.closest("a") as HTMLAnchorElement | null;
      if (!anchor || !anchor.href) return;
      let url: URL;
      try {
        url = new URL(anchor.href);
      } catch {
        return;
      }
      if (url.hostname === window.location.hostname) return;
      sendBeacon({
        type: "outbound",
        path: pathname,
        payload: { url: url.toString() },
      });
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, [pathname]);

  // JS errors
  useEffect(() => {
    if (typeof window === "undefined") return;
    const onError = (e: ErrorEvent) => {
      sendBeacon({
        type: "error",
        path: pathname,
        payload: {
          message: e.message,
          source: e.filename,
          line: e.lineno,
          col: e.colno,
        },
      });
    };
    const onRejection = (e: PromiseRejectionEvent) => {
      const reason = e.reason;
      sendBeacon({
        type: "error",
        path: pathname,
        payload: {
          message:
            reason && typeof reason === "object" && "message" in reason
              ? String((reason as { message: unknown }).message)
              : String(reason),
          kind: "unhandledrejection",
        },
      });
    };
    window.addEventListener("error", onError);
    window.addEventListener("unhandledrejection", onRejection);
    return () => {
      window.removeEventListener("error", onError);
      window.removeEventListener("unhandledrejection", onRejection);
    };
  }, [pathname]);

  // Web Vitals (TTFB + LCP)
  useEffect(() => {
    if (typeof window === "undefined") return;
    onTTFB((m) =>
      sendBeacon({
        type: "vitals",
        path: pathname,
        payload: { name: "TTFB", value_ms: Math.round(m.value) },
      })
    );
    onLCP((m) =>
      sendBeacon({
        type: "vitals",
        path: pathname,
        payload: { name: "LCP", value_ms: Math.round(m.value) },
      })
    );
  }, [pathname]);

  return null;
}
