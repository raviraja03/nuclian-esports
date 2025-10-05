import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("sessionId")?.value;

  const { pathname } = req.nextUrl;


  if (token && pathname === "/") {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // Public routes
  const publicRoutes = ["/login", "/signup", "/api"];

  // If user is on a public route and logged in, redirect to dashboard
  if (token && publicRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // If user is on a protected route and not logged in, redirect to login
  const protectedRoutes = ["/dashboard", "/admin", "/profile"];
  if (!token && protectedRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

// Apply middleware to all routes
export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*", "/profile/:path*", "/login","/"],
};
