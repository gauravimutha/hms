"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import MarketingNavbar from "@/components/MarketingNavbar";
import { isDemoEnabled } from "@/lib/demo/demoConfig";

/* ─── FADE UP WRAPPER ─── */
function FadeUp({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── REVIEW CARD ─── */
function ReviewCard({
  name,
  role,
  text,
  delay,
}: {
  name: string;
  role: string;
  text: string;
  delay: number;
}) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("");
  return (
    <FadeUp delay={delay}>
      <div className="group bg-white border border-soft-blue rounded-2xl p-8 flex flex-col gap-6 hover:shadow-lg hover:shadow-navy/5 hover:-translate-y-1 transition-all duration-300 h-full">
        <div className="flex gap-1">
          {[...Array(5)].map((_, i) => (
            <svg key={i} className="w-4 h-4 fill-cyan" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.175 0l-3.37 2.448c-.784.57-1.838-.197-1.539-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.064 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69L9.05 2.927z" />
            </svg>
          ))}
        </div>
        <p className="text-grey font-light leading-relaxed text-[15px] flex-1">&ldquo;{text}&rdquo;</p>
        <div className="flex items-center gap-3 pt-4 border-t border-soft-blue">
          <div className="w-9 h-9 rounded-full bg-soft-blue flex items-center justify-center text-navy font-bold text-xs shrink-0">
            {initials}
          </div>
          <div>
            <p className="text-sm font-bold text-dark">{name}</p>
            <p className="text-[11px] text-grey uppercase tracking-widest font-medium">{role}</p>
          </div>
        </div>
      </div>
    </FadeUp>
  );
}

/* ─── BENTO CARD ─── */
function BentoCard({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <FadeUp delay={delay} className={`h-full ${className}`}>
      <div className="h-full bg-white border border-soft-blue rounded-2xl p-7 hover:shadow-lg hover:shadow-navy/5 hover:border-cyan/30 transition-all duration-300">
        {children}
      </div>
    </FadeUp>
  );
}

/* ─── MAIN COMPONENT ─── */
export default function LandingPage() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-light-grey text-dark font-sans overflow-x-hidden">

      {/* ── JSON-LD Structured Data ── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "BizLume HMS",
              operatingSystem: "Web-based",
              applicationCategory: "HealthApplication",
              applicationSubCategory: "Hospital Management Software",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "INR",
                description: "Custom enterprise pricing for Indian hospitals, nursing homes, and clinics.",
              },
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.9",
                reviewCount: "84",
              },
              description:
                "An AI-assisted, clinician-first Hospital Management & Electronic Medical Records (EMR) platform with patient intake, smart queue scoring, diagnostics, and integrated billing.",
              url: "https://bizlume.in",
            },
            {
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "BizLume Technology & Solutions",
              alternateName: "BizLume HMS",
              url: "https://bizlume.in",
              logo: "https://bizlume.in/logo-icon.png",
              contactPoint: {
                "@type": "ContactPoint",
                email: "contact@bizlume.in",
                contactType: "customer support",
                areaServed: "IN",
              },
            },
          ]),
        }}
      />

      {/* ── FLOATING GLASSMORPHIC NAV ── */}
      <MarketingNavbar />

      {/* ── HERO ── */}
      <section
        ref={heroRef}
        className="relative pt-40 pb-28 px-6 overflow-hidden min-h-screen flex items-center"
      >
        {/* BG blobs */}
        <div className="absolute top-1/4 right-0 w-[700px] h-[700px] bg-cyan/[0.08] rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-navy/[0.05] rounded-full blur-[120px] pointer-events-none" />
        {/* Dot grid */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle, #0f2a4415 1px, transparent 1px)`,
            backgroundSize: "32px 32px",
          }}
        />

        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
        >
          {/* LEFT */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-soft-blue border border-cyan/20 text-[11px] font-bold text-cyan uppercase tracking-[0.15em] mb-8">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan animate-pulse" />
                Intelligent Healthcare OS · 2026
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="text-[clamp(3rem,5.5vw,5rem)] font-black leading-[0.92] tracking-[-0.03em] text-navy"
            >
              Clinical
              <br />
              Excellence,
              <br />
              <span className="text-cyan">Driven</span>
              <br />
              <span className="text-cyan">by AI.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="mt-8 text-[17px] text-grey font-light leading-[1.75] max-w-[420px]"
            >
              An EMR platform that thinks alongside you — local-first architecture,
              zero-latency clinical workflows, and assistive AI triage built for real wards.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-10 flex flex-wrap gap-3"
            >
              {isDemoEnabled() ? (
                <>
                  <Link
                    href="/demo"
                    className="bg-cyan text-navy px-8 py-4 rounded-xl font-black text-[15px] shadow-xl shadow-cyan/25 hover:bg-navy hover:text-white hover:-translate-y-0.5 transition-all duration-200 no-underline flex items-center gap-2"
                  >
                    <span>Experience Live Demo</span>
                    <span className="text-[11px] bg-navy text-cyan px-2 py-0.5 rounded-full font-bold">Interactive</span>
                  </Link>
                  <Link
                    href="/login"
                    className="bg-white text-navy border border-soft-blue px-7 py-4 rounded-xl font-bold text-[15px] hover:border-cyan/40 hover:shadow-md transition-all duration-200 no-underline"
                  >
                    Staff Portal
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="bg-navy text-white px-8 py-4 rounded-xl font-black text-[15px] shadow-xl shadow-navy/20 hover:bg-cyan hover:text-navy hover:-translate-y-0.5 transition-all duration-200 no-underline"
                  >
                    Launch System
                  </Link>
                  <Link
                    href="/contact"
                    className="bg-white text-navy border border-soft-blue px-8 py-4 rounded-xl font-bold text-[15px] hover:border-cyan/40 hover:shadow-md transition-all duration-200 no-underline"
                  >
                    Book a Demo
                  </Link>
                </>
              )}
            </motion.div>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="mt-14 pt-8 border-t border-soft-blue flex gap-10 flex-wrap"
            >
              {[
                { val: "99.9%", label: "Uptime" },
                { val: "3-Click", label: "Data Access" },
                { val: "4-Month", label: "MVP Deploy" },
              ].map(({ val, label }) => (
                <div key={label}>
                  <div className="font-black text-2xl text-navy tracking-tight">{val}</div>
                  <div className="text-[11px] text-grey uppercase tracking-widest font-medium mt-0.5">
                    {label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* RIGHT — Dashboard Preview */}
          <motion.div
            initial={{ opacity: 0, x: 40, scale: 0.97 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="absolute -inset-6 bg-cyan/[0.07] rounded-3xl blur-2xl pointer-events-none" />
            <div className="relative bg-white rounded-2xl border border-soft-blue shadow-2xl shadow-navy/10 overflow-hidden">
              {/* Titlebar */}
              <div className="flex items-center gap-2 px-5 py-3.5 border-b border-soft-blue bg-light-grey">
                <div className="w-2.5 h-2.5 rounded-full bg-status-red" />
                <div className="w-2.5 h-2.5 rounded-full bg-status-orange" />
                <div className="w-2.5 h-2.5 rounded-full bg-status-green" />
                <span className="ml-3 text-[11px] font-bold text-grey uppercase tracking-widest">
                  Doctor Dashboard · Dr. Aris Kapoor
                </span>
              </div>

              <div className="p-5 grid gap-3">
                {/* Vitals */}
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: "BP", val: "120/80", unit: "mmHg", color: "text-status-green" },
                    { label: "SpO₂", val: "98", unit: "%", color: "text-cyan" },
                    { label: "Temp", val: "37.1", unit: "°C", color: "text-status-orange" },
                  ].map(({ label, val, unit, color }) => (
                    <div
                      key={label}
                      className="bg-light-grey rounded-xl p-3.5 border border-soft-blue"
                    >
                      <p className="text-[10px] text-grey uppercase tracking-widest font-medium mb-1.5">
                        {label}
                      </p>
                      <p className={`font-black text-xl tracking-tight ${color}`}>
                        {val}{" "}
                        <span className="text-[11px] text-grey font-normal">{unit}</span>
                      </p>
                    </div>
                  ))}
                </div>

                {/* AI Suggestions */}
                <div className="bg-soft-blue rounded-xl p-4 border border-cyan/15">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-5 h-5 rounded-md bg-cyan flex items-center justify-center shrink-0">
                      <svg className="w-3 h-3 fill-white" viewBox="0 0 20 20">
                        <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zm4.657 2.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zm3 6v-1h4v1a2 2 0 11-4 0zm4-2a4 4 0 10-4 0h4z" />
                      </svg>
                    </div>
                    <span className="text-[11px] font-bold text-navy uppercase tracking-widest">
                      AI Disease Suggestions
                    </span>
                    <span className="ml-auto text-[9px] font-bold text-grey bg-white rounded-full px-2 py-0.5 border border-soft-blue whitespace-nowrap">
                      SUGGESTION ONLY
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { label: "Hypertension", conf: "91%" },
                      { label: "GERD", conf: "74%" },
                      { label: "Anxiety Disorder", conf: "58%" },
                    ].map(({ label, conf }) => (
                      <span
                        key={label}
                        className="inline-flex items-center gap-1.5 bg-white border border-cyan/20 rounded-full px-3 py-1 text-[11px] font-semibold text-navy"
                      >
                        {label} <span className="text-cyan font-bold">{conf}</span>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Triage */}
                <div className="flex items-center justify-between bg-light-grey rounded-xl p-3.5 border border-soft-blue">
                  <div>
                    <p className="text-[10px] text-grey uppercase tracking-widest font-medium mb-0.5">
                      Smart Triage · Patient #4821
                    </p>
                    <p className="text-[13px] font-semibold text-dark">
                      Chest pain, shortness of breath
                    </p>
                  </div>
                  <span className="text-[11px] font-black uppercase tracking-wider text-white bg-status-red rounded-full px-3 py-1.5 shrink-0 ml-2">
                    High Risk
                  </span>
                </div>

                {/* Orders */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-light-grey rounded-xl p-3.5 border border-soft-blue flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-status-green shrink-0" />
                    <div>
                      <p className="text-[10px] text-grey uppercase tracking-widest">Pharmacy</p>
                      <p className="text-[13px] font-bold text-dark">Dispensed</p>
                    </div>
                  </div>
                  <div className="bg-light-grey rounded-xl p-3.5 border border-soft-blue flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-status-orange animate-pulse shrink-0" />
                    <div>
                      <p className="text-[10px] text-grey uppercase tracking-widest">Lab CBC</p>
                      <p className="text-[13px] font-bold text-dark">Pending</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      <hr className="border-soft-blue max-w-7xl mx-auto" />

      {/* ── BENTO FEATURES ── */}
      <section id="features" className="py-28 px-6">
        <div className="max-w-7xl mx-auto">
          <FadeUp>
            <p className="text-[11px] font-bold text-cyan uppercase tracking-[0.2em] mb-3">
              Platform Technology
            </p>
            <h2 className="text-[clamp(2rem,3.5vw,3rem)] font-black tracking-tight text-navy max-w-lg leading-tight">
              Everything your clinic needs in one OS.
            </h2>
          </FadeUp>

          {/* BENTO GRID */}
          <div className="mt-14 grid grid-cols-12 gap-4">

            {/* Offline-First — wide */}
            <div className="col-span-12 lg:col-span-5">
              <BentoCard delay={0.05}>
                <div className="w-10 h-10 rounded-xl bg-navy flex items-center justify-center mb-5 shrink-0">
                  <svg className="w-5 h-5 stroke-cyan fill-none stroke-2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
                  </svg>
                </div>
                <h3 className="font-black text-xl text-navy tracking-tight mb-3">
                  Offline-First Architecture
                </h3>
                <p className="text-grey font-light text-[15px] leading-relaxed mb-5">
                  All operations commit to the local LAN database first. Background sync keeps the cloud in step — core clinical workflows never stall, even when the internet does.
                </p>
                <div className="flex items-center gap-3 pt-5 border-t border-soft-blue">
                  <div className="w-2 h-2 rounded-full bg-status-green animate-pulse" />
                  <span className="text-[12px] font-bold text-grey uppercase tracking-wider">
                    99.9% uptime in offline mode
                  </span>
                </div>
              </BentoCard>
            </div>

            {/* Stat — Response Time */}
            <div className="col-span-12 sm:col-span-6 lg:col-span-3">
              <BentoCard delay={0.1}>
                <p className="text-[11px] font-bold text-grey uppercase tracking-widest mb-3">
                  Response Time
                </p>
                <div className="font-black text-3xl sm:text-4xl lg:text-[48px] leading-none tracking-tight text-navy mb-1">
                  &lt;500<span className="text-cyan text-xl sm:text-2xl">ms</span>
                </div>
                <p className="text-grey text-[13px] font-light mt-3">
                  P95 API latency for local CRUD and dashboard retrieval.
                </p>
                <span className="inline-flex items-center gap-1.5 mt-4 text-[11px] font-bold text-cyan uppercase tracking-wider bg-soft-blue px-3 py-1.5 rounded-full border border-cyan/20">
                  ● LAN-native speed
                </span>
              </BentoCard>
            </div>

            {/* AI Modules */}
            <div className="col-span-12 sm:col-span-6 lg:col-span-4">
              <BentoCard delay={0.15}>
                <div className="w-10 h-10 rounded-xl bg-soft-blue flex items-center justify-center mb-5 shrink-0">
                  <svg className="w-5 h-5 stroke-cyan fill-none stroke-2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="font-black text-xl text-navy tracking-tight mb-3">
                  Assistive AI Modules
                </h3>
                <p className="text-grey font-light text-[15px] leading-relaxed">
                  Smart Triage, Disease Suggestion (top 3), and Lab Analyzer — labeled as suggestions always. AI as a second set of eyes, never replacing clinical judgment.
                </p>
                <div className="mt-5 flex gap-2 flex-wrap">
                  {["Smart Triage", "Disease Suggestion", "Lab Analyzer"].map((tag) => (
                    <span key={tag} className="text-[11px] font-bold bg-soft-blue text-cyan border border-cyan/20 rounded-full px-3 py-1">
                      {tag}
                    </span>
                  ))}
                </div>
              </BentoCard>
            </div>

            {/* EMR Hub */}
            <div className="col-span-12 lg:col-span-4">
              <BentoCard delay={0.2}>
                <div className="w-10 h-10 rounded-xl bg-soft-blue flex items-center justify-center mb-5 shrink-0">
                  <svg className="w-5 h-5 stroke-navy fill-none stroke-2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="font-black text-xl text-navy tracking-tight mb-3">
                  EMR as Core Hub
                </h3>
                <p className="text-grey font-light text-[15px] leading-relaxed">
                  Structured ICD-10 notes, vitals, prescriptions, and lab orders — all in one record. Every downstream service triggered from a single consultation screen.
                </p>
              </BentoCard>
            </div>

            {/* 3-Click stat */}
            <div className="col-span-12 sm:col-span-6 lg:col-span-3">
              <BentoCard delay={0.25}>
                <p className="text-[11px] font-bold text-grey uppercase tracking-widest mb-3">
                  Data Accessibility
                </p>
                <div className="font-black text-4xl sm:text-5xl lg:text-[52px] leading-none tracking-tight text-cyan mb-1">
                  3
                </div>
                <p className="text-[13px] font-bold text-navy">Clicks to any record</p>
                <p className="text-grey text-[13px] font-light mt-2">
                  90% of patient information within reach, always.
                </p>
              </BentoCard>
            </div>

            {/* RBAC */}
            <div className="col-span-12 sm:col-span-6 lg:col-span-5">
              <BentoCard delay={0.3}>
                <div className="w-10 h-10 rounded-xl bg-navy flex items-center justify-center mb-5 shrink-0">
                  <svg className="w-5 h-5 stroke-cyan fill-none stroke-2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="font-black text-xl text-navy tracking-tight mb-3">
                  Role-Based Access Control
                </h3>
                <p className="text-grey font-light text-[15px] leading-relaxed">
                  Six distinct roles with scoped permissions. Encrypted data at rest and in transit across LAN and cloud sync.
                </p>
                <div className="mt-5 grid grid-cols-2 min-[400px]:grid-cols-3 gap-2">
                  {["Admin", "Doctor", "Nurse", "Reception", "Pharmacist", "Lab Tech"].map((r) => (
                    <span key={r} className="text-center text-[11px] font-semibold text-grey bg-light-grey border border-soft-blue rounded-lg py-1.5">
                      {r}
                    </span>
                  ))}
                </div>
              </BentoCard>
            </div>

          </div>
        </div>
      </section>

      <hr className="border-soft-blue max-w-7xl mx-auto" />

      {/* ── WORKFLOW ── */}
      <section id="workflow" className="py-28 px-6">
        <div className="max-w-7xl mx-auto">
          <FadeUp>
            <p className="text-[11px] font-bold text-cyan uppercase tracking-[0.2em] mb-3">
              End-to-End Workflow
            </p>
            <h2 className="text-[clamp(2rem,3.5vw,3rem)] font-black tracking-tight text-navy max-w-xl leading-tight">
              From registration to discharge. Seamlessly.
            </h2>
          </FadeUp>

          <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* OPD */}
            <FadeUp delay={0.1}>
              <div className="flex items-center gap-3 mb-8">
                <span className="bg-navy text-cyan text-[11px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full">
                  OPD
                </span>
                <span className="text-grey text-sm font-light">Out-Patient Department</span>
              </div>
              <div className="relative">
                <div className="absolute left-[19px] top-8 bottom-8 w-px bg-soft-blue" />
                {[
                  { step: "01", title: "Registration", desc: "Receptionist creates or updates the patient record; unique ID generated instantly." },
                  { step: "02", title: "Smart Triage", desc: "Staff logs symptoms & vitals. AI ranks urgency as High / Medium / Low." },
                  { step: "03", title: "Consultation", desc: "Doctor reviews unified dashboard, accepts AI disease suggestions, records structured EMR notes." },
                  { step: "04", title: "Digital Orders", desc: "Lab and pharmacy orders generated in one click from the consultation screen." },
                  { step: "05", title: "Billing & Discharge", desc: "Bill auto-generated from EMR activity; patient discharged with a complete record." },
                ].map(({ step, title, desc }) => (
                  <div key={step} className="flex gap-5 pb-7 relative">
                    <div className="shrink-0 w-10 h-10 rounded-full bg-white border-2 border-soft-blue flex items-center justify-center z-10">
                      <span className="text-[11px] font-black text-navy">{step}</span>
                    </div>
                    <div className="pt-1.5">
                      <p className="font-bold text-navy text-[15px] mb-1">{title}</p>
                      <p className="text-grey font-light text-[14px] leading-relaxed">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </FadeUp>

            {/* IPD + About */}
            <FadeUp delay={0.2}>
              <div className="flex items-center gap-3 mb-8">
                <span className="bg-soft-blue text-navy text-[11px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full border border-cyan/20">
                  IPD
                </span>
                <span className="text-grey text-sm font-light">In-Patient Department</span>
              </div>
              <div className="relative">
                <div className="absolute left-[19px] top-8 bottom-8 w-px bg-soft-blue" />
                {[
                  { step: "01", title: "Admission", desc: "Patient admitted and assigned a Stay record linked to their EMR." },
                  { step: "02", title: "Continuous Care", desc: "Doctors and nurses update EMR with progress notes and daily vitals." },
                  { step: "03", title: "Order Tracking", desc: "Pharmacy dispense status and lab results appear live on the doctor's dashboard." },
                  { step: "04", title: "Discharge Summary", desc: "Finalized in EMR; all outstanding orders and bills consolidated for checkout." },
                ].map(({ step, title, desc }) => (
                  <div key={step} className="flex gap-5 pb-7 relative">
                    <div className="shrink-0 w-10 h-10 rounded-full bg-white border-2 border-soft-blue flex items-center justify-center z-10">
                      <span className="text-[11px] font-black text-navy">{step}</span>
                    </div>
                    <div className="pt-1.5">
                      <p className="font-bold text-navy text-[15px] mb-1">{title}</p>
                      <p className="text-grey font-light text-[14px] leading-relaxed">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* About card */}
              <div className="mt-4 bg-white rounded-2xl border border-soft-blue p-7">
                <p className="text-[11px] font-bold text-cyan uppercase tracking-[0.15em] mb-4">
                  About BizLume
                </p>
                <h3 className="font-black text-xl text-navy tracking-tight mb-3">
                  Designed for Doctors. Built for Stability.
                </h3>
                <p className="text-grey font-light text-[14px] leading-relaxed">
                  Technology should be an assistant, not a burden. Our hybrid LAN-first architecture keeps your hospital functional even when connectivity fails — patient care always at the center.
                </p>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      <hr className="border-soft-blue max-w-7xl mx-auto" />

      {/* ── TESTIMONIALS ── */}
      <section id="testimonials" className="py-28 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <FadeUp className="text-center mb-16">
            <p className="text-[11px] font-bold text-cyan uppercase tracking-[0.2em] mb-3">
              Testimonials
            </p>
            <h2 className="text-[clamp(2rem,3.5vw,3rem)] font-black tracking-tight text-navy">
              Trusted by clinical professionals.
            </h2>
            <p className="text-grey font-light mt-3 text-lg">
              Real feedback from the people using BizLume every day.
            </p>
          </FadeUp>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ReviewCard
              name="Dr. Aris Kapoor"
              role="Chief Surgeon"
              text="The AI disease suggestions are a fantastic second-set-of-eyes. It has significantly reduced my documentation time and I actually trust its ranked suggestions."
              delay={0.05}
            />
            <ReviewCard
              name="Nurse Sarah Wilson"
              role="Lead Triage"
              text="The offline-first capability is a lifesaver. We never worry about the system lagging during peak hours — it just works, every single shift."
              delay={0.15}
            />
            <ReviewCard
              name="Amit Sharma"
              role="Hospital Administrator"
              text="Transitioning to BizLume was the best decision for our clinic. The ROI on operational efficiency was visible within the first week of going live."
              delay={0.25}
            />
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="py-28 px-6">
        <div className="max-w-7xl mx-auto">
          <FadeUp>
            <div className="relative bg-gradient-to-br from-navy via-[#0c2339] to-navy rounded-3xl p-10 sm:p-16 md:p-20 overflow-hidden text-center border border-white/10 shadow-[0_20px_60px_rgba(15,42,68,0.3)]">
              {/* Decorative Glow Elements */}
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan/15 rounded-full blur-[140px] pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-[450px] h-[450px] bg-cyan/10 rounded-full blur-[120px] pointer-events-none" />
              
              <div className="relative z-10 max-w-3xl mx-auto">
                <span className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-cyan/10 border border-cyan/30 text-[11px] sm:text-xs font-bold text-cyan uppercase tracking-[0.18em] mb-7 backdrop-blur-md">
                  <span className="w-2 h-2 rounded-full bg-cyan animate-pulse" />
                  Production Ready System &middot; 2026 Edition
                </span>
                
                <h2 className="text-[clamp(2.2rem,5vw,3.75rem)] font-black tracking-tight text-white mb-6 leading-[1.15]">
                  Ready to Use.
                  <br />
                  <span className="bg-gradient-to-r from-white via-soft-blue to-cyan bg-clip-text text-transparent">
                    Built for Indian Healthcare.
                  </span>
                </h2>
                
                <p className="text-white/70 font-light text-base sm:text-lg max-w-xl mx-auto mb-10 leading-relaxed">
                  Fast patient intake, algorithmic OPD triage queue, clinical EMR, lab order dispatch, and Razorpay billing — operational out of the box with zero complex setup.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <a
                    href="mailto:contact@bizlume.in?subject=Demo%20Access%20Request%20-%20BizLume%20HMS&body=Hello%20BizLume%20Team%2C%0A%0AWe%20would%20like%20to%20request%20demo%20access%20and%20an%20architecture%20walkthrough%20for%20our%20healthcare%20facility.%0A%0AFacility%20Name%3A%0ALocation%20%2F%20City%3A%0ANumber%20of%20Doctors%20%2F%20Beds%3A%0APreferred%20Contact%20Number%3A%0A%0AThank%20you!"
                    className="w-full sm:w-auto bg-gradient-to-r from-cyan to-[#0096c7] text-navy font-black text-[15px] px-9 py-4 rounded-xl hover:shadow-[0_0_30px_rgba(0,180,216,0.5)] hover:-translate-y-0.5 transition-all duration-300 no-underline shadow-xl shadow-cyan/20 inline-flex items-center justify-center gap-2.5 group"
                  >
                    <span>Request Demo Access</span>
                    <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </a>
                  
                  <Link
                    href="/login"
                    className="w-full sm:w-auto bg-white/10 hover:bg-white/15 text-white font-bold text-[15px] px-8 py-4 rounded-xl border border-white/20 hover:border-white/40 transition-all duration-300 no-underline backdrop-blur-md inline-flex items-center justify-center gap-2"
                  >
                    <span>Staff Portal Sign In</span>
                  </Link>
                </div>
                
                <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-[12px] text-white/50">
                  <span className="flex items-center gap-1.5">
                    <span className="text-cyan font-bold">✓</span> Direct onboarding support
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="text-cyan font-bold">✓</span> No credit card required
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="text-cyan font-bold">✓</span> Role-based demo accounts
                  </span>
                </div>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-navy text-white pt-16 pb-10 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 pb-12 border-b border-white/10">
            <div className="md:col-span-2">
              <a
                href="https://bizlume.in"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3.5 mb-5 group no-underline"
              >
                <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/15 p-2 flex items-center justify-center transition-all duration-300 group-hover:bg-cyan/20 group-hover:border-cyan/40 group-hover:scale-105">
                  <Image
                    src="/logo-icon.png"
                    alt="BizLume Logo"
                    width={48}
                    height={48}
                    className="w-full h-full object-contain brightness-0 invert"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-black tracking-tight text-white group-hover:text-cyan transition-colors">
                    BizLume
                  </span>
                  <span className="text-[11px] font-medium text-white/50 tracking-wide flex items-center gap-1 group-hover:text-white/80 transition-colors">
                    bizlume.in ↗
                  </span>
                </div>
              </a>
              <p className="text-white/40 text-[13px] font-light leading-relaxed max-w-xs">
                Modernizing healthcare through intelligent, stable, clinician-first software.
              </p>
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-cyan mb-5">Core Features</p>
              <ul className="space-y-3 text-[13px] text-white/50">
                <li>
                  <Link href="/features/clinical-emr" className="hover:text-white transition-colors no-underline">
                    Clinical EMR
                  </Link>
                </li>
                <li>
                  <Link href="/features/smart-queue-management" className="hover:text-white transition-colors no-underline">
                    Smart OPD Queue
                  </Link>
                </li>
                <li>
                  <Link href="/features/patient-intake-billing" className="hover:text-white transition-colors no-underline">
                    Patient Intake & Billing
                  </Link>
                </li>
                <li>
                  <Link href="/features/diagnostic-lab-management" className="hover:text-white transition-colors no-underline">
                    Diagnostic Lab Module
                  </Link>
                </li>
                <li>
                  <Link href="/features/ai-clinical-assistance" className="hover:text-white transition-colors no-underline">
                    AI Clinical Assistant
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-cyan mb-5">Solutions & Regional</p>
              <ul className="space-y-3 text-[13px] text-white/50">
                <li>
                  <Link href="/solutions/multi-specialty-hospitals" className="hover:text-white transition-colors no-underline">
                    Multi-Specialty Hospitals
                  </Link>
                </li>
                <li>
                  <Link href="/solutions/small-hospitals" className="hover:text-white transition-colors no-underline">
                    Small Hospitals & Clinics
                  </Link>
                </li>
                <li>
                  <Link href="/locations/mumbai" className="hover:text-white transition-colors no-underline">
                    Mumbai Healthcare Hub
                  </Link>
                </li>
                <li>
                  <Link href="/locations/delhi-ncr" className="hover:text-white transition-colors no-underline">
                    Delhi NCR Medical Centers
                  </Link>
                </li>
                <li>
                  <Link href="/locations/bengaluru" className="hover:text-white transition-colors no-underline">
                    Bengaluru Clinics
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[11px] text-white/25 uppercase tracking-widest font-medium">
              © 2026 BizLume Systems. All rights reserved.
            </p>
            <div className="flex gap-6 text-[11px] font-bold text-white/40">
              <Link href="/about" className="hover:text-white transition-colors uppercase tracking-wider no-underline">
                About
              </Link>
              <Link href="/contact" className="hover:text-white transition-colors uppercase tracking-wider no-underline">
                Contact
              </Link>
              <Link href="/faq" className="hover:text-white transition-colors uppercase tracking-wider no-underline">
                FAQ
              </Link>
            </div>
          </div>
        </div>
      </footer>

      {/* ── NAVIGATE TO TOP BUTTON ── */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            onClick={scrollToTop}
            aria-label="Navigate to top"
            className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-2xl bg-navy/90 backdrop-blur-xl border border-white/20 text-white shadow-xl shadow-navy/20 hover:bg-cyan hover:text-navy hover:border-cyan transition-all duration-300 flex items-center justify-center group cursor-pointer"
          >
            <svg
              className="w-5 h-5 transition-transform duration-300 group-hover:-translate-y-0.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}