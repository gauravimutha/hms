import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Staff Sign In | BizLume HMS",
  description: "Secure role-based login for hospital doctors, nurses, receptionists, technicians, and administrators.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
