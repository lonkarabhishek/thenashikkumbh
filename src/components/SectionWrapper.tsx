"use client";

import React from "react";

interface SectionWrapperProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  title?: string;
  subtitle?: string;
  ornament?: boolean;
}

export default function SectionWrapper({
  children,
  className = "",
  id,
  title,
  subtitle,
  ornament = true,
}: SectionWrapperProps) {
  return (
    <section
      id={id}
      className={`w-full py-16 md:py-24 ${className}`}
    >
      <div className="section-container">
        {title && (
          <div className="text-center mb-12">
            <h2 className="gradient-text text-3xl md:text-4xl font-heading font-bold mb-4">
              {title}
            </h2>
            {subtitle && (
              <p className="text-temple-500 text-lg max-w-2xl mx-auto">
                {subtitle}
              </p>
            )}
            {ornament && (
              <div className="sacred-divider mt-6">
                <span className="om-decoration select-none" aria-hidden="true">
                  ॐ
                </span>
              </div>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
