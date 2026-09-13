import { useState } from "react";
export const useDateHooks = function() {
  const [today, setToday] = useState(() => {
    const time = new Date();
    return new Date(time.getFullYear(), time.getMonth(), time.getDate());
  })
  const year = today.getFullYear();
  const month = today.getMonth();
  const Datee = today.getDate();
  const startOfWeek = new Date(year, month, Datee - today.getDay());
  const endOfWeek = new Date(year, month, Datee - today.getDay() + 6);

  const startMonth = startOfWeek.toLocaleString('en-US', { month: 'short' });
  const endMonth = endOfWeek.toLocaleString('en-US', { month: 'short' });

  const headerTitle = startMonth === endMonth
    ? `${startMonth} ${endOfWeek.getFullYear()}`
    : `${startMonth} – ${endMonth} ${endOfWeek.getFullYear()}`;
  function Prevdate() {
    setToday(new Date(year, month, Datee - 7));
  }
  function GoNextdate() {
    setToday(new Date(year, month, Datee + 7));
  }
  return {
    today,
    setToday,
    year,
    month,
    Datee,
    startOfWeek,
    endOfWeek,
    startMonth,
    endMonth,
    headerTitle,
    Prevdate,
    GoNextdate,
  }
}
