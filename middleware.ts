import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const authToken = request.cookies.get("auth-token")?.value;

  // Protect /dashboard and its subpaths
  const protectedPaths = [/^\/dashboard(\/.*)?$/];
  const { pathname } = request.nextUrl;

  const isProtected = protectedPaths.some((re) => re.test(pathname));
  if (isProtected && !authToken) {
    const url = request.nextUrl.clone();
    url.pathname = "/";
    // Optional: carry a query to trigger login modal
    // url.searchParams.set("login", "1");
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
