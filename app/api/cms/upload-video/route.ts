import { existsSync, mkdirSync, unlinkSync, writeFileSync } from "fs";
import path from "path";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { MAX_GETTING_STARTED_VIDEO_BYTES } from "@/lib/cms/hostedGettingStartedVideo";
import { getAdminSessionOptions, type AdminSession } from "@/lib/cms/session";

export const maxDuration = 120;

function extFromFilename(name: string): "mp4" | "webm" | null {
  const lower = name.toLowerCase();
  if (lower.endsWith(".mp4")) return "mp4";
  if (lower.endsWith(".webm")) return "webm";
  return null;
}

function hostedVideoDiskPath(ext: "mp4" | "webm"): string {
  return path.join(process.cwd(), "public", "videos", `getting-started.${ext}`);
}

async function requireAdminSession() {
  const options = getAdminSessionOptions();
  if (!options) {
    return { error: NextResponse.json({ error: "Server misconfigured." }, { status: 500 }) };
  }
  const session = await getIronSession<AdminSession>(await cookies(), options);
  if (!session.isAdmin) {
    return { error: NextResponse.json({ error: "Unauthorized." }, { status: 401 }) };
  }
  return { session };
}

export async function POST(request: Request) {
  const auth = await requireAdminSession();
  if ("error" in auth) return auth.error;

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json({ error: "Invalid form data (file too large or malformed)." }, { status: 400 });
  }

  const file = form.get("file");
  if (!file || typeof (file as Blob).arrayBuffer !== "function") {
    return NextResponse.json({ error: "Missing file field." }, { status: 400 });
  }

  const blob = file as File;
  if (blob.size <= 0 || blob.size > MAX_GETTING_STARTED_VIDEO_BYTES) {
    return NextResponse.json(
      { error: `File must be between 1 byte and ${Math.round(MAX_GETTING_STARTED_VIDEO_BYTES / (1024 * 1024))} MB.` },
      { status: 400 },
    );
  }

  const ext = extFromFilename(blob.name || "");
  if (!ext) {
    return NextResponse.json({ error: "Use an .mp4 or .webm file." }, { status: 400 });
  }

  const mime = (blob.type || "").toLowerCase();
  if (mime && !mime.startsWith("video/") && mime !== "application/octet-stream") {
    return NextResponse.json({ error: "Unsupported file type. Use MP4 or WebM." }, { status: 400 });
  }

  const outPath = hostedVideoDiskPath(ext);
  mkdirSync(path.dirname(outPath), { recursive: true });

  const other: "mp4" | "webm" = ext === "mp4" ? "webm" : "mp4";
  const otherPath = hostedVideoDiskPath(other);
  if (existsSync(otherPath)) {
    try {
      unlinkSync(otherPath);
    } catch {
      /* ignore */
    }
  }

  const buf = Buffer.from(await blob.arrayBuffer());
  writeFileSync(outPath, buf);

  const publicPath = `/videos/getting-started.${ext}`;
  return NextResponse.json({ ok: true, path: publicPath });
}

export async function DELETE() {
  const auth = await requireAdminSession();
  if ("error" in auth) return auth.error;

  for (const ext of ["mp4", "webm"] as const) {
    const p = hostedVideoDiskPath(ext);
    if (existsSync(p)) {
      try {
        unlinkSync(p);
      } catch {
        /* ignore */
      }
    }
  }

  return NextResponse.json({ ok: true });
}
