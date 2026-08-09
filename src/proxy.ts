import { NextRequest, NextResponse } from "next/server";

// This file protects everything under /admin with HTTP Basic Auth, checked
// against the ADMIN_USER / ADMIN_PASSWORD environment variables.
//
// Note for anyone reading old Next.js tutorials: this file used to be
// called middleware.ts. As of Next.js 16 it MUST be named proxy.ts and
// export a function named `proxy` — a leftover middleware.ts is silently
// ignored (no error, no warning), which would leave /admin completely
// unprotected. Don't rename this file back.

export function proxy(request: NextRequest) {
  const authHeader = request.headers.get("authorization");

  if (authHeader?.startsWith("Basic ")) {
    const base64Credentials = authHeader.slice("Basic ".length);
    const [user, password] = atob(base64Credentials).split(":");

    const expectedUser = process.env.ADMIN_USER;
    const expectedPassword = process.env.ADMIN_PASSWORD;

    if (
      expectedUser &&
      expectedPassword &&
      user === expectedUser &&
      password === expectedPassword
    ) {
      return NextResponse.next();
    }
  }

  return new NextResponse("Authentication required.", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="WSA MSA Admin"',
    },
  });
}

export const config = {
  matcher: "/admin/:path*",
};
