import "./refcCss.css";
import React from "react";
import { usecalendarHooks } from "./calendarHooks";
import { useDateHooks } from "./useDateHooks";
import { useDragSelection } from "./useDragSelection";
import { PopUp } from "./PopUp";
import { ExistingEvents } from "./ExistingEvents";
import { DragOverlay } from "./DragOverlay";
import { Topbar } from "./TopBar";
import { useCalendar } from "../../hooks/useCalendar";
import { useQuery } from "@tanstack/react-query";
export const Calendar = function() {
  const {
    days,
    hours,
    Px_per_mins,
    formatHour,
    setdays,
  } = usecalendarHooks()
  const {
    setToday,
    year,
    month,
    Datee,
    headerTitle,
  } = useDateHooks();
  const {
    gridref,
    headerGap,
    headerHeight,
    isModelOpen,
    setModelOpen,
    newEvent,
    setNewEvent,
    EventCreation,

  } = useDragSelection()
  function Prevdate() {
    setToday(new Date(year, month, Datee - 7));
  }
  function GoNextdate() {
    setToday(new Date(year, month, Datee + 7));
  }
  const cells = setdays(year, month, Datee)
  /// drag drop system 

  const { fetchCalendarEvents } = useCalendar();
  const { data: storage = [], isLoading, isFetching, isError } = useQuery({
    queryKey: ['calendarEvents'],
    queryFn: fetchCalendarEvents,
    staleTime: 30000,
  })


  return (
    <div className="calendar-main-view">
      {isFetching && <div className="google-cal-shimmer-bar" />}
      <Topbar
        headerTitle={headerTitle}
        GoNextdate={GoNextdate}
        Prevdate={Prevdate}
        goToToday={() => setToday(new Date())}
      />
      <div className="scrollable">
        <div className="calendar-grid"
          ref={gridref}
        >
          {/* corner cell, empty */}
          <div className="corner" ref={headerGap} />

          {/* day headers, row 1 */}
          {days.map((d, i) => (
            <div
              key={i}
              className={`day-header${(cells[i] === (new Date().getDate()) && year === (new Date().getFullYear()) && month === (new Date().getMonth())) ? " today" : ""}`}
            >
              <span className="day-name">{d}</span>
              <span className="day-number">{cells[i]}</span>
            </div>
          ))}          {/* for each hour: 1 label cell + 7 day cells, same row */}

          {hours.map((h) => (
            <React.Fragment key={h}>
              <div className="time-label">{formatHour(h)}</div>
              {days.map((d, i) => (
                <div key={i}
                  style={{
                    gridColumn: `${i + 2}/${i + 3}`,
                    gridRow: `${h + 2}/${h + 3}`
                  }}
                  className="hour-cell" />
              ))}
            </React.Fragment>
          ))}

          <DragOverlay
            gridref={gridref}
            headerGap={headerGap}
            headerHeight={headerHeight}
            Px_per_mins={Px_per_mins}
            isModelOpen={isModelOpen}
            onSelect={(data) => {
              setNewEvent(data);
              setModelOpen(true);
            }}
          />

          {isModelOpen && <PopUp newEvent={newEvent}
            setNewEvent={setNewEvent}
            onClose={() => setModelOpen(false)}
            EventCreation={EventCreation}
            month={month}
            year={year}
            date={cells[newEvent.day]}
          />}
          {/* displaying the already existing events */}
          {storage
            .filter((p) => p.date == cells[p.dayno] && p.year == year && p.month == month)
            .map((p) => {
              return <ExistingEvents
                key={p._id}
                title={p.title}
                headerheight={headerHeight}
                dayno={p.dayno}
                startingminutes={p.startingminutes}
                endingminutes={p.endingminutes}
                px_per_min={Px_per_mins}
              />
            })}
        </div>
      </div>
      {isLoading && (
        <div className="google-cal-status-toast">
          <div className="status-spinner"></div>
          <span>Loading Calendar...</span>
        </div>
      )}
      {isError && (
        <div className="google-cal-status-toast error">
          <span>Failed to load events. Check connection.</span>
        </div>
      )}
    </div>
  );
}
