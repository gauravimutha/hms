"use client";

import React, { useState } from "react";
import { useDemo } from "@/context/DemoContext";
import { RotateCcw, AlertTriangle, CheckCircle, X } from "lucide-react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function DemoResetModal({ isOpen, onClose }: Props) {
  const { resetDemo } = useDemo();
  const [resetting, setResetting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleConfirmReset = async () => {
    setResetting(true);
    setStatusMessage(null);
    const result = await resetDemo();
    setResetting(false);
    if (result.success) {
      setStatusMessage("Demo database successfully restored to pristine baseline!");
      setTimeout(() => {
        onClose();
        window.location.reload();
      }, 1500);
    } else {
      setStatusMessage("Reset failed: " + result.message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fade-in">
      <div className="bg-navy border border-soft-blue rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl text-white">
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
          <div className="flex items-center gap-2 text-status-orange">
            <RotateCcw className="w-5 h-5" />
            <h3 className="text-lg font-black text-white">Reset Demo Environment</h3>
          </div>
          <button
            onClick={onClose}
            className="text-white/60 hover:text-white p-1 rounded-lg hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs sm:text-sm text-soft-blue/90 leading-relaxed mb-4">
          This will restore all demo patients, visits, queue positions, lab orders, prescriptions, and pending staff accounts to their original baseline state.
        </p>

        <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-xs text-white/70 space-y-1 mb-5">
          <p className="font-bold text-cyan">Safety Guarantee:</p>
          <p className="text-[11px] leading-relaxed">
            Only designated demo records with the prefix <code className="text-cyan">HMS-DEMO-</code> and demo staff accounts will be refreshed. Non-demo accounts and records are strictly preserved.
          </p>
        </div>

        {statusMessage && (
          <div className="p-3 rounded-xl bg-status-green/20 border border-status-green/30 text-status-green text-xs font-bold mb-4 flex items-center gap-2">
            <CheckCircle className="w-4 h-4 shrink-0" />
            {statusMessage}
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-2.5">
          <button
            onClick={handleConfirmReset}
            disabled={resetting}
            className="flex-1 py-3 px-4 rounded-xl bg-status-orange text-navy font-black text-xs sm:text-sm hover:opacity-95 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
          >
            <RotateCcw className={`w-4 h-4 ${resetting ? "animate-spin" : ""}`} />
            {resetting ? "Restoring Baseline Data..." : "Confirm & Reset Demo Data"}
          </button>
          <button
            onClick={onClose}
            disabled={resetting}
            className="py-3 px-5 rounded-xl bg-white/10 text-white font-bold text-xs sm:text-sm hover:bg-white/15"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
