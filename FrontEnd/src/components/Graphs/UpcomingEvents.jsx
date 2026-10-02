import React from "react";
import { Clock, MapPin, CalendarDays } from "lucide-react";
import { mockUpcomingEvents } from "./mockData";

export const UpcomingEvents = React.memo(({ events = mockUpcomingEvents }) => {
  // TODO: replace with real calendar events data from backend/calendar service

  return (
    <div className="tracker-card band-events">
      <div className="card-header">
        <div>
          <h2 className="card-title">Upcoming Events</h2>
          <span className="card-subtitle">Next scheduled agenda from calendar</span>
        </div>
        {events && events.length > 0 && (
          <span className="stat-badge">{events.length} upcoming</span>
        )}
      </div>

      {events && events.length > 0 ? (
        <div className="events-list">
          {events.map((evt) => (
            <div key={evt.id} className="event-card-item">
              {/* Date Indicator Badge */}
              <div className="event-date-indicator">
                <span className="event-badge-label">{evt.dateBadge}</span>
                <span className="event-date-text">{evt.dateFormatted}</span>
              </div>

              {/* Event Details */}
              <div className="event-details">
                <span className="event-title">{evt.title}</span>
                <div className="event-meta">
                  <span className="event-time">
                    <Clock size={12} strokeWidth={2} />
                    {evt.time}
                  </span>
                  {evt.location && (
                    <span className="event-location">
                      <MapPin size={12} strokeWidth={2} />
                      {evt.location}
                    </span>
                  )}
                </div>
              </div>

              {/* Category Tag */}
              {evt.category && (
                <span className="event-category-tag">{evt.category}</span>
              )}
            </div>
          ))}
        </div>
      ) : (
        /* Explicit quiet empty state */
        <div className="events-empty-state">
          <CalendarDays size={36} stroke="#5f6368" strokeWidth={1.5} />
          <div className="empty-state-title">Nothing scheduled</div>
          <div className="empty-state-subtitle">
            You're all caught up for the upcoming days.
          </div>
        </div>
      )}
    </div>
  );
});
