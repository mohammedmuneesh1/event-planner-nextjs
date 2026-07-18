// File: proxy.ts (or src/proxy.ts)
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
// 1. Move your auth import to the top level
import { auth } from "@/lib/auth/server"; 


// 2. Change this to a NAMED export, NOT a default export
export async function proxy(req: NextRequest) {

  // 3. Explicitly execute and return your auth handler
  const authHandler = auth.middleware({
    loginUrl: "/auth/sign-in",
  });

  return authHandler(req);
}

// 4. Always provide a matcher configuration so your proxy doesn't choke on static assets
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}; 