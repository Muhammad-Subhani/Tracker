import { useState } from "react";
import "./HeatMap.css"
import "./HeatMap.css";

function getFormatteddates(DateObj) {
  const y = DateObj.getFullYear();
  const m = String(DateObj.getMonth()).padStart(2, '0');
  const d = String(DateObj.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`
}

function GetArray(year, month, day) {
  let arr = [];
  // for (let i = 0; i < 371; i++) {
  //   let date = new Date(year, month, day - (370 - i));
  //   let count = Math.random() < 0.3 ? 0 : Math.floor(Math.random() * 10) + 1;
  //   arr[i] = {
  //     date: `${date.toLocaleString('en-US', { month: 'short' })} ${date.getDate()}`,
  //     count: count
  //   };
  // }
  for (let i = 0; i < 371; i++) {
    arr[i] = getFormatteddates(new Date(year, month, day))
  }
  return arr;
}

export const HeatMap = function() {
  const [today, setToday] = useState(() => {
    const time = new Date();
    return new Date(time.getFullYear(), time.getMonth(), time.getDate());
  });

  let year = today.getFullYear();
  let month = today.getMonth();
  let day = today.getDate();
  let array = GetArray(year, month, day);
  console.log(array)
  function goPrevYear() {
    setToday(new Date(year - 1, month, day));
  }

  function goNextYear() {
    setToday(new Date(year + 1, month, day));
  }
  return (
    <>
      <div className="MainBox">
        {array.map((item, idx) => (
          <SmallBox key={idx} date={item} />
        ))}
      </div>
      <h1>{year}</h1>
      <button onClick={goPrevYear}>Prev</button>
      {year < new Date().getFullYear() && <button onClick={goNextYear}>Next</button>}
    </>
  );
};

function getColor(count) {
  if (count === 0) return "#161b22";
  if (count <= 2) return "#0e4429";
  if (count <= 4) return "#006d32";
  if (count <= 7) return "#26a641";
  return "#39d353";
}

const SmallBox = function({ count, date }) {
  return (
    <div
      className="small"
      style={{ backgroundColor: getColor(count) }}
      title={`${count} tasks on ${date}`}
    ></div>
  );
};
