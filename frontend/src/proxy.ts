import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isProtectedRoute = pathname === "/" || pathname.startsWith("/chat");

  const isGuestRoute = pathname === "/login" || pathname === "/register";

  if (!isProtectedRoute && !isGuestRoute) {
    return NextResponse.next();
  }

  const session = request.cookies.get("laravel-session");
  if (isProtectedRoute && !session) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (isGuestRoute && session) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/chat/:path*", "/login", "/register"],
};
