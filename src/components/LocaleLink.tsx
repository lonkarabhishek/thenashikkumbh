"use client";

import NextLink from "next/link";
import { forwardRef, type ComponentProps } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { localizePath } from "@/i18n/locales";

type Props = ComponentProps<typeof NextLink>;

/**
 * Drop-in replacement for next/link that keeps the visitor in their current
 * language: href="/dates" renders as /mr/dates, /hi/dates or /en/dates.
 */
const LocaleLink = forwardRef<HTMLAnchorElement, Props>(function LocaleLink(
  { href, ...rest },
  ref
) {
  const { locale } = useLanguage();
  const localized = typeof href === "string" ? localizePath(href, locale) : href;
  return <NextLink ref={ref} href={localized} {...rest} />;
});

export default LocaleLink;
