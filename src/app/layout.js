export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
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
