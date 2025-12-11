import React from "react";
import TextType from "../TextType";

export default function Recommendation({ text, isLoading = false, selectedTitle = "", locale = "en" }) {
  const loadingText =
    locale === "ar"
      ? "جاري تجهيز الخطة الشخصية لك..."
      : "Preparing a personalized plan for you...";
  const fallbackText =
    locale === "ar"
      ? "اختر خدمة مثل تجديد الجواز لنجهز لك التوقيت والخطوات والمستندات المطلوبة."
      : "Pick a service like renewing your passport to get timing, steps, and what to bring.";
  const displayText = isLoading ? loadingText : text || fallbackText;
  const textKey = `${selectedTitle || "default"}-${displayText}-${isLoading}`;

  return (
    <div className="space-y-2 text-start">
      {selectedTitle ? (
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-emerald-200/80">
          {locale === "ar" ? `الخدمة: ${selectedTitle}` : `Service: ${selectedTitle}`}
        </p>
      ) : null}
      <TextType
      className="text-start"
        key={textKey}
        text={[displayText]}
        typingSpeed={70}
        pauseDuration={1800}
        showCursor={true}
        cursorCharacter="|"
        loop={false}
        deletingSpeed={0}
      />
    </div>
  );
}
