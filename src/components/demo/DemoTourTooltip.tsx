"use client";

import React from "react";
import { useDemo } from "@/context/DemoContext";
import { 
  Sparkles, 
  ArrowRight, 
  ArrowLeft, 
  X, 
  HelpCircle, 
  CheckCircle,
  Building2,
  Wand2
} from "lucide-react";

export default function DemoTourTooltip() {
  const {
    isTourActive,
    currentStep,
    currentStepIndex,
    currentPhase,
    nextStep,
    prevStep,
    stopTour,
    triggerAutofill,
  } = useDemo();

  if (!isTourActive || !currentStep) return null;

  const totalStepsInPhase = currentPhase.steps.length;

  return (
    <div className="fixed bottom-20 left-4 right-4 sm:left-auto sm:right-6 sm:bottom-20 z-50 sm:max-w-md w-auto animate-fade-in">
      <div className="bg-navy/95 backdrop-blur-xl border border-cyan/40 rounded-3xl p-5 sm:p-6 shadow-2xl text-white">
        {/* Top Header */}
        <div className="flex items-center justify-between gap-3 pb-3 border-b border-white/10 mb-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan animate-pulse"></span>
            <span className="text-cyan text-[11px] font-black tracking-widest uppercase">
              {currentPhase.badge} &bull; Step {currentStepIndex + 1} of {totalStepsInPhase}
            </span>
          </div>
          <button
            onClick={stopTour}
            aria-label="Close tour"
            className="text-white/60 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Title */}
        <h3 className="text-base sm:text-lg font-black text-white tracking-tight mb-2">
          {currentStep.title}
        </h3>

        {/* Explanation */}
        <p className="text-xs sm:text-sm text-soft-blue/90 font-light leading-relaxed mb-3">
          {currentStep.explanation}
        </p>

        {/* Hospital Operational Impact */}
        <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-xs mb-3 space-y-1">
          <div className="flex items-center gap-1.5 text-cyan font-bold text-[11px] uppercase tracking-wider">
            <Building2 className="w-3.5 h-3.5" />
            Operational Significance
          </div>
          <p className="text-white/80 font-light leading-relaxed text-[11px]">
            {currentStep.hospitalImpact}
          </p>
        </div>

        {/* Next Action Prompt */}
        <div className="text-[11px] text-white/70 italic mb-4">
          👉 <strong className="text-white">Next Action:</strong> {currentStep.nextAction}
        </div>

        {/* Action Controls */}
        <div className="flex flex-col gap-2.5">
          {/* Autofill button if available for this step */}
          {currentStep.autofillType && (
            <button
              onClick={() => triggerAutofill(currentStep.autofillType!)}
              className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-cyan/15 border border-cyan/30 text-cyan text-xs font-black hover:bg-cyan hover:text-navy transition-all shadow-sm"
            >
              <Wand2 className="w-3.5 h-3.5" />
              Autofill Sample Data for this Step
            </button>
          )}

          <div className="flex items-center justify-between gap-2 pt-1 border-t border-white/10">
            <button
              onClick={prevStep}
              disabled={currentStepIndex === 0}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold text-white/70 hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back
            </button>

            <div className="flex items-center gap-1.5">
              {currentPhase.steps.map((_, idx) => (
                <span
                  key={idx}
                  className={`w-2 h-2 rounded-full transition-all ${
                    idx === currentStepIndex ? "bg-cyan w-4" : "bg-white/20"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextStep}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-cyan text-navy text-xs font-black hover:opacity-95 transition-opacity shadow-md"
            >
              {currentStepIndex === totalStepsInPhase - 1 ? "Complete Phase →" : "Next Step"}
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
