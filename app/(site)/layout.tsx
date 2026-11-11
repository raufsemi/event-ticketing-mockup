import { Suspense } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getCurrentUser } from "@/lib/auth";

export default function SiteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    // Bottom padding clears the fixed mobile tab bar rendered by Navbar.
    <div className="pb-[calc(4rem+env(safe-area-inset-bottom))] lg:pb-0">
      <Suspense fallback={<Navbar />}>
        <NavbarWithUser />
      </Suspense>
      <main>{children}</main>
      <Footer />
    </div>
  );
}

async function NavbarWithUser() {
  const user = await getCurrentUser();
  return <Navbar user={user ? { name: user.name, email: user.email } : null} />;
}
