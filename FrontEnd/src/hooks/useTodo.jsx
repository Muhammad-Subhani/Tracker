import { useCallback } from "react";
import { useTodoApi } from "../services/TodoApi.jsx"
import { useQueryClient } from "@tanstack/react-query";
export const useTodos = function() {
  const queryClient = useQueryClient();
  const {
    CreateTodo,
    DeleteAll,
    Deleteone,
    UpdateComplete,

  } = useTodoApi()
  //const [Data, setData] = useState([]);

  const AddTheTasks = useCallback(async (todo) => {
    const data = await CreateTodo(todo);
    if (data)
      queryClient.setQueryData(['todos'], (prev) => [...(prev ?? []), data]);
    else console.log("Error in creating the todo ")
  }, [CreateTodo, queryClient]);

  const HandleClearTasks = useCallback(async (ID) => {
    const noofdeleted = await Deleteone(ID);
    if (noofdeleted)
      queryClient.setQueryData(['todos'], (prev) => (prev ?? []).filter(p => p._id !== ID));
    else console.log("error in deletion of particular task")
  }, [Deleteone, queryClient]);

  const TaskCompletion = useCallback(async (ID) => {
    const completed = await UpdateComplete(ID);
    if (completed)
      queryClient.setQueryData(['todos'], (prev) =>
        (prev ?? []).map((p) => (p._id === ID) ? { ...p, isComplete: !p.isComplete } : p)
      );
    else console.log("error in updating the status of the todo ")
  }, [UpdateComplete, queryClient]);

  const SelectionOfFunction = useCallback(async (id, ID) => {
    if (id === 1) await HandleClearTasks(ID)
    else await TaskCompletion(ID);
  }, [HandleClearTasks, TaskCompletion]);

  const ClearAllTask = useCallback(async () => {
    const deleteAll = await DeleteAll();
    if (deleteAll)
      queryClient.setQueryData(['todos'], []);
    else console.log("error in deleting all ")
  }, [DeleteAll, queryClient]);


  // async function AddTheTasks(todo) {
  //   const data = await CreateTodo(todo)
  //   if (data)
  //     setData(prev => [...prev, data]);
  //   else console.log("Error in creating the todo ")
  // }
  // async function HandleClearTasks(ID) {
  //   const noofdeleted = await Deleteone(ID);
  //   if (noofdeleted)
  //     setData((prev) => prev.filter(p => p._id != ID))
  //   else console.log("error in deletion of particular task")
  // }
  // async function SelectionOfFunction(id, ID) {
  //   if (id == 1) await HandleClearTasks(ID)
  //   else await TaskCompletion(ID);
  // }
  // async function TaskCompletion(ID) {
  //   const completed = await UpdateComplete(ID);
  //   if (completed)
  //     setData((prev) => prev.map((p) => (p._id == ID) ? { ...p, isComplete: !p.isComplete } : p))
  //   else console.log("error in updating the status of the todo ")
  // }
  // async function ClearAllTask() {
  //   const deleteAll = await DeleteAll()
  //   if (deleteAll)
  //     setData([])
  //   else console.log("error in deleting all ")
  // }
  return {
    AddTheTasks,
    HandleClearTasks,
    SelectionOfFunction,
    TaskCompletion,
    ClearAllTask,
  }
}
