"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  HeartPulse, 
  Search, 
  Activity, 
  Thermometer, 
  AlertCircle, 
  CheckCircle2, 
  Clock, 
  UserCheck,
  ChevronRight,
  Filter
} from "lucide-react";
import { isDemoEnabled } from "@/lib/demo/demoConfig";

interface PatientTriageItem {
  id: string;
  name: string;
  patientCode: string;
  age: number;
  gender: string;
  priority: "HIGH" | "MEDIUM" | "LOW";
  doctor: string;
  timeWaiting: string;
  status: "PENDING" | "RECORDED";
  bp?: string;
  pulse?: string;
  temp?: string;
  spo2?: string;
}

const INITIAL_QUEUE: PatientTriageItem[] = [
  {
    id: "v-1",
    name: "Ramesh Sharma",
    patientCode: "HMS-0104",
    age: 58,
    gender: "Male",
    priority: "HIGH",
    doctor: "Dr. Ananya Iyer",
    timeWaiting: "12 mins ago",
    status: "PENDING",
  },
  {
    id: "v-2",
    name: "Pooja Hegde",
    patientCode: "HMS-0109",
    age: 32,
    gender: "Female",
    priority: "MEDIUM",
    doctor: "Dr. Rajesh Kulkarni",
    timeWaiting: "24 mins ago",
    status: "PENDING",
  },
  {
    id: "v-3",
    name: "Sunil Verma",
    patientCode: "HMS-0098",
    age: 46,
    gender: "Male",
    priority: "LOW",
    doctor: "Dr. Ananya Iyer",
    timeWaiting: "35 mins ago",
    status: "RECORDED",
    bp: "120/80",
    pulse: "72 bpm",
    temp: "98.6 °F",
    spo2: "99%",
  },
  {
    id: "v-4",
    name: "Meera Nair",
    patientCode: "HMS-0112",
    age: 27,
    gender: "Female",
    priority: "MEDIUM",
    doctor: "Dr. Arvind Mehta",
    timeWaiting: "5 mins ago",
    status: "PENDING",
  },
];

