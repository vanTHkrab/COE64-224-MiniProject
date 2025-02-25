import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "@/auth";

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};

export async function middleware(request: NextRequest) {

}
