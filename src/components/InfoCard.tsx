"use client";

import React from "react";

interface InfoCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  className?: string;
}

export default function InfoCard({
  title,
  description,
  icon,
  className = "",
}: InfoCardProps) {
  return (
    <div
      className={`bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 p-6 ${className}`}
    >
      {/* Icon Circle */}
      <div className="w-14 h-14 rounded-full bg-saffron-100 flex items-center justify-center mb-5 text-saffron-500">
        {icon}
      </div>

      {/* Title */}
      <h3 className="font-heading font-bold text-xl text-temple-800 mb-2">
        {title}
      </h3>

      {/* Description */}
      <p className="text-temple-600 leading-relaxed text-sm">{description}</p>
    </div>
  );
}
