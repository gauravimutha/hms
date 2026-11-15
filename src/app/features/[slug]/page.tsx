import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import MarketingNavbar from "@/components/MarketingNavbar";
import MarketingFooter from "@/components/MarketingFooter";
import { FEATURES_DATA } from "@/lib/seoData";
import { constructMetadata, getBreadcrumbSchema, getFAQSchema, getSoftwareApplicationSchema } from "@/lib/seo";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return Object.keys(FEATURES_DATA).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const feature = FEATURES_DATA[slug];
  if (!feature) return {};

  return constructMetadata({
    title: feature.seoTitle,
    description: feature.description,
    path: `/features/${slug}`,
    keywords: [
      feature.title,
      `${feature.title} India`,
      "Hospital Management Software India",
      "EMR Software India",
      "BizLume HMS",
    ],
  });
}

export default async function FeatureDetailPage({ params }: Props) {
  const { slug } = await params;
  const feature = FEATURES_DATA[slug];

  if (!feature) {
    notFound();
  }

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Features", url: "/features/clinical-emr" },
    { name: feature.title, url: `/features/${slug}` },
  ]);
  const faqSchema = getFAQSchema(feature.faqs);
  const appSchema = getSoftwareApplicationSchema();

  return (
    <div className="min-h-screen bg-light-grey text-dark font-sans flex flex-col justify-between">
      {/* Structured Data Script */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([breadcrumbSchema, faqSchema, appSchema]) }}
      />

      <MarketingNavbar />

      <main className="pt-24 sm:pt-32 pb-16 sm:pb-24 px-4 sm:px-6 max-w-5xl mx-auto w-full min-w-0">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-2 text-xs font-semibold text-grey">
          <Link href="/" className="hover:text-navy transition-colors no-underline">
            Home
          </Link>
          <span>/</span>
          <span className="text-navy font-bold">{feature.title}</span>
        </nav>

        {/* Hero Section */}
        <div className="mb-12 sm:mb-14">
          <span className="inline-block px-3.5 py-1 rounded-full bg-cyan/10 border border-cyan/20 text-cyan text-[11px] font-bold tracking-widest uppercase mb-4">
            {feature.badge}
          </span>
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-navy tracking-tight leading-tight mb-4 sm:mb-6">
            {feature.h1}
          </h1>
          <p className="text-base sm:text-lg text-grey font-light leading-relaxed max-w-3xl">
            {feature.overview}
          </p>
          <div className="mt-8 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
            <a
              href="mailto:contact@bizlume.in?subject=Demo%20Request%20for%20BizLume%20HMS"
              className="w-full sm:w-auto text-center bg-navy text-white px-7 py-3.5 rounded-xl font-bold text-sm hover:bg-cyan hover:text-navy transition-all duration-200 no-underline shadow-md"
            >
              Book a Personalized Demo →
            </a>
            <Link
              href="/login"
              className="w-full sm:w-auto text-center bg-white border border-soft-blue text-navy px-6 py-3.5 rounded-xl font-bold text-sm hover:border-cyan transition-all duration-200 no-underline"
            >
              Staff Portal Access
            </Link>
          </div>
        </div>

        {/* Highlights / Capabilities */}
        <div className="mb-12 sm:mb-16 bg-white border border-soft-blue rounded-3xl p-6 sm:p-12 shadow-sm">
          <h2 className="text-xl sm:text-2xl font-black text-navy mb-6">Key Clinical Capabilities</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
            {feature.highlights.map((item, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-cyan/15 text-cyan flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                  ✓
                </span>
                <span className="text-xs sm:text-sm text-dark font-medium leading-relaxed">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Workflow Steps */}
        <div className="mb-12 sm:mb-16">
          <h2 className="text-xl sm:text-2xl font-black text-navy mb-6 sm:mb-8 text-center sm:text-left">
            How It Works in Hospital Workflow
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
            {feature.workflowSteps.map((step) => (
              <div key={step.step} className="bg-white border border-soft-blue rounded-2xl p-5 sm:p-7 relative">
                <span className="text-3xl font-black text-cyan/30 block mb-2">{step.step}</span>
                <h3 className="text-base font-bold text-navy mb-2">{step.title}</h3>
                <p className="text-xs text-grey leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQs */}
        <div className="mb-12 sm:mb-16">
          <h2 className="text-xl sm:text-2xl font-black text-navy mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {feature.faqs.map((faq, idx) => (
              <div key={idx} className="bg-white border border-soft-blue rounded-2xl p-5 sm:p-6">
                <h3 className="text-base font-bold text-navy mb-2">{faq.question}</h3>
                <p className="text-xs sm:text-sm text-grey leading-relaxed font-light">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact CTA Banner */}
        <div className="bg-navy text-white rounded-3xl p-6 sm:p-12 text-center relative overflow-hidden">
          <h3 className="text-xl sm:text-3xl font-black mb-3">Ready to Deploy in Your Healthcare Facility?</h3>
          <p className="text-white/70 text-xs sm:text-sm max-w-lg mx-auto mb-6">
            Discover how BizLume HMS modernizes patient intake, EMR documentation, and revenue cycle management.
          </p>
          <a
            href="mailto:contact@bizlume.in"
            className="inline-block w-full sm:w-auto bg-cyan text-navy font-bold px-6 sm:px-8 py-3.5 rounded-xl hover:opacity-90 transition-opacity no-underline shadow-lg shadow-cyan/20 text-sm break-all"
          >
            Contact our Solutions Team (contact@bizlume.in)
          </a>
        </div>
      </main>

      <MarketingFooter />
    </div>
  );
}
