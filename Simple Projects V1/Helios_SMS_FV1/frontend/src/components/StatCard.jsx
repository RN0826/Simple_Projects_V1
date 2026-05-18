export default function StatCard({ label, value, icon: Icon, note }) {
  return (
    <article className="stat-card">
      <div>
        <p>{label}</p>
        <strong>{value}</strong>
        {note ? <span>{note}</span> : null}
      </div>
      {Icon ? (
        <div className="stat-icon">
          <Icon size={25} />
        </div>
      ) : null}
    </article>
  );
}
