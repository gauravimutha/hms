"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { isDemoEnabled } from "@/lib/demo/demoConfig";

interface RouteParams {
    id: string;
}

export default function LabResultEntryPage({ params }: { params: Promise<RouteParams> }) {
    const resolvedParams = use(params);
    const orderId = resolvedParams.id;
    const router = useRouter();

    // Local state for diagnostics entries
    const [resultNotes, setResultNotes] = useState("");
    const [flaggedAlert, setFlaggedAlert] = useState(false);
    const [saved, setSaved] = useState(false);

    const [patientInfo, setPatientInfo] = useState({
        name: "Rohan Sharma",
        age: 34,
        gender: "Male",
        testName: "X-Ray Chest PA View",
        doctor: "Dr. Aarav Mehta",
    });

    useEffect(() => {
        async function fetchOrder() {
            try {
                const res = await fetch(`/api/lab/orders/${orderId}`);
                if (res.ok) {
                    const data = await res.json();
                    setPatientInfo({
                        name: data.patientName || "Patient",
                        age: data.patientAge || 35,
                        gender: data.patientGender || "Male",
                        testName: data.testName || "Diagnostic Panel",
                        doctor: data.doctorName || "Dr. Aarav Mehta",
                    });
                    if (data.resultNotes) setResultNotes(data.resultNotes);
                    if (data.flaggedAlert !== undefined) setFlaggedAlert(data.flaggedAlert);
                }
            } catch (e) {
                console.error("Failed to fetch order details:", e);
            }
        }
        fetchOrder();
    }, [orderId]);

    const handleAutofillLab = () => {
        setResultNotes(
            "Diagnostic Evaluation Findings:\n" +
            "• Quantitative Parameter: 0.12 ng/mL (Reference interval: < 0.04 ng/mL - Elevated)\n" +
            "• Leukocyte Count: 11,800 /mcL\n" +
            "• Platelets: 245,000 /mcL\n" +
            "Pathologist Impression: Acute myocardial necrosis biomarker pattern noted. Notifying attending physician immediately."
        );
        setFlaggedAlert(true);
    };

    useEffect(() => {
        const onAutofill = (e: any) => {
            if (e.detail?.type === "LAB_RESULT") {
                handleAutofillLab();
            }
        };
        window.addEventListener("bizlume:demo:autofill", onAutofill);
        return () => window.removeEventListener("bizlume:demo:autofill", onAutofill);
    }, []);

    const handleSaveReport = async () => {
        setSaved(true);
        try {
            await fetch(`/api/lab/orders/${orderId}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    resultNotes: resultNotes || "Specimen examined. Clinical values within observed pathological ranges.",
                    flaggedAlert,
                    status: "COMPLETED",
                }),
            });
            setTimeout(() => {
                router.push("/lab-dashboard");
            }, 1200);
        } catch (e) {
            console.error("Failed to save report to database:", e);
            setTimeout(() => setSaved(false), 2000);
        }
    };

    return (
        <div className="space-y-6 w-full min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                    <Link href="/lab-dashboard" className="text-xs font-bold text-navy hover:underline">← Return to Worklist</Link>
                    <h1 className="text-xl sm:text-2xl font-black text-navy mt-1">Laboratory Result Entry</h1>
                </div>
                {isDemoEnabled() && (
                    <button
                        type="button"
                        onClick={handleAutofillLab}
                        className="self-start sm:self-auto px-3.5 py-2 bg-cyan text-navy font-black text-xs rounded-xl shadow-sm hover:opacity-90"
                    >
                        ⚡ Autofill Findings
                    </button>
                )}
            </div>

            <div className="bg-white border border-soft-blue rounded-2xl p-4 sm:p-6 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
                <div className="space-y-3 min-w-0">
                    <h3 className="text-xs font-bold text-grey uppercase tracking-wider">Order Verification Parameters</h3>
                    <div className="text-xs sm:text-sm font-medium text-navy space-y-1">
                        <p><strong>Patient Name:</strong> {patientInfo.name}</p>
                        <p><strong>Demographics:</strong> {patientInfo.gender} • {patientInfo.age} Yrs</p>
                        <p><strong>Assigned Procedure:</strong> {patientInfo.testName}</p>
                        <p><strong>Ordering Clinician:</strong> {patientInfo.doctor}</p>
                        <p className="text-xs text-grey font-bold mt-2 break-all">Order Reference Token ID: {orderId}</p>
                    </div>
                </div>

                {/* Logging Input Console Form */}
                <div className="space-y-4 border-t md:border-t-0 md:border-l border-soft-blue/60 pt-4 md:pt-0 md:pl-6 min-w-0">
                    <div>
                        <label className="text-xs font-bold text-grey block mb-1">Diagnostic Report Findings / Quantitative Values</label>
                        <textarea
                            rows={5}
                            className="w-full bg-light-grey text-navy font-semibold text-sm p-3 rounded-xl border border-soft-blue/60 focus:outline-none focus:ring-2 focus:ring-cyan"
                            placeholder="Type raw observation measurements or clinical findings (e.g. Mild infiltration tracked in lower left lung boundaries)..."
                            value={resultNotes}
                            onChange={(e) => setResultNotes(e.target.value)}
                        />
                    </div>

                    {/* Critical Abnormality Toggle Alert flag */}
                    <div className="flex items-start gap-3 bg-red-50/60 p-3 rounded-xl border border-status-red/20">
                        <input
                            type="checkbox"
                            id="flag-alert"
                            className="w-4 h-4 mt-0.5 rounded text-status-red focus:ring-status-red shrink-0"
                            checked={flaggedAlert}
                            onChange={(e) => setFlaggedAlert(e.target.checked)}
                        />
                        <label htmlFor="flag-alert" className="text-xs font-bold text-status-red select-none cursor-pointer leading-tight">
                            Flag as Critical Pathological Abnormality (Notifies Doctor Dashboard immediately)
                        </label>
                    </div>

                    <button
                        onClick={handleSaveReport}
                        className="w-full bg-navy text-white font-black text-xs sm:text-sm p-3 sm:p-3.5 rounded-xl transition-all hover:bg-cyan hover:text-navy active:scale-95"
                    >
                        {saved ? "Report Dispatched & Status Synchronized" : "Publish Findings & Finalize Order Fulfillment"}
                    </button>
                </div>
            </div>
        </div>
    );
}