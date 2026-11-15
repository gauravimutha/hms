import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hospital Administration & Staff Approvals",
  description: "Verify medical staff registrations, audit system access, and manage hospital credentials.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
