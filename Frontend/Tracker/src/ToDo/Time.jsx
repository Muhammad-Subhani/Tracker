import { useState } from "react"

export const Watch = function() {
  const [time, setTime] = useState("");
  setInterval(() => {
    const now = new Date()
    const date = now.toLocaleDateString();
    const time = now.toLocaleTimeString();
    setTime(`${date}-${time}`)
  }, 1000)
  return (
    <h1>{time}</h1>
  )
}
