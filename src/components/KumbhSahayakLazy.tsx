"use client";

import dynamic from "next/dynamic";

// The assistant carries the whole knowledge base (~150 KB of answers). Load
// it after the page has rendered instead of in every page's first bundle.
const KumbhSahayak = dynamic(() => import("@/components/KumbhSahayak"), { ssr: false });

export default function KumbhSahayakLazy() {
  return <KumbhSahayak />;
}
