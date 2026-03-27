# Spec: Confessions of an English API Eater — Personal Blog

**Status:** draft
**Last updated:** 2026-03-27

## Summary

A personal developer blog for Derry Birkett, taglined "Confessions of an English API Eater". A minimal, fast, statically-generated site hosted on GitHub Pages. Content is authored in MDX files committed to the repo. No CMS, no auth, no dynamic server — just posts, an about page, and a clean reading experience consistent with Derry's monochrome design system.

## Deployment note

Derry's default deployment target is Vercel. This project targets GitHub Pages instead. Trade-offs accepted:
- No server-side rendering or API routes (static export only)
- Deployment via GitHub Actions instead of Vercel's git integration
- Vercel remains the better choice if dynamic features (search, comments, OG image generation) are needed later

If the site outgrows static export, migrating to Vercel is a one-line config change and a workflow deletion.

---

## In scope

- Home page — hero with name, tagline, and N most recent posts
- Blog index — full list of posts, sorted newest-first
- Individual post page — title, date, tags, MDX content, prev/next navigation
- About page — short bio and links (GitHub, etc.)
- RSS feed (`/feed.xml`) — generated at build time
- Dark mode — class-based, respects system preference on first load, toggle persists to localStorage
- SEO — `<title>`, `<meta description>`, Open Graph tags per page
- GitHub Actions workflow — build on push to `main`, deploy to `gh-pages` branch
- Monochrome zinc design system — no colour accents, Geist Sans / Geist Mono, compact density

## Out of scope

- Comments (no Disqus, no GitHub Discussions integration)
- Search (no Algolia, no client-side fuzzy search)
- Newsletter / email capture
- Auth of any kind
- Analytics (can be added later as a one-liner)
- CMS or admin UI — content is MDX files in `content/posts/`
- Pagination (render all posts; add when list exceeds ~50)
- Image optimisation beyond Next.js static export defaults

---

## Content model

### Post (MDX file at `content/posts/YYYY-MM-DD-slug.mdx`)

| Field | Type | Required | Notes |
|---|---|---|---|
| `title` | string | yes | |
| `date` | ISO date | yes | Used for sort order |
| `description` | string | yes | Used for meta description and post card |
| `tags` | string[] | no | Displayed on post; no tag index pages initially |
| `draft` | boolean | no | Defaults false; drafts excluded from production build |

---

## User flows

### Reading a post
1. User lands on home (`/`) or blog index (`/blog`)
2. Sees post list — title, date, description
3. Clicks a post title
4. Reads the post in a centred, readable column
5. Sees prev/next post links at the bottom

### Discovering via RSS
1. Reader subscribes to `/feed.xml` in their RSS client
2. New posts appear automatically on next build + deploy

### Dark mode toggle
1. Page loads respecting `prefers-color-scheme` if no localStorage value is set
2. User clicks toggle (sun/moon icon, top-right)
3. Theme flips; choice persists across pages and sessions

### Authoring a post
1. Author creates `content/posts/YYYY-MM-DD-slug.mdx`
2. Adds frontmatter (title, date, description)
3. Writes post body in MDX
4. Commits and pushes to `main`
5. GitHub Actions builds and deploys — post is live within ~2 minutes

---

## Acceptance criteria

- [ ] Home page renders the 5 most recent non-draft posts
- [ ] Blog index renders all non-draft posts, sorted newest-first
- [ ] Post page renders MDX content with correct typography (prose styles)
- [ ] Post page shows title, formatted date, and tags
- [ ] Prev/next navigation links are correct at list boundaries (null at first/last post)
- [ ] About page renders static content
- [ ] Dark mode toggle switches theme; preference survives page reload
- [ ] System dark mode preference is applied on first visit (no localStorage value)
- [ ] `/feed.xml` is valid RSS 2.0 and includes all non-draft posts
- [ ] Each page has correct `<title>` and `<meta name="description">`
- [ ] Each page has Open Graph `og:title`, `og:description`, `og:url`
- [ ] Draft posts (`draft: true`) are excluded from all lists and the feed
- [ ] `next build` produces a fully static export with no errors
- [ ] GitHub Actions workflow deploys on push to `main`; site is reachable at GitHub Pages URL
- [ ] No colour accents — all UI uses zinc palette only
- [ ] No animations or transitions except functional ones (theme switch)
- [ ] Lighthouse performance score ≥ 90 on mobile

---

## Open questions

- [ ] **Custom domain?** GitHub Pages supports CNAME. Does Derry have a domain to point at this? (e.g. derrybirkett.com, coaeae.dev) — needed before go-live, not before build
- [ ] **Repo name / GitHub Pages URL** — GitHub Pages serves at `<username>.github.io/<repo>` by default, which affects `basePath` config. If this will be at the root domain (`<username>.github.io`) the repo must be named `<username>.github.io`. Confirm before configuring `next.config.ts`.
- [ ] **About page content** — bio text, photo (yes/no), links to include
- [ ] **OG image** — static default image or per-post generated? (generated requires a Vercel Edge Function; static is simpler and consistent with GitHub Pages)

---

## Notes

- Next.js `output: 'export'` disables: Image Optimization API, API routes, middleware, ISR. All acceptable for a blog.
- `content/posts/` is the single source of truth. No database.
- The `gh-pages` branch is managed entirely by the GitHub Actions workflow — never commit to it manually.
- Geist fonts loaded via `next/font/google` (or local if preferred to avoid the Google Fonts request).
- shadcn/ui components used selectively — only what's needed (Button for nav, no form components).
- `tailwind-typography` plugin (`prose` class) handles post body styling.
