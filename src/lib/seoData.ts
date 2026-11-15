export interface FeatureMeta {
  slug: string;
  title: string;
  seoTitle: string;
  description: string;
  h1: string;
  badge: string;
  overview: string;
  highlights: string[];
  workflowSteps: { step: string; title: string; desc: string }[];
  faqs: { question: string; answer: string }[];
}

export interface SolutionMeta {
  slug: string;
  title: string;
  seoTitle: string;
  description: string;
  badge: string;
  heroText: string;
  painPoints: { problem: string; solution: string }[];
  featuresIncluded: string[];
  faqs: { question: string; answer: string }[];
}

export interface LocationMeta {
  slug: string;
  cityName: string;
  state: string;
  seoTitle: string;
  description: string;
  healthcareContext: string;
  keyChallengesAddressed: string[];
  suitableFacilities: string[];
  faqs: { question: string; answer: string }[];
}

export const FEATURES_DATA: Record<string, FeatureMeta> = {
  "clinical-emr": {
    slug: "clinical-emr",
    title: "Clinical EMR & Electronic Medical Records",
    seoTitle: "Clinical EMR Software India | Digital Patient Records | BizLume HMS",
    description: "Streamline doctor consultations with structured ICD-10 notes, vitals tracking, prescription generation, and instant lab orders in one unified clinical EMR.",
    h1: "Fast, Clinician-First Electronic Medical Records (EMR) Software",
    badge: "Clinical Care Module",
    overview: "BizLume's Clinical EMR system is designed by practicing doctors for high-throughput OPD environments across India. Eliminates cumbersome multi-screen clicks and provides an intuitive, high-speed single-page consultation workspace.",
    highlights: [
      "Live vital sign trend tracking (BP, pulse, respiratory rate, temperature, weight, BMI)",
      "Standardized ICD-10 disease indexing & diagnostic coding",
      "One-click dispatch for pharmacy prescriptions & diagnostic lab orders",
      "Historical encounter timeline with instantaneous past visit lookups",
      "Encrypted cloud backups with strict patient data privacy compliance"
    ],
    workflowSteps: [
      { step: "01", title: "Nurse Triage & Vitals", desc: "Vitals recorded at check-in automatically populate the doctor's consultation view." },
      { step: "02", title: "Examination & Notes", desc: "Enter chief complaints, clinical examination, and ICD-10 diagnoses with keyboard-friendly inputs." },
      { step: "03", title: "Instant Order Dispatch", desc: "Prescription line items and lab panels are dispatched to internal departments in real-time." }
    ],
    faqs: [
      { question: "Can doctors customize prescription templates?", answer: "Yes, doctors can create custom medication favorites, dosing frequencies, and reusable consultation templates." },
      { question: "Is historical patient data accessible during follow-up visits?", answer: "Yes, past consultations, previous medications, and historical lab reports appear immediately upon patient intake." }
    ]
  },
  "smart-queue-management": {
    slug: "smart-queue-management",
    title: "Smart Patient Queue & Triage Management",
    seoTitle: "Patient Queue Management System for Indian Hospitals | BizLume HMS",
    description: "Automated OPD triage queue scoring combining clinical criticality, wait time decay, and appointment slots to eliminate hospital waiting room congestion.",
    h1: "Intelligent Hospital Patient Queue & Triage Management System",
    badge: "OPD Flow Engine",
    overview: "Waiting room crowding and patient dissatisfaction are major bottlenecks in Indian OPDs. BizLume HMS features an automated mathematical queueing algorithm that dynamically balances walk-ins and pre-booked appointments.",
    highlights: [
      "Dynamic weighted scoring formula factoring wait time, triage severity, and appointment slots",
      "Receptionist override controls for emergencies, elderly patients, or deferred consultations",
      "Live digital token display compatible with TV screens and waiting room monitors",
      "Automated doctor consultation throughput tracking and average wait time metrics",
      "Prevents queue starvation for routine walk-ins while prioritizing emergency cases"
    ],
    workflowSteps: [
      { step: "01", title: "Intake & Check-in", desc: "Patient arrives at reception, pays OP fee, and receives a digital token with timestamp." },
      { step: "02", title: "Score Recalculation", desc: "System engine computes queue score continuously based on elapsed wait time and triage level." },
      { step: "03", title: "Doctor Call-in", desc: "Doctor sees the highest-priority patient at the top of their live consultation dashboard." }
    ],
    faqs: [
      { question: "How does the system handle walk-ins versus appointments?", answer: "Pre-booked appointments automatically receive priority weighting during their scheduled window, while walk-in scores increment proportionally to wait time." },
      { question: "Can the receptionist manually prioritize urgent patients?", answer: "Yes, receptionists have authorized override switches to boost acute cases directly to the top of the consultation queue." }
    ]
  },
  "patient-intake-billing": {
    slug: "patient-intake-billing",
    title: "Patient Intake & Hospital Billing Software",
    seoTitle: "Hospital Billing & Patient Registration Software India | BizLume HMS",
    description: "Fast multi-step patient registration, Aadhaar verification, automated HMS ID generation, printable registration cards, and Razorpay OP billing settlements.",
    h1: "Frictionless Patient Intake & Integrated Hospital Billing",
    badge: "Front-Desk & Revenue Hub",
    overview: "Accelerate front-desk operations with 60-second patient registration. BizLume generates official printable OPD cards with unique barcodes, handles Aadhaar documentation, and manages registration fee collections seamlessly.",
    highlights: [
      "Rapid phone number and patient code lookup for instant repeat registrations",
      "Automated sequential patient ID assignment (HMS-0001 format)",
      "Official printable registration card PDFs powered by @react-pdf/renderer",
      "Cash, card, and integrated Razorpay online payments with GST invoice generation",
      "Emergency contact documentation and allergy profiling during primary intake"
    ],
    workflowSteps: [
      { step: "01", title: "Digital Registration", desc: "Capture demographic info, contact, emergency contacts, and past clinical allergies." },
      { step: "02", title: "Doctor Selection & Token", desc: "Assign to on-duty specialists according to weekly roster schedules and live availability." },
      { step: "03", title: "Receipt & PDF Print", desc: "Generate official registration fee receipts and OPD identity slips in one click." }
    ],
    faqs: [
      { question: "Does BizLume support online payment collection?", answer: "Yes, BizLume integrates with Razorpay, allowing patients to pay via UPI (Google Pay, PhonePe, Paytm), credit/debit cards, or net banking." },
      { question: "Can duplicate patient profiles be avoided?", answer: "Yes, phone numbers and Aadhaar numbers are indexed to prevent duplicate registrations and merge repeat clinic visits." }
    ]
  },
  "diagnostic-lab-management": {
    slug: "diagnostic-lab-management",
    title: "Diagnostic Center & Laboratory Management",
    seoTitle: "Diagnostic Center & Hospital Laboratory Software India | BizLume HMS",
    description: "End-to-end hospital pathology and radiology management software. Track test orders from doctor consultation, flag abnormal vitals, and monitor reagent inventory.",
    h1: "Integrated Hospital Laboratory & Diagnostics Management System",
    badge: "Diagnostics Module",
    overview: "Connect hospital diagnostic laboratories directly with doctor consultation rooms. Lab technicians receive incoming blood and radiology orders instantaneously, record structured results, and flag critical abnormalities for urgent review.",
    highlights: [
      "Zero paper order forms: Doctors dispatch CBC, X-Ray, urinalysis directly from EMR",
      "Real-time visual abnormality alerts alerting physicians of critical blood parameters",
      "Laboratory reagent stock tracking with minimum threshold re-order alerts",
      "Integrated pathology billing linked directly to the patient's visit folio",
      "Complete historical audit log of test fulfillment times and technician sign-offs"
    ],
    workflowSteps: [
      { step: "01", title: "Doctor Test Order", desc: "Physician selects diagnostic panels during consultation, immediately notifying the lab bench." },
      { step: "02", title: "Sample Intake & Processing", desc: "Technician processes samples, inputs values, and marks status as PENDING or COMPLETED." },
      { step: "03", title: "Result Sync to Doctor", desc: "Completed results and doctor notes synchronize live to the prescribing clinician's screen." }
    ],
    faqs: [
      { question: "Can external diagnostic centers use this module?", answer: "Yes, standalone diagnostic facilities or in-house hospital labs can manage incoming test queues, reagent stock, and results independently." },
      { question: "How are urgent or critical values communicated?", answer: "Critical lab abnormalities trigger high-visibility alerts on the patient's file and doctor's dashboard." }
    ]
  },
  "ai-clinical-assistance": {
    slug: "ai-clinical-assistance",
    title: "AI-Powered Clinical Consultation Assistance",
    seoTitle: "AI Powered Hospital EMR & Clinical Assistance Software | BizLume HMS",
    description: "Clinician-assisting AI algorithms that analyze patient symptoms, vitals history, and chief complaints to accelerate diagnosis and clinical notes creation.",
    h1: "AI-Assisted Clinical Workflows for Modern Hospital Practitioners",
    badge: "Next-Gen AI Capabilities",
    overview: "BizLume integrates assistive AI algorithms designed to reduce physician administrative burnout. Analyzes presenting complaints, flags potential drug-allergy interactions, and drafts clinical summary notes while keeping full diagnostic control with the licensed physician.",
    highlights: [
      "Contextual chief complaint summarization and suggested differential considerations",
      "Automated extraction of vital sign anomalies (hypertension, tachycardia, febrile states)",
      "Instant clinical consultation documentation drafting saving 3-4 minutes per patient",
      "Safe, assistive decision support that never replaces physician judgment",
      "Privacy-preserving infrastructure ensuring patient identifiable data remains secure"
    ],
    workflowSteps: [
      { step: "01", title: "Symptom Ingestion", desc: "Doctor inputs chief complaints and triage findings into the EMR workspace." },
      { step: "02", title: "AI Analysis", desc: "Engine cross-references historical conditions and vitals to surface relevant insights." },
      { step: "03", title: "Doctor Validation", desc: "Physician reviews, modifies, and signs off on final clinical notes and prescriptions." }
    ],
    faqs: [
      { question: "Does AI make autonomous medical decisions?", answer: "No. BizLume's AI strictly serves as an assistive documentation and analytical aid. All clinical diagnoses and prescriptions remain 100% under the clinician's authority." },
      { question: "Is patient confidentiality preserved with AI processing?", answer: "Yes, data is processed within encrypted environments without using private health records for public AI model training." }
    ]
  },
  "role-based-access": {
    slug: "role-based-access",
    title: "Hospital Role-Based Access Control (RBAC)",
    seoTitle: "Hospital RBAC & Staff Management Software | BizLume HMS",
    description: "Granular hospital role-based access control for Admins, Doctors, Nurses, Receptionists, and Lab Technicians with encrypted JWT session security.",
    h1: "Enterprise Hospital Role-Based Access Control & Staff Security",
    badge: "Security & Administration",
    overview: "Hospital data governance requires strict boundaries. BizLume enforces cryptographically verified role-based access control, ensuring medical staff only see data relevant to their clinical role while hospital administrators retain comprehensive audit oversight.",
    highlights: [
      "Dedicated portals for Admins, Doctors, Nurses, Receptionists, and Technicians",
      "Admin approval gate: New medical staff registrations require administrator clearance before access",
      "JWT-based encrypted session authentication with automated middleware route guards",
      "Comprehensive system audit logs capturing staff actions, logins, and billing transactions",
      "Complete data isolation safeguarding electronic medical records against unauthorized access"
    ],
    workflowSteps: [
      { step: "01", title: "Staff Application", desc: "Medical personnel register with employee credentials and requested hospital role." },
      { step: "02", title: "Admin Verification", desc: "Hospital superintendent or administrator verifies credentials and approves access." },
      { step: "03", title: "Scoped Workspace", desc: "Authenticated staff member enters a customized dashboard strictly tailored to their duties." }
    ],
    faqs: [
      { question: "Can a receptionist view private clinical consultation notes?", answer: "No. Receptionists only have access to demographic, intake, appointment, and billing records. Clinical EMR notes are restricted to verified physicians." },
      { question: "What happens if a staff member leaves the hospital?", answer: "Administrators can deactivate employee access instantly from the admin dashboard, immediately revoking active sessions." }
    ]
  }
};

