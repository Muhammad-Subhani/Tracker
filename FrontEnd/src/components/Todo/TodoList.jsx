import { Tasks } from "./EachTodo.jsx"
export const TodoList = function({ Data, SelectionOfFunction }) {
  return (
    <>
      {
        Data.map((p) => {
          if (p.todoContent != "") {
            return <Tasks content={p.todoContent} status={p.isComplete} key={p._id} Id={p._id} NeededFunc={SelectionOfFunction} />
          }
        })
      }
    </>
  )
}