export default function VitalsPage() {
  const [queue, setQueue] = useState<PatientTriageItem[]>(INITIAL_QUEUE);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterPriority, setFilterPriority] = useState<string>("ALL");
  const [activeModalPatient, setActiveModalPatient] = useState<PatientTriageItem | null>(null);

  // Vitals form state
  const [bp, setBp] = useState("");
  const [pulse, setPulse] = useState("");
  const [temp, setTemp] = useState("");
  const [spo2, setSpo2] = useState("");
  const [weight, setWeight] = useState("");

  const filteredQueue = queue.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.patientCode.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterPriority === "ALL" || item.priority === filterPriority;
    return matchesSearch && matchesFilter;
  });

  const handleOpenVitalsModal = (patient: PatientTriageItem) => {
    setActiveModalPatient(patient);
    setBp(patient.bp || "");
    setPulse(patient.pulse ? patient.pulse.replace(" bpm", "") : "");
    setTemp(patient.temp ? patient.temp.replace(" °F", "") : "");
    setSpo2(patient.spo2 ? patient.spo2.replace("%", "") : "");
    setWeight("");
  };

  const handleAutofillVitals = () => {
    setBp("158/98");
    setPulse("96");
    setTemp("99.1");
    setSpo2("95");
    setWeight("74");
  };

  useEffect(() => {
    const onAutofill = (e: any) => {
      if (e.detail?.type === "VITALS_ENTRY") {
        const pending = queue.find((q) => q.status === "PENDING") || queue[0];
        if (pending) {
          setActiveModalPatient(pending);
          handleAutofillVitals();
        }
      }
    };
    window.addEventListener("bizlume:demo:autofill", onAutofill);
    return () => window.removeEventListener("bizlume:demo:autofill", onAutofill);
  }, [queue]);

  const handleSaveVitals = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeModalPatient) return;

    setQueue((prev) =>
      prev.map((item) =>
        item.id === activeModalPatient.id
          ? {
              ...item,
              status: "RECORDED",
              bp: bp || "120/80",
              pulse: pulse ? `${pulse} bpm` : "74 bpm",
              temp: temp ? `${temp} °F` : "98.4 °F",
              spo2: spo2 ? `${spo2}%` : "98%",
            }
          : item
      )
    );
    setActiveModalPatient(null);
  };

  return (
    <div className="space-y-6 max-w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-cyan text-xs font-bold uppercase tracking-widest">
            Clinical Triage & Assessment
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-navy tracking-tight mt-1">
            Patient Vitals Station
          </h1>
          <p className="text-xs sm:text-sm text-grey font-light">
            Capture diagnostic baseline vitals before doctor consultation.
          </p>
        </div>
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-cyan/10 border border-cyan/20 text-cyan text-xs font-bold">
            <span className="w-2 h-2 rounded-full bg-cyan animate-pulse"></span>
            Triage Bay 1 Active
          </span>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 min-[420px]:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-soft-blue rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-grey uppercase tracking-wider">Queue Total</span>
            <Activity className="w-4 h-4 text-cyan" />
          </div>
          <p className="text-2xl sm:text-3xl font-black text-navy mt-2">{queue.length}</p>
          <span className="text-[11px] text-grey font-light">Registered for triage today</span>
        </div>

        <div className="bg-white border border-soft-blue rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-status-red uppercase tracking-wider">Pending Vitals</span>
            <Clock className="w-4 h-4 text-status-red" />
          </div>
          <p className="text-2xl sm:text-3xl font-black text-status-red mt-2">
            {queue.filter((q) => q.status === "PENDING").length}
          </p>
          <span className="text-[11px] text-grey font-light">Awaiting baseline assessment</span>
        </div>

        <div className="bg-white border border-soft-blue rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-status-green uppercase tracking-wider">Recorded</span>
            <CheckCircle2 className="w-4 h-4 text-status-green" />
          </div>
          <p className="text-2xl sm:text-3xl font-black text-status-green mt-2">
            {queue.filter((q) => q.status === "RECORDED").length}
          </p>
          <span className="text-[11px] text-grey font-light">Sent to doctor consultation queue</span>
        </div>

        <div className="bg-white border border-soft-blue rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-navy uppercase tracking-wider">Critical Flag</span>
            <AlertCircle className="w-4 h-4 text-status-red" />
          </div>
          <p className="text-2xl sm:text-3xl font-black text-navy mt-2">
            {queue.filter((q) => q.priority === "HIGH").length}
          </p>
          <span className="text-[11px] text-grey font-light">Requires immediate doctor alert</span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-soft-blue rounded-2xl p-4 shadow-sm flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1 min-w-0">
          <Search className="w-4 h-4 text-grey absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search patient name or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-light-grey rounded-xl border border-soft-blue focus:outline-none focus:border-cyan text-dark"
          />
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          <Filter className="w-3.5 h-3.5 text-grey shrink-0" />
          {["ALL", "HIGH", "MEDIUM", "LOW"].map((level) => (
            <button
              key={level}
              onClick={() => setFilterPriority(level)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors shrink-0 ${
                filterPriority === level
                  ? "bg-navy text-white"
                  : "bg-light-grey text-grey hover:text-navy border border-soft-blue"
              }`}
            >
              {level}
            </button>
          ))}
        </div>
      </div>

      {/* Patients Table */}
      <div className="bg-white border border-soft-blue rounded-3xl shadow-sm overflow-hidden">
        <div className="p-4 sm:p-6 border-b border-soft-blue flex items-center justify-between">
          <h2 className="text-base sm:text-lg font-bold text-navy">Triage Queue</h2>
          <span className="text-xs text-grey font-medium">{filteredQueue.length} patient(s)</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px] text-left border-collapse">
            <thead>
              <tr className="border-b border-soft-blue bg-light-grey/60 text-[11px] font-black uppercase tracking-wider text-grey">
                <th className="py-3.5 px-4 sm:px-6">Patient</th>
                <th className="py-3.5 px-4">Priority</th>
                <th className="py-3.5 px-4">Doctor</th>
                <th className="py-3.5 px-4">Latest Vitals</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 sm:px-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-soft-blue text-xs sm:text-sm">
              {filteredQueue.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-grey font-light">
                    No patients currently matching filter criteria.
                  </td>
                </tr>
              ) : (
                filteredQueue.map((item) => (
                  <tr key={item.id} className="hover:bg-light-grey/40 transition-colors">
                    <td className="py-4 px-4 sm:px-6">
                      <div className="font-bold text-navy">{item.name}</div>
                      <div className="text-[11px] text-grey flex items-center gap-2 mt-0.5">
                        <span className="font-mono font-bold text-navy">{item.patientCode}</span>
                        <span>&bull;</span>
                        <span>
                          {item.age} yrs, {item.gender}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span
                        className={`inline-block px-2.5 py-1 rounded-md text-[10px] font-black tracking-wider uppercase ${
                          item.priority === "HIGH"
                            ? "bg-status-red/10 text-status-red border border-status-red/20"
                            : item.priority === "MEDIUM"
                            ? "bg-amber-500/10 text-amber-600 border border-amber-500/20"
                            : "bg-status-green/10 text-status-green border border-status-green/20"
                        }`}
                      >
                        {item.priority}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="font-semibold text-dark">{item.doctor}</span>
                      <div className="text-[11px] text-grey font-mono">{item.timeWaiting}</div>
                    </td>
                    <td className="py-4 px-4">
                      {item.status === "RECORDED" ? (
                        <div className="text-xs space-y-0.5 text-navy font-mono">
                          <div>BP: <span className="font-bold">{item.bp}</span></div>
                          <div className="text-grey text-[11px]">HR: {item.pulse} | SpO2: {item.spo2}</div>
                        </div>
                      ) : (
                        <span className="text-grey font-light text-xs italic">Not captured</span>
                      )}
                    </td>
                    <td className="py-4 px-4">
                      <span
                        className={`inline-flex items-center gap-1.5 text-xs font-bold ${
                          item.status === "RECORDED" ? "text-status-green" : "text-amber-600"
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            item.status === "RECORDED" ? "bg-status-green" : "bg-amber-500"
                          }`}
                        />
                        {item.status === "RECORDED" ? "Completed" : "Pending"}
                      </span>
                    </td>
                    <td className="py-4 px-4 sm:px-6 text-right">
                      <button
                        onClick={() => handleOpenVitalsModal(item)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-navy text-white text-xs font-bold hover:bg-cyan hover:text-navy transition-colors shadow-sm"
                      >
                        <HeartPulse className="w-3.5 h-3.5" />
                        {item.status === "RECORDED" ? "Update Vitals" : "Record Vitals"}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Vitals Entry Modal */}
      {activeModalPatient && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-5 sm:p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-soft-blue">
            <div className="flex items-center justify-between pb-4 border-b border-soft-blue mb-5">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-cyan text-[11px] font-bold uppercase tracking-wider">
                    Baseline Diagnostic
                  </span>
                  {isDemoEnabled() && (
                    <button
                      type="button"
                      onClick={handleAutofillVitals}
                      className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-cyan text-navy"
                    >
                      ⚡ Autofill Vitals
                    </button>
                  )}
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-navy">
                  Record Vitals: {activeModalPatient.name}
                </h3>
                <p className="text-xs text-grey">
                  {activeModalPatient.patientCode} &bull; {activeModalPatient.age} yrs &bull; {activeModalPatient.gender}
                </p>
              </div>
              <button
                onClick={() => setActiveModalPatient(null)}
                className="text-grey hover:text-navy p-1 rounded-lg text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveVitals} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-navy mb-1.5">
                    Blood Pressure (mmHg)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 120/80"
                    value={bp}
                    onChange={(e) => setBp(e.target.value)}
                    className="w-full px-3 py-2 text-xs sm:text-sm bg-light-grey rounded-xl border border-soft-blue focus:outline-none focus:border-cyan text-dark font-mono"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-navy mb-1.5">
                    Pulse / Heart Rate (bpm)
                  </label>
                  <input
                    type="number"
                    placeholder="e.g. 72"
                    value={pulse}
                    onChange={(e) => setPulse(e.target.value)}
                    className="w-full px-3 py-2 text-xs sm:text-sm bg-light-grey rounded-xl border border-soft-blue focus:outline-none focus:border-cyan text-dark font-mono"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-navy mb-1.5">
                    Temperature (°F)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 98.6"
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
                    placeholder="e.g. 98"
                    value={spo2}
                    onChange={(e) => setSpo2(e.target.value)}
                    className="w-full px-3 py-2 text-xs sm:text-sm bg-light-grey rounded-xl border border-soft-blue focus:outline-none focus:border-cyan text-dark font-mono"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-navy mb-1.5">
                    Weight (kg) - Optional
                  </label>
                  <input
                    type="number"
                    placeholder="e.g. 68"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    className="w-full px-3 py-2 text-xs sm:text-sm bg-light-grey rounded-xl border border-soft-blue focus:outline-none focus:border-cyan text-dark font-mono"
                  />
                </div>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row gap-2.5">
                <button
                  type="submit"
                  className="flex-1 bg-cyan text-navy font-bold py-2.5 rounded-xl hover:opacity-95 transition-opacity text-sm shadow-md"
                >
                  Save & Forward to Doctor Queue
                </button>
                <button
                  type="button"
                  onClick={() => setActiveModalPatient(null)}
                  className="px-5 py-2.5 bg-light-grey text-grey font-bold rounded-xl hover:text-navy border border-soft-blue text-sm"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
