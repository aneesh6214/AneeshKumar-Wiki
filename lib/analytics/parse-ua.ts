// Wraps ua-parser-js and maps its output onto the small vocabulary we
// display on the admin dashboard (Desktop/Mobile/Tablet, named browsers,
// named OSes). Anything unrecognised becomes "Other".
import { UAParser } from "ua-parser-js";

export interface ParsedUA {
  device: "Desktop" | "Mobile" | "Tablet";
  browser: string;
  os: string;
}

const BROWSER_ALLOWLIST = new Set([
  "Chrome", "Safari", "Firefox", "Edge", "Opera", "Samsung Browser",
]);

const OS_MAP: Record<string, string> = {
  "macOS": "macOS",
  "Mac OS": "macOS",
  "iOS": "iOS",
  "Windows": "Windows",
  "Android": "Android",
  "Linux": "Linux",
  "Ubuntu": "Linux",
  "Fedora": "Linux",
  "Debian": "Linux",
};

export function parseUA(ua: string | null | undefined): ParsedUA {
  const p = new UAParser(ua ?? "").getResult();

  const rawDevice = p.device.type;
  const device: ParsedUA["device"] =
    rawDevice === "mobile" ? "Mobile" :
    rawDevice === "tablet" ? "Tablet" :
    "Desktop";

  const rawBrowser = p.browser.name ?? "";
  const browser = BROWSER_ALLOWLIST.has(rawBrowser) ? rawBrowser : "Other";

  const rawOS = p.os.name ?? "";
  const os = OS_MAP[rawOS] ?? "Other";

  return { device, browser, os };
}
