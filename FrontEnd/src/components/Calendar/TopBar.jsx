import React from "react";
import "../../styles/TopBarCalendar.css";
import { MiniCalendar } from "./miniCalndar.jsx";
import { Stats } from "./stats.jsx";
export const Topbar = React.memo(({ headerTitle, Prevdate, GoNextdate }) => {
  return (
    <div className="topbar">
      <div className="monthnav">
        <button
          className="monthnav-btn"
          onClick={Prevdate}
          aria-label="Previous month"
        >
          ▲
        </button>
        <span className="monthnav-label">{headerTitle || "month"}</span>
        <button
          className="monthnav-btn"
          onClick={GoNextdate}
          aria-label="Next month"
        >
          ▼
        </button>
      </div>
      <div className="video"><img src="../../assets/pixelatedCat.jpeg" alt="cat" /></div>
      <div className="stat1"><Stats label="Tasks Done" value="4" /></div>
      <div className="stat2"><Stats label="Streak" value="3" /></div>
      <div className="stat3"><Stats label="Habits" value="6" /></div>
      <div className="mini"><MiniCalendar /></div>
    </div>
  );
});
