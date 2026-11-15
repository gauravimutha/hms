import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function MarketingNavbar() {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 pt-4 pointer-events-none">
      <nav className="pointer-events-auto max-w-6xl mx-auto px-5 sm:px-7 py-3 rounded-2xl bg-white/70 backdrop-blur-2xl border border-white/50 shadow-[0_8px_32px_0_rgba(15,42,68,0.08)] flex justify-between items-center transition-all duration-300">
        <Link href="/" className="flex items-center gap-3 no-underline group">
          <Image
            src="/logo-icon.png"
            alt="BizLume Logo"
            width={42}
            height={42}
            className="h-9 sm:h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            priority
          />
          <div className="flex flex-col justify-center">
            <span className="text-base sm:text-lg font-black tracking-tight text-navy leading-none">
              BizLume
            </span>
            <span className="text-[9px] sm:text-[10px] font-semibold text-cyan tracking-wider uppercase leading-tight mt-0.5">
              Hospital System
            </span>
          </div>
        </Link>

        <div className="hidden lg:flex items-center gap-7">
          <Link
            href="/features/clinical-emr"
            className="text-[13px] font-semibold text-grey hover:text-navy transition-colors no-underline"
          >
            Features
          </Link>
          <Link
            href="/solutions/multi-specialty-hospitals"
            className="text-[13px] font-semibold text-grey hover:text-navy transition-colors no-underline"
          >
            Solutions
          </Link>
          <Link
            href="/faq"
            className="text-[13px] font-semibold text-grey hover:text-navy transition-colors no-underline"
          >
            FAQ
          </Link>
          <Link
            href="/about"
            className="text-[13px] font-semibold text-grey hover:text-navy transition-colors no-underline"
          >
            About
          </Link>
          <Link
            href="/contact"
            className="text-[13px] font-semibold text-grey hover:text-navy transition-colors no-underline"
          >
            Contact
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="text-[13px] font-bold text-grey hover:text-navy transition-colors hidden sm:block no-underline"
          >
            Sign in
          </Link>
          <Link
            href="/login"
            className="bg-navy text-white px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl text-[12px] sm:text-[13px] font-bold hover:bg-cyan hover:text-navy transition-all duration-200 no-underline shadow-sm hover:shadow-cyan/20"
          >
            Staff Portal →
          </Link>
        </div>
      </nav>
    </div>
  );
}
