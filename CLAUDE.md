@AGENTS.md

# Content plan — Sara Hulyalkar's real portfolio content

Source material lives in `Sara_Hulyalkar /` (note: that folder name has a
**trailing space**, and several of its subfolders do too — always quote
paths, e.g. `find "Sara_Hulyalkar " ...`). It contains real documents,
photos, and videos about Sara's activities that should replace the
placeholder content currently in `src/content/site.ts`.

## Source folder naming issues (fix before wiring into the site)

- **Trailing spaces** on: `Sara_Hulyalkar `, `Awards `, `EduBeats `,
  `Internships `, `Movement_Literacy `, `Piano `, `School_leadership `.
  No trailing space on: `Ballet`, `EquiPointe`, `M&TSI`, `Research`,
  `Techsociopreneurihip_Club`.
- **Leading space** on two files: `Movement_Literacy / Movement and
  grace program.docx`, `Techsociopreneurihip_Club/ TECH-SOCIOPRENEURSHIP
  (TSP) CLUB PROPOSAL.docx`. **Trailing space** on `EquiPointe/iris
  poster final .pdf`.
- **Folder name typo:** `Techsociopreneurihip_Club` should be
  `Techsociopreneurship_Club` (confirmed by the proposal doc inside,
  which spells it correctly).
- **No consistent case/separator convention** across folders (mix of
  camelCase, Title_Case_With_Underscores, and plain words).
- **Likely duplicate/junk files** (safe to skip when copying assets
  into the site): `EquiPointe/IMG_0840 2.jpeg`, `M&TSI/VIDEO-2026-07-09-
  21-29-49 2.mov`, `Movement_Literacy /PHOTO-2026-06-27-16-07-28 2.jpg`,
  `Movement_Literacy /PHOTO-2026-06-27-16-07-52 2.jpg` and `... 3.jpg`,
  `Techsociopreneurihip_Club/Founders forum_(1).png`,
  `Sara_Hulyalkar /.DS_Store`. Also: `Research/Sara Hulyalkar - CREST
  Research Report.pdf` is a content duplicate of `EduBeats /Sara
  Hulyalkar - CREST Research Report.docx` (same report; the PDF is a
  nicer final export with charts) — use the PDF as the canonical
  source and don't cite both.
- **`Piano ` folder is empty** — no content to build a section from yet.

## Proposed website sections (replacing/extending the current placeholder ones)

The current site (`src/components/*`) has generic placeholder
sections: Hero, About, Experience, Projects, Media, Contact. Replace
them with sections that map to Sara's real, well-documented activities:

1. **Hero** — Sara Hulyalkar. Identity tags should reflect what the
   material actually shows: ballet dancer, STEM researcher/innovator,
   student entrepreneur (exact wording needs her input — see open
   questions).
2. **About** — merge her ballet background with her research/STEM
   interest (the throughline across her projects is literally "ballet +
   technology": EquiPointe and the ballet research paper both come from
   her dance background).
3. **Research & Innovation** (replaces generic "Projects"):
   - **EduBeats** — a semantic-to-music study aid; submitted to the
     2026 S.T. Yau High School Science Award (Asia), supervised by Mr.
     Aman Kesarwani (Pangea Society); two development phases, tested
     with 208 then 10 users; also has a CREST award report/certificate.
     Source: `EduBeats /*`, `Research/Sara Hulyalkar - CREST Research
     Report.pdf`.
   - **EquiPointe (project codename "IRIS")** — an IMU+FSR wearable
     sensor system (with research partner Anshul Bhatt) to detect
     unsafe ballet footwork (sickling/rolling), ~80–89% accuracy across
     two hardware iterations. Source: `EquiPointe/*` (poster, pptx,
     logbook, prototype photos/videos).
   - **Independent research papers** — "Exploring Sensor-Based Wearable
     Technology For Ballet Training" (the academic paper behind
     EquiPointe) and "An In-depth Analysis on the Economic Viability of
     Integrating Recent Technology Developments in Performing Arts
     Education" (Baumol Cost Disease applied to performing arts, tied
     to NEP 2020). Source: `Research/*`.
4. **Dance & Movement** (replaces nothing currently, new section):
   - Her ballet training/performance (video clips in `Ballet/*`).
   - **Movement Literacy** — a movement-education curriculum she
     designed herself for young ballet dancers, with a working lesson
     plan and a polished proposal "for physiotherapist review." Source:
     `Movement_Literacy /*`.
