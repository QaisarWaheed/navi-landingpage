"use client";

import { useState, FormEvent } from "react";
import { Button } from "./Button";

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

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const next: Errors = {};

    if (!name.trim()) next.name = "Name is required.";
    const emailErr = validateEmail(email);
    if (emailErr) next.email = emailErr;
    if (!message.trim()) next.message = "Message is required.";
    else if (message.trim().length < 10)
      next.message = "Please write at least 10 characters.";

    setErrors(next);
    if (Object.keys(next).length > 0) {
      setSubmitted(false);
      return;
    }

    setSubmitted(true);
  }

  const inputClass =
    "mt-1.5 w-full rounded-lg border border-navy/20 bg-white px-3.5 py-2.5 text-sm text-navy shadow-sm outline-none transition-all duration-200 ease-out placeholder:text-accent hover:border-navy/35 focus:border-accent focus:ring-2 focus:ring-accent motion-safe:focus:shadow-[0_0_0_3px_rgba(0,115,252,0.2)]";

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
        <Button type="submit" variant="primary" className="w-full rounded-lg py-3 text-base font-semibold">
          Send Message
        </Button>
        {submitted && (
          <p className="text-sm font-medium text-accent" role="status">
            Thanks — your message passes validation. (No backend yet.)
          </p>
        )}
      </div>
    </form>
  );
}
