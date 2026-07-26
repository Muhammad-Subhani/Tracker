import { useTracks } from "./hooks/useTracks.jsx"
import { TrackInput } from "./components/Tracker/TrackerInput.jsx"
import { ClearTracks } from "./components/Tracker/ClearAllTracks.jsx"
import { ListOfTracks } from "./components/Tracker/ListOfTracks.jsx"
import { TrackerApi } from "./services/TrackerApi.jsx"
import { useEffect } from "react"
export const TrackerSection = function() {
  const {
    TrackerData,
    setTrackerData,
    tracks,
    setTracks,
    AddTheTracks,
    SelectionOfTrackFunction,
    ClearAllTracks,
  } = useTracks();
  const { FetchAllData } = TrackerApi();
  useEffect(() => {
    const data = FetchAllData();
    setTrackerData(data)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <>
      <TrackInput tracks={tracks} setTracks={setTracks} AddTheTracks={AddTheTracks} TrackerData={TrackerData} SelectionOfTrackFunction={SelectionOfTrackFunction} />
      <ClearTracks ClearAllTracks={ClearAllTracks} />
      <ListOfTracks TrackerData={TrackerData} SelectionOfTrackFunction={SelectionOfTrackFunction} />
    </>
  )
}
