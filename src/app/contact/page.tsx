import React from "react";
import Link from "next/link";
import { Mail, Globe } from "lucide-react";
import MarketingNavbar from "@/components/MarketingNavbar";
import MarketingFooter from "@/components/MarketingFooter";
import { constructMetadata, getBreadcrumbSchema, getOrganizationSchema } from "@/lib/seo";

export const metadata = constructMetadata({
  title: "Contact BizLume HMS | Book a Hospital Software Demonstration",
  description: "Get in touch with the BizLume HMS team for product demonstrations, technical inquiries, and customized onboarding for hospitals and clinics across India.",
  path: "/contact",
  keywords: [
    "Contact BizLume",
    "Book Hospital Software Demo",
    "Hospital Management Software Inquiry India",
    "BizLume Support",
  ],
});

export default function ContactPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Contact", url: "/contact" },
  ]);
  const orgSchema = getOrganizationSchema();

  return (
    <div className="min-h-screen bg-light-grey text-dark font-sans flex flex-col justify-between">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([breadcrumbSchema, orgSchema]) }}
      />

      <MarketingNavbar />

      <main className="pt-32 pb-24 px-6 max-w-4xl mx-auto w-full">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs font-semibold text-grey">
          <Link href="/" className="hover:text-navy transition-colors no-underline">
            Home
          </Link>
          <span>/</span>
          <span className="text-navy font-bold">Contact</span>
        </nav>

        <div className="text-center mb-14">
          <span className="inline-block px-3.5 py-1 rounded-full bg-cyan/10 border border-cyan/20 text-cyan text-[11px] font-bold tracking-widest uppercase mb-4">
            Institutional Demonstrations & Inquiries
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-navy tracking-tight mb-4">
            Connect with BizLume HMS
          </h1>
          <p className="text-base text-grey font-light max-w-xl mx-auto">
            Speak directly with our healthcare software architects to review your facility's requirements.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white border border-soft-blue rounded-3xl p-8 sm:p-10 shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-cyan/10 text-cyan flex items-center justify-center mb-6">
                <Mail className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-black text-navy mb-2">Direct Email Inquiries</h2>
              <p className="text-sm text-grey font-light leading-relaxed mb-6">
                Send inquiries regarding enterprise licensing, multi-branch hospital deployments, and technical documentation.
              </p>
            </div>
            <div>
              <a
                href="mailto:contact@bizlume.in"
                className="inline-flex items-center gap-2 text-base font-bold text-navy hover:text-cyan transition-colors"
              >
                <span>contact@bizlume.in</span>
                <span>↗</span>
              </a>
              <p className="text-[11px] text-grey font-medium mt-1">Average response time: within 24 hours</p>
            </div>
          </div>

          <div className="bg-white border border-soft-blue rounded-3xl p-8 sm:p-10 shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-cyan/10 text-cyan flex items-center justify-center mb-6">
                <Globe className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-black text-navy mb-2">Corporate Headquarters</h2>
              <p className="text-sm text-grey font-light leading-relaxed mb-6">
                BizLume Technology & Solutions develops modern digital operating systems for healthcare institutions across India.
              </p>
            </div>
            <div>
              <a
                href="https://bizlume.in"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-base font-bold text-navy hover:text-cyan transition-colors"
              >
                <span>bizlume.in</span>
                <span>↗</span>
              </a>
              <p className="text-[11px] text-grey font-medium mt-1">Engineering & Healthcare Systems</p>
            </div>
          </div>
        </div>

        <div className="bg-navy text-white rounded-3xl p-8 sm:p-12 text-center">
          <h2 className="text-2xl font-black mb-3">Already Have Staff Credentials?</h2>
          <p className="text-white/70 text-sm max-w-md mx-auto mb-6">
            Log in directly to access doctor consultation dashboards, triage queues, lab panels, or administration desk.
          </p>
          <Link
            href="/login"
            className="inline-block bg-cyan text-navy font-bold px-8 py-3.5 rounded-xl hover:opacity-90 transition-opacity no-underline shadow-lg text-sm"
          >
            Access Staff Portal →
          </Link>
        </div>
      </main>

      <MarketingFooter />
    </div>
  );
}
