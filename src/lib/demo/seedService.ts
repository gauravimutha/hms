import bcrypt from "bcrypt";
import type { PrismaClient } from "@prisma/client";
import { DEMO_ACCOUNTS, PENDING_DEMO_STAFF, DEMO_PASSWORD } from "./demoAccounts";

export async function seedDemoDatabase(prisma: PrismaClient) {
  console.log("⚡ Starting BizLume HMS Demo Data Seeding...");

  // 1. Create or Update Demo Staff Accounts
  const hashedPassword = await bcrypt.hash(DEMO_PASSWORD, 10);

  const demoUserMap: Record<string, string> = {};

  for (const acc of DEMO_ACCOUNTS) {
    const user = await prisma.user.upsert({
      where: { email: acc.email },
      update: {
        name: acc.name,
        role: acc.role,
        status: true,
        password: hashedPassword,
        employeeId: acc.employeeId,
      },
      create: {
        email: acc.email,
        name: acc.name,
        role: acc.role,
        status: true,
        password: hashedPassword,
        employeeId: acc.employeeId,
      },
    });
    demoUserMap[acc.role] = user.id;
  }

  // Create Pending Staff Account for Admin Approval Demo
  await prisma.user.upsert({
    where: { email: PENDING_DEMO_STAFF.email },
    update: {
      name: PENDING_DEMO_STAFF.name,
      role: PENDING_DEMO_STAFF.role,
      status: false, // Intentionally pending
      password: hashedPassword,
      employeeId: PENDING_DEMO_STAFF.employeeId,
    },
    create: {
      email: PENDING_DEMO_STAFF.email,
      name: PENDING_DEMO_STAFF.name,
      role: PENDING_DEMO_STAFF.role,
      status: false,
      password: hashedPassword,
      employeeId: PENDING_DEMO_STAFF.employeeId,
    },
  });

  // 2. Doctor Profiles for Dr. Aarav Mehta and associated specialists
  const doctorUserId = demoUserMap["DOCTOR"];

  const doctorProfile = await prisma.doctorProfile.upsert({
    where: { userId: doctorUserId },
    update: {
      fullName: "Dr. Aarav Mehta",
      specialization: "Cardiology & Internal Medicine",
      qualification: "MBBS, MD (Medicine), DM (Cardiology)",
      experience: 14,
      phone: "+91 98201 22341",
      consultationFee: 500.0,
      availableNow: true,
      weeklySlots: {
        monday: ["09:00-13:00", "15:00-18:00"],
        tuesday: ["09:00-13:00", "15:00-18:00"],
        wednesday: ["09:00-13:00", "15:00-18:00"],
        thursday: ["09:00-13:00", "15:00-18:00"],
        friday: ["09:00-13:00", "15:00-18:00"],
        saturday: ["09:00-14:00"],
      },
    },
    create: {
      userId: doctorUserId,
      fullName: "Dr. Aarav Mehta",
      specialization: "Cardiology & Internal Medicine",
      qualification: "MBBS, MD (Medicine), DM (Cardiology)",
      experience: 14,
      phone: "+91 98201 22341",
      consultationFee: 500.0,
      availableNow: true,
      weeklySlots: {
        monday: ["09:00-13:00", "15:00-18:00"],
        tuesday: ["09:00-13:00", "15:00-18:00"],
        wednesday: ["09:00-13:00", "15:00-18:00"],
        thursday: ["09:00-13:00", "15:00-18:00"],
        friday: ["09:00-13:00", "15:00-18:00"],
        saturday: ["09:00-14:00"],
      },
    },
  });

  // 3. Populate Essential Medicine Inventory
  const MEDICINES_SEED = [
    {
      name: "Amoxicillin Trihydrate 500mg",
      genericName: "Amoxicillin",
      category: "Antibiotics",
      manufacturer: "Cipla Healthcare",
      batchNumber: "AMX-2026-A1",
      barcode: "890111223301",
      currentStock: 350,
      minStockLevel: 50,
      unit: "capsules",
      pricePerUnit: 12.5,
      expiryDate: new Date("2028-06-30"),
    },
    {
      name: "Calpol 650 (Paracetamol 650mg)",
      genericName: "Paracetamol",
      category: "Analgesic & Antipyretic",
      manufacturer: "GlaxoSmithKline India",
      batchNumber: "PCM-2026-F4",
      barcode: "890111223302",
      currentStock: 800,
      minStockLevel: 100,
      unit: "tablets",
      pricePerUnit: 3.5,
      expiryDate: new Date("2028-12-31"),
    },
    {
      name: "Pantocid 40 (Pantoprazole 40mg)",
      genericName: "Pantoprazole Gastro-Resistant",
      category: "Gastroenterology / Antacid",
      manufacturer: "Sun Pharma",
      batchNumber: "PAN-2026-B8",
      barcode: "890111223303",
      currentStock: 420,
      minStockLevel: 60,
      unit: "tablets",
      pricePerUnit: 9.0,
      expiryDate: new Date("2027-09-30"),
    },
    {
      name: "Azithral 500 (Azithromycin 500mg)",
      genericName: "Azithromycin",
      category: "Antibiotics",
      manufacturer: "Alembic Pharmaceuticals",
      batchNumber: "AZI-2026-C3",
      barcode: "890111223304",
      currentStock: 190,
      minStockLevel: 40,
      unit: "tablets",
      pricePerUnit: 22.0,
      expiryDate: new Date("2027-11-30"),
    },
    {
      name: "Glycomet 500 (Metformin HCl 500mg)",
      genericName: "Metformin Hydrochloride",
      category: "Antidiabetic",
      manufacturer: "USV Private Limited",
      batchNumber: "MET-2026-D9",
      barcode: "890111223305",
      currentStock: 650,
      minStockLevel: 80,
      unit: "tablets",
      pricePerUnit: 4.8,
      expiryDate: new Date("2028-04-30"),
    },
    {
      name: "Atorva 20 (Atorvastatin 20mg)",
      genericName: "Atorvastatin Calcium",
      category: "Cardiovascular / Statin",
      manufacturer: "Zydus Cadila",
      batchNumber: "ATV-2026-E5",
      barcode: "890111223306",
      currentStock: 300,
      minStockLevel: 50,
      unit: "tablets",
      pricePerUnit: 14.2,
      expiryDate: new Date("2027-08-31"),
    },
    {
      name: "Telma 40 (Telmisartan 40mg)",
      genericName: "Telmisartan",
      category: "Cardiovascular / Antihypertensive",
      manufacturer: "Glenmark Pharmaceuticals",
      batchNumber: "TEL-2026-G2",
      barcode: "890111223307",
      currentStock: 280,
      minStockLevel: 40,
      unit: "tablets",
      pricePerUnit: 11.0,
      expiryDate: new Date("2028-03-31"),
    },
    {
      name: "Montair LC (Montelukast + Levocetirizine)",
      genericName: "Montelukast 10mg + Levocetirizine 5mg",
      category: "Respiratory & Antiallergic",
      manufacturer: "Cipla Healthcare",
      batchNumber: "MNT-2026-H7",
      barcode: "890111223308",
      currentStock: 15, // Intentionally low stock to trigger alert!
      minStockLevel: 30,
      unit: "tablets",
      pricePerUnit: 18.5,
      expiryDate: new Date("2027-10-31"),
    },
  ];

  const medicineRecords: Record<string, string> = {};
  for (const med of MEDICINES_SEED) {
    const existing = await prisma.medicine.findFirst({
      where: { name: med.name },
    });
    if (existing) {
      await prisma.medicine.update({
        where: { id: existing.id },
        data: med,
      });
      medicineRecords[med.name] = existing.id;
    } else {
      const created = await prisma.medicine.create({
        data: med,
      });
      medicineRecords[med.name] = created.id;
    }
  }

  // 4. Create 25 Realistic Indian Demo Patients & Visits
  const PATIENTS_SEED = [
    {
      code: "HMS-DEMO-001",
      name: "Rajesh Kumar Sharma",
      age: 52,
      gender: "Male",
      phone: "+91 98201 10001",
      email: "rajesh.sharma@example.com",
      bloodGroup: "B+",
      city: "Mumbai",
      critical: "high",
      existingConditions: ["Hypertension", "Dyslipidemia"],
      allergies: "Sulfa drugs",
      queueStatus: "WAITING" as const,
      chiefComplaint: "Acute retrosternal chest pain radiating to left shoulder with shortness of breath",
      triageAcuity: "HIGH",
      needsLab: true,
      labTest: "Troponin I & 12-Lead ECG",
      labCategory: "Cardiology",
      needsPrescription: true,
    },
    {
      code: "HMS-DEMO-002",
      name: "Sunita Patel",
      age: 46,
      gender: "Female",
      phone: "+91 98201 10002",
      email: "sunita.patel@example.com",
      bloodGroup: "O+",
      city: "Ahmedabad",
      critical: "medium",
      existingConditions: ["Type 2 Diabetes Mellitus"],
      allergies: "None reported",
      queueStatus: "WAITING" as const,
      chiefComplaint: "Persistent dry cough, evening low-grade pyrexia for 10 days",
      triageAcuity: "MEDIUM",
      needsLab: true,
      labTest: "Complete Blood Count (CBC) with ESR",
      labCategory: "Hematology",
      needsPrescription: true,
    },
    {
      code: "HMS-DEMO-003",
      name: "Vikramaditya Malhotra",
      age: 61,
      gender: "Male",
      phone: "+91 98201 10003",
      email: "vikram.malhotra@example.com",
      bloodGroup: "A+",
      city: "Delhi NCR",
      critical: "low",
      existingConditions: ["Mild Osteoarthritis"],
      allergies: "Penicillin",
      queueStatus: "WAITING" as const,
      chiefComplaint: "Routine hypertension medication refill and baseline blood pressure evaluation",
      triageAcuity: "LOW",
      needsLab: false,
      needsPrescription: true,
    },
    {
      code: "HMS-DEMO-004",
      name: "Ananya Iyer",
      age: 29,
      gender: "Female",
      phone: "+91 98201 10004",
      email: "ananya.iyer@example.com",
      bloodGroup: "AB+",
      city: "Bengaluru",
      critical: "medium",
      existingConditions: ["Bronchial Asthma"],
      allergies: "Aspirin",
      queueStatus: "IN_PROGRESS" as const,
      chiefComplaint: "Wheezing exacerbated by seasonal pollen, nocturnal coughing",
      triageAcuity: "MEDIUM",
      needsLab: true,
      labTest: "Serum IgE & Pulmonary Function",
      labCategory: "Immunology",
      needsPrescription: true,
    },
    {
      code: "HMS-DEMO-005",
      name: "Mohammed Farhan",
      age: 38,
      gender: "Male",
      phone: "+91 98201 10005",
      email: "farhan.m@example.com",
      bloodGroup: "O-",
      city: "Hyderabad",
      critical: "low",
      existingConditions: [],
      allergies: "None reported",
      queueStatus: "WAITING" as const,
      chiefComplaint: "Gastric burning and dyspepsia after meals for two weeks",
      triageAcuity: "LOW",
      needsLab: false,
      needsPrescription: true,
    },
    {
      code: "HMS-DEMO-006",
      name: "Pooja Hegde",
      age: 34,
      gender: "Female",
      phone: "+91 98201 10006",
      email: "pooja.hegde@example.com",
      bloodGroup: "B+",
      city: "Pune",
      critical: "medium",
      existingConditions: ["Migraine"],
      allergies: "None reported",
      queueStatus: "WAITING" as const,
      chiefComplaint: "Severe unilateral throbbing headache with photophobia",
      triageAcuity: "MEDIUM",
      needsLab: true,
      labTest: "X-Ray Cervical Spine AP/Lat",
      labCategory: "Radiology",
      needsPrescription: true,
    },
    {
      code: "HMS-DEMO-007",
      name: "Arjun Venkataraman",
      age: 55,
      gender: "Male",
      phone: "+91 98201 10007",
      email: "arjun.v@example.com",
      bloodGroup: "A-",
      city: "Chennai",
      critical: "high",
      existingConditions: ["Ischemic Heart Disease", "Type 2 Diabetes"],
      allergies: "Iodine contrast",
      queueStatus: "WAITING" as const,
      chiefComplaint: "Shortness of breath on mild exertion and bilateral pedal edema",
      triageAcuity: "HIGH",
      needsLab: true,
      labTest: "Serum Creatinine & Electrolytes",
      labCategory: "Biochemistry",
      needsPrescription: true,
    },
    {
      code: "HMS-DEMO-008",
      name: "Meera Krishnan",
      age: 41,
      gender: "Female",
      phone: "+91 98201 10008",
      email: "meera.k@example.com",
      bloodGroup: "O+",
      city: "Kochi",
      critical: "low",
      existingConditions: ["Hypothyroidism"],
      allergies: "None",
      queueStatus: "WAITING" as const,
      chiefComplaint: "Follow-up thyroid hormone profile review",
      triageAcuity: "LOW",
      needsLab: true,
      labTest: "Thyroid Profile (T3, T4, TSH)",
      labCategory: "Endocrinology",
      needsPrescription: true,
    },
    {
      code: "HMS-DEMO-009",
      name: "Suresh Chandra Gupta",
      age: 68,
      gender: "Male",
      phone: "+91 98201 10009",
      email: "suresh.gupta@example.com",
      bloodGroup: "B+",
      city: "Jaipur",
      critical: "medium",
      existingConditions: ["Chronic Kidney Disease Stage 2", "Hypertension"],
      allergies: "NSAIDs",
      queueStatus: "WAITING" as const,
      chiefComplaint: "Routine nephrology review and blood pressure assessment",
      triageAcuity: "MEDIUM",
      needsLab: true,
      labTest: "Blood Urea Nitrogen & Creatinine",
      labCategory: "Biochemistry",
      needsPrescription: true,
    },
    {
      code: "HMS-DEMO-010",
      name: "Deepika Ranawat",
      age: 27,
      gender: "Female",
      phone: "+91 98201 10010",
      email: "deepika.r@example.com",
      bloodGroup: "AB-",
      city: "Udaipur",
      critical: "low",
      existingConditions: [],
      allergies: "None",
      queueStatus: "COMPLETED" as const,
      chiefComplaint: "Mild viral upper respiratory tract infection, sore throat",
      triageAcuity: "LOW",
      needsLab: false,
      needsPrescription: true,
    },
    {
      code: "HMS-DEMO-011",
      name: "Naveen Chandran",
      age: 49,
      gender: "Male",
      phone: "+91 98201 10011",
      email: "naveen.c@example.com",
      bloodGroup: "O+",
      city: "Coimbatore",
      critical: "high",
      existingConditions: ["Atrial Fibrillation", "Hypertension"],
      allergies: "None",
      queueStatus: "WAITING" as const,
      chiefComplaint: "Sudden onset palpitations, dizziness, and diaphoresis",
      triageAcuity: "HIGH",
      needsLab: true,
      labTest: "Serum Potassium & Prothrombin Time (PT/INR)",
      labCategory: "Hematology",
      needsPrescription: true,
    },
    {
      code: "HMS-DEMO-012",
      name: "Geeta Ramaswamy",
      age: 63,
      gender: "Female",
      phone: "+91 98201 10012",
      email: "geeta.r@example.com",
      bloodGroup: "A+",
      city: "Madurai",
      critical: "medium",
      existingConditions: ["Type 2 Diabetes", "Diabetic Neuropathy"],
      allergies: "Morphine",
      queueStatus: "WAITING" as const,
      chiefComplaint: "Burning pain in bilateral lower limbs and fasting hyperglycemia",
      triageAcuity: "MEDIUM",
      needsLab: true,
      labTest: "HbA1c & Fasting Blood Glucose",
      labCategory: "Biochemistry",
      needsPrescription: true,
    },
    {
      code: "HMS-DEMO-013",
      name: "Karan Johar Sharma",
      age: 31,
      gender: "Male",
      phone: "+91 98201 10013",
      email: "karan.js@example.com",
      bloodGroup: "B-",
      city: "Amritsar",
      critical: "low",
      existingConditions: ["Allergic Rhinitis"],
      allergies: "Dust mites",
      queueStatus: "WAITING" as const,
      chiefComplaint: "Seasonal sneezing, runny nose, and ocular pruritus",
      triageAcuity: "LOW",
      needsLab: false,
      needsPrescription: true,
    },
    {
      code: "HMS-DEMO-014",
      name: "Shobha Sen",
      age: 57,
      gender: "Female",
      phone: "+91 98201 10014",
      email: "shobha.sen@example.com",
      bloodGroup: "AB+",
      city: "Kolkata",
      critical: "medium",
      existingConditions: ["Hypertension", "Fatty Liver Grade 1"],
      allergies: "Penicillin",
      queueStatus: "WAITING" as const,
      chiefComplaint: "Right hypochondriac heaviness after rich fatty meals",
      triageAcuity: "MEDIUM",
      needsLab: true,
      labTest: "Liver Function Test (LFT) & Ultrasound Abdomen",
      labCategory: "Biochemistry",
      needsPrescription: true,
    },
    {
      code: "HMS-DEMO-015",
      name: "Tanmay Deshmukh",
      age: 23,
      gender: "Male",
      phone: "+91 98201 10015",
      email: "tanmay.d@example.com",
      bloodGroup: "O+",
      city: "Nagpur",
      critical: "low",
      existingConditions: [],
      allergies: "None",
      queueStatus: "WAITING" as const,
      chiefComplaint: "Right ankle sprain following football game",
      triageAcuity: "LOW",
      needsLab: true,
      labTest: "X-Ray Right Ankle AP/Lat View",
      labCategory: "Radiology",
      needsPrescription: true,
    },
    {
      code: "HMS-DEMO-016",
      name: "Lakshmi Narayanan",
      age: 72,
      gender: "Female",
      phone: "+91 98201 10016",
      email: "lakshmi.n@example.com",
      bloodGroup: "B+",
      city: "Thiruvananthapuram",
      critical: "high",
      existingConditions: ["Congestive Heart Failure", "Hypertension"],
      allergies: "ACE Inhibitors (causes angioedema)",
      queueStatus: "WAITING" as const,
      chiefComplaint: "Orthopnea, nocturnal cough, and bilateral ankle swelling",
      triageAcuity: "HIGH",
      needsLab: true,
      labTest: "NT-proBNP & 2D Echocardiogram",
      labCategory: "Cardiology",
      needsPrescription: true,
    },
    {
      code: "HMS-DEMO-017",
      name: "Aditya Roy Kapur",
      age: 39,
      gender: "Male",
      phone: "+91 98201 10017",
      email: "aditya.rk@example.com",
      bloodGroup: "A+",
      city: "Chandigarh",
      critical: "medium",
      existingConditions: ["Gastroesophageal Reflux Disease (GERD)"],
      allergies: "None",
      queueStatus: "WAITING" as const,
      chiefComplaint: "Acid regurgitation and chest discomfort exacerbated by recumbency",
      triageAcuity: "MEDIUM",
      needsLab: false,
      needsPrescription: true,
    },
    {
      code: "HMS-DEMO-018",
      name: "Ritu Singhania",
      age: 44,
      gender: "Female",
      phone: "+91 98201 10018",
      email: "ritu.s@example.com",
      bloodGroup: "O-",
      city: "Surat",
      critical: "low",
      existingConditions: ["Iron Deficiency Anemia"],
      allergies: "None",
      queueStatus: "WAITING" as const,
      chiefComplaint: "Generalized fatigue, pallor, and reduced exercise tolerance",
      triageAcuity: "LOW",
      needsLab: true,
      labTest: "Complete Blood Count (CBC) & Serum Ferritin",
      labCategory: "Hematology",
      needsPrescription: true,
    },
    {
      code: "HMS-DEMO-019",
      name: "Manish Tiwari",
      age: 50,
      gender: "Male",
      phone: "+91 98201 10019",
      email: "manish.t@example.com",
      bloodGroup: "B+",
      city: "Lucknow",
      critical: "high",
      existingConditions: ["Severe Uncontrolled Hypertension"],
      allergies: "Sulfa",
      queueStatus: "WAITING" as const,
      chiefComplaint: "Severe occipital throbbing headache with epistaxis (BP 190/110)",
      triageAcuity: "HIGH",
      needsLab: true,
      labTest: "Urinalysis for Proteinuria & Serum Creatinine",
      labCategory: "Biochemistry",
      needsPrescription: true,
    },
    {
      code: "HMS-DEMO-020",
      name: "Pavitra Gowda",
      age: 33,
      gender: "Female",
      phone: "+91 98201 10020",
      email: "pavitra.g@example.com",
      bloodGroup: "A-",
      city: "Mysuru",
      critical: "low",
      existingConditions: [],
      allergies: "None",
      queueStatus: "COMPLETED" as const,
      chiefComplaint: "Pre-employment health clearance screening and routine labs",
      triageAcuity: "LOW",
      needsLab: true,
      labTest: "Executive Health Panel (CBC, LFT, KFT, Lipid)",
      labCategory: "Biochemistry",
      needsPrescription: false,
    },
    {
      code: "HMS-DEMO-021",
      name: "Balwinder Singh",
      age: 65,
      gender: "Male",
      phone: "+91 98201 10021",
      email: "balwinder.s@example.com",
      bloodGroup: "AB+",
      city: "Ludhiana",
      critical: "medium",
      existingConditions: ["Chronic Obstructive Pulmonary Disease (COPD)"],
      allergies: "Ciprofloxacin",
      queueStatus: "WAITING" as const,
      chiefComplaint: "Productive morning cough with purulent sputum for 5 days",
      triageAcuity: "MEDIUM",
      needsLab: true,
      labTest: "Sputum Culture & Sensitivity + Chest Radiograph",
      labCategory: "Microbiology",
      needsPrescription: true,
    },
    {
      code: "HMS-DEMO-022",
      name: "Sunil Babbar",
      age: 48,
      gender: "Male",
      phone: "+91 98201 10022",
      email: "sunil.b@example.com",
      bloodGroup: "O+",
      city: "Indore",
      critical: "low",
      existingConditions: ["Hyperuricemia / Gout"],
      allergies: "None",
      queueStatus: "WAITING" as const,
      chiefComplaint: "Right first metatarsophalangeal joint acute erythema and tenderness",
      triageAcuity: "LOW",
      needsLab: true,
      labTest: "Serum Uric Acid & C-Reactive Protein (CRP)",
      labCategory: "Biochemistry",
      needsPrescription: true,
    },
    {
      code: "HMS-DEMO-023",
      name: "Kalyani Mukherjee",
      age: 53,
      gender: "Female",
      phone: "+91 98201 10023",
      email: "kalyani.m@example.com",
      bloodGroup: "B+",
      city: "Bhubaneswar",
      critical: "medium",
      existingConditions: ["Type 2 Diabetes Mellitus", "Hypertension"],
      allergies: "None",
      queueStatus: "WAITING" as const,
      chiefComplaint: "Bilateral burning micturition and supra-pubic discomfort",
      triageAcuity: "MEDIUM",
      needsLab: true,
      labTest: "Urine Routine & Microscopic Examination (R/M)",
      labCategory: "Pathology",
      needsPrescription: true,
    },
    {
      code: "HMS-DEMO-024",
      name: "Zoya Akhtar Siddiqui",
      age: 36,
      gender: "Female",
      phone: "+91 98201 10024",
      email: "zoya.s@example.com",
      bloodGroup: "A+",
      city: "Bhopal",
      critical: "low",
      existingConditions: ["Migraine with Aura"],
      allergies: "Metoclopramide",
      queueStatus: "WAITING" as const,
      chiefComplaint: "Visual scintillation followed by severe hemicranial headache",
      triageAcuity: "LOW",
      needsLab: false,
      needsPrescription: true,
    },
    {
      code: "HMS-DEMO-025",
      name: "Hemant Trivedi",
      age: 59,
      gender: "Male",
      phone: "+91 98201 10025",
      email: "hemant.t@example.com",
      bloodGroup: "O-",
      city: "Vadodara",
      critical: "high",
      existingConditions: ["Coronary Artery Disease s/p PTCA (2021)"],
      allergies: "Penicillin",
      queueStatus: "WAITING" as const,
      chiefComplaint: "Exertional retrosternal angina relieved with sublingual nitrate",
      triageAcuity: "HIGH",
      needsLab: true,
      labTest: "High-Sensitivity Troponin T & CPK-MB",
      labCategory: "Cardiology",
      needsPrescription: true,
    },
  ];

  for (let i = 0; i < PATIENTS_SEED.length; i++) {
    const p = PATIENTS_SEED[i];

    // Upsert Patient record
    const patient = await prisma.patient.upsert({
      where: { phone: p.phone },
      update: {
        name: p.name,
        age: p.age,
        gender: p.gender,
        bloodGroup: p.bloodGroup,
        email: p.email,
        city: p.city,
        state: "Maharashtra",
        allergies: p.allergies,
        existingConditions: p.existingConditions,
        detailsAccurate: true,
        privacyAccepted: true,
      },
      create: {
        patientCode: p.code,
        name: p.name,
        age: p.age,
        gender: p.gender,
        bloodGroup: p.bloodGroup,
        phone: p.phone,
        email: p.email,
        city: p.city,
        state: "Maharashtra",
        country: "India",
        allergies: p.allergies,
        existingConditions: p.existingConditions,
        detailsAccurate: true,
        privacyAccepted: true,
      },
    });

    // Check if visit exists or create one
    let visit = await prisma.visit.findFirst({
      where: { patientId: patient.id },
      orderBy: { createdAt: "desc" },
    });

    if (!visit) {
      visit = await prisma.visit.create({
        data: {
          patientId: patient.id,
          critical: p.critical,
          doctorProfileId: doctorProfile.id,
          registrationFee: 500.0,
          paymentStatus: i > 4, // First 5 pending payment for billing demo!
        },
      });
    }

    // Queue Entry
    await prisma.queueEntry.upsert({
      where: { visitId: visit.id },
      update: {
        doctorProfileId: doctorProfile.id,
        status: p.queueStatus,
        manualAdjustment: p.critical === "high" ? 50 : 0,
        queueScore: p.critical === "high" ? 95.0 : p.critical === "medium" ? 60.0 : 30.0,
        position: i + 1,
      },
      create: {
        visitId: visit.id,
        doctorProfileId: doctorProfile.id,
        status: p.queueStatus,
        manualAdjustment: p.critical === "high" ? 50 : 0,
        queueScore: p.critical === "high" ? 95.0 : p.critical === "medium" ? 60.0 : 30.0,
        position: i + 1,
      },
    });

    // Baseline EMR / Vitals
    const existingEMR = await prisma.eMRVisit.findFirst({
      where: { visitId: visit.id },
    });

    if (!existingEMR) {
      await prisma.eMRVisit.create({
        data: {
          visitId: visit.id,
          doctorId: doctorUserId,
          doctorName: "Dr. Aarav Mehta",
          bloodPressure: p.critical === "high" ? "158/98" : p.critical === "medium" ? "138/88" : "120/80",
          heartRate: p.critical === "high" ? "98" : "74",
          temperature: p.critical === "medium" ? "100.4" : "98.6",
          respiratoryRate: p.critical === "high" ? "24" : "16",
          weight: "68",
          chiefComplaint: p.chiefComplaint,
          clinicalNotes: `Patient presents with ${p.chiefComplaint.toLowerCase()}. Hemodynamically assessed by nursing staff.`,
          diagnosis: p.critical === "high" ? "Suspected Acute Coronary Syndrome" : "Clinical evaluation underway",
          aiSuggestions: p.critical === "high" 
            ? "⚠ PRIORITY ALERT: Flagged high critical. Electrocardiogram and cardiac biomarkers indicated without delay." 
            : "Clinical parameters documented. Routine medication management appropriate.",
        },
      });
    }

    // Lab Orders
    if (p.needsLab && p.labTest) {
      const existingLab = await prisma.labOrder.findFirst({
        where: { visitId: visit.id, testName: p.labTest },
      });

      if (!existingLab) {
        await prisma.labOrder.create({
          data: {
            visitId: visit.id,
            doctorId: doctorUserId,
            doctorName: "Dr. Aarav Mehta",
            testName: p.labTest,
            category: p.labCategory || "General Diagnostic",
            status: i % 2 === 0 ? "PENDING" : "COMPLETED",
            resultNotes: i % 2 !== 0 ? "Test parameter readings within acceptable reference range." : null,
            flaggedAlert: p.critical === "high",
          },
        });
      }
    }

    // Prescriptions
    if (p.needsPrescription) {
      const existingPrescription = await prisma.prescription.findFirst({
        where: { visitId: visit.id },
      });

      if (!existingPrescription) {
        const amoxId = medicineRecords["Amoxicillin Trihydrate 500mg"];
        const calpolId = medicineRecords["Calpol 650 (Paracetamol 650mg)"];
        const pantoId = medicineRecords["Pantocid 40 (Pantoprazole 40mg)"];

        const rx = await prisma.prescription.create({
          data: {
            visitId: visit.id,
            doctorId: doctorUserId,
            doctorName: "Dr. Aarav Mehta",
            notes: "Take after meals with water. Complete prescribed duration.",
            status: i === 0 ? "PENDING" : i % 2 === 0 ? "DISPENSED" : "PENDING",
            items: {
              create: [
                ...(amoxId ? [{ medicineId: amoxId, dosage: "500mg", frequency: "Twice daily", duration: "5 days", quantity: 10 }] : []),
                ...(calpolId ? [{ medicineId: calpolId, dosage: "650mg", frequency: "SOS fever", duration: "3 days", quantity: 6 }] : []),
                ...(pantoId ? [{ medicineId: pantoId, dosage: "40mg", frequency: "Once daily morning", duration: "5 days", quantity: 5 }] : []),
              ],
            },
          },
        });

        // If marked dispensed, create activity log and billing
        if (rx.status === "DISPENSED") {
          await prisma.pharmacistLog.create({
            data: {
              pharmacistId: demoUserMap["PHARMACIST"],
              pharmacistName: "Neha Kapoor",
              action: "DISPENSED",
              details: `Fulfilled prescription for patient ${p.name}.`,
              prescriptionId: rx.id,
            },
          });
          await prisma.pharmacyBilling.create({
            data: {
              prescriptionId: rx.id,
              totalAmount: 185.0,
              paid: true,
              paymentMethod: "UPI",
            },
          });
        }
      }
    }
  }

  console.log("✅ BizLume HMS Demo Data Seeding Complete!");
  return {
    success: true,
    totalPatients: PATIENTS_SEED.length,
    medicinesSeeded: MEDICINES_SEED.length,
  };
}

