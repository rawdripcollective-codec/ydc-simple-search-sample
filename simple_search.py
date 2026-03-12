"""Simple Search — the "hello world" of the You.com Search API."""

import os
import sys

from youdotcom import You

# take query from command line args, or use a default
query = sys.argv[1] if len(sys.argv) > 1 else "best programming languages 2026"

# initialize the client with your API key
you = You(api_key_auth=os.environ["YDC_API_KEY"])

# run the search
response = you.search.unified(query=query, count=5)

# print each result
for result in response.results.web:
    print(f"{result.title}")
    print(f"  {result.url}")
    print(f"  {result.description}")
    print()
