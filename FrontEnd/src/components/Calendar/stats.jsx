import React from "react";
import "../../styles/Stats.css";

export const Stats = React.memo(({ label, value }) => {
  return (
    <div className="stats-card">
      <span className="stats-value">{value}</span>
      <span className="stats-label">{label}</span>
    </div>
  );
});
