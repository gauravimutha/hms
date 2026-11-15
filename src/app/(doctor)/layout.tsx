"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";

// ── SVG Icon Components ──
const HospitalIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 21h18" /><path d="M5 21V7l8-4v18" /><path d="M19 21V11l-6-4" />
        <path d="M9 9h1" /><path d="M9 13h1" /><path d="M9 17h1" />
    </svg>
);

const LogOutIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
        <polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" />
    </svg>
);

const UserIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
    </svg>
);

export default function DoctorLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleLogout = () => {
        router.push("/login");
    };

    const navLinks = [
        {
            href: "/doctor-dashboard",
            label: "Consultation Queue",
            icon: <HospitalIcon />,
            active: pathname === "/doctor-dashboard" || pathname.startsWith("/emr"),
        },
        {
            href: "/doctor-profile",
            label: "Profile Setup",
            icon: <UserIcon />,
            active: pathname === "/doctor-profile",
        },
    ];

    return (
        <div className="min-h-screen lg:h-screen lg:overflow-hidden flex flex-col lg:flex-row bg-light-grey">
            {/* Mobile Header */}
            <div className="lg:hidden sticky top-0 z-40 bg-navy text-white px-4 py-3 flex items-center justify-between shadow-md border-b border-white/10">
                <Link href="/doctor-dashboard" className="flex items-center gap-2.5 no-underline">
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
                            DOCTOR PORTAL
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
                        <Link href="/doctor-dashboard" onClick={() => setMobileOpen(false)} className="flex items-center gap-2.5 no-underline">
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
                                    DOCTOR PORTAL
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
                                <span className="text-base">{item.icon}</span> {item.label}
                            </Link>
                        ))}
                    </nav>
                </div>

                <div className="space-y-4 pt-6 border-t border-white/10">
                    <div className="p-3 rounded-xl bg-white/5 text-xs text-grey">
                        <p className="font-bold text-white">Physician Portal</p>
                        <p className="mt-1">Role-based access active</p>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center justify-center gap-3 p-3 rounded-xl hover:bg-status-red/20 text-status-red transition-all font-bold text-sm border border-status-red/10"
                    >
                        <LogOutIcon /> Sign Out
                    </button>
                </div>
            </aside>

            {/* Desktop Sidebar */}
            <aside className="hidden lg:flex w-64 bg-navy text-white p-6 flex-col justify-between shadow-xl shrink-0 h-screen sticky top-0">
                <div className="space-y-8">
                    <Link href="/doctor-dashboard" className="flex items-center gap-3 no-underline group">
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
                                DOCTOR PORTAL
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
                                <span className="text-base">{item.icon}</span> {item.label}
                            </Link>
                        ))}
                    </nav>
                </div>

                <div className="space-y-4">
                    <div className="p-3 rounded-xl bg-white/5 text-xs text-grey">
                        <p className="font-bold text-white">Physician Portal</p>
                        <p className="mt-1">Role-based access active</p>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-status-red/20 text-status-red transition-all font-bold text-sm border border-status-red/10"
                    >
                        <LogOutIcon /> Sign Out
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