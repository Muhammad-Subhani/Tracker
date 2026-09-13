import { useState } from "react"
import "./refPop.css"
export const PopUp = function({ onClose, newEvent, setNewEvent, month, date, EventCreation, year }) {
  const [title, setTitle] = useState("")
  async function MakeAnEvent() {
    if (title != "") {
      setNewEvent((p) => ({ ...p, title: title }));
      const obj = {
        title: title,
        date: date,
        month: month,
        year: year,
        startingminutes: Math.abs(newEvent.startingminutes),
        endingminutes: Math.abs(newEvent.endingminutes),
        day: newEvent.day
      }
     await  EventCreation(obj)
    }
    onClose();
  }
  return (
    <div className="modal-backdrop" onClick={onClose}
      onMouseDown={(e) => e.stopPropagation()}
      onMouseUp={(e) => e.stopPropagation()}>
      <div className="modal-box" onClick={e => e.stopPropagation()}>
        <h2>New Event</h2>

        <label > Title </label>
        <input type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)} />
        {newEvent &&
          <div>
            <p> Day number {newEvent.day}</p>
            <p>Start: {newEvent.startingminutes} min</p>
            <p>End: {newEvent.endingminutes} min</p>
          </div>
        }
        <button onClick={MakeAnEvent}>Make an event </button>
      </div>
    </div>
  )
}
// this is the actual practical learning about the event bubblingh 
// when you clicked on the input field you did onMouseDown in event bubblingh we leanrt that the entire DOM is traverse 
// up words and same type of events on the calendar grif 
