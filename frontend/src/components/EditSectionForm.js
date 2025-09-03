import { useState } from 'react';

function EditSectionForm({ section, onSave, onCancel, loading }) {
  const [type, setType] = useState(section.type);
  const [content, setContent] = useState(section.content);
  const [order, setOrder] = useState(section.order);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...section, type, content, order });
  };

  return (
    <form className="edit-section-form" onSubmit={handleSubmit}>
      <select value={type} onChange={e => setType(e.target.value)}>
        <option value="text">Text</option>
        <option value="image">Image</option>
        <option value="plugin">Plugin</option>
      </select>
      <input
        value={content}
        onChange={e => setContent(e.target.value)}
        placeholder="Section content"
      />
      <input
        type="number"
        value={order}
        onChange={e => setOrder(Number(e.target.value))}
        style={{ width: 60 }}
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Saving...' : 'Save'}
      </button>
      <button type="button" onClick={onCancel} className="cancel-btn">Cancel</button>
    </form>
  );
}

export default EditSectionForm;
