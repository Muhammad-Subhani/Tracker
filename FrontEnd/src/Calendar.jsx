import React from "react";
import "./styles/Calendar.css"
import { Topbar } from "./components/Calendar/TopBar";
export const Calendar = React.memo(() => {
  return (
    <>
      <div className="box1">
        <Topbar />
      </div>
      <div className="box2">

      </div>
    </>
  )
})
