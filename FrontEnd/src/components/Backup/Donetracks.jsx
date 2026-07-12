import { Tracks } from "./EachTask.jsx"
export const CompletedTracks = function({ SelectionOfTrackFunction, TrackerData }) {
  return (
    <>
      {
        TrackerData.map((p) => {
          if (p.content != "" && p.HasStop == true) {
            return <Tracks content={p.content} Id={p.id} NeededTrackFunc={SelectionOfTrackFunction} time={p.count} status={p.HasStop} />
          }
        })
      }
    </>

  )
}
