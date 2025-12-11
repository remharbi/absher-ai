import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const arabicDocMap = {
  passport: "جواز السفر",
  "driver license": "رخصة القيادة",
  "driver's license": "رخصة القيادة",
  "drivers license": "رخصة القيادة",
  "national id": "الهوية الوطنية",
  id: "الهوية",
};

const toArabicDoc = (text = "") => {
  const key = text.toLowerCase().trim();
  return arabicDocMap[key] || text;
};

const toArabicTitle = (title = "") => {
  const lower = title.toLowerCase();
  if (lower.startsWith("renew ")) {
    const doc = title.slice(6);
    return `تجديد ${toArabicDoc(doc)}`;
  }
  if (lower.startsWith("pay violation")) {
    return "سداد مخالفة";
  }
  if (lower.startsWith("plan upcoming travel")) {
    return "تخطيط السفر القادم";
  }
  return title || "خدمة موصى بها";
};

const translateStatus = (status = "") => {
  const lower = status.toLowerCase();
  if (lower === "unpaid") return "غير مدفوعة";
  if (lower === "paid") return "مدفوعة";
  if (lower === "pending") return "معلقة";
  if (lower === "valid") return "سارية";
  return status;
};

const toArabicReason = (detail = "") => {
  if (!detail) return "خلينا نساعدك تتخذ الإجراء الآن.";

  // Expiry format: "Expiry: 2025-12-31 • 20 days left"
  if (/expiry:/i.test(detail) && /days left/i.test(detail)) {
    const [expiryPart, daysPart] = detail.split("•").map((p) => p.trim());
    const expiry = expiryPart.replace(/expiry:/i, "").trim();
    const days = daysPart.replace(/days left/i, "").trim();
    return `تاريخ الانتهاء: ${expiry} • المتبقي: ${days} يوم`;
  }

  // Violation format: "Amount: 750 • Date: 2025-11-06 • Status: unpaid"
  if (/amount:/i.test(detail) && /status:/i.test(detail)) {
    const parts = detail.split("•").map((p) => p.trim());
    const amount = parts.find((p) => /amount:/i.test(p))?.replace(/amount:/i, "").trim();
    const date = parts.find((p) => /date:/i.test(p))?.replace(/date:/i, "").trim();
    const status = parts.find((p) => /status:/i.test(p))?.replace(/status:/i, "").trim();
    const amountWithCurrency = amount?.startsWith("SAR") ? amount : `SAR ${amount}`;
    return `المبلغ: ${amountWithCurrency} • التاريخ: ${date} • الحالة: ${translateStatus(status)}`;
  }

  // Travel detail
  if (/last trip:/i.test(detail)) {
    const rest = detail.replace(/last trip:/i, "").trim();
    return `آخر رحلة: ${rest}`;
  }

  return `تفاصيل: ${detail}`;
};

function buildPrompt(items) {
  return `
You are a proactive assistant for Absher. Given items with scores between 0 and 1, return the top 3 with a concise, engaging action that references the timing/need.
Guidelines:
- Mention concrete cues from the item text (expiry month, travel patterns, violations) to make it personal.
- Use a friendly, helpful tone. For Arabic examples, say things like: "بما أنك تسافر كثير في شهر ٦ وجوازك بينتهي قبله، خلينا نساعدك في خدمة سبق" or "رخصتك بتنتهي قريب، خلينا نساعدك في خدمة سبق عشان تتجنب الغرامات".
- Keep it short (one sentence).
Items:
${items.map((item, idx) => `${idx + 1}. ${item.title} (score: ${item.score}) - ${item.detail ?? ""}`).join("\n")}

Respond strictly as JSON array of objects with both English and Arabic fields (no extra text):
[{"title_en":"","reason_en":"","title_ar":"","reason_ar":""}]
`;
}

export async function getRecommendations({ items = [] }) {
  if (!client.apiKey) {
    throw new Error("Missing OPENAI_API_KEY");
  }

  if (!items.length) return [];

  const fallback = items
    .sort((a, b) => (b.score ?? 0) - (a.score ?? 0))
    .slice(0, 3)
    .map((item) => ({
      title_en: item.title,
      reason_en: item.detail || "Let us help you take action now.",
      title_ar: toArabicTitle(item.title),
      reason_ar: item.detail ? toArabicReason(item.detail) : "خلينا نساعدك تتخذ الإجراء الآن.",
    }));

  const normalizeArray = (arr) =>
    Array.isArray(arr)
      ? arr.map((item) => {
          const titleEn = item.title_en ?? item.title ?? "";
          const reasonEn = item.reason_en ?? item.reason ?? "";
          const titleAr = item.title_ar && item.title_ar !== item.title_en ? item.title_ar : toArabicTitle(titleEn);
          const reasonAr = item.reason_ar && item.reason_ar !== item.reason_en ? item.reason_ar : toArabicReason(item.detail || reasonEn);
          return {
            title_en: titleEn,
            reason_en: reasonEn,
            title_ar: titleAr || toArabicTitle(titleEn),
            reason_ar: reasonAr || toArabicReason(reasonEn),
          };
        })
      : fallback;

  const parseJSONSafe = (text) => {
    if (!text) return fallback;
    try {
      return normalizeArray(JSON.parse(text));
    } catch {
      const match = text.match(/\[[\s\S]*\]/);
      if (match) {
        try {
          return normalizeArray(JSON.parse(match[0]));
        } catch {
          return fallback;
        }
      }
      return fallback;
    }
  };

  try {
    const res = await client.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 0.2,
      messages: [{ role: "user", content: buildPrompt(items) }],
    });

    const content = res.choices?.[0]?.message?.content ?? "";
    return parseJSONSafe(content);
  } catch (e) {
    console.error("OpenAI recommendations failed, using fallback", e);
    return fallback;
  }
}
