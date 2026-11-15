import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nurse Triage & Vitals Recording",
  description: "Record patient blood pressure, pulse, temperature, and BMI prior to consultation.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
