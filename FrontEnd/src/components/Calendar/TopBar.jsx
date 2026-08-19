import React from "react";
import "../../styles/TopBarCalendar.css";
import { MiniCalendar } from "./miniCalndar.jsx";
import { Stats } from "./stats.jsx";

export const Topbar = React.memo(() => {
  return (
    <div className="topbar">
      <div className="video">{/* pixelated animated video goes here */}</div>

      <div className="stat1"><Stats label="Tasks Done" value="4" /></div>
      <div className="stat2"><Stats label="Streak" value="3" /></div>
      <div className="stat3"><Stats label="Habits" value="6" /></div>

      <div className="mini"><MiniCalendar /></div>
    </div>
  );
});
