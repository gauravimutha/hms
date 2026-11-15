"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, FileText, Pill, FlaskRound, BarChart3, LogOut, Menu, X } from "lucide-react";

export default function PharmacyLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    router.push("/login");
  };

  const navLinks = [
    { href: "/pharmacy-dashboard", label: "Dashboard", icon: <LayoutDashboard className="w-4 h-4 shrink-0" />, active: pathname === "/pharmacy-dashboard" },
    { href: "/prescriptions", label: "Prescriptions", icon: <FileText className="w-4 h-4 shrink-0" />, active: pathname === "/prescriptions" },
    { href: "/inventory", label: "Inventory", icon: <Pill className="w-4 h-4 shrink-0" />, active: pathname === "/inventory" },
    { href: "/dispense", label: "Dispense", icon: <FlaskRound className="w-4 h-4 shrink-0" />, active: pathname === "/dispense" },
    { href: "/prescriptionreports", label: "Reports", icon: <BarChart3 className="w-4 h-4 shrink-0" />, active: pathname === "/prescriptionreports" },
  ];

  return (
    <div className="min-h-screen lg:h-screen lg:overflow-hidden flex flex-col lg:flex-row bg-light-grey">
      {/* Mobile Header */}
      <div className="lg:hidden sticky top-0 z-40 bg-navy text-white px-4 py-3 flex items-center justify-between shadow-md border-b border-white/10">
        <Link href="/pharmacy-dashboard" className="flex items-center gap-2.5 no-underline">
          <Image
            src="/logo-icon.png"
            alt="BizLume Logo"
            width={30}
            height={30}
            className="w-7 h-7 object-contain shrink-0"
          />
          <div className="flex flex-col">
            <span className="text-base font-black tracking-tight text-white leading-none">
              BizLume
            </span>
            <span className="text-cyan text-[9px] font-bold tracking-widest uppercase mt-0.5">
              PHARMACY
            </span>
          </div>
        </Link>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation menu"
          className="p-2 rounded-xl text-white/80 hover:text-white hover:bg-white/10 transition-colors"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Navigation Drawer Backdrop */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-opacity"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile Navigation Drawer */}
      <aside
        className={`lg:hidden fixed inset-y-0 left-0 z-50 w-72 max-w-[85vw] bg-navy text-white p-6 flex flex-col justify-between shadow-2xl transform transition-transform duration-300 ease-in-out ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <Link href="/pharmacy-dashboard" onClick={() => setMobileOpen(false)} className="flex items-center gap-2.5 no-underline">
              <Image
                src="/logo-icon.png"
                alt="BizLume Logo"
                width={32}
                height={32}
                className="w-8 h-8 object-contain shrink-0"
              />
              <div className="flex flex-col">
                <span className="text-base font-black tracking-tight text-white leading-none">
                  BizLume
                </span>
                <span className="text-cyan text-[9px] font-bold tracking-widest uppercase mt-0.5">
                  PHARMACY
                </span>
              </div>
            </Link>
            <button
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
              className="p-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <nav className="flex flex-col gap-2">
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 p-3 rounded-xl transition-all font-bold text-sm no-underline ${
                  item.active ? "bg-cyan text-navy" : "text-white/60 hover:bg-white/5 hover:text-white"
                }`}
              >
                <span className="flex items-center justify-center">{item.icon}</span>
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="space-y-4 pt-6 border-t border-white/10">
          <div className="p-3 rounded-xl bg-white/5 text-xs text-grey">
            <p className="font-bold text-white">Pharmacist Portal</p>
            <p className="mt-1">Role-based access active</p>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-3 p-3 rounded-xl hover:bg-status-red/20 text-status-red transition-all font-bold text-sm border border-status-red/10"
          >
            <LogOut className="w-4 h-4 shrink-0" /> Sign Out
          </button>
        </div>
      </aside>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-64 bg-navy text-white p-6 flex-col justify-between shadow-xl shrink-0 h-screen sticky top-0">
        <div className="space-y-8">
          <Link href="/pharmacy-dashboard" className="flex items-center gap-3 no-underline group">
            <Image
              src="/logo-icon.png"
              alt="BizLume Logo"
              width={36}
              height={36}
              className="w-9 h-9 object-contain shrink-0 group-hover:scale-105 transition-transform"
            />
            <div className="flex flex-col">
              <span className="text-lg font-black tracking-tight text-white leading-none">
                BizLume
              </span>
              <span className="text-cyan text-[10px] font-bold tracking-widest uppercase mt-0.5">
                PHARMACY
              </span>
            </div>
          </Link>

          <nav className="flex flex-col gap-2">
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 p-3 rounded-xl transition-all font-bold text-sm no-underline ${
                  item.active ? "bg-cyan text-navy" : "text-white/60 hover:bg-white/5 hover:text-white"
                }`}
              >
                <span className="flex items-center justify-center">{item.icon}</span>
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="space-y-4">
          <div className="p-3 rounded-xl bg-white/5 text-xs text-grey">
            <p className="font-bold text-white">Pharmacist Portal</p>
            <p className="mt-1">Role-based access active</p>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-status-red/20 text-status-red transition-all font-bold text-sm border border-status-red/10"
          >
            <LogOut className="w-4 h-4 shrink-0" /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 overflow-y-auto overflow-x-hidden p-4 sm:p-6 lg:p-8 xl:p-10">
        <div className="max-w-6xl mx-auto w-full min-w-0">
          {children}
        </div>
      </main>
    </div>
  );
}