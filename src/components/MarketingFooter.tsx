import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function MarketingFooter() {
  return (
    <footer className="bg-navy text-white pt-16 pb-10 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 pb-12 border-b border-white/10">
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
            <p className="text-white/40 text-[13px] font-light leading-relaxed max-w-sm">
              An AI-assisted, clinician-first Hospital Management & Electronic Medical Records (EMR) platform for hospitals, clinics, and diagnostic centers across India.
            </p>
            <div className="mt-5 text-[12px] text-white/60">
              Inquiries:{" "}
              <a href="mailto:contact@bizlume.in" className="text-cyan font-bold hover:underline">
                contact@bizlume.in
              </a>
            </div>
          </div>

          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-cyan mb-5">Features</p>
            <ul className="space-y-3 text-[13px] text-white/60">
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
                  AI Consultation Assistant
                </Link>
              </li>
              <li>
                <Link href="/features/role-based-access" className="hover:text-white transition-colors no-underline">
                  Role-Based Security
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-cyan mb-5">Solutions</p>
            <ul className="space-y-3 text-[13px] text-white/60">
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
                <Link href="/solutions/daycare-clinics" className="hover:text-white transition-colors no-underline">
                  Polyclinics & Doctors
                </Link>
              </li>
              <li>
                <Link href="/solutions/diagnostic-centers" className="hover:text-white transition-colors no-underline">
                  Diagnostic Pathology Centers
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-cyan mb-5">Regional Hubs</p>
            <ul className="space-y-2.5 text-[13px] text-white/60">
              <li>
                <Link href="/locations/mumbai" className="hover:text-white transition-colors no-underline">
                  Mumbai & Thane
                </Link>
              </li>
              <li>
                <Link href="/locations/delhi-ncr" className="hover:text-white transition-colors no-underline">
                  Delhi NCR & Gurgaon
                </Link>
              </li>
              <li>
                <Link href="/locations/bengaluru" className="hover:text-white transition-colors no-underline">
                  Bengaluru
                </Link>
              </li>
              <li>
                <Link href="/locations/hyderabad" className="hover:text-white transition-colors no-underline">
                  Hyderabad
                </Link>
              </li>
              <li>
                <Link href="/locations/chennai" className="hover:text-white transition-colors no-underline">
                  Chennai
                </Link>
              </li>
              <li>
                <Link href="/locations/pune" className="hover:text-white transition-colors no-underline">
                  Pune & PCMC
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
  );
}
