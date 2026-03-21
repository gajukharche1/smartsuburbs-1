'use client';

import { useState, useEffect } from 'react';
import api from '@/lib/api';
import Link from 'next/link';
import { FileText, Plus, Edit3, Trash2, Globe, EyeOff, Search, Loader2 } from 'lucide-react';

interface Post {
  _id: string;
  title: string;
  slug: string;
  status: 'draft' | 'published';
  createdAt: string;
}

export default function PostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const { data } = await api.get('/posts');
      // API returns paginated: { posts, page, pages }
      setPosts(Array.isArray(data) ? data : (data.posts || []));
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await api.delete(`/posts/${id}`);
        fetchPosts();
      } catch (err) {
        alert('Failed to delete post');
      }
    }
  };

  const filteredPosts = posts.filter(p => p.title.toLowerCase().includes(searchQuery.toLowerCase()));

  if (isLoading) return (
    <div className="flex justify-center items-center h-64 text-primary">
      <Loader2 className="animate-spin" size={32} />
    </div>
  );

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <FileText className="text-primary" /> Manage Posts
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Publish and organize your blog articles for audience engagement.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text"
              placeholder="Search posts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 bg-white dark:bg-[#1A1A2E] border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary w-full md:w-64 transition-all text-sm outline-none dark:text-white"
            />
          </div>
          <Link href="/dashboard/posts/create" className="btn-primary shadow-lg shadow-primary/20 flex-shrink-0">
            <Plus size={18} />
            New Post
          </Link>
        </div>
      </div>

      <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #e8ebf0', boxShadow: '0 1px 4px rgba(0,0,0,0.04)', overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 600 }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e8ebf0' }}>
                <th style={{ padding: '14px 20px', textAlign: 'left', fontSize: 11, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.6px' }}>Post Details</th>
                <th style={{ padding: '14px 20px', textAlign: 'left', fontSize: 11, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.6px' }}>Status</th>
                <th style={{ padding: '14px 20px', textAlign: 'left', fontSize: 11, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.6px' }}>Date</th>
                <th style={{ padding: '14px 20px', textAlign: 'right', fontSize: 11, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.6px' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPosts.map((post, i) => (
                <tr key={post._id} style={{ borderBottom: '1px solid #f1f5f9', background: i % 2 === 0 ? '#fff' : '#fafbff', transition: 'background 0.15s' }}>
                  <td style={{ padding: '14px 20px' }}>
                    <div style={{ fontSize: 14, fontWeight: 600, color: '#1e293b' }}>{post.title}</div>
                    <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 2 }}>{post.slug}</div>
                  </td>
                  <td style={{ padding: '14px 20px' }}>
                    {post.status === 'published' ? (
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '4px 10px', borderRadius: 999, fontSize: 12, fontWeight: 600, background: '#d1fae5', color: '#065f46', border: '1px solid #a7f3d0' }}>
                        <Globe size={11} /> Published
                      </span>
                    ) : (
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '4px 10px', borderRadius: 999, fontSize: 12, fontWeight: 600, background: '#fef3c7', color: '#92400e', border: '1px solid #fde68a' }}>
                        <EyeOff size={11} /> Draft
                      </span>
                    )}
                  </td>
                  <td style={{ padding: '14px 20px', fontSize: 13, color: '#64748b', whiteSpace: 'nowrap' }}>
                    {new Date(post.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                  </td>
                  <td style={{ padding: '14px 20px', textAlign: 'right' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 6 }}>
                      <Link href={`/dashboard/posts/${post._id}`} title="Edit Post" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 34, height: 34, borderRadius: 8, background: '#eff6ff', color: '#3b82f6', textDecoration: 'none', transition: 'all 0.2s' }}>
                        <Edit3 size={15} />
                      </Link>
                      <button onClick={() => handleDelete(post._id)} title="Delete Post" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 34, height: 34, borderRadius: 8, background: '#fef2f2', color: '#ef4444', border: 'none', cursor: 'pointer', transition: 'all 0.2s' }}>
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredPosts.length === 0 && (
            <div style={{ padding: '60px 20px', textAlign: 'center' }}>
              <div style={{ width: 56, height: 56, background: '#f1f5f9', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', color: '#94a3b8' }}>
                <FileText size={24} />
              </div>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: '#1e293b', marginBottom: 6 }}>No Posts Found</h3>
              <p style={{ color: '#64748b', fontSize: 13 }}>Create your first post or adjust your search filters.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
