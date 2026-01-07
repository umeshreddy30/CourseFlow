"use client";

import { useState } from "react";
import { Plus, GripVertical, Video, FileText, Trash2, Save, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CourseEditorPage({ params }: { params: { courseId: string } }) {
  const router = useRouter();
  
  // MOCK DATA: Course Structure
  const [modules, setModules] = useState([
    {
      id: 1,
      title: "Introduction to the Course",
      lessons: [
        { id: 101, title: "Welcome Video", type: "video" },
        { id: 102, title: "Course Prerequisites", type: "text" }
      ]
    }
  ]);

  // Add a new empty module
  const addModule = () => {
    const newId = modules.length + 1;
    setModules([...modules, { id: newId, title: "New Module", lessons: [] }]);
  };

  // Add a lesson to a specific module
  const addLesson = (moduleId: number) => {
    const updatedModules = modules.map((mod) => {
      if (mod.id === moduleId) {
        return {
          ...mod,
          lessons: [...mod.lessons, { id: Date.now(), title: "New Lesson", type: "video" }]
        };
      }
      return mod;
    });
    setModules(updatedModules);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      
      {/* Top Navigation */}
      <div className="flex items-center justify-between">
        <button onClick={() => router.back()} className="flex items-center text-slate-500 hover:text-slate-800 transition-colors">
          <ArrowLeft size={20} className="mr-2" />
          Back to Courses
        </button>
        <div className="flex gap-3">
            <button className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg font-medium">Draft</button>
            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium flex items-center gap-2">
                <Save size={18} />
                <span>Save Changes</span>
            </button>
        </div>
      </div>

      {/* Header Info */}
      <div className="bg-blue-50 border border-blue-100 p-6 rounded-xl">
          <h1 className="text-2xl font-bold text-blue-900">Course Curriculum</h1>
          <p className="text-blue-700 mt-1">Organize your lessons and upload content here.</p>
      </div>

      {/* Modules List */}
      <div className="space-y-6">
        {modules.map((module, index) => (
          <div key={module.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
            
            {/* Module Header */}
            <div className="bg-gray-50 px-6 py-4 flex items-center justify-between border-b border-gray-200">
              <div className="flex items-center gap-3">
                <GripVertical className="text-gray-400 cursor-move" size={20} />
                <span className="font-semibold text-slate-700">Module {index + 1}: {module.title}</span>
              </div>
              <div className="flex gap-2">
                 <button 
                    onClick={() => addLesson(module.id)}
                    className="text-sm flex items-center gap-1 text-blue-600 hover:bg-blue-50 px-3 py-1.5 rounded-md transition-colors"
                 >
                    <Plus size={16} />
                    Add Lesson
                 </button>
              </div>
            </div>

            {/* Lessons List */}
            <div className="p-4 space-y-3 bg-white">
              {module.lessons.length === 0 ? (
                <p className="text-center text-sm text-gray-400 py-4 italic">No lessons in this module yet.</p>
              ) : (
                module.lessons.map((lesson) => (
                  <div key={lesson.id} className="flex items-center justify-between p-3 border border-gray-100 rounded-lg hover:border-blue-200 hover:bg-blue-50/30 transition-all group">
                    <div className="flex items-center gap-3">
                      <GripVertical className="text-gray-300 group-hover:text-blue-400" size={18} />
                      {lesson.type === 'video' ? <Video size={18} className="text-purple-500" /> : <FileText size={18} className="text-orange-500" />}
                      <span className="text-slate-700">{lesson.title}</span>
                    </div>
                    <button className="text-gray-400 hover:text-red-500 transition-colors">
                        <Trash2 size={18} />
                    </button>
                  </div>
                ))
              )}
            </div>

          </div>
        ))}
      </div>

      {/* Add Module Button */}
      <button 
        onClick={addModule}
        className="w-full py-4 border-2 border-dashed border-gray-300 rounded-xl text-gray-500 hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50 transition-all flex items-center justify-center gap-2 font-medium"
      >
        <Plus size={20} />
        <span>Add New Module</span>
      </button>

    </div>
  );
}