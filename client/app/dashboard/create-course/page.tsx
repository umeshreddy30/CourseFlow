"use client";

import { useState } from "react";
import { Save, Layout, DollarSign, FileText } from "lucide-react";
import { useRouter } from "next/navigation";
import axios from "axios"; // Import Axios for API calls

export default function CreateCoursePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
  });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. Send data to your Node.js Backend
      const response = await axios.post("http://localhost:5000/api/courses", {
        title: form.title,
        description: form.description,
        price: parseFloat(form.price), // Ensure price is a number
      });

      // 2. Success! Redirect to the course list
      alert("Course Created Successfully!");
      router.push("/dashboard/courses"); 
      
    } catch (error) {
      console.error("Error creating course:", error);
      alert("Failed to create course. Is the backend running?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-slate-800 mb-6">Create a New Course</h1>

      <form onSubmit={onSubmit} className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm space-y-6">
        
        {/* Course Title */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Course Title</label>
          <div className="relative">
            <Layout className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="text"
              required
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              placeholder="e.g. Advanced React Patterns"
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Description</label>
          <div className="relative">
            <FileText className="absolute left-3 top-3 text-gray-400" size={20} />
            <textarea
              required
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all min-h-[100px]"
              placeholder="What will students learn?"
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
          </div>
        </div>

        {/* Price */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Price (USD)</label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="number"
              min="0"
              step="0.01"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              placeholder="29.99"
              onChange={(e) => setForm({ ...form, price: e.target.value })}
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="pt-4 flex items-center gap-4">
            <button 
                type="button" 
                onClick={() => router.back()}
                className="px-6 py-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
            >
                Cancel
            </button>
            <button
                type="submit"
                disabled={loading}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-all disabled:opacity-50"
            >
                {loading ? "Saving..." : (
                    <>
                        <Save size={20} />
                        <span>Create Course</span>
                    </>
                )}
            </button>
        </div>
      </form>
    </div>
  );
}