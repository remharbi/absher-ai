import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const emptyPlan = {
  summary_en: "",
  summary_ar: "",
  best_time_en: "",
  best_time_ar: "",
  steps_en: [],
  steps_ar: [],
  requirements_en: [],
  requirements_ar: [],
};

const toSentence = (value) => (!value || typeof value !== "string" ? "" : value.trim());
const toArray = (value) => (Array.isArray(value) ? value.filter(Boolean).map((item) => item.toString().trim()) : []);

const fallbackPlan = (service) => {
  const label = service || "your request";
  return {
    summary_en: `For ${label}, plan to go early on Sunday morning when Civil Affairs offices are quieter, and book an Absher appointment if needed.`,
    summary_ar: `لـ ${label}، خطط للذهاب صباح الأحد مبكرًا حين تكون فروع الأحوال أقل ازدحامًا، واحجز موعدًا في أبشر إن لزم.`,
    best_time_en: "Sunday between 8:00–10:30 AM; avoid after-work rush hours.",
    best_time_ar: "يوم الأحد بين 8:00–10:30 صباحًا؛ تجنب ساعات الذروة بعد الدوام.",
    steps_en: [
      "Sign in to Absher and book/confirm an appointment for the service.",
      "Gather documents and copies; make sure photos meet the latest requirements.",
      "Pay any fees in advance if available and keep receipts.",
      "Arrive 10–15 minutes early with originals and printed confirmations.",
    ],
    steps_ar: [
      "سجل الدخول في أبشر وحدد أو أكد موعد الخدمة.",
      "جهز المستندات مع النسخ؛ وتأكد أن الصور مطابقة للمواصفات.",
      "سدّد الرسوم مسبقًا إن أمكن واحتفظ بالإيصالات.",
      "احضر قبل الموعد بـ10–15 دقيقة ومعك الأصول والتأكيدات المطبوعة.",
    ],
    requirements_en: [
      "Original national ID",
      "Current/expired document for the service (e.g., passport)",
      "Recent compliant photo (5x5 cm, plain background)",
      "Payment method for applicable fees",
    ],
    requirements_ar: [
      "الهوية الوطنية الأصل",
      "الوثيقة الحالية أو المنتهية (مثل الجواز)",
      "صورة شخصية حديثة مطابقة للمواصفات (5x5 وخلفية سادة)",
      "وسيلة دفع للرسوم إن وجدت",
    ],
  };
};

function normalizePlan(plan, fallback) {
  const base = fallback || emptyPlan;
  return {
    summary_en: toSentence(plan.summary_en) || base.summary_en,
    summary_ar: toSentence(plan.summary_ar) || base.summary_ar,
    best_time_en: toSentence(plan.best_time_en) || base.best_time_en,
    best_time_ar: toSentence(plan.best_time_ar) || base.best_time_ar,
    steps_en: toArray(plan.steps_en).length ? toArray(plan.steps_en) : base.steps_en,
    steps_ar: toArray(plan.steps_ar).length ? toArray(plan.steps_ar) : base.steps_ar,
    requirements_en: toArray(plan.requirements_en).length ? toArray(plan.requirements_en) : base.requirements_en,
    requirements_ar: toArray(plan.requirements_ar).length ? toArray(plan.requirements_ar) : base.requirements_ar,
  };
}

const buildPrompt = (service) => `
You are an assistant for Saudi Absher services. The user selected: "${service}".
Return an actionable, time-aware plan with a clear checklist.
Follow these rules:
- Keep context local (Civil Affairs / Passport offices get crowded after work; Sunday early morning is usually quieter).
- Mention the best day/time window and why it matters.
- Steps: concise, max 4 items.
- Requirements: concise, max 5 items (documents, photos, fees, confirmations).
- Avoid markdown characters inside strings.
- Respond strictly as JSON:
{
  "summary_en": "",
  "summary_ar": "",
  "best_time_en": "",
  "best_time_ar": "",
  "steps_en": [],
  "steps_ar": [],
  "requirements_en": [],
  "requirements_ar": []
}
`;

function parseJSONSafe(text, fallback) {
  if (!text) return fallback;
  try {
    return JSON.parse(text);
  } catch {
    const match = text.match(/\{[\s\S]*\}/);
    if (match) {
      try {
        return JSON.parse(match[0]);
      } catch {
        return fallback;
      }
    }
    return fallback;
  }
}

export async function getServicePlan({ service }) {
  const fallback = fallbackPlan(service);
  if (!client.apiKey) return fallback;

  try {
    const res = await client.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 0.3,
      messages: [{ role: "user", content: buildPrompt(service) }],
    });

    const content = res.choices?.[0]?.message?.content ?? "";
    const rawPlan = parseJSONSafe(content, fallback);
    return normalizePlan(rawPlan, fallback);
  } catch (err) {
    console.error("Service plan generation failed", err);
    return fallback;
  }
}
