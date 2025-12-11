import { NextResponse } from "next/server";
import { getProactiveRecommendations } from "@/lib/proactiveModel";

async function respondWithRecommendations(userData) {
  const recommendations = await getProactiveRecommendations({ userData });
  return NextResponse.json({ recommendations });
}

export async function GET() {
  try {
    return await respondWithRecommendations();
  } catch (err) {
    console.error("Proactive recommendation error", err);
    return NextResponse.json({ error: "Unable to fetch recommendations." }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { userData } = await request.json();
    return await respondWithRecommendations(userData);
  } catch (err) {
    console.error("Proactive recommendation error", err);
    return NextResponse.json({ error: "Unable to fetch recommendations." }, { status: 500 });
  }
}
