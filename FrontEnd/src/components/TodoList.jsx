import { Tasks } from "./EachTodo.jsx"
export const TaskList = function({ Data, SelectionOfFunction }) {
  return (
    <>
      {
        Data.map((p) => {
          if (p.content != "") {

            return <Tasks content={p.content} status={p.complete} key={p.id} Id={p.id} NeededFunc={SelectionOfFunction} />
          }
        })
      }
    </>
  )
}
