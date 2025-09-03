
function WidgetSection({ params }) {
  // Example widget: show current date/time
  return (
    <div className="widget-card">
      <div className="widget-title">Custom Widget</div>
      <div className="widget-list">
        <div className="widget-item">
          <div>Current Date/Time:</div>
          <div style={{ fontWeight: 'bold', fontSize: '1.2rem', marginTop: '8px' }}>
            {new Date().toLocaleString()}
          </div>
        </div>
      </div>
    </div>
  );
}
export default WidgetSection;
