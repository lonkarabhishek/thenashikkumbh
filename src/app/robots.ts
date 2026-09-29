import { MetadataRoute } from "next";

// One group only. A separate `Googlebot` group would replace, not extend, the
// `*` rules for Google, silently re-allowing everything disallowed below.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/admin/"],
      },
    ],
    sitemap: "https://www.thenashikkumbh.com/sitemap.xml",
  };
}
