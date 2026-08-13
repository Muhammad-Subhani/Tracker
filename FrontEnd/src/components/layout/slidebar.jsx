import "../../styles/slidebar.css"
import { useContext } from "react"
import { AuthContext } from "../../context/AuthContext"
export const Slidebar = function({ isOpen, toggleSlidebar }) {
  const { setTab } = useContext(AuthContext)
  return (
    <div className={`slidebar ${isOpen ? 'open' : 'close'}`}>
      <button className="toggle-btn" onClick={toggleSlidebar}>
        ☰
      </button>
      {isOpen &&
        <nav className="slidebar-links">
          <a href="#" onClick={() => setTab("graphs")}>Graphs</a>
          <a href="#" onClick={() => setTab("todo")}>Todos</a>
          <a href="#" onClick={() => setTab("tracker")}>Tracker</a>
          <a href="#">Today</a>
          <a href="#">Habits</a>
          <a href="#">Goals</a>
        </nav>
      }
    </div>

  )
}
