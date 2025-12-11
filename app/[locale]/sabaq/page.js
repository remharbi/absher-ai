"use client";

import React, { useEffect, useState } from "react";
import Orb from "@/components/Orb/Orb";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";

export default function page() {
  const t = useTranslations("sabaq");
  const pathname = usePathname().split("/")[2];
  const isSabaq = pathname === "sabaq";
  const [hideContent, setHideContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setHideContent(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`min-h-screen flex items-start justify-center ${
        isSabaq ? "bg-gradient-to-b from-emerald-950 via-emerald-900 to-emerald-800 text-emerald-50" : ""
      }`}>
      <div className="relative w-full max-w-6xl overflow-hidden">
        <div className="absolute bg-[radial-gradient(circle_at_20%_30%,rgba(16,185,129,0.15),transparent_40%),radial-gradient(circle_at_80%_40%,rgba(5,150,105,0.2),transparent_35%)]" />
        <div style={{ width: "100%", height: "600px", position: "relative" }}>
          <div
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              hideContent ? "opacity-0 pointer-events-none" : "opacity-100"
            }`}>
            <Orb hoverIntensity={0.25} rotateOnHover={true} hue={140} forceHoverState={false} />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-center">
              <p className="rounded-full border-emerald-700/50 bg-emerald-800/70 px-4 py-1 text-xs font-semibold uppercase tracking-[0.08em] text-emerald-200">
                {t("sabaq")}
              </p>
              <h1 className="text-4xl font-bold leading-tight text-emerald-50 sm:text-5xl">{t("welcomeMessage")}</h1>
              <p className="max-w-2xl text-emerald-100/80">{t("description")}</p>
            </div>
          </div>

          <div
            className={`absolute inset-0 flex items-center justify-center transition-opacity duration-700 ease-in-out ${
              hideContent ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}>
            <p className="rounded-lg border border-emerald-700/60 bg-emerald-800/70 px-6 py-3 text-lg font-semibold text-emerald-100">
              Placeholder content coming soon.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
