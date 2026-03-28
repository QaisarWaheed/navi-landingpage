import { Resend } from "resend";
import { NextResponse } from "next/server";

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function validateEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.RESEND_FROM_EMAIL;
  const fromName = (process.env.RESEND_FROM_NAME || "NAVI").trim();
  const toEmail = (process.env.RESEND_TO_EMAIL || fromEmail || "").trim();

  if (!apiKey || !fromEmail || !toEmail) {
    return NextResponse.json(
      { error: "Email is not configured on the server." },
      { status: 500 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { name, email, message } = body as Record<string, unknown>;
  const nameStr = typeof name === "string" ? name.trim() : "";
  const emailStr = typeof email === "string" ? email.trim() : "";
  const messageStr = typeof message === "string" ? message.trim() : "";

  if (!nameStr) {
    return NextResponse.json({ error: "Name is required." }, { status: 400 });
  }
  if (!emailStr || !validateEmail(emailStr)) {
    return NextResponse.json({ error: "A valid email is required." }, { status: 400 });
  }
  if (!messageStr || messageStr.length < 10) {
    return NextResponse.json(
      { error: "Message must be at least 10 characters." },
      { status: 400 },
    );
  }

  const resend = new Resend(apiKey);

  const { data, error } = await resend.emails.send({
    from: `${fromName} <${fromEmail}>`,
    to: [toEmail],
    replyTo: emailStr,
    subject: `NAVI contact: ${nameStr}`,
    text: `Name: ${nameStr}\nEmail: ${emailStr}\n\n${messageStr}`,
    html: `<p><strong>Name:</strong> ${escapeHtml(nameStr)}</p><p><strong>Email:</strong> ${escapeHtml(
      emailStr,
    )}</p><p><strong>Message:</strong></p><p>${escapeHtml(messageStr).replace(/\n/g, "<br/>")}</p>`,
  });

  if (error) {
    console.error("[contact] Resend error:", error);
    return NextResponse.json({ error: "Could not send your message. Please try again later." }, { status: 502 });
  }

  return NextResponse.json({ ok: true as const, id: data?.id });
}
