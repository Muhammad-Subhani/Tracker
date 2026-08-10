import { useState } from "react";
import { useTodoApi } from "../services/TodoApi.jsx"
export const useTodos = function() {
  const {
    CreateTodo,
    DeleteAll,
    Deleteone,
    UpdateComplete,

  } = useTodoApi()
  const [Data, setData] = useState([]);
  const [task, setTasks] = useState("");
  async function AddTheTasks(todo) {
    const data = await CreateTodo(todo)
    if (data.length != 0)
      setData((prev) => [...prev, data]);
    else console.log("Error in creating the todo ")
  }
  async function HandleClearTasks(ID) {
    const noofdeleted = await Deleteone(ID);
    if (noofdeleted > 0)
      setData((prev) => prev.filter(p => p.id != ID))
    else console.log("error in deletion of particular task")
  }
  function SelectionOfFunction(id, ID) {
    if (id == 1) HandleClearTasks(ID)
    else TaskCompletion(ID);
  }
  async function TaskCompletion(ID) {
    const completed = await UpdateComplete();
    if (completed)
      setData((prev) => prev.map((p) => (p.id == ID) ? { ...p, complete: !p.complete } : p))
    else console.log("error in updating the status of the todo ")
  }
  async function ClearAllTask() {
    const deleteAll = await DeleteAll()
    if (deleteAll > 0)
      setData([])
    else console.log("error in deleting all ")
  }
  return {
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
