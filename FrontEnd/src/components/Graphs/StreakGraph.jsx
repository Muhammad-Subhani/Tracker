import React from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  Tooltip
} from "recharts";
import { mockStreakData } from "./mockData";

// Custom dark tooltip matching Tracker design system
const CustomStreakTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="tracker-chart-tooltip">
        <div className="tooltip-title">{label}</div>
        <div className="tooltip-value">
          {payload[0].value} day streak
        </div>
      </div>
    );
  }
  return null;
};

export const StreakGraph = React.memo(({ data = mockStreakData }) => {
  // TODO: replace with real streak data from backend
  return (
    <div className="streak-graph-container">
      <div className="streak-header">
        <span className="card-title">Activity Streak</span>
        <span className="streak-tag">
          {data[data.length - 1]?.value || 15} Days Active
        </span>
      </div>

      <div className="streak-chart-box">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 10, left: 10, bottom: 0 }}
          >
            <defs>
              {/* Subtle monochrome opacity fade of the accent color */}
              <linearGradient id="streakAccentGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8ab4f8" stopOpacity={0.28} />
                <stop offset="95%" stopColor="#8ab4f8" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="day"
              stroke="#5f6368"
              fontSize={11}
              tickLine={false}
              axisLine={{ stroke: "#282a2d" }}
              dy={6}
            />
            <Tooltip content={<CustomStreakTooltip />} />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#8ab4f8"
              strokeWidth={2.5}
              fillOpacity={1}
              fill="url(#streakAccentGradient)"
              activeDot={{
                r: 5,
                fill: "#8ab4f8",
                stroke: "#131314",
                strokeWidth: 2
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
});
