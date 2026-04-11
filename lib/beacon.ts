export type BeaconEvent =
  | { type: "engagement"; path: string; payload: { max_scroll_pct: number; visible_ms: number } }
  | { type: "outbound"; path: string; payload: { url: string } }
  | { type: "search"; path: string; payload: { query: string; destination: string } }
  | { type: "error"; path: string; payload: { message: string; source?: string; line?: number; col?: number; kind?: string } }
  | { type: "vitals"; path: string; payload: { name: string; value_ms: number } };

export function sendBeacon(event: BeaconEvent): void {
  try {
    const body = JSON.stringify(event);
    const ok =
      typeof navigator.sendBeacon === "function" &&
      navigator.sendBeacon(
        "/api/beacon",
        new Blob([body], { type: "application/json" })
      );
    if (!ok) {
      void fetch("/api/beacon", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body,
        keepalive: true,
      });
    }
  } catch {
    /* best effort */
  }
}
