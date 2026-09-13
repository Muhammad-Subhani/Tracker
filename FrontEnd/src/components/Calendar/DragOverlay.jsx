// NOTE: the auto-scroll not working was a CSS issue, not a JS one.
// .scrollable needs `overflow-y: auto;` (or `scroll`) added — see chat.
import { useState, useCallback, useEffect, useRef } from "react";
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
  let meridian = formatHour(Math.floor(h));
  let hrs = (GetHours(Math.floor(h)))
  let min = (mins % 60);
  let ans = `${hrs}:${min}${meridian}`
  return ans
}
export const DragOverlay = function({ gridref, headerGap, headerHeight, Px_per_mins, onSelect, isModelOpen }) {
  const [startDrag, setStartDrag] = useState(null);
  const [isdragging, setIsDragging] = useState(false);
  const [endDrag, setEndDrag] = useState(null);

  // NEW: holds the setInterval id for auto-scroll, across renders, without
  // triggering re-renders itself (that's why it's a ref, not state)
  const autoScrollIntervalRef = useRef(null);

  function snapMinutes(rawMinutes) {
    const SNAP = 15;
    return Math.round(rawMinutes / SNAP) * SNAP;
  }

  // NEW: wrapped in useCallback so identity stays stable across renders.
  // gridref/headerGap are refs (the ref object itself never changes, only
  // .current does) so they're safe to omit from deps — only Px_per_mins
  // actually needs to be tracked.
  const getMinutesFromY = useCallback((clienty) => {
    if (!gridref.current || !headerGap.current) return 0;  // ← null guard
    const gridRect = gridref.current.getBoundingClientRect();
    const headerRect = headerGap.current.getBoundingClientRect();
    let height = clienty - gridRect.top - headerRect.height;
    height += 0;
    height /= Px_per_mins;
    return snapMinutes(height);
  }, [Px_per_mins]);

  const getMinutesFromX = useCallback((clientx) => {
    if (!gridref.current || !headerGap.current) return 0;  // ← null guard
    const gridLeft = gridref.current.getBoundingClientRect().left;
    const widthofLabel = headerGap.current.getBoundingClientRect().width;
    const useablewidth = gridref.current.getBoundingClientRect().width - widthofLabel;
    const eachcol = useablewidth / 7;
    let x = clientx - gridLeft - widthofLabel;
    let day = Math.floor(x / eachcol);
    return Math.max(0, Math.min(6, day));
  }, []);

  // NEW: stops whatever auto-scroll interval is currently running, if any.
  // Safe to call even when nothing is running (checks before clearing).
  function stopAutoScroll() {
    if (autoScrollIntervalRef.current) {
      clearInterval(autoScrollIntervalRef.current);
      autoScrollIntervalRef.current = null;
    }
  }

  // NEW: called on every mousemove while dragging. Looks at how close the
  // cursor is to the top/bottom edge of the SCROLLABLE container (not the
  // grid itself — .scrollable is the thing with overflow-y that actually
  // scrolls). If close enough, starts an interval nudging scrollTop.
  function checkAutoScroll(clientY) {
    const scrollEl = gridref.current?.closest(".scrollable");
    if (!scrollEl) return;

    const rect = scrollEl.getBoundingClientRect();
    const ZONE = 50;   // px from edge that counts as "trigger zone"
    const SPEED = 16;  // px scrolled per tick

    const distFromBottom = rect.bottom - clientY;
    const distFromTop = clientY - rect.top;

    // always clear the previous interval first — direction may have
    // flipped (e.g. was scrolling down, now near top instead), or cursor
    // may have moved out of both zones entirely
    stopAutoScroll();

    if (distFromBottom < ZONE) {
      autoScrollIntervalRef.current = setInterval(() => {
        const maxScroll = scrollEl.scrollHeight - scrollEl.clientHeight;
        scrollEl.scrollTop = Math.min(scrollEl.scrollTop + SPEED, maxScroll);
      }, 16);
    } else if (distFromTop < headerGap.current.getBoundingClientRect().height + ZONE) {
      autoScrollIntervalRef.current = setInterval(() => {
        scrollEl.scrollTop = Math.max(scrollEl.scrollTop - SPEED, 0);
      }, 16);
    }
    // if neither condition is true, we already stopped it above and start nothing new
  }

  const handleMouseEvents = useCallback((e) => {
    e.preventDefault()
    const day = getMinutesFromX(e.clientX);
    const minutes = getMinutesFromY(e.clientY);
    setIsDragging(true);
    setStartDrag({ day, minutes });
    setEndDrag({ day, minutes });
  }, []);

  // NEW: refs that always hold the LATEST startDrag/endDrag, kept in sync
  // by small effects below. mouseUp reads these instead of closing over
  // startDrag/endDrag directly — that's what lets us remove them from the
  // main effect's dependency array without going stale.
  const startDragRef = useRef(startDrag);
  const endDragRef = useRef(endDrag);
  useEffect(() => { startDragRef.current = startDrag; }, [startDrag]);
  useEffect(() => { endDragRef.current = endDrag; }, [endDrag]);

  useEffect(() => {
    if (!isdragging) return;

    function mouseMove(e) {
      checkAutoScroll(e.clientY);
      let minutes = getMinutesFromY(e.clientY);

      if (minutes < 0) minutes = 0;
      if (minutes > 1430) minutes = 1430;   // was 1420 — see note below

      setEndDrag((p) => ({ ...p, minutes }));
    }

    function mouseUp() {
      setIsDragging(false);
      stopAutoScroll();   // NEW: never let it keep scrolling after drag ends
      const s = startDragRef.current;
      const en = endDragRef.current;
      if (s && en) {
        const startingminutes = Math.min(s.minutes, en.minutes);
        const endingminutes = Math.max(s.minutes, en.minutes);
        onSelect({
          day: s.day,
          startingminutes,
          endingminutes,
        });
      }
    }

    function forceEnd() {
      setIsDragging(false);
      stopAutoScroll();   // NEW: same reasoning — window lost focus mid-drag
    }

    window.addEventListener("mousemove", mouseMove);
    window.addEventListener("mouseup", mouseUp);
    window.addEventListener("blur", forceEnd);

    return () => {
      stopAutoScroll();   // NEW: safety net — effect cleanup, e.g. isdragging flips to false
      window.removeEventListener("blur", forceEnd);
      window.removeEventListener("mousemove", mouseMove);
      window.removeEventListener("mouseup", mouseUp);
    }
    // NOTE: startDrag/endDrag deliberately NOT in this array anymore.
    // This effect now only runs when a drag starts/stops — not on every
    // mousemove — which is what lets the auto-scroll interval survive
    // long enough to actually tick.
  }, [isdragging, getMinutesFromY, onSelect])

  const top = startDrag && endDrag
    ? Math.min(startDrag.minutes, endDrag.minutes) * Px_per_mins + headerHeight
    : 0;
  const height = startDrag && endDrag
    ? Math.abs(endDrag.minutes - startDrag.minutes) * Px_per_mins
    : 0;

  return (
    <>
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 20,
          cursor: isdragging ? "ns-resize" : "default",
        }}
        onMouseDown={handleMouseEvents}
      />
      {
        (isdragging || isModelOpen) && startDrag && endDrag && (
          <div
            className="drag-box"
            style={{
              position: "absolute",
              top: ` ${top}px `,
              height: `${Math.min(height, gridref.current.getBoundingClientRect().height - headerGap.current.getBoundingClientRect().height - 10)}px `,
              left: `calc(60px + ${startDrag.day} * (100% - 60px) / 7)`,
              width: `calc((100% - 60px) / 7)`,
              pointerEvents: "none",
            }}
          >
            {GiveActualTime(Math.min(startDrag.minutes, endDrag.minutes), Math.min(startDrag.minutes, endDrag.minutes) / 60)}
            - {GiveActualTime(Math.max(startDrag.minutes, endDrag.minutes), Math.max(startDrag.minutes, endDrag.minutes) / 60)}

          </div>
        )}
    </>
  );
}
