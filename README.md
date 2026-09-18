# Sara's Portfolio

A personal portfolio site built with Next.js, Tailwind CSS, and Supabase.

## Getting started

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

## Editing content

All of the site's text (name, bio, work experience, projects, media
mentions, contact info, social links) lives in one place:
[src/content/site.ts](src/content/site.ts). Edit the values there — no
other code needs to change.

To swap the hero placeholder (the big letter "S") for a real photo, add
an image to `public/` and update [src/components/Hero.tsx](src/components/Hero.tsx).

## Environment variables

Supabase credentials live in `.env.local` (already created, git-ignored).
See `.env.example` for the required keys:

- `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY` — safe to
  expose in the browser, used by [src/lib/supabase/client.ts](src/lib/supabase/client.ts).
- `SUPABASE_SERVICE_ROLE_KEY` — server-only, used by
  [src/lib/supabase/server.ts](src/lib/supabase/server.ts). Never import
  that file from a client component.

Supabase isn't used by the site yet — it's wired up and ready for when
Sara wants to add a blog or other dynamic content.

## Deploying

The site is a standard Next.js app and deploys as-is to Vercel or any
platform that supports Next.js. Remember to set the same environment
variables in your hosting provider's dashboard.
