
export const usecalendarHooks = function() {
  const days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
  const hours = Array.from({ length: 24 }, (_, i) => i); // 0–23
  const Hour_height = 55;
  const Px_per_mins = Hour_height / 60;
  function formatHour(h) {
    if (h === 0) return "12am";
    if (h === 12) return "12pm";
    return h < 12 ? `${h}am` : `${h - 12}pm`;
  }
  function snapMinutes(rawMinutes) {
    const SNAP = 15;
    return Math.round(rawMinutes / SNAP) * SNAP;
  }
  function setdays(year, month, DAY) {
    const date = new Date(year, month, DAY).getDate();
    const day = new Date(year, month, DAY).getDay();
    const arr = [];
    for (let i = date - day; i < (date - day) + 7; i++) {
      arr.push(new Date(year, month, i).getDate());
    };
    return arr;
  }
  return {
    days,
    hours,
    Hour_height,
    Px_per_mins,
    formatHour,
    snapMinutes,
    setdays,
  }
}
