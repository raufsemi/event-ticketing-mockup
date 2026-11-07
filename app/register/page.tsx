import type { Metadata } from "next";
import AuthForm from "@/components/AuthForm";
import AuthShell from "@/components/AuthShell";

export const metadata: Metadata = { title: "Create an account" };

export default function RegisterPage() {
  return (
    <AuthShell
      eyebrow="Free to join"
      title="Create your account"
      subtitle="Save your tickets, check out faster and plan events with our team."
    >
      <AuthForm mode="register" />
    </AuthShell>
  );
}
