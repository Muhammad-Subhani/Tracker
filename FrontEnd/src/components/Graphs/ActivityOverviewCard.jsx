import React from "react";
import { StreakGraph } from "./StreakGraph";
import { mockStatsData, mockTodayActivity, mockStreakData } from "./mockData";

export const ActivityOverviewCard = React.memo(({
  stats = mockStatsData,
  today = mockTodayActivity,
  streakData = mockStreakData
}) => {
  // TODO: replace with real API data for nested totals and daily counts
  return (
    <div className="tracker-card band-activity">
      {/* Top Section: Nested Mini-Totals + Smooth Streak Chart */}
      <div className="activity-top-row">
        {/* 1. Nested Mini-Totals (Secondary reference) */}
        <div className="nested-mini-totals">
          <div className="mini-totals-header">Totals</div>
          
          <div className="mini-stat-item">
            <span className="mini-stat-label">Todos</span>
            <span className="mini-stat-value">{stats.todos.total}</span>
          </div>

          <div className="mini-stat-item">
            <span className="mini-stat-label">Tracks</span>
            <span className="mini-stat-value">{stats.trackers.total}</span>
          </div>

          <div className="mini-stat-item">
            <span className="mini-stat-label">Events</span>
            <span className="mini-stat-value">{stats.events.total}</span>
          </div>
        </div>

        {/* 2. Streak Graph */}
        <StreakGraph data={streakData} />
      </div>

      {/* 3. Three small pill/chip elements along bottom row */}
      <div className="activity-chips-row">
        <div className="activity-chip">
          <span className="chip-label">Todos today</span>
          <span className="chip-count">{today.todosToday}</span>
        </div>

        <div className="activity-chip">
          <span className="chip-label">Tracks today</span>
          <span className="chip-count">{today.tracksToday}</span>
        </div>

        <div className="activity-chip">
          <span className="chip-label">Events today</span>
          <span className="chip-count">{today.eventsToday}</span>
        </div>
      </div>
    </div>
  );
});
