import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "BizLume HMS | AI-Powered Hospital Management & EMR Software India",
    template: "%s | BizLume HMS",
  },
  description: "An AI-assisted, clinician-first Hospital Management & Electronic Medical Records (EMR) platform with patient intake, smart queue triage, diagnostic lab orders, and integrated billing.",
  metadataBase: new URL("https://bizlume.in"),
  alternates: {
    canonical: "https://bizlume.in",
  },
  openGraph: {
    title: "BizLume HMS | AI-Powered Hospital Management & EMR Software India",
    description: "An AI-assisted, clinician-first Hospital Management & Electronic Medical Records (EMR) platform with patient intake, smart queue triage, diagnostic lab orders, and integrated billing.",
    url: "https://bizlume.in",
    siteName: "BizLume HMS",
    images: [
      {
        url: "https://bizlume.in/og-image.jpg",
        secureUrl: "https://bizlume.in/og-image.jpg",
        width: 1200,
        height: 630,
        type: "image/jpeg",
        alt: "BizLume HMS - Hospital Management System",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BizLume HMS | AI-Powered Hospital Management & EMR Software India",
    description: "An AI-assisted, clinician-first Hospital Management & Electronic Medical Records (EMR) platform with patient intake, smart queue triage, diagnostic lab orders, and integrated billing.",
    images: ["https://bizlume.in/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Explicit OpenGraph & WhatsApp Meta Tags */}
        <meta property="og:image" content="https://bizlume.in/og-image.jpg" />
        <meta property="og:image:secure_url" content="https://bizlume.in/og-image.jpg" />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="BizLume HMS - Hospital Management System" />
        {/* Fallback for platforms looking for item-prop */}
        <link rel="image_src" href="https://bizlume.in/og-image.jpg" />
      </head>
      <body className="antialiased bg-white selection:bg-cyan/30">
        {children}
      </body>
    </html>
  );
}