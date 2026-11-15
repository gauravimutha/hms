"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { isDemoEnabled } from "@/lib/demo/demoConfig";

export default function MarketingNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const demoActive = isDemoEnabled();

  const baseLinks = [
    { href: "/features/clinical-emr", label: "Features" },
    { href: "/solutions/multi-specialty-hospitals", label: "Solutions" },
    { href: "/faq", label: "FAQ" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  const links = demoActive
    ? [{ href: "/demo", label: "Live Demo" }, ...baseLinks]
    : baseLinks;

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50 px-3 sm:px-6 pt-3 sm:pt-4 pointer-events-none">
        <nav className="pointer-events-auto max-w-6xl mx-auto px-4 sm:px-7 py-2.5 sm:py-3 rounded-2xl bg-white/80 backdrop-blur-2xl border border-white/60 shadow-[0_8px_32px_0_rgba(15,42,68,0.08)] flex justify-between items-center transition-all duration-300">
          <Link href="/" className="flex items-center gap-2.5 sm:gap-3 no-underline group shrink-0">
            <Image
              src="/logo-icon.png"
              alt="BizLume Logo"
              width={42}
              height={42}
              className="h-8 sm:h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              priority
            />
            <div className="flex flex-col justify-center">
              <span className="text-sm sm:text-lg font-black tracking-tight text-navy leading-none">
                BizLume
              </span>
              <span className="text-[8px] sm:text-[10px] font-semibold text-cyan tracking-wider uppercase leading-tight mt-0.5">
                Hospital System
              </span>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-7">
            {links.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-[13px] font-semibold text-grey hover:text-navy transition-colors no-underline"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2 sm:gap-2.5">
            {demoActive && (
              <Link
                href="/demo"
                className="bg-cyan text-navy px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl text-[11px] sm:text-[13px] font-black hover:opacity-90 transition-all duration-200 no-underline shadow-sm whitespace-nowrap flex items-center gap-1.5"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-navy animate-pulse"></span>
                Live Demo
              </Link>
            )}
            <Link
              href="/login"
              className="bg-navy text-white px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl text-[11px] sm:text-[13px] font-bold hover:bg-cyan hover:text-navy transition-all duration-200 no-underline shadow-sm hover:shadow-cyan/20 whitespace-nowrap"
            >
              Staff Portal →
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              className="lg:hidden p-2 rounded-xl text-navy hover:bg-light-grey transition-colors ml-1"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Drawer Backdrop */}
      {mobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-opacity"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Drawer */}
      <div
        className={`lg:hidden fixed inset-y-0 right-0 z-50 w-72 max-w-[85vw] bg-white text-navy p-6 flex flex-col justify-between shadow-2xl transform transition-transform duration-300 ease-in-out ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-soft-blue">
            <Link href="/" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2.5 no-underline">
              <Image
                src="/logo-icon.png"
                alt="BizLume Logo"
                width={32}
                height={32}
                className="w-8 h-8 object-contain shrink-0"
              />
              <span className="text-lg font-black text-navy">BizLume</span>
            </Link>
            <button
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close menu"
              className="p-1.5 rounded-lg text-grey hover:text-navy hover:bg-light-grey"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <nav className="flex flex-col gap-2">
            {links.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="p-3 rounded-xl font-bold text-sm text-grey hover:bg-soft-blue hover:text-navy transition-colors no-underline"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="space-y-3 pt-6 border-t border-soft-blue">
          <Link
            href="/login"
            onClick={() => setMobileMenuOpen(false)}
            className="w-full block text-center py-2.5 rounded-xl border border-soft-blue font-bold text-sm text-navy hover:bg-light-grey no-underline transition-colors"
          >
            Sign In
          </Link>
          <Link
            href="/login"
            onClick={() => setMobileMenuOpen(false)}
            className="w-full block text-center py-2.5 rounded-xl bg-navy text-white font-bold text-sm hover:bg-cyan hover:text-navy no-underline transition-colors shadow-md"
          >
            Staff Portal →
          </Link>
        </div>
      </div>
    </>
  );
}
