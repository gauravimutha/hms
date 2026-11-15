"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  Stethoscope,
  HeartPulse,
  AlertTriangle,
  ArrowLeft,
  CheckCircle,
  Clock,
  User,
  ShieldAlert,
} from "lucide-react";

export default function TriageDetailPage() {
  const params = useParams();
  const router = useRouter();
  const triageId = params?.id as string || "1";

  const [patientData] = useState({
    name: "Ramesh Sharma",
    patientCode: "HMS-0104",
    age: 58,
    gender: "Male",
    phone: "+91 98201 44589",
    doctor: "Dr. Ananya Iyer",
  });

  const [triagePriority, setTriagePriority] = useState<"HIGH" | "MEDIUM" | "LOW">("HIGH");
  const [chiefComplaint, setChiefComplaint] = useState("Sudden chest tightness and mild dyspnea for 2 hours.");
  const [systolic, setSystolic] = useState("145");
  const [diastolic, setDiastolic] = useState("92");
  const [heartRate, setHeartRate] = useState("88");
  const [temp, setTemp] = useState("99.1");
  const [spo2, setSpo2] = useState("95");
  const [respiratoryRate, setRespiratoryRate] = useState("22");
  const [bloodSugar, setBloodSugar] = useState("165");
  const [nurseNotes, setNurseNotes] = useState("Patient is conscious, oriented, diaphoresis noted. Placed in triage observation bay 1.");
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSubmitTriage = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => {
      router.push("/vitals");
    }, 1500);
  };

  return (
    <div className="space-y-6 max-w-full">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link
            href="/vitals"
            className="p-2 rounded-xl bg-white border border-soft-blue text-navy hover:bg-light-grey transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <span className="text-cyan text-xs font-bold uppercase tracking-widest">
              Clinical Triage Assessment &bull; ID: #{triageId}
            </span>
            <h1 className="text-xl sm:text-2xl font-black text-navy tracking-tight mt-0.5">
              Rapid Patient Triage Intake
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border ${
              triagePriority === "HIGH"
                ? "bg-status-red/10 border-status-red/20 text-status-red"
                : triagePriority === "MEDIUM"
                ? "bg-amber-500/10 border-amber-500/20 text-amber-600"
                : "bg-status-green/10 border-status-green/20 text-status-green"
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            {triagePriority} PRIORITY ACUITY
          </span>
        </div>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-2xl bg-status-green/10 border border-status-green/20 text-status-green text-xs sm:text-sm font-bold flex items-center gap-2 animate-fade-in">
          <CheckCircle className="w-4 h-4 shrink-0" />
          Triage intake saved! Synchronizing with Doctor consultation queue and returning to vitals station...
        </div>
      )}

      {/* Patient Demographic Card */}
      <div className="bg-white border border-soft-blue rounded-3xl p-5 sm:p-7 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start sm:items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-cyan/10 text-cyan flex items-center justify-center font-black shrink-0">
              <User className="w-6 h-6" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-lg sm:text-xl font-bold text-navy">{patientData.name}</h2>
                <span className="text-xs px-2.5 py-0.5 rounded-md bg-light-grey border border-soft-blue text-navy font-mono font-bold">
                  {patientData.patientCode}
                </span>
              </div>
              <p className="text-xs text-grey font-light mt-0.5">
                {patientData.age} years &bull; {patientData.gender} &bull; {patientData.phone}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 pt-3 md:pt-0 border-t md:border-t-0 border-soft-blue text-xs">
            <div className="px-3.5 py-2 rounded-xl bg-light-grey border border-soft-blue w-full sm:w-auto">
              <span className="text-grey block text-[10px] uppercase font-bold">Attending Doctor</span>
              <span className="font-bold text-navy">{patientData.doctor}</span>
            </div>
            <div className="px-3.5 py-2 rounded-xl bg-light-grey border border-soft-blue w-full sm:w-auto">
              <span className="text-grey block text-[10px] uppercase font-bold">Waiting Status</span>
              <span className="font-bold text-status-red flex items-center gap-1">
                <Clock className="w-3 h-3" /> Urgent Review
              </span>
            </div>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmitTriage} className="space-y-6">
        {/* Triage Acuity Selector */}
        <div className="bg-white border border-soft-blue rounded-3xl p-5 sm:p-7 shadow-sm">
          <h3 className="text-sm font-bold text-navy uppercase tracking-wider mb-4 flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-cyan" />
            1. Clinical Acuity Classification
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <button
              type="button"
              onClick={() => setTriagePriority("HIGH")}
              className={`p-4 rounded-2xl border text-left transition-all ${
                triagePriority === "HIGH"
                  ? "bg-status-red/10 border-status-red text-status-red ring-2 ring-status-red/20"
                  : "bg-light-grey border-soft-blue text-navy hover:border-grey"
              }`}
            >
              <div className="font-black text-sm uppercase">High Acuity (Red)</div>
              <p className="text-xs text-grey mt-1 font-light">
                Acute chest pain, severe dyspnea, shock, altered consciousness. Immediate care.
              </p>
            </button>

            <button
              type="button"
              onClick={() => setTriagePriority("MEDIUM")}
              className={`p-4 rounded-2xl border text-left transition-all ${
                triagePriority === "MEDIUM"
                  ? "bg-amber-500/10 border-amber-500 text-amber-600 ring-2 ring-amber-500/20"
                  : "bg-light-grey border-soft-blue text-navy hover:border-grey"
              }`}
            >
              <div className="font-black text-sm uppercase">Medium Acuity (Amber)</div>
              <p className="text-xs text-grey mt-1 font-light">
                Moderate distress, high fever, severe headache, severe pain. Priority review.
              </p>
            </button>

            <button
              type="button"
              onClick={() => setTriagePriority("LOW")}
              className={`p-4 rounded-2xl border text-left transition-all ${
                triagePriority === "LOW"
                  ? "bg-status-green/10 border-status-green text-status-green ring-2 ring-status-green/20"
                  : "bg-light-grey border-soft-blue text-navy hover:border-grey"
              }`}
            >
              <div className="font-black text-sm uppercase">Low Acuity (Green)</div>
              <p className="text-xs text-grey mt-1 font-light">
                Routine walk-in, minor abrasions, prescription refill, stable check-up.
              </p>
            </button>
          </div>
        </div>

        {/* Vital Signs Grid */}
        <div className="bg-white border border-soft-blue rounded-3xl p-5 sm:p-7 shadow-sm">
          <h3 className="text-sm font-bold text-navy uppercase tracking-wider mb-4 flex items-center gap-2">
            <HeartPulse className="w-4 h-4 text-cyan" />
            2. Measured Vital Signs
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-bold text-navy mb-1.5">
                Blood Pressure (mmHg)
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  placeholder="Sys"
                  value={systolic}
                  onChange={(e) => setSystolic(e.target.value)}
                  className="w-full px-3 py-2 text-xs sm:text-sm bg-light-grey rounded-xl border border-soft-blue focus:outline-none focus:border-cyan text-dark font-mono"
                  required
                />
                <span className="text-grey font-bold">/</span>
                <input
                  type="number"
                  placeholder="Dia"
                  value={diastolic}
                  onChange={(e) => setDiastolic(e.target.value)}
                  className="w-full px-3 py-2 text-xs sm:text-sm bg-light-grey rounded-xl border border-soft-blue focus:outline-none focus:border-cyan text-dark font-mono"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-navy mb-1.5">
                Heart Rate (bpm)
              </label>
              <input
                type="number"
                placeholder="72"
                value={heartRate}
                onChange={(e) => setHeartRate(e.target.value)}
                className="w-full px-3 py-2 text-xs sm:text-sm bg-light-grey rounded-xl border border-soft-blue focus:outline-none focus:border-cyan text-dark font-mono"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-navy mb-1.5">
                Body Temperature (°F)
              </label>
              <input
                type="text"
                placeholder="98.6"
                value={temp}
                onChange={(e) => setTemp(e.target.value)}
                className="w-full px-3 py-2 text-xs sm:text-sm bg-light-grey rounded-xl border border-soft-blue focus:outline-none focus:border-cyan text-dark font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-navy mb-1.5">
                SpO2 Saturation (%)
              </label>
              <input
                type="number"
                placeholder="98"
                value={spo2}
                onChange={(e) => setSpo2(e.target.value)}
                className="w-full px-3 py-2 text-xs sm:text-sm bg-light-grey rounded-xl border border-soft-blue focus:outline-none focus:border-cyan text-dark font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-navy mb-1.5">
                Respiratory Rate (breaths/min)
              </label>
              <input
                type="number"
                placeholder="16"
                value={respiratoryRate}
                onChange={(e) => setRespiratoryRate(e.target.value)}
                className="w-full px-3 py-2 text-xs sm:text-sm bg-light-grey rounded-xl border border-soft-blue focus:outline-none focus:border-cyan text-dark font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-navy mb-1.5">
                Random Blood Sugar (mg/dL)
              </label>
              <input
                type="number"
                placeholder="120"
                value={bloodSugar}
                onChange={(e) => setBloodSugar(e.target.value)}
                className="w-full px-3 py-2 text-xs sm:text-sm bg-light-grey rounded-xl border border-soft-blue focus:outline-none focus:border-cyan text-dark font-mono"
              />
            </div>
          </div>
        </div>

        {/* Chief Complaint and Triage Notes */}
        <div className="bg-white border border-soft-blue rounded-3xl p-5 sm:p-7 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-navy uppercase tracking-wider mb-2 flex items-center gap-2">
            <Stethoscope className="w-4 h-4 text-cyan" />
            3. Clinical Impression & Notes
          </h3>

          <div>
            <label className="block text-xs font-bold text-navy mb-1.5">
              Chief Complaint / Presenting Symptoms
            </label>
            <input
              type="text"
              value={chiefComplaint}
              onChange={(e) => setChiefComplaint(e.target.value)}
              placeholder="e.g. Chest pain radiating to left arm..."
              className="w-full px-4 py-2.5 text-xs sm:text-sm bg-light-grey rounded-xl border border-soft-blue focus:outline-none focus:border-cyan text-dark"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-navy mb-1.5">
              Nurse Triage Assessment & Initial Interventions
            </label>
            <textarea
              rows={3}
              value={nurseNotes}
              onChange={(e) => setNurseNotes(e.target.value)}
              placeholder="Record immediate observations, allergy alerts, oxygen administration..."
              className="w-full px-4 py-2.5 text-xs sm:text-sm bg-light-grey rounded-xl border border-soft-blue focus:outline-none focus:border-cyan text-dark resize-none"
            />
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
          <button
            type="submit"
            className="w-full sm:w-auto bg-cyan text-navy font-bold px-8 py-3.5 rounded-xl hover:opacity-95 transition-opacity text-sm shadow-md"
          >
            Dispatch to Doctor Consultation Desk →
          </button>
          <Link
            href="/vitals"
            className="w-full sm:w-auto text-center px-6 py-3.5 bg-white text-navy font-bold rounded-xl border border-soft-blue hover:bg-light-grey text-sm no-underline"
          >
            Return to Queue
          </Link>
        </div>
      </form>
    </div>
  );
}
