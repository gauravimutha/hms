import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Live OPD Patient Queue",
  description: "Receptionist queue management desk, priority overrides, and token displays.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
