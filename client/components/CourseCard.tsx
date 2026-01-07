import Link from 'next/link';

interface CourseProps {
  _id?: string;
  id?: string;
  title: string;
  description: string;
  price?: number;
}

export default function CourseCard({ course }: { course: CourseProps }) {
  const courseId = course._id || course.id;

  return (
    <div style={{
      border: '1px solid #e0e0e0',
      borderRadius: '12px',
      padding: '20px',
      width: '300px',
      backgroundColor: 'white',
      boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between'
    }}>
      <div>
        <h3 style={{ marginTop: '0', fontSize: '1.25rem', color: '#111' }}>
          {course.title || "Untitled Course"}
        </h3>
        <p style={{ color: '#666', fontSize: '0.9rem', lineHeight: '1.5', marginBottom: '16px' }}>
          {course.description || "No description available."}
        </p>
      </div>
      
      <div style={{ marginTop: 'auto', display: 'flex', gap: '10px', alignItems: 'center' }}>
        <span style={{ fontWeight: 'bold', color: '#28a745', flexGrow: 1 }}>
          ${course.price || "Free"}
        </span>

        {/* Edit Button */}
        <Link href={`/dashboard/edit-course/${courseId}`}>
          <button style={{
            padding: '8px 12px',
            backgroundColor: '#f0f0f0',
            color: '#333',
            border: '1px solid #ccc',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '0.85rem'
          }}>
            Edit
          </button>
        </Link>
        
        {/* View Button */}
        <Link href={`/dashboard/courses/${courseId}`}>
          <button style={{
            padding: '8px 12px',
            backgroundColor: '#111',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '0.85rem'
          }}>
            View
          </button>
        </Link>
      </div>
    </div>
  );
}