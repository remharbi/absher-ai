"use client";

import React, { useEffect, useState } from "react";
import Orb from "@/components/Orb/Orb";
import { usePathname } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import Recommendation from "@/components/Recommendation.js/Recommendation";
import TopRecommendations from "@/components/Recommendation.js/TopRecommendations";

export default function page() {
  const t = useTranslations("sabaq");
  const locale = useLocale();
  const pathname = usePathname().split("/")[2];
  const isSabaq = pathname === "sabaq";
  const [hideContent, setHideContent] = useState(false);
  const [selectedTitle, setSelectedTitle] = useState("");
  const [planText, setPlanText] = useState("");
  const [isFetchingPlan, setIsFetchingPlan] = useState(false);
  const [planError, setPlanError] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => setHideContent(true), 20000);
    return () => clearTimeout(timer);
  }, []);

  const buildPlanText = (plan) => {
    if (!plan) return "";
    const summary = locale === "ar" ? plan.summary_ar : plan.summary_en;
    const bestTime = locale === "ar" ? plan.best_time_ar : plan.best_time_en;
    const steps = locale === "ar" ? plan.steps_ar : plan.steps_en;
    const requirements = locale === "ar" ? plan.requirements_ar : plan.requirements_en;

    const lines = [];
    if (summary) lines.push(summary);
    if (bestTime) lines.push(locale === "ar" ? `أفضل وقت: ${bestTime}` : `Best time: ${bestTime}`);
    if (steps?.length) {
      lines.push(locale === "ar" ? "الخطوات:" : "Steps:");
      steps.forEach((step) => lines.push(`• ${step}`));
    }
    if (requirements?.length) {
      lines.push(locale === "ar" ? "التجهيزات:" : "Requirements:");
      requirements.forEach((req) => lines.push(`• ${req}`));
    }
    return lines.join("\n");
  };

  const handleSelectRecommendation = async (item, localizedTitle) => {
    const title = localizedTitle || item?.title || "";
    setSelectedTitle(title);
    setPlanError("");
    setPlanText("");

    if (!title) return;
    setIsFetchingPlan(true);

    try {
      const res = await fetch("/api/recommendations/detail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ service: title }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to fetch plan");
      setPlanText(buildPlanText(data.plan));
    } catch (err) {
      const fallback =
        locale === "ar"
          ? `${title}: اذهب صباح الأحد لتجنب الازدحام، واحضر الهوية، الجواز الحالي، صورة حديثة، وطريقة دفع للرسوم.`
          : `${title}: go early Sunday morning to avoid crowds, and bring your ID, current passport, a recent compliant photo, and a payment method.`;
      setPlanText(fallback);
      setPlanError(
        locale === "ar"
          ? "تعذر جلب التوصية التفصيلية، عرضنا خطة سريعة بديلة."
          : "We could not load the detailed recommendation; showing a quick fallback instead."
      );
    } finally {
      setIsFetchingPlan(false);
    }
  };

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
            <div className="w-full max-w-3xl space-y-4 rounded-lg border border-emerald-700/60 bg-emerald-800/70 px-6 py-5 text-lg font-semibold text-emerald-100">
              <TopRecommendations onSelect={handleSelectRecommendation} activeTitle={selectedTitle} />
              <Recommendation text={planText} isLoading={isFetchingPlan} selectedTitle={selectedTitle} locale={locale} />
              {planError ? <p className="text-sm font-normal text-amber-200">{planError}</p> : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
