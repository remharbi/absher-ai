import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});



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
      title_ar: item.title,
      reason_ar: item.detail || "خلينا نساعدك تتخذ الإجراء الآن.",
    }));

  const normalizeArray = (arr) =>
    Array.isArray(arr)
      ? arr.map((item) => ({
          title_en: item.title_en ?? item.title ?? "",
          reason_en: item.reason_en ?? item.reason ?? "",
          title_ar: item.title_ar ?? item.title ?? "",
          reason_ar: item.reason_ar ?? item.reason ?? "",
        }))
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
    return fallback;
  }
}
