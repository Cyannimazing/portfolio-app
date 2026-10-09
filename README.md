# Cyril AI portfolio

Next.js 16 / React 19 portfolio for Cyril Jian Narvasa, using Aceternity UI and shared service/project data.

## Development

Run `npm ci`, then `npm run dev`. Run `npm run build` for the production build. Public profile Markdown and permanent project UUIDs must be preserved; do not regenerate them during maintenance.

## Search and AI crawler setup

The public domain currently defaults to the candidate `https://cyril.ai`. Set `NEXT_PUBLIC_SITE_URL` to the final connected domain at build time. [.env.example](.env.example) lists the supported settings. All canonicals, Open Graph URLs, structured-data identifiers, sitemap entries and AI-readable links use this same origin.

- `/robots.txt` allows public pages for search engines and AI search/user fetchers. Framework assets remain crawlable. Public access also applies to other bots through the wildcard rule.
- `/sitemap.xml` contains the five main pages and all canonical case studies, excluding query variants and redirect aliases. Dates are omitted rather than fabricated.
- `/llms.txt` is a concise content index; `/llms-full.txt` provides service scopes and verified project details from the displayed source data. These are optional convenience documents under the [llms.txt proposal](https://llmstxt.org/), not an indexing requirement or a ranking guarantee.
- Every page has its own title, description, canonical URL, social metadata and JSON-LD. Person, studio, website, service catalogue, project collection, case studies and breadcrumbs use facts visible on the site. No fabricated reviews, prices, addresses or results are added.
- `/opengraph-image` generates the default 1200 × 630 social preview. Case studies use their actual screenshot metadata.
- Metadata is delivered in the initial HTML head for crawlers. Content, service scope and project links remain usable without JavaScript.
- Vercel preview deployments are `noindex`, block crawling, and expose an empty sitemap. For other staging environments set `SITE_INDEXING_ENABLED=false` at build time.

Before public launch:

1. Register/connect the selected domain to the production deployment and configure HTTPS. Set the production origin and rebuild. Redirect alternate hosts to that origin in the hosting dashboard.
2. Verify the domain in Google Search Console and Bing Webmaster Tools. For meta-tag verification, set `GOOGLE_SITE_VERIFICATION` and `BING_SITE_VERIFICATION` to the supplied content values, then rebuild. DNS domain verification can be completed directly in the respective account instead.
3. Submit the production `/sitemap.xml` in both accounts. Inspect the homepage, Services and a case study; check their rendered HTML and structured data.
4. Make sure deployment protection/CDN bot rules permit actual search and AI crawlers. Robots rules cannot bypass hosting authentication or firewall blocks. Verify provider IP ranges using [OpenAI](https://developers.openai.com/api/docs/bots), [Perplexity](https://docs.perplexity.ai/docs/resources/perplexity-crawlers), and [Anthropic](https://support.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler).

Google's AI search features use [the same foundational SEO requirements as Search](https://developers.google.com/search/docs/appearance/ai-features). Crawl access and structured content support discovery; search engines decide whether to index and cite pages. Search Console/Bing verification and domain connection require access to the owner's hosting, DNS and webmaster accounts.
