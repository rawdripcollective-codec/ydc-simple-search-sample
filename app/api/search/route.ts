import { You } from "@youdotcom-oss/sdk";
import { SearchUnauthorizedError } from "@youdotcom-oss/sdk/models/errors";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  let query: unknown;
  let clientApiKey: unknown;
  try {
    ({ query, apiKey: clientApiKey } = await request.json());
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  if (!query || typeof query !== "string") {
    return NextResponse.json({ error: "query is required" }, { status: 400 });
  }

  if (typeof clientApiKey !== "string" || !clientApiKey) {
    return NextResponse.json(
      { error: "An API key is required." },
      { status: 401 },
    );
  }
  const apiKey = clientApiKey;

  try {
    const you = new You({ apiKeyAuth: apiKey });
    const response = await you.search({ query, count: 10 });
    return NextResponse.json(response);
  } catch (err) {
    if (err instanceof SearchUnauthorizedError) {
      return NextResponse.json(
        { error: "Invalid or expired API key" },
        { status: 401 },
      );
    }
    console.error("Search API error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Search failed" },
      { status: 502 },
    );
  }
}
