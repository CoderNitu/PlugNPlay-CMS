import { useEffect, useState } from 'react';

function BlogSection({ params }) {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');

  const fetchPosts = () => {
    fetch('http://localhost:8000/api/blog/posts/')
      .then(res => res.json())
      .then(data => setPosts(data));
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleAdd = async () => {
    const res = await fetch('http://localhost:8000/api/blog/posts/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content }),
    });
    if (res.ok) {
      setTitle('');
      setContent('');
      fetchPosts();
    }
  };

  const handleEdit = async (id) => {
    const res = await fetch(`http://localhost:8000/api/blog/posts/${id}/`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: editTitle, content: editContent }),
    });
    if (res.ok) {
      setEditId(null);
      setEditTitle('');
      setEditContent('');
      fetchPosts();
    }
  };

  const handleDelete = async (id) => {
    const res = await fetch(`http://localhost:8000/api/blog/posts/${id}/`, {
      method: 'DELETE',
    });
    if (res.ok) fetchPosts();
  };

  return (
    <div className="blog-card">
      <h4 className="blog-title">Blog</h4>
      <div className="blog-list">
        <div className="blog-item add-new">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="blog-input"
          />
          <input
            type="text"
            placeholder="Content"
            value={content}
            onChange={e => setContent(e.target.value)}
            className="blog-input"
          />
          <button className="blog-btn upload" onClick={handleAdd}>Add</button>
        </div>
        {posts.map(post => (
          <div key={post.id} className="blog-item">
            {editId === post.id ? (
              <>
                <input
                  type="text"
                  value={editTitle}
                  onChange={e => setEditTitle(e.target.value)}
                  style={{ padding: 4, borderRadius: 4, border: '1px solid #ccc', marginBottom: 4 }}
                />
                <input
                  type="text"
                  value={editContent}
                  onChange={e => setEditContent(e.target.value)}
                  style={{ padding: 4, borderRadius: 4, border: '1px solid #ccc', marginBottom: 4 }}
                />
                <button onClick={() => handleEdit(post.id)} style={{ background: '#4f8cff', color: '#fff', border: 'none', borderRadius: 4, padding: '2px 8px', marginRight: 4 }}>Save</button>
                <button onClick={() => setEditId(null)} style={{ background: '#ccc', color: '#333', border: 'none', borderRadius: 4, padding: '2px 8px' }}>Cancel</button>
              </>
            ) : (
              <>
                <div style={{ fontWeight: 500, marginBottom: 4 }}>{post.title}</div>
                <div style={{ marginBottom: 4 }}>{post.content}</div>
                <button onClick={() => { setEditId(post.id); setEditTitle(post.title); setEditContent(post.content); }} style={{ background: '#ffe066', color: '#333', border: 'none', borderRadius: 4, padding: '2px 8px', marginRight: 4 }}>Edit</button>
                <button onClick={() => handleDelete(post.id)} style={{ background: '#ff6b6b', color: '#fff', border: 'none', borderRadius: 4, padding: '2px 8px' }}>Delete</button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default BlogSection;