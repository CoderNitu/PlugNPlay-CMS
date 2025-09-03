import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import SectionList from './SectionList';

function SectionPage() {
  const { pageId } = useParams();
  const [sections, setSections] = useState([]);
  const [pageTitle, setPageTitle] = useState('');

  useEffect(() => {
    fetch(`http://localhost:8000/api/pages/${pageId}/sections/`)
      .then(res => res.json())
      .then(data => setSections(data));
    fetch(`http://localhost:8000/api/pages/${pageId}/`)
      .then(res => res.json())
      .then(data => setPageTitle(data.title));
  }, [pageId]);

  return (
    <div>
      <h2 style={{ marginBottom: 24 }}>Sections for: {pageTitle}</h2>
      <SectionList sections={sections} pageId={pageId} />
    </div>
  );
}

export default SectionPage;