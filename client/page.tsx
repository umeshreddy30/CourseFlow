"use client";
import { useEffect, useState } from 'react';
import api from '../lib/api';
import CourseCard from '../components/CourseCard'; // Import the new component
import Navbar from '../components/Navbar';         // Import the navbar

// Define the interface here too so TypeScript is happy
interface Course {
  _id?: string;
  id?: string;
  title: string;
  description: string;
  price?: number;
}

export default function Home() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  // 1. Fetch Courses
  const fetchCourses = () => {
    api.get('/courses') 
      .then(res => {
        setCourses(res.data || []);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#fafafa' }}>
      {/* 1. The Navbar */}
      <Navbar />

      <main style={{ padding: "40px", maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{ marginBottom: '20px' }}>Welcome to CourseFlow</h1>
        
        {loading ? (
          <p>Loading courses...</p>
        ) : (
          /* 2. The Course Grid */
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
            {courses.length > 0 ? (
              courses.map((course, index) => (
                <CourseCard key={course._id || course.id || index} course={course} />
              ))
            ) : (
              <div style={{ textAlign: 'center', width: '100%', padding: '40px' }}>
                <p>No courses found yet.</p>
                <p>Go to "Instructor Studio" to create one!</p>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}