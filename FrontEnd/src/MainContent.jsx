import "./styles/mainpage.css"
import { TrackerSection } from "./Tracker.jsx"
import { DataInputs } from "./Todo.jsx"
export const MainPage = function() {
  return (
    <div className="mainpage">
      <TrackerSection />
      <DataInputs />
    </div>
  )
}
