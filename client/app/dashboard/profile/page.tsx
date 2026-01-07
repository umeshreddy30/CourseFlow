"use client";
import { useState } from 'react';
import Navbar from '@/components/Navbar';

export default function ProfilePage() {
  // Mock User Data (Replace with API call later)
  const [user, setUser] = useState({
    name: "Instructor User",
    email: "instructor@example.com",
    bio: "Passionate about teaching code.",
    role: "Instructor"
  });

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Navbar />
      
      <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="flex items-center gap-6 mb-8">
          <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
            {user.name.charAt(0)}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
            <p className="text-gray-500">{user.role}</p>
          </div>
        </div>

        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input type="text" value={user.name} readOnly className="mt-1 w-full p-2 bg-gray-50 border border-gray-300 rounded text-gray-600"/>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input type="email" value={user.email} readOnly className="mt-1 w-full p-2 bg-gray-50 border border-gray-300 rounded text-gray-600"/>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Bio</label>
            <textarea value={user.bio} readOnly className="mt-1 w-full p-2 bg-gray-50 border border-gray-300 rounded text-gray-600" rows={3}/>
          </div>
          
          <button type="button" className="w-full bg-black text-white py-2 rounded hover:bg-gray-800">
            Edit Profile (Coming Soon)
          </button>
        </form>
      </div>
    </div>
  );
}