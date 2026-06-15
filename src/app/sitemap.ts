import type { MetadataRoute } from "next";
import { siteMetadata } from "@/lib/metadata";

/** Sitemap minimal : le site est une landing one-page. */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteMetadata.url,
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
