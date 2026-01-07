"use client";
import { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import api from '@/lib/api'; 
import { ArrowLeft, Save, UploadCloud, Plus, GripVertical, Trash2, FileText, Video } from 'lucide-react'; 

export default function EditCoursePage({ params }: { params: Promise<{ courseId: string }> }) {
  const router = useRouter();
  const { courseId } = use(params);

  // Course Basic Info
  const [course, setCourse] = useState({
    title: '',
    description: '',
    price: '',
    isPublished: false 
  });

  // Course Curriculum (Modules & Lessons)
  const [modules, setModules] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // 1. Load Data
  useEffect(() => {
    if (!courseId) return;
    api.get(`/courses/${courseId}`)
      .then((res) => {
        setCourse({
          title: res.data.title || '',
          description: res.data.description || '',
          price: res.data.price || '',
          isPublished: res.data.isPublished || false
        });
        // Load existing modules or default to one empty module
        setModules(res.data.curriculum && res.data.curriculum.length > 0 
          ? res.data.curriculum 
          : [{ title: 'Module 1: Introduction', lessons: [] }]
        );
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error:", err);
        setLoading(false);
      });
  }, [courseId]);

  // 2. Handle Save (Draft or Publish)
  const handleSave = async (publishStatus: boolean) => {
    setSaving(true);
    try {
      // We send EVERYTHING: Details + Curriculum + Status
      const payload = {
        ...course,
        isPublished: publishStatus,
        curriculum: modules // Sending the lessons array
      };

      await api.put(`/courses/${courseId}`, payload);
      
      const statusMsg = publishStatus ? "Course Published Live!" : "Draft Saved Successfully!";
      alert(statusMsg);
      
      // Update local state to reflect status change
      setCourse({ ...course, isPublished: publishStatus });
      
    } catch (err) {
      alert("Failed to save. Check console.");
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  // Helper to add a dummy lesson for UI testing
  const addLesson = (moduleIndex: number) => {
    const newModules = [...modules];
    newModules[moduleIndex].lessons.push({ 
      title: 'New Lesson', 
      type: 'text', 
      content: '' 
    });
    setModules(newModules);
  };

  if (loading) return <div className="p-10">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-8 font-sans">
      
      {/* Header */}
      <div className="max-w-5xl mx-auto flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Instructor Dashboard</h1>
          <Link href="/" className="flex items-center text-gray-500 hover:text-gray-900 mt-2 text-sm">
            <ArrowLeft className="w-4 h-4 mr-1" /> Back to Library
          </Link>
        </div>
        
        <div className="flex items-center gap-3">
          <span className={`px-3 py-1 rounded-full text-xs font-bold ${course.isPublished ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
            {course.isPublished ? 'LIVE' : 'DRAFT'}
          </span>
          
          {/* Save as Draft Button */}
          <button 
            onClick={() => handleSave(false)}
            disabled={saving}
            className="flex items-center gap-2 bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50"
          >
            <Save className="w-4 h-4" /> Save Draft
          </button>

          {/* Publish Button */}
          <button 
            onClick={() => handleSave(true)}
            disabled={saving}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700"
          >
            <UploadCloud className="w-4 h-4" /> 
            {course.isPublished ? "Update Live" : "Publish Course"}
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Settings */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h2 className="text-lg font-semibold mb-4 text-black">Course Details</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input type="text" value={course.title} onChange={(e) => setCourse({...course, title: e.target.value})} className="w-full p-2 border border-gray-300 rounded text-black"/>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea rows={4} value={course.description} onChange={(e) => setCourse({...course, description: e.target.value})} className="w-full p-2 border border-gray-300 rounded text-black"/>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
                <input type="number" value={course.price} onChange={(e) => setCourse({...course, price: e.target.value})} className="w-full p-2 border border-gray-300 rounded text-black"/>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Curriculum */}
        <div className="lg:col-span-2">
           <div className="space-y-4">
             {modules.map((module, mIndex) => (
               <div key={mIndex} className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                 <div className="bg-gray-50 p-4 flex justify-between items-center border-b border-gray-100">
                   <input 
                     value={module.title}
                     onChange={(e) => {
                       const newMods = [...modules];
                       newMods[mIndex].title = e.target.value;
                       setModules(newMods);
                     }}
                     className="bg-transparent font-semibold text-gray-800 outline-none w-full"
                   />
                   <button onClick={() => addLesson(mIndex)} className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1">
                     <Plus className="w-4 h-4" /> Add Lesson
                   </button>
                 </div>
                 
                 <div className="p-2 space-y-2">
                   {module.lessons.map((lesson: any, lIndex: number) => (
                     <div key={lIndex} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg group border border-transparent hover:border-gray-100">
                       <div className="flex items-center gap-3">
                         {lesson.type === 'video' ? <Video className="w-4 h-4 text-purple-500" /> : <FileText className="w-4 h-4 text-orange-500" />}
                         <input 
                           value={lesson.title}
                           onChange={(e) => {
                             const newMods = [...modules];
                             newMods[mIndex].lessons[lIndex].title = e.target.value;
                             setModules(newMods);
                           }}
                           className="bg-transparent text-sm text-gray-700 outline-none"
                         />
                       </div>
                       <button 
                        onClick={() => {
                          const newMods = [...modules];
                          newMods[mIndex].lessons.splice(lIndex, 1);
                          setModules(newMods);
                        }}
                        className="text-gray-400 hover:text-red-500"
                       >
                         <Trash2 className="w-4 h-4" />
                       </button>
                     </div>
                   ))}
                 </div>
               </div>
             ))}

             <button 
               onClick={() => setModules([...modules, { title: 'New Module', lessons: [] }])}
               className="w-full py-4 border-2 border-dashed border-gray-300 rounded-xl text-gray-500 font-medium hover:border-blue-400 hover:text-blue-600 transition flex justify-center items-center gap-2"
             >
               <Plus className="w-5 h-5" /> Add New Module
             </button>
           </div>
        </div>
      </div>
    </div>
  );
}