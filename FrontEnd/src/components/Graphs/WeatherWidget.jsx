import React from "react";
import { MapPin } from "lucide-react";
import { mockWeatherData } from "./mockData";

export const WeatherWidget = React.memo(({ weather = mockWeatherData }) => {
  // Format current day name and date
  const now = new Date();
  const dayName = now.toLocaleDateString("en-US", { weekday: "long" });
  const dateFormatted = now.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });

  return (
    <div className="tracker-card band-weather">
      <div className="weather-header">
        <span className="weather-location-pill">
          <MapPin size={12} strokeWidth={2} />
          {weather.location}
        </span>
        <span className="card-subtitle">Local Outlook</span>
      </div>

      <div className="weather-body">
        <div className="weather-temp-wrap">
          <span className="weather-temp">{weather.temperature}</span>
          <span className="weather-unit">{weather.unit}</span>
        </div>

        {/* Custom-styled vector weather icon matching app's design system */}
        <div className="weather-icon-container" title={weather.condition}>
          <svg
            width="34"
            height="34"
            viewBox="0 0 34 34"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Sun Body & Subtle Corona */}
            <circle
              cx="19"
              cy="15"
              r="7"
              stroke="var(--tracker-accent)"
              strokeWidth="2"
              fill="rgba(138, 180, 248, 0.12)"
            />
            {/* Sun Rays */}
            <line x1="19" y1="4" x2="19" y2="6.5" stroke="var(--tracker-accent)" strokeWidth="2" strokeLinecap="round" />
            <line x1="26.78" y1="7.22" x2="25.01" y2="8.99" stroke="var(--tracker-accent)" strokeWidth="2" strokeLinecap="round" />
            <line x1="30" y1="15" x2="27.5" y2="15" stroke="var(--tracker-accent)" strokeWidth="2" strokeLinecap="round" />
            
            {/* Stylized Flat Cloud Outline */}
            <path
              d="M10 28H23C25.76 28 28 25.76 28 23C28 20.35 25.93 18.18 23.32 18.02C22.65 14.61 19.63 12 16 12C12.82 12 10.1 13.98 9.04 16.82C6.24 17.27 4 19.74 4 22.75C4 25.65 6.35 28 9.25 28H10Z"
              fill="var(--tracker-card-bg)"
              stroke="var(--tracker-text-primary)"
              strokeWidth="2"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      <div className="weather-footer">
        <span className="weather-condition">{weather.condition}</span>
        <span className="weather-date">{dayName}, {dateFormatted}</span>
      </div>
    </div>
  );
});
