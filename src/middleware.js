import { clerkMiddleware } from "@clerk/nextjs/server";

const middleware =
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
    ? clerkMiddleware({
        publicRoutes: ["/", "/sign-in", "/sign-up", "/not-found", "/_not-found"],
      })
    : (req) => Response.next(); // Safe fallback

export default middleware;

export const config = {
  matcher: [
    '/((?!_next|.*\\..*).*)',
    '/(api|trpc)(.*)',
  ],
};
