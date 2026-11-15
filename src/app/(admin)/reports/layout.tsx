import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hospital Operational & Revenue Analytics",
  description: "Executive reports, OPD volume throughput, and departmental revenue metrics.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
