import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const API_URL = process.env.NEXT_PUBLIC_BASE_URL;

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isProtectedRoute = pathname === "/" || pathname.startsWith("/chat");

  const isGuestRoute = pathname === "/login" || pathname === "/register";

  if (!isProtectedRoute && !isGuestRoute) {
    return NextResponse.next();
  }

  const xsrfToken = request.cookies.get("XSRF-TOKEN");

  console.log(xsrfToken);
  let authenticated = false;
  if (xsrfToken) {
    const response = await fetch(`${API_URL}/api/auth/me`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
        Cookie: request.headers.get("cookie") ?? "",
        "X-XSRF-TOKEN": xsrfToken?.value ?? "",
        "x-tenant": "proxy",
      },
    });

    console.log(response);
    authenticated = response.ok;
  }

  if (isProtectedRoute && !authenticated) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (isGuestRoute && authenticated) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/chat/:path*", "/login", "/register"],
};