export const SOLUTIONS_DATA: Record<string, SolutionMeta> = {
  "multi-specialty-hospitals": {
    slug: "multi-specialty-hospitals",
    title: "Hospital Management Software for Multi-Specialty Hospitals",
    seoTitle: "Multi-Specialty Hospital Management Software India | BizLume HMS",
    description: "Enterprise hospital software connecting multiple outpatient departments, specialty doctor rosters, central billing, diagnostic labs, and operational reporting.",
    badge: "Enterprise Solution",
    heroText: "Built for medium and large multi-specialty hospitals managing hundreds of daily outpatients across cardiology, orthopedics, pediatrics, and general medicine.",
    painPoints: [
      { problem: "Department silos causing communication breakdowns between OPD, labs, and billing.", solution: "Centralized real-time event pipeline linking doctors, receptionists, and lab technicians." },
      { problem: "Massive waiting room overcrowding and unpredictable queue delays.", solution: "Smart priority queueing algorithm that auto-balances appointments and walk-ins across specialists." },
      { problem: "Revenue leakages from unregistered diagnostics or missed pharmacy billing.", solution: "Integrated billing desk capturing all service orders before discharge." }
    ],
    featuresIncluded: ["Dynamic OPD Triage Queue", "Multi-Doctor Roster & Availability", "Integrated Pathology & Radiology", "Centralized OP Billing & Revenue Analytics"],
    faqs: [
      { question: "Can BizLume scale to 50+ doctors simultaneously?", answer: "Yes, BizLume is built on PostgreSQL with connection pooling and high-concurrency Next.js serverless architecture." }
    ]
  },
  "small-hospitals": {
    slug: "small-hospitals",
    title: "Hospital Software for Small Hospitals & Nursing Homes",
    seoTitle: "Affordable Hospital Software for Small Hospitals & Nursing Homes India | BizLume HMS",
    description: "Lightweight, affordable, and high-speed hospital management software tailored for 10-50 bed nursing homes and community healthcare centers.",
    badge: "Community Care Solution",
    heroText: "Everything small hospital owners need: rapid patient registration, simple billing, doctor consultation notes, and staff management without expensive enterprise bloat.",
    painPoints: [
      { problem: "Traditional enterprise hospital software is too complex and expensive for small facilities.", solution: "Streamlined, cost-effective platform deployable in days with zero heavy hardware maintenance." },
      { problem: "Staff struggle with difficult software requiring weeks of training.", solution: "Intuitive, clean interface designed for immediate adoption by receptionists and nursing staff." },
      { problem: "Reliance on paper registers leading to lost records and audit failures.", solution: "Digital cloud storage ensuring complete patient history is searchable in seconds." }
    ],
    featuresIncluded: ["Fast 60-Second Patient Intake", "Doctor Queue Dashboard", "Printable Registration Receipts", "Admin Staff Approval Gate"],
    faqs: [
      { question: "Does BizLume require dedicated on-premise servers?", answer: "No, BizLume is cloud-ready and can be hosted seamlessly with high-availability PostgreSQL databases, eliminating server hardware maintenance costs." }
    ]
  },
  "daycare-clinics": {
    slug: "daycare-clinics",
    title: "Clinic Management Software for Polyclinics & Doctors",
    seoTitle: "Clinic Management Software India | Polyclinic OPD Software | BizLume HMS",
    description: "High-performance clinic management software for single and multi-doctor outpatient practices. Fast digital prescriptions, appointment scheduling, and patient history.",
    badge: "Clinic & Polyclinic Solution",
    heroText: "Empower private clinics with streamlined appointments, rapid EMR charting, and automatic digital patient lookup by phone number.",
    painPoints: [
      { problem: "Patient records scattered across paper files and physical prescription pads.", solution: "Structured digital EMR with instant repeat lookup via mobile number or patient code." },
      { problem: "High no-show rates and irregular walk-in consultation timing.", solution: "Clear appointment slot management and live doctor on/off duty availability toggle." }
    ],
    featuresIncluded: ["Instant Patient Phone Lookup", "Doctor Slot Management", "Fast ICD-10 Prescription Drafting", "Digital OP Card Generation"],
    faqs: [
      { question: "Can visiting consultants manage their own weekly availability?", answer: "Yes, doctors have dedicated profile dashboards to define weekly consultation slots and toggle live availability." }
    ]
  },
  "diagnostic-centers": {
    slug: "diagnostic-centers",
    title: "Diagnostic Center & Pathology Lab Software",
    seoTitle: "Diagnostic Center Management Software India | BizLume HMS",
    description: "Specialized pathology and radiology workflow software. Receive physician test requisitions, process panels, and report findings without manual transcription errors.",
    badge: "Diagnostic Center Solution",
    heroText: "Designed for diagnostic clinics and pathology centers seeking frictionless order receiving, rapid test reporting, and reagent stock oversight.",
    painPoints: [
      { problem: "Handwritten test orders cause misinterpretation and incorrect diagnostic testing.", solution: "Orders dispatched digitally straight from the prescribing doctor's EMR." },
      { problem: "Reagent stockouts halting laboratory operations unexpectedly.", solution: "Reagent inventory monitoring with automatic low-stock alerts." }
    ],
    featuresIncluded: ["Live Laboratory Orders Feed", "Abnormality Flagging Alert", "Reagent Stock Tracking", "Pathology Billing Settlements"],
    faqs: [
      { question: "Are diagnostic reports attached to the patient's permanent record?", answer: "Yes, test results permanently bind to the specific visit ID and patient history." }
    ]
  }
};

