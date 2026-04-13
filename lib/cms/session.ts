import type { SessionOptions } from "iron-session";

export type AdminSession = {
  isAdmin?: boolean;
};

export function getAdminSessionOptions(): SessionOptions | null {
  const password = process.env.SESSION_SECRET;
  if (!password || password.length < 32) {
    return null;
  }
  return {
    password,
    cookieName: "navi_cms_admin",
    cookieOptions: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 8,
      path: "/",
    },
  };
}
