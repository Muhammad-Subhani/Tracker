import React from "react";
import "./styles/DashboardGrid.css";
import { GreetingHero } from "./components/Graphs/GreetingHero";
import { WeatherWidget } from "./components/Graphs/WeatherWidget";
import { StatCard } from "./components/Graphs/StatCard";
import { ActivityOverviewCard } from "./components/Graphs/ActivityOverviewCard";
import { WeeklyBarChart } from "./components/Graphs/WeeklyBarChart";
import { UpcomingEvents } from "./components/Graphs/UpcomingEvents";
import { CircularStopwatch } from "./components/Graphs/CircularStopwatch";
import { mockStatsData } from "./components/Graphs/mockData";

export const Graphs = React.memo(() => {
  return (
    <div className="tracker-dashboard">
      <div className="dashboard-grid">
        {/* Band 1: Greeting Hero (8 col) & Weather Widget (4 col) */}
        <GreetingHero />
        <WeatherWidget />

        {/* Band 2: Three Stat Cards (4 col each, equal height & width) */}
        <StatCard
          label="Total Todos"
          count={mockStatsData.todos.total}
          badge="Active"
          subtext={mockStatsData.todos.subtext}
        />
        <StatCard
          label="Total Trackers"
          count={mockStatsData.trackers.total}
          badge="Tracking"
          subtext={mockStatsData.trackers.subtext}
        />
        <StatCard
          label="Total Events"
          count={mockStatsData.events.total}
          badge="Upcoming"
          subtext={mockStatsData.events.subtext}
        />

        {/* Band 3: Activity Overview (8 col) & Weekly Bar Chart (4 col) */}
        <ActivityOverviewCard />
        <WeeklyBarChart />

        {/* Band 4: Upcoming Events (8 col) & Circular Stopwatch (4 col) */}
        <UpcomingEvents />
        <CircularStopwatch />
      </div>
    </div>
  );
});
