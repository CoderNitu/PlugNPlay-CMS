import { useState } from 'react';

function AddSectionForm({ onAdd, loading }) {
  const [type, setType] = useState('text');
  const [content, setContent] = useState('');
  const [order, setOrder] = useState(1);
  const [imageFile, setImageFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let sectionContent = content;
    if (type === 'image' && imageFile) {
      // Convert image to base64 for demo purposes
      const reader = new FileReader();
      reader.onloadend = () => {
        onAdd({ type, content: reader.result, order });
        setContent('');
        setOrder(order + 1);
        setImageFile(null);
      };
      reader.readAsDataURL(imageFile);
      return;
    }
    onAdd({ type, content: sectionContent, order });
    setContent('');
    setOrder(order + 1);
  };

  return (
    <form className="add-section-form" onSubmit={handleSubmit}>
      <h4>Add Section</h4>
      <select value={type} onChange={e => setType(e.target.value)}>
        <option value="text">Text</option>
        <option value="image">Image</option>
        <option value="plugin">Plugin</option>
      </select>
      {type === 'image' ? (
        <input
          type="file"
          accept="image/*"
          onChange={e => setImageFile(e.target.files[0])}
          style={{ marginLeft: 10 }}
        />
      ) : (
        <input
          value={content}
          onChange={e => setContent(e.target.value)}
          placeholder="Section content"
          style={{ marginLeft: 10 }}
        />
      )}
      <input
        type="number"
        value={order}
        onChange={e => setOrder(Number(e.target.value))}
        style={{ marginLeft: 10, width: 60 }}
      />
      <button type="submit" style={{ marginLeft: 10 }} disabled={loading}>
        {loading ? 'Adding...' : 'Add'}
      </button>
    </form>
  );
}

export default AddSectionForm;
