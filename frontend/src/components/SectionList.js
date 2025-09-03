
import React from 'react';
import BlogSection from './BlogSection';
import GallerySection from './GallerySection';
import WidgetSection from './WidgetSection';



import { useEffect, useState } from 'react';

function renderSection(section, onSectionEdit, onSectionDelete, editingId, setEditingId, editValue, setEditValue) {
  if (section.type === 'plugin') {
    const [pluginName, ...params] = section.content.split(':');
    if (pluginName === 'gallery') return <GallerySection params={params} />;
    if (pluginName === 'blog') return <BlogSection params={params} />;
    if (pluginName === 'widget') return <WidgetSection params={params} />;
    return <div>Unknown plugin: {pluginName}</div>;
  }
  if (editingId === section.id) {
    return (
      <div style={{ width: '100%' }}>
        {section.type === 'image' ? (
          <input
            type="text"
            value={editValue}
            onChange={e => setEditValue(e.target.value)}
            placeholder="Image URL"
            style={{ width: '100%', marginBottom: 8 }}
          />
        ) : (
          <textarea
            value={editValue}
            onChange={e => setEditValue(e.target.value)}
            style={{ width: '100%', minHeight: 60, marginBottom: 8 }}
          />
        )}
        <button
          style={{ background: '#4f8cff', color: '#fff', border: 'none', borderRadius: 4, padding: '4px 12px', fontWeight: 500, marginRight: 8 }}
          onClick={() => {
            // Call parent handler to update backend
            if (onSectionEdit) onSectionEdit({ ...section, content: editValue });
            setEditingId(null);
          }}
        >
          Save
        </button>
        <button
          style={{ background: '#ff6b6b', color: '#fff', border: 'none', borderRadius: 4, padding: '4px 12px', fontWeight: 500, marginRight: 8 }}
          onClick={() => {
            // Call parent handler to delete section
            if (onSectionDelete) onSectionDelete(section.id);
            setEditingId(null);
          }}
        >
          Delete
        </button>
        <button
          style={{ background: '#aaa', color: '#fff', border: 'none', borderRadius: 4, padding: '4px 12px', fontWeight: 500 }}
          onClick={() => setEditingId(null)}
        >
          Cancel
        </button>
      </div>
    );
  }
  if (section.type === 'image') {
    return <img src={section.content} alt="Section" style={{ maxWidth: 160, maxHeight: 120, borderRadius: 8, boxShadow: '0 2px 8px #e0e7ef' }} />;
  }
  return <div style={{ fontSize: 16, padding: '8px 0' }}>{section.content}</div>;
}


function SectionList({ sections, onReorder, onEdit, onDelete }) {
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState('');
  const [localSections, setLocalSections] = useState(sections);

  useEffect(() => {
    setLocalSections(sections);
  }, [sections]);

  // Simple drag-and-drop reordering
  const handleDragStart = (e, index) => {
    e.dataTransfer.setData('sectionIndex', index);
  };

  const handleDrop = (e, index) => {
    const fromIndex = e.dataTransfer.getData('sectionIndex');
    if (fromIndex !== null && fromIndex !== undefined) {
      onReorder(Number(fromIndex), index);
    }
  };

  const handleEditClick = (section) => {
    setEditingId(section.id);
    setEditValue(section.content);
  };

  const handleDelete = (id) => {
    if (onDelete) onDelete(id);
    setLocalSections(prev => prev.filter(s => s.id !== id));
    setEditingId(null);
  };

  return (
    <div className="section-list" style={{ marginTop: 24 }}>
      <h3 style={{ marginBottom: 24 }}>Sections</h3>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24 }}>
        {localSections.map((section, idx) => (
          <React.Fragment key={section.id}>
            <div
              draggable
              onDragStart={e => handleDragStart(e, idx)}
              onDrop={e => handleDrop(e, idx)}
              onDragOver={e => e.preventDefault()}
              className={`section-card animate-section gallery-card`}
              style={{
                minWidth: 260,
                maxWidth: 320,
                marginBottom: 12,
                position: 'relative',
                flex: '1 1 260px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
              }}
            >
              <div style={{ fontWeight: 600, fontSize: 18, marginBottom: 8, color: '#4f8cff' }}>{section.type.charAt(0).toUpperCase() + section.type.slice(1)}</div>
              <div style={{ marginBottom: 8, width: '100%' }}>
                {renderSection(section, onEdit, handleDelete, editingId, setEditingId, editValue, setEditValue)}
              </div>
              {/* Only show edit/delete for non-plugin sections */}
              {section.type !== 'plugin' && editingId !== section.id && (
                <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
                  <button
                    title="Edit Section"
                    style={{ background: '#ffe066', color: '#333', border: 'none', borderRadius: 4, padding: '4px 12px', fontWeight: 500, cursor: 'pointer' }}
                    onClick={() => handleEditClick(section)}
                  >
                    Edit
                  </button>
                  <button
                    title="Delete Section"
                    style={{ background: '#ff6b6b', color: '#fff', border: 'none', borderRadius: 4, padding: '4px 12px', fontWeight: 500, cursor: 'pointer' }}
                    onClick={() => handleDelete(section.id)}
                  >
                    Delete
                  </button>
                </div>
              )}
              <div style={{ position: 'absolute', top: 8, right: 12, color: '#aaa', fontSize: 14 }}>
                Order: {section.order}
              </div>
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>

  );
}

export default SectionList;

