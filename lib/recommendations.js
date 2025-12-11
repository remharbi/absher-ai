import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

function buildPrompt(items) {
  return `
You are a recommender. Given items with scores between 0 and 1, return the top 3 with a brief reason.
Items:
${items
  .map((item, idx) => `${idx + 1}. ${item.title} (score: ${item.score}) - ${item.detail ?? ""}`)
  .join("\n")}

Respond strictly as JSON array of objects:
[{"title":"","reason":""}]
`;
}

export async function getRecommendations({ items = [] }) {
  if (!client.apiKey) {
    throw new Error("Missing OPENAI_API_KEY");
  }

  const res = await client.chat.completions.create({
    model: "gpt-4o-mini",
    temperature: 0.2,
    messages: [{ role: "user", content: buildPrompt(items) }],
  });

  const content = res.choices?.[0]?.message?.content ?? "[]";
  try {
    return JSON.parse(content);
  } catch (e) {
    // If the model returns invalid JSON, fallback to an empty list rather than crashing.
    return [];
  }
}
