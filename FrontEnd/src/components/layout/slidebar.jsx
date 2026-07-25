import "../../styles/slidebar.css"
export const Slidebar = function({ isOpen, toggleSlidebar }) {
  return (
    <div className={`slidebar ${isOpen ? 'open' : 'close'}`}>
      <button className="toggle-btn" onClick={toggleSlidebar}>
        ☰
      </button>
      {isOpen &&
        <nav className="slidebar-links">
          <a href="#">Today</a>
          <a href="#">Habits</a>
          <a href="#">Goals</a>
        </nav>
      }
    </div>

  )
}
