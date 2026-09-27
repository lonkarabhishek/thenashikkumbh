import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/seo";

// Metadata lives in page.tsx. This page's body is English only, so its
// breadcrumb points at the /en URL that every language canonicalises to.
export default function BusinessesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={breadcrumbSchema("en", [{ name: "Businesses", path: "/businesses" }])} />
      {children}
    </>
  );
}
