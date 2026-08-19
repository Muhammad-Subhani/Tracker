import React, { useMemo } from "react";
import "../../styles/Maincalendar.css";

const HOURS = Array.from({ length: 16 }, (_, i) => i + 7); // 7AM–10PM

function getWeekDates(base) {
  const start = new Date(base);
  start.setDate(start.getDate() - start.getDay());
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    return d;
  });
}

export const MainCalendar = React.memo(() => {
  const today = new Date();
  const weekDates = useMemo(() => getWeekDates(today), []);

  return (
    <div className="maincalendar">
      <div className="maincal-header">
        <div className="time-gutter" />
        {weekDates.map((d, i) => (
          <div key={i} className={`day-header ${d.toDateString() === today.toDateString() ? "today" : ""}`}>
            <span className="day-name">{d.toLocaleDateString("default", { weekday: "short" })}</span>
            <span className="day-num">{d.getDate()}</span>
          </div>
        ))}
      </div>

      <div className="maincal-grid">
        <div className="time-gutter">
          {HOURS.map((h) => (
            <div key={h} className="hour-label">{h % 12 === 0 ? 12 : h % 12}{h < 12 ? "AM" : "PM"}</div>
          ))}
        </div>
        {weekDates.map((d, i) => (
          <div key={i} className="day-column">
            {HOURS.map((h) => <div key={h} className="hour-cell" />)}
          </div>
        ))}
      </div>
    </div>
  );
});
