# Simple Search

The simplest possible example of the [You.com Search API](https://documentation.you.com). Pass a query, get back web results. That's it.

## Prerequisites

- Python 3.10+
- A You.com API key — grab one at [you.com/platform](https://you.com/platform)

## Quick start

```bash
pip install -r requirements.txt
export YDC_API_KEY="your-api-key-here"
python simple_search.py "what is retrieval augmented generation"
```

If you don't pass a query it uses a default one, so `python simple_search.py` works too.

## Sample output

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

## How it works

The script is < 20 lines. It:

1. Takes a search query from the command line (or uses a default)
2. Calls the You.com Search API via the [`youdotcom`](https://pypi.org/project/youdotcom/) Python SDK
3. Prints the title, URL, and description for each result

## Links

- [You.com API docs](https://documentation.you.com)
- [Python SDK on PyPI](https://pypi.org/project/youdotcom/)
- [Get an API key](https://you.com/platform)
