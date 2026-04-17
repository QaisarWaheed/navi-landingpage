import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getLandingContent, mergeContent, saveLandingContent } from "@/lib/cms/store";
import type { LandingContent } from "@/lib/cms/types";
import { getAdminSessionOptions, type AdminSession } from "@/lib/cms/session";

export async function GET() {
  return NextResponse.json(getLandingContent());
}

function isValidMerged(content: LandingContent): boolean {
  const steps = content.howItWorks.steps;
  const stepsOk =
    Array.isArray(steps) &&
    steps.length === 3 &&
    steps.every((s) => s && typeof s.title === "string" && typeof s.body === "string");

  const res = content.resources;
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

  const heroOk =
    content.hero &&
    typeof content.hero.brandTitle === "string" &&
    typeof content.hero.headline === "string" &&
    typeof content.hero.subheadline === "string";

  return !!(heroOk && stepsOk && resourcesOk);
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

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
  }

  const merged = mergeContent(body as Partial<LandingContent>);
  if (!isValidMerged(merged)) {
    return NextResponse.json({ error: "Invalid content structure." }, { status: 400 });
  }

  saveLandingContent(merged);
  revalidatePath("/");
  revalidatePath("/resources");

  return NextResponse.json({ ok: true });
}
