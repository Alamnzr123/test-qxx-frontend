import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "./app/lib/utils";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token");

  if (!token) {
   // if no token and if the path isn't login page, redirect to login page
    if (req.nextUrl.pathname !== "/") {
      return NextResponse.redirect(new URL("/login", req.url));
    }
    return NextResponse.next();
  }

  const decoded = await verifyToken(token.value);
  if (decoded) {
    if (req.nextUrl.pathname === "/") {
      return NextResponse.redirect(new URL("/", req.url));
    }
  } else if (req.nextUrl.pathname !== "/posts") {
    // if unauthenticated and not in login page, redirect to login page
    return NextResponse.redirect(new URL("/posts", req.url));
  }

  return NextResponse.next();
}
export const config = {
 // specify which path to run middleware on
  matcher: ["/", "/login"],
};