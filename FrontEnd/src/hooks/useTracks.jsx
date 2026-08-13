import { useCallback, useState } from "react"
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

  const AddTheTracks = useCallback(async () => {
    const response = await HandleButtonClick(tracks);
    const TrackFromDB = response?.data?.data?.track;
    setTrackerData(prev => [...prev, TrackFromDB]);
    // the following code will run a separate useEffect for every piece 
  }, [tracks, HandleButtonClick])

  const HandleClearTracks = useCallback(async (ID) => {
    await DeleteParticular(ID);
    setTrackerData((prev) => prev.filter(p => p._id != ID))
  }, [DeleteParticular])


  const SelectionOfTrackFunction = useCallback(async (id, ID) => {
    if (id == 1) HandleClearTracks(ID)
    // else do the cancel button api here !!
    else {
      const modified = await HandleHaStop(ID);
      console.log(modified)
      setTrackerData((prev) => prev.map((obj) => (obj._id == ID) ? { ...obj, ...modified } : obj));
    }
  }, [HandleClearTracks, HandleHaStop])

  const ClearAllTracks = useCallback(async () => {
    await DeleteAll()
    setTrackerData(prev => prev.filter(p => p.HasStop === false))
  }, [DeleteAll])

  return {
    TrackerData,
    setTrackerData,
    tracks,
    setTracks,
    AddTheTracks,
    HandleClearTracks,
    SelectionOfTrackFunction,
    ClearAllTracks,
  }
}
