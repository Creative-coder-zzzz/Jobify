// middleware.js
import { clerkMiddleware } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const middleware = clerkMiddleware((auth, req) => {
  try {
    console.log('✅ Clerk middleware active:', req.url);
    return NextResponse.next();
  } catch (err) {
    console.error('❌ Clerk middleware failed:', err);
    return NextResponse.next();
  }
});

export default middleware;

export const config = {
  matcher: ['/((?!_next).*)'],
};
