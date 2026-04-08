import Link from 'next/link';
import { Users, Calendar, CreditCard, HeartPulse, ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <div className="max-w-6xl mx-auto space-y-8 py-4">
      <div className="flex justify-between items-center bg-white p-8 rounded-2xl shadow-sm border border-[#E6F4F8]">
        <div>
          <h1 className="text-3xl font-bold text-[#0F2A44] tracking-tight">System Overview</h1>
          <p className="text-[#64748B] mt-2 text-lg">Central control hub for modules and operations natively.</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Module 1: Patient Registration (Current Phase) */}
        <div className="bg-white border border-transparent hover:border-[#00B4D8]/20 rounded-3xl p-8 shadow-sm hover:shadow-lg transition-all flex flex-col h-full transform hover:-translate-y-1">
          <div className="w-14 h-14 bg-[#E6F4F8] rounded-2xl flex items-center justify-center mb-6">
            <Users className="w-7 h-7 text-[#0F2A44]" />
          </div>
          <h3 className="text-[#1E293B] text-xl font-bold mb-2">Patient Registration</h3>
          <p className="text-[#64748B] mt-1 flex-grow leading-relaxed">Capture and secure structured patient demographic definitions.</p>
          
          <div className="mt-8 pt-6 border-t border-[#F5F7FA] flex items-center justify-between">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-[#22C55E]/10 text-[#22C55E]">
              Current Phase
            </span>
            <Link href="/patients/new" className="w-8 h-8 rounded-full bg-[#00B4D8]/10 text-[#00B4D8] hover:bg-[#00B4D8] hover:text-white flex items-center justify-center transition-colors">
              <ArrowRight className="w-4 h-4"/>
            </Link>
          </div>
        </div>

        {/* Module 2: Appointments */}
        <div className="bg-white border border-[#E6F4F8] rounded-3xl p-8 shadow-sm flex flex-col h-full opacity-80 cursor-default">
          <div className="w-14 h-14 bg-[#F5F7FA] rounded-2xl flex items-center justify-center mb-6">
            <Calendar className="w-7 h-7 text-[#64748B]" />
          </div>
          <h3 className="text-[#1E293B] text-xl font-bold mb-2">Appointments</h3>
          <p className="text-[#64748B] mt-1 flex-grow leading-relaxed">Schedule and coordinate patient visit calendars and availability.</p>
          
          <div className="mt-8 pt-6 border-t border-[#F5F7FA] flex items-center justify-between">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-[#F59E0B]/10 text-[#F59E0B] uppercase tracking-wide">
              Planned
            </span>
            <Link href="/appointments" className="text-[#64748B] hover:text-[#0F2A44] transition-colors">
              <ArrowRight className="w-5 h-5"/>
            </Link>
          </div>
        </div>

        {/* Module 3: Billing */}
        <div className="bg-white border border-[#E6F4F8] rounded-3xl p-8 shadow-sm flex flex-col h-full opacity-80 cursor-default">
          <div className="w-14 h-14 bg-[#F5F7FA] rounded-2xl flex items-center justify-center mb-6">
            <CreditCard className="w-7 h-7 text-[#64748B]" />
          </div>
          <h3 className="text-[#1E293B] text-xl font-bold mb-2">Billing</h3>
          <p className="text-[#64748B] mt-1 flex-grow leading-relaxed">Manage invoicing, insurance claims, and internal structure.</p>
          
          <div className="mt-8 pt-6 border-t border-[#F5F7FA] flex items-center justify-between">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-[#F59E0B]/10 text-[#F59E0B] uppercase tracking-wide">
              Planned
            </span>
            <Link href="/billing" className="text-[#64748B] hover:text-[#0F2A44] transition-colors">
              <ArrowRight className="w-5 h-5"/>
            </Link>
          </div>
        </div>

        {/* Module 4: AI Triage */}
        <div className="bg-white border border-[#E6F4F8] rounded-3xl p-8 shadow-sm flex flex-col h-full opacity-80 cursor-default">
          <div className="w-14 h-14 bg-[#F5F7FA] rounded-2xl flex items-center justify-center mb-6">
            <HeartPulse className="w-7 h-7 text-[#64748B]" />
          </div>
          <h3 className="text-[#1E293B] text-xl font-bold mb-2">AI Triage</h3>
          <p className="text-[#64748B] mt-1 flex-grow leading-relaxed">Advanced AI diagnostics assisting healthcare securely.</p>
          
          <div className="mt-8 pt-6 border-t border-[#F5F7FA] flex items-center justify-between">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-[#F59E0B]/10 text-[#F59E0B] uppercase tracking-wide">
              Planned
            </span>
            <Link href="/triage" className="text-[#64748B] hover:text-[#0F2A44] transition-colors">
              <ArrowRight className="w-5 h-5"/>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
