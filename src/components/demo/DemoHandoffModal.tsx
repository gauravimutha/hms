"use client";

import React from "react";
import { useDemo } from "@/context/DemoContext";
import { CheckCircle2, ArrowRight, X, Sparkles, Building, Users } from "lucide-react";
import { WORKFLOW_PHASES } from "@/lib/demo/demoWorkflow";

export default function DemoHandoffModal() {
  const {
    showHandoff,
    currentPhase,
    proceedToNextPhase,
    dismissHandoff,
    isSwitchingRole,
  } = useDemo();

  if (!showHandoff) return null;

  const nextPhase = WORKFLOW_PHASES.find((p) => p.phaseNumber === currentPhase.phaseNumber + 1);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fade-in">
      <div className="bg-navy border border-cyan/40 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl text-white relative overflow-hidden">
        {/* Glow accent */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-cyan/20 rounded-full blur-3xl pointer-events-none" />

        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-status-green/20 text-status-green flex items-center justify-center font-bold">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <span className="text-cyan text-[10px] font-bold tracking-widest uppercase block">
                Workflow Checkpoint Reached
              </span>
              <h2 className="text-lg sm:text-xl font-black text-white">
                {currentPhase.roleName} Milestone Completed!
              </h2>
            </div>
          </div>
          <button
            onClick={dismissHandoff}
            className="text-white/60 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4 mb-6">
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-xs sm:text-sm text-soft-blue space-y-2">
            <p className="font-bold text-white flex items-center gap-1.5">
              <Building className="w-4 h-4 text-cyan" />
              What was accomplished:
            </p>
            <p className="font-light leading-relaxed text-white/80">
              {currentPhase.shortGoal}
            </p>
          </div>

          {nextPhase ? (
            <div className="p-4 rounded-2xl bg-cyan/10 border border-cyan/30 text-xs sm:text-sm text-white space-y-2">
              <span className="text-cyan text-[11px] font-black uppercase tracking-wider block">
                Next Stage: Phase {nextPhase.phaseNumber} of 6
              </span>
              <h4 className="font-bold text-white text-base">
                {nextPhase.personName} &bull; {nextPhase.roleName} Portal
              </h4>
              <p className="font-light text-soft-blue text-xs leading-relaxed">
                {nextPhase.shortGoal}
              </p>
            </div>
          ) : (
            <div className="p-4 rounded-2xl bg-status-green/10 border border-status-green/30 text-status-green text-xs sm:text-sm font-bold">
              🎉 All 6 hospital departments have been successfully walked through! You have witnessed the interconnected patient journey across BizLume HMS.
            </div>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={proceedToNextPhase}
            disabled={isSwitchingRole}
            className="flex-1 inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-cyan text-navy font-black text-sm hover:opacity-95 transition-all shadow-lg disabled:opacity-50"
          >
            {isSwitchingRole ? (
              <span>Authenticating Session...</span>
            ) : nextPhase ? (
              <>
                <span>Handoff to {nextPhase.roleName} ({nextPhase.personName})</span>
                <ArrowRight className="w-4 h-4" />
              </>
            ) : (
              <span>Restart Tour from Beginning</span>
            )}
          </button>
          <button
            onClick={dismissHandoff}
            className="px-5 py-3.5 rounded-xl bg-white/10 text-white font-bold text-xs sm:text-sm hover:bg-white/15 transition-colors"
          >
            Explore this screen
          </button>
        </div>
      </div>
    </div>
  );
}
