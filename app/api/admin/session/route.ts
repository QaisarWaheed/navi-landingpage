import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { getAdminSessionOptions, type AdminSession } from "@/lib/cms/session";

export async function GET() {
  const options = getAdminSessionOptions();
  if (!options) {
    return NextResponse.json({ authenticated: false, configured: false });
  }

  const session = await getIronSession<AdminSession>(await cookies(), options);
  return NextResponse.json({ authenticated: !!session.isAdmin, configured: true });
}
