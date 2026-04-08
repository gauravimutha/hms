import { HeartPulse } from 'lucide-react';

export default function TriagePage() {
  return (
    <div className="max-w-3xl mx-auto py-12 flex flex-col items-center justify-center min-h-[60vh]">
      <div className="bg-white border border-[#E6F4F8] rounded-3xl p-12 shadow-sm flex flex-col items-center text-center">
        <div className="w-20 h-20 bg-[#F5F7FA] rounded-full flex items-center justify-center mb-6">
          <HeartPulse className="w-10 h-10 text-[#64748B]" />
        </div>
        <h1 className="text-3xl font-bold text-[#0F2A44] mb-4">AI Triage Service</h1>
        <p className="text-[#64748B] max-w-md text-lg">
          The FastAPI microservice contract for intelligent AI diagnostics is currently being integrated and will be available soon.
        </p>
        <span className="inline-flex mt-8 items-center px-4 py-1.5 rounded-full text-sm font-bold bg-[#F59E0B]/10 text-[#F59E0B] uppercase tracking-wider">
          Planned for Next Phase
        </span>
      </div>
    </div>
  );
}
