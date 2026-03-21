'use client';

import { useState, useEffect } from 'react';
import api from '@/lib/api';
import { Star, Plus, Edit3, Trash2, Check, X, Search, Loader2, Image as ImageIcon, Quote } from 'lucide-react';

interface Testimonial {
  _id: string;
  name: string;
  role: string;
  company: string;
  quote: string;
  rating: number;
  avatar: string;
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '10px 14px',
  border: '1.5px solid #e2e8f0',
  borderRadius: 10,
  fontSize: 14,
  color: '#1e293b',
  outline: 'none',
  background: '#f8fafc',
  boxSizing: 'border-box',
  fontFamily: 'inherit',
};

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: 13,
  fontWeight: 600,
  color: '#374151',
  marginBottom: 6,
};

const StarRating = ({ rating, onChange }: { rating: number; onChange: (r: number) => void }) => (
  <div style={{ display: 'flex', gap: 4 }}>
    {[1, 2, 3, 4, 5].map(i => (
      <button key={i} type="button" onClick={() => onChange(i)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 2 }}>
        <Star size={22} color={i <= rating ? '#f59e0b' : '#e2e8f0'} fill={i <= rating ? '#f59e0b' : 'none'} />
      </button>
    ))}
  </div>
);

const RatingDisplay = ({ rating }: { rating: number }) => (
  <div style={{ display: 'flex', gap: 2 }}>
    {[1, 2, 3, 4, 5].map(i => (
      <Star key={i} size={13} color={i <= rating ? '#f59e0b' : '#e2e8f0'} fill={i <= rating ? '#f59e0b' : 'none'} />
    ))}
  </div>
);

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({ name: '', role: '', company: '', quote: '', rating: 5, avatar: '' });

  useEffect(() => { fetchTestimonials(); }, []);

  const fetchTestimonials = async () => {
    try {
      const { data } = await api.get('/testimonials');
      const arr = Array.isArray(data) ? data : (data?.data || data?.testimonials || []);
      setTestimonials(Array.isArray(arr) ? arr : []);
    } catch { console.error('fetch testimonials error'); }
    finally { setIsLoading(false); }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (isEditing) await api.put(`/testimonials/${isEditing}`, formData);
      else await api.post('/testimonials', formData);
      resetForm();
      fetchTestimonials();
    } catch { alert('Failed to save testimonial'); }
    finally { setSaving(false); }
  };

  const handleEdit = (t: Testimonial) => {
    setIsEditing(t._id);
    setFormData({ name: t.name, role: t.role, company: t.company, quote: t.quote, rating: t.rating, avatar: t.avatar || '' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this testimonial? It will be removed from the site.')) return;
    try { await api.delete(`/testimonials/${id}`); fetchTestimonials(); }
    catch { alert('Failed to delete testimonial'); }
  };

  const resetForm = () => {
    setIsEditing(null);
    setFormData({ name: '', role: '', company: '', quote: '', rating: 5, avatar: '' });
  };

  const filteredData = testimonials.filter(t =>
    t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (t.company || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  const avatarColors = ['#FF6B00', '#3b82f6', '#10b981', '#8b5cf6', '#ec4899', '#f59e0b'];

  if (isLoading) return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 256, color: '#ec4899' }}>
      <Loader2 size={32} style={{ animation: 'spin 0.7s linear infinite' }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#1e293b', display: 'flex', alignItems: 'center', gap: 8, margin: 0 }}>
          <Star size={20} color="#ec4899" fill="#ec4899" /> Manage Testimonials
        </h2>
        <p style={{ fontSize: 13, color: '#64748b', marginTop: 4 }}>Showcase customer success stories to build authority and trust.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: 24, alignItems: 'start' }}>

        {/* ── Left: Form Panel ── */}
        <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #e8ebf0', boxShadow: '0 1px 4px rgba(0,0,0,0.04)', padding: 24, position: 'sticky', top: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 38, height: 38, borderRadius: 10, background: isEditing ? 'linear-gradient(135deg,#3b82f6,#2563eb)' : 'linear-gradient(135deg,#ec4899,#db2777)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {isEditing ? <Edit3 size={18} color="#fff" /> : <Plus size={18} color="#fff" />}
              </div>
              <div>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: '#1e293b', margin: 0 }}>{isEditing ? 'Edit Testimonial' : 'Add Review'}</h3>
                <p style={{ fontSize: 12, color: '#94a3b8', margin: 0 }}>Client success story</p>
              </div>
            </div>
            {isEditing && (
              <button onClick={resetForm} style={{ display: 'flex', alignItems: 'center', gap: 4, background: '#f1f5f9', border: 'none', borderRadius: 8, padding: '5px 10px', fontSize: 12, color: '#64748b', cursor: 'pointer', fontWeight: 600 }}>
                <X size={13} /> Cancel
              </button>
            )}
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div>
                <label style={labelStyle}>Name *</label>
                <input required type="text" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} style={inputStyle} placeholder="Rahul Sharma" />
              </div>
              <div>
                <label style={labelStyle}>Company</label>
                <input type="text" value={formData.company} onChange={e => setFormData({ ...formData, company: e.target.value })} style={inputStyle} placeholder="Acme Corp" />
              </div>
            </div>
            <div>
              <label style={labelStyle}>Role / Job Title</label>
              <input type="text" value={formData.role} onChange={e => setFormData({ ...formData, role: e.target.value })} style={inputStyle} placeholder="Marketing Manager" />
            </div>
            <div>
              <label style={labelStyle}>Rating</label>
              <StarRating rating={formData.rating} onChange={r => setFormData({ ...formData, rating: r })} />
            </div>
            <div>
              <label style={labelStyle}>Testimonial Quote *</label>
              <textarea required value={formData.quote} onChange={e => setFormData({ ...formData, quote: e.target.value })} rows={4} style={{ ...inputStyle, resize: 'vertical' }} placeholder="What did they say about your services?" />
            </div>
            <div>
              <label style={labelStyle}>Avatar URL (Optional)</label>
              <div style={{ position: 'relative' }}>
                <ImageIcon size={14} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                <input type="text" value={formData.avatar} onChange={e => setFormData({ ...formData, avatar: e.target.value })} style={{ ...inputStyle, paddingLeft: 34 }} placeholder="https://... or /uploads/photo.jpg" />
              </div>
            </div>
            <button type="submit" disabled={saving} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '11px', background: isEditing ? 'linear-gradient(135deg,#3b82f6,#2563eb)' : 'linear-gradient(135deg,#ec4899,#db2777)', color: '#fff', border: 'none', borderRadius: 10, fontWeight: 700, fontSize: 14, cursor: saving ? 'not-allowed' : 'pointer', boxShadow: '0 4px 12px rgba(236,72,153,0.25)' }}>
              {saving ? <><Loader2 size={14} style={{ animation: 'spin 0.7s linear infinite' }} /> Saving...</> : isEditing ? <><Check size={15} /> Update Review</> : <><Plus size={15} /> Add Review</>}
            </button>
          </form>

          <div style={{ marginTop: 20, paddingTop: 20, borderTop: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 13, color: '#64748b' }}>Total Reviews</span>
            <span style={{ fontSize: 20, fontWeight: 800, color: '#ec4899' }}>{testimonials.length}</span>
          </div>
        </div>

        {/* ── Right: Testimonial Cards ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Search */}
          <div style={{ position: 'relative' }}>
            <Search size={15} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
            <input type="text" placeholder="Search by name or company..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} style={{ width: '100%', paddingLeft: 40, paddingRight: 14, paddingTop: 10, paddingBottom: 10, border: '1px solid #e2e8f0', borderRadius: 10, fontSize: 13, color: '#1e293b', outline: 'none', background: '#fff', boxSizing: 'border-box' }} />
          </div>

          {filteredData.length === 0 ? (
            <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #e8ebf0', padding: '60px 20px', textAlign: 'center' }}>
              <div style={{ width: 56, height: 56, background: '#fdf2f8', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                <Star size={24} color="#ec4899" fill="#ec4899" />
              </div>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: '#1e293b', marginBottom: 6 }}>No Testimonials Yet</h3>
              <p style={{ color: '#64748b', fontSize: 13 }}>{searchQuery ? 'No results match your search.' : 'Add your first client review using the form on the left.'}</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {filteredData.map((t, i) => {
                const bgColor = avatarColors[i % avatarColors.length];
                return (
                  <div key={t._id} style={{ background: '#fff', borderRadius: 16, border: '1px solid #e8ebf0', padding: '20px 24px', boxShadow: '0 1px 4px rgba(0,0,0,0.04)', display: 'flex', alignItems: 'flex-start', gap: 16 }}>
                    {/* Avatar */}
                    {t.avatar ? (
                      <img src={t.avatar} alt={t.name} style={{ width: 48, height: 48, borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} />
                    ) : (
                      <div style={{ width: 48, height: 48, borderRadius: '50%', background: bgColor, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 800, fontSize: 18, flexShrink: 0 }}>
                        {t.name.charAt(0).toUpperCase()}
                      </div>
                    )}
                    {/* Content */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8, flexWrap: 'wrap' }}>
                        <div>
                          <div style={{ fontSize: 15, fontWeight: 700, color: '#1e293b' }}>{t.name}</div>
                          <div style={{ fontSize: 12, color: '#64748b', marginTop: 1 }}>{t.role}{t.company ? ` · ${t.company}` : ''}</div>
                          <div style={{ marginTop: 5 }}><RatingDisplay rating={t.rating} /></div>
                        </div>
                        {/* Actions */}
                        <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
                          <button onClick={() => handleEdit(t)} title="Edit" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 34, height: 34, borderRadius: 8, background: '#eff6ff', color: '#3b82f6', border: 'none', cursor: 'pointer' }}>
                            <Edit3 size={15} />
                          </button>
                          <button onClick={() => handleDelete(t._id)} title="Delete" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 34, height: 34, borderRadius: 8, background: '#fef2f2', color: '#ef4444', border: 'none', cursor: 'pointer' }}>
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </div>
                      {/* Quote */}
                      <div style={{ marginTop: 12, display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                        <Quote size={16} color="#ec4899" style={{ flexShrink: 0, marginTop: 2, opacity: 0.6 }} />
                        <p style={{ fontSize: 13, color: '#475569', lineHeight: 1.7, margin: 0, fontStyle: 'italic' }}>{t.quote}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
