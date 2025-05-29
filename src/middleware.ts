// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;

  // If the user is logged in and tries to access login or register, redirect to dashboard
  if (
    session &&
    (pathname.startsWith("/login") || pathname.startsWith("/register"))
  ) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // If the user is not logged in and tries to access protected routes, redirect to login
  if (!session && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Allow the request to proceed for all other routes
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard", "/login", "/register"],
};
