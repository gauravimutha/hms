"use client";

import React from "react";
import { useDemo } from "@/context/DemoContext";
import { DEMO_ACCOUNTS } from "@/lib/demo/demoAccounts";
import { WORKFLOW_PHASES } from "@/lib/demo/demoWorkflow";
import { 
  Users, 
  ArrowRight, 
  X, 
  Stethoscope, 
  HeartPulse, 
  FlaskRound, 
  Pill, 
  ShieldCheck, 
  UserCheck 
} from "lucide-react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const ROLE_ICONS: Record<string, React.ReactNode> = {
  RECEPTIONIST: <UserCheck className="w-5 h-5 text-cyan" />,
  NURSE: <HeartPulse className="w-5 h-5 text-status-red" />,
  DOCTOR: <Stethoscope className="w-5 h-5 text-cyan" />,
  LAB_TECHNICIAN: <FlaskRound className="w-5 h-5 text-amber-500" />,
  PHARMACIST: <Pill className="w-5 h-5 text-status-green" />,
  ADMIN: <ShieldCheck className="w-5 h-5 text-purple-400" />,
};

export default function DemoRoleModal({ isOpen, onClose }: Props) {
  const { switchRole, currentPhase, isSwitchingRole } = useDemo();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fade-in">
      <div className="bg-navy border border-cyan/40 rounded-3xl p-5 sm:p-7 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl text-white">
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-cyan/20 text-cyan flex items-center justify-center font-bold">
              <Users className="w-4 h-4" />
            </div>
            <div>
              <span className="text-cyan text-[10px] font-bold uppercase tracking-widest block">
                Enterprise Role Switcher
              </span>
              <h2 className="text-lg sm:text-xl font-black text-white">
                Select Hospital Department
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white/60 hover:text-white p-1 rounded-lg hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs text-soft-blue/90 mb-5 leading-relaxed">
          Experience BizLume HMS from the perspective of each hospital role. Selecting a role logs you into that authenticated persona and loads their operational worklist.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
          {DEMO_ACCOUNTS.map((acc, idx) => {
            const isCurrent = acc.role === currentPhase.role;
            const phase = WORKFLOW_PHASES.find((p) => p.role === acc.role);

            return (
              <button
                key={acc.id}
                onClick={async () => {
                  await switchRole(acc.role);
                  onClose();
                }}
                disabled={isSwitchingRole}
                className={`p-4 rounded-2xl border text-left transition-all relative overflow-hidden group ${
                  isCurrent
                    ? "bg-cyan/15 border-cyan text-white shadow-md ring-1 ring-cyan"
                    : "bg-white/5 border-white/10 text-white/90 hover:bg-white/10 hover:border-cyan/50"
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-xl bg-white/10 group-hover:scale-105 transition-transform">
                      {ROLE_ICONS[acc.role]}
                    </div>
                    <div>
                      <span className="text-cyan text-[10px] font-black uppercase tracking-wider block">
                        Phase {phase?.phaseNumber || idx + 1}: {acc.role.replace("_", " ")}
                      </span>
                      <h4 className="font-bold text-white text-sm leading-tight">
                        {acc.name}
                      </h4>
                    </div>
                  </div>
                  {isCurrent && (
                    <span className="text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-cyan text-navy shrink-0">
                      Active
                    </span>
                  )}
                </div>

                <p className="text-[11px] text-white/70 line-clamp-2 leading-relaxed font-light mb-2">
                  {acc.summary}
                </p>

                <div className="flex items-center justify-between text-[10px] font-semibold text-cyan pt-2 border-t border-white/10">
                  <span>{acc.title}</span>
                  <span className="group-hover:translate-x-1 transition-transform">Enter Portal →</span>
                </div>
              </button>
            );
          })}
        </div>

        <div className="pt-3 border-t border-white/10 flex justify-between items-center text-xs text-white/50">
          <span>6 Active Demo Personas Configured</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-white/10 text-white font-bold hover:bg-white/15"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
