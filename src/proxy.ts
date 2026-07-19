// File: proxy.ts (or src/proxy.ts)
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
// 1. Move your auth import to the top level
import { auth } from "@/lib/auth/server"; 





function isServerActionPost(request:NextRequest){
  //⚠️⚠️ this function is return to handle the action  
  // attribute of the form element
  //  <Form action={} >  so through which action is a server side 
  if(request.method !== 'POST'){
     return false;
  }
  const h = request.headers;

  //h will look like this
//   Headers {
//   "host" => "localhost:3000",
//   "user-agent" => "Mozilla/5.0...",
//   "accept" => "text/html",
// Next-Action: 40b9db8a53d8c1a2f7b9e4c6a1d3f8b7
//   "content-type" => "application/json"
// }
 // HTTP headers are case-insensitive ✅   h.get("next-action") === h.get("Next-Action")
return Boolean(h.get("next-action"));
}


// 2. Change this to a NAMED export, NOT a default export
export async function proxy(req: NextRequest) {


  if(isServerActionPost(req)){
    return NextResponse.next();
  }

  // 3. Explicitly execute and return your auth handler
  const authHandler = auth.middleware({
    loginUrl: "/auth/sign-in",
  });

  return authHandler(req);
}

// 4. Always provide a matcher configuration so your proxy doesn't choke on static assets
// export const config = {
//   matcher: [
//     /*
//      * Match all request paths except for the ones starting with:
//      * - api (API routes)
//      * - _next/static (static files)
//      * - _next/image (image optimization files)
//      * - favicon.ico (favicon file)
//      */
//     '/((?!api|_next/static|_next/image|favicon.ico).*)',
//   ],
// }; 


export const config = {
  matcher:[
    "/dashboard/:path*",
    "/events/:path*",
  ]
}