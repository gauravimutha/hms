import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Doctor Consultation Workspace",
  description: "Secure doctor consultation workspace, OPD triage queue, and electronic medical record management.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
