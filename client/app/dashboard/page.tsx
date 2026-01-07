import { DollarSign, Users, BookOpen } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-800">Welcome back, Instructor!</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Total Revenue" value="$12,450" icon={<DollarSign className="text-green-600" />} />
        <StatCard title="Active Students" value="1,204" icon={<Users className="text-blue-600" />} />
        <StatCard title="Active Courses" value="8" icon={<BookOpen className="text-purple-600" />} />
      </div>

      {/* Recent Activity Section */}
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <h3 className="font-semibold text-lg mb-4">Recent Enrollments</h3>
        <div className="space-y-4">
           {[1, 2, 3].map((i) => (
             <div key={i} className="flex justify-between items-center py-3 border-b border-gray-100 last:border-0">
               <div>
                 <p className="font-medium">Student #{100 + i}</p>
                 <p className="text-sm text-gray-500">Enrolled in "React Mastery"</p>
               </div>
               <span className="text-sm text-green-600 font-medium">+$49.00</span>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon }: any) {
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
      <div className="p-3 bg-gray-50 rounded-lg border border-gray-100">{icon}</div>
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-2xl font-bold text-slate-800">{value}</p>
      </div>
    </div>
  );
}