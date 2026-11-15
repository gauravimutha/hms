import Image from "next/image";
import Link from "next/link";
import { LayoutDashboard, FileText, Pill, FlaskRound, BarChart3 } from "lucide-react";

export default function PharmacyLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-light-grey">
      <aside className="w-64 bg-navy text-white p-6 flex flex-col gap-8 shrink-0">
        <Link href="/pharmacy-dashboard" className="flex items-center gap-3 no-underline group">
          <Image
            src="/logo-icon.png"
            alt="BizLume Logo"
            width={36}
            height={36}
            className="w-9 h-9 object-contain shrink-0 group-hover:scale-105 transition-transform"
          />
          <div className="flex flex-col">
            <span className="text-lg font-black tracking-tight text-white leading-none">
              BizLume
            </span>
            <span className="text-cyan text-[10px] font-bold tracking-widest uppercase mt-0.5">
              PHARMACY
            </span>
          </div>
        </Link>

        <nav className="flex flex-col gap-2">
          <NavLink href="/pharmacy-dashboard" label="Dashboard"      icon={<LayoutDashboard className="w-4 h-4 shrink-0" />} />
          <NavLink href="/prescriptions"       label="Prescriptions" icon={<FileText className="w-4 h-4 shrink-0" />} />
          <NavLink href="/inventory"           label="Inventory"     icon={<Pill className="w-4 h-4 shrink-0" />} />
          <NavLink href="/dispense"            label="Dispense"      icon={<FlaskRound className="w-4 h-4 shrink-0" />} />
          <NavLink href="/reports"             label="Reports"       icon={<BarChart3 className="w-4 h-4 shrink-0" />} />
        </nav>

        <div className="mt-auto">
          <div className="p-3 rounded-xl bg-white/5 text-xs text-grey">
            <p className="font-bold text-white">Pharmacist Portal</p>
            <p className="mt-1">Role-based access active</p>
          </div>
        </div>
      </aside>

      <main className="flex-1 p-10 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}

function NavLink({ href, label, icon }: { href: string; label: string; icon: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/10 transition-all font-bold text-sm"
    >
      <span className="flex items-center justify-center">{icon}</span> {label}
    </Link>
  );
}