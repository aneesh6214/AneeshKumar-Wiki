import type { Infobox } from "@/lib/json-content";

export const aneeshKumarInfobox: Infobox = {
  image: "/images/profile/profile-photo.png",
  imageCaption: "Aneesh Kumar in 2025",
  email: "aneesh.kumar6214@gmail.com",
  socialLinks: [
    {
      platform: "linkedin",
      href: "https://linkedin.com/in/aneesh6214",
      label: "LinkedIn",
    },
    {
      platform: "github",
      href: "https://github.com/aneesh6214",
      label: "GitHub",
    },
    {
      platform: "youtube",
      href: "https://www.youtube.com/@Aneesh6214",
      label: "YouTube",
    },
  ],
  fields: [
    { label: "Location", value: "San Francisco Bay Area" },
    {
      label: "Position",
      value: "Associate Platform Engineer",
    },
    { label: "Institution", value: "[Quantifind](https://www.quantifind.com/)" },
    {
      label: "Education",
      value:
        "B.S. Computer Science\nSan Francisco State University\nMinor in Mathematics",
    },
  ],
};
