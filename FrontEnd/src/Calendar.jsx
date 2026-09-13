import React from "react";
import "./styles/Calendar.css"
import { MainCalendar } from "./components/Calendar/MainCalendar";
export const Calendar = React.memo(() => {
  return (
    <>
      <div className="BIG">

        <div className="box2">
          <MainCalendar />
        </div>
      </div>
    </>
  )
})
