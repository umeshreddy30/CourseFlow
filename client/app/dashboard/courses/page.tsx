import { Plus, Pencil, Trash2, MoreVertical } from "lucide-react";
import Link from "next/link";

export default function CoursesPage() {
  // MOCK DATA: Later this will come from your Database
  const courses = [
    {
      id: 1,
      title: "React.js for Beginners: The Complete Guide",
      price: 29.99,
      status: "Published",
      sales: 120,
      revenue: 3598.80
    },
    {
      id: 2,
      title: "Advanced Node.js & Microservices",
      price: 49.99,
      status: "Draft",
      sales: 0,
      revenue: 0
    },
    {
      id: 3,
      title: "UI/UX Design Masterclass",
      price: 19.99,
      status: "Published",
      sales: 85,
      revenue: 1699.15
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header Area */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-slate-800">My Courses</h1>
        <Link 
          href="/dashboard/create-course" 
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium flex items-center gap-2 transition-colors w-fit"
        >
          <Plus size={20} />
          <span>New Course</span>
        </Link>
      </div>

      {/* Courses Table */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200 text-gray-500 text-sm uppercase">
              <th className="px-6 py-4 font-semibold">Title</th>
              <th className="px-6 py-4 font-semibold">Price</th>
              <th className="px-6 py-4 font-semibold">Status</th>
              <th className="px-6 py-4 font-semibold">Sales</th>
              <th className="px-6 py-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {courses.map((course) => (
              <tr key={course.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 font-medium text-slate-800">
                  {course.title}
                </td>
                <td className="px-6 py-4 text-slate-600">
                  ${course.price}
                </td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    course.status === "Published" 
                      ? "bg-green-100 text-green-700" 
                      : "bg-gray-100 text-gray-600"
                  }`}>
                    {course.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-slate-600">
                  {course.sales} students
                </td>
                <td className="px-6 py-4 text-right flex items-center justify-end gap-3">
                  <Link href={`/dashboard/courses/${course.id}`} className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
                    <Pencil size={18} />
                  </Link>
                  <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all">
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {/* Empty State (If no courses exist) */}
        {courses.length === 0 && (
            <div className="text-center py-12">
                <p className="text-gray-500">No courses found. Create your first one!</p>
            </div>
        )}
      </div>
    </div>
  );
}