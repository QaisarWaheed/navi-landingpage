"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { LandingContent, ResourceBlogItem } from "@/lib/cms/types";
import { defaultLandingContent } from "@/lib/cms/defaults";
import { MAX_GETTING_STARTED_VIDEO_BYTES, selfHostedGettingStartedSrc } from "@/lib/cms/hostedGettingStartedVideo";

function Field({
  label,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-navy">{label}</span>
      <input
        className="mt-1 w-full rounded-lg border border-navy/20 px-3 py-2 text-sm text-navy"
        {...props}
      />
    </label>
  );
}

function Area({
  label,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string }) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-navy">{label}</span>
      <textarea
        className="mt-1 w-full rounded-lg border border-navy/20 px-3 py-2 text-sm text-navy"
        rows={3}
        {...props}
      />
    </label>
  );
}

function LoginForm({ onSuccess }: { onSuccess: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setPending(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error || "Login failed.");
        return;
      }
      onSuccess();
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="mx-auto max-w-md rounded-2xl border border-navy/10 bg-white p-8 shadow-lg">
      <h1 className="text-xl font-bold text-navy">NAVI CMS</h1>
      <p className="mt-1 text-sm text-navy/80">Sign in to edit landing page content.</p>
      <form onSubmit={submit} className="mt-6 space-y-4">
        <Field
          label="Email"
          type="email"
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label className="block">
          <span className="text-sm font-medium text-navy">Password</span>
          <input
            type="password"
            autoComplete="current-password"
            className="mt-1 w-full rounded-lg border border-navy/20 px-3 py-2 text-sm text-navy"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button
          type="submit"
          disabled={pending}
          className="w-full rounded-lg bg-accent py-2.5 text-sm font-semibold text-white hover:bg-accent-hover disabled:opacity-50"
        >
          {pending ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </div>
  );
}

