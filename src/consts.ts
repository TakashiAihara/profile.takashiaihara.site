// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

// Site Core Information
export const SITE_TITLE = "Takashi Aihara - Profile";
export const SITE_DESCRIPTION =
  "Full-stack engineer crossing infrastructure, backend, and frontend. AI-first development, IaC, and 50+ niche tech posts on Zenn.";
export const SITE_REPOSITORY_URL =
  "https://github.com/TakashiAihara/profile.takashiaihara.site";
export const ASTRO_REPOSITORY_URL = "https://github.com/withastro/astro";

// SEO
export const GA_ID = "G-HY8ZR2YW2P";

// SNS URLs
export const TWITTER_URL = "https://twitter.com/takashi__aihara";
export const GITHUB_URL = "https://github.com/TakashiAihara";
export const ZENN_URL = "https://zenn.dev/takashiaihara";
export const QIITA_URL = "https://qiita.com/TakashiAihara";

// SNS header consts
export const HEADER_SNS_SETTINGS = [
  {
    name: "GitHub",
    url: GITHUB_URL,
    icon: "simple-icons:github",
    color: "#181717",
  },
  {
    name: "Zenn",
    url: ZENN_URL,
    icon: "simple-icons:zenn",
    color: "#3EA8FF",
  },
  {
    name: "Qiita",
    url: QIITA_URL,
    icon: "simple-icons:qiita",
    color: "#55C500",
  },
  {
    name: "Twitter(X)",
    url: TWITTER_URL,
    icon: "bi:twitter",
    color: "#1DA1F2",
  },
];

export const HEADER_CONTENT_SETTINGS = [
  {
    name: "",
    alt: "Home",
    icon: "ant-design:home-outlined",
    activeIcon: "ant-design:home-filled",
  },
  {
    name: "bio",
    icon: "ph:person-light",
    activeIcon: "ph:person-fill",
  },
  {
    name: "skills",
    icon: "bi:gear",
    activeIcon: "bi:gear-fill",
  },
  {
    name: "portfolio",
    icon: "bi:folder",
    activeIcon: "bi:folder-fill",
  },
  {
    name: "workflow",
    icon: "ph:flow-arrow",
    activeIcon: "ph:flow-arrow-fill",
  },
  {
    name: "blog",
    icon: "ph:book",
    activeIcon: "ph:book-fill",
  },
];

export const IT_CARRIER_SUMMARY_SETTINGS = [
  {
    summary: "Lead Web Developer (Tech Lead)",
    year: 4,
  },
  {
    summary: "Backend Engineer",
    year: 6,
  },
  {
    summary: "Frontend Engineer",
    year: 1,
  },
  {
    summary: "IT Research Analyst",
    year: 1,
  },
  {
    summary: "On-site Help Desk",
    year: 2,
  },
  {
    summary: "On-premises Infrastructure Engineer",
    year: 4,
  },
];

export const DANCER_CARRIER_SUMMARY_SETTINGS = [
  {
    summary: "Hiphop",
    year: 5,
  },
  {
    summary: "B-boying Breaking",
    year: 4,
  },
];

export const BIO_SUMMARY_SETTINGS = [
  {
    content: "Full-stack engineer crossing infra, backend, and frontend",
    emoji: "🧑‍💻",
  },
  {
    content: "I lead delivery platform design & AI tooling at work",
    emoji: "⚙️",
  },
  {
    content: "I share niche tech notes on Zenn (50+ posts)",
    emoji: "📝",
  },
  {
    content: "I want to keep shipping fun things!",
    emoji: "✨",
  },
];

export const CONTENTS = ["bio", "skills", "portfolio", "workflow", "blog"] as const;
