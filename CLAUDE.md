# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Single-page marketing site (plus a small MDX-driven blog/"foro") for Pasodoble Run — a physiotherapy / strength / running coaching business in Caracas, Venezuela. Next.js 15 App Router compiled to a **fully static export**; no backend or Node server runs in production. UI copy is Spanish (`es-VE`).

## Commands

```bash
pnpm install     # install deps (pnpm is the project's package manager — pnpm-lock.yaml is committed)
pnpm dev         # dev server → http://localhost:3000
pnpm build       # static export → ./out  (this is the production build)
pnpm start       # serve a prior non-export build (rarely needed here)
pnpm lint        # next lint (ESLint)
```

There is no test suite. Validation = `pnpm build` succeeds and the page renders. Node 22+ (pinned in `.nvmrc`; wrangler 4 requires ≥22). Use pnpm, not npm — mixing package managers creates a conflicting `package-lock.json`.

Deploy: Cloudflare Workers & Pages serves `out/` as **static assets** via `wrangler.jsonc` (`assets.directory = ./out`, `not_found_handling = 404-page`). Build command `pnpm build`, deploy command `npx wrangler deploy`. The `wrangler.jsonc` is what stops Cloudflare from auto-applying the OpenNext SSR adapter (which is incompatible with `output: "export"`).

## Hard architectural constraints

- **`output: "export"`** (`next.config.ts`) — everything must be statically renderable at build time. No route handlers, no SSR, no server actions, no runtime env on the server. Dynamic routes must enumerate via `generateStaticParams`.
- **`trailingSlash: true`** — always link with a trailing slash (`/foro/`, `/foro/<slug>/`). Mismatched slashes break static links.
- **`images: { unoptimized: true }`** — `next/image` optimization is off; the code uses plain `<img>`. Keep doing that.
- Because there's no backend, the two contact paths are both client-side: a **WhatsApp deep link** (`src/lib/whatsapp.ts` builds a `wa.me` URL with a prefilled message) and **Web3Forms** (third-party POST to `api.web3forms.com` from the browser, keyed by `NEXT_PUBLIC_WEB3FORMS_KEY`). Reviews are not collected dynamically — they're hardcoded in `src/data/reviews.ts`.

## Layout of the code

- `src/app/` — routes. `layout.tsx` wraps everything in `LenisProvider` + `Navbar`/`Footer`/`WhatsAppFAB`, sets global metadata and a JSON-LD `SportsActivityLocation` block. `page.tsx` is just an ordered list of section components (the homepage is a composition, not custom layout). `foro/page.tsx` is the post index; `foro/[slug]/page.tsx` renders one post. `sitemap.ts` / `robots.ts` generate static SEO files.
- `src/components/sections/` — the big page sections (Hero, Methodology, Services, ForumPreview, About, Reviews, Contact). `ui/` — reusable pieces. `motion/` — animation wrappers. `layout/` — chrome.
- `src/data/` — **all editable content/config lives here as typed TS** (`site.ts`, `services.ts`, `reviews.ts`, `faq.ts`, `methodology.ts`, `media.ts`, `navigation.ts`). Treat these as the CMS; prefer editing data over hardcoding strings in components.
- `src/lib/` — `posts.ts`, `post-types.ts`, `whatsapp.ts`.
- `content/posts/*.mdx` — forum articles (front-matter + Markdown body). The `public/` folder holds their cover images and other static assets.
- Path alias `@/*` → `src/*`.

## The forum / MDX pipeline (and the server/client split that matters)

- `src/lib/posts.ts` reads `content/posts/*.mdx` with Node `fs` + `gray-matter` at build time, computes `readingMinutes`, and sorts by date. **It is server-only** (imports `fs`).
- `src/lib/post-types.ts` holds the shared `Post`/`PostMeta`/`PostCategory` types and `categoryLabels`. It exists specifically so **client components can import types without pulling `fs` into the bundle.** `ForumIndex.tsx` (`"use client"`, does the category filtering) imports from `post-types`, not `posts`. Keep this boundary: anything touching the filesystem stays in `posts.ts`; anything a client component needs goes in `post-types.ts`.
- The index page strips the MDX body before passing posts to the client filter (`{ content: _content, ...meta }`) so article bodies aren't shipped to the browser.
- Post bodies render via `next-mdx-remote/rsc` (`<MDXRemote>`) inside the RSC, styled by the `.prose-pasodoble` class in `globals.css`. Adding a post = drop a new `.mdx` in `content/posts/` (front-matter fields per the README) + a cover image in `public/`; it appears automatically.

## Styling & motion

- **Tailwind CSS v4, CSS-first** — there is no `tailwind.config.js`. Design tokens (colors `ink`/`sky`/`deep`/`line`/`text`…, fonts, keyframes) are declared in the `@theme` block of `src/styles/globals.css`; use those token classes (`bg-ink`, `text-sky`, `font-display`, `animate-marquee`) rather than inventing hex values.
- Fonts are local `woff2` files loaded with `next/font/local` in `layout.tsx` (Sora = display, Inter = body), exposed as CSS vars.
- Smooth scrolling comes from **Lenis** (`LenisProvider`), and it **bails out entirely under `prefers-reduced-motion`** — preserve that guard if you touch it. Animations use `motion` (the Framer Motion successor), with `gsap` and `@xyflow/react` (the `MindMap` flow diagram) for heavier pieces.

## Content/config tasks

The README documents the routine edits (WhatsApp number, Web3Forms key, adding posts, adding reviews, swapping hero media, Cloudflare Pages deploy with build output dir `out`). Reach for it before changing `src/data/*` or deployment settings.
