"use client";

import { BadgeCheck, Radio } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { STATUS_HINT, STATUS_LABEL } from "./newsCopy";

/** "Confirmed" (green) or "Media report" (amber), with the meaning on hover. */
export default function StatusBadge({
  status,
  size = "sm",
}: {
  status: "confirmed" | "reported";
  size?: "sm" | "md";
}) {
  const { locale } = useLanguage();
  const Icon = status === "confirmed" ? BadgeCheck : Radio;
  return (
    <span
      title={STATUS_HINT[status][locale]}
      className={`inline-flex shrink-0 items-center gap-1 whitespace-nowrap rounded-full font-semibold ${
        size === "md" ? "px-3 py-1 text-xs" : "px-2 py-0.5 text-[0.6875rem]"
      } ${status === "confirmed" ? "bg-river-100 text-river-800" : "bg-saffron-100 text-saffron-800"}`}
    >
      <Icon className={size === "md" ? "h-3.5 w-3.5" : "h-3 w-3"} />
      {STATUS_LABEL[status][locale]}
    </span>
  );
}
