import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getLandingContent, saveLandingContent } from "@/lib/cms/store";
import type { LandingContent } from "@/lib/cms/types";
import { getAdminSessionOptions, type AdminSession } from "@/lib/cms/session";

export async function GET() {
  return NextResponse.json(getLandingContent());
}

export async function PUT(request: Request) {
  const options = getAdminSessionOptions();
  if (!options) {
    return NextResponse.json({ error: "Server misconfigured." }, { status: 500 });
  }

  const session = await getIronSession<AdminSession>(await cookies(), options);
  if (!session.isAdmin) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  let body: LandingContent;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
  }

  const steps = body?.howItWorks?.steps;
  const stepsOk =
    Array.isArray(steps) &&
    steps.length === 3 &&
    steps.every((s) => s && typeof s.title === "string" && typeof s.body === "string");

  const res = body?.resources;
  const resourcesOk =
    res &&
    typeof res.pageTitle === "string" &&
    typeof res.pageIntro === "string" &&
    Array.isArray(res.items) &&
    res.items.every(
      (it) =>
        it &&
        typeof it.id === "string" &&
        typeof it.title === "string" &&
        typeof it.url === "string" &&
        (it.excerpt === undefined || typeof it.excerpt === "string") &&
        (it.date === undefined || typeof it.date === "string"),
    );

  if (!body?.hero || typeof body.hero.brandTitle !== "string" || !stepsOk || !resourcesOk) {
    return NextResponse.json({ error: "Invalid content structure." }, { status: 400 });
  }

  saveLandingContent(body);
  revalidatePath("/");
  revalidatePath("/resources");

  return NextResponse.json({ ok: true });
}
