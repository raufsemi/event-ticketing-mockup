"use server";

import { redirect } from "next/navigation";
import { createSession, deleteSession } from "@/lib/session";
import { authenticate, createUser } from "@/lib/users";

export type AuthState = {
  error?: string;
  fields?: Record<string, string>;
  fieldErrors?: Record<string, string>;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Only allow same-site relative redirects after login. */
function safeNext(value: FormDataEntryValue | null) {
  const next = typeof value === "string" ? value : "";
  return next.startsWith("/") && !next.startsWith("//") ? next : "/dashboard";
}

export async function register(_prev: AuthState, formData: FormData): Promise<AuthState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const fields = { name, email };

  const fieldErrors: Record<string, string> = {};
  if (name.length < 2) fieldErrors.name = "Enter your full name.";
  if (!EMAIL_RE.test(email)) fieldErrors.email = "Enter a valid email address.";
  if (password.length < 8) fieldErrors.password = "Use at least 8 characters.";
  if (Object.keys(fieldErrors).length) return { fields, fieldErrors };

  const user = await createUser(name, email, password);
  if (!user) {
    return { fields, fieldErrors: { email: "An account with this email already exists. Try logging in." } };
  }

  await createSession(user.id);
  redirect(safeNext(formData.get("next")));
}

export async function login(_prev: AuthState, formData: FormData): Promise<AuthState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  const user = email && password ? await authenticate(email, password) : null;
  if (!user) return { error: "That email and password don't match.", fields: { email } };

  await createSession(user.id);
  redirect(safeNext(formData.get("next")));
}

export async function logout() {
  await deleteSession();
  redirect("/");
}
