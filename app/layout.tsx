import type { Metadata, Viewport } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import { Suspense } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MotionProvider from "@/components/MotionProvider";
import { site } from "@/lib/site";
import { getCurrentUser } from "@/lib/auth";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${site.name} · Event Management Malaysia`,
    template: `%s · ${site.name}`,
  },
  description:
    "Running events, food bazaars, charity programmes and concerts across Malaysia, planned and run end to end.",
};

export const viewport: Viewport = {
  themeColor: "#0F1A12",
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${jakarta.variable}`}
    >
      <body className="min-h-dvh pb-[calc(4rem+env(safe-area-inset-bottom))] lg:pb-0">
        <MotionProvider>
          {/* The session is read per request, so the signed-in state streams in. */}
          <Suspense fallback={<Navbar />}>
            <NavbarWithUser />
          </Suspense>
          <main>{children}</main>
          <Footer />
          {/* <WhatsAppButton /> */}
        </MotionProvider>
      </body>
    </html>
  );
}

async function NavbarWithUser() {
  const user = await getCurrentUser();
  return <Navbar user={user ? { name: user.name, email: user.email } : null} />;
}
