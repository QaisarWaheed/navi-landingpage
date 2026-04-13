import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { verifyAdminCredentials } from "@/lib/cms/auth";
import { getAdminSessionOptions, type AdminSession } from "@/lib/cms/session";

export async function POST(request: Request) {
  const options = getAdminSessionOptions();
  if (!options) {
    return NextResponse.json({ error: "Server is not configured for admin login." }, { status: 500 });
  }

  let body: { email?: string; password?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (!verifyAdminCredentials(body.email ?? "", body.password ?? "")) {
    return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
  }

  const session = await getIronSession<AdminSession>(await cookies(), options);
  session.isAdmin = true;
  await session.save();

  return NextResponse.json({ ok: true });
}
