import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Medical Staff Registration | BizLume HMS",
  description: "Apply for hospital staff access as a doctor, nurse, receptionist, or lab technician.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
