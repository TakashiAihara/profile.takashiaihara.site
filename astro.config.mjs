import mdx from "@astrojs/mdx";
import partytown from "@astrojs/partytown";
import sitemap from "@astrojs/sitemap";
import icon from "astro-icon";
import { defineConfig } from "astro/config";

// https://astro.build/config
const siteDomain = process.env.SITE_DOMAIN || "profile.takashiaihara.site";

export default defineConfig({
  site: `https://${siteDomain}`,
  // Keep Astro 2's zero-specificity scoping; component styles rely on it (e.g. div.face vs div > div).
  scopedStyleStrategy: "where",
  // Astro 2 kept whitespace between inline nodes; the text-then-emoji lines need that space.
  compressHTML: false,
  integrations: [
    mdx(),
    sitemap(),
    icon(),
    partytown({
      config: {
        forward: ["dataLayer.push"],
      },
    }),
  ],
});
