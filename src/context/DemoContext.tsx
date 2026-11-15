"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { WORKFLOW_PHASES, WorkflowPhase, TourStep, DEMO_SAMPLE_PATIENT } from "@/lib/demo/demoWorkflow";
import { DEMO_ACCOUNTS, DemoAccount } from "@/lib/demo/demoAccounts";
import { isDemoEnabled } from "@/lib/demo/demoConfig";

interface DemoContextType {
  isDemoMode: boolean;
  setIsDemoMode: (val: boolean) => void;
  currentPhaseNumber: number;
  currentPhase: WorkflowPhase;
  currentStepIndex: number;
  currentStep: TourStep | null;
  isTourActive: boolean;
  showHandoff: boolean;
  isSwitchingRole: boolean;
  demoPatient: typeof DEMO_SAMPLE_PATIENT;
  activeAccount: DemoAccount | null;

  // Actions
  startTour: (phase?: number) => void;
  stopTour: () => void;
  nextStep: () => void;
  prevStep: () => void;
  skipToPhase: (phaseNum: number) => Promise<void>;
  switchRole: (role: string) => Promise<void>;
  proceedToNextPhase: () => Promise<void>;
  triggerAutofill: (type: string) => void;
  resetDemo: () => Promise<{ success: boolean; message: string }>;
  dismissHandoff: () => void;
}

const DemoContext = createContext<DemoContextType | undefined>(undefined);

