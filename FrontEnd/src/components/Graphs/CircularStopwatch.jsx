import React, { useState, useEffect, useMemo } from "react";
import { Play, Pause } from "lucide-react";
import { mockTopRunningTracker } from "./mockData";

export const CircularStopwatch = React.memo(({ tracker = mockTopRunningTracker }) => {
  // TODO: replace with real active tracker data from timer service/store
  const [elapsedSeconds, setElapsedSeconds] = useState(tracker?.initialElapsedSeconds || 0);
  const [isRunning, setIsRunning] = useState(tracker?.isRunning ?? true);

  // Live ticking timer effect
  useEffect(() => {
    let intervalId;
    if (isRunning) {
      intervalId = setInterval(() => {
        setElapsedSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isRunning]);

  // Format seconds into HH:MM:SS
  const formatTime = (totalSec) => {
    const hrs = Math.floor(totalSec / 3600);
    const mins = Math.floor((totalSec % 3600) / 60);
    const secs = totalSec % 60;
    return `${String(hrs).padStart(2, "0")}:${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  // Stopwatch dial geometry (60 precision chronometer tick marks)
  const dialTicks = useMemo(() => {
    const ticks = [];
    const center = 110;
    const radius = 96;

    for (let i = 0; i < 60; i++) {
      const angle = (i * 6 * Math.PI) / 180 - Math.PI / 2;
      const isMajor = i % 5 === 0;
      const tickLength = isMajor ? 8 : 4;

      const x1 = center + (radius - tickLength) * Math.cos(angle);
      const y1 = center + (radius - tickLength) * Math.sin(angle);
      const x2 = center + radius * Math.cos(angle);
      const y2 = center + radius * Math.sin(angle);

      ticks.push({
        id: i,
        x1,
        y1,
        x2,
        y2,
        isMajor
      });
    }
    return ticks;
  }, []);

  // Ring arc calculations (60-second chronometer sweep)
  const trackRadius = 80;
  const circumference = 2 * Math.PI * trackRadius;
  const currentSecond = elapsedSeconds % 60;
  const progressRatio = currentSecond / 60;
  const strokeDashoffset = circumference - progressRatio * circumference;

  // Position of the glowing indicator bead at the tip of the sweep
  const sweepAngle = (progressRatio * 360 - 90) * (Math.PI / 180);
  const beadX = 110 + trackRadius * Math.cos(sweepAngle);
  const beadY = 110 + trackRadius * Math.sin(sweepAngle);

  return (
    <div className="tracker-card band-stopwatch">
      <div className="card-header" style={{ width: "100%" }}>
        <div>
          <h2 className="card-title">Active Tracker</h2>
          <span className="card-subtitle">Top running session</span>
        </div>
      </div>

      <div className="stopwatch-container">
        <div className="stopwatch-svg-wrap">
          {/* Hand-crafted Analog Stopwatch SVG Dial */}
          <svg
            width="220"
            height="220"
            viewBox="0 0 220 220"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Outer Chronometer Tick Marks */}
            <g className="dial-ticks">
              {dialTicks.map((t) => (
                <line
                  key={t.id}
                  x1={t.x1}
                  y1={t.y1}
                  x2={t.x2}
                  y2={t.y2}
                  stroke={
                    t.isMajor
                      ? "var(--tracker-card-border-hover)"
                      : "var(--tracker-card-border-subtle)"
                  }
                  strokeWidth={t.isMajor ? 1.75 : 1}
                  strokeLinecap="round"
                />
              ))}
            </g>

            {/* Inactive Track Ring */}
            <circle
              cx="110"
              cy="110"
              r={trackRadius}
              stroke="var(--tracker-card-border-subtle)"
              strokeWidth="4"
              fill="none"
            />

            {/* Active Progress Sweep Arc */}
            <circle
              cx="110"
              cy="110"
              r={trackRadius}
              stroke="var(--tracker-accent)"
              strokeWidth="4"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              fill="none"
              style={{
                transform: "rotate(-90deg)",
                transformOrigin: "110px 110px",
                transition: isRunning ? "stroke-dashoffset 0.8s linear" : "none"
              }}
            />

            {/* Glowing Sweep Tip Bead (visible when running) */}
            {isRunning && (
              <circle
                cx={beadX}
                cy={beadY}
                r="4"
                fill="var(--tracker-accent)"
                stroke="#131314"
                strokeWidth="1.5"
              />
            )}
          </svg>

          {/* Central Digital Readout and Session Label */}
          <div className="stopwatch-center-content">
            <span
              className={`stopwatch-status-pill ${isRunning ? "running" : "paused"
                }`}
            >
              <span
                className={
                  isRunning
                    ? "pulsing-indicator-dot"
                    : "static-indicator-dot"
                }
              />
              {isRunning ? "Live Running" : "Paused"}
            </span>

            <span className="stopwatch-digits">
              {formatTime(elapsedSeconds)}
            </span>

            <span
              className="stopwatch-tracker-title"
              title={tracker?.title || "Active Task"}
            >
              {tracker?.title || "Deep Work"}
            </span>
          </div>
        </div>

        {/* Quick Pause / Resume Action Control */}
        <div className="stopwatch-controls">
          <button
            type="button"
            className="stopwatch-toggle-btn"
            onClick={() => setIsRunning((prev) => !prev)}
            aria-label={isRunning ? "Pause Tracker" : "Resume Tracker"}
          >
            {isRunning ? (
              <>
                <Pause size={13} strokeWidth={2.5} />
                Pause
              </>
            ) : (
              <>
                <Play size={13} strokeWidth={2.5} />
                Resume
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
});
