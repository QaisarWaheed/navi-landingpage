import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { getAdminSessionOptions, type AdminSession } from "@/lib/cms/session";

export async function POST() {
  const options = getAdminSessionOptions();
  if (!options) {
    return NextResponse.json({ ok: true });
  }

  const session = await getIronSession<AdminSession>(await cookies(), options);
  session.destroy();

  return NextResponse.json({ ok: true });
}
