# Sara's Portfolio

A personal portfolio site built with Next.js, Tailwind CSS, and Supabase.

## Getting started

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

## Editing content

All of the site's text (bio, research, dance, leadership, awards,
contact info, social links) lives in one place:
[src/content/site.ts](src/content/site.ts). Edit the values there — no
other code needs to change. Fields marked `[pending]` are waiting on
confirmation; empty ones (résumé link, email, socials, captions) are
simply hidden on the page until filled in.

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

- `ADMIN_EMAILS` — comma-separated emails allowed into the admin panel.

## Admin panel (`/admin`)

Sara/Khushi can edit every section's text, upload photos, videos and
PDFs, reorder or remove items, and set the résumé, email and social
links, without touching code.

How it works: saved content is one JSON file in a private Supabase
Storage bucket (`site-content`); uploads go to a public bucket
(`site-media`). Both buckets are created automatically on the first save
or upload. Until something is saved, the site shows the defaults from
`src/content/site.ts`, and it falls back to them if Supabase is down.

One-time setup:

1. In Supabase → Authentication → Users, **Add user** for each admin
   (email + password, tick "Auto confirm").
2. Add those emails to `ADMIN_EMAILS` in `.env.local` and in Vercel's
   environment variables, then redeploy.
3. Recommended: Supabase → Authentication → Sign In / Providers → turn
   off **Allow new users to sign up**. (Strangers who sign up still can't
   get in, since they're not in `ADMIN_EMAILS`, but there's no reason to
   allow it.)

Videos must be MP4 (H.264) to play in every browser; the uploader
rejects formats it can't decode (e.g. iPhone HEVC `.mov`). Uploads are
limited to 50 MB per file.

## Deploying

The site is a standard Next.js app and deploys as-is to Vercel or any
platform that supports Next.js. Remember to set the same environment
variables in your hosting provider's dashboard.
