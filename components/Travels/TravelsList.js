"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

const normalizeKey = (value) => value.toLowerCase().replace(/[^a-z0-9]+/g, "-");

export default function TravelsList({ travels }) {
  const t = useTranslations("homepage");
  const [showAllTravels, setShowAllTravels] = useState(false);
  const visibleTravels = showAllTravels ? travels : travels.slice(0, 1);

  return (
    <>
      <div className="mt-3 space-y-3">
        {visibleTravels.map((travel) => (
          <div key={travel.travel_id} className="rounded-md border border-slate-100 bg-slate-50 px-4 py-3">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-slate-800">
                {travel.city}, {travel.destination_country}
              </p>
              <span className="text-xs font-semibold text-slate-500">
                {t(`dashboard.travels.purposes.${normalizeKey(travel.travel_purpose)}`)}
              </span>
            </div>
            <p className="text-xs text-slate-500">
              {t("dashboard.travels.labels.airline")}: {travel.airline}
            </p>
            <div className="mt-2 grid grid-cols-2 gap-2 text-xs text-slate-700">
              <div className="rounded bg-white px-2 py-1">
                <p className="text-[11px] uppercase text-slate-500">{t("dashboard.travels.labels.entry")}</p>
                <p className="font-semibold">{travel.entry_date}</p>
              </div>
              <div className="rounded bg-white px-2 py-1">
                <p className="text-[11px] uppercase text-slate-500">{t("dashboard.travels.labels.exit")}</p>
                <p className="font-semibold">{travel.exit_date}</p>
              </div>
              <div className="rounded bg-white px-2 py-1">
                <p className="text-[11px] uppercase text-slate-500">{t("dashboard.travels.labels.duration")}</p>
                <p className="font-semibold">
                  {travel.travel_duration_days} {t("dashboard.travels.labels.days")}
                </p>
              </div>
              <div className="rounded bg-white px-2 py-1">
                <p className="text-[11px] uppercase text-slate-500">{t("dashboard.travels.labels.method")}</p>
                <p className="font-semibold">{t(`dashboard.travels.methods.${normalizeKey(travel.travel_method)}`)}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      {travels.length > 1 ? (
        <div className="mt-3 flex justify-center">
          <button
            type="button"
            onClick={() => setShowAllTravels((prev) => !prev)}
            className="text-sm font-semibold text-green-700 hover:text-green-800">
            {showAllTravels ? t("dashboard.travels.actions.showLess") : t("dashboard.travels.actions.showMore")}
          </button>
        </div>
      ) : null}
    </>
  );
}
