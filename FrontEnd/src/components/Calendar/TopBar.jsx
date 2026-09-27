import React from "react";
import "../../styles/TopBarCalendar.css";
import { MiniCalendar } from "./miniCalndar.jsx";
import { Stats } from "./stats.jsx";
import pixelatedCat from "../../assets/pixelatedCat.jpeg";

export const Topbar = React.memo(({ headerTitle, Prevdate, GoNextdate, goToToday }) => {
  return (
    <div className="topbar">
      <div className="monthnav">
        <div className="monthnav-top">
          <div className="monthnav-brand">
            <svg
              className="google-cal-icon"
              viewBox="0 0 24 24"
              width="18"
              height="18"
              fill="none"
              stroke="#8ab4f8"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
            <span className="monthnav-brand-text">Schedule</span>
          </div>
          {goToToday && (
            <button className="monthnav-today-btn" onClick={goToToday} title="Go to today">
              Today
            </button>
          )}
        </div>

        <div className="monthnav-center">
          <span className="monthnav-label">{headerTitle || "Calendar"}</span>
        </div>

        <div className="monthnav-controls">
          <button
            className="monthnav-btn"
            onClick={Prevdate}
            aria-label="Previous week"
            title="Previous week"
          >
            ‹
          </button>
          <button
            className="monthnav-btn"
            onClick={GoNextdate}
            aria-label="Next week"
            title="Next week"
          >
            ›
          </button>
        </div>
      </div>

      <div className="video">
        <img src={pixelatedCat} alt="Focus Companion" className="video-img" />
        <div className="video-overlay-badge">
          <span className="pulse-dot"></span>
          <span>Focus Stream</span>
        </div>
      </div>

      <div className="stat1">
        <Stats label="Tasks Done" value="4" type="tasks" />
      </div>
      <div className="stat2">
        <Stats label="Streak" value="3" type="streak" />
      </div>
      <div className="stat3">
        <Stats label="Habits" value="6" type="habits" />
      </div>

      <div className="mini">
        <MiniCalendar />
      </div>
    </div>
  );
});
