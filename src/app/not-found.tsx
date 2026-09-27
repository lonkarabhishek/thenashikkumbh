import Link from "next/link";
import "./globals.css";

// Shown for URLs outside /mr, /hi and /en that the middleware did not
// redirect. It renders its own <html> because the root layout is a pass-through.
export default function NotFound() {
  return (
    <html lang="en">
      <body className="bg-cream-50 px-5 py-24 text-center text-temple-900">
        <h1 className="font-heading text-3xl">Page not found</h1>
        <p className="mt-4">
          <Link href="/mr" className="underline">
            नाशिक कुंभमेळा २०२७
          </Link>
          {" · "}
          <Link href="/hi" className="underline">
            नाशिक कुंभ मेला 2027
          </Link>
          {" · "}
          <Link href="/en" className="underline">
            Nashik Kumbh Mela 2027
          </Link>
        </p>
      </body>
    </html>
  );
}
