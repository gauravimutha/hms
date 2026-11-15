import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Doctor Appointments Desk",
  description: "Schedule, manage, and book patient appointments across specialist rosters.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
