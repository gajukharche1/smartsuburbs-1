'use client';

import { useMemo } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill-new/dist/quill.snow.css';

// Dynamically import react-quill-new so it doesn't crash during SSR
const ReactQuill = dynamic(() => import('react-quill-new'), { 
  ssr: false,
  loading: () => <div style={{ height: 300, background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8' }}>Loading Editor...</div>
});

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function RichTextEditor({ value, onChange, placeholder }: RichTextEditorProps) {
  
  const modules = useMemo(() => ({
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
      ['link', 'image'],
      ['clean']
    ],
  }), []);

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
  ];

  return (
    <div className="rich-text-editor-wrapper" style={{ 
      borderRadius: 12, 
      overflow: 'hidden', 
      border: '1.5px solid #e2e8f0',
      background: '#fff'
    }}>
      <ReactQuill 
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        formats={formats}
        placeholder={placeholder}
        style={{ minHeight: 300 }}
      />
      <style>{`
        .rich-text-editor-wrapper .ql-toolbar {
          border: none !important;
          border-bottom: 1.5px solid #e2e8f0 !important;
          background: #f8fafc;
          border-radius: 12px 12px 0 0;
          padding: 12px;
        }
        .rich-text-editor-wrapper .ql-container {
          border: none !important;
          min-height: 300px;
          font-size: 15px;
          font-family: inherit;
        }
        .rich-text-editor-wrapper .ql-editor {
          min-height: 300px;
          padding: 16px;
          color: #1e293b;
          line-height: 1.6;
        }
        .rich-text-editor-wrapper .ql-editor.ql-blank::before {
          color: #94a3b8;
          font-style: normal;
        }
      `}</style>
    </div>
  );
}
