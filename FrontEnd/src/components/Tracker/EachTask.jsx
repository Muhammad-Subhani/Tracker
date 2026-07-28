import { useEffect, useState } from "react"
import { useTracks } from "../../hooks/useTracks.jsx"
export const Tracks = function(props) {

  const { RenderTime } = useTracks()
  const [elapsedTime, setElapsedTime] = useState(0);
  useEffect(() => {
    // to protect againts []
    if (!props.StartTime) return

    let starttime = new Date(props.StartTime).getTime();
    if (props.status) {
      if (props.EndTime) {
        setElapsedTime(new Date(props.EndTime).getTime() - starttime);
      }
      return;
    }
    const tick = () => setElapsedTime(Date.now() - starttime);
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);

  }, [props.StartTime, props.status, props.EndTime])
  return (
    <div>
      <p className={`${"taskinput"} `}>{props.content}    {RenderTime(elapsedTime)}</p>
      {
        (props.status == false && <button onClick={() => props.NeededTrackFunc(2, props.Id)}>Stop</button>)
      }
    </div>
  )
}
