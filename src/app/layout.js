import { ClerkProvider } from "@clerk/nextjs";
import { Suspense } from "react";
import Loading from "./loading";
import CommonLayout from "@/components/common-layout";
import { Toaster } from "sonner";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {clerkKey ? (
          <ClerkProvider publishableKey={clerkKey}>
            <Suspense fallback={<Loading />}>
              <CommonLayout>
                {children}
              </CommonLayout>
            </Suspense>
            <Toaster />
          </ClerkProvider>
        ) : (
          // Fallback layout when Clerk is not used
          <Suspense fallback={<Loading />}>
            <CommonLayout>
              {children}
            </CommonLayout>
            <Toaster />
          </Suspense>
        )}
      </body>
    </html>
  );
}
