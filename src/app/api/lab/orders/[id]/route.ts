import { NextResponse } from "next/server";
import prisma from "@/lib/db";

// GET /api/lab/orders/[id]
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const order = await prisma.labOrder.findUnique({
      where: { id },
      include: {
        visit: {
          include: {
            patient: true,
          },
        },
      },
    });

    if (!order) {
      return NextResponse.json({ error: "Lab order not found" }, { status: 404 });
    }

    const mapped = {
      id: order.id,
      visitId: order.visitId,
      patientId: order.visit.patient.id,
      patientCode: order.visit.patient.patientCode,
      patientName: order.visit.patient.name,
      patientAge: order.visit.patient.age,
      patientGender: order.visit.patient.gender,
      patientPhone: order.visit.patient.phone,
      bloodGroup: order.visit.patient.bloodGroup,
      allergies: order.visit.patient.allergies,
      existingConditions: order.visit.patient.existingConditions,
      testName: order.testName,
      category: order.category,
      doctorId: order.doctorId,
      doctorName: order.doctorName,
      status: order.status,
      resultNotes: order.resultNotes,
      flaggedAlert: order.flaggedAlert,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
    };

    return NextResponse.json(mapped, { status: 200 });
  } catch (error: any) {
    console.error("Get lab order error:", error);
    return NextResponse.json({ error: "Failed to fetch lab order" }, { status: 500 });
  }
}

// PATCH /api/lab/orders/[id]
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { status, resultNotes, flaggedAlert } = body;

    const updated = await prisma.labOrder.update({
      where: { id },
      data: {
        ...(status ? { status } : {}),
        ...(resultNotes !== undefined ? { resultNotes } : {}),
        ...(flaggedAlert !== undefined ? { flaggedAlert: Boolean(flaggedAlert) } : {}),
      },
    });

    return NextResponse.json({
      success: true,
      order: updated,
      message: "Lab order updated successfully.",
    });
  } catch (error: any) {
    console.error("Update lab order error:", error);
    return NextResponse.json({ error: "Failed to update lab order" }, { status: 500 });
  }
}
