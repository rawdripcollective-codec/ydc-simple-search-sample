import { You } from "@youdotcom-oss/sdk";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { query } = await request.json();

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

  const you = new You({ apiKeyAuth: apiKey });
  const response = await you.search({ query, count: 10 });

  return NextResponse.json(response);
}
