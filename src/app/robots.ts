import type { MetadataRoute } from "next";
import { siteMetadata } from "@/lib/metadata";

/** Autorise l'indexation complète et pointe vers le sitemap. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${siteMetadata.url}/sitemap.xml`,
  };
}
