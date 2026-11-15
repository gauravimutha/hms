"use client";

import React, { useState } from "react";
import { 
  BarChart3, 
  TrendingUp, 
  Download, 
  Calendar, 
  Filter, 
  FileSpreadsheet, 
  CheckCircle2, 
  Pill,
  Clock
} from "lucide-react";

interface ReportEntry {
  id: string;
  prescriptionCode: string;
  patientName: string;
  patientCode: string;
  doctor: string;
  dispensedAt: string;
  itemCount: number;
  totalAmount: number;
  paymentMethod: "UPI" | "Cash" | "Card";
}

const REPORT_DATA: ReportEntry[] = [
  {
    id: "rep-1",
    prescriptionCode: "RX-88492",
    patientName: "Ramesh Sharma",
    patientCode: "HMS-0104",
    doctor: "Dr. Ananya Iyer",
    dispensedAt: "16 Nov 2026, 11:42 AM",
    itemCount: 3,
    totalAmount: 213.92,
    paymentMethod: "UPI",
  },
  {
    id: "rep-2",
    prescriptionCode: "RX-88488",
    patientName: "Meera Nair",
    patientCode: "HMS-0112",
    doctor: "Dr. Arvind Mehta",
    dispensedAt: "16 Nov 2026, 10:15 AM",
    itemCount: 2,
    totalAmount: 145.0,
    paymentMethod: "Cash",
  },
  {
    id: "rep-3",
    prescriptionCode: "RX-88471",
    patientName: "Sunil Verma",
    patientCode: "HMS-0098",
    doctor: "Dr. Ananya Iyer",
    dispensedAt: "15 Nov 2026, 04:30 PM",
    itemCount: 4,
    totalAmount: 380.5,
    paymentMethod: "UPI",
  },
  {
    id: "rep-4",
    prescriptionCode: "RX-88460",
    patientName: "Pooja Hegde",
    patientCode: "HMS-0109",
    doctor: "Dr. Rajesh Kulkarni",
    dispensedAt: "15 Nov 2026, 02:10 PM",
    itemCount: 1,
    totalAmount: 45.0,
    paymentMethod: "Card",
  },
  {
    id: "rep-5",
    prescriptionCode: "RX-88452",
    patientName: "Kavita Rao",
    patientCode: "HMS-0082",
    doctor: "Dr. Arvind Mehta",
    dispensedAt: "14 Nov 2026, 05:45 PM",
    itemCount: 2,
    totalAmount: 188.0,
    paymentMethod: "UPI",
  },
];

