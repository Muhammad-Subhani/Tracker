import React, { useState } from "react";
import "../../styles/MiniCalendar.css";

function getMonthGrid(year, month) {
  const startOffset = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells = [];
  for (let i = 0; i < startOffset; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}

export const MiniCalendar = React.memo(() => {
  const today = new Date();
  const [viewDate, setViewDate] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const cells = getMonthGrid(year, month);
  const monthLabel = viewDate.toLocaleString("default", { month: "long", year: "numeric" });

  const goPrev = () => setViewDate(new Date(year, month - 1, 1));
  const goNext = () => setViewDate(new Date(year, month + 1, 1));
  const isToday = (d) => d === today.getDate() && month === today.getMonth() && year === today.getFullYear();

  return (
    <div className="minicalendar">
      <div className="mini-header">
        <button onClick={goPrev}>‹</button>
        <span>{monthLabel}</span>
        <button onClick={goNext}>›</button>
      </div>
      <div className="mini-grid">
        {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
          <span key={i} className="mini-day-label">{d}</span>
        ))}
        {cells.map((d, i) => (
          <span key={i} className={`mini-cell ${d ? "" : "empty"} ${d && isToday(d) ? "today" : ""}`}>
            {d || ""}
          </span>
        ))}
      </div>
    </div>
  );
});
