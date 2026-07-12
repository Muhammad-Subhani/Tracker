import { useTracks } from "./hooks/useTracks.jsx"
import { TrackInput } from "./components/Tracker/TrackerInput.jsx"
import { ClearTracks } from "./components/Tracker/ClearAllTracks.jsx"
import { ListOfTracks } from "./components/Tracker/ListOfTracks.jsx"
export const TrackerSection = function() {
  const {
    TrackerData,
    tracks,
    setTracks,
    AddTheTracks,
    SelectionOfTrackFunction,
    ClearAllTracks,
  } = useTracks();
  return (
    <>
      <TrackInput tracks={tracks} setTracks={setTracks} AddTheTracks={AddTheTracks} TrackerData={TrackerData} SelectionOfTrackFunction={SelectionOfTrackFunction} />
      <ClearTracks ClearAllTracks={ClearAllTracks} />
      <ListOfTracks TrackerData={TrackerData} SelectionOfTrackFunction={SelectionOfTrackFunction} />
    </>
  )
}
