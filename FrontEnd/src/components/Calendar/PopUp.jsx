import { useState, useEffect } from "react";
import "./refPop.css";

function formatTime(mins) {
  const h = Math.floor(mins / 60);
  const m = Math.floor(mins % 60);
  const formattedM = m < 10 ? `0${m}` : m;
  const period = h < 12 || h === 24 ? "AM" : "PM";
  const displayH = h % 12 === 0 ? 12 : h % 12;
  return `${displayH}:${formattedM} ${period}`;
}

export const PopUp = function({ onClose, newEvent, setNewEvent, month, date, EventCreation, year }) {
  const [title, setTitle] = useState("");

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "Escape") {
        onClose();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  async function MakeAnEvent() {
    if (title.trim() !== "") {
      setNewEvent((p) => ({ ...p, title: title.trim() }));
      const obj = {
        title: title.trim(),
        date: date,
        month: month,
        year: year,
        startingminutes: Math.abs(newEvent.startingminutes),
        endingminutes: Math.abs(newEvent.endingminutes),
        day: newEvent.day
      };
      await EventCreation(obj);
    }
    onClose();
  }

  function handleFormSubmit(e) {
    e.preventDefault();
    MakeAnEvent();
  }

  const startMins = newEvent ? Math.min(newEvent.startingminutes, newEvent.endingminutes) : 0;
  const endMins = newEvent ? Math.max(newEvent.startingminutes, newEvent.endingminutes) : 0;
  const durationMins = endMins - startMins;
  const durationText =
    durationMins >= 60
      ? `${Math.floor(durationMins / 60)} hr ${durationMins % 60 > 0 ? `${durationMins % 60} min` : ""}`
      : `${durationMins} min`;

  const dateObj = new Date(year, month, date);
  const formattedDate = dateObj.toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric"
  });

  return (
    <div
      className="modal-backdrop"
      onClick={onClose}
      onMouseDown={(e) => e.stopPropagation()}
      onMouseUp={(e) => e.stopPropagation()}
    >
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <span className="modal-header-pill">Event</span>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close dialog">
            ✕
          </button>
        </div>

        <form onSubmit={handleFormSubmit}>
          <div className="modal-input-group">
            <input
              type="text"
              className="modal-title-input"
              placeholder="Add title"
              autoFocus
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {newEvent && (
            <div className="modal-details-card">
              <div className="modal-detail-row">
                <svg
                  className="modal-icon"
                  viewBox="0 0 24 24"
                  width="18"
                  height="18"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
                <div className="modal-time-info">
                  <div className="modal-time-date">{formattedDate}</div>
                  <div className="modal-time-hours">
                    {formatTime(startMins)} – {formatTime(endMins)}
                    <span className="modal-duration-tag">{durationText}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="modal-actions">
            <button type="button" className="modal-btn-cancel" onClick={onClose}>
              Cancel
            </button>
            <button
              type="submit"
              className="modal-btn-save"
              disabled={!title.trim()}
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
