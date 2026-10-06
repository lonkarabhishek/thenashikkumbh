import { NextResponse, type NextRequest } from "next/server";
import { isLocale } from "@/i18n/locales";
import type { Locale } from "@/i18n/translations";

/**
 * Every page lives under /mr, /hi or /en on www.thenashikkumbh.com.
 *
 * - Unprefixed URLs are the pre-September-2026 pages, which were English and
 *   earned their rankings on English searches. They 301 straight to the /en
 *   version in a single hop, so those signals land on the matching language.
 * - Requests on any other host we own (the bare domain, kumbh.si) 301 to the
 *   same page on www in that same single hop.
 *
 * Deliberately no Accept-Language sniffing: everyone, including crawlers,
 * lands on exactly the URL they asked for. The language switcher changes it.
 */
const CANONICAL_HOST = "www.thenashikkumbh.com";
const ALIAS_HOSTS = new Set(["thenashikkumbh.com", "kumbh.si", "www.kumbh.si"]);
const LEGACY_LOCALE: Locale = "en";

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const host = (request.headers.get("host") ?? "").toLowerCase().replace(/:\d+$/, "");
  const prefixed = isLocale(pathname.split("/")[1]);
  const onAlias = ALIAS_HOSTS.has(host);

  if (prefixed && !onAlias) return NextResponse.next();

  const target = prefixed
    ? pathname
    : `/${LEGACY_LOCALE}${pathname === "/" ? "" : pathname}`;

  const url = request.nextUrl.clone();
  if (onAlias) {
    url.protocol = "https";
    url.host = CANONICAL_HOST;
    url.port = "";
  }
  url.pathname = target;
  url.search = search;
  return NextResponse.redirect(url, 301);
}

export const config = {
  // Skip Next internals, the RSS feed, and any path with a file extension
  // (images, audio, sitemaps, robots.txt, manifest.json, sw.js, icons).
  matcher: ["/((?!_next/|api/|feed(?:/|$)|.*\\.[^/]+$).*)"],
};
