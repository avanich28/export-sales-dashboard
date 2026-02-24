import { auth } from "@/app/_lib/auth";
import { NextRequest, NextResponse } from "next/server";
import { allInformationPages } from "./app/_features/information/constants";

// export const middleware = auth;

export async function middleware(request: NextRequest) {
  const session = await auth();

  if (!session?.user) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (session.user && request.nextUrl.pathname === "/main/information") {
    const defaultInformationPath = allInformationPages[0];
    return NextResponse.redirect(
      new URL(`/main/information/0-${defaultInformationPath}`, request.url),
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/main/", "/main/:path*"],
};
