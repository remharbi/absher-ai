import { NextResponse } from "next/server";
import { getServicePlan } from "@/lib/servicePlan";

export async function POST(request) {
  try {
    const { service } = await request.json();
    if (!service || typeof service !== "string") {
      return NextResponse.json({ error: "Service is required." }, { status: 400 });
    }

    const plan = await getServicePlan({ service });
    return NextResponse.json({ plan });
  } catch (err) {
    console.error("Recommendation detail error", err);
    return NextResponse.json({ error: "Unable to fetch the recommendation details." }, { status: 500 });
  }
}
