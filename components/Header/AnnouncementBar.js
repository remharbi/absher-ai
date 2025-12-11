"use client";

import React from "react";

export default function AnnouncementBar({ message, visible = true, onClose }) {
  if (!visible) return null;

  return (
    <div className="w-full overflow-hidden bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500 text-white shadow-sm transition-[max-height,opacity] duration-500 ease-out">
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-2 text-sm sm:px-6 lg:px-10">
        <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/15 text-xs font-semibold">★</span>
        <p className="flex-1 font-semibold">{message || "New: Explore the latest Absher services and announcements."}</p>
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
