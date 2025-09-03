import { useState } from 'react';

function AddPageForm({ onAdd, loading }) {
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [error, setError] = useState('');

  const formatSlug = (value) => {
    // Ensure slug starts with / and is URL-friendly
    let s = value.trim().toLowerCase().replace(/[^a-z0-9\/-]+/g, '-');
    if (!s.startsWith('/')) s = '/' + s;
    return s.replace(/--+/g, '-');
  };

  const handleSlugChange = (e) => {
    setSlug(formatSlug(e.target.value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !slug) {
      setError('Title and slug are required');
      return;
    }
    if (!/^\/[a-z0-9\/-]+$/.test(slug)) {
      setError('Slug must start with / and contain only lowercase letters, numbers, dashes, or slashes');
      return;
    }
    setError('');
    onAdd({ title, slug });
    setTitle('');
    setSlug('');
  };

  return (
    <form className="add-page-form" onSubmit={handleSubmit}>
      <input
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Page Title"
        required
      />
      <input
        value={slug}
        onChange={handleSlugChange}
        placeholder="Page Slug (e.g. /project)"
        required
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Adding...' : 'Add Page'}
      </button>
      {error && <span style={{ color: '#d32f2f', marginLeft: 10 }}>{error}</span>}
    </form>
  );
}

export default AddPageForm;
