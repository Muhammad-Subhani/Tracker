import { useCallback, useState } from "react";
export const InputField = function({ AddTheTasks }) {

  const [task, setTasks] = useState("");
  // async function AddTasks() {
  //   await AddTheTasks(task)
  // }
  const AddTasks = useCallback(async (data) => {
    await AddTheTasks(data)
  }, [AddTheTasks])
  return (
    <>
      <input
        className="InputField"
        type="text"
        placeholder="Enter your tasks ..."
        value={task}
        onChange={(e) => setTasks(e.target.value)} />
      <button type="submit" onClick={() => AddTasks(task)}>Add Task</button>
    </>
  )
}
