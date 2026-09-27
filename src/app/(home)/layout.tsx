import { Metadata } from "next";
import { SITE_URL } from "@/lib/seo";

// The home page is a client component and cannot export metadata itself, so
// its canonical lives in this route-group layout (the group adds no URL segment).
export const metadata: Metadata = {
  alternates: { canonical: SITE_URL },
};

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return children;
}
