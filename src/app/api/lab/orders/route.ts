import { NextResponse } from "next/server";
import prisma from "@/lib/db";

// GET /api/lab/orders
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");

    const orders = await prisma.labOrder.findMany({
      where: status ? { status: status as any } : {},
      orderBy: { createdAt: "desc" },
      include: {
        visit: {
          include: {
            patient: {
              select: {
                id: true,
                patientCode: true,
                name: true,
                age: true,
                gender: true,
                phone: true,
                bloodGroup: true,
              },
            },
          },
        },
      },
    });

    const mapped = orders.map((o) => ({
      id: o.id,
      visitId: o.visitId,
      patientId: o.visit.patient.id,
      patientCode: o.visit.patient.patientCode,
      patientName: o.visit.patient.name,
      patientAge: o.visit.patient.age,
      patientGender: o.visit.patient.gender,
      patientPhone: o.visit.patient.phone,
      bloodGroup: o.visit.patient.bloodGroup,
      testName: o.testName,
      category: o.category,
      doctorId: o.doctorId,
      doctorName: o.doctorName,
      status: o.status,
      resultNotes: o.resultNotes,
      flaggedAlert: o.flaggedAlert,
      createdAt: o.createdAt,
      updatedAt: o.updatedAt,
    }));

    return NextResponse.json(mapped, { status: 200 });
  } catch (error: any) {
    console.error("Fetch lab orders error:", error);
    return NextResponse.json({ error: "Failed to fetch lab orders" }, { status: 500 });
  }
}

// POST /api/lab/orders
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { visitId, doctorId, doctorName, testName, category } = body;

    if (!visitId || !testName) {
      return NextResponse.json(
        { error: "visitId and testName are required" },
        { status: 400 }
      );
    }

    const order = await prisma.labOrder.create({
      data: {
        visitId,
        doctorId: doctorId || "DOC-DEFAULT",
        doctorName: doctorName || "Attending Physician",
        testName,
        category: category || "General Diagnostic",
        status: "PENDING",
      },
    });

    return NextResponse.json(order, { status: 201 });
  } catch (error: any) {
    console.error("Create lab order error:", error);
    return NextResponse.json({ error: "Failed to create lab order" }, { status: 500 });
  }
}
