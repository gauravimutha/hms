import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hospital Billing & Folio Settlement Desk",
  description: "Manage OPD registration fees, diagnostic test payments, and Razorpay settlements.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
