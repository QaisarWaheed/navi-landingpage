import bcrypt from "bcryptjs";

/** Resolves bcrypt hash from env. Use `base64:<b64>` in .env so `$` in bcrypt strings is not mangled by dotenv-expand. */
function resolvePasswordHash(): string {
  const raw = (process.env.ADMIN_PASSWORD_HASH || "").trim();
  if (raw.startsWith("base64:")) {
    try {
      return Buffer.from(raw.slice("base64:".length), "base64").toString("utf8");
    } catch {
      return "";
    }
  }
  return raw;
}

export function verifyAdminCredentials(email: string, password: string): boolean {
  const expected = (process.env.ADMIN_EMAIL || "").trim().toLowerCase();
  const hash = resolvePasswordHash();
  if (!expected || !hash) return false;
  if (email.trim().toLowerCase() !== expected) return false;
  return bcrypt.compareSync(password, hash);
}
