'use client';

import { useState, useEffect } from 'react';
import api from '@/lib/api';
import { useRouter } from 'next/navigation';
import { Save, Image as ImageIcon, FileText, Settings, Tag, Loader2, Link as LinkIcon, Type, Search, UploadCloud } from 'lucide-react';
import RichTextEditor from '@/components/RichTextEditor';

interface Category {
  _id: string;
  name: string;
}

interface PostFormProps {
  initialData?: any;
  isEditing?: boolean;
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '12px 16px',
  border: '1.5px solid #e2e8f0',
  borderRadius: 12,
  fontSize: 14,
  color: '#1e293b',
  outline: 'none',
  background: '#f8fafc',
  boxSizing: 'border-box',
  transition: 'all 0.2s ease',
  fontFamily: 'inherit',
};

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: 13,
  fontWeight: 700,
  color: '#475569',
  marginBottom: 8,
};

const panelStyle: React.CSSProperties = {
  background: '#fff',
  borderRadius: 16,
  border: '1px solid #e8ebf0',
  boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
  padding: 24,
};

const panelHeaderStyle: React.CSSProperties = {
  fontSize: 15,
  fontWeight: 700,
  color: '#1e293b',
  margin: '0 0 16px',
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  borderBottom: '1px solid #f1f5f9',
  paddingBottom: 16,
};

