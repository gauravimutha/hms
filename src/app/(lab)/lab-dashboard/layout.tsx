import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Diagnostic Lab Orders Dashboard",
  description: "Process physician laboratory requisitions, log sample results, and flag abnormalities.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
