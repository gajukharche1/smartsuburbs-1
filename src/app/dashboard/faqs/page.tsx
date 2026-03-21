'use client';

import { useState, useEffect } from 'react';
import api from '@/lib/api';
import { HelpCircle, Plus, Edit3, Trash2, Check, X, Search, ChevronDown, ChevronUp, Loader2 } from 'lucide-react';

interface FAQ {
  _id: string;
  question: string;
  answer: string;
  category: string;
  order: number;
  isActive: boolean;
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

export default function FAQsPage() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({ question: '', answer: '', category: 'General', order: 0, isActive: true });

  useEffect(() => { fetchFaqs(); }, []);

  const fetchFaqs = async () => {
    try {
      const { data } = await api.get('/faqs');
      const arr = Array.isArray(data) ? data : (data?.data || data?.faqs || []);
      if (Array.isArray(arr)) setFaqs(arr.sort((a: FAQ, b: FAQ) => a.order - b.order));
      else setFaqs([]);
    } catch { console.error('fetch faqs error'); }
    finally { setIsLoading(false); }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (isEditing) await api.put(`/faqs/${isEditing}`, formData);
      else await api.post('/faqs', formData);
      resetForm();
      fetchFaqs();
    } catch { alert('Failed to save FAQ'); }
    finally { setSaving(false); }
  };

  const handleEdit = (faq: FAQ) => {
    setIsEditing(faq._id);
    setFormData({ question: faq.question, answer: faq.answer, category: faq.category, order: faq.order, isActive: faq.isActive });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this FAQ?')) return;
    try { await api.delete(`/faqs/${id}`); fetchFaqs(); }
    catch { alert('Failed to delete FAQ'); }
  };

  const resetForm = () => {
    setIsEditing(null);
    setFormData({ question: '', answer: '', category: 'General', order: 0, isActive: true });
  };

  const filteredFaqs = faqs.filter(f =>
    f.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 256, color: '#06b6d4' }}>
      <Loader2 size={32} style={{ animation: 'spin 0.7s linear infinite' }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#1e293b', display: 'flex', alignItems: 'center', gap: 8, margin: 0 }}>
          <HelpCircle size={20} color="#06b6d4" /> Frequently Asked Questions
        </h2>
        <p style={{ fontSize: 13, color: '#64748b', marginTop: 4 }}>Manage common questions to help your users navigate services rapidly.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: 24, alignItems: 'start' }}>

        {/* ── Left: Form ── */}
        <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #e8ebf0', boxShadow: '0 1px 4px rgba(0,0,0,0.04)', padding: 24, position: 'sticky', top: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 38, height: 38, borderRadius: 10, background: isEditing ? 'linear-gradient(135deg,#3b82f6,#2563eb)' : 'linear-gradient(135deg,#06b6d4,#0891b2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {isEditing ? <Edit3 size={18} color="#fff" /> : <Plus size={18} color="#fff" />}
              </div>
              <div>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: '#1e293b', margin: 0 }}>{isEditing ? 'Edit FAQ' : 'Add New FAQ'}</h3>
              </div>
            </div>
            {isEditing && (
              <button onClick={resetForm} style={{ display: 'flex', alignItems: 'center', gap: 4, background: '#f1f5f9', border: 'none', borderRadius: 8, padding: '5px 10px', fontSize: 12, color: '#64748b', cursor: 'pointer', fontWeight: 600 }}>
                <X size={13} /> Cancel
              </button>
            )}
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div>
              <label style={labelStyle}>Question *</label>
              <input required type="text" value={formData.question} onChange={e => setFormData({ ...formData, question: e.target.value })} style={inputStyle} placeholder="What is Smart Suburbs?" />
            </div>
            <div>
              <label style={labelStyle}>Answer *</label>
              <textarea required value={formData.answer} onChange={e => setFormData({ ...formData, answer: e.target.value })} rows={4} style={{ ...inputStyle, resize: 'vertical' }} placeholder="Provide a clear, helpful answer..." />
            </div>
            <div>
              <label style={labelStyle}>Category / Group</label>
              <input type="text" value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })} style={inputStyle} placeholder="e.g. General, Pricing, Technical" />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div>
                <label style={labelStyle}>Display Order</label>
                <input type="number" value={formData.order} onChange={e => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })} style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Status</label>
                <select value={formData.isActive.toString()} onChange={e => setFormData({ ...formData, isActive: e.target.value === 'true' })} style={{ ...inputStyle, cursor: 'pointer' }}>
                  <option value="true">Active</option>
                  <option value="false">Hidden</option>
                </select>
              </div>
            </div>
            <button type="submit" disabled={saving} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '11px', background: isEditing ? 'linear-gradient(135deg,#3b82f6,#2563eb)' : 'linear-gradient(135deg,#06b6d4,#0891b2)', color: '#fff', border: 'none', borderRadius: 10, fontWeight: 700, fontSize: 14, cursor: saving ? 'not-allowed' : 'pointer', boxShadow: '0 4px 12px rgba(6,182,212,0.25)' }}>
              {saving ? <><Loader2 size={14} style={{ animation: 'spin 0.7s linear infinite' }} /> Saving...</> : isEditing ? <><Check size={15} /> Update FAQ</> : <><Plus size={15} /> Add FAQ</>}
            </button>
          </form>

          <div style={{ marginTop: 20, paddingTop: 20, borderTop: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 13, color: '#64748b' }}>Total FAQs</span>
            <span style={{ fontSize: 20, fontWeight: 800, color: '#06b6d4' }}>{faqs.length}</span>
          </div>
        </div>

        {/* ── Right: FAQ Accordion List ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ position: 'relative' }}>
            <Search size={15} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
            <input type="text" placeholder="Search questions or categories..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} style={{ width: '100%', paddingLeft: 40, paddingRight: 14, paddingTop: 10, paddingBottom: 10, border: '1px solid #e2e8f0', borderRadius: 10, fontSize: 13, color: '#1e293b', outline: 'none', background: '#fff', boxSizing: 'border-box' }} />
          </div>

          <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #e8ebf0', boxShadow: '0 1px 4px rgba(0,0,0,0.04)', overflow: 'hidden' }}>
            {filteredFaqs.length === 0 ? (
              <div style={{ padding: '60px 20px', textAlign: 'center' }}>
                <div style={{ width: 56, height: 56, background: '#ecfeff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                  <HelpCircle size={24} color="#06b6d4" />
                </div>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: '#1e293b', marginBottom: 6 }}>No FAQs Yet</h3>
                <p style={{ color: '#64748b', fontSize: 13 }}>{searchQuery ? 'No FAQs match your search.' : 'Add your first FAQ using the form on the left.'}</p>
              </div>
            ) : (
              filteredFaqs.map((faq, i) => (
                <div key={faq._id} style={{ borderBottom: i < filteredFaqs.length - 1 ? '1px solid #f1f5f9' : 'none' }}>
                  {/* Question row */}
                  <div
                    onClick={() => setExpandedRow(expandedRow === faq._id ? null : faq._id)}
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', cursor: 'pointer', background: i % 2 === 0 ? '#fff' : '#fafbff', transition: 'background 0.15s' }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, flex: 1, minWidth: 0 }}>
                      {/* Order badge */}
                      <span style={{ fontSize: 11, fontWeight: 700, color: '#94a3b8', fontFamily: 'monospace', minWidth: 20, textAlign: 'center' }}>{faq.order}</span>
                      {/* Category pill */}
                      <span style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', padding: '2px 8px', borderRadius: 999, background: '#ecfeff', color: '#0e7490', border: '1px solid #a5f3fc', flexShrink: 0 }}>{faq.category}</span>
                      {/* Question */}
                      <span style={{ fontSize: 14, fontWeight: 600, color: '#1e293b', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{faq.question}</span>
                    </div>
                    {/* Status dot */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0, marginLeft: 12 }}>
                      <span style={{ width: 7, height: 7, borderRadius: '50%', background: faq.isActive ? '#10b981' : '#d1d5db' }} title={faq.isActive ? 'Active' : 'Hidden'} />
                      {/* Action buttons */}
                      <button onClick={e => { e.stopPropagation(); handleEdit(faq); }} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 30, height: 30, borderRadius: 7, background: '#eff6ff', color: '#3b82f6', border: 'none', cursor: 'pointer' }}>
                        <Edit3 size={13} />
                      </button>
                      <button onClick={e => { e.stopPropagation(); handleDelete(faq._id); }} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 30, height: 30, borderRadius: 7, background: '#fef2f2', color: '#ef4444', border: 'none', cursor: 'pointer' }}>
                        <Trash2 size={13} />
                      </button>
                      {expandedRow === faq._id ? <ChevronUp size={16} color="#94a3b8" /> : <ChevronDown size={16} color="#94a3b8" />}
                    </div>
                  </div>
                  {/* Answer expanded */}
                  {expandedRow === faq._id && (
                    <div style={{ background: '#f8fafc', borderTop: '1px solid #e8ebf0', padding: '14px 20px 14px 52px' }}>
                      <p style={{ fontSize: 13, color: '#475569', lineHeight: 1.7, margin: 0, borderLeft: '3px solid #06b6d4', paddingLeft: 14 }}>{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
