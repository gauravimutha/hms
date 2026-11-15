import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Laboratory Reagent Inventory",
  description: "Monitor laboratory reagent stocks and replenishment thresholds.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
