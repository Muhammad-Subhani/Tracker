import { useState, useRef } from "react";
export const useTodos = function() {

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
  return {
    IdCount,
    Data,
    setData,
    task,
    setTasks,
    AddTheTasks,
    HandleClearTasks,
    SelectionOfFunction,
    TaskCompletion,
    ClearAllTask,
  }
}
