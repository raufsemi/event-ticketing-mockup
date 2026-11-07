import { connection } from "next/server";
import { redirect } from "next/navigation";
import { getSessionUserId } from "./session";
import { findUserById, type User } from "./users";

/** Current user, or null when signed out. Reads cookies, so call it inside a Suspense boundary. */
export async function getCurrentUser(): Promise<User | null> {
  // The expiry check reads the clock, so keep this out of prerenders and runtime prefetches.
  await connection();
  const id = await getSessionUserId();
  return id ? findUserById(id) : null;
}

/** Current user, or a redirect to the login page. */
export async function requireUser(from = "/dashboard"): Promise<User> {
  const user = await getCurrentUser();
  if (!user) redirect(`/login?next=${encodeURIComponent(from)}`);
  return user;
}
