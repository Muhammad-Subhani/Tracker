export const InputField = function({ task, setTasks, AddTheTasks }) {
  async function AddTasks() {
    await AddTheTasks(task)
  }
  return (
    <>
      <input
        className="InputField"
        type="text"
        placeholder="Enter your tasks ..."
        value={task}
        onChange={(e) => setTasks(e.target.value)} />
      <button type="submit" onClick={AddTasks}>Add Task</button>
    </>
  )
}
