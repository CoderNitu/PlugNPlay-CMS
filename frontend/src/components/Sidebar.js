import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Sidebar() {
  const [pages, setPages] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:8000/api/pages/')
      .then(res => res.json())
      .then(data => setPages(data));
  }, []);

  return (
    <div style={{ width: 260, background: '#eaf2fb', padding: 24 }}>
      <h3>Select Page</h3>
      {pages.map(page => (
        <div
          key={page.id}
          style={{
            margin: '12px 0',
            padding: '12px 18px',
            background: '#4f8cff',
            color: '#fff',
            borderRadius: 8,
            cursor: 'pointer',
            fontWeight: 500,
          }}
          onClick={() => navigate(`/page/${page.id}`)}
        >
          {page.title}
        </div>
      ))}
    </div>
  );
}

export default Sidebar;