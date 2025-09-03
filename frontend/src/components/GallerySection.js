import { useEffect, useState } from 'react';
import './GallerySection.css';

function GallerySection({ params }) {
  const [images, setImages] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [title, setTitle] = useState('');
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState('');

  const fetchImages = () => {
    fetch('http://localhost:8000/api/gallery/images/')
      .then(res => res.json())
      .then(data => setImages(data));
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handleUpload = async () => {
    if (!selectedFile || !title) return;
    const formData = new FormData();
    formData.append('image', selectedFile);
    formData.append('title', title);

    const res = await fetch('http://localhost:8000/api/gallery/images/', {
      method: 'POST',
      body: formData,
    });
    if (res.ok) {
      setTitle('');
      setSelectedFile(null);
      fetchImages();
    }
  };

  const handleEdit = async (id) => {
    const res = await fetch(`http://localhost:8000/api/gallery/images/${id}/`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: editTitle }),
    });
    if (res.ok) {
      setEditId(null);
      setEditTitle('');
      fetchImages();
    }
  };

  const handleDelete = async (id) => {
    const res = await fetch(`http://localhost:8000/api/gallery/images/${id}/`, {
      method: 'DELETE',
    });
    if (res.ok) fetchImages();
  };

  return (
    <div className="gallery-card">
      <h4 className="gallery-title">Gallery</h4>
      <div className="gallery-list">
        {/* Add New Image Card */}
        <div className="gallery-item add-new">
          <div className="gallery-img-wrapper">
            <input type="file" onChange={e => setSelectedFile(e.target.files[0])} />
          </div>
          <input
            type="text"
            placeholder="Image title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="gallery-input"
          />
          <button className="gallery-btn upload" onClick={handleUpload}>Add Image</button>
        </div>
        {/* Existing Images */}
        {images.map(img => (
          <div key={img.id} className="gallery-item">
            <div className="gallery-img-wrapper">
              <img src={img.image} alt={img.title} className="gallery-img" />
            </div>
            {editId === img.id ? (
              <div className="gallery-edit">
                <input
                  type="text"
                  value={editTitle}
                  onChange={e => setEditTitle(e.target.value)}
                  className="gallery-input"
                />
                <button className="gallery-btn save" onClick={() => handleEdit(img.id)}>Save</button>
                <button className="gallery-btn cancel" onClick={() => setEditId(null)}>Cancel</button>
              </div>
            ) : (
              <div className="gallery-info">
                <div className="gallery-img-title">{img.title}</div>
                <button className="gallery-btn edit" onClick={() => { setEditId(img.id); setEditTitle(img.title); }}>Edit</button>
                <button className="gallery-btn delete" onClick={() => handleDelete(img.id)}>Delete</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default GallerySection;