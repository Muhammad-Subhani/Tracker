import { Tracks } from "./EachTask.jsx"
import { TrackerData } from "../../hooks/useTracks.jsx"
export const LiveTracks = function({ SelectionOfTrackFunction }) {

  console.log(TrackerData)
  return (
    <>
      {
        TrackerData?.map((p) => {
          if (p.content != "" && p.HasStop == false) {
            return <Tracks content={p.content} Id={p.id} NeededTrackFunc={SelectionOfTrackFunction} time={p.count} status={p.HasStop} />
          }
        })
      }
    </>
  )
}
