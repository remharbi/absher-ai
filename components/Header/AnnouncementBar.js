"use client";

import React from "react";
import Link from "next/link";
import { useLocale } from "next-intl";

export default function AnnouncementBar({ message, visible = true, onClose, cta }) {
  if (!visible) return null;
  const locale = useLocale();
  const direction = locale === "ar" ? "rtl" : "ltr";

  return (
    <div className="w-full overflow-hidden bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500 text-white shadow-sm transition-[max-height,opacity] duration-500 ease-out">
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-2 text-sm sm:px-6 lg:px-10">
        <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/15 text-xs font-semibold">★</span>
        <div className="announcement-marquee flex-1 font-semibold" data-direction={direction}>
          <span>{message || "New: Explore the latest Absher services and announcements."}</span>
        </div>
        {cta?.href ? (
          <Link
            href={cta.href}
            className="inline-flex items-center gap-1 rounded-full border border-white/30 bg-white/15 px-3 py-1 text-xs font-semibold text-white transition hover:bg-white/25">
            {cta.label}
          </Link>
        ) : null}
        {onClose ? (
          <button
            type="button"
            aria-label="Close announcement"
            className="inline-flex hover:cursor-pointer h-7 w-7 items-center justify-center rounded-full border border-white/30 bg-white/15 text-white backdrop-blur transition hover:bg-white/25"
            onClick={onClose}>
            ×
          </button>
        ) : null}
      </div>
    </div>
  );
}
