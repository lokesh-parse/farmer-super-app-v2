function SectionCard({ title, children, action }) {
  return (
    <div className="premium-section-card">
      <div className="section-card-header">
        <h3>{title}</h3>
        {action}
      </div>

      <div className="section-content">
        {children}
      </div>
    </div>
  );
}

export default SectionCard;