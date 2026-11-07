import { NextResponse, type NextRequest } from "next/server";

// Optimistic check only: bounce visitors without a session cookie away from
// account pages before rendering. The pages still verify the session themselves.
export function proxy(request: NextRequest) {
  if (!request.cookies.has("eb_session")) {
    const url = new URL("/login", request.url);
    url.searchParams.set("next", request.nextUrl.pathname);
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
