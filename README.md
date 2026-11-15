# BizLume HMS (Hospital Management System)

An AI-assisted, clinician-first Hospital Management & Electronic Medical Records (EMR) platform designed for healthcare centers, clinics, and multi-specialty hospitals.

---

## Overview

**BizLume HMS** is built with Next.js 16 (App Router & Turbopack), TypeScript, Tailwind CSS v4, and PostgreSQL via Prisma ORM. It brings together patient intake, dynamic triage queueing, consultation notes with AI assistance, digital diagnostics dispatch, role-based access control (RBAC), and Razorpay payments under a unified, real-time interface.

---

## Core Modules & Architecture

### 1. Reception & Patient Intake (`/(receptionist)`)
- **Intake Flow**: Multi-step patient onboarding (personal details, address, emergency contact, Aadhaar ID, and past medical history).
- **Lookup & Re-visits**: Rapid phone/code lookups to register repeat visits with automated patient code generation (`HMS-xxxx`).
- **Appointment & Queue Assignment**: Direct assignment to on-duty doctors for scheduled appointments or walk-in tokens.
- **Billing Desk**: Integrated registration fees and OP bill settlements with Razorpay integration.
- **Printable PDF**: Instant generation of official patient registration cards powered by `@react-pdf/renderer`.

### 2. Clinical Consultation & EMR (`/(doctor)`)
- **Smart Queue Dashboard**: Live patient queue ranked by wait time, triage criticality, and manual priority overrides.
- **Clinical EMR Sheet (`/emr/[id]`)**: Comprehensive consultation screen supporting:
  - Vitals history (BP, Heart Rate, Respiratory Rate, Temperature, Weight).
  - Chief complaints and clinical notes.
  - ICD-10 compatible diagnosis notes.
  - AI clinical assistance suggestions.
  - One-click prescription and laboratory order dispatch.

### 3. Smart Patient Queueing Algorithm (`src/lib/queueScore.ts`)
Dynamic weighted priority scoring combining:
- **Criticality Score**: High / Medium / Low urgency scoring.
- **Wait Time Decay**: Wait time penalty to prevent queue starvation.
- **Appointment Slot Bias**: Ensures scheduled slots are prioritized at their window.
- **Manual Overrides**: Reception desk overrides for emergency cases.

### 4. Diagnostics & Laboratory Panel (`/(lab)`)
- **Orders Dashboard**: Live tracking of test requests generated from the doctor consultation screen.
- **Abnormality Flagging**: Highlighting critical lab values for emergency review.
- **Reagent Inventory**: Reagent stock levels and replenishment alerts.

### 5. Administration & Reporting (`/(admin)`)
- **Staff Approval Desk**: Verification and onboarding workflow for doctors, nurses, receptionists, and technicians.
- **Operational Analytics**: Daily outpatient volume, department throughput, revenue breakdown, and system audit logs.

### 6. Security & Role-Based Access Control (RBAC)
- Token-based JWT authentication (`jose` + `jsonwebtoken`).
- Middleware enforcement restricting route access per role:
  - `ADMIN`
  - `DOCTOR`
  - `NURSE`
  - `RECEPTIONIST`
  - `LAB_TECHNICIAN`
  - `PHARMACIST` *(temporarily quarantined)*

---

## Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Framework** | [Next.js 16](https://nextjs.org/) (App Router, Turbopack) |
| **Language** | [TypeScript 5](https://www.typescriptlang.org/) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) + [Framer Motion](https://www.framer.com/motion/) |
| **Database** | [PostgreSQL](https://www.postgresql.org/) |
| **ORM** | [Prisma ORM 7](https://www.prisma.io/) with `@prisma/adapter-pg` |
| **PDF Generation** | [@react-pdf/renderer](https://react-pdf.org/) |
| **Authentication** | JWT (`jose`, `jsonwebtoken`, `bcrypt`) |
| **Payments** | [Razorpay SDK](https://razorpay.com/docs/) |
| **OCR / Scanning** | [Tesseract.js](https://tesseract.projectnaptha.com/) |

---

## Project Structure

```
├── prisma/
│   ├── schema.prisma        # PostgreSQL database schema & models
│   └── migrations/          # Prisma database migrations
├── public/
│   ├── logo-icon.png        # Brand emblem icon
│   ├── logo-header.png      # Brand horizontal lockup
│   └── ...                  # Static assets
├── src/
│   ├── app/
│   │   ├── (admin)/         # Admin dashboard and reports
│   │   ├── (auth)/          # Staff login and registration forms
│   │   ├── (doctor)/        # Consultation queue, EMR, and doctor profile
│   │   ├── (lab)/           # Laboratory orders and reagent inventory
│   │   ├── (nurse)/         # Vitals and triage modules
│   │   ├── (pharmacy)/      # Pharmacy inventory and dispensing (quarantined)
│   │   ├── (receptionist)/  # Intake, appointments, queue, and billing
│   │   ├── api/             # Next.js Serverless Route Handlers
│   │   ├── layout.tsx       # Root HTML layout & fonts
│   │   ├── page.tsx         # Modern landing page with floating glassmorphic nav
│   │   └── favicon.ico      # Multi-resolution favicon
│   ├── components/          # Reusable UI components & PDF cards
│   ├── lib/
│   │   ├── db.ts            # Prisma client singleton with PG connection pool
│   │   └── queueScore.ts    # Queue scoring & prioritization engine
│   └── middleware.ts        # RBAC and session token guard
├── package.json
└── tsconfig.json
```

---

## Getting Started

### Prerequisites
- **Node.js**: v20 or later
- **npm** or **pnpm**
- **PostgreSQL**: Local instance or hosted database (Neon, Supabase, AWS RDS)

### 1. Clone & Install Dependencies
```bash
git clone https://github.com/bizlumetechnologysolutions/BizLume_HMS_v1.0.git
cd BizLume_HMS_v1.0
npm install
```

### 2. Environment Variables
Create a `.env` file in the root directory:
```env
# Database Connection (PostgreSQL)
DATABASE_URL="postgresql://user:password@localhost:5432/hms_db?schema=public"

# Authentication
JWT_SECRET="your_secure_256_bit_secret"

# Razorpay (Optional - for OP billing settlements)
RAZORPAY_KEY_ID="rzp_test_xxxxxx"
RAZORPAY_KEY_SECRET="your_razorpay_secret"
```

### 3. Database Migration & Prisma Generation
```bash
# Push schema to database
npx prisma db push

# Generate client
npx prisma generate
```

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Available Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts development server on port 3000 with Turbopack |
| `npm run build` | Builds optimized production bundle |
| `npm run start` | Starts production server |
| `npm run lint` | Runs ESLint analysis across the project |

---

## Deployment on Vercel

1. Connect the repository to Vercel.
2. Set Environment Variables in Project Settings:
   - `DATABASE_URL`
   - `JWT_SECRET`
   - `RAZORPAY_KEY_ID` (if applicable)
   - `RAZORPAY_KEY_SECRET` (if applicable)
3. Deploy! The `"postinstall": "prisma generate"` script guarantees client types are ready during the build phase.

---

## Contact & Branding

- **Website**: [bizlume.in](https://bizlume.in)
- **Inquiries**: [contact@bizlume.in](mailto:contact@bizlume.in)
- **Copyright**: © 2026 BizLume Systems. All rights reserved.
