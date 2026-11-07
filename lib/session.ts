import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

// Signed (not encrypted) session cookie: `<base64url payload>.<hmac>`.
// The payload holds only the user id and expiry, so nothing secret leaks.
export const SESSION_COOKIE = "eb_session";
const MAX_AGE = 60 * 60 * 24 * 7; // 7 days

function secret() {
  const s = process.env.SESSION_SECRET;
  if (s) return s;
  if (process.env.NODE_ENV === "production") {
    throw new Error("SESSION_SECRET must be set in production.");
  }
  return "dev-only-secret-change-me";
}

function sign(value: string) {
  return createHmac("sha256", secret()).update(value).digest("base64url");
}

export function encodeSession(userId: string) {
  const payload = Buffer.from(
    JSON.stringify({ uid: userId, exp: Date.now() + MAX_AGE * 1000 }),
  ).toString("base64url");
  return `${payload}.${sign(payload)}`;
}

export function decodeSession(token: string | undefined): string | null {
  if (!token) return null;
  const [payload, mac] = token.split(".");
  if (!payload || !mac) return null;
  const expected = Buffer.from(sign(payload));
  const given = Buffer.from(mac);
  if (expected.length !== given.length || !timingSafeEqual(expected, given)) return null;
  try {
    const { uid, exp } = JSON.parse(Buffer.from(payload, "base64url").toString());
    if (typeof uid !== "string" || typeof exp !== "number" || exp < Date.now()) return null;
    return uid;
  } catch {
    return null;
  }
}

export async function createSession(userId: string) {
  (await cookies()).set(SESSION_COOKIE, encodeSession(userId), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: MAX_AGE,
  });
}

export async function deleteSession() {
  (await cookies()).delete(SESSION_COOKIE);
}

export async function getSessionUserId() {
  return decodeSession((await cookies()).get(SESSION_COOKIE)?.value);
}
