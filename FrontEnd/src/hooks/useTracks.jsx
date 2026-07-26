import { useState, useEffect } from "react"
import { TrackerApi } from "../services/TrackerApi";
export const useTracks = function() {
  const {
    HandleButtonClick,
    HandleHaStop,
    DeleteParticular,
    DeleteAll
  } = TrackerApi()
  const [TrackerData, setTrackerData] = useState([]);
  const [tracks, setTracks] = useState("");
  const [elapsedTime, setElapsedTime] = useState(0);
  async function AddTheTracks() {
    const response = await HandleButtonClick(tracks);
    const TrackFromDB = response?.data?.tracks;
    setTrackerData(TrackFromDB);
    // the following code will run a separate useEffect for every piece 
    {
      TrackerData.map(track => (
        <StopWatchDisplay key={track._id} TrackFromDB={track} />
      ))
    }
  }
  async function HandleClearTracks(ID) {
    await DeleteParticular(ID);
    setTrackerData((prev) => prev.filter(p => p._id != ID))
  }
  async function SelectionOfTrackFunction(id, ID) {
    if (id == 1) HandleClearTracks(ID)
    // else do the cancel button api here !!
    else {
      const modified = await HandleHaStop(ID);
      setTrackerData((prev) => prev.map((obj) => (obj._id == ID) ? { ...obj, modified } : obj));
    }

  }
  function ClearAllTracks() {
    DeleteAll()
    const data = TrackerData.filter(p => p.HasStop == false)
    setTrackerData(data)
  }
  function StopWatchDisplay({ TrackFromDB }) {
    useEffect(() => {
      if (!TrackFromDB || TrackFromDB.HasStop) return; // if there is no entry or the HasStop is true 
      const startTime = new Date(TrackFromDB.StartTime).getTime(); // get the time when a new entry is created 
      const tick = () => setElapsedTime(Date.now() - startTime);
      tick();
      const interval = setInterval(tick, 1000); // tich function will repeat every second 

      return () => clearInterval(interval); // as soon the TrackFromDB changes the interval clears 

    }, [TrackFromDB])
  }

  function RenderTime(secs) {
    let hrs = Math.floor(secs / 3600);
    let mins = (Math.floor(secs / 60)) % 60;
    let sec = secs % 60;
    return `${hrs}hrs ${mins}mins ${sec} secs`;
  }
  return {
    TrackerData,
    setTrackerData,
    tracks,
    setTracks,
    StopWatchDisplay,
    AddTheTracks,
    HandleClearTracks,
    SelectionOfTrackFunction,
    ClearAllTracks,
    elapsedTime,
    setElapsedTime,
    RenderTime
  }
}
