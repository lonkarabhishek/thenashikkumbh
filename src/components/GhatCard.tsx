"use client";

import React from "react";
import { Clock, MapPin } from "lucide-react";

interface GhatCardProps {
  name: string;
  subtitle: string;
  description: string;
  rituals: string[];
  timings: string;
  image: string;
  index: number;
}

export default function GhatCard({
  name,
  subtitle,
  description,
  rituals,
  timings,
  image,
  index,
}: GhatCardProps) {
  const isEven = index % 2 === 0;

  return (
    <div className="card-sacred mb-12">
      <div
        className={`flex flex-col ${
          isEven ? "md:flex-row" : "md:flex-row-reverse"
        }`}
      >
        {/* Image Section */}
        <div className="md:w-1/2 relative">
          <div
            className="h-[300px] bg-gradient-to-br from-saffron-100 to-saffron-200 flex items-center justify-center relative overflow-hidden"
            style={{
              backgroundImage: image ? `url(${image})` : undefined,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {!image && (
              <>
                <div className="absolute inset-0 bg-gradient-to-br from-saffron-100 to-saffron-200" />
                <div className="relative z-10 text-center px-6">
                  <MapPin className="w-10 h-10 text-saffron-400 mx-auto mb-3" />
                  <h3 className="text-2xl font-heading font-bold text-saffron-700">
                    {name}
                  </h3>
                </div>
              </>
            )}
            {image && (
              <div className="absolute inset-0 bg-gradient-to-t from-temple-900/60 via-transparent to-transparent" />
            )}
            {image && (
              <div className="absolute bottom-4 left-4 z-10">
                <span className="bg-saffron-500 text-white text-sm font-semibold px-3 py-1 rounded-full">
                  {name}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Content Section */}
        <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-center">
          <h3 className="text-2xl font-heading font-bold text-temple-800 mb-1">
            {name}
          </h3>
          <p className="text-saffron-500 font-medium text-sm mb-4">
            {subtitle}
          </p>
          <p className="text-temple-600 leading-relaxed mb-5">{description}</p>

          {/* Rituals List */}
          {rituals.length > 0 && (
            <div className="mb-5">
              <h4 className="text-sm font-semibold text-temple-700 uppercase tracking-wider mb-2">
                Rituals & Activities
              </h4>
              <ul className="space-y-1.5">
                {rituals.map((ritual, i) => (
                  <li key={i} className="flex items-start gap-2 text-temple-600">
                    <span className="mt-1.5 w-2 h-2 rounded-full bg-saffron-400 shrink-0" />
                    <span>{ritual}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Timings */}
          <div className="flex items-center gap-2 text-temple-500 border-t border-saffron-100 pt-4">
            <Clock className="w-4 h-4 text-saffron-500" />
            <span className="text-sm font-medium">{timings}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
