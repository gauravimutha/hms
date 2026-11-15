import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nurse Clinical Triage Assessment",
  description: "Evaluate presenting complaints and set clinical criticality indicators.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
