import { Icon, type IconName } from "./icon";

export function StatCard({ label, value, detail, icon, trend, tone = "green" }: { label: string; value: string; detail?: string; icon?: IconName; trend?: string; tone?: "green" | "orange" | "neutral" }) {
  return (
    <article className={`stat-card stat-${tone}`}>
      <div className="stat-card-head">
        <span>{label}</span>
        {icon ? <span className="stat-icon"><Icon name={icon} size={16} /></span> : null}
      </div>
      <div className="stat-card-main">
        <strong>{value}</strong>
        {trend ? <span className="trend-pill">{trend}</span> : null}
      </div>
      {detail ? <p>{detail}</p> : null}
    </article>
  );
}
