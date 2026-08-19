import "./styles/mainpage.css"
import { TrackerSection } from "./Tracker.jsx"
import { DataInputs } from "./Todo.jsx"
import { Graphs } from "./Graphs.jsx"
import { AuthContext } from "./context/AuthContext.js"
import { useContext } from "react"
import { Calendar } from "./Calendar.jsx"
export const MainPage = function() {
  const {
    tab
  } = useContext(AuthContext)
  return (
    <div className="mainpage">
      {tab == "tracker" && <TrackerSection />}
      {tab == "todo" && <DataInputs />}
      {tab == "graphs" && <Graphs />}
      {tab == "calendar" && <Calendar />}
    </div>
  )
}
