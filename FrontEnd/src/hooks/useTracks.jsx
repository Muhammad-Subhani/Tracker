import { useState } from "react"
import { useTrackerApi } from "../services/TrackerApi";

export const useTracks = function() {

  const {
    HandleButtonClick,
    HandleHaStop,
    DeleteParticular,
    DeleteAll
  } = useTrackerApi()
  const [TrackerData, setTrackerData] = useState([]);
  const [tracks, setTracks] = useState("");

  async function AddTheTracks() {
    const response = await HandleButtonClick(tracks);
    const TrackFromDB = response?.data?.data?.track;
    setTrackerData(prev => [...prev, TrackFromDB]);
    // the following code will run a separate useEffect for every piece 

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
      console.log(modified)
      setTrackerData((prev) => prev.map((obj) => (obj._id == ID) ? { ...obj, ...modified } : obj));
    }

  }
  async function ClearAllTracks() {
    await DeleteAll()
    const data = TrackerData.filter(p => p.HasStop == false)
    setTrackerData(data)
  }


  function RenderTime(secs) {
    const totalSeconds = Math.floor(secs / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours}hrs ${minutes}mins ${seconds}secs`;

  }
  return {
    TrackerData,
    setTrackerData,
    tracks,
    setTracks,
    AddTheTracks,
    HandleClearTracks,
    SelectionOfTrackFunction,
    ClearAllTracks,
    RenderTime
  }
}
