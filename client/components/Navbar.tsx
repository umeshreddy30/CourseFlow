"use client";
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1rem 2rem',
      backgroundColor: '#ffffff',
      borderBottom: '1px solid #eaeaea',
      boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
    }}>
      {/* Logo Area */}
      <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
        <Link href="/" style={{ textDecoration: 'none', color: '#000' }}>
          CourseFlow
        </Link>
      </div>

      {/* Navigation Links */}
      <div style={{ display: 'flex', gap: '24px' }}>
        <Link href="/" style={{ color: '#555', textDecoration: 'none', fontSize: '1rem' }}>
          Home
        </Link>
        <Link href="/dashboard/create-course" style={{ 
            color: '#0070f3', 
            textDecoration: 'none', 
            fontWeight: '600',
            border: '1px solid #0070f3',
            padding: '8px 16px',
            borderRadius: '6px'
        }}>
          Instructor Studio
        </Link>
      </div>
    </nav>
  );
}