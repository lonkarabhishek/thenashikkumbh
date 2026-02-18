"use client";

import React from "react";
import { motion } from "framer-motion";

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
    <motion.div
      className={`bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 p-6 ${className}`}
      whileHover={{ scale: 1.02, y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
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
    </motion.div>
  );
}
