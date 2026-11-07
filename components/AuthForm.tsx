"use client";

import Link from "next/link";
import { Suspense, useActionState, useState } from "react";
import { useSearchParams } from "next/navigation";
import { AlertCircle, ArrowRight, Eye, EyeOff, Loader2 } from "lucide-react";
import { login, register, type AuthState } from "@/app/actions/auth";

const input =
  "w-full rounded-xl border border-line bg-white px-4 py-3 text-base text-ink placeholder:text-muted/60 transition outline-none focus:border-brand-deep focus:ring-4 focus:ring-brand/15 aria-[invalid=true]:border-red-500";

/** Carries ?next= through the form. In its own boundary so the page prerenders. */
function NextField() {
  const next = useSearchParams().get("next");
  return next ? <input type="hidden" name="next" value={next} /> : null;
}

function Field({
  id,
  label,
  error,
  children,
  hint,
}: {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-ink">
        {label}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="mt-1.5 text-sm text-red-600">
          {error}
        </p>
      ) : (
        hint && <p className="mt-1.5 text-xs text-muted">{hint}</p>
      )}
    </div>
  );
}

function PasswordInput({ id, autoComplete, invalid }: { id: string; autoComplete: string; invalid: boolean }) {
  const [show, setShow] = useState(false);
  return (
    <div className="relative">
      <input
        id={id}
        name="password"
        type={show ? "text" : "password"}
        required
        minLength={autoComplete === "new-password" ? 8 : undefined}
        autoComplete={autoComplete}
        aria-invalid={invalid}
        aria-describedby={invalid ? `${id}-error` : undefined}
        className={`${input} pr-12`}
      />
      <button
        type="button"
        onClick={() => setShow((v) => !v)}
        aria-label={show ? "Hide password" : "Show password"}
        className="absolute top-1/2 right-1.5 grid size-10 -translate-y-1/2 place-items-center rounded-lg text-muted transition hover:bg-tint hover:text-ink"
      >
        {show ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
      </button>
    </div>
  );
}

export default function AuthForm({ mode }: { mode: "login" | "register" }) {
  const isRegister = mode === "register";
  const [state, action, pending] = useActionState<AuthState, FormData>(isRegister ? register : login, {});
  const fe = state.fieldErrors ?? {};

  return (
    <form action={action} className="space-y-5" noValidate>
      <Suspense fallback={null}>
        <NextField />
      </Suspense>

      {state.error && (
        <p role="alert" className="flex items-start gap-2.5 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700 ring-1 ring-red-200">
          <AlertCircle className="mt-0.5 size-4 shrink-0" />
          {state.error}
        </p>
      )}

      {isRegister && (
        <Field id="name" label="Full name" error={fe.name}>
          <input
            id="name"
            name="name"
            required
            autoComplete="name"
            defaultValue={state.fields?.name}
            aria-invalid={!!fe.name}
            aria-describedby={fe.name ? "name-error" : undefined}
            placeholder="Aisyah Rahman"
            className={input}
          />
        </Field>
      )}

      <Field id="email" label="Email" error={fe.email}>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          defaultValue={state.fields?.email}
          aria-invalid={!!fe.email}
          aria-describedby={fe.email ? "email-error" : undefined}
          placeholder="you@company.com"
          className={input}
        />
      </Field>

      <Field
        id="password"
        label="Password"
        error={fe.password}
        hint={isRegister ? "At least 8 characters." : undefined}
      >
        <PasswordInput id="password" autoComplete={isRegister ? "new-password" : "current-password"} invalid={!!fe.password} />
      </Field>

      <button
        type="submit"
        disabled={pending}
        className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand px-7 py-3.5 font-semibold text-ink transition hover:-translate-y-0.5 hover:shadow-[0_12px_30px_-8px_rgba(34,197,94,0.6)] disabled:pointer-events-none disabled:opacity-70"
      >
        {pending ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          <ArrowRight className="size-4 transition group-hover:translate-x-0.5" />
        )}
        {isRegister ? "Create account" : "Log in"}
      </button>

      <p className="text-center text-sm text-muted">
        {isRegister ? "Already have an account? " : "New here? "}
        <Link
          href={isRegister ? "/login" : "/register"}
          className="font-semibold text-brand-ink underline-offset-4 hover:underline"
        >
          {isRegister ? "Log in" : "Create a free account"}
        </Link>
      </p>
    </form>
  );
}
