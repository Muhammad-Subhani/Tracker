import React from "react";

export const StatCard = React.memo(({ label, count, badge, subtext }) => {
  return (
    <div className="tracker-card band-stat">
      <div className="stat-header">
        <span className="stat-label">{label}</span>
        {badge && <span className="stat-badge">{badge}</span>}
      </div>

      <div className="stat-value">{count}</div>

      {subtext && <div className="stat-subtext">{subtext}</div>}
    </div>
  );
});
