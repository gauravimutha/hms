"use client";

import React from "react";
import { DemoProvider } from "@/context/DemoContext";
import DemoBar from "@/components/demo/DemoBar";
import { isDemoEnabled } from "@/lib/demo/demoConfig";

export default function DemoAppWrapper({ children }: { children: React.ReactNode }) {
  const enabled = isDemoEnabled();

  if (!enabled) {
    return <>{children}</>;
  }

  return (
    <DemoProvider>
      {children}
      <DemoBar />
    </DemoProvider>
  );
}
