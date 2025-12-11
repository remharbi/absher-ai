# Absher AI (Next.js)

Live demo: https://absher-ai.vercel.app

AI-powered proactive recommendations and the Sabaq experience for Absher, built with Next.js App Router, next-intl, and OpenAI.

## Getting Started

```bash
npm run dev
# or: yarn dev / pnpm dev / bun dev
```

Open http://localhost:3000 in your browser.

## Environment

- `OPENAI_API_KEY` — required for AI recommendations and detailed plans.

## Testing (manual)

- Home page: ensure proactive cards render and link to `/[locale]/sabaq`.
- Sabaq page: click a recommendation to see localized, timed steps and requirements.

## Deploy

Deploy to Vercel. Make sure the environment variable above is set for Production/Preview.
