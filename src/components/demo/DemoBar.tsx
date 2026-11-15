"use client";

import React, { useState } from "react";
import { useDemo } from "@/context/DemoContext";
import { WORKFLOW_PHASES } from "@/lib/demo/demoWorkflow";
import DemoRoleModal from "./DemoRoleModal";
import DemoResetModal from "./DemoResetModal";
import DemoTourTooltip from "./DemoTourTooltip";
import DemoHandoffModal from "./DemoHandoffModal";
import { 
  Sparkles, 
  Users, 
  RotateCcw, 
  ChevronUp, 
  ChevronDown, 
  Wand2, 
  HelpCircle, 
  ArrowRight,
  ShieldAlert,
  CheckCircle2,
  X
} from "lucide-react";

export default function DemoBar() {
  const {
    isDemoMode,
    currentPhaseNumber,
    currentPhase,
    activeAccount,
    isTourActive,
    startTour,
    stopTour,
    skipToPhase,
    triggerAutofill,
    currentStep,
  } = useDemo();

  const [minimized, setMinimized] = useState(false);
  const [roleModalOpen, setRoleModalOpen] = useState(false);
  const [resetModalOpen, setResetModalOpen] = useState(false);

  if (!isDemoMode) return null;

  return (
    <>
      {/* Floating Tour Tooltip */}
      <DemoTourTooltip />

      {/* Cross-Portal Handoff Dialog */}
      <DemoHandoffModal />

      {/* Role Selection Modal */}
      <DemoRoleModal
        isOpen={roleModalOpen}
        onClose={() => setRoleModalOpen(false)}
      />

      {/* Safe Reset Confirmation Modal */}
      <DemoResetModal
        isOpen={resetModalOpen}
        onClose={() => setResetModalOpen(false)}
      />

      {/* Minimized Pill */}
      {minimized ? (
        <div className="fixed bottom-4 right-4 z-40 animate-fade-in">
          <button
            onClick={() => setMinimized(false)}
            className="flex items-center gap-2.5 px-4 py-2.5 bg-navy/95 backdrop-blur-xl border border-cyan/40 text-white rounded-full shadow-2xl hover:scale-105 transition-all text-xs font-bold"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-cyan animate-pulse"></span>
            <span className="text-cyan font-black tracking-wider uppercase text-[11px]">
              DEMO: {currentPhase.roleName}
            </span>
            <span className="text-white/60">&bull;</span>
            <span className="text-white/80">Phase {currentPhaseNumber}/6</span>
            <ChevronUp className="w-4 h-4 text-cyan ml-1" />
          </button>
        </div>
      ) : (
        /* Expanded Floating Toolbar */
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-navy/95 backdrop-blur-xl border-t border-cyan/30 text-white shadow-2xl px-4 py-2.5 transition-all">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
            {/* Left Brand & Active Persona */}
            <div className="flex items-center justify-between w-full md:w-auto gap-3">
              <div className="flex items-center gap-2.5">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan"></span>
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-cyan font-black text-[10px] tracking-widest uppercase">
                      INTERACTIVE SIMULATION
                    </span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-cyan/20 text-cyan font-bold">
                      LIVE DB
                    </span>
                  </div>
                  <p className="text-xs font-bold text-white leading-tight">
                    {activeAccount?.name || "Demo User"} &bull;{" "}
                    <span className="text-soft-blue/80 font-normal">
                      {currentPhase.roleName}
                    </span>
                  </p>
                </div>
              </div>

              {/* Mobile Controls */}
              <div className="flex items-center gap-2 md:hidden">
                <button
                  onClick={() => setRoleModalOpen(true)}
                  className="px-2.5 py-1.5 rounded-lg bg-white/10 text-xs font-bold text-cyan"
                >
                  Roles
                </button>
                <button
                  onClick={() => setMinimized(true)}
                  className="p-1.5 rounded-lg text-white/60 hover:text-white"
                >
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Middle Workflow Stepper */}
            <div className="hidden lg:flex items-center gap-1 bg-white/5 p-1 rounded-2xl border border-white/10 overflow-x-auto max-w-full">
              {WORKFLOW_PHASES.map((phase) => {
                const isActive = phase.phaseNumber === currentPhaseNumber;
                const isPassed = phase.phaseNumber < currentPhaseNumber;

                return (
                  <button
                    key={phase.phaseNumber}
                    onClick={() => skipToPhase(phase.phaseNumber)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                      isActive
                        ? "bg-cyan text-navy shadow-md"
                        : isPassed
                        ? "text-status-green hover:bg-white/10"
                        : "text-white/60 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <span>{phase.phaseNumber}.</span>
                    <span>{phase.roleName}</span>
                    {isPassed && <CheckCircle2 className="w-3 h-3 text-status-green" />}
                  </button>
                );
              })}
            </div>

            {/* Right Action Tools */}
            <div className="flex items-center gap-2 w-full md:w-auto justify-end overflow-x-auto pb-1 md:pb-0">
              {/* Autofill Button if current step has payload */}
              {currentStep?.autofillType && (
                <button
                  onClick={() => triggerAutofill(currentStep.autofillType!)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan/20 border border-cyan/40 text-cyan text-xs font-bold hover:bg-cyan hover:text-navy transition-all shrink-0"
                >
                  <Wand2 className="w-3.5 h-3.5" />
                  <span>Autofill Form</span>
                </button>
              )}

              {/* Tour Toggle */}
              <button
                onClick={() => (isTourActive ? stopTour() : startTour(currentPhaseNumber))}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 border ${
                  isTourActive
                    ? "bg-white text-navy border-white shadow-sm"
                    : "bg-white/5 text-white/80 hover:text-white border-white/10 hover:border-cyan/40"
                }`}
              >
                <HelpCircle className="w-3.5 h-3.5 text-cyan" />
                <span>Tour: {isTourActive ? "Active" : "Off"}</span>
              </button>

              {/* Role Switcher */}
              <button
                onClick={() => setRoleModalOpen(true)}
                className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 hover:border-cyan/40 text-white text-xs font-bold transition-all shrink-0"
              >
                <Users className="w-3.5 h-3.5 text-cyan" />
                <span>Switch Role</span>
              </button>

              {/* Reset Demo */}
              <button
                onClick={() => setResetModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 hover:border-status-orange text-status-orange text-xs font-bold transition-all shrink-0"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Demo</span>
              </button>

              {/* Minimize */}
              <button
                onClick={() => setMinimized(true)}
                aria-label="Minimize demo toolbar"
                className="hidden md:inline-flex p-1.5 rounded-xl text-white/60 hover:text-white hover:bg-white/10 transition-colors"
              >
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
