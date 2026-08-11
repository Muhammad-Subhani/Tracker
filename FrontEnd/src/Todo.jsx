import { useTodos } from "./hooks/useTodo.jsx"
import { useTodoApi } from "./services/TodoApi.jsx"
import { InputField } from "./components/Todo/TodoInput.jsx"
import { TodoList } from "./components/Todo/TodoList.jsx"
import { ClearAllBtn } from "./components/Todo/ClearAllButton.jsx"
import { useEffect } from "react"
export const DataInputs = function() {
  const {
    Data,
    task,
    setData,
    setTasks,
    AddTheTasks,
    SelectionOfFunction,
    ClearAllTask,
  } = useTodos();
  const { GetAllTodods } = useTodoApi();
  useEffect(() => {
    async function fetchdata() {
      const list = await GetAllTodods();
      if (list) setData(list);
      else {
        setData([]);
        console.log("didnt fetched the todos ")
      }
    }
    fetchdata();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <InputField task={task} setTasks={setTasks} AddTheTasks={AddTheTasks} />
      <ClearAllBtn ClearAllTask={ClearAllTask} />
      <TodoList Data={Data} SelectionOfFunction={SelectionOfFunction} />
    </>
  )
}
