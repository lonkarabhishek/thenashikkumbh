// The real root layout, with <html lang>, is src/app/[locale]/layout.tsx:
// every page lives under a language prefix. This pass-through exists so the
// top-level not-found page and metadata routes (sitemap, robots) have a parent.
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
