"use client";

import { motion } from "framer-motion";
import Link from "next/link";

interface CTABannerProps {
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  variant?: "gold" | "dark";
}

export default function CTABanner({
  title,
  description,
  buttonText,
  buttonLink,
  variant = "dark",
}: CTABannerProps) {
  return (
    <motion.section
      className="relative w-full overflow-hidden"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8 }}
    >
      <div
        className="relative py-20 md:py-28"
        style={{
          background:
            variant === "dark"
              ? "linear-gradient(135deg, #1a0a00 0%, #0D0906 50%, #1a0a00 100%)"
              : "linear-gradient(135deg, #D4A843 0%, #B8922D 50%, #D4A843 100%)",
        }}
      >
        {/* Subtle pattern */}
        <div className="absolute inset-0 temple-pattern opacity-[0.03]" />

        {/* Radial glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,168,67,0.06)_0%,transparent_70%)]" />

        <div className="relative section-container text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <div className="sacred-divider max-w-xs mx-auto mb-8">
              <span className="text-sm font-devanagari" style={{ color: "#D4A843" }}>
                ॐ
              </span>
            </div>

            <h2
              className={`text-3xl md:text-5xl font-heading font-bold mb-6 leading-tight ${
                variant === "dark" ? "text-cream-100" : "text-[#0D0906]"
              }`}
            >
              {title}
            </h2>

            <p
              className={`text-lg max-w-2xl mx-auto mb-10 leading-relaxed ${
                variant === "dark" ? "text-cream-300/70" : "text-[#0D0906]/70"
              }`}
            >
              {description}
            </p>

            <Link
              href={buttonLink}
              className={
                variant === "dark"
                  ? "btn-gold"
                  : "inline-flex items-center justify-center px-8 py-3.5 font-semibold rounded-full transition-all duration-500 tracking-wide text-sm uppercase bg-[#0D0906] text-cream-100 hover:bg-[#2A2218] shadow-lg hover:-translate-y-0.5"
              }
            >
              {buttonText}
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
