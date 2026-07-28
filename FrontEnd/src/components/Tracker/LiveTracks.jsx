import { Tracks } from "./EachTask.jsx"
export const LiveTracks = function({ TrackerData, SelectionOfTrackFunction }) {
  return (
    <>
      {
        TrackerData.map((p) => {
          if (p.content != "" && p.HasStop == false) {
            return <Tracks content={p.content}
              key={p._id} Id={p._id}
              NeededTrackFunc={SelectionOfTrackFunction}
              status={p.HasStop}
              StartTime={p.StartTime}
              EndTime={p.EndTime} />
          }
        })
      }
    </>
  )
}
