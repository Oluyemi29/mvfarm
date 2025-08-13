import { getToken } from "next-auth/jwt";
import { NextResponse, NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });
  if (pathname.startsWith("/admin")) {
    if (!token || !token.user || token.user.role !== "Admin") {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  if (pathname.startsWith("/farm")) {
    if (!token || !token.user || !token.user.id) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    if (!token.user.verifyEmail) {
      return NextResponse.redirect(new URL("/verify", request.url));
    }
  }
  if (pathname.startsWith("/profile")) {
    if (!token || !token.user || !token.user.id) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }
}

export const config = {
  matcher: ["/farm/:path*", "/admin/:path*", "/profile/:path*"],
};
