import { LiveTracks } from "./LiveTracks.jsx"
import { CompletedTracks } from "./Donetracks.jsx"
export const ListOfTracks = function({ TrackerData, SelectionOfTrackFunction }) {
  return (
    <>
      <h1>Live tasks </h1>
      <LiveTracks TrackerData={TrackerData} SelectionOfTrackFunction={SelectionOfTrackFunction} />
      <h1>Completed tasks </h1>
      <CompletedTracks TrackerData={TrackerData} SelectionOfTrackFunction={SelectionOfTrackFunction} />
    </>
  )
}
