"use client";

import Link from "@/components/LocaleLink";
import { useLanguage } from "@/context/LanguageContext";
import AuthorBox from "@/components/trust/AuthorBox";
import type { Faq, L } from "@/components/tools/toolCopy";

export interface RelatedLink { href: string; label: L }

/** FAQ list, related links (3+ with descriptive anchors) and the author box. */
export default function ToolFooter({
  faqH, faqs, relatedH, related,
}: { faqH: L; faqs: Faq[]; relatedH: L; related: RelatedLink[] }) {
  const { locale } = useLanguage();
  return (
    <>
      <section className="mt-14" aria-labelledby="tool-faq">
        <h2 id="tool-faq" className="font-heading text-2xl font-bold text-temple-900">{faqH[locale]}</h2>
        <div className="mt-4 space-y-3">
          {faqs.map((f) => (
            <details key={f.q.en} className="rounded-xl border border-temple-200 bg-white p-4">
              <summary className="cursor-pointer font-semibold text-temple-900">{f.q[locale]}</summary>
              <p className="mt-2 leading-relaxed text-temple-700">{f.a[locale]}</p>
            </details>
          ))}
        </div>
      </section>
      <nav className="mt-10 rounded-xl border border-temple-200 bg-cream-50 p-5" aria-label={relatedH[locale]}>
        <h2 className="font-heading text-lg font-bold text-temple-900">{relatedH[locale]}</h2>
        <ul className="mt-3 list-disc space-y-1 pl-5">
          {related.map((r) => (
            <li key={r.href}><Link href={r.href} className="text-temple-900 underline">{r.label[locale]}</Link></li>
          ))}
        </ul>
      </nav>
      <AuthorBox />
    </>
  );
}
