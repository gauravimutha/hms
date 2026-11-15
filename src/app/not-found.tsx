import React from "react";
import Link from "next/link";
import MarketingNavbar from "@/components/MarketingNavbar";
import MarketingFooter from "@/components/MarketingFooter";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-light-grey text-dark font-sans flex flex-col justify-between">
      <MarketingNavbar />

      <main className="pt-40 pb-28 px-6 max-w-xl mx-auto text-center w-full">
        <span className="text-6xl font-black text-cyan block mb-4">404</span>
        <h1 className="text-3xl font-black text-navy mb-4 tracking-tight">
          Page Not Found
        </h1>
        <p className="text-grey font-light text-base mb-8 leading-relaxed">
          The resource or clinical document you requested is not available. Please verify the URL or return to the main platform portal.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/"
            className="bg-navy text-white font-bold px-6 py-3 rounded-xl text-sm hover:bg-cyan hover:text-navy transition-all duration-200 no-underline shadow-sm"
          >
            Return Home →
          </Link>
          <Link
            href="/login"
            className="bg-white border border-soft-blue text-navy font-bold px-6 py-3 rounded-xl text-sm hover:border-cyan transition-all duration-200 no-underline"
          >
            Staff Portal
          </Link>
        </div>
      </main>

      <MarketingFooter />
    </div>
  );
}
