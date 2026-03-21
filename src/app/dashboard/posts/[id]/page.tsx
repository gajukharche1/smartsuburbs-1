'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import api from '@/lib/api';
import PostForm from '../components/PostForm';
import Link from 'next/link';
import { ArrowLeft, Loader2, Edit3, AlertCircle } from 'lucide-react';

export default function EditPostPage() {
  const { id } = useParams();
  const [initialData, setInitialData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const { data } = await api.get(`/posts/${id}`);
        setInitialData(data);
      } catch (err: any) {
        console.error('Failed to load post', err);
        setError('Failed to load post data');
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  if (loading) return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 256, color: '#3b82f6' }}>
      <Loader2 size={32} style={{ animation: 'spin 0.7s linear infinite' }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );

  if (error) return (
    <div style={{ margin: '0 auto', maxWidth: 1200, padding: 24 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, background: '#fef2f2', border: '1px solid #fecaca', padding: '16px 20px', borderRadius: 12, color: '#dc2626', fontWeight: 500 }}>
        <AlertCircle size={20} />
        {error}
      </div>
    </div>
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 1200, margin: '0 auto', width: '100%' }}>
      {/* Header */}
      <div>
        <Link 
          href="/dashboard/posts" 
          style={{ display: 'inline-flex', items: 'center', gap: 6, fontSize: 13, fontWeight: 600, color: '#64748b', textDecoration: 'none', marginBottom: 16 }}
          className="hover:text-primary transition-colors"
        >
          <ArrowLeft size={14} /> Back to Posts
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h2 style={{ fontSize: 24, fontWeight: 800, color: '#1e293b', display: 'flex', alignItems: 'center', gap: 10, margin: 0 }}>
            <div style={{ width: 40, height: 40, borderRadius: 10, background: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Edit3 size={20} color="#3b82f6" />
            </div>
            Edit Post
          </h2>
        </div>
        <p style={{ fontSize: 14, color: '#64748b', marginTop: 6, marginLeft: 50 }}>Update your article Content, tags, and settings.</p>
      </div>

      <PostForm initialData={initialData} isEditing={true} />
    </div>
  );
}