export async function resetDemoDatabase(prisma: PrismaClient) {
  console.log("🔄 Starting Safe Demo Reset...");

  // 1. Identify Demo Patients (tagged by HMS-DEMO- or phone prefix)
  const demoPatients = await prisma.patient.findMany({
    where: {
      OR: [
        { patientCode: { startsWith: "HMS-DEMO-" } },
        { phone: { startsWith: "+91 98201 100" } },
      ],
    },
    select: { id: true },
  });

  const demoPatientIds = demoPatients.map((p) => p.id);

  if (demoPatientIds.length > 0) {
    // Find associated visits
    const demoVisits = await prisma.visit.findMany({
      where: { patientId: { in: demoPatientIds } },
      select: { id: true },
    });
    const demoVisitIds = demoVisits.map((v) => v.id);

    if (demoVisitIds.length > 0) {
      // Find prescriptions to remove billing & logs
      const demoRx = await prisma.prescription.findMany({
        where: { visitId: { in: demoVisitIds } },
        select: { id: true },
      });
      const demoRxIds = demoRx.map((r) => r.id);

      if (demoRxIds.length > 0) {
        await prisma.pharmacyBilling.deleteMany({
          where: { prescriptionId: { in: demoRxIds } },
        });
        await prisma.pharmacistLog.deleteMany({
          where: { prescriptionId: { in: demoRxIds } },
        });
        await prisma.prescriptionItem.deleteMany({
          where: { prescriptionId: { in: demoRxIds } },
        });
        await prisma.prescription.deleteMany({
          where: { id: { in: demoRxIds } },
        });
      }

      await prisma.labOrder.deleteMany({
        where: { visitId: { in: demoVisitIds } },
      });

      await prisma.eMRVisit.deleteMany({
        where: { visitId: { in: demoVisitIds } },
      });

      await prisma.queueEntry.deleteMany({
        where: { visitId: { in: demoVisitIds } },
      });

      await prisma.visit.deleteMany({
        where: { id: { in: demoVisitIds } },
      });
    }

    await prisma.patient.deleteMany({
      where: { id: { in: demoPatientIds } },
    });
  }

  // 2. Reset pending staff account back to pending (status = false)
  await prisma.user.updateMany({
    where: { email: PENDING_DEMO_STAFF.email },
    data: { status: false },
  });

  // 3. Re-seed clean demo dataset
  return await seedDemoDatabase(prisma);
}
