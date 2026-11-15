import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import MarketingNavbar from "@/components/MarketingNavbar";
import MarketingFooter from "@/components/MarketingFooter";
import { LOCATIONS_DATA } from "@/lib/seoData";
import { constructMetadata, getBreadcrumbSchema, getFAQSchema, getSoftwareApplicationSchema } from "@/lib/seo";

interface Props {
  params: Promise<{ city: string }>;
}

export async function generateStaticParams() {
  return Object.keys(LOCATIONS_DATA).map((city) => ({ city }));
}

export async function generateMetadata({ params }: Props) {
  const { city } = await params;
  const location = LOCATIONS_DATA[city];
  if (!location) return {};

  return constructMetadata({
    title: location.seoTitle,
    description: location.description,
    path: `/locations/${city}`,
    keywords: [
      `Hospital Management Software ${location.cityName}`,
      `Clinic Management Software in ${location.cityName}`,
      `Best Hospital Software ${location.cityName}`,
      `EMR System ${location.cityName}`,
      "BizLume HMS India",
    ],
  });
}

export default async function LocationDetailPage({ params }: Props) {
  const { city } = await params;
  const location = LOCATIONS_DATA[city];

  if (!location) {
    notFound();
  }

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Locations", url: "/locations/mumbai" },
    { name: location.cityName, url: `/locations/${city}` },
  ]);
  const faqSchema = getFAQSchema(location.faqs);
  const appSchema = getSoftwareApplicationSchema();

  return (
    <div className="min-h-screen bg-light-grey text-dark font-sans flex flex-col justify-between">
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
          <span className="text-navy font-bold">{location.cityName}</span>
        </nav>

        {/* Hero */}
        <div className="mb-12 sm:mb-14">
          <span className="inline-block px-3.5 py-1 rounded-full bg-cyan/10 border border-cyan/20 text-cyan text-[11px] font-bold tracking-widest uppercase mb-4">
            Regional Healthcare Hub &middot; {location.state}
          </span>
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-navy tracking-tight leading-tight mb-4 sm:mb-6">
            Hospital Management Software in {location.cityName}
          </h1>
          <p className="text-base sm:text-lg text-grey font-light leading-relaxed max-w-3xl mb-6">
            {location.healthcareContext}
          </p>
          <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
            <a
              href={`mailto:contact@bizlume.in?subject=Demo%20Request%20for%20BizLume%20HMS%20in%20${location.cityName}`}
              className="w-full sm:w-auto text-center bg-navy text-white px-7 py-3.5 rounded-xl font-bold text-sm hover:bg-cyan hover:text-navy transition-all duration-200 no-underline shadow-md"
            >
              Schedule {location.cityName} Demonstration →
            </a>
            <Link
              href="/features/clinical-emr"
              className="w-full sm:w-auto text-center bg-white border border-soft-blue text-navy px-6 py-3.5 rounded-xl font-bold text-sm hover:border-cyan transition-all duration-200 no-underline"
            >
              Explore Core Capabilities
            </Link>
          </div>
        </div>

        {/* Key Challenges Addressed */}
        <div className="mb-12 sm:mb-16 bg-white border border-soft-blue rounded-3xl p-6 sm:p-12 shadow-sm">
          <h2 className="text-xl sm:text-2xl font-black text-navy mb-6">
            Operational Demands Addressed in {location.cityName}
          </h2>
          <div className="space-y-3 sm:space-y-4">
            {location.keyChallengesAddressed.map((challenge, idx) => (
              <div key={idx} className="flex items-start gap-3 sm:gap-3.5 p-3 sm:p-3.5 bg-light-grey rounded-2xl border border-soft-blue">
                <span className="w-6 h-6 rounded-lg bg-cyan text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                  ✓
                </span>
                <span className="text-xs sm:text-sm font-medium text-dark leading-relaxed">{challenge}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Suitable Facilities */}
        <div className="mb-12 sm:mb-16">
          <h2 className="text-xl sm:text-2xl font-black text-navy mb-6">Applicable Healthcare Environments</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
            {location.suitableFacilities.map((fac, idx) => (
              <div key={idx} className="bg-white border border-soft-blue rounded-2xl p-5 sm:p-6 shadow-sm">
                <span className="text-xs font-bold text-cyan uppercase tracking-wider block mb-2">Category</span>
                <h3 className="text-sm font-bold text-navy leading-snug">{fac}</h3>
              </div>
            ))}
          </div>
        </div>

        {/* FAQs */}
        <div className="mb-12 sm:mb-16">
          <h2 className="text-xl sm:text-2xl font-black text-navy mb-6">
            Local Deployment & Compliance FAQs
          </h2>
          <div className="space-y-4">
            {location.faqs.map((faq, idx) => (
              <div key={idx} className="bg-white border border-soft-blue rounded-2xl p-5 sm:p-6">
                <h3 className="text-base font-bold text-navy mb-2">{faq.question}</h3>
                <p className="text-xs sm:text-sm text-grey leading-relaxed font-light">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-navy text-white rounded-3xl p-6 sm:p-12 text-center relative overflow-hidden">
          <h3 className="text-xl sm:text-3xl font-black mb-3">
            Equip Your Facility in {location.cityName} with BizLume HMS
          </h3>
          <p className="text-white/70 text-xs sm:text-sm max-w-lg mx-auto mb-6">
            Contact our engineering and clinical onboarding group for tailored deployment timelines and live demo trials.
          </p>
          <a
            href="mailto:contact@bizlume.in"
            className="inline-block w-full sm:w-auto bg-cyan text-navy font-bold px-6 sm:px-8 py-3.5 rounded-xl hover:opacity-90 transition-opacity no-underline shadow-lg shadow-cyan/20 text-sm break-all"
          >
            Inquire at contact@bizlume.in
          </a>
        </div>
      </main>

      <MarketingFooter />
    </div>
  );
}
