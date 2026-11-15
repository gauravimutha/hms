import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BizLume HMS | AI-Powered Hospital Management",
  description: "An AI-assisted, clinician-first Hospital Management & Electronic Medical Records (EMR) platform.",
  metadataBase: new URL("https://bizlume.in"),
  openGraph: {
    title: "BizLume HMS | AI-Powered Hospital Management",
    description: "An AI-assisted, clinician-first Hospital Management & Electronic Medical Records (EMR) platform.",
    url: "https://bizlume.in",
    siteName: "BizLume HMS",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 675,
        alt: "BizLume HMS - Hospital Management System",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BizLume HMS | AI-Powered Hospital Management",
    description: "An AI-assisted, clinician-first Hospital Management & Electronic Medical Records (EMR) platform.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased bg-white selection:bg-cyan/30">
        {children}
      </body>
    </html>
  );
}