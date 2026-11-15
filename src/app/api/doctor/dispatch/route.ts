import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { visitId, doctorId, doctorName, chiefComplaint, clinicalNotes, diagnosis, aiSuggestions, consultationFee, medicines, labTests } = body;

        // Use visitId for linking. Fall back to patientId for backwards compatibility.
        const targetVisitId = visitId;

        if (!targetVisitId) {
            return NextResponse.json(
                { success: false, error: "visitId is required for dispatching orders." },
                { status: 400 }
            );
        }

        // 1. Update the consultation fee (if provided)
        if (consultationFee !== undefined && consultationFee !== null) {
            const fee = parseFloat(consultationFee);
            if (!isNaN(fee)) {
                await prisma.visit.update({
                    where: { id: targetVisitId },
                    data: { registrationFee: fee }
                });
            }
        }

        // 2. Save the EMR consultation record
        await prisma.eMRVisit.create({
            data: {
                visitId: targetVisitId,
                doctorId: doctorId || "DOC-DEFAULT",
                doctorName: doctorName || "Attending Doctor",
                chiefComplaint: chiefComplaint || "No complaint recorded",
                clinicalNotes: clinicalNotes || "No clinical notes",
                diagnosis: diagnosis || null,
                aiSuggestions: aiSuggestions || null,
            }
        });

        // 3. If medicine prescriptions exist, dispatch them to the pharmacy line item collections
        if (medicines && medicines.length > 0) {
            const prescriptionItemsData = [];

            for (const med of medicines) {
                let medicineId = med.id;

                if (!medicineId && med.name) {
                    // Try to find existing medicine by name
                    const existingMed = await prisma.medicine.findFirst({
                        where: { name: { contains: med.name.trim(), mode: "insensitive" } },
                    });

                    if (existingMed) {
                        medicineId = existingMed.id;
                    } else {
                        // Create medicine record on the fly so it exists in inventory
                        const newMed = await prisma.medicine.create({
                            data: {
                                name: med.name.trim(),
                                category: "General Therapeutics",
                                currentStock: 150,
                                minStockLevel: 20,
                                unit: "tablets",
                                pricePerUnit: 15.0,
                            },
                        });
                        medicineId = newMed.id;
                    }
                }

                if (medicineId) {
                    prescriptionItemsData.push({
                        medicineId,
                        dosage: med.dosage || med.dose || "1 tablet",
                        frequency: med.frequency || med.freq || "Twice daily",
                        duration: med.duration || med.dur || "5 days",
                        quantity: parseInt(med.quantity) || 10,
                    });
                }
            }

            if (prescriptionItemsData.length > 0) {
                await prisma.prescription.create({
                    data: {
                        visitId: targetVisitId,
                        doctorId: doctorId || "DOC-DEFAULT",
                        doctorName: doctorName || "Attending Doctor",
                        notes: clinicalNotes || null,
                        status: "PENDING",
                        items: {
                            create: prescriptionItemsData,
                        },
                    },
                });
            }
        }

        // 2. If lab testing orders are flagged, dispatch them to Lab Dashboard records
        if (labTests && labTests.length > 0) {
            for (const test of labTests) {
                await prisma.labOrder.create({
                    data: {
                        visitId: targetVisitId,
                        doctorId,
                        doctorName,
                        testName: test.name,
                        category: test.category || "General Routine",
                        status: "PENDING",
                    },
                });
            }
        }

        return NextResponse.json({ success: true, message: "Orders successfully dispatched to Pharmacy and Lab panels." });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}