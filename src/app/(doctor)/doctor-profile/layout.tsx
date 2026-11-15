import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Doctor Profile & Availability Roster",
  description: "Configure weekly doctor consultation slots and live availability toggling.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
