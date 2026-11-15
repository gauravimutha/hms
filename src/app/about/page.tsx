import React from "react";
import Link from "next/link";
import MarketingNavbar from "@/components/MarketingNavbar";
import MarketingFooter from "@/components/MarketingFooter";
import { constructMetadata, getBreadcrumbSchema, getOrganizationSchema } from "@/lib/seo";

export const metadata = constructMetadata({
  title: "About BizLume HMS | Clinician-First Healthcare Technology India",
  description: "Learn about BizLume HMS, our mission to modernize hospital operations across India, and how we build AI-assisted, high-performance EMR software for healthcare practitioners.",
  path: "/about",
  keywords: [
    "About BizLume",
    "Hospital Management Software Company India",
    "Healthcare Tech India",
    "BizLume Technology and Solutions",
  ],
});

export default function AboutPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "About", url: "/about" },
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
          <span className="text-navy font-bold">About Us</span>
        </nav>

        <div className="mb-14">
          <span className="inline-block px-3.5 py-1 rounded-full bg-cyan/10 border border-cyan/20 text-cyan text-[11px] font-bold tracking-widest uppercase mb-4">
            Our Purpose & Vision
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-navy tracking-tight leading-tight mb-6">
            Modernizing Healthcare Through Clinician-First Software
          </h1>
          <p className="text-lg text-grey font-light leading-relaxed">
            BizLume HMS was conceived to resolve one of the most pressing challenges in Indian healthcare: administrative friction. Traditional hospital enterprise systems are notoriously slow, bloated, and distracting during clinical encounters.
          </p>
        </div>

        {/* Core Principles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="bg-white border border-soft-blue rounded-3xl p-7 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-cyan/10 text-cyan flex items-center justify-center font-black mb-4">
              01
            </div>
            <h2 className="text-lg font-bold text-navy mb-2">Clinician-Centric UX</h2>
            <p className="text-xs text-grey leading-relaxed font-light">
              Engineered so doctors spend less time clicking dropdowns and more time caring for patients during consultations.
            </p>
          </div>

          <div className="bg-white border border-soft-blue rounded-3xl p-7 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-cyan/10 text-cyan flex items-center justify-center font-black mb-4">
              02
            </div>
            <h2 className="text-lg font-bold text-navy mb-2">Algorithmic Queueing</h2>
            <p className="text-xs text-grey leading-relaxed font-light">
              Dynamic triage queue scoring to ensure acute emergencies are addressed immediately while routine walk-ins avoid starvation.
            </p>
          </div>

          <div className="bg-white border border-soft-blue rounded-3xl p-7 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-cyan/10 text-cyan flex items-center justify-center font-black mb-4">
              03
            </div>
            <h2 className="text-lg font-bold text-navy mb-2">Transparent Operations</h2>
            <p className="text-xs text-grey leading-relaxed font-light">
              Interconnected patient registration, EMR, laboratory, and billing modules eliminating revenue leakages and diagnostic confusion.
            </p>
          </div>
        </div>

        {/* E-E-A-T Trust Section */}
        <div className="bg-white border border-soft-blue rounded-3xl p-8 sm:p-12 mb-16 shadow-sm">
          <h2 className="text-2xl font-black text-navy mb-4">Data Governance & Technical Integrity</h2>
          <p className="text-sm text-grey font-light leading-relaxed mb-6">
            BizLume operates on modern PostgreSQL data foundations with automated schema verification, cryptographically validated JWT session layers, and fine-grained Role-Based Access Controls (RBAC) separating administrative, clinical, triage, and diagnostic workflows.
          </p>
          <div className="flex flex-wrap gap-3">
            <span className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-light-grey border border-soft-blue text-navy">
              Encrypted Session Tokens
            </span>
            <span className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-light-grey border border-soft-blue text-navy">
              PostgreSQL Data Isolation
            </span>
            <span className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-light-grey border border-soft-blue text-navy">
              Assistive Non-Autonomous AI
            </span>
            <span className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-light-grey border border-soft-blue text-navy">
              Razorpay Payment Security
            </span>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-navy text-white rounded-3xl p-8 sm:p-12 text-center">
          <h2 className="text-2xl font-black mb-3">Partner with BizLume Technology & Solutions</h2>
          <p className="text-white/70 text-sm max-w-md mx-auto mb-6">
            Contact us for institutional inquiries, custom deployments, or to schedule a live demonstration.
          </p>
          <a
            href="mailto:contact@bizlume.in"
            className="inline-block bg-cyan text-navy font-bold px-8 py-3.5 rounded-xl hover:opacity-90 transition-opacity no-underline shadow-lg text-sm"
          >
            Email contact@bizlume.in
          </a>
        </div>
      </main>

      <MarketingFooter />
    </div>
  );
}
