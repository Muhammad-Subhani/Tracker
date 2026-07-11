export const Tasks = function(props) {
  let Status = (props.status) ? "complete" : "";
  return (
    <div>
      <p className={`${"taskinput"} ${Status}`}>{props.content}</p>
      <button onClick={() => props.NeededFunc(1, props.Id)}>Clear this </button>
      <button onClick={() => props.NeededFunc(2, props.Id)}>Done this </button>
    </div>
  )
}
