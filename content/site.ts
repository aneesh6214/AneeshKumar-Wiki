export interface SiteNavigationItem {
  href: string;
  label: string;
  sidebarLabel: string;
}

export interface SiteContent {
  metadata: {
    title: string;
    description: string;
  };
  source: {
    name: string;
    line: string;
  };
  languageSelector: {
    label: string;
    menuTitle: string;
    unavailableMessage: string;
  };
  search: {
    triggerLabel: string;
    dialogTitle: string;
  };
  articleOfDay: {
    label: string;
    selectionLabel: string;
    fallbackTitle: string;
    fallbackExtract: string;
    decorativeImage: {
      src: string;
      width: number;
      height: number;
      alt: string;
    };
  };
  navigation: SiteNavigationItem[];
  infobox: {
    defaultTitle: string;
  };
}

export const siteContent: SiteContent = {
  metadata: {
    title: "Aneesh Kumar - Personal Website",
    description:
      "Personal website of Aneesh Kumar, Software Engineer and AI researcher",
  },
  source: {
    name: "Kumarpedia",
    line: "From Kumarpedia, the free encyclopedia",
  },
  languageSelector: {
    label: "142 languages",
    menuTitle: "Languages",
    unavailableMessage: "Sorry! This feature has not been implemented yet.",
  },
  search: {
    triggerLabel: "Search this site",
    dialogTitle: "Search Kumarpedia",
  },
  articleOfDay: {
    label: "Article of the Day",
    selectionLabel: "Aneesh's pick",
    fallbackTitle: "",
    fallbackExtract: "",
    decorativeImage: {
      src: "/aang.png",
      width: 912,
      height: 912,
      alt: "",
    },
  },
  navigation: [
    { href: "/", label: "About", sidebarLabel: "Home" },
    {
      href: "/career",
      label: "Career",
      sidebarLabel: "Career",
    },
    {
      href: "/projects",
      label: "Projects",
      sidebarLabel: "Projects",
    },
    { href: "/media", label: "Media", sidebarLabel: "Media" },
    { href: "/ama", label: "Ask Me Anything", sidebarLabel: "Ask Me Anything" },
  ],
  infobox: {
    defaultTitle: "Aneesh Kumar",
  },
};
