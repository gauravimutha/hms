import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import MarketingNavbar from "@/components/MarketingNavbar";
import MarketingFooter from "@/components/MarketingFooter";
import { SOLUTIONS_DATA } from "@/lib/seoData";
import { constructMetadata, getBreadcrumbSchema, getFAQSchema, getSoftwareApplicationSchema } from "@/lib/seo";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return Object.keys(SOLUTIONS_DATA).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const solution = SOLUTIONS_DATA[slug];
  if (!solution) return {};

  return constructMetadata({
    title: solution.seoTitle,
    description: solution.description,
    path: `/solutions/${slug}`,
    keywords: [
      solution.title,
      `${solution.title} India`,
      "Hospital Software India",
      "Healthcare Management Systems",
      "BizLume HMS",
    ],
  });
}

export default async function SolutionDetailPage({ params }: Props) {
  const { slug } = await params;
  const solution = SOLUTIONS_DATA[slug];

  if (!solution) {
    notFound();
  }

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Solutions", url: "/solutions/multi-specialty-hospitals" },
    { name: solution.title, url: `/solutions/${slug}` },
  ]);
  const faqSchema = getFAQSchema(solution.faqs);
  const appSchema = getSoftwareApplicationSchema();

  return (
    <div className="min-h-screen bg-light-grey text-dark font-sans flex flex-col justify-between">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([breadcrumbSchema, faqSchema, appSchema]) }}
      />

      <MarketingNavbar />

      <main className="pt-32 pb-24 px-6 max-w-5xl mx-auto w-full">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs font-semibold text-grey">
          <Link href="/" className="hover:text-navy transition-colors no-underline">
            Home
          </Link>
          <span>/</span>
          <span className="text-navy font-bold">{solution.title}</span>
        </nav>

        {/* Hero */}
        <div className="mb-14">
          <span className="inline-block px-3.5 py-1 rounded-full bg-cyan/10 border border-cyan/20 text-cyan text-[11px] font-bold tracking-widest uppercase mb-4">
            {solution.badge}
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-navy tracking-tight leading-tight mb-6">
            {solution.title}
          </h1>
          <p className="text-lg text-grey font-light leading-relaxed max-w-3xl">
            {solution.heroText}
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="mailto:contact@bizlume.in?subject=Solution%20Inquiry%20for%20BizLume%20HMS"
              className="bg-navy text-white px-7 py-3.5 rounded-xl font-bold text-sm hover:bg-cyan hover:text-navy transition-all duration-200 no-underline shadow-md"
            >
              Request Custom Demo →
            </a>
            <Link
              href="/login"
              className="bg-white border border-soft-blue text-navy px-6 py-3.5 rounded-xl font-bold text-sm hover:border-cyan transition-all duration-200 no-underline"
            >
              Explore Staff Portals
            </Link>
          </div>
        </div>

        {/* Pain Points Solved */}
        <div className="mb-16">
          <h2 className="text-2xl font-black text-navy mb-8">Clinical Bottlenecks We Eliminate</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {solution.painPoints.map((item, idx) => (
              <div key={idx} className="bg-white border border-soft-blue rounded-3xl p-7 shadow-sm">
                <div className="mb-4">
                  <span className="text-xs font-bold text-status-red uppercase tracking-wider block mb-1">
                    The Challenge
                  </span>
                  <p className="text-sm font-semibold text-dark leading-relaxed">{item.problem}</p>
                </div>
                <div className="pt-4 border-t border-soft-blue">
                  <span className="text-xs font-bold text-cyan uppercase tracking-wider block mb-1">
                    The BizLume Solution
                  </span>
                  <p className="text-sm text-grey font-light leading-relaxed">{item.solution}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Modules Included */}
        <div className="mb-16 bg-white border border-soft-blue rounded-3xl p-8 sm:p-12 shadow-sm">
          <h2 className="text-2xl font-black text-navy mb-6">Integrated Modules in this Edition</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {solution.featuresIncluded.map((feat, idx) => (
              <div key={idx} className="flex items-center gap-3 p-3 bg-light-grey rounded-xl border border-soft-blue">
                <span className="w-6 h-6 rounded-lg bg-cyan text-white flex items-center justify-center text-xs font-bold shrink-0">
                  ✓
                </span>
                <span className="text-sm font-bold text-navy">{feat}</span>
              </div>
            ))}
          </div>
        </div>

        {/* FAQs */}
        <div className="mb-16">
          <h2 className="text-2xl font-black text-navy mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {solution.faqs.map((faq, idx) => (
              <div key={idx} className="bg-white border border-soft-blue rounded-2xl p-6">
                <h3 className="text-base font-bold text-navy mb-2">{faq.question}</h3>
                <p className="text-sm text-grey leading-relaxed font-light">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-navy text-white rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden">
          <h3 className="text-2xl sm:text-3xl font-black mb-3">Speak with a Healthcare Solutions Specialist</h3>
          <p className="text-white/70 text-sm max-w-lg mx-auto mb-6">
            Get an architecture review and custom rollout schedule for your clinic or hospital network.
          </p>
          <a
            href="mailto:contact@bizlume.in"
            className="inline-block bg-cyan text-navy font-bold px-8 py-3.5 rounded-xl hover:opacity-90 transition-opacity no-underline shadow-lg shadow-cyan/20 text-sm"
          >
            Email contact@bizlume.in
          </a>
        </div>
      </main>

      <MarketingFooter />
    </div>
  );
}