export default function PrescriptionReportsPage() {
  const [timeRange, setTimeRange] = useState<"TODAY" | "WEEK" | "MONTH">("TODAY");

  const totalDispensed = REPORT_DATA.length;
  const totalRevenue = REPORT_DATA.reduce((acc, curr) => acc + curr.totalAmount, 0);

  return (
    <div className="space-y-6 max-w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-cyan text-xs font-bold uppercase tracking-widest">
            Pharmacy Analytics & Audit
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-navy tracking-tight mt-1">
            Prescription Dispensing Reports
          </h1>
          <p className="text-xs sm:text-sm text-grey font-light">
            Audit logs of fulfilled prescriptions, billing records, and inventory draw-downs.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
          <button
            onClick={() => alert("Exporting dispensing report to CSV...")}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-soft-blue text-navy hover:bg-light-grey transition-colors text-xs font-bold shadow-sm"
          >
            <Download className="w-3.5 h-3.5 text-cyan" />
            Export CSV
          </button>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 min-[420px]:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-soft-blue rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-grey uppercase tracking-wider">Dispensed Count</span>
            <CheckCircle2 className="w-4 h-4 text-cyan" />
          </div>
          <p className="text-2xl sm:text-3xl font-black text-navy mt-2">{totalDispensed}</p>
          <span className="text-[11px] text-grey font-light">Completed fulfillment</span>
        </div>

        <div className="bg-white border border-soft-blue rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-grey uppercase tracking-wider">Daily Pharmacy Gross</span>
            <TrendingUp className="w-4 h-4 text-status-green" />
          </div>
          <p className="text-2xl sm:text-3xl font-black text-status-green mt-2">
            ₹{totalRevenue.toFixed(0)}
          </p>
          <span className="text-[11px] text-grey font-light">Revenue collected</span>
        </div>

        <div className="bg-white border border-soft-blue rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-grey uppercase tracking-wider">Avg. Dispense Turnaround</span>
            <Clock className="w-4 h-4 text-cyan" />
          </div>
          <p className="text-2xl sm:text-3xl font-black text-navy mt-2">3.8 mins</p>
          <span className="text-[11px] text-grey font-light">Per customer counter time</span>
        </div>

        <div className="bg-white border border-soft-blue rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-grey uppercase tracking-wider">Top Molecule</span>
            <Pill className="w-4 h-4 text-status-green" />
          </div>
          <p className="text-xl sm:text-2xl font-black text-navy mt-2 truncate">Amoxicillin</p>
          <span className="text-[11px] text-grey font-light">18% of total volume</span>
        </div>
      </div>

      {/* Date Filter Bar */}
      <div className="bg-white border border-soft-blue rounded-2xl p-4 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-cyan" />
          <span className="text-xs sm:text-sm font-bold text-navy">Reporting Period:</span>
        </div>
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
          {(["TODAY", "WEEK", "MONTH"] as const).map((r) => (
            <button
              key={r}
              onClick={() => setTimeRange(r)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors shrink-0 ${
                timeRange === r
                  ? "bg-navy text-white"
                  : "bg-light-grey text-grey hover:text-navy border border-soft-blue"
              }`}
            >
              {r === "TODAY" ? "Today" : r === "WEEK" ? "Past 7 Days" : "This Month"}
            </button>
          ))}
        </div>
      </div>

      {/* Reports Table */}
      <div className="bg-white border border-soft-blue rounded-3xl shadow-sm overflow-hidden">
        <div className="p-4 sm:p-6 border-b border-soft-blue flex items-center justify-between">
          <h2 className="text-base sm:text-lg font-bold text-navy">Dispense Transaction Log</h2>
          <span className="text-xs text-grey font-medium">{REPORT_DATA.length} records</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[650px] text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-soft-blue bg-light-grey/60 text-[11px] font-black uppercase tracking-wider text-grey">
                <th className="py-3.5 px-4 sm:px-6">Prescription</th>
                <th className="py-3.5 px-4">Patient</th>
                <th className="py-3.5 px-4">Attending Doctor</th>
                <th className="py-3.5 px-4">Date & Time</th>
                <th className="py-3.5 px-4">Items</th>
                <th className="py-3.5 px-4">Payment</th>
                <th className="py-3.5 px-4 sm:px-6 text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-soft-blue">
              {REPORT_DATA.map((row) => (
                <tr key={row.id} className="hover:bg-light-grey/30">
                  <td className="py-3.5 px-4 sm:px-6 font-mono font-bold text-navy">
                    {row.prescriptionCode}
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-navy">{row.patientName}</div>
                    <div className="text-[11px] text-grey font-mono font-bold">{row.patientCode}</div>
                  </td>
                  <td className="py-3.5 px-4 text-dark font-medium">{row.doctor}</td>
                  <td className="py-3.5 px-4 text-grey text-xs font-mono">{row.dispensedAt}</td>
                  <td className="py-3.5 px-4">
                    <span className="px-2.5 py-0.5 rounded-md bg-light-grey border border-soft-blue text-navy font-bold text-xs font-mono">
                      {row.itemCount} meds
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-cyan/10 text-cyan">
                      {row.paymentMethod}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 sm:px-6 text-right font-mono font-bold text-navy">
                    ₹{row.totalAmount.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
