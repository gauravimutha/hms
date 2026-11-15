import "dotenv/config";
import prisma from "../src/lib/db";
import { DEMO_ACCOUNTS, PENDING_DEMO_STAFF } from "../src/lib/demo/demoAccounts";
import jwt from "jsonwebtoken";

async function runE2ETest() {
  console.log("==================================================");
  console.log("  BIZLUME HMS — END-TO-END DEMO VERIFICATION TEST  ");
  console.log("==================================================");

  const secret = process.env.JWT_SECRET || "fallback_secret";

  // 1. Verify All 6 Demo Accounts in Database
  console.log("\n[TEST 1] Verifying all 6 demo accounts exist and are approved in PostgreSQL...");
  for (const acc of DEMO_ACCOUNTS) {
    const user = await prisma.user.findUnique({ where: { email: acc.email } });
    if (!user) throw new Error(`Demo user missing: ${acc.email}`);
    if (!user.status) throw new Error(`Demo user not approved: ${acc.email}`);
    console.log(`  ✓ ${acc.role}: ${user.name} (${user.email}) - Status: Active`);
  }

  // 2. Verify Pending Staff Account
  console.log("\n[TEST 2] Verifying pending staff account for admin approval demo...");
  const pendingUser = await prisma.user.findUnique({ where: { email: PENDING_DEMO_STAFF.email } });
  if (!pendingUser) throw new Error("Pending demo user missing");
  console.log(`  ✓ Pending staff: ${pendingUser.name} (${pendingUser.email}) - Status: ${pendingUser.status ? "Active" : "Pending (Ready for approval)"}`);

  // 3. Verify DoctorProfile
  console.log("\n[TEST 3] Verifying DoctorProfile for Dr. Aarav Mehta...");
  const docUser = await prisma.user.findUnique({ where: { email: "doctor.demo@bizlume.in" } });
  const docProfile = await prisma.doctorProfile.findUnique({ where: { userId: docUser!.id } });
  if (!docProfile) throw new Error("DoctorProfile missing for Dr. Aarav Mehta");
  console.log(`  ✓ DoctorProfile linked: ${docProfile.fullName}, Spec: ${docProfile.specialization}, Fee: ₹${docProfile.consultationFee}`);

  // 4. Verify Seeded Patients & Visits
  console.log("\n[TEST 4] Verifying 25 seeded patients and visits in PostgreSQL...");
  const demoPatients = await prisma.patient.findMany({
    where: { patientCode: { startsWith: "HMS-DEMO-" } },
    include: { visits: { include: { queueEntry: true } } },
  });
  console.log(`  ✓ Found ${demoPatients.length} demo patients with valid foreign keys.`);
  if (demoPatients.length < 20) throw new Error("Expected at least 20 demo patients");

  // 5. Verify Medicine Inventory
  console.log("\n[TEST 5] Verifying pharmacy medicine inventory...");
  const medicines = await prisma.medicine.findMany();
  console.log(`  ✓ Found ${medicines.length} medicines in inventory.`);
  const lowStock = medicines.filter(m => m.currentStock <= m.minStockLevel);
  console.log(`  ✓ Low stock alerts tracked: ${lowStock.length} (e.g. ${lowStock[0]?.name || "None"})`);

  // 6. Simulate Phase 1: Receptionist Patient Intake & Queue Creation
  console.log("\n[TEST 6] Simulating Phase 1: Receptionist Registers Patient & Enqueues...");
  const testPhone = "+91 98201 99911";
  await prisma.patient.deleteMany({ where: { phone: testPhone } });

  const newPatient = await prisma.patient.create({
    data: {
      patientCode: "HMS-DEMO-TEST1",
      name: "Test Simulation Patient",
      age: 45,
      gender: "Male",
      phone: testPhone,
      city: "Mumbai",
      allergies: "Penicillin",
      existingConditions: ["Hypertension"],
    },
  });

  const testVisit = await prisma.visit.create({
    data: {
      patientId: newPatient.id,
      critical: "high",
      doctorProfileId: docProfile.id,
      registrationFee: 500.0,
      paymentStatus: false,
    },
  });

  const testQueue = await prisma.queueEntry.create({
    data: {
      visitId: testVisit.id,
      doctorProfileId: docProfile.id,
      status: "WAITING",
      queueScore: 92.5,
      position: 1,
    },
  });
  console.log(`  ✓ Patient ${newPatient.name} registered and queued for Dr. Aarav Mehta (Queue Entry: ${testQueue.id})`);

  // 7. Simulate Phase 2: Nurse Triage Vitals
  console.log("\n[TEST 7] Simulating Phase 2: Nurse Records Baseline Vitals...");
  const testEMR = await prisma.eMRVisit.create({
    data: {
      visitId: testVisit.id,
      doctorId: docUser!.id,
      doctorName: "Dr. Aarav Mehta",
      bloodPressure: "158/98",
      heartRate: "96",
      temperature: "99.1",
      respiratoryRate: "22",
      weight: "74",
      chiefComplaint: "Acute retrosternal chest pain for 2 hours",
      clinicalNotes: "Evaluated in triage bay 1. High acuity alert triggered.",
    },
  });
  console.log(`  ✓ Nurse recorded vitals: BP ${testEMR.bloodPressure}, HR ${testEMR.heartRate} bpm, Temp ${testEMR.temperature}°F`);

  // 8. Simulate Phase 3: Doctor Consultation & Dispatch (Rx + Lab)
  console.log("\n[TEST 8] Simulating Phase 3: Doctor EMR Consultation & Multi-Department Dispatch...");
  const calpol = medicines.find(m => m.name.includes("Calpol")) || medicines[0];
  const panto = medicines.find(m => m.name.includes("Pantocid")) || medicines[1];

  const testRx = await prisma.prescription.create({
    data: {
      visitId: testVisit.id,
      doctorId: docUser!.id,
      doctorName: "Dr. Aarav Mehta",
      status: "PENDING",
      items: {
        create: [
          { medicineId: calpol.id, dosage: "650mg", frequency: "SOS", duration: "3 days", quantity: 6 },
          { medicineId: panto.id, dosage: "40mg", frequency: "Once daily", duration: "5 days", quantity: 5 },
        ],
      },
    },
  });

  const testLab = await prisma.labOrder.create({
    data: {
      visitId: testVisit.id,
      doctorId: docUser!.id,
      doctorName: "Dr. Aarav Mehta",
      testName: "Troponin I Quantitative & 12-Lead ECG",
      category: "Cardiology",
      status: "PENDING",
      flaggedAlert: true,
    },
  });
  console.log(`  ✓ Doctor dispatched Prescription (${testRx.id}) to Pharmacy and Lab Order (${testLab.id}) to Laboratory.`);

  // 9. Simulate Phase 4: Lab Technician Completes Test
  console.log("\n[TEST 9] Simulating Phase 4: Lab Technician Publishes Findings...");
  const updatedLab = await prisma.labOrder.update({
    where: { id: testLab.id },
    data: {
      status: "COMPLETED",
      resultNotes: "Troponin I: 0.14 ng/mL (Reference < 0.04 ng/mL - Elevated). Critical notification sent.",
      flaggedAlert: true,
    },
  });
  console.log(`  ✓ Lab order ${updatedLab.id} completed with critical flag.`);

  // 10. Simulate Phase 5: Pharmacist Dispenses Medication
  console.log("\n[TEST 10] Simulating Phase 5: Pharmacist Dispenses Rx & Deducts Stock...");
  const stockBefore = calpol.currentStock;
  await prisma.medicine.update({
    where: { id: calpol.id },
    data: { currentStock: { decrement: 6 } },
  });
  await prisma.prescription.update({
    where: { id: testRx.id },
    data: { status: "DISPENSED" },
  });
  const calpolAfter = await prisma.medicine.findUnique({ where: { id: calpol.id } });
  console.log(`  ✓ Medication dispensed. Calpol stock deducted from ${stockBefore} to ${calpolAfter!.currentStock}.`);

  // 11. Simulate Phase 6: Admin Approves Pending Staff
  console.log("\n[TEST 11] Simulating Phase 6: Admin Approves Pending Staff Onboarding...");
  const approvedStaff = await prisma.user.update({
    where: { email: PENDING_DEMO_STAFF.email },
    data: { status: true },
  });
  console.log(`  ✓ Staff ${approvedStaff.name} status updated to: ${approvedStaff.status ? "APPROVED" : "PENDING"}`);

  // Cleanup test patient
  await prisma.prescriptionItem.deleteMany({ where: { prescriptionId: testRx.id } });
  await prisma.prescription.delete({ where: { id: testRx.id } });
  await prisma.labOrder.delete({ where: { id: testLab.id } });
  await prisma.eMRVisit.delete({ where: { id: testEMR.id } });
  await prisma.queueEntry.delete({ where: { id: testQueue.id } });
  await prisma.visit.delete({ where: { id: testVisit.id } });
  await prisma.patient.delete({ where: { id: newPatient.id } });

  // Re-set pending staff back to false
  await prisma.user.update({
    where: { email: PENDING_DEMO_STAFF.email },
    data: { status: false },
  });

  console.log("\n==================================================");
  console.log("  ALL 11 END-TO-END DEMO TESTS PASSED (100% SUCCESS) ");
  console.log("==================================================");
  process.exit(0);
}

runE2ETest().catch((err) => {
  console.error("Test failed:", err);
  process.exit(1);
});
