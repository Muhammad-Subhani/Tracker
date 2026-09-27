import "./refcCss.css";

function formatMeridian(h) {
  return h < 12 || h === 24 ? "am" : "pm";
}

function getHours(h) {
  const mod = Math.floor(h) % 24;
  if (mod === 0 || mod === 12) return 12;
  return mod < 12 ? mod : mod - 12;
}

function giveActualTime(mins, h) {
  const meridian = formatMeridian(h);
  const hrs = getHours(h);
  const min = Math.floor(mins % 60);
  const formattedMin = min < 10 ? `0${min}` : min;
  return `${hrs}:${formattedMin}${meridian}`;
}

export const ExistingEvents = function({ title, headerheight, dayno, startingminutes, endingminutes, px_per_min }) {
  const start = startingminutes * px_per_min;
  const end = endingminutes * px_per_min;
  const height = Math.max(end - start, 22);
  const isCompact = height < 38;

  const timeString = `${giveActualTime(startingminutes, startingminutes / 60)} – ${giveActualTime(endingminutes, endingminutes / 60)}`;

  return (
    <div
      className="calendar-event-chip drag-box"
      style={{
        position: 'absolute',
        top: `${start + headerheight}px`,
        height: `${height}px`,
        left: `calc(60px + ${dayno} * (100% - 60px) / 7 + 2px)`,
        width: `calc((100% - 60px) / 7 - 4px)`,
      }}
      title={`${title || "Scheduled Event"} (${timeString})`}
    >
      <div className="event-chip-content">
        <span className="event-chip-title">{title || "Scheduled Event"}</span>
        {!isCompact && (
          <span className="event-chip-time">{timeString}</span>
        )}
      </div>
    </div>
  );
};
