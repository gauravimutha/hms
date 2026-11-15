import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Patient Intake & Digital Registration",
  description: "Front-desk patient onboarding, Aadhaar profiling, and official OPD card generation.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
