// middleware.js
import { clerkMiddleware } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export default clerkMiddleware({
  publicRoutes: ['/', '/sign-in', '/sign-up', '/not-found', '/404'],
});

export const config = {
  matcher: [
    '/((?!_next|.*\\..*).*)', // Everything except static files
    '/(api|trpc)(.*)',
  ],
};
