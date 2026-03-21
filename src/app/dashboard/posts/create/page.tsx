'use client';

import PostForm from '../components/PostForm';
import Link from 'next/link';
import { ArrowLeft, FileText } from 'lucide-react';

export default function CreatePostPage() {
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
        <h2 style={{ fontSize: 24, fontWeight: 800, color: '#1e293b', display: 'flex', alignItems: 'center', gap: 10, margin: 0 }}>
          <div style={{ width: 40, height: 40, borderRadius: 10, background: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <FileText size={20} color="#3b82f6" />
          </div>
          Create New Post
        </h2>
        <p style={{ fontSize: 14, color: '#64748b', marginTop: 6, marginLeft: 50 }}>Draft a new article, news piece, or local update.</p>
      </div>

      <PostForm />
    </div>
  );
}
