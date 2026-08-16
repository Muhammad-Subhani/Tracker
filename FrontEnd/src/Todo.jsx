import { useTodos } from "./hooks/useTodo.jsx"
import { useTodoApi } from "./services/TodoApi.jsx"
import { InputField } from "./components/Todo/TodoInput.jsx"
import { TodoList } from "./components/Todo/TodoList.jsx"
import { ClearAllBtn } from "./components/Todo/ClearAllButton.jsx"
import { useQuery } from "@tanstack/react-query"
export const DataInputs = function() {
  const {
    AddTheTasks,
    SelectionOfFunction,
    ClearAllTask,
  } = useTodos();
  const { GetAllTodods } = useTodoApi();
  // useEffect(() => {
  //   async function fetchdata() {
  //     const list = await GetAllTodods();
  //     if (list) setData(list);
  //     else {
  //       setData([]);
  //       console.log("didnt fetched the todos ")
  //     }
  //   }
  //   fetchdata();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [])
  //
  const { data: Data = [], isLoading, isFetching, isError } = useQuery({
    queryKey: ['todos'],
    queryFn: GetAllTodods,
    staleTime: 30000,
  })
  if (isLoading) return <h1>Loading Todo Tab First Time ...</h1>
  if (isError) return <p>Unexpected Error OOPS...</p>

  return (
    <>
      {isFetching && <p>Fetching the Todos ...</p>}
      <InputField AddTheTasks={AddTheTasks} />
      <ClearAllBtn ClearAllTask={ClearAllTask} />
      <TodoList Data={Data} SelectionOfFunction={SelectionOfFunction} />
    </>
  )
}
