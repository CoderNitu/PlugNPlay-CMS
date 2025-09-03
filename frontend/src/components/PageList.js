
function PageList({ pages, onSelect, selectedPage, onDelete }) {
  return (
    <div className="page-list">
      <h3>Select Page</h3>
      <ul>
        {pages.map(page => (
          <li key={page.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
            <button
              className={selectedPage && selectedPage.id === page.id ? 'selected' : ''}
              onClick={() => onSelect(page)}
            >
              {page.title}
            </button>
            <span
              className="delete-icon"
              title="Delete Page"
              style={{ marginLeft: 10, color: '#d32f2f', cursor: 'pointer', fontWeight: 'bold', fontSize: 18, transition: 'color 0.2s' }}
              onClick={() => onDelete(page.id)}
            >
              ×
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PageList;
