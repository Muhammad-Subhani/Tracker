import { useState, useRef } from "react"
export const useTracks = function() {
  const IdCount = useRef(0);
  const Timings = useRef({});
  const [TrackerData, setTrackerData] = useState([]);
  const [tracks, setTracks] = useState("");
  function AddTheTracks() {
    let my_id = `track_${IdCount.current}`
    IdCount.current += 1;
    setTrackerData((prev) => [...prev, { content: `${tracks}`, id: my_id, HasStop: false, count: 0 }]);
    StartWatch(my_id);
  }
  function HandleClearTracks(ID) {
    setTrackerData((prev) => prev.filter(p => p.id != ID))
  }
  function SelectionOfTrackFunction(id, ID) {
    if (id == 1) HandleClearTracks(ID)
    else StopWatch(ID)
  }
  function ClearAllTracks() {
    const data = TrackerData.filter(p => p.HasStop == false)
    setTrackerData(data)
  }
  function StartWatch(ID) {
    Timings.current[ID] = setInterval(() => {
      setTrackerData((Prev) => Prev.map(p => (p.id == ID) ? { ...p, count: p.count + 1 } : p))
    }, 1000)
  }
  function StopWatch(ID) {
    clearInterval(Timings.current[ID]);
    setTrackerData(prev => prev.map(p => (p.id == ID) ? { ...p, HasStop: true } : p));
  }
  function RenderTime(secs) {
    let hrs = Math.floor(secs / 3600);
    let mins = (Math.floor(secs / 60)) % 60;
    let sec = secs % 60;
    return `${hrs}hrs ${mins}mins ${sec} secs`;
  }
  return {
    Timings,
    TrackerData,
    setTrackerData,
    tracks,
    setTracks,
    AddTheTracks,
    HandleClearTracks,
    SelectionOfTrackFunction,
    ClearAllTracks,
    StopWatch,
    RenderTime
  }
}
