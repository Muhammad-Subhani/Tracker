export const InputField = function({ task, setTasks, AddTheTasks }) {
  return (
    <>
      <input
        className="InputField"
        type="text"
        placeholder="Enter your tasks ..."
        value={task}
        onChange={(e) => setTasks(e.target.value)} />
      <button type="submit" onClick={AddTheTasks}>Add Task</button>
    </>
  )
}
