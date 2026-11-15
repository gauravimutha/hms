"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import MarketingNavbar from "@/components/MarketingNavbar";
import MarketingFooter from "@/components/MarketingFooter";
import { DEMO_ACCOUNTS } from "@/lib/demo/demoAccounts";
import { WORKFLOW_PHASES } from "@/lib/demo/demoWorkflow";
import { useDemo } from "@/context/DemoContext";
import { isDemoEnabled } from "@/lib/demo/demoConfig";
import { 
  Play, 
  ArrowRight, 
  CheckCircle2, 
  Users, 
  Building2, 
  ShieldCheck, 
  Sparkles, 
  Stethoscope, 
  HeartPulse, 
  FlaskRound, 
  Pill, 
  UserCheck, 
  RotateCcw,
  Zap,
  Lock
} from "lucide-react";

const ROLE_ICONS: Record<string, React.ReactNode> = {
  RECEPTIONIST: <UserCheck className="w-6 h-6 text-cyan" />,
  NURSE: <HeartPulse className="w-6 h-6 text-status-red" />,
  DOCTOR: <Stethoscope className="w-6 h-6 text-cyan" />,
  LAB_TECHNICIAN: <FlaskRound className="w-6 h-6 text-amber-500" />,
  PHARMACIST: <Pill className="w-6 h-6 text-status-green" />,
  ADMIN: <ShieldCheck className="w-6 h-6 text-purple-400" />,
};

