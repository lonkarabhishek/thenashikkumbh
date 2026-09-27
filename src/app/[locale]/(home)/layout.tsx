import { Metadata } from "next";
import { SEO_COPY } from "@/i18n/seoCopy";
import type { Locale } from "@/i18n/translations";
import { pageMetadata } from "@/lib/seo";

type Params = { params: { locale: Locale } };

// The home page is a client component and cannot export metadata itself, so
// it lives in this route-group layout (the group adds no URL segment).
export function generateMetadata({ params }: Params): Metadata {
  const home = SEO_COPY.home[params.locale];
  return pageMetadata({
    locale: params.locale,
    title: home.title,
    description: home.description,
    path: "/",
    absoluteTitle: true,
    imageAlt: "Nashik Kumbh Mela 2027 - नाशिक कुंभमेळा २०२७",
  });
}

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return children;
}
