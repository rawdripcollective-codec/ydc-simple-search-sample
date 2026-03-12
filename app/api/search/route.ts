import { You } from "@youdotcom-oss/sdk";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  let query: unknown;
  try {
    ({ query } = await request.json());
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  if (!query || typeof query !== "string") {
    return NextResponse.json({ error: "query is required" }, { status: 400 });
  }

  const apiKey = process.env.YDC_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "YDC_API_KEY is not configured" },
      { status: 500 },
    );
  }

  try {
    const you = new You({ apiKeyAuth: apiKey });
    const response = await you.search({ query, count: 10 });
    return NextResponse.json(response);
  } catch (err) {
    console.error("Search API error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Search failed" },
      { status: 502 },
    );
  }
}
