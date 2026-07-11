import { useTodos } from "./hooks/useTodo.jsx"
import { InputField } from "./components/TodoInput.jsx"
import { TodoList } from "./components/TodoList.jsx"
import { ClearAllBtn } from "./components/ClearAllButton.jsx"
export const DataInputs = function() {
  const {
    Data,
    task,
    setTasks,
    AddTheTasks,
    SelectionOfFunction,
    ClearAllTask,
  } = useTodos();
  return (
    <>
      <InputField task={task} setTasks={setTasks} AddTheTasks={AddTheTasks} />
      <ClearAllBtn ClearAllTask={ClearAllTask} />
      <TodoList Data={Data} SelectionOfFunction={SelectionOfFunction} />
    </>
  )
}
