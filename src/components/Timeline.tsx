"use client";

import React from "react";
import { Calendar } from "lucide-react";

interface TimelineItem {
  date: string;
  event: string;
  nakshatra: string;
  significance: string;
  isMajor: boolean;
}

interface TimelineProps {
  items: TimelineItem[];
}

export default function Timeline({ items }: TimelineProps) {
  return (
    <div className="relative">
      {/* Vertical line - left on mobile, center on desktop */}
      <div className="absolute left-4 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-0.5 bg-gradient-to-b from-saffron-300 via-saffron-400 to-gold-400" />

      <div className="space-y-12">
        {items.map((item, index) => {
          const isLeft = index % 2 === 0;

          return (
            <div
              key={index}
              className="relative flex items-start md:items-center"
            >
              {/* Circle marker */}
              <div
                className={`absolute z-10 rounded-full border-2 border-white ${
                  item.isMajor
                    ? "w-6 h-6 bg-saffron-500 ring-4 ring-saffron-200 left-[5px] md:left-1/2 md:-translate-x-1/2"
                    : "w-4 h-4 bg-gold-500 left-[9px] md:left-1/2 md:-translate-x-1/2"
                }`}
                style={
                  !item.isMajor
                    ? { marginTop: item.isMajor ? 0 : "2px" }
                    : undefined
                }
              />

              {/* Content - always right on mobile, alternating on desktop */}
              <div
                className={`ml-12 md:ml-0 md:w-1/2 ${
                  isLeft
                    ? "md:pr-12 md:text-right"
                    : "md:pl-12 md:ml-auto md:text-left"
                }`}
              >
                <div
                  className={`bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 p-5 border ${
                    item.isMajor
                      ? "border-saffron-200 ring-1 ring-saffron-100"
                      : "border-saffron-50"
                  }`}
                >
                  {/* Date badge */}
                  <div
                    className={`flex items-center gap-2 mb-2 ${
                      isLeft ? "md:justify-end" : "md:justify-start"
                    }`}
                  >
                    <Calendar className="w-4 h-4 text-saffron-500" />
                    <span
                      className={`text-sm font-semibold ${
                        item.isMajor ? "text-saffron-600" : "text-gold-700"
                      }`}
                    >
                      {item.date}
                    </span>
                    {item.isMajor && (
                      <span className="bg-saffron-100 text-saffron-700 text-xs font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">
                        Major
                      </span>
                    )}
                  </div>

                  {/* Event name */}
                  <h3
                    className={`font-heading font-bold text-lg text-temple-800 mb-1 ${
                      item.isMajor ? "text-xl" : ""
                    }`}
                  >
                    {item.event}
                  </h3>

                  {/* Nakshatra */}
                  <p className="text-saffron-500 text-sm font-medium mb-2">
                    {item.nakshatra}
                  </p>

                  {/* Significance */}
                  <p className="text-temple-600 text-sm leading-relaxed">
                    {item.significance}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
