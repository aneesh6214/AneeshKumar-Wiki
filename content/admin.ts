export type AdminTabKey = "dashboard" | "ama" | "raw" | "live" | "login";

export interface AdminTabItem {
  key: AdminTabKey;
  label: string;
  href: string;
}

export interface AdminTimeWindowItem {
  label: string;
  value: string;
  days: number | null;
}

export interface AdminSidebarLink {
  label: string;
  href: string;
}

export interface AdminTocItem {
  num: string;
  label: string;
  href: string;
  children?: AdminTocItem[];
}

export const adminContent = {
  metadata: {
    title: "aneeshkumar.com - Administrator's observatory",
    description: "Observability dashboard",
  },
  articleTitle: "aneeshkumar.com",
  sourceLine: "From the administrator's observatory",
  publicArticleLabel: "Home",
  publicArticleHref: "/",
  tabs: [
    { key: "dashboard", label: "Dashboard", href: "/admin" },
    { key: "ama", label: "AMA", href: "/admin/ama" },
    { key: "raw", label: "Raw data", href: "/admin/raw" },
    { key: "live", label: "Live", href: "/admin/live" },
  ] satisfies AdminTabItem[],
  loginTabs: [
    { key: "login", label: "Log in", href: "/admin/login" },
    { key: "dashboard", label: "Return to site", href: "/" },
  ] satisfies AdminTabItem[],
  sidebar: {
    windowsHeading: "Data views",
    windowsSummary: "6 windows",
    toolsHeading: "Admin tools",
    siteHeading: "Site",
    windows: [
      { label: "Last 24 hours", value: "24h", days: 1 },
      { label: "Last 7 days", value: "7d", days: 7 },
      { label: "Last 30 days", value: "30d", days: 30 },
      { label: "Last 90 days", value: "90d", days: 90 },
      { label: "Last year", value: "1y", days: 365 },
      { label: "All time", value: "all", days: null },
    ] satisfies AdminTimeWindowItem[],
    tools: [
      { label: "Ask Me Anything", href: "/admin/ama" },
      { label: "Raw data", href: "/admin/raw" },
      { label: "Live view", href: "/admin/live" },
    ] satisfies AdminSidebarLink[],
    siteLinks: [
      { label: "Return to site", href: "/" },
    ] satisfies AdminSidebarLink[],
  },
  tableOfContents: [
    {
      num: "1",
      label: "Traffic",
      href: "#traffic",
      children: [
        { num: "1.1", label: "Pageviews over time", href: "#pageviews-over-time" },
        { num: "1.2", label: "Visitors and sessions", href: "#visitors-and-sessions" },
      ],
    },
    {
      num: "2",
      label: "Content",
      href: "#content",
      children: [
        { num: "2.1", label: "Most-read pages", href: "#most-read-pages" },
        { num: "2.2", label: "Outbound links", href: "#outbound-links" },
        { num: "2.3", label: "Search queries", href: "#search-queries" },
      ],
    },
    {
      num: "3",
      label: "Engagement",
      href: "#engagement",
      children: [
        { num: "3.1", label: "Scroll depth", href: "#scroll-depth" },
        { num: "3.2", label: "Time on page", href: "#time-on-page" },
      ],
    },
    {
      num: "4",
      label: "Acquisition",
      href: "#acquisition",
      children: [
        { num: "4.1", label: "Referrers", href: "#referrers" },
        { num: "4.2", label: "Geography", href: "#geography" },
      ],
    },
    {
      num: "5",
      label: "Client environment",
      href: "#client-environment",
      children: [
        { num: "5.1", label: "Device, browser, OS", href: "#device-browser-os" },
      ],
    },
    {
      num: "6",
      label: "Operational",
      href: "#operational",
      children: [
        { num: "6.1", label: "Performance", href: "#performance" },
        { num: "6.2", label: "JavaScript errors", href: "#javascript-errors" },
      ],
    },
    { num: "7", label: "Methodology", href: "#methodology" },
    { num: "8", label: "See also", href: "#see-also" },
    { num: "9", label: "References", href: "#references" },
  ] satisfies AdminTocItem[],
  infobox: {
    title: "aneeshkumar.com",
    subtitle: "Observability summary",
    siteType: "Personal portfolio",
  },
  notes: {
    dashboard:
      "This is the administrator's private observability dashboard for the website.",
    ama:
      "Questions submitted through the public Ask Me Anything page stay private until an answer is published.",
    raw:
      "Raw event stream. This is the underlying data that the main dashboard aggregates. Sorted newest-first.",
    live: "Live view. Visitors active in the last 5 minutes.",
    login:
      "This page is restricted to the site administrator. For the public Kumarpedia article, see",
  },
  seeAlso: [
    {
      label: "Home",
      href: "/",
      description: "the public landing page",
    },
    {
      label: "Ask Me Anything",
      href: "/blog",
      description: "anonymous questions and published answers",
    },
    {
      label: "Independent Work",
      href: "/independent-work",
      description: "independent products and research prototypes",
    },
    {
      label: "Media",
      href: "/media",
    },
    {
      label: "Raw event stream",
      href: "/admin/raw",
      description: "the underlying events, unaggregated",
    },
    {
      label: "Live view",
      href: "/admin/live",
      description: "rolling 5-minute window",
    },
  ] satisfies Array<AdminSidebarLink & { description?: string }>,
};
