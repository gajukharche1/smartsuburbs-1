'use client';

import { useState, useEffect } from 'react';
import api from '@/lib/api';
import { Tags, Plus, Edit3, Trash2, Check, X, Search, Loader2, FolderOpen } from 'lucide-react';

interface Category {
  _id: string;
  name: string;
  slug: string;
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [newName, setNewName] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [createLoading, setCreateLoading] = useState(false);
  const [createError, setCreateError] = useState('');

  useEffect(() => { fetchCategories(); }, []);

  const fetchCategories = async () => {
    try {
      const { data } = await api.get('/categories');
      setCategories(Array.isArray(data) ? data : (data.categories || []));
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;
    setCreateError('');
    setCreateLoading(true);
    try {
      await api.post('/categories', { name: newName });
      setNewName('');
      fetchCategories();
    } catch (err: any) {
      setCreateError(err.response?.data?.message || 'Failed to create category');
    } finally {
      setCreateLoading(false);
    }
  };

  const handleUpdate = async (id: string) => {
    if (!editName.trim()) return;
    try {
      await api.put(`/categories/${id}`, { name: editName });
      setIsEditing(null);
      fetchCategories();
    } catch (err) {
      alert('Failed to update category');
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Delete this category? Posts in this category will be unaffected.')) {
      try {
        await api.delete(`/categories/${id}`);
        fetchCategories();
      } catch (err) {
        alert('Failed to delete category');
      }
    }
  };

  const filteredCategories = categories.filter(c =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 256, color: '#FF6B00' }}>
      <Loader2 size={32} style={{ animation: 'spin 0.7s linear infinite' }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

      {/* Page Header */}
      <div>
        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#1e293b', display: 'flex', alignItems: 'center', gap: 8, margin: 0 }}>
          <Tags size={20} color="#FF6B00" /> Manage Categories
        </h2>
        <p style={{ fontSize: 13, color: '#64748b', marginTop: 4 }}>Organize your blog posts with semantic classification.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: 24, alignItems: 'start' }}>

        {/* ── Left Panel: Create Category ─────────────── */}
        <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #e8ebf0', boxShadow: '0 1px 4px rgba(0,0,0,0.04)', padding: 24, position: 'sticky', top: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
            <div style={{ width: 38, height: 38, borderRadius: 10, background: 'linear-gradient(135deg,#FF6B00,#FF8C35)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Plus size={18} color="#fff" />
            </div>
            <div>
              <h3 style={{ fontSize: 15, fontWeight: 700, color: '#1e293b', margin: 0 }}>Add New Category</h3>
              <p style={{ fontSize: 12, color: '#94a3b8', margin: 0 }}>Slug is auto-generated</p>
            </div>
          </div>

          <form onSubmit={handleCreate} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 }}>Category Name *</label>
              <input
                type="text"
                required
                value={newName}
                onChange={e => setNewName(e.target.value)}
                placeholder="e.g. Digital Marketing"
                style={{ width: '100%', padding: '10px 14px', border: '1.5px solid #e2e8f0', borderRadius: 10, fontSize: 14, color: '#1e293b', outline: 'none', background: '#f8fafc', boxSizing: 'border-box', transition: 'border-color 0.2s' }}
                onFocus={e => (e.target.style.borderColor = '#FF6B00')}
                onBlur={e => (e.target.style.borderColor = '#e2e8f0')}
              />
            </div>

            {/* Preview slug */}
            {newName.trim() && (
              <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 8, padding: '8px 12px', fontSize: 12, color: '#64748b' }}>
                <span style={{ fontWeight: 600 }}>Slug preview: </span>
                <code style={{ color: '#FF6B00', fontFamily: 'monospace' }}>/{newName.trim().toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}</code>
              </div>
            )}

            {createError && (
              <div style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626', padding: '8px 12px', borderRadius: 8, fontSize: 13 }}>
                {createError}
              </div>
            )}

            <button
              type="submit"
              disabled={createLoading || !newName.trim()}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '11px', background: createLoading || !newName.trim() ? '#fed7aa' : 'linear-gradient(135deg,#FF6B00,#FF8C35)', color: '#fff', border: 'none', borderRadius: 10, fontWeight: 700, fontSize: 14, cursor: createLoading || !newName.trim() ? 'not-allowed' : 'pointer', boxShadow: '0 4px 12px rgba(255,107,0,0.25)', transition: 'all 0.2s' }}
            >
              {createLoading
                ? <><Loader2 size={15} style={{ animation: 'spin 0.7s linear infinite' }} /> Creating...</>
                : <><Plus size={15} /> Create Category</>
              }
            </button>
          </form>

          {/* Stats */}
          <div style={{ marginTop: 20, paddingTop: 20, borderTop: '1px solid #f1f5f9' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 13, color: '#64748b' }}>Total Categories</span>
              <span style={{ fontSize: 20, fontWeight: 800, color: '#FF6B00' }}>{categories.length}</span>
            </div>
          </div>
        </div>

        {/* ── Right Panel: Categories Table ───────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Search bar */}
          <div style={{ position: 'relative' }}>
            <Search size={15} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
            <input
              type="text"
              placeholder="Search categories..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              style={{ width: '100%', paddingLeft: 40, paddingRight: 14, paddingTop: 10, paddingBottom: 10, border: '1px solid #e2e8f0', borderRadius: 10, fontSize: 13, color: '#1e293b', outline: 'none', background: '#fff', boxSizing: 'border-box' }}
            />
          </div>

          {/* Table */}
          <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #e8ebf0', boxShadow: '0 1px 4px rgba(0,0,0,0.04)', overflow: 'hidden' }}>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 400 }}>
                <thead>
                  <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e8ebf0' }}>
                    <th style={{ padding: '14px 20px', textAlign: 'left', fontSize: 11, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.6px' }}>Name</th>
                    <th style={{ padding: '14px 20px', textAlign: 'left', fontSize: 11, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.6px' }}>Slug</th>
                    <th style={{ padding: '14px 20px', textAlign: 'right', fontSize: 11, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.6px' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCategories.map((category, i) => (
                    <tr key={category._id} style={{ borderBottom: '1px solid #f1f5f9', background: i % 2 === 0 ? '#fff' : '#fafbff' }}>
                      {/* Name / Edit input */}
                      <td style={{ padding: '14px 20px' }}>
                        {isEditing === category._id ? (
                          <input
                            type="text"
                            value={editName}
                            onChange={e => setEditName(e.target.value)}
                            autoFocus
                            onKeyDown={e => { if (e.key === 'Enter') handleUpdate(category._id); if (e.key === 'Escape') setIsEditing(null); }}
                            style={{ padding: '7px 12px', border: '1.5px solid #FF6B00', borderRadius: 8, fontSize: 14, color: '#1e293b', outline: 'none', width: '100%', boxSizing: 'border-box' }}
                          />
                        ) : (
                          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                            <div style={{ width: 28, height: 28, borderRadius: 8, background: 'linear-gradient(135deg,#fff7ed,#ffedd5)', border: '1px solid #fed7aa', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                              <FolderOpen size={13} color="#FF6B00" />
                            </div>
                            <span style={{ fontSize: 14, fontWeight: 600, color: '#1e293b' }}>{category.name}</span>
                          </div>
                        )}
                      </td>

                      {/* Slug */}
                      <td style={{ padding: '14px 20px' }}>
                        <code style={{ fontSize: 12, padding: '3px 8px', background: '#f1f5f9', color: '#64748b', borderRadius: 6, fontFamily: 'monospace', border: '1px solid #e2e8f0' }}>
                          /{category.slug}
                        </code>
                      </td>

                      {/* Actions */}
                      <td style={{ padding: '14px 20px', textAlign: 'right' }}>
                        {isEditing === category._id ? (
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 6 }}>
                            <button
                              onClick={() => handleUpdate(category._id)}
                              title="Save"
                              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 34, height: 34, borderRadius: 8, background: '#d1fae5', color: '#065f46', border: 'none', cursor: 'pointer', fontWeight: 700 }}
                            >
                              <Check size={15} />
                            </button>
                            <button
                              onClick={() => setIsEditing(null)}
                              title="Cancel"
                              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 34, height: 34, borderRadius: 8, background: '#f1f5f9', color: '#64748b', border: 'none', cursor: 'pointer' }}
                            >
                              <X size={15} />
                            </button>
                          </div>
                        ) : (
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 6 }}>
                            <button
                              onClick={() => { setIsEditing(category._id); setEditName(category.name); }}
                              title="Edit"
                              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 34, height: 34, borderRadius: 8, background: '#eff6ff', color: '#3b82f6', border: 'none', cursor: 'pointer' }}
                            >
                              <Edit3 size={15} />
                            </button>
                            <button
                              onClick={() => handleDelete(category._id)}
                              title="Delete"
                              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 34, height: 34, borderRadius: 8, background: '#fef2f2', color: '#ef4444', border: 'none', cursor: 'pointer' }}
                            >
                              <Trash2 size={15} />
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {filteredCategories.length === 0 && (
                <div style={{ padding: '60px 20px', textAlign: 'center' }}>
                  <div style={{ width: 56, height: 56, background: '#fff7ed', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                    <Tags size={24} color="#FF6B00" />
                  </div>
                  <h3 style={{ fontSize: 16, fontWeight: 700, color: '#1e293b', marginBottom: 6 }}>No Categories Yet</h3>
                  <p style={{ color: '#64748b', fontSize: 13 }}>
                    {searchQuery ? 'No categories match your search.' : 'Use the form on the left to create your first category.'}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @media (max-width: 768px) {
          .categories-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
