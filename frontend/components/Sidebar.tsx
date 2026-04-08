import Link from 'next/link';
import { 
  Activity, 
  Users, 
  LayoutDashboard,
  Calendar,
  CreditCard,
  HeartPulse
} from 'lucide-react';

export default function Sidebar() {
  return (
    <aside className="w-64 h-screen bg-[#0F2A44] flex flex-col fixed left-0 top-0 shadow-xl overflow-hidden z-20">
      <div className="h-20 flex items-center px-8 border-b border-white/5">
        <Activity className="w-8 h-8 text-[#00B4D8] mr-3" />
        <span className="text-2xl font-bold tracking-tight text-white">
          HMS
        </span>
      </div>
      
      <nav className="flex-1 px-4 py-8 space-y-2 overflow-y-auto">
        <Link 
          href="/" 
          className="flex items-center px-4 py-3 rounded-xl transition-all group hover:bg-[#E6F4F8]/10"
        >
          <LayoutDashboard className="w-5 h-5 mr-4 text-white group-hover:text-[#00B4D8] transition-colors" />
          <span className="font-medium text-white group-hover:text-[#00B4D8] transition-colors">Dashboard</span>
        </Link>
        
        <div className="pt-6 pb-2 px-4 text-xs font-bold uppercase tracking-widest text-[#64748B]">Modules</div>

        <Link 
          href="/patients/new" 
          className="flex items-center px-4 py-3 rounded-xl transition-all group hover:bg-[#E6F4F8]/10"
        >
          <Users className="w-5 h-5 mr-4 text-white group-hover:text-[#00B4D8] transition-colors" />
          <span className="font-medium text-white group-hover:text-[#00B4D8] transition-colors">Register Patient</span>
        </Link>

        <Link 
          href="/appointments" 
          className="flex items-center px-4 py-3 rounded-xl transition-all group hover:bg-[#E6F4F8]/10"
        >
          <Calendar className="w-5 h-5 mr-4 text-white group-hover:text-[#00B4D8] transition-colors" />
          <span className="font-medium text-white group-hover:text-[#00B4D8] transition-colors">Appointments</span>
        </Link>

        <Link 
          href="/billing" 
          className="flex items-center px-4 py-3 rounded-xl transition-all group hover:bg-[#E6F4F8]/10"
        >
          <CreditCard className="w-5 h-5 mr-4 text-white group-hover:text-[#00B4D8] transition-colors" />
          <span className="font-medium text-white group-hover:text-[#00B4D8] transition-colors">Billing</span>
        </Link>

        <Link 
          href="/triage" 
          className="flex items-center px-4 py-3 rounded-xl transition-all group hover:bg-[#E6F4F8]/10"
        >
          <HeartPulse className="w-5 h-5 mr-4 text-white group-hover:text-[#00B4D8] transition-colors" />
          <span className="font-medium text-white group-hover:text-[#00B4D8] transition-colors">AI Triage</span>
        </Link>
      </nav>
    </aside>
  );
}
