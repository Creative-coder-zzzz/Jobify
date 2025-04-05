import Link from "next/link";

export default function NotFound() {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
        <h1 className="text-5xl font-bold text-red-500 mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
        <p className="text-gray-600 mb-6">
          Sorry, we couldn’t find the page you’re looking for.
        </p>
        <Link href="/" className="text-blue-600 hover:underline">
          Go back home →
        </Link>
      </div>
    );
  }
  