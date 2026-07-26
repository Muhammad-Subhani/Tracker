import { useTracks } from "../../hooks/useTracks.jsx"
export const Tracks = function(props) {
  const { RenderTime, elapsedTime } = useTracks()
  return (
    <div>
      <p className={`${"taskinput"} `}>{props.content}    {RenderTime(elapsedTime)}</p>
      {
        (props.status == false && <button onClick={() => props.NeededTrackFunc(2, props.Id)}>Stop</button>)
      }
    </div>
  )
}
