/*
Next.js middleware is NOT “called” manually.
It runs automatically based on the matcher you define in middleware.ts
*/

import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "./lib/supabase";

export async function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const token = req.cookies.get("sb-access-token")?.value;

  if (
    url.pathname.startsWith("/onboarding") ||
    url.pathname.startsWith("/api/onboarding")
  ) {
    return NextResponse.next();
  }

  const supabase = supabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser(token);

  if (!user) {
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/clients/:path*",
    "/tests/:path*",
    "/certificates/:path*",
  ],
};

