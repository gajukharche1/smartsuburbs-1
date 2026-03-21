'use client';

import { useState, useEffect, useRef } from 'react';
import api from '@/lib/api';
import { Image as ImageIcon, Upload, Trash2, Copy, Loader2, Check, Search } from 'lucide-react';

interface MediaItem {
  _id: string;
  url: string;
  altText: string;
  mimetype: string;
  size: number;
  createdAt: string;
}

const formatSize = (bytes: number) => {
  if (!bytes) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
};

export default function MediaPage() {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [file, setFile] = useState<File | null>(null);
  const [altText, setAltText] = useState('');
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { fetchMedia(); }, []);

  const fetchMedia = async () => {
    try {
      const { data } = await api.get('/media');
      const arr = Array.isArray(data) ? data : (data?.data || data?.media || []);
      setMedia(Array.isArray(arr) ? arr : []);
    } catch (err) {
      console.error('Failed to load media', err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) { setUploadError('Please select a file to upload.'); return; }
    setUploading(true);
    setUploadError('');
    const formData = new FormData();
    formData.append('file', file);
    if (altText) formData.append('altText', altText);
    try {
      await api.post('/media/upload', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
      setFile(null);
      setAltText('');
      if (fileInputRef.current) fileInputRef.current.value = '';
      fetchMedia();
    } catch (err: any) {
      setUploadError(err.response?.data?.message || 'Upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this media item? This cannot be undone.')) return;
    try {
      await api.delete(`/media/${id}`);
      setMedia(prev => prev.filter(m => m._id !== id));
    } catch { alert('Failed to delete media item.'); }
  };

  const handleCopy = (item: MediaItem) => {
    navigator.clipboard.writeText(`http://localhost:5000${item.url}`);
    setCopiedId(item._id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const dropped = e.dataTransfer.files[0];
    if (dropped) setFile(dropped);
  };

  const filteredMedia = media.filter(m =>
    (m.altText || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Page Header */}
      <div>
        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#1e293b', display: 'flex', alignItems: 'center', gap: 8, margin: 0 }}>
          <ImageIcon size={20} color="#10b981" /> Media Library
        </h2>
        <p style={{ fontSize: 13, color: '#64748b', marginTop: 4 }}>Upload and manage images and files for use across your website.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: 24, alignItems: 'start' }}>

        {/* ── Left Panel: Upload ─── */}
        <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #e8ebf0', boxShadow: '0 1px 4px rgba(0,0,0,0.04)', padding: 24, position: 'sticky', top: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
            <div style={{ width: 38, height: 38, borderRadius: 10, background: 'linear-gradient(135deg,#10b981,#059669)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Upload size={18} color="#fff" />
            </div>
            <div>
              <h3 style={{ fontSize: 15, fontWeight: 700, color: '#1e293b', margin: 0 }}>Upload New File</h3>
              <p style={{ fontSize: 12, color: '#94a3b8', margin: 0 }}>Images, PDFs, videos</p>
            </div>
          </div>

          <form onSubmit={handleUpload} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {/* Drop zone */}
            <div
              onDragOver={e => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              style={{
                border: `2px dashed ${dragOver ? '#10b981' : file ? '#10b981' : '#e2e8f0'}`,
                borderRadius: 12,
                padding: '24px 16px',
                textAlign: 'center',
                cursor: 'pointer',
                background: dragOver ? '#f0fdf4' : file ? '#f0fdf4' : '#fafbff',
                transition: 'all 0.2s',
              }}
            >
              <input ref={fileInputRef} type="file" accept="image/*,video/*,application/pdf" onChange={e => setFile(e.target.files?.[0] || null)} style={{ display: 'none' }} />
              <ImageIcon size={28} color={file ? '#10b981' : '#94a3b8'} style={{ margin: '0 auto 8px' }} />
              {file ? (
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: '#10b981' }}>{file.name}</div>
                  <div style={{ fontSize: 11, color: '#64748b', marginTop: 2 }}>{formatSize(file.size)}</div>
                </div>
              ) : (
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: '#64748b' }}>Drag & drop or click to browse</div>
                  <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 2 }}>Max 10MB · PNG, JPG, PDF, MP4</div>
                </div>
              )}
            </div>

            {/* Alt text */}
            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 }}>Alt Text (SEO)</label>
              <input
                type="text"
                placeholder="e.g. Smart Suburbs office in Pune"
                value={altText}
                onChange={e => setAltText(e.target.value)}
                style={{ width: '100%', padding: '10px 14px', border: '1.5px solid #e2e8f0', borderRadius: 10, fontSize: 13, color: '#1e293b', outline: 'none', background: '#f8fafc', boxSizing: 'border-box' }}
              />
            </div>

            {uploadError && (
              <div style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626', padding: '8px 12px', borderRadius: 8, fontSize: 13 }}>
                {uploadError}
              </div>
            )}

            <button
              type="submit"
              disabled={uploading || !file}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '11px', background: uploading || !file ? '#a7f3d0' : 'linear-gradient(135deg,#10b981,#059669)', color: '#fff', border: 'none', borderRadius: 10, fontWeight: 700, fontSize: 14, cursor: uploading || !file ? 'not-allowed' : 'pointer', boxShadow: '0 4px 12px rgba(16,185,129,0.25)', transition: 'all 0.2s' }}
            >
              {uploading ? <><Loader2 size={15} style={{ animation: 'spin 0.7s linear infinite' }} /> Uploading...</> : <><Upload size={15} /> Upload File</>}
            </button>
          </form>

          {/* Stats */}
          <div style={{ marginTop: 20, paddingTop: 20, borderTop: '1px solid #f1f5f9' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 13, color: '#64748b' }}>Total Files</span>
              <span style={{ fontSize: 20, fontWeight: 800, color: '#10b981' }}>{media.length}</span>
            </div>
          </div>
        </div>

        {/* ── Right Panel: Media Grid ─── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Search */}
          <div style={{ position: 'relative' }}>
            <Search size={15} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
            <input
              type="text"
              placeholder="Search by alt text..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              style={{ width: '100%', paddingLeft: 40, paddingRight: 14, paddingTop: 10, paddingBottom: 10, border: '1px solid #e2e8f0', borderRadius: 10, fontSize: 13, color: '#1e293b', outline: 'none', background: '#fff', boxSizing: 'border-box' }}
            />
          </div>

          {loading ? (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 200, color: '#10b981' }}>
              <Loader2 size={28} style={{ animation: 'spin 0.7s linear infinite' }} />
            </div>
          ) : filteredMedia.length === 0 ? (
            <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #e8ebf0', padding: '60px 20px', textAlign: 'center' }}>
              <div style={{ width: 56, height: 56, background: '#f0fdf4', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                <ImageIcon size={24} color="#10b981" />
              </div>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: '#1e293b', marginBottom: 6 }}>No Media Yet</h3>
              <p style={{ color: '#64748b', fontSize: 13 }}>{searchQuery ? 'No files match your search.' : 'Upload your first file using the panel on the left.'}</p>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 14 }}>
              {filteredMedia.map(item => (
                <div key={item._id} style={{ background: '#fff', borderRadius: 14, border: '1px solid #e8ebf0', overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,0.04)', display: 'flex', flexDirection: 'column' }}>
                  {/* Preview */}
                  <div style={{ aspectRatio: '1', background: '#f8fafc', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {item.mimetype?.startsWith('image/') ? (
                      <img src={`http://localhost:5000${item.url}`} alt={item.altText || 'Media'} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, padding: 16 }}>
                        <ImageIcon size={28} color="#94a3b8" />
                        <span style={{ fontSize: 11, fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>{item.mimetype?.split('/')[1]?.toUpperCase() || 'FILE'}</span>
                      </div>
                    )}
                  </div>
                  {/* Info + Actions */}
                  <div style={{ padding: '8px 10px', borderTop: '1px solid #f1f5f9' }}>
                    <div style={{ fontSize: 11, fontWeight: 600, color: '#1e293b', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', marginBottom: 2 }} title={item.altText || 'Untitled'}>
                      {item.altText || 'Untitled'}
                    </div>
                    <div style={{ fontSize: 10, color: '#94a3b8', marginBottom: 8 }}>{formatSize(item.size)}</div>
                    <div style={{ display: 'flex', gap: 6 }}>
                      <button onClick={() => handleCopy(item)} title="Copy URL" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4, padding: '5px', background: copiedId === item._id ? '#d1fae5' : '#f0fdf4', color: copiedId === item._id ? '#065f46' : '#10b981', border: 'none', borderRadius: 6, cursor: 'pointer', fontSize: 11, fontWeight: 600, transition: 'all 0.2s' }}>
                        {copiedId === item._id ? <><Check size={11} /> Copied</> : <><Copy size={11} /> Copy</>}
                      </button>
                      <button onClick={() => handleDelete(item._id)} title="Delete" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 28, height: 28, background: '#fef2f2', color: '#ef4444', border: 'none', borderRadius: 6, cursor: 'pointer' }}>
                        <Trash2 size={12} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
