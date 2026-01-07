"use client";
import { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api'; 

export default function EditCoursePage({ params }: { params: Promise<{ courseId: string }> }) {
  const router = useRouter();
  
  // Unwrap the params properly for Next.js 15+
  const { courseId } = use(params);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: ''
  });
  const [loading, setLoading] = useState(true);

  // 1. Fetch the EXISTING data to fill the form
  useEffect(() => {
    if (!courseId) return;

    api.get(`/courses/${courseId}`)
      .then((res) => {
        // Pre-fill the form with data from DB
        setFormData({
          title: res.data.title || '',
          description: res.data.description || '',
          price: res.data.price || ''
        });
        setLoading(false);
      })
      .catch((err) => {
        alert("Error loading course details");
        console.error(err);
        setLoading(false);
      });
  }, [courseId]);

  // 2. Handle Text Changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 3. Send the Update (PUT Request)
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.put(`/courses/${courseId}`, formData);
      alert("Course updated successfully!");
      router.push('/'); // Redirect to Home after save
    } catch (err) {
      console.error(err);
      alert("Failed to update course.");
    }
  };

  if (loading) return <div style={{ padding: "40px" }}>Loading course data...</div>;

  return (
    <div style={{ maxWidth: '600px', margin: '40px auto', padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Edit Course</h1>
      <form onSubmit={handleUpdate} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        
        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Title</label>
          <input 
            type="text" 
            name="title"
            value={formData.title} 
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Description</label>
          <textarea 
            name="description"
            value={formData.description} 
            onChange={handleChange}
            rows={4}
            required
            style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Price ($)</label>
          <input 
            type="number" 
            name="price"
            value={formData.price} 
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
          />
        </div>

        <button 
          type="submit" 
          style={{ 
            padding: '12px', 
            backgroundColor: '#0070f3', 
            color: 'white', 
            border: 'none', 
            borderRadius: '5px', 
            cursor: 'pointer',
            fontSize: '1rem',
            marginTop: '10px'
          }}
        >
          Save Changes
        </button>
        
        <button 
          type="button"
          onClick={() => router.push('/')}
          style={{ 
            padding: '10px', 
            backgroundColor: '#ccc', 
            color: 'black', 
            border: 'none', 
            borderRadius: '5px', 
            cursor: 'pointer'
          }}
        >
          Cancel
        </button>
      </form>
    </div>
  );
}