function Editor({
  initial,
  onLogout,
}: {
  initial: LandingContent;
  onLogout: () => void;
}) {
  const [c, setC] = useState<LandingContent>(initial);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [videoUploadPending, setVideoUploadPending] = useState(false);
  const [videoUploadErr, setVideoUploadErr] = useState<string | null>(null);
  const videoFileRef = useRef<HTMLInputElement>(null);

  const patchHero = useCallback((k: keyof LandingContent["hero"], v: string) => {
    setC((p) => ({ ...p, hero: { ...p.hero, [k]: v } }));
  }, []);

  const patchAbout = useCallback((k: keyof LandingContent["about"], v: string) => {
    setC((p) => ({ ...p, about: { ...p.about, [k]: v } }));
  }, []);

  const patchPrivacy = useCallback((k: keyof LandingContent["privacy"], v: string) => {
    setC((p) => ({ ...p, privacy: { ...p.privacy, [k]: v } }));
  }, []);

  const patchContact = useCallback((k: keyof LandingContent["contact"], v: string) => {
    setC((p) => ({ ...p, contact: { ...p.contact, [k]: v } }));
  }, []);

  async function save(override?: LandingContent) {
    const payload = override ?? c;
    setSaving(true);
    setMsg(null);
    setErr(null);
    try {
      const res = await fetch("/api/cms", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setErr(data.error || "Save failed.");
        return;
      }
      setMsg("Saved. Homepage updated.");
    } finally {
      setSaving(false);
    }
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    onLogout();
  }

  async function uploadGettingStartedVideo(file: File) {
    setVideoUploadErr(null);
    setVideoUploadPending(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/cms/upload-video", { method: "POST", body: fd });
      const data = (await res.json().catch(() => ({}))) as { error?: string; path?: string };
      if (!res.ok) {
        setVideoUploadErr(data.error || "Upload failed.");
        return;
      }
      if (data.path) {
        let merged!: LandingContent;
        setC((p) => {
          merged = { ...p, howItWorks: { ...p.howItWorks, gettingStartedVideoUrl: data.path! } };
          return merged;
        });
        await save(merged);
      }
      if (videoFileRef.current) videoFileRef.current.value = "";
    } finally {
      setVideoUploadPending(false);
    }
  }

  async function removeHostedGettingStartedVideo() {
    setVideoUploadErr(null);
    setVideoUploadPending(true);
    try {
      const res = await fetch("/api/cms/upload-video", { method: "DELETE" });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        setVideoUploadErr(data.error || "Remove failed.");
        return;
      }
      let merged!: LandingContent;
      setC((p) => {
        merged = { ...p, howItWorks: { ...p.howItWorks, gettingStartedVideoUrl: "" } };
        return merged;
      });
      await save(merged);
    } finally {
      setVideoUploadPending(false);
    }
  }

  return (
    <div className="space-y-10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-navy">Edit landing page</h1>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={logout}
            className="rounded-lg border border-navy/20 px-4 py-2 text-sm font-medium text-navy hover:bg-canvas"
          >
            Log out
          </button>
          <button
            type="button"
            onClick={() => void save()}
            disabled={saving}
            className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white hover:bg-accent-hover disabled:opacity-50"
          >
            {saving ? "Saving…" : "Save changes"}
          </button>
        </div>
      </div>
      {msg && <p className="text-sm font-medium text-accent">{msg}</p>}
      {err && <p className="text-sm text-red-600">{err}</p>}

      <section className="rounded-xl border border-navy/10 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-bold text-navy">Hero</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <Field label="Brand title" value={c.hero.brandTitle} onChange={(e) => patchHero("brandTitle", e.target.value)} />
          <Field label="Tagline" value={c.hero.tagline} onChange={(e) => patchHero("tagline", e.target.value)} />
          <Area label="Left column subtext" value={c.hero.subtext} onChange={(e) => patchHero("subtext", e.target.value)} />
          <Field label="Right eyebrow" value={c.hero.rightEyebrow} onChange={(e) => patchHero("rightEyebrow", e.target.value)} />
          <Field label="Right headline" value={c.hero.rightTitle} onChange={(e) => patchHero("rightTitle", e.target.value)} />
          <Area label="Right body" value={c.hero.rightBody} onChange={(e) => patchHero("rightBody", e.target.value)} />
          <div className="sm:col-span-2">
            <Field
              label="Get Started URL"
              value={c.hero.getStartedUrl}
              onChange={(e) => patchHero("getStartedUrl", e.target.value)}
            />
          </div>
        </div>
      </section>

      <section className="rounded-xl border border-navy/10 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-bold text-navy">About</h2>
        <div className="mt-4 grid gap-4">
          <Field label="Section heading" value={c.about.heading} onChange={(e) => patchAbout("heading", e.target.value)} />
          <Area label="Lead line" value={c.about.lead} onChange={(e) => patchAbout("lead", e.target.value)} />
          <Area label="Body" value={c.about.body} rows={4} onChange={(e) => patchAbout("body", e.target.value)} />
          <Area label="Testimonial quote" value={c.about.testimonialQuote} onChange={(e) => patchAbout("testimonialQuote", e.target.value)} />
          <div className="grid gap-4 sm:grid-cols-3">
            <Field
              label="Testimonial initials"
              value={c.about.testimonialInitials}
              onChange={(e) => patchAbout("testimonialInitials", e.target.value)}
            />
            <Field label="Name" value={c.about.testimonialName} onChange={(e) => patchAbout("testimonialName", e.target.value)} />
            <Field label="Role" value={c.about.testimonialRole} onChange={(e) => patchAbout("testimonialRole", e.target.value)} />
          </div>
        </div>
      </section>

      <section className="rounded-xl border border-navy/10 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-bold text-navy">How it works</h2>
        <Field
          label="Section heading"
          value={c.howItWorks.heading}
          onChange={(e) =>
            setC((p) => ({ ...p, howItWorks: { ...p.howItWorks, heading: e.target.value } }))
          }
        />
        {[0, 1, 2].map((i) => (
          <div key={i} className="mt-4 rounded-lg border border-navy/10 p-4">
            <p className="text-sm font-semibold text-navy">Step {i + 1}</p>
            <div className="mt-2 grid gap-3">
              <Field
                label="Title"
                value={c.howItWorks.steps[i]!.title}
                onChange={(e) => {
                  const v = e.target.value;
                  setC((p) => {
                    const steps = [...p.howItWorks.steps];
                    steps[i] = { ...steps[i]!, title: v };
                    return { ...p, howItWorks: { ...p.howItWorks, steps } };
                  });
                }}
              />
              <Area
                label="Body"
                value={c.howItWorks.steps[i]!.body}
                rows={3}
                onChange={(e) => {
                  const v = e.target.value;
                  setC((p) => {
                    const steps = [...p.howItWorks.steps];
                    steps[i] = { ...steps[i]!, body: v };
                    return { ...p, howItWorks: { ...p.howItWorks, steps } };
                  });
                }}
              />
            </div>
          </div>
        ))}
        <div className="mt-6 space-y-4 border-t border-navy/10 pt-6">
          <p className="text-sm font-semibold text-navy">Getting started video</p>
          <p className="text-xs text-navy/75">
            Upload a short MP4 or WebM (about one minute is ideal). It is stored on this site and plays inline for visitors. Maximum size{" "}
            {Math.round(MAX_GETTING_STARTED_VIDEO_BYTES / (1024 * 1024))} MB. After upload, your draft is saved automatically so the
            homepage can use the file.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <input
              ref={videoFileRef}
              type="file"
              accept=".mp4,.webm,video/mp4,video/webm"
              className="max-w-full text-sm text-navy file:mr-3 file:rounded-lg file:border-0 file:bg-navy file:px-3 file:py-2 file:text-sm file:font-medium file:text-white"
              disabled={videoUploadPending}
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) void uploadGettingStartedVideo(f);
              }}
            />
            {selfHostedGettingStartedSrc(c.howItWorks.gettingStartedVideoUrl) ? (
              <button
                type="button"
                disabled={videoUploadPending}
                className="rounded-lg border border-navy/20 px-3 py-2 text-sm font-medium text-red-700 hover:bg-red-50 disabled:opacity-50"
                onClick={() => void removeHostedGettingStartedVideo()}
              >
                Remove hosted file
              </button>
            ) : null}
          </div>
          {videoUploadErr ? <p className="text-sm text-red-600">{videoUploadErr}</p> : null}
          <Field
            label="Optional: YouTube or Vimeo watch URL (only if you are not using an uploaded file)"
            placeholder="https://…"
            value={
              selfHostedGettingStartedSrc(c.howItWorks.gettingStartedVideoUrl)
                ? ""
                : c.howItWorks.gettingStartedVideoUrl
            }
            disabled={!!selfHostedGettingStartedSrc(c.howItWorks.gettingStartedVideoUrl)}
            onChange={(e) =>
              setC((p) => ({ ...p, howItWorks: { ...p.howItWorks, gettingStartedVideoUrl: e.target.value } }))
            }
          />
          {selfHostedGettingStartedSrc(c.howItWorks.gettingStartedVideoUrl) ? (
            <p className="text-xs text-navy/70">
              Current file:{" "}
              <code className="rounded bg-canvas px-1">{c.howItWorks.gettingStartedVideoUrl}</code> — clear the hosted file
              above to use an external embed URL instead.
            </p>
          ) : null}
          <Field
            label="Video block heading"
            value={c.howItWorks.gettingStartedVideoHeading}
            onChange={(e) =>
              setC((p) => ({ ...p, howItWorks: { ...p.howItWorks, gettingStartedVideoHeading: e.target.value } }))
            }
          />
          <Area
            label="Video block description"
            value={c.howItWorks.gettingStartedVideoSubtext}
            rows={2}
            onChange={(e) =>
              setC((p) => ({ ...p, howItWorks: { ...p.howItWorks, gettingStartedVideoSubtext: e.target.value } }))
            }
          />
          <p className="text-xs text-navy/70">
            The hero &quot;How to get started&quot; button scrolls to this player when a hosted file or valid embed URL is set.
          </p>
        </div>
      </section>

      <section className="rounded-xl border border-navy/10 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-bold text-navy">Resources (blog list)</h2>
        <p className="mt-1 text-sm text-navy/80">
          These entries appear on <span className="font-medium">/resources</span>. Each row links out to your article.
        </p>
        <div className="mt-4 grid gap-4">
          <Field
            label="Page title"
            value={c.resources.pageTitle}
            onChange={(e) => {
              const v = e.target.value;
              setC((p) => ({ ...p, resources: { ...p.resources, pageTitle: v } }));
            }}
          />
          <Area
            label="Page intro"
            value={c.resources.pageIntro}
            rows={3}
            onChange={(e) => {
              const v = e.target.value;
              setC((p) => ({ ...p, resources: { ...p.resources, pageIntro: v } }));
            }}
          />
        </div>
        <div className="mt-6 space-y-4">
          {c.resources.items.map((item, index) => (
            <div key={item.id} className="rounded-lg border border-navy/10 p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-sm font-semibold text-navy">Article {index + 1}</p>
                <button
                  type="button"
                  className="text-sm font-medium text-red-600 hover:underline"
                  onClick={() =>
                    setC((p) => ({
                      ...p,
                      resources: {
                        ...p.resources,
                        items: p.resources.items.filter((_, j) => j !== index),
                      },
                    }))
                  }
                >
                  Remove
                </button>
              </div>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <Field
                  label="Title"
                  value={item.title}
                  onChange={(e) => {
                    const v = e.target.value;
                    setC((p) => {
                      const items = [...p.resources.items];
                      items[index] = { ...items[index]!, title: v };
                      return { ...p, resources: { ...p.resources, items } };
                    });
                  }}
                />
                <Field
                  label="Date (optional)"
                  value={item.date ?? ""}
                  onChange={(e) => {
                    const v = e.target.value;
                    setC((p) => {
                      const items = [...p.resources.items];
                      items[index] = { ...items[index]!, date: v || undefined };
                      return { ...p, resources: { ...p.resources, items } };
                    });
                  }}
                />
                <div className="sm:col-span-2">
                  <Field
                    label="Link URL"
                    value={item.url}
                    onChange={(e) => {
                      const v = e.target.value;
                      setC((p) => {
                        const items = [...p.resources.items];
                        items[index] = { ...items[index]!, url: v };
                        return { ...p, resources: { ...p.resources, items } };
                      });
                    }}
                  />
                </div>
                <div className="sm:col-span-2">
                  <Area
                    label="Excerpt"
                    value={item.excerpt ?? ""}
                    rows={2}
                    onChange={(e) => {
                      const v = e.target.value;
                      setC((p) => {
                        const items = [...p.resources.items];
                        items[index] = { ...items[index]!, excerpt: v || undefined };
                        return { ...p, resources: { ...p.resources, items } };
                      });
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        <button
          type="button"
          className="mt-4 rounded-lg border border-dashed border-navy/25 px-4 py-2 text-sm font-medium text-navy hover:bg-canvas"
          onClick={() => {
            const next: ResourceBlogItem = {
              id: typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : `post-${Date.now()}`,
              title: "New article",
              excerpt: "",
              url: "https://",
            };
            setC((p) => ({
              ...p,
              resources: { ...p.resources, items: [...p.resources.items, next] },
            }));
          }}
        >
          Add article
        </button>
      </section>

      <section className="rounded-xl border border-navy/10 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-bold text-navy">Privacy preview</h2>
        <div className="mt-4 grid gap-4">
          <Field label="Pill text" value={c.privacy.pill} onChange={(e) => patchPrivacy("pill", e.target.value)} />
          <Field label="Heading" value={c.privacy.heading} onChange={(e) => patchPrivacy("heading", e.target.value)} />
          <Area label="Body" value={c.privacy.body} rows={4} onChange={(e) => patchPrivacy("body", e.target.value)} />
          <Field label="Last updated line" value={c.privacy.lastUpdated} onChange={(e) => patchPrivacy("lastUpdated", e.target.value)} />
        </div>
      </section>

      <section className="rounded-xl border border-navy/10 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-bold text-navy">Contact section</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <Field label="Heading" value={c.contact.heading} onChange={(e) => patchContact("heading", e.target.value)} />
          <Field label="Sidebar title" value={c.contact.sidebarTitle} onChange={(e) => patchContact("sidebarTitle", e.target.value)} />
          <div className="sm:col-span-2">
            <Area label="Intro text" value={c.contact.subtext} onChange={(e) => patchContact("subtext", e.target.value)} />
          </div>
          <Field label="Email (display)" value={c.contact.email} onChange={(e) => patchContact("email", e.target.value)} />
          <Field label="Phone" value={c.contact.phone} onChange={(e) => patchContact("phone", e.target.value)} />
          <Field label="Address line 1" value={c.contact.addressLine1} onChange={(e) => patchContact("addressLine1", e.target.value)} />
          <Field label="Address line 2" value={c.contact.addressLine2} onChange={(e) => patchContact("addressLine2", e.target.value)} />
        </div>
      </section>
    </div>
  );
}

export function AdminPanel() {
  const [auth, setAuth] = useState<boolean | null>(null);
  const [configured, setConfigured] = useState(true);
  const [content, setContent] = useState<LandingContent | null>(null);

  const loadContent = useCallback(() => {
    fetch("/api/cms")
      .then((r) => r.json())
      .then((d) => setContent(d as LandingContent))
      .catch(() => setContent(defaultLandingContent));
  }, []);

  useEffect(() => {
    fetch("/api/admin/session")
      .then((r) => r.json())
      .then((d: { authenticated?: boolean; configured?: boolean }) => {
        setAuth(!!d.authenticated);
        if (d.configured === false) setConfigured(false);
        if (d.authenticated) loadContent();
      })
      .catch(() => setAuth(false));
  }, [loadContent]);

  useEffect(() => {
    if (auth === true && !content) loadContent();
  }, [auth, content, loadContent]);

  if (auth === null) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center text-navy">
        <p>Loading…</p>
      </div>
    );
  }

  if (!configured) {
    return (
      <div className="mx-auto max-w-lg rounded-xl border border-amber-200 bg-amber-50 p-6 text-navy">
        <p className="font-semibold">Admin is not configured</p>
        <p className="mt-2 text-sm">
          Set <code className="rounded bg-white px-1">SESSION_SECRET</code> (32+ characters),{" "}
          <code className="rounded bg-white px-1">ADMIN_EMAIL</code>, and{" "}
          <code className="rounded bg-white px-1">ADMIN_PASSWORD_HASH</code> in your environment.
        </p>
      </div>
    );
  }

  if (!auth) {
    return <LoginForm onSuccess={() => { setAuth(true); loadContent(); }} />;
  }

  if (!content) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center text-navy">
        <p>Loading editor…</p>
      </div>
    );
  }

  return (
    <Editor
      initial={content}
      onLogout={() => {
        setAuth(false);
        setContent(null);
      }}
    />
  );
}
