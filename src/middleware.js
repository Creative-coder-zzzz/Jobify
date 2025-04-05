// middleware.ts
import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: ["/", "/sign-in", "/sign-up", "/not-found"],
});

export const config = {
  matcher: ["/((?!_next|favicon.ico).*)"],
};
