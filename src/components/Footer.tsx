"use client";

import Link from "next/link";
import {
  Facebook,
  Instagram,
  Youtube,
  Twitter,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/i18n/translations";

const navItems = [
  { href: "/", labelKey: "home" as const },
  { href: "/about", labelKey: "about" as const },
  { href: "/ghats", labelKey: "ghats" as const },
  { href: "/dates", labelKey: "dates" as const },
  { href: "/guide", labelKey: "guide" as const },
  { href: "/events", labelKey: "events" as const },
  { href: "/gallery", labelKey: "gallery" as const },
  { href: "/businesses", labelKey: "businesses" as const },
];

const socialLinks = [
  { icon: Facebook, href: "https://facebook.com/thenashikkumbh", label: "Facebook" },
  { icon: Instagram, href: "https://instagram.com/thenashikkumbh", label: "Instagram" },
  { icon: Youtube, href: "https://youtube.com/@thenashikkumbh", label: "YouTube" },
  { icon: Twitter, href: "https://twitter.com/thenashikkumbh", label: "Twitter" },
];

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="relative overflow-hidden">
      {/* Gold top line */}
      <div className="gold-line-thick" />

      {/* Main footer */}
      <div
        className="relative"
        style={{
          background: "linear-gradient(180deg, #1A1510 0%, #0D0906 100%)",
        }}
      >
        {/* Subtle mandala pattern */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="absolute inset-0 temple-pattern" />
        </div>

        <div className="relative section-container py-16 md:py-20">
          {/* Top section - Logo & description */}
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 mb-16">
            {/* Brand */}
            <div className="lg:w-1/3">
              <Link href="/" className="inline-block mb-6 group">
                <div className="flex items-center gap-3">
                  <span
                    className="text-3xl font-devanagari transition-all duration-500 group-hover:scale-110"
                    style={{
                      color: "#D4A843",
                      textShadow: "0 0 25px rgba(212,168,67,0.4)",
                    }}
                  >
                    ॐ
                  </span>
                  <div>
                    <span className="text-xl font-heading font-bold text-cream-100 tracking-wide">
                      Nashik Kumbh
                    </span>
                    <span
                      className="block text-xs tracking-[0.3em] uppercase"
                      style={{ color: "#D4A843" }}
                    >
                      2027
                    </span>
                  </div>
                </div>
              </Link>
              <p className="text-cream-300/70 leading-relaxed text-sm max-w-sm">
                {t(translations.footer.description)}
              </p>

              {/* Social links */}
              <div className="flex gap-3 mt-6">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:-translate-y-1"
                    style={{
                      border: "1px solid rgba(212,168,67,0.2)",
                      color: "rgba(212,168,67,0.7)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "#D4A843";
                      e.currentTarget.style.color = "#D4A843";
                      e.currentTarget.style.boxShadow =
                        "0 4px 20px rgba(212,168,67,0.2)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor =
                        "rgba(212,168,67,0.2)";
                      e.currentTarget.style.color = "rgba(212,168,67,0.7)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  >
                    <social.icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="lg:w-1/4">
              <h3
                className="text-sm font-semibold uppercase tracking-[0.2em] mb-6"
                style={{ color: "#D4A843" }}
              >
                {t(translations.footer.quickLinks)}
              </h3>
              <ul className="space-y-3">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-cream-300/60 hover:text-cream-100 transition-colors duration-300 text-sm flex items-center gap-2 group"
                    >
                      <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" style={{ color: "#D4A843" }} />
                      {t(translations.nav[item.labelKey])}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div className="lg:w-1/4">
              <h3
                className="text-sm font-semibold uppercase tracking-[0.2em] mb-6"
                style={{ color: "#D4A843" }}
              >
                {t(translations.footer.contact)}
              </h3>
              <ul className="space-y-4">
                <li>
                  <a
                    href="mailto:info@thenashikkumbh.com"
                    className="flex items-center gap-3 text-cream-300/60 hover:text-cream-100 transition-colors text-sm"
                  >
                    <Mail className="w-4 h-4 flex-shrink-0" style={{ color: "#D4A843" }} />
                    info@thenashikkumbh.com
                  </a>
                </li>
                <li>
                  <a
                    href="tel:+919999999999"
                    className="flex items-center gap-3 text-cream-300/60 hover:text-cream-100 transition-colors text-sm"
                  >
                    <Phone className="w-4 h-4 flex-shrink-0" style={{ color: "#D4A843" }} />
                    +91 99999 99999
                  </a>
                </li>
                <li className="flex items-start gap-3 text-cream-300/60 text-sm">
                  <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: "#D4A843" }} />
                  <span>
                    Ram Kund, Panchavati,
                    <br />
                    Nashik, Maharashtra 422003
                  </span>
                </li>
              </ul>
            </div>

            {/* Newsletter */}
            <div className="lg:w-1/4">
              <h3
                className="text-sm font-semibold uppercase tracking-[0.2em] mb-6"
                style={{ color: "#D4A843" }}
              >
                {t(translations.footer.newsletter)}
              </h3>
              <p className="text-cream-300/60 text-sm mb-4">
                {t(translations.home.newsletterDesc)}
              </p>
              <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="email"
                  placeholder={t(translations.home.emailPlaceholder)}
                  className="flex-1 px-4 py-2.5 rounded-full text-sm bg-white/5 border border-white/10 text-cream-100 placeholder:text-cream-300/40 focus:outline-none focus:border-[#D4A843]/50 transition-colors"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5"
                  style={{
                    background: "linear-gradient(135deg, #D4A843, #B8922D)",
                    color: "#0D0906",
                  }}
                >
                  →
                </button>
              </form>
            </div>
          </div>

          {/* Made by Nashikkar */}
          <div className="text-center mb-10">
            <p
              className="text-sm font-semibold tracking-wide mb-1"
              style={{ color: "#D4A843" }}
            >
              {t(translations.footer.madeBy)} ❤️
            </p>
            <p className="text-cream-300/50 text-xs max-w-md mx-auto leading-relaxed">
              {t(translations.footer.disclaimer)}
            </p>
          </div>

          {/* Bottom bar */}
          <div className="gold-line mb-6" />
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-cream-300/40 text-xs">
              &copy; 2027 TheNashikKumbh.com. {t(translations.footer.copyright)}
            </p>
            <p className="text-cream-300/30 text-xs font-devanagari">
              ॐ नमो भगवते वासुदेवाय ॥
            </p>
          </div>

          {/* Creator credit */}
          <div className="mt-6 text-center">
            <p className="text-cream-300/30 text-xs">
              {t(translations.footer.madeByCreator)}{" "}
              <a
                href="https://workwithabhi.online"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors duration-300 hover:text-cream-100"
                style={{ color: "rgba(212,168,67,0.5)" }}
              >
                workwithabhi.online
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
