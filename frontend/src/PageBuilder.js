  const [showAddSection, setShowAddSection] = useState(false);
  const [showAddPage, setShowAddPage] = useState(false);
import { useEffect, useState } from 'react';
import AddPageForm from './components/AddPageForm';
import AddSectionForm from './components/AddSectionForm';
import EditSectionForm from './components/EditSectionForm';
import PageList from './components/PageList';
import SectionList from './components/SectionList';

const API_BASE = 'http://localhost:8000/api';

function PageBuilder() {
  const [pages, setPages] = useState([]);
  const [sections, setSections] = useState([]);
  const [selectedPage, setSelectedPage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [editingSection, setEditingSection] = useState(null);
  const [success, setSuccess] = useState('');
  // Add new page
  const handleAddPage = async (pageData) => {
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      const res = await fetch(`${API_BASE}/pages/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pageData),
      });
      if (res.ok) {
        const newPage = await res.json();
        // Fetch updated page list to ensure sync
        const pagesRes = await fetch(`${API_BASE}/pages/`);
        const pagesData = await pagesRes.json();
        setPages(pagesData);
        setSuccess('Page added successfully!');
      } else {
        setError('Failed to add page');
      }
    } catch {
      setError('Failed to add page');
    }
    setLoading(false);
    setTimeout(() => setSuccess(''), 2000);
  };

  // Delete page
  const handleDeletePage = async (pageId) => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${API_BASE}/pages/${pageId}/`, {
        method: 'DELETE'
      });
      if (res.ok) {
        setPages(pages.filter(p => p.id !== pageId));
        if (selectedPage && selectedPage.id === pageId) {
          setSelectedPage(null);
          setSections([]);
        }
      } else {
        setError('Failed to delete page');
      }
    } catch {
      setError('Failed to delete page');
    }
    setLoading(false);
  };

  // Edit section
  const handleEditSection = (section) => {
    setEditingSection(section);
  };

  const handleSaveSection = async (updatedSection) => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${API_BASE}/sections/${updatedSection.id}/`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedSection),
      });
      if (res.ok) {
        setSections(sections.map(s => s.id === updatedSection.id ? updatedSection : s));
        setEditingSection(null);
      } else {
        setError('Failed to save section');
      }
    } catch {
      setError('Failed to save section');
    }
    setLoading(false);
  };

  // Delete section
  const handleDeleteSection = async (sectionId) => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${API_BASE}/sections/${sectionId}/`, {
        method: 'DELETE'
      });
      if (res.ok) {
        setSections(sections.filter(s => s.id !== sectionId));
      } else {
        setError('Failed to delete section');
      }
    } catch {
      setError('Failed to delete section');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetch(`${API_BASE}/pages/`)
      .then(res => res.json())
      .then(data => setPages(data))
      .catch(() => setError('Failed to fetch pages'));
  }, []);

  useEffect(() => {
    if (selectedPage) {
      setSections(selectedPage.sections);
    } else {
      setSections([]);
    }
  }, [selectedPage]);

  const handlePageSelect = (page) => {
    setSelectedPage(page);
    setError('');
  };

  const handleAddSection = async (sectionData) => {
    if (!selectedPage) return;
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${API_BASE}/pages/${selectedPage.id}/add_section/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(sectionData),
      });
      if (res.ok) {
        const section = await res.json();
        setSections([...sections, section]);
      } else {
        setError('Failed to add section');
      }
    } catch {
      setError('Failed to add section');
    }
    setLoading(false);
  };

  const handleReorder = async (fromIdx, toIdx) => {
    // Swap order values and update backend
    const reordered = [...sections];
    const [moved] = reordered.splice(fromIdx, 1);
    reordered.splice(toIdx, 0, moved);
    // Update order fields
    reordered.forEach((section, idx) => section.order = idx + 1);
    setSections(reordered);
    // Optionally, send PATCH requests to update order in backend
    for (const section of reordered) {
      await fetch(`${API_BASE}/sections/${section.id}/`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ order: section.order }),
      });
    }
  };

  return (
    <div className="page-builder-container">
      <h2 style={{ textAlign: 'center', margin: '30px 0' }}>Page Builder</h2>
      <div className="page-builder-content" style={{ display: 'flex', gap: 32 }}>
        {/* Sidebar: Add Page and Page List */}
        <div style={{ minWidth: 320 }}>
          <button
            style={{
              background: 'linear-gradient(90deg, #4f8cff 60%, #6ee7b7 100%)',
              color: '#fff',
              fontWeight: 600,
              border: 'none',
              borderRadius: 8,
              padding: '10px 24px',
              fontSize: '1rem',
              boxShadow: '0 2px 8px #b3d1f7',
              cursor: 'pointer',
              marginBottom: 18,
              width: '100%'
            }}
            onClick={() => setShowAddPage(true)}
          >
            + Add Page
          </button>
          {showAddPage && (
            <div style={{ marginBottom: 18 }}>
              <AddPageForm onAdd={handleAddPage} loading={loading} />
              <button
                style={{ marginLeft: 12, background: '#aaa', color: '#fff', border: 'none', borderRadius: 6, padding: '8px 18px', fontWeight: 500 }}
                onClick={() => setShowAddPage(false)}
              >
                Cancel
              </button>
            </div>
          )}
          {success && <div className="success-message">{success}</div>}
          <PageList
            pages={pages}
            onSelect={handlePageSelect}
            selectedPage={selectedPage}
            onDelete={handleDeletePage}
          />
        </div>
        {/* Main: Sections Area */}
        {selectedPage && (
          <div className="sections-area" style={{ flex: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <h3 style={{ margin: 0 }}>Sections for: {selectedPage.title}</h3>
              <button
                style={{
                  background: 'linear-gradient(90deg, #4f8cff 60%, #6ee7b7 100%)',
                  color: '#fff',
                  fontWeight: 600,
                  border: 'none',
                  borderRadius: 8,
                  padding: '10px 24px',
                  fontSize: '1rem',
                  boxShadow: '0 2px 8px #b3d1f7',
                  cursor: 'pointer',
                  marginLeft: 24
                }}
                onClick={() => setShowAddSection(true)}
              >
                + Add Section
              </button>
            </div>
            {showAddSection && (
              <div style={{ marginBottom: 24 }}>
                <AddSectionForm onAdd={handleAddSection} loading={loading} />
                <button
                  style={{ marginLeft: 12, background: '#aaa', color: '#fff', border: 'none', borderRadius: 6, padding: '8px 18px', fontWeight: 500 }}
                  onClick={() => setShowAddSection(false)}
                >
                  Cancel
                </button>
              </div>
            )}
            <SectionList
              sections={sections}
              onReorder={handleReorder}
              onEdit={handleEditSection}
              onDelete={handleDeleteSection}
            />
            {/* Show EditSectionForm below cards if editing */}
            {editingSection && (
              <EditSectionForm
                section={editingSection}
                onSave={handleSaveSection}
                onCancel={() => setEditingSection(null)}
                loading={loading}
              />
            )}
            {error && <div className="error-message">{error}</div>}
          </div>
        )}
      </div>
    </div>
  );
}

export default PageBuilder;
