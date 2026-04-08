import PatientForm from "@/components/PatientForm";

export const metadata = {
  title: "Register New Patient - Nexus HMS",
};

export default function NewPatientPage() {
  return (
    <div className="max-w-3xl mx-auto py-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#0F2A44]">Register Patient</h1>
        <p className="text-[#64748B] mt-1 text-sm font-medium">
          Enter the patient's primary details below.
        </p>
      </div>

      <PatientForm />
    </div>
  );
}
