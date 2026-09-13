import { useRef, useState, useEffect } from "react";
import { usecalendarHooks } from "./calendarHooks";
import { useCalendar } from "../../hooks/useCalendar";
export const useDragSelection = function() {
  const { addCalendarEvent } = useCalendar();
  const { snapMinutes, Px_per_mins } = usecalendarHooks()
  const gridref = useRef(null)
  const headerGap = useRef(null)
  const anotherRef = useRef(null);
  const [startDrag, setStartDrag] = useState(null);
  const [isdragging, setDragging] = useState(false);
  const [endDrag, setEndDrag] = useState(null);
  const [isModelOpen, setModelOpen] = useState(false)
  const [newEvent, setNewEvent] = useState(null)
  const [headerHeight, setHeaderHeight] = useState(0);
  useEffect(() => {
    setHeaderHeight(headerGap.current.getBoundingClientRect().height);
  }, []);
  function getMinutesFromY(clienty) {
    const gridRect = gridref.current.getBoundingClientRect();
    const headerRect = headerGap.current.getBoundingClientRect();

    // Subtract header height so 0 minutes = top of the first hour cell
    let height = clienty - gridRect.top - headerRect.height;
    console.log(gridref.current.scrollTop)
    height += gridref.current.scrollTop;
    height /= Px_per_mins;
    return snapMinutes(height);
  }
  function getMinutesFromX(clientx) {
    const gridLeft = gridref.current.getBoundingClientRect().left;
    const widthofLabel = headerGap.current.getBoundingClientRect().width;
    const useablewidth = gridref.current.getBoundingClientRect().width - widthofLabel;
    const eachcol = useablewidth / 7;
    let x = clientx - gridLeft - widthofLabel;
    let day = Math.floor(x / eachcol);
    day = Math.max(0, Math.min(6, day));
    return day;
  }
  function handleMouseEvents(e) {
    const day = getMinutesFromX(e.clientX);
    const minutes = getMinutesFromY(e.clientY);
    setDragging(true)
    setStartDrag({ day, minutes });
    setEndDrag({ day, minutes });
  }
  function handleMouseMove(e) {
    if (!isdragging) return
    console.log(anotherRef.current.scrollTop)
    let minutes = getMinutesFromY(e.clientY);
    setEndDrag((p) => ({ ...p, minutes }));
  }
  function handleMouseUp() {

    const { day, minutes: startingminutes } = startDrag;
    const endingminutes = endDrag.minutes;
    setNewEvent({ day, startingminutes, endingminutes, title: "" });
    setDragging(false);
    setModelOpen(true);
  }
  async function EventCreation(obj) {
    const data =
    {
      title: obj.title,
      date: obj.date,
      month: obj.month,
      year: obj.year,
      startingminutes: obj.startingminutes,
      endingminutes: obj.endingminutes,
      dayno: obj.day
    }
    await addCalendarEvent(data);
    setModelOpen(false);
    setStartDrag(null);
    setEndDrag(null);
  }
  return {
    startDrag,
    isdragging,
    endDrag,
    gridref,
    headerGap,
    getMinutesFromY,
    getMinutesFromX,
    handleMouseEvents,
    handleMouseMove,
    handleMouseUp,
    headerHeight,
    newEvent,
    setNewEvent,
    isModelOpen,
    setModelOpen,
    EventCreation,
    anotherRef
  }
}
