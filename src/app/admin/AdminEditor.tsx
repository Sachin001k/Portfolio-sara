"use client";

import { useEffect, useState, useTransition } from "react";
import type {
  AwardItem,
  ResearchItem,
  SchoolRoleItem,
  SiteContent,
  TextSection,
} from "@/content/site";
import { saveContent, signOut } from "./actions";
import {
  DocumentListEditor,
  FileField,
  ItemList,
  MediaListEditor,
  Panel,
  StringList,
  TextField,
} from "./fields";

const SECTIONS = [
  { id: "hero", label: "Hero & Contact" },
  { id: "about", label: "About Me" },
  { id: "research", label: "Research & Innovation" },
  { id: "ballet", label: "Ballet" },
  { id: "movement", label: "Movement Literacy" },
  { id: "school", label: "School Leadership" },
  { id: "club", label: "Club" },
  { id: "internship", label: "Internship" },
  { id: "awards", label: "Awards" },
];

export function AdminEditor({
  initial,
  email,
}: {
  initial: SiteContent;
  email: string;
}) {
  const [content, setContent] = useState(initial);
  const [saved, setSaved] = useState(initial);
  const [message, setMessage] = useState<
    { kind: "ok" | "error"; text: string } | null
  >(null);
  const [saving, startSaving] = useTransition();
  const dirty = content !== saved;

  // Warn before leaving with unsaved edits.
  useEffect(() => {
    if (!dirty) return;
    const warn = (e: BeforeUnloadEvent) => e.preventDefault();
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);

  function set<K extends keyof SiteContent>(key: K, value: SiteContent[K]) {
    setContent((c) => ({ ...c, [key]: value }));
    setMessage(null);
  }

  function save() {
    startSaving(async () => {
      const result = await saveContent(content);
      if (result.ok) {
        setSaved(content);
        setMessage({ kind: "ok", text: "Saved — the live site is updated." });
      } else {
        setMessage({ kind: "error", text: result.error });
      }
    });
  }

  const { siteConfig } = content;
  const setConfig = (patch: Partial<SiteContent["siteConfig"]>) =>
    set("siteConfig", { ...siteConfig, ...patch });

  return (
    <div className="min-h-screen bg-sand/50">
      <header className="sticky top-0 z-40 border-b border-ink/10 bg-cream/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <div>
            <p className="font-display text-xl">Portfolio admin</p>
            <p className="text-xs text-ink/50">Signed in as {email}</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            {message && (
              <span
                className={`text-sm ${message.kind === "ok" ? "text-moss" : "text-red-700"}`}
              >
                {message.text}
              </span>
            )}
            {dirty && !message && (
              <span className="text-sm text-ink/60">Unsaved changes</span>
            )}
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold text-clay-dark underline underline-offset-4"
            >
              View site ↗
            </a>
            <button
              type="button"
              onClick={() => {
                if (!dirty || confirm("Discard your unsaved changes?")) {
                  setContent(saved);
                  setMessage(null);
                }
              }}
              disabled={!dirty || saving}
              className="rounded-full border border-ink/20 px-4 py-2 text-sm font-semibold disabled:opacity-40"
            >
              Discard
            </button>
            <button
              type="button"
              onClick={save}
              disabled={!dirty || saving}
              className="rounded-full bg-clay px-5 py-2 text-sm font-semibold text-cream transition hover:bg-clay-dark disabled:opacity-40"
            >
              {saving ? "Saving…" : "Save changes"}
            </button>
            <form action={signOut}>
              <button type="submit" className="text-sm text-ink/60 hover:text-ink">
                Sign out
              </button>
            </form>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[13rem_1fr]">
        <nav className="hidden lg:block">
          <ul className="sticky top-28 space-y-1 text-sm">
            {SECTIONS.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className="block rounded-lg px-3 py-2 font-medium text-ink/70 transition hover:bg-cream hover:text-ink"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <main className="min-w-0 space-y-8 [&>div]:scroll-mt-28">
          <div id="hero">
            <Panel
              title="Hero & Contact"
              description="The top of the page, the résumé link under About Me, and the Contact section. Leave email and social links empty to hide the Contact section."
            >
              <TextField
                label="Name"
                value={siteConfig.name}
                onChange={(name) => setConfig({ name })}
              />
              <TextField
                label="Pronouns"
                value={siteConfig.pronouns}
                onChange={(pronouns) => setConfig({ pronouns })}
              />
              <StringList
                label="Tags"
                items={siteConfig.tags}
                onChange={(tags) => setConfig({ tags })}
                addLabel="Add tag"
              />
              <TextField
                label="Intro paragraph"
                multiline
                rows={6}
                value={siteConfig.heroIntro}
                onChange={(heroIntro) => setConfig({ heroIntro })}
              />
              <FileField
                label="Résumé (PDF)"
                kind="pdf"
                accept="application/pdf"
                value={siteConfig.resumeUrl}
                onChange={(resumeUrl) => setConfig({ resumeUrl })}
                hint="The “View résumé” link only appears once a PDF is uploaded."
              />
              <TextField
                label="Public email"
                value={siteConfig.email}
                onChange={(email) => setConfig({ email: email.trim() })}
                placeholder="name@example.com"
              />
              <div>
                <span className="mb-1.5 block text-sm font-semibold">
                  Social links
                </span>
                <ItemList
                  items={siteConfig.socials}
                  onChange={(socials) => setConfig({ socials })}
                  newItem={() => ({ label: "", href: "" })}
                  itemTitle={(s) => s.label}
                  addLabel="Add social link"
                  renderItem={(social, setSocial) => (
                    <>
                      <TextField
                        label="Label"
                        placeholder="LinkedIn"
                        value={social.label}
                        onChange={(label) => setSocial({ ...social, label })}
                      />
                      <TextField
                        label="Link"
                        placeholder="https://linkedin.com/in/…"
                        value={social.href}
                        onChange={(href) =>
                          setSocial({ ...social, href: href.trim() })
                        }
                      />
                    </>
                  )}
                />
              </div>
            </Panel>
          </div>

          <div id="about">
            <Panel title="About Me">
              <TextField
                label="Heading"
                value={content.about.heading}
                onChange={(heading) =>
                  set("about", { ...content.about, heading })
                }
              />
              <StringList
                label="Paragraphs"
                multiline
                items={content.about.paragraphs}
                onChange={(paragraphs) =>
                  set("about", { ...content.about, paragraphs })
                }
                addLabel="Add paragraph"
              />
            </Panel>
          </div>

          <div id="research">
            <Panel
              title="Research & Innovation"
              description="Each project is a card. Click a project to edit it."
            >
              <ItemList<ResearchItem>
                items={content.research}
                onChange={(research) => set("research", research)}
                newItem={() => ({
                  tag: "",
                  title: "New project",
                  description: "",
                  bullets: [],
                  gallery: [],
                  documents: [],
                })}
                itemTitle={(r) => r.title}
                addLabel="Add project"
                renderItem={(item, setItem) => (
                  <>
                    <TextField
                      label="Label (small pill above the title)"
                      value={item.tag}
                      onChange={(tag) => setItem({ ...item, tag })}
                    />
                    <TextField
                      label="Title"
                      value={item.title}
                      onChange={(title) => setItem({ ...item, title })}
                    />
                    <TextField
                      label="Description"
                      multiline
                      rows={6}
                      value={item.description}
                      onChange={(description) =>
                        setItem({ ...item, description })
                      }
                    />
                    <StringList
                      label="Bullet points"
                      items={item.bullets}
                      onChange={(bullets) => setItem({ ...item, bullets })}
                      addLabel="Add bullet"
                    />
                    <DocumentListEditor
                      items={item.documents}
                      onChange={(documents) => setItem({ ...item, documents })}
                    />
                    <MediaListEditor
                      label="Photos & videos"
                      items={item.gallery}
                      onChange={(gallery) => setItem({ ...item, gallery })}
                    />
                  </>
                )}
              />
            </Panel>
          </div>

          <div id="ballet">
            <TextSectionPanel
              title="Ballet"
              section={content.ballet}
              onChange={(ballet) => set("ballet", ballet)}
            />
          </div>

          <div id="movement">
            <TextSectionPanel
              title="Movement Literacy"
              section={content.movementLiteracy}
              onChange={(m) => set("movementLiteracy", m)}
            />
          </div>

          <div id="school">
            <Panel
              title="School Leadership"
              description="Each role is a card. Leave the caption empty to hide it."
            >
              <ItemList<SchoolRoleItem>
                items={content.schoolRoles}
                onChange={(schoolRoles) => set("schoolRoles", schoolRoles)}
                newItem={() => ({ role: "New role", context: "", gallery: [] })}
                itemTitle={(r) => r.role}
                addLabel="Add role"
                renderItem={(item, setItem) => (
                  <>
                    <TextField
                      label="Role"
                      value={item.role}
                      onChange={(role) => setItem({ ...item, role })}
                    />
                    <TextField
                      label="Caption"
                      multiline
                      rows={3}
                      value={item.context}
                      onChange={(context) => setItem({ ...item, context })}
                    />
                    <MediaListEditor
                      label="Photos & videos"
                      items={item.gallery}
                      onChange={(gallery) => setItem({ ...item, gallery })}
                    />
                  </>
                )}
              />
            </Panel>
          </div>

          <div id="club">
            <Panel title="Club & Community">
              <TextField
                label="Club name"
                value={content.tspClub.name}
                onChange={(name) => set("tspClub", { ...content.tspClub, name })}
              />
              <TextField
                label="Description"
                multiline
                rows={6}
                value={content.tspClub.description}
                onChange={(description) =>
                  set("tspClub", { ...content.tspClub, description })
                }
              />
              <DocumentListEditor
                items={content.tspClub.documents}
                onChange={(documents) =>
                  set("tspClub", { ...content.tspClub, documents })
                }
              />
              <MediaListEditor
                label="Photos & videos"
                items={content.tspClub.gallery}
                onChange={(gallery) =>
                  set("tspClub", { ...content.tspClub, gallery })
                }
              />
            </Panel>
          </div>

          <div id="internship">
            <Panel title="Internship">
              <TextField
                label="Title"
                value={content.internship.title}
                onChange={(title) =>
                  set("internship", { ...content.internship, title })
                }
              />
              <TextField
                label="Description"
                multiline
                rows={6}
                value={content.internship.description}
                onChange={(description) =>
                  set("internship", { ...content.internship, description })
                }
              />
              <DocumentListEditor
                items={content.internship.documents}
                onChange={(documents) =>
                  set("internship", { ...content.internship, documents })
                }
              />
            </Panel>
          </div>

          <div id="awards">
            <Panel
              title="Awards & Recognition"
              description="Shown in this order. Upload a photo of the certificate or ceremony for each."
            >
              <ItemList<AwardItem>
                items={content.awards}
                onChange={(awards) => set("awards", awards)}
                newItem={() => ({ title: "New award", issuer: "", image: "" })}
                itemTitle={(a) => a.title}
                addLabel="Add award"
                renderItem={(item, setItem) => (
                  <>
                    <TextField
                      label="Award"
                      value={item.title}
                      onChange={(title) => setItem({ ...item, title })}
                    />
                    <TextField
                      label="Details (issuer, year, …)"
                      multiline
                      rows={2}
                      value={item.issuer}
                      onChange={(issuer) => setItem({ ...item, issuer })}
                    />
                    <FileField
                      label="Image"
                      kind="image"
                      accept="image/jpeg,image/png,image/webp"
                      value={item.image}
                      onChange={(image) => setItem({ ...item, image })}
                    />
                  </>
                )}
              />
            </Panel>
          </div>
        </main>
      </div>
    </div>
  );
}

function TextSectionPanel({
  title,
  section,
  onChange,
}: {
  title: string;
  section: TextSection;
  onChange: (section: TextSection) => void;
}) {
  return (
    <Panel title={title}>
      <TextField
        label="Heading"
        value={section.heading}
        onChange={(heading) => onChange({ ...section, heading })}
      />
      <TextField
        label="Description"
        multiline
        rows={6}
        value={section.description}
        onChange={(description) => onChange({ ...section, description })}
      />
      <MediaListEditor
        label="Photos & videos"
        items={section.gallery}
        onChange={(gallery) => onChange({ ...section, gallery })}
      />
    </Panel>
  );
}
