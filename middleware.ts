import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Attempt to retrieve the session token
  const session = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
    secureCookie: process.env.NODE_ENV === "production",
  });

  // For unauthenticated users
  if (!session) {
    // Allow access only to "/" and "/authenticate"
    if (pathname === "/" || pathname === "/authenticate") {
      return NextResponse.next();
    }
    // Redirect to "/" for any other route
    if (pathname.startsWith("/admin")) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  // For authenticated users
  if (session) {
    // Redirect to "/admin" if trying to access "/" or "/authenticate"
    if (pathname === "/" || pathname === "/authenticate") {
      return NextResponse.redirect(new URL("/admin", req.url));
    }
    // Allow access to "/admin" and its subroutes
    if (pathname.startsWith("/admin")) {
      return NextResponse.next();
    }
  }

  // For any other case, redirect to "/"
  return NextResponse.redirect(new URL("/", req.url));
}

export const config = {
  matcher: ["/", "/authenticate", "/admin", "/admin/:path*"],
};
