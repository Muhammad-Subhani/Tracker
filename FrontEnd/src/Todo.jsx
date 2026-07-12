import { useTodos } from "./hooks/useTodo.jsx"
import { InputField } from "./components/Todo/TodoInput.jsx"
import { TodoList } from "./components/Todo/TodoList.jsx"
import { ClearAllBtn } from "./components/Todo/ClearAllButton.jsx"
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
