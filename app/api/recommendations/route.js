import { NextResponse } from "next/server";
import { getRecommendations } from "@/lib/recommendations";

export async function POST(request) {
  try {
    const { items = [] } = await request.json();
    if (!Array.isArray(items)) {
      return NextResponse.json({ error: "Invalid payload: items must be an array." }, { status: 400 });
    }

    const recommendations = await getRecommendations({ items });
    return NextResponse.json({ recommendations });
  } catch (err) {
    console.error("Recommendation error", err);
    return NextResponse.json({ error: "Unable to fetch recommendations." }, { status: 500 });
  }
}
