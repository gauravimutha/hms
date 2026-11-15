"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  FlaskRound, 
  Search, 
  CheckCircle, 
  AlertCircle, 
  Pill, 
  Receipt, 
  Clock, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck
} from "lucide-react";

interface DispenseItem {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  quantity: number;
  unitPrice: number;
  availableStock: number;
  batchNo: string;
  expiry: string;
}

export default function PharmacyDispensePage() {
  const [searchCode, setSearchCode] = useState("");
  const [dispensedSuccess, setDispensedSuccess] = useState(false);

  const [prescriptionData, setPrescriptionData] = useState<{
    id: string;
    patientName: string;
    patientCode: string;
    doctorName: string;
    date: string;
    items: DispenseItem[];
  }>({
    id: "RX-88492",
    patientName: "Ramesh Sharma",
    patientCode: "HMS-0104",
    doctorName: "Dr. Ananya Iyer",
    date: "16 Nov 2026",
    items: [
      {
        id: "item-1",
        name: "Amoxicillin Trihydrate",
        dosage: "500mg",
        frequency: "Twice daily after meals",
        duration: "5 days",
        quantity: 10,
        unitPrice: 12.5,
        availableStock: 250,
        batchNo: "AMX-2026-A1",
        expiry: "09/2027",
      },
      {
        id: "item-2",
        name: "Paracetamol (Calpol)",
        dosage: "650mg",
        frequency: "SOS for fever > 100°F",
        duration: "3 days",
        quantity: 6,
        unitPrice: 3.5,
        availableStock: 500,
        batchNo: "PCM-2026-F4",
        expiry: "12/2028",
      },
      {
        id: "item-3",
        name: "Pantoprazole Gastro-Resistant",
        dosage: "40mg",
        frequency: "Once daily empty stomach",
        duration: "5 days",
        quantity: 5,
        unitPrice: 9.0,
        availableStock: 180,
        batchNo: "PAN-2026-B8",
        expiry: "04/2027",
      },
    ],
  });

  const subtotal = prescriptionData.items.reduce((acc, curr) => acc + curr.quantity * curr.unitPrice, 0);
  const gst = subtotal * 0.12; // 12% GST
  const grandTotal = subtotal + gst;

  const handleAutofillDispense = () => {
    setSearchCode("RX-88492");
    setDispensedSuccess(false);
  };

  React.useEffect(() => {
    const onAutofill = (e: any) => {
      if (e.detail?.type === "PHARMACY_DISPENSE") {
        handleAutofillDispense();
      }
    };
    window.addEventListener("bizlume:demo:autofill", onAutofill);
    return () => window.removeEventListener("bizlume:demo:autofill", onAutofill);
  }, []);

  const handleDispense = () => {
    setDispensedSuccess(true);
  };

  return (
    <div className="space-y-6 max-w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-cyan text-xs font-bold uppercase tracking-widest">
            Pharmacy Counter
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-navy tracking-tight mt-1">
            Medication Dispensing Station
          </h1>
          <p className="text-xs sm:text-sm text-grey font-light">
            Scan prescription or patient barcode to verify stock, calculate invoice, and dispense.
          </p>
        </div>
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-cyan/10 border border-cyan/20 text-cyan text-xs font-bold">
            <FlaskRound className="w-3.5 h-3.5" />
            Counter 2 Active
          </span>
        </div>
      </div>

      {dispensedSuccess && (
        <div className="p-4 rounded-2xl bg-status-green/10 border border-status-green/20 text-status-green text-xs sm:text-sm font-bold flex items-center justify-between gap-3 animate-fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 shrink-0" />
            <span>Medications successfully dispensed! Inventory adjusted and bill recorded.</span>
          </div>
          <Link
            href="/prescriptions"
            className="text-xs font-black underline shrink-0 hover:opacity-80"
          >
            Prescription Queue →
          </Link>
        </div>
      )}

      {/* Lookup Bar */}
      <div className="bg-white border border-soft-blue rounded-2xl p-4 sm:p-5 shadow-sm">
        <label className="block text-xs font-bold text-navy uppercase tracking-wider mb-2">
          Scan Barcode or Search Prescription ID
        </label>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-grey absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="e.g. RX-88492 or Patient Mobile..."
              value={searchCode}
              onChange={(e) => setSearchCode(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-light-grey rounded-xl border border-soft-blue focus:outline-none focus:border-cyan text-dark font-mono"
            />
          </div>
          <button className="px-6 py-2.5 bg-navy text-white text-xs font-bold rounded-xl hover:bg-cyan hover:text-navy transition-colors shrink-0">
            Verify Prescription
          </button>
        </div>
      </div>

      {/* Prescription & Patient Details */}
      <div className="bg-white border border-soft-blue rounded-3xl p-5 sm:p-7 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-soft-blue">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-md bg-cyan/15 text-navy">
                {prescriptionData.id}
              </span>
              <h2 className="text-lg sm:text-xl font-bold text-navy">
                {prescriptionData.patientName}
              </h2>
              <span className="text-xs text-grey font-mono">({prescriptionData.patientCode})</span>
            </div>
            <p className="text-xs text-grey mt-1">
              Prescribed by <span className="font-semibold text-navy">{prescriptionData.doctorName}</span> &bull; {prescriptionData.date}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-status-green/10 text-status-green text-xs font-bold">
              <ShieldCheck className="w-3.5 h-3.5" /> Doctor Signature Verified
            </span>
          </div>
        </div>

        {/* Medicines List Table */}
        <div className="mt-6">
          <h3 className="text-xs font-bold text-grey uppercase tracking-wider mb-3">
            Prescribed Items & Inventory Match
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[650px] text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-soft-blue bg-light-grey/60 text-[11px] font-black uppercase tracking-wider text-grey">
                  <th className="py-3 px-4">Medicine Name</th>
                  <th className="py-3 px-4">Instructions</th>
                  <th className="py-3 px-4">Batch / Expiry</th>
                  <th className="py-3 px-4">In Stock</th>
                  <th className="py-3 px-4">Qty</th>
                  <th className="py-3 px-4 text-right">Price</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-soft-blue">
                {prescriptionData.items.map((item) => (
                  <tr key={item.id} className="hover:bg-light-grey/30">
                    <td className="py-3.5 px-4 font-bold text-navy">
                      <div className="flex items-center gap-2">
                        <Pill className="w-4 h-4 text-cyan shrink-0" />
                        <span>{item.name} <span className="text-grey font-normal">({item.dosage})</span></span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-grey">
                      <div>{item.frequency}</div>
                      <div className="text-[11px]">Duration: {item.duration}</div>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-xs">
                      <div>{item.batchNo}</div>
                      <div className="text-grey text-[11px]">Exp: {item.expiry}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="text-status-green font-bold">{item.availableStock}</span> units
                    </td>
                    <td className="py-3.5 px-4 font-bold text-navy">
                      {item.quantity}
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono font-bold text-navy">
                      ₹{(item.quantity * item.unitPrice).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Billing & Action Section */}
        <div className="mt-8 pt-6 border-t border-soft-blue flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="w-full md:w-auto p-4 rounded-2xl bg-light-grey border border-soft-blue text-xs space-y-1.5 min-w-[240px]">
            <div className="flex justify-between text-grey">
              <span>Subtotal:</span>
              <span className="font-mono">₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-grey">
              <span>GST (12%):</span>
              <span className="font-mono">₹{gst.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold text-navy text-sm pt-1 border-t border-soft-blue">
              <span>Payable Total:</span>
              <span className="font-mono">₹{grandTotal.toFixed(2)}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <button
              onClick={handleDispense}
              disabled={dispensedSuccess}
              className="px-8 py-3.5 bg-cyan text-navy font-bold rounded-xl hover:opacity-95 transition-opacity text-sm shadow-md disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              {dispensedSuccess ? "Medication Dispensed" : "Confirm & Dispense"}
            </button>
            <Link
              href="/inventory"
              className="px-6 py-3.5 bg-white text-navy font-bold rounded-xl border border-soft-blue hover:bg-light-grey text-sm text-center no-underline"
            >
              Check Stock
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
