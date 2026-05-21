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
  banner: {
    text: string;
    separator: string;
    repeatCount: number;
  };
  navigation: SiteNavigationItem[];
  infobox: {
    defaultTitle: string;
  };
  sidebar: {
    decorativeImage: {
      src: string;
      width: number;
      height: number;
    };
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
  banner: {
    text: "Aneesh Kumar Rocks",
    separator: "·",
    repeatCount: 12,
  },
  navigation: [
    { href: "/", label: "About", sidebarLabel: "Home" },
    {
      href: "/professional-work",
      label: "Professional Work",
      sidebarLabel: "Professional Work",
    },
    {
      href: "/independent-work",
      label: "Independent Work",
      sidebarLabel: "Independent Work",
    },
    { href: "/media", label: "Media", sidebarLabel: "Media" },
    { href: "/blog", label: "Ask Me Anything", sidebarLabel: "Ask Me Anything" },
  ],
  infobox: {
    defaultTitle: "Aneesh Kumar",
  },
  sidebar: {
    decorativeImage: {
      src: "/aang.jpg",
      width: 333,
      height: 250,
    },
  },
};
