import { useContext } from "react";
import "../../styles/slidebar.css";
import { AuthContext } from "../../context/AuthContext";

export const Slidebar = function({ isOpen, toggleSlidebar }) {
  const { tab, setTab } = useContext(AuthContext);

  const mainTabs = [
    {
      id: "calendar",
      label: "Calendar",
      icon: (
        <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
          <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2zm-7 5h5v5h-5v-5z" />
        </svg>
      )
    },
    {
      id: "tracker",
      label: "Tracker",
      icon: (
        <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
          <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
        </svg>
      )
    },
    {
      id: "todo",
      label: "Todos",
      icon: (
        <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
          <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-9 14l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" />
        </svg>
      )
    },
    {
      id: "graphs",
      label: "Graphs",
      icon: (
        <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
          <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z" />
        </svg>
      )
    }
  ];

  const secondaryTabs = [
    {
      id: "today",
      label: "Today",
      icon: (
        <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
          <path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58a.996.996 0 0 0-1.41 0 .996.996 0 0 0 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37a.996.996 0 0 0-1.41 0 .996.996 0 0 0 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0a.996.996 0 0 0 0-1.41l-1.06-1.06zm1.06-10.96a.996.996 0 0 0 0-1.41.996.996 0 0 0-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06zM7.05 18.36a.996.996 0 0 0 0-1.41.996.996 0 0 0-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06z" />
        </svg>
      )
    },
    {
      id: "habits",
      label: "Habits",
      icon: (
        <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
          <path d="M17.65 6.35A7.958 7.958 0 0 0 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08A5.99 5.99 0 0 1 12 18c-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z" />
        </svg>
      )
    },
    {
      id: "goals",
      label: "Goals",
      icon: (
        <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
          <path d="M14.4 6L14 4H5v17h2v-7h5.6l.4 2h7V6z" />
        </svg>
      )
    }
  ];

  function handleTabClick(tabId) {
    if (setTab) {
      setTab(tabId);
    }
  }

  return (
    <aside className={`slidebar ${isOpen ? "open" : "closed"}`}>
      {/* Top Header / Branding & Toggle */}
      <div className="slidebar-header">
        <button
          type="button"
          className="toggle-btn"
          onClick={toggleSlidebar}
          aria-label={isOpen ? "Collapse sidebar" : "Expand sidebar"}
          title={isOpen ? "Collapse menu" : "Main menu"}
        >
          <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
            <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
          </svg>
        </button>

        <div className="slidebar-brand">
          <svg className="brand-logo" viewBox="0 0 24 24" width="24" height="24" fill="none">
            <path d="M12 2L2 7l10 5 10-5-10-5z" fill="#8ab4f8" />
            <path
              d="M2 17l10 5 10-5M2 12l10 5 10-5"
              stroke="#8ab4f8"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="brand-name">Tracker</span>
          <span className="brand-badge">Pro</span>
        </div>
      </div>

      {/* Main Navigation Tabs */}
      <div className="slidebar-content">
        <nav className="slidebar-nav" aria-label="Main Navigation">
          <div className="nav-section-title">Workspace</div>
          {mainTabs.map((item) => {
            const isActive = tab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                className={`nav-item ${isActive ? "active" : ""}`}
                onClick={() => handleTabClick(item.id)}
                data-tooltip={item.label}
                aria-current={isActive ? "page" : undefined}
              >
                <span className="nav-icon">{item.icon}</span>
                <span className="nav-label">{item.label}</span>
                {isActive && <span className="nav-active-pill" />}
              </button>
            );
          })}
        </nav>

        <div className="slidebar-divider" />

        {/* Secondary Routine Tabs */}
        <nav className="slidebar-nav" aria-label="Routines Navigation">
          <div className="nav-section-title">Focus</div>
          {secondaryTabs.map((item) => {
            const isActive = tab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                className={`nav-item ${isActive ? "active" : ""}`}
                onClick={() => handleTabClick(item.id)}
                data-tooltip={item.label}
                aria-current={isActive ? "page" : undefined}
              >
                <span className="nav-icon">{item.icon}</span>
                <span className="nav-label">{item.label}</span>
                {isActive && <span className="nav-active-pill" />}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer / User Profile Strip */}
      <div className="slidebar-footer">
        <div className="user-profile-card">
          <div className="user-avatar" title="Subhani">
            <span>S</span>
          </div>
          <div className="user-info">
            <span className="user-name">Subhani</span>
            <span className="user-status">Online</span>
          </div>
        </div>
      </div>
    </aside>
  );
};
