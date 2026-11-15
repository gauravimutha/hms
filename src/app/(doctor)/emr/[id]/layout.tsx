import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Clinical EMR Consultation Encounter",
  description: "Secure clinical encounter, ICD-10 diagnosis, vitals review, and order dispatch.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
