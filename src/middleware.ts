import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/admin")) {
    const adminToken = request.cookies.get("adminToken");
    if (!adminToken) {
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }
  } else if (
    pathname.startsWith("/automated-estimate") ||
    pathname.startsWith("/custom-estimate")
  ) {
    const userToken = request.cookies.get("token");
    if (!userToken) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("redirect", pathname); 
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}




// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// export function middleware(request: NextRequest) {
//   const { pathname } = request.nextUrl;

//   if (pathname.startsWith("/admin")) {
//     const adminToken = request.cookies.get("adminToken");
//     if (!adminToken) {
//       return NextResponse.redirect(new URL("/admin/login", request.url));
//     }
//   } else if (pathname.startsWith("/automated-estimate") || pathname.startsWith("/custom-estimate")) {
//     const userToken = request.cookies.get("token");
//     if (!userToken) {
//       return NextResponse.redirect(new URL("/login", request.url));
//     }
//   }

//   return NextResponse.next();
// }
