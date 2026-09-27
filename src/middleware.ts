import { NextResponse, type NextRequest } from "next/server";
import { DEFAULT_LOCALE, isLocale } from "@/i18n/locales";

/**
 * Every page lives under /mr, /hi or /en. Unprefixed URLs (all links shared
 * and indexed before the language prefixes existed) 301 to the Marathi
 * version so they keep working and pass their ranking to the new URL.
 *
 * Deliberately no Accept-Language sniffing: everyone, including crawlers,
 * lands on exactly the URL they asked for. The language switcher changes it.
 */
export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const first = pathname.split("/")[1];
  if (isLocale(first)) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = `/${DEFAULT_LOCALE}${pathname === "/" ? "" : pathname}`;
  url.search = search;
  return NextResponse.redirect(url, 301);
}

export const config = {
  // Skip Next internals and any path with a file extension (images, audio,
  // sitemap.xml, robots.txt, manifest.json, sw.js, icons).
  matcher: ["/((?!_next/|api/|.*\\.[^/]+$).*)"],
};
