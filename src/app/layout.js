import { ClerkProvider } from "@clerk/nextjs";
import { Suspense } from "react";
import Loading from "./loading";
import CommonLayout from "@/components/common-layout";
import { Toaster } from "sonner";
import "./globals.css";

const clerkKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="">
        {clerkKey ? (
          <ClerkProvider publishableKey={clerkKey}>
            <Suspense fallback={<Loading />}>
              <CommonLayout>{children}</CommonLayout>
            </Suspense>
            <Toaster />
          </ClerkProvider>
        ) : (
          <Suspense fallback={<Loading />}>
            <CommonLayout>{children}</CommonLayout>
            <Toaster />
          </Suspense>
        )}
      </body>
    </html>
  );
}
