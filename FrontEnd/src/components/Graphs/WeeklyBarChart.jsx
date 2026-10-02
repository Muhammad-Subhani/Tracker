import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  Cell
} from "recharts";
import { mockWeeklyContributions } from "./mockData";

// Custom dark tooltip matching the app theme
const CustomBarTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="tracker-chart-tooltip">
        <div className="tooltip-title">{data.fullDay || label}</div>
        <div className="tooltip-value" style={{ marginBottom: "4px" }}>
          {data.total} Total Contributions
        </div>
        <div style={{ fontSize: "11px", color: "var(--tracker-text-secondary)" }}>
          {data.todos} Todos · {data.trackers} Tracks · {data.events} Events
        </div>
      </div>
    );
  }
  return null;
};

export const WeeklyBarChart = React.memo(({ data = mockWeeklyContributions }) => {
  // TODO: replace with real weekly contribution data from backend
  const totalContributions = data.reduce((sum, item) => sum + (item.total || 0), 0);

  return (
    <div className="tracker-card band-weekly-chart">
      <div className="card-header">
        <div>
          <h2 className="card-title">Weekly Contributions</h2>
          <span className="card-subtitle">{totalContributions} total this week</span>
        </div>
      </div>

      <div className="weekly-chart-box">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 10, right: 10, left: 10, bottom: 0 }}
          >
            <XAxis
              dataKey="day"
              stroke="#5f6368"
              fontSize={11}
              tickLine={false}
              axisLine={{ stroke: "#282a2d" }}
              dy={6}
            />
            <Tooltip content={<CustomBarTooltip />} cursor={{ fill: "rgba(255, 255, 255, 0.04)" }} />
            <Bar
              dataKey="total"
              radius={[4, 4, 0, 0]}
              maxBarSize={32}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.isToday ? "var(--tracker-accent)" : "rgba(138, 180, 248, 0.7)"}
                  stroke={entry.isToday ? "#aecbfa" : "transparent"}
                  strokeWidth={1}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
});
