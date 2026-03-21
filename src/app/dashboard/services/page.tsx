'use client';

import { useState, useEffect } from 'react';
import api from '@/lib/api';
import { Briefcase, Plus, Edit3, Trash2, Check, X, Search, Loader2, ToggleLeft, ToggleRight } from 'lucide-react';

interface Service {
  _id: string;
  title: string;
  description: string;
  icon: string;
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
  transition: 'border-color 0.2s',
};

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: 13,
  fontWeight: 600,
  color: '#374151',
  marginBottom: 6,
};

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [formData, setFormData] = useState({ title: '', description: '', icon: '', order: 0, isActive: true });

  useEffect(() => { fetchServices(); }, []);

  const fetchServices = async () => {
    try {
      const { data } = await api.get('/services');
      const arr = Array.isArray(data) ? data : (data?.data || data?.services || []);
      if (Array.isArray(arr)) setServices(arr.sort((a: Service, b: Service) => a.order - b.order));
      else setServices([]);
    } catch { console.error('fetch services error'); }
    finally { setIsLoading(false); }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (isEditing) await api.put(`/services/${isEditing}`, formData);
      else await api.post('/services', formData);
      resetForm();
      fetchServices();
    } catch { alert('Failed to save service'); }
    finally { setSaving(false); }
  };

  const handleEdit = (s: Service) => {
    setIsEditing(s._id);
    setFormData({ title: s.title, description: s.description, icon: s.icon, order: s.order, isActive: s.isActive });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this service?')) return;
    try { await api.delete(`/services/${id}`); fetchServices(); }
    catch { alert('Failed to delete service'); }
  };

  const resetForm = () => {
    setIsEditing(null);
    setFormData({ title: '', description: '', icon: '', order: 0, isActive: true });
  };

  const filteredServices = services.filter(s => s.title.toLowerCase().includes(searchQuery.toLowerCase()));

  if (isLoading) return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 256, color: '#FF6B00' }}>
      <Loader2 size={32} style={{ animation: 'spin 0.7s linear infinite' }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Header */}
      <div>
        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#1e293b', display: 'flex', alignItems: 'center', gap: 8, margin: 0 }}>
          <Briefcase size={20} color="#FF6B00" /> Manage Services
        </h2>
        <p style={{ fontSize: 13, color: '#64748b', marginTop: 4 }}>Define the core offerings displayed on your platform.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: 24, alignItems: 'start' }}>

        {/* ── Left: Form ── */}
        <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #e8ebf0', boxShadow: '0 1px 4px rgba(0,0,0,0.04)', padding: 24, position: 'sticky', top: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 38, height: 38, borderRadius: 10, background: isEditing ? 'linear-gradient(135deg,#3b82f6,#2563eb)' : 'linear-gradient(135deg,#FF6B00,#FF8C35)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {isEditing ? <Edit3 size={18} color="#fff" /> : <Plus size={18} color="#fff" />}
              </div>
              <div>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: '#1e293b', margin: 0 }}>{isEditing ? 'Edit Service' : 'Add Service'}</h3>
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
              <label style={labelStyle}>Service Title *</label>
              <input required type="text" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} style={inputStyle} placeholder="e.g. Social Media Marketing" />
            </div>
            <div>
              <label style={labelStyle}>Description *</label>
              <textarea required value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} rows={3} style={{ ...inputStyle, resize: 'vertical', fontFamily: 'inherit' }} placeholder="Brief description of this service..." />
            </div>
            <div>
              <label style={labelStyle}>Icon Name / Class</label>
              <input type="text" value={formData.icon} onChange={e => setFormData({ ...formData, icon: e.target.value })} style={inputStyle} placeholder="e.g. fas fa-chart-bar" />
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
                  <option value="false">Inactive</option>
                </select>
              </div>
            </div>

            <button type="submit" disabled={saving} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '11px', background: isEditing ? 'linear-gradient(135deg,#3b82f6,#2563eb)' : 'linear-gradient(135deg,#FF6B00,#FF8C35)', color: '#fff', border: 'none', borderRadius: 10, fontWeight: 700, fontSize: 14, cursor: saving ? 'not-allowed' : 'pointer', boxShadow: '0 4px 12px rgba(255,107,0,0.25)', transition: 'all 0.2s' }}>
              {saving ? <><Loader2 size={14} style={{ animation: 'spin 0.7s linear infinite' }} /> Saving...</> : isEditing ? <><Check size={15} /> Update Service</> : <><Plus size={15} /> Add Service</>}
            </button>
          </form>

          <div style={{ marginTop: 20, paddingTop: 20, borderTop: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 13, color: '#64748b' }}>Total Services</span>
            <span style={{ fontSize: 20, fontWeight: 800, color: '#FF6B00' }}>{services.length}</span>
          </div>
        </div>

        {/* ── Right: Table ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ position: 'relative' }}>
            <Search size={15} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
            <input type="text" placeholder="Search services..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} style={{ width: '100%', paddingLeft: 40, paddingRight: 14, paddingTop: 10, paddingBottom: 10, border: '1px solid #e2e8f0', borderRadius: 10, fontSize: 13, color: '#1e293b', outline: 'none', background: '#fff', boxSizing: 'border-box' }} />
          </div>

          <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #e8ebf0', boxShadow: '0 1px 4px rgba(0,0,0,0.04)', overflow: 'hidden' }}>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 500 }}>
                <thead>
                  <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e8ebf0' }}>
                    <th style={{ padding: '14px 16px', textAlign: 'center', fontSize: 11, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.6px', width: 50 }}>#</th>
                    <th style={{ padding: '14px 20px', textAlign: 'left', fontSize: 11, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.6px' }}>Service</th>
                    <th style={{ padding: '14px 16px', textAlign: 'center', fontSize: 11, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.6px' }}>Status</th>
                    <th style={{ padding: '14px 20px', textAlign: 'right', fontSize: 11, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.6px' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredServices.map((s, i) => (
                    <tr key={s._id} style={{ borderBottom: '1px solid #f1f5f9', background: i % 2 === 0 ? '#fff' : '#fafbff' }}>
                      <td style={{ padding: '14px 16px', textAlign: 'center' }}>
                        <span style={{ fontSize: 12, fontWeight: 700, color: '#94a3b8', fontFamily: 'monospace' }}>{s.order}</span>
                      </td>
                      <td style={{ padding: '14px 20px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          <div style={{ width: 36, height: 36, borderRadius: 10, background: 'linear-gradient(135deg,#fff7ed,#ffedd5)', border: '1px solid #fed7aa', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                            <Briefcase size={16} color="#FF6B00" />
                          </div>
                          <div>
                            <div style={{ fontSize: 14, fontWeight: 700, color: '#1e293b' }}>{s.title}</div>
                            <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 2, maxWidth: 320, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{s.description}</div>
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: '14px 16px', textAlign: 'center' }}>
                        {s.isActive ? (
                          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '4px 10px', borderRadius: 999, fontSize: 11, fontWeight: 700, background: '#d1fae5', color: '#065f46', border: '1px solid #a7f3d0' }}>
                            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#10b981' }} /> Active
                          </span>
                        ) : (
                          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '4px 10px', borderRadius: 999, fontSize: 11, fontWeight: 700, background: '#f1f5f9', color: '#64748b', border: '1px solid #e2e8f0' }}>
                            Inactive
                          </span>
                        )}
                      </td>
                      <td style={{ padding: '14px 20px', textAlign: 'right' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 6 }}>
                          <button onClick={() => handleEdit(s)} title="Edit" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 34, height: 34, borderRadius: 8, background: '#eff6ff', color: '#3b82f6', border: 'none', cursor: 'pointer' }}>
                            <Edit3 size={15} />
                          </button>
                          <button onClick={() => handleDelete(s._id)} title="Delete" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 34, height: 34, borderRadius: 8, background: '#fef2f2', color: '#ef4444', border: 'none', cursor: 'pointer' }}>
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filteredServices.length === 0 && (
                <div style={{ padding: '60px 20px', textAlign: 'center' }}>
                  <div style={{ width: 56, height: 56, background: '#fff7ed', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                    <Briefcase size={24} color="#FF6B00" />
                  </div>
                  <h3 style={{ fontSize: 16, fontWeight: 700, color: '#1e293b', marginBottom: 6 }}>No Services Yet</h3>
                  <p style={{ color: '#64748b', fontSize: 13 }}>{searchQuery ? 'No services match your search.' : 'Add your first service using the form on the left.'}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
