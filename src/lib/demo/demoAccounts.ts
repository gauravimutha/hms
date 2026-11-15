export interface DemoAccount {
  id: string;
  role: "ADMIN" | "DOCTOR" | "NURSE" | "RECEPTIONIST" | "LAB_TECHNICIAN" | "PHARMACIST";
  name: string;
  email: string;
  password: string;
  employeeId: string;
  title: string;
  department: string;
  avatar: string;
  landingRoute: string;
  badge: string;
  summary: string;
  keyResponsibilities: string[];
}

export const DEMO_PASSWORD = "DemoPassword@2026";

export const DEMO_ACCOUNTS: DemoAccount[] = [
  {
    id: "demo-receptionist",
    role: "RECEPTIONIST",
    name: "Ananya Desai",
    email: "receptionist.demo@bizlume.in",
    password: DEMO_PASSWORD,
    employeeId: "EMP-REC-01",
    title: "Senior Front-Desk Executive",
    department: "Patient Intake & Billing",
    avatar: "AD",
    landingRoute: "/registeration",
    badge: "Phase 1: Registration",
    summary: "Handles patient intake, smart queue prioritization, appointment bookings, and initial consultation fee billing.",
    keyResponsibilities: [
      "Patient demographic and contact registration",
      "Dynamic OPD queue assignment and priority scoring",
      "Appointment scheduling and doctor calendar review",
      "OPD fee collection and invoice generation",
    ],
  },
  {
    id: "demo-nurse",
    role: "NURSE",
    name: "Priya Sharma",
    email: "nurse.demo@bizlume.in",
    password: DEMO_PASSWORD,
    employeeId: "EMP-NURSE-01",
    title: "Lead Triage Nurse",
    department: "Emergency & Outpatient Triage",
    avatar: "PS",
    landingRoute: "/vitals",
    badge: "Phase 2: Triage & Vitals",
    summary: "Measures patient vital signs, flags abnormal clinical parameters, and performs acuity triage before doctor consultations.",
    keyResponsibilities: [
      "Baseline vitals recording (BP, Pulse, SpO2, Temp, RR)",
      "Clinical triage acuity scoring (High / Medium / Low)",
      "Chief complaint recording and nurse observation notes",
      "Urgent alert routing to attending doctor",
    ],
  },
  {
    id: "demo-doctor",
    role: "DOCTOR",
    name: "Dr. Aarav Mehta",
    email: "doctor.demo@bizlume.in",
    password: DEMO_PASSWORD,
    employeeId: "EMP-DOC-01",
    title: "Chief of Medicine & Cardiologist",
    department: "Internal Medicine & Cardiology",
    avatar: "AM",
    landingRoute: "/doctor-dashboard",
    badge: "Phase 3: EMR & Consultation",
    summary: "Reviews triage vitals, conducts clinical consultations, uses AI diagnostic co-pilot, and dispatches electronic prescriptions and lab orders.",
    keyResponsibilities: [
      "Live algorithmic patient queue assessment",
      "Full longitudinal EMR review and clinical notes",
      "AI clinical interaction and allergy contraindication checks",
      "Digital prescription drafting and lab order dispatch",
    ],
  },
  {
    id: "demo-lab",
    role: "LAB_TECHNICIAN",
    name: "Rahul Verma",
    email: "lab.demo@bizlume.in",
    password: DEMO_PASSWORD,
    employeeId: "EMP-LAB-01",
    title: "Senior Medical Laboratory Technician",
    department: "Diagnostic Pathology & Radiology",
    avatar: "RV",
    landingRoute: "/lab-dashboard",
    badge: "Phase 4: Laboratory",
    summary: "Processes doctor-ordered diagnostic tests, enters quantitative and qualitative laboratory findings, and flags critical abnormalities.",
    keyResponsibilities: [
      "Real-time diagnostic order worklist management",
      "Specimen collection tracking and analysis logging",
      "Quantitative diagnostic test result entry",
      "Critical pathological value alerts to clinician",
    ],
  },
  {
    id: "demo-pharmacy",
    role: "PHARMACIST",
    name: "Neha Kapoor",
    email: "pharmacy.demo@bizlume.in",
    password: DEMO_PASSWORD,
    employeeId: "EMP-PHARM-01",
    title: "Chief Hospital Pharmacist",
    department: "Clinical Pharmacy & Inventory",
    avatar: "NK",
    landingRoute: "/pharmacy-dashboard",
    badge: "Phase 5: Pharmacy",
    summary: "Fulfills doctor electronic prescriptions, verifies batch numbers and expiry dates, dispenses medications, and tracks stock levels.",
    keyResponsibilities: [
      "Prescription verification and barcode lookup",
      "Stock availability and expiry validation",
      "Medication dispensing and dosage instructions",
      "Automated stock level depletion and audit logging",
    ],
  },
  {
    id: "demo-admin",
    role: "ADMIN",
    name: "Hospital Administrator",
    email: "admin.demo@bizlume.in",
    password: DEMO_PASSWORD,
    employeeId: "EMP-ADMIN-01",
    title: "Chief Operating Officer",
    department: "Executive Hospital Administration",
    avatar: "HA",
    landingRoute: "/admin-dashboard",
    badge: "Phase 6: Admin & Analytics",
    summary: "Oversees hospital-wide operations, approves clinical staff onboarding, reviews real-time revenue analytics, and inspects audit logs.",
    keyResponsibilities: [
      "Executive operational metrics and bed/patient velocity",
      "Role-based staff account approval and RBAC governance",
      "Revenue cycle, billing collections, and OPD financials",
      "Department activity monitoring and clinical audit trails",
    ],
  },
];

export const PENDING_DEMO_STAFF = {
  name: "Dr. Siddharth Sen",
  email: "siddharth.pending@bizlume.in",
  employeeId: "EMP-DOC-PENDING",
  role: "DOCTOR" as const,
  department: "Pulmonology",
  status: false,
};
