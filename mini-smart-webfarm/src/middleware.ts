import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "@/auth";

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};

export async function middleware(request: NextRequest) {
    // const session = await auth();
    //
    // const isAuthPage = request.nextUrl.pathname.startsWith("/login") || request.nextUrl.pathname.startsWith("/register");
    //
    // if (session && isAuthPage) {
    //     return NextResponse.redirect(new URL("/", request.url));
    // }
    //
    // if (!session && request.nextUrl.pathname.startsWith("/dashboard")) {
    //     return NextResponse.redirect(new URL("/login", request.url));
    // }

    return NextResponse.next();
}