export default function PostForm({ initialData, isEditing = false }: PostFormProps) {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    slug: initialData?.slug || '',
    content: initialData?.content || '',
    excerpt: initialData?.excerpt || '',
    status: initialData?.status || 'draft',
    categories: initialData?.categories?.map((c: any) => typeof c === 'string' ? c : c._id) || [],
    featuredImage: initialData?.featuredImage || '',
    seo: {
      metaTitle: initialData?.seo?.metaTitle || '',
      metaDescription: initialData?.seo?.metaDescription || '',
      focusKeyword: initialData?.seo?.focusKeyword || '',
      metaKeywords: initialData?.seo?.metaKeywords || '',
    }
  });

  const [uploadingImage, setUploadingImage] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await api.get('/categories');
        setCategories(Array.isArray(data) ? data : (data?.data || data?.categories || []));
      } catch (err) {
        console.error('Failed to load categories', err);
      }
    };
    fetchCategories();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name.startsWith('seo.')) {
      const seoField = name.split('.')[1];
      setFormData(prev => ({ ...prev, seo: { ...prev.seo, [seoField]: value } }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    if (!isEditing && (!formData.slug || formData.slug === (formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')))) {
      setFormData(prev => ({ ...prev, title, slug }));
    } else {
      setFormData(prev => ({ ...prev, title }));
    }
  };

  const handleCategoryChange = (catId: string) => {
    setFormData(prev => {
      const isSelected = prev.categories.includes(catId);
      if (isSelected) {
        return { ...prev, categories: prev.categories.filter((id: string) => id !== catId) };
      } else {
        return { ...prev, categories: [...prev.categories, catId] };
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      if (isEditing) {
        await api.put(`/posts/${initialData._id}`, formData);
      } else {
        await api.post('/posts', formData);
      }
      router.push('/dashboard/posts');
      router.refresh();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to save post');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    const formDataUpload = new FormData();
    formDataUpload.append('file', file);

    try {
      const { data } = await api.post('/media/upload', formDataUpload, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setFormData(prev => ({ ...prev, featuredImage: data.url }));
    } catch {
      alert('Failed to upload image');
    } finally {
      setUploadingImage(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 2fr) 1fr', gap: 24, alignItems: 'start' }}>
      
      {/* ── Left Column: Main Editor ── */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        
        {error && (
          <div style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626', padding: '16px 20px', borderRadius: 12, fontWeight: 500, fontSize: 14 }}>
            {error}
          </div>
        )}

        <div style={panelStyle}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            
            {/* Title */}
            <div>
              <label style={labelStyle}>Post Title *</label>
              <div style={{ position: 'relative' }}>
                <Type size={16} style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                <input
                  type="text"
                  name="title"
                  required
                  style={{ ...inputStyle, paddingLeft: 42, fontSize: 18, fontWeight: 600, padding: '14px 16px 14px 42px' }}
                  value={formData.title}
                  onChange={handleTitleChange}
                  placeholder="The Ultimate Guide to..."
                />
              </div>
            </div>

            {/* Content Editor */}
            <div>
              <label style={labelStyle}>Body Content *</label>
              <RichTextEditor 
                value={formData.content}
                onChange={(val) => setFormData(prev => ({ ...prev, content: val }))}
                placeholder="Write your post content here using the rich text editor..."
              />
            </div>

            {/* Excerpt */}
            <div>
              <label style={labelStyle}>Excerpt (Preview Text)</label>
              <textarea
                name="excerpt"
                rows={3}
                style={{ ...inputStyle, resize: 'vertical' }}
                value={formData.excerpt}
                onChange={handleChange}
                placeholder="A short summary that appears on the blog index and search engines..."
              />
              <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 8, textAlign: 'right' }}>
                {formData.excerpt.length} / 160 characters (SEO recommended)
              </div>
            </div>
          </div>
        </div>

        {/* ── SEO Panel ── */}
        <div style={panelStyle}>
          <h3 style={panelHeaderStyle}><Search size={18} color="#8b5cf6" /> Search Engine Optimization</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, gridColumn: '1 / -1' }}>
              <div>
                <label style={labelStyle}>Meta Title</label>
                <input
                  type="text"
                  name="seo.metaTitle"
                  style={inputStyle}
                  value={formData.seo.metaTitle}
                  onChange={handleChange}
                  placeholder="Optimal length 50-60 chars..."
                />
              </div>
              <div>
                <label style={labelStyle}>Meta Description</label>
                <textarea
                  name="seo.metaDescription"
                  rows={2}
                  style={{ ...inputStyle, resize: 'vertical' }}
                  value={formData.seo.metaDescription}
                  onChange={handleChange}
                  placeholder="Optimal length 150-160 chars..."
                />
              </div>
            </div>
            
            <div>
              <label style={labelStyle}>Focus Keyword</label>
              <input
                type="text"
                name="seo.focusKeyword"
                style={inputStyle}
                value={formData.seo.focusKeyword}
                onChange={handleChange}
                placeholder="Primary search term"
              />
            </div>
            <div>
              <label style={labelStyle}>Meta Keywords</label>
              <input
                type="text"
                name="seo.metaKeywords"
                style={inputStyle}
                value={formData.seo.metaKeywords}
                onChange={handleChange}
                placeholder="Comma separated tags"
              />
            </div>
          </div>
        </div>
      </div>

      {/* ── Right Column: Settings & Publishing ── */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24, position: 'sticky', top: 24 }}>
        
        {/* Publish Panel */}
        <div style={panelStyle}>
          <h3 style={panelHeaderStyle}><Settings size={18} color="#3b82f6" /> Publishing</h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            
            {/* Status */}
            <div>
              <label style={{ ...labelStyle, fontSize: 12 }}>Status</label>
              <select
                name="status"
                style={{ ...inputStyle, cursor: 'pointer', appearance: 'none', background: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%2364748b' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E") no-repeat right 12px center #f8fafc` }}
                value={formData.status}
                onChange={handleChange}
              >
                <option value="draft">Draft (Hidden)</option>
                <option value="published">Published (Live)</option>
              </select>
            </div>

            {/* Slug */}
            <div>
              <label style={{ ...labelStyle, fontSize: 12 }}>URL Slug</label>
              <div style={{ position: 'relative' }}>
                <LinkIcon size={14} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                <input
                  type="text"
                  name="slug"
                  style={{ ...inputStyle, paddingLeft: 36, fontSize: 13 }}
                  value={formData.slug}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                width: '100%', padding: '14px', marginTop: 8,
                background: 'linear-gradient(135deg,#3b82f6,#2563eb)',
                color: '#fff', border: 'none', borderRadius: 12,
                fontWeight: 700, fontSize: 15, cursor: loading ? 'not-allowed' : 'pointer',
                boxShadow: '0 4px 12px rgba(59,130,246,0.25)', transition: 'all 0.2s'
              }}
            >
              {loading ? <><Loader2 size={18} style={{ animation: 'spin 0.7s linear infinite' }} /> Saving...</> : <><Save size={18} /> {isEditing ? 'Update Post' : 'Publish Post'}</>}
            </button>
          </div>
        </div>

        {/* Categories Panel */}
        <div style={panelStyle}>
          <h3 style={panelHeaderStyle}><Tag size={18} color="#f59e0b" /> Categories</h3>
          <div style={{ maxHeight: 200, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 8, paddingRight: 8 }}>
            {categories.length === 0 ? (
              <p style={{ fontSize: 13, color: '#94a3b8', margin: 0 }}>No categories found.</p>
            ) : (
              categories.map(cat => (
                <label key={cat._id} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, cursor: 'pointer', padding: '8px 10px', borderRadius: 8, background: formData.categories.includes(cat._id) ? '#fffbeb' : 'transparent', border: `1px solid ${formData.categories.includes(cat._id) ? '#fde68a' : 'transparent'}`, transition: 'all 0.1s' }}>
                  <input
                    type="checkbox"
                    style={{ marginTop: 2, cursor: 'pointer' }}
                    checked={formData.categories.includes(cat._id)}
                    onChange={() => handleCategoryChange(cat._id)}
                  />
                  <span style={{ fontSize: 13, fontWeight: 600, color: formData.categories.includes(cat._id) ? '#d97706' : '#475569' }}>{cat.name}</span>
                </label>
              ))
            )}
          </div>
        </div>

        {/* Featured Image Panel */}
        <div style={panelStyle}>
          <h3 style={panelHeaderStyle}><ImageIcon size={18} color="#10b981" /> Featured Image</h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {formData.featuredImage ? (
              <div style={{ position: 'relative', borderRadius: 8, overflow: 'hidden', border: '1px solid #e2e8f0', aspectRatio: '16/9' }}>
                <img src={formData.featuredImage} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => { (e.target as HTMLImageElement).src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="%2394a3b8" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>'; }} />
              </div>
            ) : (
                <div style={{ borderRadius: 8, overflow: 'hidden', border: '1px dashed #cbd5e1', background: '#f8fafc', aspectRatio: '16/9', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8' }}>
                  No Image Selected
                </div>
            )}
            
            <div style={{ position: 'relative' }}>
              <input 
                type="file" 
                accept="image/*" 
                id="feat-img-upload" 
                style={{ display: 'none' }} 
                onChange={handleImageUpload}
              />
              <label 
                htmlFor="feat-img-upload"
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, width: '100%', padding: '10px', background: '#f1f5f9', color: '#475569', border: '1px solid #e2e8f0', borderRadius: 10, cursor: uploadingImage ? 'wait' : 'pointer', fontWeight: 600, fontSize: 13, transition: 'background 0.2s', opacity: uploadingImage ? 0.7 : 1 }}
              >
                {uploadingImage ? <><Loader2 size={16} style={{ animation: 'spin 0.7s linear infinite' }} /> Uploading...</> : <><UploadCloud size={16} /> Choose Image to Upload</>}
              </label>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4 }}>
              <div style={{ flex: 1, height: 1, background: '#e2e8f0' }}></div>
              <span style={{ fontSize: 11, color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase' }}>OR ENTER URL</span>
              <div style={{ flex: 1, height: 1, background: '#e2e8f0' }}></div>
            </div>

            <input
              type="text"
              name="featuredImage"
              style={{ ...inputStyle, fontSize: 13 }}
              value={formData.featuredImage}
              onChange={handleChange}
              placeholder="https://... or /uploads/..."
            />
          </div>
        </div>

      </div>

      <style>{`
        input:focus, textarea:focus, select:focus {
          border-color: #3b82f6 !important;
          box-shadow: 0 0 0 3px rgba(59,130,246,0.1) !important;
        }
        @keyframes spin { to { transform: rotate(360deg); } }
        @media (max-width: 1024px) {
          form { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </form>
  );
}
