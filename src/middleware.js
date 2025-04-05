// middleware.js
import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const hasClerkKey = !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

const middleware = hasClerkKey
  ? clerkMiddleware({
      publicRoutes: ["/", "/sign-in", "/sign-up", "/not-found", "/_not-found", "/404"],
    })
  : () => {
      // Skip Clerk if env var not set (like during preview builds)
      return NextResponse.next();
    };

export default middleware;

export const config = {
  matcher: [
    // Include all dynamic and API routes
    '/((?!_next|.*\\..*).*)',
    '/(api|trpc)(.*)',
  ],
};
