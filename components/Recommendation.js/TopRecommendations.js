"use client";

import React from "react";
import { useLocale, useTranslations } from "next-intl";
import { useProactiveRecommendations } from "@/components/ProactiveProvider/ProactiveProvider";

function useLocalizedText(locale, item, field) {
  if (locale === "ar") return item[`${field}_ar`] || item[`${field}_en`] || item[field];
  return item[`${field}_en`] || item[`${field}_ar`] || item[field];
}

export default function TopRecommendations({ onSelect, activeTitle }) {
  const { recommendations, loading } = useProactiveRecommendations();
  const locale = useLocale();
  const t = useTranslations("homepage");
  const topThree = recommendations.slice(0, 3);

  const handleClick = (item) => {
    if (!onSelect) return;
    onSelect(item, useLocalizedText(locale, item, "title"));
  };

  return (
    <div className="space-y-4 text-center">
      <p className="text-lg font-semibold text-emerald-50">{t("proactive.prompt")}</p>
      {loading ? (
        <p className="text-sm text-emerald-100">{t("proactive.loading")}</p>
      ) : (
        <div className="flex flex-wrap justify-center gap-3">
          {topThree.map((item, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleClick(item)}
              aria-pressed={activeTitle === useLocalizedText(locale, item, "title")}
              className={`rounded-full border px-4 py-2 text-sm font-semibold text-emerald-50 shadow-sm transition hover:-translate-y-[1px] hover:border-emerald-300 hover:bg-emerald-600/70 ${
                activeTitle === useLocalizedText(locale, item, "title") ? "border-emerald-200 bg-emerald-600/80" : "border-emerald-400/60 bg-emerald-700/70"
              }`}
              aria-label={useLocalizedText(locale, item, "title")}>
              {useLocalizedText(locale, item, "title")}
            </button>
          ))}
          {topThree.length === 0 ? <p className="text-sm text-emerald-100">{t("proactive.loading")}</p> : null}
        </div>
      )}
    </div>
  );
}
