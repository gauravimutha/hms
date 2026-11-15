"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FlaskConical, Boxes, LogOut } from "lucide-react";

export default function LabLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();

    const handleLogout = () => {
        router.push("/login");
    };

    return (
        <div className="flex h-screen bg-light-grey">
            {/* Sidebar */}
            <aside className="w-64 bg-navy text-white p-6 flex flex-col justify-between shadow-xl shrink-0">
                <div className="space-y-8">
                    <Link href="/lab-dashboard" className="flex items-center gap-3 no-underline group">
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
                                LAB PANEL
                            </span>
                        </div>
                    </Link>

                    <nav className="flex flex-col gap-2">
                        <LabNavLink
                            href="/lab-dashboard"
                            label="Orders Dashboard"
                            icon={<FlaskConical className="w-4 h-4 shrink-0" />}
                            active={pathname === "/lab-dashboard" || pathname.startsWith("/lab-test")}
                        />
                        <LabNavLink
                            href="/lab-inventory"
                            label="Reagents Inventory"
                            icon={<Boxes className="w-4 h-4 shrink-0" />}
                            active={pathname === "/lab-inventory"}
                        />
                    </nav>
                </div>

                <div className="space-y-4">
                    <div className="p-3 rounded-xl bg-white/5 text-xs text-grey">
                        <p className="font-bold text-white">Lab Technician Portal</p>
                        <p className="mt-1">Order tracking synchronized</p>
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
            <main className="flex-1 p-10 overflow-y-auto">
                <div className="max-w-6xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}

function LabNavLink({ href, label, icon, active }: { href: string; label: string; icon: React.ReactNode; active: boolean }) {
    return (
        <Link
            href={href}
            className={`flex items-center gap-3 p-3 rounded-xl transition-all font-bold text-sm no-underline ${active ? "bg-cyan text-navy" : "text-white/60 hover:bg-white/5 hover:text-white"
                }`}
        >
            <span className="flex items-center justify-center">{icon}</span> {label}
        </Link>
    );
}