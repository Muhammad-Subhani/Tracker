import { useRef, useState } from "react";
import "./Todo.css"
export const DataInput = function() {

  const IdCount = useRef(0);
  const [Data, setData] = useState([]);
  const [task, setTasks] = useState("");
  function AddTheTasks() {
    IdCount.current += 1;
    setData((prev) => [...prev, { content: `${task}`, id: `task_${IdCount.current}`, complete: false }]);
  }
  function HandleClearTasks(ID) {
    setData((prev) => prev.filter(p => p.id != ID))
  }
  function SelectionOfFunction(id, ID) {
    if (id == 1) HandleClearTasks(ID)
    else TaskCompletion(ID);
  }
  function TaskCompletion(ID) {
    setData((prev) => prev.map((p) => (p.id == ID) ? { ...p, complete: !p.complete } : p))
  }
  function ClearAllTask() {
    setData([])
  }
  return (
    <>
      <input
        className="InputField"
        type="text"
        placeholder="Enter your tasks ..."
        value={task}
        onChange={(e) => setTasks(e.target.value)} />
      <button type="submit" onClick={AddTheTasks}>Add Task</button>
      {
        Data.map((p) => {
          if (p.content != "") {

            return <Tasks content={p.content} status={p.complete} key={p.id} Id={p.id} NeededFunc={SelectionOfFunction} />
          }
        })
      }
      <button onClick={ClearAllTask}>Clear all </button>
    </>
  )
};
const Tasks = function(props) {
  let Status = (props.status) ? "complete" : "";
  return (
    <div>
      <p className={`${"taskinput"} ${Status}`}>{props.content}</p>
      <button onClick={() => props.NeededFunc(1, props.Id)}>Clear this </button>
      <button onClick={() => props.NeededFunc(2, props.Id)}>Done this </button>
    </div>
  )
}