export default function DemoPage() {
  const { switchRole, startTour, resetDemo, isSwitchingRole } = useDemo();
  const [resetting, setResetting] = useState(false);
  const [resetSuccess, setResetSuccess] = useState<string | null>(null);

  if (!isDemoEnabled()) {
    return (
      <div className="min-h-screen bg-light-grey text-dark font-sans flex flex-col justify-between">
        <MarketingNavbar />
        <main className="pt-36 pb-28 px-4 max-w-xl mx-auto w-full text-center">
          <div className="bg-white border border-soft-blue rounded-3xl p-8 sm:p-10 shadow-sm">
            <span className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center font-black mx-auto mb-4">
              <Lock className="w-6 h-6" />
            </span>
            <h1 className="text-2xl font-black text-navy mb-2">Demo Mode Disabled</h1>
            <p className="text-xs sm:text-sm text-grey font-light leading-relaxed mb-6">
              Interactive demonstration mode is currently deactivated in this environment. To enable it, set <code className="text-cyan font-mono bg-navy px-2 py-0.5 rounded text-xs">NEXT_PUBLIC_DEMO_ENABLED=&quot;true&quot;</code> in your environment variables.
            </p>
            <div className="flex gap-3 justify-center">
              <Link href="/" className="px-6 py-3 rounded-xl bg-navy text-white text-xs font-bold hover:bg-cyan hover:text-navy transition-colors no-underline">
                Return Home
              </Link>
              <Link href="/login" className="px-6 py-3 rounded-xl bg-light-grey border border-soft-blue text-navy text-xs font-bold hover:bg-white transition-colors no-underline">
                Staff Login
              </Link>
            </div>
          </div>
        </main>
        <MarketingFooter />
      </div>
    );
  }

  const handleStartFullTour = async () => {
    startTour(1);
    await switchRole("RECEPTIONIST");
  };

  const handleResetData = async () => {
    setResetting(true);
    setResetSuccess(null);
    const res = await resetDemo();
    setResetting(false);
    if (res.success) {
      setResetSuccess(res.message);
      setTimeout(() => setResetSuccess(null), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-light-grey text-dark font-sans flex flex-col justify-between">
      <MarketingNavbar />

      <main className="pt-28 sm:pt-36 pb-20 sm:pb-28 px-4 sm:px-6 max-w-7xl mx-auto w-full min-w-0">
        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto mb-14 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan/10 border border-cyan/30 text-cyan text-xs font-bold uppercase tracking-widest mb-5">
            <span className="w-2 h-2 rounded-full bg-cyan animate-pulse"></span>
            Real Database &bull; Live End-to-End Simulation
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-navy tracking-tight leading-tight mb-6">
            Experience BizLume HMS in Action
          </h1>
          <p className="text-base sm:text-lg text-grey font-light leading-relaxed max-w-3xl mx-auto mb-8">
            Step into the shoes of all 6 hospital personas. Witness how patient intake, algorithmic queue triage, clinical EMR, laboratory orders, pharmacy dispensing, and executive governance operate as one unified healthcare ecosystem.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={handleStartFullTour}
              disabled={isSwitchingRole}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-navy text-white text-sm font-black hover:bg-cyan hover:text-navy transition-all shadow-xl shadow-navy/20 hover:scale-105 active:scale-95 disabled:opacity-50"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Start Guided Hospital Journey (Phase 1–6)</span>
            </button>
            <Link
              href="/login"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-white border border-soft-blue text-navy text-sm font-bold hover:border-cyan transition-colors"
            >
              <span>Standard Staff Login</span>
            </Link>
          </div>

          {resetSuccess && (
            <div className="mt-4 p-3 rounded-2xl bg-status-green/10 border border-status-green/30 text-status-green text-xs font-bold inline-flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              {resetSuccess}
            </div>
          )}
        </div>

        {/* 6-Phase Interconnected Hospital Workflow Timeline */}
        <div className="mb-16 sm:mb-24">
          <div className="text-center mb-10">
            <span className="text-xs font-bold text-cyan uppercase tracking-widest block mb-1">
              End-to-End Hospital Continuum
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-navy">
              The Connected Patient Journey
            </h2>
            <p className="text-xs sm:text-sm text-grey font-light max-w-xl mx-auto mt-1">
              Actions in one department immediately cascade live into the next.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {WORKFLOW_PHASES.map((phase) => (
              <div
                key={phase.phaseNumber}
                className="bg-white border border-soft-blue rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-black px-3 py-1 rounded-full bg-cyan/15 text-navy uppercase tracking-wider">
                      Phase {phase.phaseNumber}
                    </span>
                    <span className="text-xs font-bold text-grey">
                      {phase.personName}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-navy mb-2">
                    {phase.roleName}: {phase.title}
                  </h3>

                  <p className="text-xs text-grey font-light leading-relaxed mb-4">
                    {phase.shortGoal}
                  </p>
                </div>

                <div className="pt-4 border-t border-soft-blue flex items-center justify-between">
                  <span className="text-[11px] font-bold text-cyan uppercase tracking-wider">
                    {phase.badge}
                  </span>
                  <button
                    onClick={async () => {
                      startTour(phase.phaseNumber);
                      await switchRole(phase.role);
                    }}
                    disabled={isSwitchingRole}
                    className="inline-flex items-center gap-1.5 text-xs font-black text-navy hover:text-cyan transition-colors"
                  >
                    <span>Launch Phase</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Explore All 6 Roles Directly */}
        <div className="mb-16 sm:mb-24">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-bold text-cyan uppercase tracking-widest block mb-1">
                Departmental Profiles
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-navy">
                Explore by Role
              </h2>
              <p className="text-xs sm:text-sm text-grey font-light">
                One-click instant authentication into any department persona.
              </p>
            </div>
            <button
              onClick={handleResetData}
              disabled={resetting}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-soft-blue text-status-orange hover:bg-orange-50 text-xs font-bold transition-colors self-start sm:self-auto"
            >
              <RotateCcw className={`w-3.5 h-3.5 ${resetting ? "animate-spin" : ""}`} />
              <span>{resetting ? "Resetting DB..." : "Reset Demo Baseline"}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {DEMO_ACCOUNTS.map((account) => (
              <div
                key={account.id}
                className="bg-white border border-soft-blue rounded-3xl p-6 sm:p-7 shadow-sm flex flex-col justify-between hover:border-cyan transition-all group"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-light-grey flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                      {ROLE_ICONS[account.role]}
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md bg-light-grey text-navy border border-soft-blue font-mono">
                      {account.employeeId}
                    </span>
                  </div>

                  <h3 className="text-lg font-black text-navy group-hover:text-cyan transition-colors">
                    {account.name}
                  </h3>
                  <p className="text-xs text-grey font-semibold mb-3">
                    {account.title} &bull; {account.department}
                  </p>

                  <p className="text-xs text-grey font-light leading-relaxed mb-4">
                    {account.summary}
                  </p>

                  <div className="space-y-1.5 mb-6">
                    <span className="text-[10px] font-bold text-navy uppercase tracking-wider block">
                      Core Operations:
                    </span>
                    {account.keyResponsibilities.slice(0, 3).map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-dark font-medium">
                        <span className="text-cyan font-bold">✓</span>
                        <span className="text-[11px] leading-snug">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => switchRole(account.role)}
                  disabled={isSwitchingRole}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-navy text-white text-xs font-black group-hover:bg-cyan group-hover:text-navy transition-all shadow-md"
                >
                  <span>Enter as {account.name.split(" ")[0]}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Technical Architecture & Governance Trust Card */}
        <div className="bg-navy text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-2xl">
          <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-cyan/15 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-3xl">
            <span className="inline-block px-3.5 py-1 rounded-full bg-cyan/20 border border-cyan/30 text-cyan text-[11px] font-bold tracking-widest uppercase mb-4">
              Enterprise Simulation Architecture
            </span>
            <h2 className="text-2xl sm:text-4xl font-black mb-4 tracking-tight">
              Production-Grade Operations Without Mock Hacks
            </h2>
            <p className="text-white/80 text-xs sm:text-sm font-light leading-relaxed mb-6">
              Unlike static clickable wireframes, this interactive demo executes live Prisma transactions against PostgreSQL. Prescriptions drafted by Dr. Aarav Mehta atomically deplete physical warehouse inventory in Neha Kapoor’s pharmacy; blood tests ordered in EMR appear dynamically in Rahul Verma’s diagnostic worklist.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-white/10 text-xs">
              <div className="flex items-center gap-2">
                <span className="text-cyan font-bold text-base">✓</span>
                <span className="text-white/90">Signed JWT Session Cookies</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-cyan font-bold text-base">✓</span>
                <span className="text-white/90">Atomic PostgreSQL Transactions</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-cyan font-bold text-base">✓</span>
                <span className="text-white/90">Isolated Demo Data Isolation</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      <MarketingFooter />
    </div>
  );
}
