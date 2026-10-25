# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Project

E-commerce app built with Next.js 16 (App Router), React 19, Tailwind CSS v4, Better Auth, Drizzle ORM and Neon Postgres. The storefront (home page and product detail page) reads its catalog (categories, products, stock) from Postgres. There is no cart, checkout or auth UI yet.

## Commands

Package manager is **pnpm**.

```bash
pnpm dev             # dev server at http://localhost:3000
pnpm build           # production build (needs a valid DATABASE_URL; the auth route imports the db client)
pnpm lint            # eslint
pnpm exec tsc --noEmit   # type check (there is no separate script)

pnpm auth:generate   # Better Auth CLI → writes auth tables to lib/db/schema/auth.ts
pnpm db:generate     # drizzle-kit: diff schema → SQL migration in ./drizzle
pnpm db:migrate      # drizzle-kit: apply migrations to DATABASE_URL
pnpm db:studio       # drizzle-kit studio
pnpm db:seed         # load/refresh the catalog from lib/db/seed-data.ts (idempotent)
```

There is no test runner set up yet.

Environment: copy `.env.example` to `.env.local` (or `.env`) and set `DATABASE_URL` (Neon), `BETTER_AUTH_SECRET` and `BETTER_AUTH_URL`.

## Architecture

- **Database** (`lib/db/`): `index.ts` exports a single `db` built on `drizzle-orm/neon-http` (Neon's HTTP driver, which has no persistent pool). It throws at import time if `DATABASE_URL` is missing. All table definitions live in `lib/db/schema/` and are re-exported from `schema/index.ts`. That barrel is passed to both Drizzle (`{ schema }`) and the Better Auth adapter, and `drizzle.config.ts` points at the folder. A new schema file must be re-exported from `index.ts`.
- **Auth** has three pieces that must stay in sync:
  - `lib/auth.ts`: the server instance (Drizzle adapter, `provider: "pg"`, email/password, `nextCookies()` plugin so Server Actions can set cookies).
  - `app/api/auth/[...all]/route.ts`: mounts it via `toNextJsHandler`.
  - `lib/auth-client.ts`: the React client (same-origin, no `baseURL`).

  After changing auth plugins or config, re-run `pnpm auth:generate` and then `db:generate`/`db:migrate`.
- **Server-only boundary**: `lib/db` and `lib/auth.ts` import `"server-only"`. Never import them from Client Components; use `authClient` instead.

## Database conventions

- **Migrations**: versioned only. Run `db:generate`, review the SQL in `./drizzle`, commit it, then `db:migrate`. Never use `drizzle-kit push`.
- **Catalog model**: `categories` 1─< `products` 1─1 `stocks` (`lib/db/schema/catalog.ts`). Keep it to these three tables; don't add carts, orders, payments, reviews, wishlists or product variants until asked.
- **Columns**: `uuid` primary keys (`defaultRandom()`), a unique `slug` as the public identifier, prices as integer cents, and `created_at`/`updated_at` as `timestamptz`. Images and details stay on the product row (`jsonb` / `text[]`), not in child tables.
- **Stock** lives in `stocks`, not on `products`. A missing stock row means 0 (sold out). Products are hidden with `is_active = false`, not deleted, and every storefront query filters on it.
- **Reads**: pages read only through `lib/db/queries/*` (`"use cache"` + `cacheTag("catalog")`). Queries map rows to the `Product`/`Category` types in `lib/catalog.ts`, so components never see database rows. Call `revalidateTag("catalog")` after any catalog or stock write.
- **Scripts outside Next** (seeds, CLI): don't import `lib/db`, because it's server-only. Build a client with `drizzle(process.env.DATABASE_URL, { schema })` and load env with `loadEnvConfig(process.cwd())` from `@next/env`, not `dotenv`. Seeds must be idempotent (upsert by slug) and must not overwrite existing stock.

## Next.js config notes (`next.config.ts`)

- `cacheComponents: true`: reading `cookies()`/`headers()` (e.g. the session) is request-time data. It must sit behind `<Suspense>` and cannot be at the top level of a layout. Read `node_modules/next/dist/docs/01-app/02-guides/authentication-with-cache-components.md` before building session-aware UI (it covers `"use cache: private"` for the current user).
- `partialPrefetching: true` and `experimental.agentFeedback: true` are enabled.
- `logging.browserToTerminal: true` forwards browser console output to the dev server terminal.
- Tailwind v4 is loaded through a Turbopack loader rule (`@tailwindcss/turbopack`) on `*.css`, not PostCSS. Global styles and theme tokens are in `app/globals.css`.
- In Next 16, middleware is called **Proxy** (`proxy.ts` at the project root).
