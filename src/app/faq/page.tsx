import React from "react";
import Link from "next/link";
import MarketingNavbar from "@/components/MarketingNavbar";
import MarketingFooter from "@/components/MarketingFooter";
import { constructMetadata, getBreadcrumbSchema, getFAQSchema } from "@/lib/seo";

export const metadata = constructMetadata({
  title: "Frequently Asked Questions (FAQ) | Hospital Software & EMR",
  description: "Find clear answers about BizLume HMS: security standards, deployment options, EMR workflows, hardware requirements, and onboarding across Indian hospitals.",
  path: "/faq",
  keywords: [
    "Hospital Software FAQ",
    "EMR Software India Questions",
    "Hospital Management System Implementation",
    "BizLume HMS Support",
  ],
});

const GENERAL_FAQS = [
  {
    question: "What is BizLume HMS?",
    answer: "BizLume HMS is a clinician-first, AI-assisted Hospital Management System built for hospitals, nursing homes, polyclinics, and diagnostic centers across India. It integrates patient intake, smart queue triage, clinical EMR, lab test order dispatch, and OP billing into a high-speed web application."
  },
  {
    question: "Does BizLume HMS require on-premise servers?",
    answer: "No. BizLume runs as a modern, high-availability web platform that can be accessed securely through standard web browsers on hospital workstations, tablets, and laptops without expensive local hardware maintenance."
  },
  {
    question: "How does the Smart Queue Management system prioritize patients?",
    answer: "BizLume features an algorithmic prioritization engine (src/lib/queueScore.ts) combining clinical triage criticality (High/Medium/Low), cumulative wait time to avoid starvation, appointment slot time windows, and manual receptionist override switches."
  },
  {
    question: "Is patient medical data kept confidential and secure?",
    answer: "Yes. BizLume enforces cryptographically signed JWT sessions, TLS in transit, database connection pooling, and strict Role-Based Access Control (RBAC) ensuring front-desk receptionists cannot view private medical records while doctors and administrators retain appropriate clinical access."
  },
  {
    question: "Can BizLume HMS integrate with digital payments in India?",
    answer: "Yes, BizLume integrates with Razorpay, allowing patients and front-desk cashiers to settle OPD registration fees and pharmacy bills using UPI (Google Pay, PhonePe, Paytm), credit/debit cards, and net banking."
  },
  {
    question: "How long does staff onboarding and rollout take?",
    answer: "Because BizLume was engineered with an intuitive, uncluttered user experience tailored specifically to Indian healthcare roles, most front-desk and clinical staff can become fully proficient in under 48 hours."
  }
];

export default function FAQPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "FAQ", url: "/faq" },
  ]);
  const faqSchema = getFAQSchema(GENERAL_FAQS);

  return (
    <div className="min-h-screen bg-light-grey text-dark font-sans flex flex-col justify-between">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([breadcrumbSchema, faqSchema]) }}
      />

      <MarketingNavbar />

      <main className="pt-32 pb-24 px-6 max-w-4xl mx-auto w-full">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs font-semibold text-grey">
          <Link href="/" className="hover:text-navy transition-colors no-underline">
            Home
          </Link>
          <span>/</span>
          <span className="text-navy font-bold">Frequently Asked Questions</span>
        </nav>

        <div className="text-center mb-14">
          <span className="inline-block px-3.5 py-1 rounded-full bg-cyan/10 border border-cyan/20 text-cyan text-[11px] font-bold tracking-widest uppercase mb-4">
            Knowledge Base & Support
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-navy tracking-tight mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-base text-grey font-light max-w-xl mx-auto">
            Everything medical directors, clinic administrators, and doctors need to know about BizLume HMS.
          </p>
        </div>

        <div className="space-y-4 mb-16">
          {GENERAL_FAQS.map((faq, idx) => (
            <div key={idx} className="bg-white border border-soft-blue rounded-2xl p-7 shadow-sm">
              <h2 className="text-base sm:text-lg font-bold text-navy mb-2">{faq.question}</h2>
              <p className="text-sm text-grey font-light leading-relaxed">{faq.answer}</p>
            </div>
          ))}
        </div>

        <div className="bg-navy text-white rounded-3xl p-8 sm:p-12 text-center">
          <h2 className="text-2xl font-black mb-3">Have Additional Operational or Technical Questions?</h2>
          <p className="text-white/70 text-sm max-w-md mx-auto mb-6">
            Our clinical systems engineering group is available to answer infrastructure, migration, and workflow questions.
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
