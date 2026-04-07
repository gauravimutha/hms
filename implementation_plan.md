# HMS - Week 1: Patient Registration & AI Stub

This plan covers Week 1 tasks specifically assigned to Gauravi, focusing on a modular and beginner-friendly architecture for the hospital management foundation.

## User Review Required
> [!NOTE]
> Please review the proposed folder structure, implementation order, and minimal file plan to ensure it matches your expectations before we start creating files.

## 1. Folder Structure
We will adopt a side-by-side repository structure inside the main project folder for clear separation of concerns.

```text
hms/
├── frontend/             # Next.js App Router + TypeScript + Tailwind
├── backend/              # Node.js + Express
├── ai-service/           # FastAPI (AI contracts & mocks)
└── database/             # PostgreSQL schema and SQL scripts
```

## 2. Implementation Order
1. **Setup & Scaffold**: Initialize the three independent applications (`frontend`, `backend`, `ai-service`).
2. **Database Schema**: Define the initial SQL table schema (`patients`) necessary for basic patient registration.
3. **AI Contract Definition & mock**: Define the expected JSON payload for AI requests/responses. Implement a FastAPI endpoint that returns a dummy response based on the contract.
4. **Backend Stub (Node.js)**: Create an Express endpoint for patient registration that handles the local database orchestration while calling the FastAPI mock.
5. **Frontend Patient Registration UI**: Construct Next.js UI components for the registration form using Tailwind CSS for styling.
6. **Frontend API Integration**: Connect the client-side Next.js app to the Node.js backend API.

## 3. Minimal File Plan (Week 1)

### `database/`
- `schema.sql` (Creates the `patients` table structure)

### `ai-service/`
- `requirements.txt` (FastAPI, uvicorn, pydantic)
- `main.py` (FastAPI app & the `/api/analyze` mock endpoint)
- `schemas.py` (Pydantic models defining the AI contract: e.g., `PatientInput` -> `AIAnalysisOutput`)

### `backend/`
- `package.json`
- `server.js` (Express setup & middleware defaults)
- `routes/patients.js` (Express router for `/api/patients` POST requests)
- `services/aiService.js` (Utility/stub to send requests to the local FastAPI server)

### `frontend/`
- `package.json`
- `app/layout.tsx` (Global layout & Tailwind base)
- `app/register/page.tsx` (Main Patient Registration page router)
- `components/PatientForm.tsx` (Reusable UI form elements for user input)
- `lib/api.ts` (Fetch wrappers to abstract calling the Node.js backend)
