import {NextRequest, NextResponse} from "next/server";

import NextAuth from "next-auth";

import authConfig from "./src/auth.config";

const {auth} = NextAuth(authConfig);

export default auth(async (req: NextRequest) => {
  const {pathname} = req.nextUrl;
  const session = await auth();

  // Protected routes that require authentication
  const protectedRoutes = ["/studio", "/api/upload-auth", "/api/media"];

  // Check if current path matches any protected route
  const isProtectedRoute = protectedRoutes.some(route =>
    pathname.startsWith(route)
  );

  if (isProtectedRoute && !session) {
    // Redirect to home page with a return URL
    const url = new URL("/", req.url);
    url.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(url);
  }

  // Allow access to authenticated users or non-protected routes
  return NextResponse.next();
});

export const config = {
  matcher: ["/studio/:path*", "/api/upload-auth/:path*", "/api/media/:path*"],
};
