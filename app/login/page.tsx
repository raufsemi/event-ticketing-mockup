import type { Metadata } from "next";
import AuthForm from "@/components/AuthForm";
import AuthShell from "@/components/AuthShell";

export const metadata: Metadata = { title: "Log in" };

export default function LoginPage() {
  return (
    <AuthShell eyebrow="Welcome back" title="Log in" subtitle="Pick up where you left off: tickets, bookings and enquiries.">
      <AuthForm mode="login" />
    </AuthShell>
  );
}
