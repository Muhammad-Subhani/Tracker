import { Tracks } from "./EachTask.jsx"
export const LiveTracks = function({ TrackerData, SelectionOfTrackFunction }) {
  return (
    <>
      {
        TrackerData.map((p) => {
          if (p.content != "" && p.HasStop == false) {
            return <Tracks content={p.content} Id={p.id} NeededTrackFunc={SelectionOfTrackFunction} time={p.count} status={p.HasStop} />
          }
        })
      }
    </>
  )
}
