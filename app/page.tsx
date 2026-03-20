"use client";

import { useState } from "react";
import Image from "next/image";

type WebResult = {
  url?: string;
  title?: string;
  description?: string;
  snippets?: string[];
  faviconUrl?: string;
};

type SearchResponse = {
  results?: { web?: WebResult[] };
  metadata?: { latency?: number };
};

type Status = "idle" | "loading" | "done";

export default function Home() {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

  const [apiKey, setApiKey] = useState("");
  const [showApiKey, setShowApiKey] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<WebResult[]>([]);
  const [latency, setLatency] = useState<number | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  const exampleQueries = [
    "latest AI research",
    "best programming languages 2026",
    "how does RAG work",
    "next.js vs remix",
  ];

  async function handleSubmit(searchQuery?: string) {
    const q = searchQuery ?? query;
    if (!q.trim()) return;

    setStatus("loading");
    setError("");
    setResults([]);
    setLatency(null);

    try {
      const res = await fetch(`${basePath}/api/search`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: q, apiKey: apiKey.trim() || undefined }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        setError(data?.error || "Search failed");
        setStatus("idle");
        return;
      }

      const data: SearchResponse = await res.json();
      setResults(data.results?.web ?? []);
      setLatency(data.metadata?.latency ?? null);
      setStatus("done");
    } catch {
      setError("Something went wrong. Check your connection and try again.");
      setStatus("idle");
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-4">
        <a
          href="https://you.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-[6px]"
        >
          <Image
            src="/ydc-logo-icon.svg"
            alt=""
            width={22}
            height={22}
            aria-hidden
          />
          <Image
            src="/ydc-logo-text.svg"
            alt="you.com"
            width={76}
            height={15}
          />
        </a>
        <nav className="flex items-center gap-2">
          <a
            href="https://you.com/pricing"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-[38px] items-center rounded-full px-4 text-[14px] font-semibold leading-5 text-[#101012] transition-colors hover:bg-black/5"
          >
            Pricing
          </a>
          <a
            href="https://you.com/platform"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-[38px] items-center rounded-full bg-[#101012] px-4 text-[14px] font-semibold leading-5 text-white transition-colors hover:bg-[#2d2d30]"
          >
            Try our APIs
          </a>
        </nav>
      </header>

      {/* Main */}
      <div className="flex flex-1 flex-col items-center px-8 pt-16 pb-8">
        <main className="flex w-full max-w-[640px] flex-col gap-6">
          <h1 className="text-[28px] font-bold leading-9 text-[#101012]">
            Simple Search
          </h1>
          <p className="text-[16px] leading-6 text-[#81828c]">
            Type a query and get back web results from the You.com Search API.
            This demo calls the API server-side and displays titles, URLs, and
            descriptions.
          </p>

          {/* Code snippet */}
          <div className="rounded-xl border border-[#e7e8ec] bg-[#f9f9fb] px-5 py-4">
            <pre className="overflow-x-auto font-mono text-[13px] leading-5 text-[#4a4b57]">
              <code>{`const you = new You({ apiKeyAuth: "ydc-..." });
const { results } = await you.search({ query: "your query" });
console.log(results.web);`}</code>
            </pre>
            <p className="mt-3 text-[12px] leading-4 text-[#81828c]">
              Powered by the{" "}
              <a
                href="https://docs.you.com"
                target="_blank"
                rel="noopener noreferrer"
                className="underline transition-colors hover:text-[#101012]"
              >
                You.com Search API
              </a>
            </p>
          </div>

          {/* API key input */}
          <div className="flex flex-col gap-2">
            <div className="flex h-[50px] items-center rounded-full border border-[#e7e8ec] px-5 shadow-sm transition-colors focus-within:border-[#101012]">
              <input
                type={showApiKey ? "text" : "password"}
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Enter your You.com API key"
                aria-label="API key"
                className="flex-1 bg-transparent text-[16px] leading-6 text-[#101012] placeholder:text-[#81828c] focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setShowApiKey(!showApiKey)}
                className="ml-2 text-[13px] font-medium text-[#81828c] transition-colors hover:text-[#101012]"
              >
                {showApiKey ? "Hide" : "Show"}
              </button>
            </div>
            <p className="text-[12px] leading-4 text-[#81828c]">
              A unique API Key is required to use this demo.{" "}
              <a
                href="https://you.com/platform"
                target="_blank"
                rel="noopener noreferrer"
                className="underline transition-colors hover:text-[#101012]"
              >
                Get your API Key with free credits.
              </a>
            </p>
          </div>

          {/* Search input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
            className="flex gap-3"
          >
            <div className="flex flex-1 items-center rounded-full border border-[#e7e8ec] px-5 py-3 transition-colors focus-within:border-[#101012]">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                disabled={status === "loading"}
                placeholder="Search the web..."
                aria-label="Search query"
                className="flex-1 bg-transparent text-[16px] leading-6 text-[#101012] placeholder:text-[#81828c] focus:outline-none disabled:opacity-40"
              />
            </div>
            <button
              type="submit"
              disabled={!query.trim() || !apiKey.trim() || status === "loading"}
              className={[
                "h-[50px] shrink-0 rounded-full px-5 text-[16px] font-semibold leading-5 transition-colors",
                query.trim() && apiKey.trim() && status !== "loading"
                  ? "bg-[#101012] text-white hover:bg-[#2d2d30]"
                  : "cursor-default bg-[#f9f9fb] text-[#cdced6]",
              ].join(" ")}
            >
              {status === "loading" ? "Searching..." : "Search"}
            </button>
          </form>

          {/* Example queries */}
          {status === "idle" && !error && (
            <div className="flex flex-wrap gap-2">
              {exampleQueries.map((eq) => (
                <button
                  key={eq}
                  type="button"
                  onClick={() => {
                    setQuery(eq);
                    handleSubmit(eq);
                  }}
                  className="rounded-full border border-[#e7e8ec] px-3 py-1.5 text-[13px] leading-4 text-[#4a4b57] transition-colors hover:border-[#101012] hover:text-[#101012]"
                >
                  {eq}
                </button>
              ))}
            </div>
          )}

          {/* Error */}
          {error && (
            <p className="text-[14px] leading-5 text-red-600">{error}</p>
          )}

          {/* Results */}
          {status === "done" && (
            <>
              <p className="text-[13px] leading-5 text-[#81828c]">
                {results.length} result{results.length !== 1 && "s"}
                {latency != null &&
                  ` in ${Math.round(latency * 1000)}ms`}
              </p>

              {results.length === 0 && (
                <p className="text-[14px] leading-5 text-[#81828c]">
                  No results found. Try a different query.
                </p>
              )}

              <div className="flex flex-col gap-5">
                {results.map((r, i) => (
                  <div key={r.url ?? i} className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      {r.faviconUrl && (
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img
                          src={r.faviconUrl}
                          alt=""
                          width={16}
                          height={16}
                          className="rounded-sm"
                        />
                      )}
                      <span className="truncate text-[13px] leading-4 text-[#81828c]">
                        {r.url}
                      </span>
                    </div>
                    <a
                      href={r.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[16px] font-semibold leading-6 text-[#101012] hover:underline"
                    >
                      {r.title}
                    </a>
                    <p className="text-[14px] leading-5 text-[#4a4b57]">
                      {r.description}
                    </p>
                  </div>
                ))}
              </div>
            </>
          )}
        </main>
      </div>

      {/* Footer */}
      <footer
        className="flex items-center justify-between px-8 py-5 backdrop-blur-[7px]"
        style={{
          backgroundImage:
            "linear-gradient(84deg, rgba(255,255,255,0.757) 30%, rgba(255,255,255,0.7) 69%)",
        }}
      >
        <span className="text-[14px] leading-5 text-[#81828c]">
          &copy;2026, You.com
        </span>
        <nav className="flex items-center gap-8">
          {[
            {
              label: "Project code",
              href: "https://github.com/youdotcom-oss/ydc-simple-search-sample",
            },
            {
              label: "More demos",
              href: "https://docs.you.com/integrations/overview",
            },
            { label: "Docs", href: "https://docs.you.com" },
            {
              label: "Discord",
              href: "https://discord.com/invite/youdotcom/",
            },
          ].map(({ label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[14px] font-medium leading-5 text-[#81828c] transition-colors hover:text-[#101012]"
            >
              {label}
            </a>
          ))}
        </nav>
      </footer>
    </div>
  );
}
