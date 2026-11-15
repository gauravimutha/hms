import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Diagnostic Test Processing",
  description: "Input pathology and radiology findings for active patient encounters.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
