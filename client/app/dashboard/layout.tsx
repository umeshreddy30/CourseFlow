import { BookOpen, BarChart, Settings, LogOut, LayoutDashboard } from "lucide-react";
import Link from "next/link";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-gray-50 text-gray-900 font-sans">
      {/* --- SIDEBAR --- */}
      <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col">
        {/* Logo Area */}
        <div className="p-6 flex items-center gap-2 border-b border-gray-100">
          <div className="bg-blue-600 p-2 rounded-lg">
            <BookOpen className="text-white w-6 h-6" />
          </div>
          <span className="text-xl font-bold text-slate-800">LMS Admin</span>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 p-4 space-y-2">
          <SidebarItem icon={<LayoutDashboard size={20} />} label="Overview" href="/dashboard" active />
          <SidebarItem icon={<BookOpen size={20} />} label="My Courses" href="/dashboard/courses" />
          <SidebarItem icon={<BarChart size={20} />} label="Analytics" href="/dashboard/analytics" />
          <SidebarItem icon={<Settings size={20} />} label="Settings" href="/dashboard/settings" />
        </nav>

        {/* Footer / Logout */}
        <div className="p-4 border-t border-gray-100">
          <button className="flex items-center gap-3 text-slate-500 hover:text-red-600 transition-colors w-full px-4 py-2">
            <LogOut size={20} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* --- MAIN CONTENT AREA --- */}
      <main className="flex-1 overflow-y-auto">
        <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-8">
           <h2 className="font-semibold text-lg">Instructor Dashboard</h2>
           <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold">
             JD
           </div>
        </header>
        <div className="p-8">
          {children} 
        </div>
      </main>
    </div>
  );
}

// Simple Helper Component for Links
function SidebarItem({ icon, label, href, active = false }: any) {
  return (
    <Link 
      href={href} 
      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
        active ? "bg-blue-50 text-blue-600 font-medium" : "text-slate-600 hover:bg-slate-50"
      }`}
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
}