export function DemoProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const [isDemoMode, setIsDemoMode] = useState<boolean>(isDemoEnabled());
  const [currentPhaseNumber, setCurrentPhaseNumber] = useState<number>(1);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [isTourActive, setIsTourActive] = useState<boolean>(false);
  const [showHandoff, setShowHandoff] = useState<boolean>(false);
  const [isSwitchingRole, setIsSwitchingRole] = useState<boolean>(false);
  const [demoPatient] = useState(DEMO_SAMPLE_PATIENT);

  // Initialize from localStorage if present and enabled
  useEffect(() => {
    if (!isDemoEnabled()) {
      setIsDemoMode(false);
      return;
    }
    try {
      const savedDemo = localStorage.getItem("bizlume_demo_mode");
      if (savedDemo !== null) {
        setIsDemoMode(savedDemo === "true");
      }
      const savedPhase = localStorage.getItem("bizlume_demo_phase");
      if (savedPhase) {
        const p = parseInt(savedPhase);
        if (p >= 1 && p <= 6) setCurrentPhaseNumber(p);
      }
      const savedTourActive = localStorage.getItem("bizlume_demo_tour_active");
      if (savedTourActive === "true") {
        setIsTourActive(true);
      }
    } catch (e) {
      console.warn("Could not read demo state from localStorage:", e);
    }
  }, []);

  // Sync state to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("bizlume_demo_mode", String(isDemoMode));
      localStorage.setItem("bizlume_demo_phase", String(currentPhaseNumber));
      localStorage.setItem("bizlume_demo_tour_active", String(isTourActive));
    } catch (e) {
      console.warn("Could not save demo state to localStorage:", e);
    }
  }, [isDemoMode, currentPhaseNumber, isTourActive]);

  const currentPhase = WORKFLOW_PHASES.find((p) => p.phaseNumber === currentPhaseNumber) || WORKFLOW_PHASES[0];
  const currentStep = currentPhase.steps[currentStepIndex] || null;
  const activeAccount = DEMO_ACCOUNTS.find((a) => a.role === currentPhase.role) || DEMO_ACCOUNTS[0];

  const switchRole = async (role: string) => {
    setIsSwitchingRole(true);
    try {
      const res = await fetch("/api/demo/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to switch role");
      }

      const data = await res.json();
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);
      localStorage.setItem("name", data.name);

      const targetPhase = WORKFLOW_PHASES.find((p) => p.role === role);
      if (targetPhase) {
        setCurrentPhaseNumber(targetPhase.phaseNumber);
        setCurrentStepIndex(0);
      }

      setShowHandoff(false);
      router.push(data.landingRoute);
    } catch (error) {
      console.error("Error switching role:", error);
      alert("Failed to switch demo role. Please try again.");
    } finally {
      setIsSwitchingRole(false);
    }
  };

  const startTour = (phase?: number) => {
    setIsDemoMode(true);
    setIsTourActive(true);
    if (phase && phase >= 1 && phase <= 6) {
      setCurrentPhaseNumber(phase);
    }
    setCurrentStepIndex(0);
    setShowHandoff(false);
  };

  const stopTour = () => {
    setIsTourActive(false);
  };

  const nextStep = () => {
    if (currentStepIndex < currentPhase.steps.length - 1) {
      setCurrentStepIndex((prev) => prev + 1);
    } else {
      // Reached end of phase! Show handoff
      setShowHandoff(true);
    }
  };

  const prevStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
      setShowHandoff(false);
    }
  };

  const skipToPhase = async (phaseNum: number) => {
    const target = WORKFLOW_PHASES.find((p) => p.phaseNumber === phaseNum);
    if (target) {
      await switchRole(target.role);
      setCurrentPhaseNumber(phaseNum);
      setCurrentStepIndex(0);
      setShowHandoff(false);
    }
  };

  const proceedToNextPhase = async () => {
    if (currentPhase.nextRole) {
      await switchRole(currentPhase.nextRole);
    } else {
      // Completed all 6 phases!
      alert("🎉 Congratulations! You have completed the full end-to-end BizLume HMS hospital journey.");
      setShowHandoff(false);
      setIsTourActive(false);
    }
  };

  const triggerAutofill = (type: string) => {
    if (typeof window !== "undefined") {
      const event = new CustomEvent("bizlume:demo:autofill", {
        detail: { type, sample: demoPatient },
      });
      window.dispatchEvent(event);
    }
  };

  const resetDemo = async () => {
    try {
      const res = await fetch("/api/demo/reset", {
        method: "POST",
      });
      const data = await res.json();
      if (res.ok) {
        setCurrentPhaseNumber(1);
        setCurrentStepIndex(0);
        setShowHandoff(false);
        return { success: true, message: data.message };
      } else {
        return { success: false, message: data.error || "Reset failed." };
      }
    } catch (e: any) {
      return { success: false, message: e.message || "Network error while resetting demo." };
    }
  };

  const dismissHandoff = () => {
    setShowHandoff(false);
  };

  return (
    <DemoContext.Provider
      value={{
        isDemoMode,
        setIsDemoMode,
        currentPhaseNumber,
        currentPhase,
        currentStepIndex,
        currentStep,
        isTourActive,
        showHandoff,
        isSwitchingRole,
        demoPatient,
        activeAccount,
        startTour,
        stopTour,
        nextStep,
        prevStep,
        skipToPhase,
        switchRole,
        proceedToNextPhase,
        triggerAutofill,
        resetDemo,
        dismissHandoff,
      }}
    >
      {children}
    </DemoContext.Provider>
  );
}

const defaultDemoContext: DemoContextType = {
  isDemoMode: false,
  setIsDemoMode: () => {},
  currentPhaseNumber: 1,
  currentPhase: WORKFLOW_PHASES[0],
  currentStepIndex: 0,
  currentStep: null,
  isTourActive: false,
  showHandoff: false,
  isSwitchingRole: false,
  demoPatient: DEMO_SAMPLE_PATIENT,
  activeAccount: null,
  startTour: () => {},
  stopTour: () => {},
  nextStep: () => {},
  prevStep: () => {},
  skipToPhase: async () => {},
  switchRole: async () => {},
  proceedToNextPhase: async () => {},
  triggerAutofill: () => {},
  resetDemo: async () => ({ success: false, message: "Demo mode disabled" }),
  dismissHandoff: () => {},
};

export function useDemo() {
  const context = useContext(DemoContext);
  return context || defaultDemoContext;
}