5. **Leadership & Entrepreneurship** (replaces generic "Work
   Experience"):
   - School leadership roles evidenced by photos: MUN head chair,
     Student Council, Sports Day house captain, Interhouse
     football/table tennis, Swimming gala, Teachers' Day, march-past
     first place. Source: `School_leadership /*` — **all photo-only,
     no write-up; need Sara to supply dates/context/captions.**
   - **Tech-Sociopreneurship Club (TSP)** — she co-founded/ran this
     school club (with Divina Minocha and Lavanya Gupta); real meeting
     minutes show the club evolved a concept called "StudyCycle" and
     ran a "Business Bazaar" pitch event. Source:
     `Techsociopreneurihip_Club/*`. **Note:** the club is named
     inconsistently across its own source docs — need to settle on one
     canonical name (see open questions).
   - **BondboT internship** — built an AI chatbot ("BondboT") for a
     bond-trading platform, with two other collaborators (Diya, Grace).
     Source: `Internships /AI CHATBOT PRESENTATION.pptx` — **only one
     deck, no other evidence; thin section unless Sara adds more.**
   - **M&TSI** — photos/videos only, no document anywhere explains what
     this activity is. **Need Sara to clarify before this can go on the
     site at all.**
6. **Awards & Recognition** (new section, could replace "In the
   Media" since no press coverage exists yet):
   - Excellence in STEM award (`Awards /Excellence_in_STEM.png` — no
     context on issuer/date, need Sara's input).
   - CREST award certificate, S.T. Yau Award shortlist
     (`EduBeats /Crest Certificate.png`, `St Yau initial shortlist.png`).
7. **Contact** — unchanged.

## Decisions (resolved 2026-09-22)

- **Club name:** use "Tech-Sociopreneurship Club (TSP)" site-wide as
  the canonical name.
- **Collaborator names:** OK to publish collaborators' names as
  credited in the source docs (Anshul Bhatt on EquiPointe; Divina
  Minocha & Lavanya Gupta on the Tech club; Diya & Grace on the BondboT
  internship) — don't genericize them.
- **M&TSI:** unresolved — user is checking with Sara. Leave this
  section out of the site until we hear back; don't guess.
- **Missing context** (School_leadership photo captions/dates, the
  Awards image's issuer/date, hero identity tags): build these
  sections now using clearly-marked placeholders for just the missing
  bits, using real content everywhere else. Swap in real
  captions/dates once available.

## Still open

- Dates/context for 5 of the 6 School_leadership photos (Student
  Council, Sports Day House Captain, House Spirit, Swimming Gala,
  Teachers' Day) — still placeholders in `src/content/site.ts`. MUN
  Head Chair was resolved from the photo itself (DAIMUN 2025,
  "Polycrisis: Navigating a New Global Order").
- The Awards image was resolved from the photo itself too: "Excellence
  in STEM," DAIS Annual Awards Ceremony 2025–26, Class 11.
- Whether the BondboT internship gets more material, or stays a small
  entry.
- Whether/when to revisit the empty **Piano** folder.
- M&TSI section still excluded pending clarification from Sara.

## Implementation status (done 2026-09-22)

The site has been rebuilt with this real content. What changed:

- `src/content/site.ts` now holds Sara's real bio, research projects,
  dance/movement content, leadership roles, club/internship info, and
  awards (replacing the earlier placeholder version).
- New section components: `src/components/Research.tsx`,
  `DanceMovement.tsx`, `Leadership.tsx`, `Awards.tsx` — replacing the
  old placeholder `Experience.tsx` / `Projects.tsx` / `Media.tsx`
  (deleted).
- `Navbar.tsx` and `app/page.tsx` updated to the new section order:
  Hero → About → Research → Dance & Movement → Leadership → Awards →
  Contact.
- A curated set of real photos/video was copied (not moved) from
  `Sara_Hulyalkar /` into `public/images/*` and `public/videos/*` with
  clean names — the originals are untouched, and that source folder is
  now git-ignored (`/Sara_Hulyalkar*` in `.gitignore`) so the raw
  223MB of personal material never gets committed.
- Verified with `npm run build`, lint, and headless-browser screenshots
  (desktop + mobile) — all real photos load correctly. (One
  full-page-screenshot artifact was investigated and is NOT a site
  bug: Chromium's `fullPage` screenshot can render a `position: sticky`
  navbar floating mid-page in the stitched image; scrolling/clicking
  nav links in a real viewport confirms the navbar behaves normally.)
- The hero still uses the placeholder monogram ("S") rather than a
  real photo of Sara — no clean headshot was in the source material;
  swap one into `src/components/Hero.tsx` when available.

## Before building: asset prep still needed

- Fix the naming issues above (or at least don't propagate trailing/
  leading spaces into `public/` asset paths — Next.js/URLs will
  mis-handle them).
- Pick 1 real photo of Sara for the Hero (currently a placeholder
  monogram).
- ~~Choose a small curated set of photos/video clips per section~~ —
  superseded: expanded to galleries covering nearly every remaining
  file (see below).
- ~~Videos are large; will need compression or an external host~~ —
  superseded: `.mov` files were transcoded to `.mp4` with `ffmpeg` and
  are served directly from `public/videos/` with generated poster
  thumbnails so galleries don't need to fetch full video files just to
  show a thumbnail.

## Round 2 — full galleries + document preview/download (done 2026-09-22)

The user pointed out most source files still weren't on the site (this
was intentional curation, not the naming bug) and asked for two things:
richer per-section media, and a way to preview + download the original
documents (research papers, EquiPointe poster/logbook/deck, EduBeats
reports) instead of only text summaries.

**New local tools installed** (both via Homebrew, needed since this
Mac had no docx/pptx → PDF converter): `libreoffice` (provides
`soffice --headless --convert-to pdf`, used to convert every `.docx`/
`.pptx` we expose into a previewable PDF) and `ffmpeg` (used to
transcode `.mov` test-footage clips to `.mp4`, and to extract poster-
frame thumbnails for every video). `poppler` was also installed but
only for my own QA (rendering PDF pages to check them) — not a site
dependency.

**What changed:**

- `src/components/Gallery.tsx` — new reusable lightbox: a grid of
  image/video thumbnails that opens a `<dialog>` modal with Prev/Next
  navigation on click. Used by Research (EquiPointe), Dance & Movement
  (Ballet, Movement Literacy), and each Leadership school-role card.
- `src/components/DocumentLink.tsx` — new `DocumentLinks` component:
  renders a pill button per document; clicking it opens a `<dialog>`
  with the PDF embedded in an `<iframe>` plus a Download button. Used
  by EduBeats, EquiPointe, Research Papers, the TSP Club, and the
  BondboT internship.
- `public/documents/` — 9 PDFs: the 3 that were already PDFs were
  copied as-is (EquiPointe logbook, poster; EduBeats/CREST report); the
  other 6 (`.docx`/`.pptx`) were converted with `soffice`.
- `public/videos/` — now 9 videos total: all 6 Ballet clips (was 1),
  2 EquiPointe testing clips (transcoded from `.mov`), and the
  School_leadership march-past video (folded into the "Sports Day
  House Captain" card, since it's the same event). Each has a
  generated poster thumbnail in `public/images/ballet/`,
  `public/images/equipointe/`, or `public/images/misc/`.
- `public/images/` — added the remaining EquiPointe hardware photos
  (including the earlier full-leg-sensor prototype iteration, `IMG_
  0884.jpeg` — useful since the copy explicitly mentions "two hardware
  iterations"), 3 more Movement_Literacy session photos, 3 more TSP
  club photos, and 3 more School_leadership photos (2 more Panthers
  house-spirit shots folded into that card's gallery, Interhouse
  football/table tennis folded into a new "Inter-House Sports" card).
- `src/content/site.ts` — every relevant entry now carries a `gallery:
  MediaItem[]` and/or `documents: DocumentItem[]` array instead of a
  single image.
- Only 2 files were deliberately still left out: `Entrepreneurship Club
  MOM.docx` (internal club meeting minutes — informal, not written for
  publication) and the near-duplicate/junk files already flagged
  earlier (e.g. `IMG_0840 2.jpeg`, the extra `Founders forum_(1).png`).
  M&TSI stays fully excluded, unchanged.
- Verified: build + lint clean; headless-browser testing confirmed the
  gallery lightbox opens/navigates correctly and the document modal's
  DOM is correct (dialog opens, iframe `src` and download `href` both
  point at the right PDF). The PDF preview itself renders as a blank
  iframe in my headless test browser — that's a known Playwright/
  headless-Chromium limitation (no bundled PDF viewer plugin), not a
  site bug; real browsers (Chrome, Safari, Firefox, Edge) all render
  PDFs in an `<iframe>` natively. Worth a manual check in a real
  browser once deployed, just to be sure.
