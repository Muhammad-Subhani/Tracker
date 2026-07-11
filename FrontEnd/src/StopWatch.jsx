import { useRef, useState } from "react";
export const Tracker = function() {
  const IdCount = useRef(0);
  const Timings = useRef({});
  const [Data, setData] = useState([]);
  const [task, setTasks] = useState("");
  function AddTheTasks() {
    let my_id = `track_${IdCount.current}`
    IdCount.current += 1;
    setData((prev) => [...prev, { content: `${task}`, id: my_id, HasStop: false, count: 0 }]);
    StartWatch(my_id);
  }
  function HandleClearTasks(ID) {
    setData((prev) => prev.filter(p => p.id != ID))
  }
  function SelectionOfFunction(id, ID) {
    if (id == 1) HandleClearTasks(ID)
    else StopWatch(ID)
  }
  function ClearAllTask() {
    setData([])
  }
  function StartWatch(ID) {
    Timings.current[ID] = setInterval(() => {
      setData((Prev) => Prev.map(p => (p.id == ID) ? { ...p, count: p.count++ } : p))
    }, 1000)
  }
  function StopWatch(ID) {
    clearInterval(Timings.current[ID]);
    setData(prev => prev.map(p => (p.id == ID) ? { ...p, HasStop: true } : p));
  }


  return (
    <>
      <input
        className="InputField"
        type="text"
        placeholder="Enter your tasks ..."
        value={task}
        onChange={(e) => setTasks(e.target.value)} />
      <button type="submit" onClick={AddTheTasks}>Start Task</button>
      <button onClick={ClearAllTask}>Clear all </button>
      <h1>Live tasks </h1>
      {
        Data.map((p) => {
          if (p.content != "" && p.HasStop == false) {
            return <Tasks content={p.content} Id={p.id} NeededFunc={SelectionOfFunction} time={p.count} status={p.HasStop} />
          }
        })
      }
      <h1>Completed Tasks</h1>
      {
        Data.map((p) => {
          if (p.content != "" && p.HasStop == true) {
            return <Tasks content={p.content} Id={p.id} NeededFunc={SelectionOfFunction} time={p.count} status={p.HasStop} />
          }
        })
      }
    </>
  )
};
function RenderTime(secs) {
  let hrs = Math.floor(secs / 3600);
  let mins = Math.floor(secs / 60);
  let sec = secs % 60;
  return `${hrs}hrs ${mins}mins ${sec} secs`;
}
const Tasks = function(props) {
  return (
    <div>
      <p className={`${"taskinput"} `}>{props.content}    {RenderTime(props.time)}</p>
      {
        (props.status == false && <button onClick={() => props.NeededFunc(2, props.Id)}>Stop</button>)
      }
    </div>
  )
}
