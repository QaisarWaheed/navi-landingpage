"use client";

import { useState, FormEvent } from "react";

const submitButtonClass =
  "inline-flex w-full min-h-12 items-center justify-center rounded-lg border-2 border-navy/30 bg-accent px-6 py-3 text-base font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.15),0_4px_14px_rgba(15,43,92,0.2)] transition-all duration-300 hover:border-navy/45 hover:bg-accent-hover hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_6px_20px_rgba(15,43,92,0.28)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy disabled:cursor-not-allowed disabled:opacity-60 disabled:shadow-none motion-safe:hover:-translate-y-0.5 motion-safe:active:translate-y-0";

type Errors = Partial<Record<"name" | "email" | "message", string>>;

function validateEmail(value: string) {
  const trimmed = value.trim();
  if (!trimmed) return "Email is required.";
  const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed);
  return ok ? null : "Enter a valid email address.";
}

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);
  const [pending, setPending] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const next: Errors = {};

    if (!name.trim()) next.name = "Name is required.";
    const emailErr = validateEmail(email);
    if (emailErr) next.email = emailErr;
    if (!message.trim()) next.message = "Message is required.";
    else if (message.trim().length < 10)
      next.message = "Please write at least 10 characters.";

    setErrors(next);
    setFormError(null);
    if (Object.keys(next).length > 0) {
      setSubmitted(false);
      return;
    }

    setPending(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          message: message.trim(),
        }),
      });

      const data = (await res.json().catch(() => ({}))) as { error?: string };

      if (!res.ok) {
        setSubmitted(false);
        setFormError(data.error || "Something went wrong. Please try again.");
        return;
      }

      setSubmitted(true);
      setName("");
      setEmail("");
      setMessage("");
    } catch {
      setSubmitted(false);
      setFormError("Could not reach the server. Check your connection and try again.");
    } finally {
      setPending(false);
    }
  }

  const inputClass =
    "mt-1.5 w-full rounded-lg border border-navy/20 bg-white px-3.5 py-2.5 text-sm text-navy shadow-sm outline-none transition-all duration-200 ease-out placeholder:text-accent hover:border-navy/35 focus:border-accent focus:ring-2 focus:ring-accent motion-safe:focus:shadow-[0_0_0_3px_rgba(0,115,252,0.2)] disabled:cursor-not-allowed disabled:opacity-60";

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className="text-sm font-medium text-navy">
            Name
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder="e.g. Jane Smith"
            value={name}
            disabled={pending}
            onChange={(e) => {
              setName(e.target.value);
              if (errors.name) setErrors((p) => ({ ...p, name: undefined }));
            }}
            className={inputClass}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "contact-name-error" : undefined}
          />
          {errors.name && (
            <p id="contact-name-error" className="mt-1.5 text-sm text-red-600">
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="contact-email" className="text-sm font-medium text-navy">
            Email
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@company.com"
            value={email}
            disabled={pending}
            onChange={(e) => {
              setEmail(e.target.value);
              if (errors.email) setErrors((p) => ({ ...p, email: undefined }));
            }}
            className={inputClass}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "contact-email-error" : undefined}
          />
          {errors.email && (
            <p id="contact-email-error" className="mt-1.5 text-sm text-red-600">
              {errors.email}
            </p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="contact-message" className="text-sm font-medium text-navy">
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          placeholder="Tell us about your team, timeline, or how we can help…"
          value={message}
          disabled={pending}
          onChange={(e) => {
            setMessage(e.target.value);
            if (errors.message) setErrors((p) => ({ ...p, message: undefined }));
          }}
          className={`${inputClass} min-h-[140px] resize-y`}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "contact-message-error" : undefined}
        />
        {errors.message && (
          <p id="contact-message-error" className="mt-1.5 text-sm text-red-600">
            {errors.message}
          </p>
        )}
      </div>

      <div className="space-y-3">
        <button type="submit" disabled={pending} className={submitButtonClass}>
          {pending ? "Sending…" : "Send Message"}
        </button>
        {formError && (
          <p className="text-sm text-red-600" role="alert">
            {formError}
          </p>
        )}
        {submitted && (
          <p className="text-sm font-medium text-accent" role="status">
            Thanks — your message was sent. We&apos;ll get back to you soon.
          </p>
        )}
      </div>
    </form>
  );
}
