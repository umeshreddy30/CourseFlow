"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link'; // <--- This line was missing!
import api from '../lib/api';
import Navbar from '../components/Navbar';
import CourseCard from '../components/CourseCard';

// Define the data type
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

  // Fetch courses from Backend
  useEffect(() => {
    api.get('/courses') 
      .then(res => {
        setCourses(res.data || []);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch courses:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#fafafa', fontFamily: 'sans-serif' }}>
      {/* 1. Top Navigation */}
      <Navbar />

      {/* 2. Main Content Area */}
      <main style={{ padding: "40px", maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ marginBottom: '40px', textAlign: 'center' }}>
          <h1 style={{ fontSize: '2.5rem', color: '#333', marginBottom: '10px' }}>
            Welcome to CourseFlow
          </h1>
          <p style={{ color: '#666', fontSize: '1.1rem' }}>
            Discover and learn from the best courses available.
          </p>
        </div>
        
        {loading ? (
          <p style={{ textAlign: 'center' }}>Loading library...</p>
        ) : (
          /* 3. The Course Grid */
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px', justifyContent: 'center' }}>
            {courses.length > 0 ? (
              courses.map((course, index) => (
                <CourseCard key={course._id || course.id || index} course={course} />
              ))
            ) : (
              // Empty State
              <div style={{ 
                textAlign: 'center', 
                padding: '40px', 
                backgroundColor: 'white', 
                borderRadius: '8px',
                border: '1px dashed #ccc',
                width: '100%'
              }}>
                <h3>No courses found yet.</h3>
                <p>Be the first to create one!</p>
                <Link href="/dashboard/create-course">
                  <button style={{
                    marginTop: '15px',
                    padding: '10px 20px',
                    backgroundColor: '#0070f3',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer'
                  }}>
                    Create Your First Course
                  </button>
                </Link>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}