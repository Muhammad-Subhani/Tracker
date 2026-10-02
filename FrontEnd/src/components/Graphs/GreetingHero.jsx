import React from "react";
import { mockUserData } from "./mockData";

export const GreetingHero = React.memo(({ userName = mockUserData.name }) => {
  // Compute greeting dynamically based on user's local hour
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  return (
    <div className="tracker-card band-hero">
      <div className="hero-content">
        <span className="hero-salutation">{getGreeting()},</span>
        <h1 className="hero-name">{userName}</h1>
        <p className="hero-tagline">
          Here is your productivity pulse. Your streak is active and your workspace is synchronized.
        </p>
      </div>

      {/* Decorative signature wavy line in bottom-right corner (subtle, monochrome, low opacity) */}
      <svg
        className="hero-wave-graphic"
        viewBox="0 0 240 140"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M0 120 C 60 140, 100 80, 160 100 C 200 115, 220 85, 240 90"
          stroke="var(--tracker-accent)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path
          d="M20 135 C 70 150, 120 100, 175 118 C 210 130, 230 105, 240 110"
          stroke="var(--tracker-accent)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeDasharray="4 4"
        />
        <path
          d="M40 140 C 90 125, 140 120, 190 130 C 220 135, 235 125, 240 126"
          stroke="var(--tracker-accent)"
          strokeWidth="1"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
});