export const LOCATIONS_DATA: Record<string, LocationMeta> = {
  "mumbai": {
    slug: "mumbai",
    cityName: "Mumbai",
    state: "Maharashtra",
    seoTitle: "Hospital Management Software in Mumbai | Clinic & EMR System | BizLume HMS",
    description: "Leading hospital management and EMR software for hospitals, nursing homes, and polyclinics in Mumbai, Navi Mumbai, and Thane.",
    healthcareContext: "Mumbai hosts one of India's most intensive healthcare ecosystems, with high daily outpatient volumes across both private nursing homes and large multi-specialty hospitals.",
    keyChallengesAddressed: [
      "Managing massive daily OPD patient footfalls without waiting room chaos",
      "Rapid Aadhaar-linked digital intake for diverse patient demographics",
      "Seamless billing integration with Razorpay for card, UPI, and insurance copays"
    ],
    suitableFacilities: ["Multi-Specialty Hospitals in South Mumbai & Suburbs", "Private Daycare Clinics & Nursing Homes in Thane & Navi Mumbai", "Standalone Pathology & Radiology Centers"],
    faqs: [
      { question: "Is BizLume HMS available for hospitals in Mumbai and Thane?", answer: "Yes, BizLume HMS provides cloud deployment and setup assistance for clinics and hospitals across the Mumbai Metropolitan Region." }
    ]
  },
  "delhi-ncr": {
    slug: "delhi-ncr",
    cityName: "Delhi NCR",
    state: "Delhi / Haryana / UP",
    seoTitle: "Hospital Management Software in Delhi NCR | Gurgaon & Noida | BizLume HMS",
    description: "Enterprise hospital management software, clinic EMR, and smart patient queueing for hospitals across Delhi, Gurgaon, Noida, and Faridabad.",
    healthcareContext: "Delhi NCR is a primary healthcare hub serving patients from Northern India. Medical facilities require reliable digital infrastructure to streamline rapid patient intake and specialist coordination.",
    keyChallengesAddressed: [
      "Cross-department doctor consultations and digital order dispatch",
      "Smart priority triage for emergency walk-ins alongside pre-booked appointments",
      "Digital medical records management ensuring zero paper loss"
    ],
    suitableFacilities: ["Hospitals & Medical Centers in New Delhi", "Specialty Clinics in Gurugram & Noida", "Community Healthcare Centers in Ghaziabad & Faridabad"],
    faqs: [
      { question: "How does BizLume assist high-volume OPD centers in Delhi?", answer: "BizLume's algorithmic queue scoring engine prevents waiting area congestion by balancing pre-scheduled consultations with urgent walk-ins." }
    ]
  },
  "bengaluru": {
    slug: "bengaluru",
    cityName: "Bengaluru",
    state: "Karnataka",
    seoTitle: "Hospital Management Software in Bengaluru | EMR & Clinic Software | BizLume HMS",
    description: "Modern, AI-assisted hospital management software and digital EMR for clinics, healthcare startups, and hospitals in Bengaluru.",
    healthcareContext: "As India's technology and healthcare innovation capital, medical practices in Bengaluru demand cutting-edge, tech-forward software that eliminates paperwork and optimizes clinician time.",
    keyChallengesAddressed: [
      "Modern clinician-first EMR with AI clinical note assistance",
      "Digital payment integration (UPI, QR, Card) eliminating cashier queues",
      "Granular role-based staff controls with encrypted cloud storage"
    ],
    suitableFacilities: ["Polyclinics & Daycare Centers in Whitefield, Indiranagar, and Koramangala", "Multi-Specialty Hospitals in Jayanagar & Malleshwaram", "Modern Diagnostic & Pathology Chains"],
    faqs: [
      { question: "Does BizLume offer cloud accessibility for multi-branch clinics in Bengaluru?", answer: "Yes, BizLume's web architecture allows medical practitioners to access records securely across multiple branch locations." }
    ]
  },
  "hyderabad": {
    slug: "hyderabad",
    cityName: "Hyderabad",
    state: "Telangana",
    seoTitle: "Hospital Management Software in Hyderabad | OPD & EMR System | BizLume HMS",
    description: "Cloud-based hospital management software, patient queue systems, and lab management for hospitals and clinics across Hyderabad and Secunderabad.",
    healthcareContext: "Hyderabad's healthcare institutions cater to patients across Telangana and Andhra Pradesh, demanding scalable patient intake, multi-lingual staff support, and reliable diagnostics dispatch.",
    keyChallengesAddressed: [
      "Rapid patient registration with automated hospital code generation",
      "Immediate laboratory order dispatch from doctor consultation desk",
      "Transparent revenue tracking and daily OPD billing audits"
    ],
    suitableFacilities: ["Hospitals in Banjara Hills, Jubilee Hills, and Gachibowli", "Nursing Homes in Secunderabad & Kukatpally", "Diagnostic Centers across the Twin Cities"],
    faqs: [
      { question: "Can hospitals in Hyderabad transition to BizLume without operational disruption?", answer: "Yes, BizLume is designed for immediate web-based onboarding with role-specific intuitive dashboards requiring minimal staff training." }
    ]
  },
  "chennai": {
    slug: "chennai",
    cityName: "Chennai",
    state: "Tamil Nadu",
    seoTitle: "Hospital Management Software in Chennai | Clinic & Hospital EMR | BizLume HMS",
    description: "Advanced hospital management system, clinical EMR, and patient registration software for healthcare centers in Chennai.",
    healthcareContext: "Known as India's health capital, Chennai features rigorous clinical standards where clinical accuracy, detailed diagnostic tracking, and patient trust are paramount.",
    keyChallengesAddressed: [
      "Comprehensive ICD-10 medical records documentation",
      "Critical laboratory abnormality highlighting for immediate physician intervention",
      "Printable official patient registration cards and receipts"
    ],
    suitableFacilities: ["Multi-Specialty Hospitals in Central & South Chennai", "Specialty Eye & Dental Clinics across Adyar & Anna Nagar", "Diagnostic Pathology Centers"],
    faqs: [
      { question: "Is patient medical data secure on BizLume?", answer: "Yes, BizLume employs encrypted JWT sessions, SSL transit encryption, and restricted database access to safeguard patient records." }
    ]
  },
  "pune": {
    slug: "pune",
    cityName: "Pune",
    state: "Maharashtra",
    seoTitle: "Hospital Management Software in Pune | Clinic & OPD System | BizLume HMS",
    description: "Reliable hospital management software, smart queueing, and clinic billing for nursing homes and hospitals in Pune and Pimpri-Chinchwad.",
    healthcareContext: "Pune's rapidly expanding residential and commercial hubs have spurred demand for high-quality private clinics, nursing homes, and modern outpatient medical centers.",
    keyChallengesAddressed: [
      "Streamlining front-desk patient intake and repeat visit check-ins",
      "Doctor schedule setup with live availability toggling",
      "Eliminating manual paper prescription records with digital EMR"
    ],
    suitableFacilities: ["Nursing Homes in Kothrud, Baner, and Wakad", "Polyclinics in Hadapsar & Viman Nagar", "Hospitals across Pune & PCMC"],
    faqs: [
      { question: "Can small nursing homes in Pune afford BizLume HMS?", answer: "Yes, BizLume is tailored specifically to provide enterprise-grade capabilities to community nursing homes without prohibitive licensing fees." }
    ]
  }
};
