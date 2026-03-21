'use client';

import { useState, useEffect } from 'react';
import api from '@/lib/api';
import { useAuth } from '@/context/AuthContext';
import { Shield, ShieldAlert, UserCheck, Trash2, Edit2, Loader2, Search, UserPlus, X, Eye, EyeOff } from 'lucide-react';

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  isActive: boolean;
  createdAt: string;
}

interface AddUserForm {
  name: string;
  email: string;
  password: string;
  role: string;
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const { user: currentUser } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');

  // Add User Modal state
  const [showModal, setShowModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState('');
  const [form, setForm] = useState<AddUserForm>({ name: '', email: '', password: '', role: 'viewer' });

  useEffect(() => { fetchUsers(); }, []);

  const fetchUsers = async () => {
    try {
      const { data } = await api.get('/users');
      setUsers(Array.isArray(data) ? data : (data.users || data.data || []));
    } catch (err) {
      setError('Failed to fetch users');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    setFormLoading(true);
    try {
      await api.post('/users', form);
      setShowModal(false);
      setForm({ name: '', email: '', password: '', role: 'viewer' });
      fetchUsers();
    } catch (err: any) {
      setFormError(err.response?.data?.message || 'Failed to create user');
    } finally {
      setFormLoading(false);
    }
  };

  const handleRoleChange = async (userId: string, newRole: string) => {
    try {
      await api.put(`/users/${userId}/role`, { role: newRole });
      fetchUsers();
    } catch (err) {
      alert('Failed to update user role');
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (userId === currentUser?._id) { alert('You cannot delete your own account'); return; }
    if (window.confirm('Are you sure you want to deactivate this user?')) {
      try {
        await api.delete(`/users/${userId}`);
        fetchUsers();
      } catch (err) {
        alert('Failed to delete user');
      }
    }
  };

  const getRoleBadge = (role: string) => {
    const styles: Record<string, { bg: string; color: string; border: string }> = {
      admin:  { bg: '#f3e8ff', color: '#7c3aed', border: '#ddd6fe' },
      editor: { bg: '#dbeafe', color: '#1d4ed8', border: '#bfdbfe' },
      viewer: { bg: '#f1f5f9', color: '#475569', border: '#e2e8f0' },
    };
    const s = styles[role] || styles.viewer;
    const Icon = role === 'admin' ? ShieldAlert : role === 'editor' ? Edit2 : UserCheck;
    return (
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '4px 10px', borderRadius: 999, fontSize: 12, fontWeight: 600, background: s.bg, color: s.color, border: `1px solid ${s.border}` }}>
        <Icon size={11} /> {role.charAt(0).toUpperCase() + role.slice(1)}
      </span>
    );
  };

  const filteredUsers = users.filter(u =>
    u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 256, color: '#FF6B00' }}>
      <Loader2 style={{ animation: 'spin 0.7s linear infinite' }} size={32} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#1e293b', display: 'flex', alignItems: 'center', gap: 8, margin: 0 }}>
            <Shield size={20} color="#FF6B00" /> User Directory
          </h2>
          <p style={{ fontSize: 13, color: '#64748b', marginTop: 4 }}>Manage team access, roles, and platform permissions.</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {/* Search */}
          <div style={{ position: 'relative' }}>
            <Search size={15} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
            <input
              type="text"
              placeholder="Search users..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              style={{ paddingLeft: 36, paddingRight: 14, paddingTop: 9, paddingBottom: 9, border: '1px solid #e2e8f0', borderRadius: 10, fontSize: 13, color: '#1e293b', outline: 'none', background: '#fff', width: 200 }}
            />
          </div>
          {/* Add User button */}
          {currentUser?.role === 'admin' && (
            <button
              onClick={() => setShowModal(true)}
              style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '9px 18px', background: 'linear-gradient(135deg,#FF6B00,#FF8C35)', color: '#fff', border: 'none', borderRadius: 10, fontWeight: 600, fontSize: 14, cursor: 'pointer', boxShadow: '0 4px 12px rgba(255,107,0,0.3)', transition: 'all 0.2s' }}
            >
              <UserPlus size={16} /> Add User
            </button>
          )}
        </div>
      </div>

      {error && (
        <div style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626', padding: '12px 16px', borderRadius: 10, fontSize: 13, display: 'flex', alignItems: 'center', gap: 8 }}>
          <ShieldAlert size={16} /> {error}
        </div>
      )}

      {/* Users Table */}
      <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #e8ebf0', boxShadow: '0 1px 4px rgba(0,0,0,0.04)', overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 600 }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e8ebf0' }}>
                <th style={{ padding: '14px 20px', textAlign: 'left', fontSize: 11, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.6px' }}>User</th>
                <th style={{ padding: '14px 20px', textAlign: 'left', fontSize: 11, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.6px' }}>Role & Access</th>
                <th style={{ padding: '14px 20px', textAlign: 'left', fontSize: 11, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.6px' }}>Status</th>
                <th style={{ padding: '14px 20px', textAlign: 'right', fontSize: 11, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.6px' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user, i) => (
                <tr key={user._id} style={{ borderBottom: '1px solid #f1f5f9', background: i % 2 === 0 ? '#fff' : '#fafbff' }}>
                  <td style={{ padding: '14px 20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <div style={{ width: 38, height: 38, borderRadius: '50%', background: 'linear-gradient(135deg,#FF6B00,#FF8C35)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: 15, flexShrink: 0 }}>
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div style={{ fontSize: 14, fontWeight: 600, color: '#1e293b' }}>{user.name}</div>
                        <div style={{ fontSize: 12, color: '#94a3b8' }}>{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '14px 20px' }}>
                    {currentUser?.role === 'admin' ? (
                      <select
                        value={user.role}
                        onChange={e => handleRoleChange(user._id, e.target.value)}
                        disabled={user._id === currentUser._id}
                        style={{ fontSize: 13, border: '1px solid #e2e8f0', borderRadius: 8, padding: '6px 10px', color: '#1e293b', background: '#f8fafc', outline: 'none', cursor: 'pointer', opacity: user._id === currentUser._id ? 0.5 : 1 }}
                      >
                        <option value="admin">Admin</option>
                        <option value="editor">Editor</option>
                        <option value="viewer">Viewer</option>
                      </select>
                    ) : getRoleBadge(user.role)}
                  </td>
                  <td style={{ padding: '14px 20px' }}>
                    {user.isActive ? (
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 10px', borderRadius: 999, fontSize: 12, fontWeight: 600, background: '#d1fae5', color: '#065f46', border: '1px solid #a7f3d0' }}>
                        <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#10b981' }} /> Active
                      </span>
                    ) : (
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 10px', borderRadius: 999, fontSize: 12, fontWeight: 600, background: '#fef2f2', color: '#dc2626', border: '1px solid #fecaca' }}>
                        Inactive
                      </span>
                    )}
                  </td>
                  <td style={{ padding: '14px 20px', textAlign: 'right' }}>
                    {currentUser?.role === 'admin' && user._id !== currentUser._id && (
                      <button
                        onClick={() => handleDeleteUser(user._id)}
                        title="Deactivate User"
                        style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 34, height: 34, borderRadius: 8, background: '#fef2f2', color: '#ef4444', border: 'none', cursor: 'pointer' }}
                      >
                        <Trash2 size={15} />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredUsers.length === 0 && (
            <div style={{ padding: '60px 20px', textAlign: 'center' }}>
              <div style={{ width: 56, height: 56, background: '#f1f5f9', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', color: '#94a3b8' }}><Shield size={24} /></div>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: '#1e293b', marginBottom: 6 }}>No Users Found</h3>
              <p style={{ color: '#64748b', fontSize: 13 }}>No users match your search, or no users have been added yet.</p>
            </div>
          )}
        </div>
      </div>

      {/* ── Add User Modal ─────────────────── */}
      {showModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }} onClick={e => { if (e.target === e.currentTarget) setShowModal(false); }}>
          <div style={{ background: '#fff', borderRadius: 20, padding: '32px', width: '100%', maxWidth: 440, boxShadow: '0 24px 64px rgba(0,0,0,0.2)', position: 'relative', animation: 'slideUp 0.25s ease' }}>
            
            {/* Close */}
            <button onClick={() => setShowModal(false)} style={{ position: 'absolute', top: 16, right: 16, background: '#f1f5f9', border: 'none', borderRadius: 8, width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#64748b' }}>
              <X size={16} />
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: 'linear-gradient(135deg,#FF6B00,#FF8C35)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <UserPlus size={20} color="#fff" />
              </div>
              <div>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: '#1e293b', margin: 0 }}>Add New User</h3>
                <p style={{ fontSize: 13, color: '#64748b', margin: 0 }}>Create an account for a team member</p>
              </div>
            </div>

            <form onSubmit={handleAddUser} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              
              {/* Name */}
              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 }}>Full Name *</label>
                <input
                  type="text" required
                  placeholder="e.g. Rahul Sharma"
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  style={{ width: '100%', padding: '10px 14px', border: '1px solid #e2e8f0', borderRadius: 10, fontSize: 14, color: '#1e293b', outline: 'none', boxSizing: 'border-box', background: '#f8fafc' }}
                />
              </div>

              {/* Email */}
              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 }}>Email Address *</label>
                <input
                  type="email" required
                  placeholder="rahul@example.com"
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  style={{ width: '100%', padding: '10px 14px', border: '1px solid #e2e8f0', borderRadius: 10, fontSize: 14, color: '#1e293b', outline: 'none', boxSizing: 'border-box', background: '#f8fafc' }}
                />
              </div>

              {/* Password */}
              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 }}>Password *</label>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showPassword ? 'text' : 'password'} required
                    placeholder="Min. 6 characters"
                    value={form.password}
                    onChange={e => setForm({ ...form, password: e.target.value })}
                    style={{ width: '100%', padding: '10px 42px 10px 14px', border: '1px solid #e2e8f0', borderRadius: 10, fontSize: 14, color: '#1e293b', outline: 'none', boxSizing: 'border-box', background: '#f8fafc' }}
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', display: 'flex', alignItems: 'center' }}>
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {/* Role */}
              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 }}>Role</label>
                <select
                  value={form.role}
                  onChange={e => setForm({ ...form, role: e.target.value })}
                  style={{ width: '100%', padding: '10px 14px', border: '1px solid #e2e8f0', borderRadius: 10, fontSize: 14, color: '#1e293b', outline: 'none', background: '#f8fafc', cursor: 'pointer', boxSizing: 'border-box' }}
                >
                  <option value="viewer">Viewer — can view posts</option>
                  <option value="editor">Editor — can create & edit posts</option>
                  <option value="admin">Admin — full access</option>
                </select>
              </div>

              {formError && (
                <div style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626', padding: '10px 14px', borderRadius: 8, fontSize: 13, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <ShieldAlert size={14} /> {formError}
                </div>
              )}

              <div style={{ display: 'flex', gap: 12, marginTop: 4 }}>
                <button type="button" onClick={() => setShowModal(false)} style={{ flex: 1, padding: '11px', border: '1px solid #e2e8f0', borderRadius: 10, background: '#fff', color: '#64748b', fontWeight: 600, fontSize: 14, cursor: 'pointer' }}>
                  Cancel
                </button>
                <button type="submit" disabled={formLoading} style={{ flex: 2, padding: '11px', border: 'none', borderRadius: 10, background: 'linear-gradient(135deg,#FF6B00,#FF8C35)', color: '#fff', fontWeight: 700, fontSize: 14, cursor: formLoading ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                  {formLoading ? <><Loader2 size={16} style={{ animation: 'spin 0.7s linear infinite' }} /> Creating...</> : <><UserPlus size={16} /> Create User</>}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style>{`
        @keyframes slideUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
