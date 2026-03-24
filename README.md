# Simple Search

**[Live demo →](https://you.com/examples/search)**

The simplest possible example of the [You.com Search API](https://docs.you.com). Pass a query, get back web results. That's it.

Two ways to run it: a Python script for the command line, or a Next.js web app you can deploy to Vercel.

## Prerequisites

- A You.com API key — grab one at [you.com/platform](https://you.com/platform)

## Python script

```bash
pip install -r requirements.txt
export YDC_API_KEY="your-api-key-here"
python simple_search.py "what is retrieval augmented generation"
```

If you don't pass a query it uses a default one, so `python simple_search.py` works too.

### Sample output

```
Retrieval-Augmented Generation (RAG) - IBM
  https://www.ibm.com/think/topics/retrieval-augmented-generation
  RAG is an AI framework that combines the strengths of traditional information
  retrieval systems with the capabilities of generative large language models.

What is RAG? - Retrieval-Augmented Generation AI Explained - AWS
  https://aws.amazon.com/what-is/retrieval-augmented-generation/
  Retrieval-Augmented Generation (RAG) is the process of optimizing the output
  of a large language model by referencing an authoritative knowledge base...
```

## Web app

Set up your API key first:

```bash
cp .env.example .env.local
# edit .env.local with your actual API key
```

Then install and run:

```bash
npm install
npm run dev
```

Open [localhost:3000](http://localhost:3000), type a query, and see the results. The app calls the Search API server-side so your API key stays safe.

### Deploy to Vercel

1. Push this repo to GitHub
2. Import it in [vercel.com/new](https://vercel.com/new)
3. Add `YDC_API_KEY` as an environment variable
4. Deploy

That's it. Vercel auto-detects Next.js and handles the rest.

## How it works

Both the script and the web app do the same thing:

1. Take a search query
2. Call the You.com Search API (Python SDK or TypeScript SDK)
3. Display the title, URL, and description for each result

The web app adds a UI on top: search input, result cards with favicons, and You.com branding. The API route (`app/api/search/route.ts`) keeps your API key server-side.

## Links

- [You.com API docs](https://docs.you.com)
- [Python SDK on PyPI](https://pypi.org/project/youdotcom/)
- [TypeScript SDK on npm](https://www.npmjs.com/package/@youdotcom-oss/sdk)
- [Get an API key](https://you.com/platform)
