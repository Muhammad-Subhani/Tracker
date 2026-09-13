import "./refcCss.css"

function formatHour(h) {
  if (h === 0) return "am";
  if (h === 12) return "pm";
  return h < 12 ? `am` : `pm`;
}
function GetHours(h) {
  if (h == 0 || h == 12) return 12;
  else return (h < 12) ? h : h - 12;
}
function GiveActualTime(mins, h) {
  let meridian = formatHour(Math.floor(h) % 24);
  let hrs = Math.floor(GetHours(h))
  let min = (mins % 60);
  let ans = `${hrs}:${min}${meridian}`
  return ans
}
export const ExistingEvents = function({ headerheight, dayno, startingminutes, endingminutes, px_per_min }) {
  const start = startingminutes * px_per_min;
  const end = endingminutes * px_per_min;
  return (
    <div
      className="drag-box"
      style={{
        position: 'absolute',
        top: `${start + headerheight}px`,
        height: `${end - start}px`,
        left: `calc(60px + ${dayno} * (100% - 60px) / 7)`,
        width: `calc((100% - 60px) / 7)`,
      }}
    >

      {GiveActualTime(Math.floor(startingminutes), Math.floor(startingminutes / 60))}
      - {GiveActualTime(Math.floor(endingminutes), Math.floor(endingminutes / 60))}
    </div>
  )
}
